'use client';

import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { COPY } from '@/constants/survey';
import { analyticsLogger } from '@/lib/logger';

interface WelcomeScreenProps {
    consent: boolean;
    onConsentChange: (value: boolean) => void;
    onContinue: () => void;
}

export function WelcomeScreen({
    consent,
    onConsentChange,
    onContinue
}: WelcomeScreenProps) {
    // Log screen view
    useEffect(() => {
        analyticsLogger.info('Screen viewed: Welcome', {
            screen: 'Welcome',
            timestamp: new Date().toISOString()
        });
    }, []);

    const handleConsentChange = (value: boolean) => {
        analyticsLogger.debug('Consent changed', { consent: value });
        onConsentChange(value);
    };

    return (
        <div className="flex flex-col items-center text-center fade-slide-enter">
            <div className="mb-12 opacity-80">
                <span className="font-mono text-xs tracking-widest text-[#E0FF4F] uppercase border border-[#2A2A2A] px-3 py-1 rounded-full bg-[#1A1A1A]">
                    Artifact Research
                </span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight max-w-2xl text-[#FAFAFA]">
                {COPY.welcome.title}
            </h1>

            <p className="font-body text-lg text-[#A0A0A0] max-w-xl mb-16 leading-relaxed">
                {COPY.welcome.description}
            </p>

            <div className="w-full max-w-md bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A2A] mb-10 text-left">
                <label className="flex items-start gap-4 cursor-pointer group">
                    <input
                        type="checkbox"
                        className="custom-checkbox mt-0.5"
                        checked={consent}
                        onChange={(e) => handleConsentChange(e.target.checked)}
                    />
                    <span className="text-[#A0A0A0] text-sm leading-relaxed group-hover:text-[#FAFAFA] transition-colors">
                        {COPY.welcome.consent}
                    </span>
                </label>
            </div>

            <Button
                onClick={onContinue}
                disabled={!consent}
                className="w-full max-w-xs"
            >
                Continue <ArrowRight size={18} />
            </Button>
        </div>
    );
}
