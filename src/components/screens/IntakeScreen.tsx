'use client';

import { useEffect } from 'react';
import { Button, Input, RadioCard } from '@/components/ui';
import { COPY, SEGMENT_OPTIONS, SPEC_EXPERIENCE_OPTIONS, VIBE_CODING_OPTIONS } from '@/constants/survey';
import { Segment, SpecExperience, VibeCodingExperience } from '@/types/survey';
import { analyticsLogger } from '@/lib/logger';

interface IntakeScreenProps {
    firstName: string;
    segment: Segment | '';
    hasWrittenSpecs: SpecExperience | '';
    vibeCodingExperience: VibeCodingExperience | '';
    onFirstNameChange: (value: string) => void;
    onSegmentChange: (value: Segment) => void;
    onSpecExperienceChange: (value: SpecExperience) => void;
    onVibeCodingChange: (value: VibeCodingExperience) => void;
    onContinue: () => void;
}

export function IntakeScreen({
    firstName,
    segment,
    hasWrittenSpecs,
    vibeCodingExperience,
    onFirstNameChange,
    onSegmentChange,
    onSpecExperienceChange,
    onVibeCodingChange,
    onContinue,
}: IntakeScreenProps) {
    const canContinue = firstName.trim() !== '' && segment !== '';

    // Log screen view
    useEffect(() => {
        analyticsLogger.info('Screen viewed: Intake', {
            screen: 'Intake',
            timestamp: new Date().toISOString()
        });
    }, []);

    return (
        <div className="fade-slide-enter w-full max-w-lg mx-auto">
            <h2 className="font-display text-3xl font-bold mb-10 text-[#FAFAFA]">
                {COPY.intake.title}
            </h2>

            <Input
                label="FIRST NAME"
                placeholder="e.g., Alex"
                value={firstName}
                onChange={(e) => onFirstNameChange(e.target.value)}
            />

            <div className="mb-8">
                <label className="text-[#666666] text-sm font-medium mb-3 block ml-1 uppercase tracking-wide">
                    Which best describes your work?
                </label>
                <div className="flex flex-col gap-3">
                    {SEGMENT_OPTIONS.map(opt => (
                        <RadioCard
                            key={opt.value}
                            label={opt.label}
                            selected={segment === opt.value}
                            onClick={() => onSegmentChange(opt.value as Segment)}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <label className="text-[#666666] text-sm font-medium mb-3 block ml-1 uppercase tracking-wide">
                    Have you ever written requirements or specs?
                </label>
                <div className="flex flex-col gap-3">
                    {SPEC_EXPERIENCE_OPTIONS.map(opt => (
                        <RadioCard
                            key={opt}
                            label={opt}
                            selected={hasWrittenSpecs === opt}
                            onClick={() => onSpecExperienceChange(opt as SpecExperience)}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-12">
                <label className="text-[#666666] text-sm font-medium mb-3 block ml-1 uppercase tracking-wide">
                    Experience with &quot;vibe coding&quot; tools?
                </label>
                <span className="text-xs text-[#666666] block mb-3 ml-1 -mt-2">
                    (e.g., Cursor, Lovable, Bolt, Replit Agent)
                </span>
                <div className="flex flex-col gap-3">
                    {VIBE_CODING_OPTIONS.map(opt => (
                        <RadioCard
                            key={opt.value}
                            label={opt.label}
                            selected={vibeCodingExperience === opt.value}
                            onClick={() => onVibeCodingChange(opt.value as VibeCodingExperience)}
                        />
                    ))}
                </div>
            </div>

            <Button
                onClick={onContinue}
                disabled={!canContinue}
                className="w-full"
            >
                Continue
            </Button>
        </div>
    );
}
