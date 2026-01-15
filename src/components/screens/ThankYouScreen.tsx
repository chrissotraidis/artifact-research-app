'use client';

import { useEffect } from 'react';
import { Check } from 'lucide-react';
import { COPY } from '@/constants/survey';
import { analyticsLogger } from '@/lib/logger';

export function ThankYouScreen() {
    // Log screen view
    useEffect(() => {
        analyticsLogger.info('Screen viewed: ThankYou', {
            screen: 'ThankYou',
            surveyCompleted: true,
            timestamp: new Date().toISOString()
        });
    }, []);

    return (
        <div className="fade-slide-enter flex flex-col items-center text-center justify-center min-h-[50vh]">
            <div className="w-20 h-20 rounded-full bg-[#1A1A1A] border border-[#E0FF4F] flex items-center justify-center mb-8 text-[#E0FF4F] shadow-[0_0_30px_rgba(224,255,79,0.2)]">
                <Check size={40} strokeWidth={2.5} />
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6 text-[#FAFAFA]">
                {COPY.thankYou.title}
            </h1>

            <p className="font-body text-xl text-[#A0A0A0] max-w-md mb-12">
                {COPY.thankYou.message}
            </p>

            <div className="flex flex-col gap-4 w-full max-w-xs">
                <div className="text-[#666666] text-sm">
                    {COPY.thankYou.followUp}
                </div>
            </div>
        </div>
    );
}
