import { z } from 'zod';

export const attendanceSchema = z.object({
    timestamp: z.string(),
    id: z.string().regex(/^[A-Z]\d{1,3}$/, 'ID must be in format AZXXX where Z is a letter and XXX is 1 to 3 digits'),
    eventName: z.string().min(1, 'Event name is required'),
    meal: z.enum(['Yes', 'No']),
    goodies: z.enum(['Yes', 'No']),
});