'use client';

import { useEffect, useRef } from 'react';
import { Button, TextArea } from '@/components/ui';
import { HintsAccordion } from '@/components/survey';
import { COPY } from '@/constants/survey';
import { analyticsLogger } from '@/lib/logger';

interface IntentCaptureScreenProps {
    description: string;
    onDescriptionChange: (value: string) => void;
    onHintExpanded: () => void;
    onContinue: () => void;
}

export function IntentCaptureScreen({
    description,
    onDescriptionChange,
    onHintExpanded,
    onContinue,
}: IntentCaptureScreenProps) {
    const canContinue = description.trim().length >= 10;
    const typingStarted = useRef(false);

    // Log screen view
    useEffect(() => {
        analyticsLogger.info('Screen viewed: IntentCapture', {
            screen: 'IntentCapture',
            timestamp: new Date().toISOString()
        });
    }, []);

    // Track when user starts typing
    const handleDescriptionChange = (value: string) => {
        if (!typingStarted.current && value.length > 0) {
            typingStarted.current = true;
            analyticsLogger.info('User started typing intent description', {
                timestamp: new Date().toISOString()
            });
        }
        onDescriptionChange(value);
    };

    const handleHintExpanded = () => {
        analyticsLogger.info('User expanded hints section');
        onHintExpanded();
    };

    const handleContinue = () => {
        const wordCount = description.trim().split(/\s+/).filter(Boolean).length;
        analyticsLogger.info('Intent capture completed', {
            wordCount,
            characterCount: description.length,
        });
        onContinue();
    };

    return (
        <div className="fade-slide-enter w-full max-w-3xl mx-auto">
            <div className="mb-8">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-[#FAFAFA]">
                    {COPY.intentCapture.title}
                </h2>
                <p className="text-[#A0A0A0] text-lg">
                    {COPY.intentCapture.subtitle}
                </p>
            </div>

            <TextArea
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder={COPY.intentCapture.placeholder}
                showWordCount
            />

            <HintsAccordion onExpand={handleHintExpanded} />

            <div className="flex justify-end">
                <Button
                    onClick={handleContinue}
                    disabled={!canContinue}
                    className="w-full sm:w-auto"
                >
                    Submit & Continue
                </Button>
            </div>
        </div>
    );
}
