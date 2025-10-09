import { type NextRequest } from 'next/server';
import { google } from 'googleapis';
import { env } from '@/env';
import { z } from 'zod';
import { attendanceSchema } from '@/validators/attendance';

const columnIndexToLetter = (index: number): string => {
    let letter = '';
    let tempIndex = index;
    while (tempIndex >= 0) {
        letter = String.fromCharCode((tempIndex % 26) + 65) + letter;
        tempIndex = Math.floor(tempIndex / 26) - 1;
    }
    return letter;
};

const createErrorResponse = (message: string, status: number) => {
    return new Response(JSON.stringify({ status, message }), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
};

const isValidSheetName = (name: string): boolean => {
    return /^[a-zA-Z0-9\s_-]+$/.test(name) && name.length <= 100;
};

export const POST = async (request: NextRequest) => {
    let parsedData;
    try {
        const data: unknown = await request.json();
        parsedData = attendanceSchema.parse(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
            return createErrorResponse(`Validation failed: ${errors}`, 400);
        }
        return createErrorResponse('Invalid request: The request body was empty or malformed.', 400);
    }

    const { eventName, id, timestamp, meal, goodies } = parsedData;

    if (!isValidSheetName(eventName)) {
        return createErrorResponse('Invalid event name. Only alphanumeric characters, spaces, hyphens, and underscores are allowed.', 400);
    }

    let sheets;
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                private_key: env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                client_email: env.GOOGLE_SHEETS_CLIENT_EMAIL,
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = env.ATTENDANCE_SHEETS_ID;
        await sheets.spreadsheets.get({ spreadsheetId });

        const headerRange = `'${eventName}'!1:1`;
        const headerResponse = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: headerRange,
        });
        const headers = headerResponse.data.values?.[0];
        if (!headers || headers.length === 0) {
            return createErrorResponse(`Sheet "${eventName}" is empty, does not exist, or headers could not be read.`, 404);
        }

        const headerMap: Record<string, number> = {};
        headers.forEach((header, index) => {
            if (header && typeof header === 'string') {
                const normalizedHeader = header.toLowerCase().trim();
                headerMap[normalizedHeader] = index;
            }
        });

        const requiredHeaders = ['id', 'meal', 'goodies', 'timestamp'];
        const missingHeaders = requiredHeaders.filter(h => headerMap[h] === undefined);
        if (missingHeaders.length > 0) {
            return createErrorResponse(
                `Missing required columns in sheet "${eventName}": ${missingHeaders.join(', ')}.`,
                400,
            );
        }

        const idColumnLetter = columnIndexToLetter(headerMap.id ?? 0);
        const idRange = `'${eventName}'!${idColumnLetter}:${idColumnLetter}`;
        const idResponse = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: idRange,
        });
        const ids = idResponse.data.values?.flat() ?? [];
        const normalizedSearchId = id.toLowerCase().trim();
        const rowIndex = ids.findIndex(cellId =>
            cellId && typeof cellId === 'string' && cellId.toLowerCase().trim() === normalizedSearchId,
        ) + 1;
        if (rowIndex === 0) {
            return createErrorResponse(
                `ID "${id}" not found in the "${headers[headerMap.id ?? 0]}" column.`,
                404,
            );
        }

        const batchUpdateData = [
            {
                range: `'${eventName}'!${columnIndexToLetter(headerMap.timestamp ?? 0)}${rowIndex}`,
                values: [[timestamp]],
            },
            {
                range: `'${eventName}'!${columnIndexToLetter(headerMap.meal ?? 0)}${rowIndex}`,
                values: [[meal]],
            },
            {
                range: `'${eventName}'!${columnIndexToLetter(headerMap.goodies ?? 0)}${rowIndex}`,
                values: [[goodies]],
            },
        ];
        await sheets.spreadsheets.values.batchUpdate({
            spreadsheetId,
            requestBody: {
                valueInputOption: 'RAW',
                data: batchUpdateData,
            },
        });

        return new Response(JSON.stringify({
            status: 200,
            message: `Attendance successfully marked for ID: ${id}`,
            data: { id, eventName, timestamp, meal, goodies, rowUpdated: rowIndex },
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: unknown) {
        console.error('Google Sheets API Error:', error);
        
        interface GoogleApiError {
            code?: number;
            message?: string;
        }
        
        const apiError = error as GoogleApiError;
        
        if (apiError.code === 403) {
            return createErrorResponse('Access denied. Please check Google Sheets permissions.', 403);
        } else if (apiError.code === 404) {
            return createErrorResponse('Spreadsheet or sheet not found.', 404);
        } else if (apiError.code === 429) {
            return createErrorResponse('Rate limit exceeded. Please try again later.', 429);
        } else if (typeof apiError.message === 'string' && apiError.message.includes('Unable to parse range')) {
            return createErrorResponse(`Invalid sheet name "${eventName}".`, 400);
        }
        return createErrorResponse('An internal server error occurred.', 500);
    }
};
