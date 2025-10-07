'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { FaUsers, FaUserShield, FaCreditCard, FaCheck, FaArrowLeft, FaArrowRight, FaTrophy, FaLock } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import Link from 'next/link';
import { esportsSchema, type FormInput, type MemberInput } from './schemas';
import { ESPORTS_FEE, UPI_ID, PAYEE_NAME, FORM_STEPS, memberFields } from './constants';
import { FaLocationDot } from 'react-icons/fa6';

export default function EsportsRegisterPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [showWhatsAppLink, setShowWhatsAppLink] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const { register, handleSubmit, trigger, watch, formState: { isValid, errors } } = useForm<FormInput>({
        resolver: zodResolver(esportsSchema),
        defaultValues: {
            teamName: '',
            leader: { name: '', ign: '', ignId: '', contact: '', email: '' },
            members: Array(3).fill({ name: '', ign: '', ignId: '', contact: '', email: '' }),
            transactionId: '',
        },
        mode: 'onChange',
    });

    const teamName = watch('teamName');
    const progress = ((currentStep + 1) / FORM_STEPS.length) * 100;

    const nextStep = async () => {
        let isValid = false;
        switch (currentStep) {
            case 0: isValid = await trigger('teamName'); break;
            case 1: isValid = await trigger('leader'); break;
            case 2: isValid = await trigger('members'); break;
            default: isValid = true;
        }
        if (isValid && currentStep < FORM_STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep === 0) {
            setShowForm(false);
        } else if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    async function onSubmit(values: FormInput) {
        setSubmitting(true);
        const toastId = toast.loading('Submitting your registration...');
        try {
            const timestamp = new Date().toLocaleString('en-GB', {
                day: '2-digit', month: 'long', year: 'numeric',
                hour: '2-digit', minute: '2-digit',
            });
            const apiData = {
                timestamp,
                teamName: values.teamName,
                leaderName: values.leader.name, leaderIGN: values.leader.ign, leaderIGNId: values.leader.ignId, leaderContact: values.leader.contact, leaderEmail: values.leader.email,
                member1Name: values.members?.[0]?.name ?? '', member1IGN: values.members?.[0]?.ign ?? '', member1IGNId: values.members?.[0]?.ignId ?? '', member1Contact: values.members?.[0]?.contact ?? '', member1Email: values.members?.[0]?.email ?? '',
                member2Name: values.members?.[1]?.name ?? '', member2IGN: values.members?.[1]?.ign ?? '', member2IGNId: values.members?.[1]?.ignId ?? '', member2Contact: values.members?.[1]?.contact ?? '', member2Email: values.members?.[1]?.email ?? '',
                member3Name: values.members?.[2]?.name ?? '', member3IGN: values.members?.[2]?.ign ?? '', member3IGNId: values.members?.[2]?.ignId ?? '', member3Contact: values.members?.[2]?.contact ?? '', member3Email: values.members?.[2]?.email ?? '',
                transactionId: values.transactionId,
            };
            const response = await fetch('/api/esports', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(apiData),
            });
            if (response.ok) {
                toast.success('Registration successful!', { id: toastId });
                setShowWhatsAppLink(true);
            } else {
                const data = await response.json() as { message: string };
                toast.error(`Error: ${data.message}`, { id: toastId });
            }
        } catch (error) {
            toast.error('Network error, please try again', { id: toastId });
        } finally {
            setSubmitting(false);
        }
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="w-full bg-[#1e1e1e] border border-[#444] rounded-xl shadow-md p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#2d2d2d] rounded-lg">
                                <FaUsers className="text-[#bb86fc]" />
                            </div>
                            <h3 className="text-white text-lg font-semibold">Team Information</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-white mb-1">Team Name *</label>
                                <input
                                    type="text"
                                    placeholder="Enter your team name"
                                    {...register('teamName')}
                                    className="w-full h-12 bg-[#2d2d2d] border border-[#444] text-white rounded-lg px-3 focus:border-[#bb86fc] focus:outline-none focus:ring-1 focus:ring-[#bb86fc]"
                                />
                                {errors.teamName && <p className="text-red-500 text-sm mt-1">{errors.teamName.message}</p>}
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="w-full bg-[#1e1e1e] border border-[#444] rounded-xl shadow-md p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#2d2d2d] rounded-lg">
                                <FaUserShield className="text-[#bb86fc]" />
                            </div>
                            <h3 className="text-white text-lg font-semibold">Team Leader Details</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {memberFields.map((item) => (
                                <div key={item.field} className={item.fullWidth ? 'md:col-span-2' : ''}>
                                    <label className="block text-white mb-1">{item.label} *</label>
                                    <input
                                        type={item.type}
                                        placeholder={`Enter ${item.label.toLowerCase()}`}
                                        {...register(`leader.${item.field as keyof MemberInput}`)}
                                        className="w-full h-12 bg-[#2d2d2d] border border-[#444] text-white rounded-lg px-3 focus:border-[#bb86fc] focus:outline-none focus:ring-1 focus:ring-[#bb86fc]"
                                    />
                                    {errors.leader?.[item.field as keyof MemberInput] && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.leader?.[item.field as keyof MemberInput]?.message}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="w-full bg-[#1e1e1e] border border-[#444] rounded-xl shadow-md p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#2d2d2d] rounded-lg">
                                <FaUsers className="text-[#bb86fc]" />
                            </div>
                            <h3 className="text-white text-lg font-semibold">Team Members</h3>
                        </div>
                        <div className="space-y-6">
                            {[0, 1, 2].map((index) => (
                                <div key={index} className="space-y-4 border border-[#444] rounded-lg p-4">
                                    <h4 className="font-medium flex items-center gap-2 text-white">
                                        <span className="w-6 h-6 bg-[#2d2d2d] text-gray-300 rounded-full flex items-center justify-center text-sm">
                                            {index + 1}
                                        </span>
                                        Member {index + 1}
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {memberFields.map((item) => (
                                            <div key={item.field} className={item.fullWidth ? 'md:col-span-2' : ''}>
                                                <label className="block text-white mb-1">{item.label} *</label>
                                                <input
                                                    type={item.type}
                                                    placeholder={`Enter member's ${item.label.toLowerCase()}`}
                                                    {...register(`members.${index}.${item.field as keyof MemberInput}`)}
                                                    className="w-full h-12 bg-[#2d2d2d] border border-[#444] text-white rounded-lg px-3 focus:border-[#bb86fc] focus:outline-none focus:ring-1 focus:ring-[#bb86fc]"
                                                />
                                                {errors.members?.[index]?.[item.field as keyof MemberInput] && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {errors.members?.[index]?.[item.field as keyof MemberInput]?.message}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 3:
                const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${ESPORTS_FEE}.00&cu=INR&tn=${encodeURIComponent(teamName || 'Esports')}`;
                return (
                    <div className="w-full bg-[#1e1e1e] border border-[#444] rounded-xl shadow-md p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#2d2d2d] rounded-lg">
                                <FaCreditCard className="text-[#bb86fc]" />
                            </div>
                            <h3 className="text-white text-lg font-semibold">Payment Details</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-white">Registration Fee:</span>
                                    <span className="text-xl font-bold text-white">₹{ESPORTS_FEE}</span>
                                </div>
                                <div className="flex flex-col lg:flex-row gap-6 items-start">
                                    <div className="flex-shrink-0 mx-auto lg:mx-0">
                                        <div className="p-4 bg-[#2d2d2d] rounded-lg border border-[#444]">
                                            <QRCodeSVG value={upiUrl} size={160} includeMargin={false} fgColor="#bb86fc" bgColor="transparent" />
                                        </div>
                                        <div className="text-center mt-3 text-sm text-gray-400">
                                            Scan to pay ₹{ESPORTS_FEE}
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-4 w-full">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                            <div className="bg-[#2d2d2d] p-3 rounded-lg border border-[#444]">
                                                <div className="text-gray-400 text-xs mb-1">Payee Name</div>
                                                <div className="text-white font-medium">{PAYEE_NAME}</div>
                                            </div>
                                            <div className="bg-[#2d2d2d] p-3 rounded-lg border border-[#444]">
                                                <div className="text-gray-400 text-xs mb-1">UPI ID</div>
                                                <div className="text-white font-medium break-all">{UPI_ID}</div>
                                            </div>
                                            <div className="bg-[#2d2d2d] p-3 rounded-lg border border-[#444]">
                                                <div className="text-gray-400 text-xs mb-1">Amount</div>
                                                <div className="text-white font-medium">₹{ESPORTS_FEE}</div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-medium text-white">Payment Instructions:</h4>
                                            <ul className="text-sm text-gray-300 space-y-1 list-disc pl-4">
                                                <li>Scan QR code or use UPI ID manually</li>
                                                <li>Your team name is included in the payment note</li>
                                                <li>Copy the 12-digit Transaction ID after payment</li>
                                                <li>Keep a screenshot for verification</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-white mb-1">Transaction ID *</label>
                                <input
                                    type="text"
                                    placeholder="Enter 12-digit transaction ID (e.g., 123456789012)"
                                    {...register('transactionId')}
                                    className="w-full h-12 bg-[#2d2d2d] border border-[#444] text-white rounded-lg px-3 focus:border-[#bb86fc] focus:outline-none focus:ring-1 focus:ring-[#bb86fc]"
                                    maxLength={12}
                                />
                                {errors.transactionId && <p className="text-red-500 text-sm mt-1">{errors.transactionId.message}</p>}
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white py-6 px-4 sm:px-6 lg:py-8">
            <div className="max-w-3xl mx-auto w-full">
                {!showForm ? (
                    <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg border border-[#444] mx-auto">
                        <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

                            <div className="w-full h-full bg-[url('/imgs/esports/peshwa-conquest.webp')] bg-cover bg-center flex items-center justify-center">
                                <FaTrophy className="text-white/30 text-6xl sm:text-8xl opacity-50" />
                            </div>

                            <div className="absolute bottom-4 right-4 text-white z-20 text-right">
                                <h2 className="text-xl sm:text-2xl font-bold">Peshwa Conquest S02</h2>
                                <p className="text-sm opacity-90">October 12, 2025</p>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4 text-sm">
                                <div className="flex items-center bg-[#2d2d2d] p-3 rounded-lg border border-[#444]">
                                    <FaUsers className="text-[#bb86fc] mr-2 text-2xl" />
                                    <div>
                                        <div className="text-gray-400 text-xs">Team Size</div>
                                        <div className="text-white font-medium">4 Players</div>
                                    </div>
                                </div>
                                <div className="flex items-center bg-[#2d2d2d] p-3 rounded-lg border border-[#444]">
                                    <FaTrophy className="text-[#bb86fc] mr-2 text-2xl" />
                                    <div>
                                        <div className="text-gray-400 text-xs">Prize Pool</div>
                                        <div className="text-white font-medium">1 Lakh</div>
                                    </div>
                                </div>
                                <div className="flex items-center bg-[#2d2d2d] p-3 rounded-lg border border-[#444]">
                                    <FaCreditCard className="text-[#bb86fc] mr-2 text-2xl" />
                                    <div>
                                        <div className="text-gray-400 text-xs">Registration Fee</div>
                                        <div className="text-white font-medium">₹{ESPORTS_FEE}</div>
                                    </div>
                                </div>
                                <div className="flex items-center bg-[#2d2d2d] p-3 rounded-lg border border-[#444]">
                                    <FaLocationDot className="text-[#bb86fc] mr-2 text-2xl" />
                                    <div>
                                        <div className="text-gray-400 text-xs">Venue</div>
                                        <div className="text-white font-medium">IOIT Campus</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                aria-disabled={true}
                                disabled
                                className="w-full sm:w-auto bg-[#6b4fc9] text-white rounded-lg py-2.5 px-5 text-sm font-medium transition-all duration-200 flex items-center justify-center mx-auto opacity-80 cursor-not-allowed"
                            >
                                <FaLock className="mr-2 h-4 w-4" />
                                Registration Closed
                            </button>
                        </div>
                    </div>
                ) : (
                    // Registration Form
                    <>
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-300">Step {currentStep + 1} of {FORM_STEPS.length}</span>
                                <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
                            </div>
                            <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
                                <div className="h-full bg-[#bb86fc]" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mt-4">
                                {FORM_STEPS.map((step, index) => (
                                    <div key={step.id} className="flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-all ${index < currentStep ? 'bg-[#bb86fc] text-white' : index === currentStep ? 'bg-[#2d2d2d] text-white ring-2 ring-[#bb86fc]' : 'bg-[#2d2d2d] text-gray-300'}`}>
                                            {index < currentStep ? <FaCheck className="w-3 h-3" /> : <step.icon className="w-3 h-3" />}
                                        </div>
                                        <span className={`text-xs ${index <= currentStep ? 'text-white' : 'text-gray-300'}`}>
                                            {step.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {renderStepContent()}
                            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="w-full sm:w-auto border border-gray-500 text-gray-300 hover:bg-[#2d2d2d] hover:text-white rounded-lg py-2 px-4 flex items-center justify-center transition-colors"
                                >
                                    <FaArrowLeft className="mr-2 h-4 w-4" />
                                    {currentStep === 0 ? 'Back to Intro' : 'Previous'}
                                </button>
                                {currentStep < FORM_STEPS.length - 1 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="w-full sm:w-auto bg-[#bb86fc] hover:bg-[#9e6afe] text-white rounded-lg py-2 px-4 flex items-center justify-center transition-colors"
                                    >
                                        Next Step
                                        <FaArrowRight className="ml-2 h-4 w-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={submitting || !isValid}
                                        className="w-full sm:w-auto bg-[#bb86fc] hover:bg-[#9e6afe] text-white rounded-lg py-2 px-4 flex items-center justify-center disabled:opacity-50 transition-colors"
                                    >
                                        {submitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Submitting...
                                            </>
                                        ) : (
                                            'Submit Registration'
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>
                    </>
                )}
            </div>

            {showWhatsAppLink && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#121212]/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md rounded-xl bg-[#1e1e1e] border border-[#444] p-6 space-y-6 text-center shadow-lg">
                        <h2 className="text-2xl font-bold">Congratulations!</h2>
                        <p className="text-gray-300">
                            Your team is registered for TENET eSports 2025! See you on <strong>October 12th, 2025</strong>.
                        </p>
                        <div className="flex flex-col gap-3">
                            <Link href="/" className="w-full border border-gray-500 text-gray-300 hover:bg-[#2d2d2d] hover:text-white rounded-lg py-2 px-4 flex items-center justify-center transition-colors">
                                <FaArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
