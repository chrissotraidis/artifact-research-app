'use client';

import { useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import { Button, RadioCard } from '@/components/ui';
import { COPY, STIMULUS_FAMILIARITY_OPTIONS } from '@/constants/survey';
import { StimulusFamiliarity } from '@/types/survey';
import { analyticsLogger } from '@/lib/logger';

interface StimulusScreenProps {
    familiarity: StimulusFamiliarity | '';
    onFamiliarityChange: (value: StimulusFamiliarity) => void;
    onContinue: () => void;
}

export function StimulusScreen({
    familiarity,
    onFamiliarityChange,
    onContinue,
}: StimulusScreenProps) {
    // Log screen view
    useEffect(() => {
        analyticsLogger.info('Screen viewed: Stimulus', {
            screen: 'Stimulus',
            timestamp: new Date().toISOString()
        });
    }, []);

    return (
        <div className="fade-slide-enter w-full max-w-2xl mx-auto flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center mb-8 text-[#E0FF4F]">
                <HelpCircle size={32} strokeWidth={1.5} />
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-[#FAFAFA]">
                {COPY.stimulus.title}
            </h2>

            <div className="bg-[#1A1A1A] border border-[#2A2A2A] p-8 rounded-xl mb-10 max-w-xl shadow-2xl">
                <p className="font-body text-lg text-[#FAFAFA] leading-relaxed opacity-90">
                    &quot;{COPY.stimulus.description}&quot;
                </p>
            </div>

            <div className="w-full max-w-md mb-12 text-left">
                <label className="text-[#666666] text-sm font-medium mb-3 block ml-1 uppercase tracking-wider">
                    {COPY.stimulus.familiarityQuestion}
                </label>
                <div className="flex flex-col gap-3">
                    {STIMULUS_FAMILIARITY_OPTIONS.map(opt => (
                        <RadioCard
                            key={opt}
                            label={opt}
                            selected={familiarity === opt}
                            onClick={() => onFamiliarityChange(opt as StimulusFamiliarity)}
                        />
                    ))}
                </div>
            </div>

            <Button
                onClick={onContinue}
                disabled={!familiarity}
                className="w-full max-w-xs"
            >
                I&apos;m ready to describe it
            </Button>
        </div>
    );
}
