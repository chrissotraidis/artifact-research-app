'use client';

import { useEffect } from 'react';
import { Button, Input, RadioCard, RatingScale } from '@/components/ui';
import { COPY, VOCAB_GAP_OPTIONS } from '@/constants/survey';
import { VocabGapResponse, YesNo } from '@/types/survey';
import { analyticsLogger } from '@/lib/logger';

interface ReflectionScreenProps {
    difficultyRating: number | null;
    vocabGap: VocabGapResponse | '';
    difficultyDescription: string;
    otherThoughts: string;
    followUpInterest: YesNo | '';
    email: string;
    isSubmitting: boolean;
    onDifficultyChange: (value: number) => void;
    onVocabGapChange: (value: VocabGapResponse) => void;
    onDifficultyDescriptionChange: (value: string) => void;
    onOtherThoughtsChange: (value: string) => void;
    onFollowUpChange: (value: YesNo) => void;
    onEmailChange: (value: string) => void;
    onSubmit: () => void;
}

export function ReflectionScreen({
    difficultyRating,
    vocabGap,
    difficultyDescription,
    otherThoughts,
    followUpInterest,
    email,
    isSubmitting,
    onDifficultyChange,
    onVocabGapChange,
    onDifficultyDescriptionChange,
    onOtherThoughtsChange,
    onFollowUpChange,
    onEmailChange,
    onSubmit,
}: ReflectionScreenProps) {
    const canSubmit = difficultyRating !== null;

    // Log screen view
    useEffect(() => {
        analyticsLogger.info('Screen viewed: Reflection', {
            screen: 'Reflection',
            timestamp: new Date().toISOString()
        });
    }, []);

    const handleSubmit = () => {
        analyticsLogger.info('User submitting survey', {
            difficultyRating,
            vocabGap,
            followUpInterest,
            hasEmail: email.length > 0,
        });
        onSubmit();
    };

    return (
        <div className="fade-slide-enter w-full max-w-lg mx-auto">
            <h2 className="font-display text-3xl font-bold mb-2 text-[#FAFAFA]">
                {COPY.reflection.title}
            </h2>
            <p className="text-[#A0A0A0] mb-10">{COPY.reflection.subtitle}</p>

            {/* Difficulty Rating */}
            <div className="mb-10">
                <label className="text-[#FAFAFA] text-base font-medium mb-4 block">
                    How easy or hard was it to describe the app you wanted?
                    <span className="block text-sm text-[#666666] font-normal mt-1">
                        (1 = Very Easy, 5 = Very Hard)
                    </span>
                </label>
                <RatingScale
                    value={difficultyRating}
                    onChange={onDifficultyChange}
                />
            </div>

            {/* Vocab Gap */}
            <div className="mb-8">
                <label className="text-[#FAFAFA] text-base font-medium mb-4 block">
                    Did you feel like you were missing vocabulary or concepts?
                </label>
                <div className="flex flex-col gap-3">
                    {VOCAB_GAP_OPTIONS.map(opt => (
                        <RadioCard
                            key={opt}
                            label={opt}
                            selected={vocabGap === opt}
                            onClick={() => onVocabGapChange(opt as VocabGapResponse)}
                        />
                    ))}
                </div>
            </div>

            {/* Conditional: What felt hard */}
            {vocabGap === 'Yes' && (
                <div className="mb-8 fade-slide-enter">
                    <Input
                        label="WHAT FELT HARD TO EXPRESS?"
                        placeholder="e.g., describing the layout, the logic..."
                        value={difficultyDescription}
                        onChange={(e) => onDifficultyDescriptionChange(e.target.value)}
                    />
                </div>
            )}

            {/* Optional Textarea */}
            <div className="mb-10">
                <label className="text-[#666666] text-sm font-medium mb-2 block uppercase tracking-wide">
                    Anything else you&apos;d like to share?
                </label>
                <textarea
                    value={otherThoughts}
                    onChange={(e) => onOtherThoughtsChange(e.target.value)}
                    placeholder="Any other thoughts on this process?"
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4 text-[#FAFAFA] placeholder-[#666666] outline-none focus:border-[#E0FF4F] min-h-[100px] text-sm transition-colors"
                />
            </div>

            {/* Follow Up */}
            <div className="mb-8">
                <label className="text-[#FAFAFA] text-base font-medium mb-4 block">
                    Would you be open to a 15-minute follow-up conversation?
                </label>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => onFollowUpChange('Yes')}
                        className={`flex-1 py-3 rounded-lg border transition-all ${followUpInterest === 'Yes'
                                ? 'bg-[#1A1A1A] border-[#E0FF4F] text-[#FAFAFA]'
                                : 'border-[#2A2A2A] text-[#A0A0A0] hover:border-[#444444]'
                            }`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => onFollowUpChange('No')}
                        className={`flex-1 py-3 rounded-lg border transition-all ${followUpInterest === 'No'
                                ? 'bg-[#1A1A1A] border-[#E0FF4F] text-[#FAFAFA]'
                                : 'border-[#2A2A2A] text-[#A0A0A0] hover:border-[#444444]'
                            }`}
                    >
                        No
                    </button>
                </div>
            </div>

            {/* Conditional Email */}
            {followUpInterest === 'Yes' && (
                <div className="mb-12 fade-slide-enter">
                    <Input
                        label="EMAIL ADDRESS"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => onEmailChange(e.target.value)}
                    />
                </div>
            )}

            <Button
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
                className="w-full"
            >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
        </div>
    );
}
