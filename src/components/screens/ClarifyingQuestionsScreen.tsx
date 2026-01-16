'use client';

import { useMemo, useEffect } from 'react';
import { Button, TextArea } from '@/components/ui';
import { analyzeMissingDimensions, ClarifyingQuestion } from '@/lib/clarifying-questions';

interface ClarifyingQuestionsScreenProps {
    intentText: string;
    responses: Record<string, string>;
    skipped: boolean;
    onResponseChange: (questionId: string, value: string) => void;
    onSkip: () => void;
    onContinue: () => void;
}

export function ClarifyingQuestionsScreen({
    intentText,
    responses,
    // skipped is passed for API compatibility but not used in rendering
    skipped: _skipped,
    onResponseChange,
    onSkip,
    onContinue,
}: ClarifyingQuestionsScreenProps) {
    // Analyze intent text to determine which questions to show (memoized)
    const questions: ClarifyingQuestion[] = useMemo(() => {
        return analyzeMissingDimensions(intentText, 3);
    }, [intentText]);

    // If no questions needed, auto-continue
    useEffect(() => {
        if (questions.length === 0 && intentText.length > 0) {
            onContinue();
        }
    }, [questions.length, intentText.length, onContinue]);

    // Don't render if no questions
    if (questions.length === 0) {
        return null;
    }

    const hasAnyResponse = Object.values(responses).some(v => v.trim().length > 0);

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    A few follow-up questions
                </h1>
                <p className="text-lg text-[#A0A0A0]">
                    Based on your description, we have a few clarifying questions. These are optional.
                </p>
            </div>

            {/* Introduction */}
            <div className="p-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg">
                <p className="text-[#A0A0A0] text-sm">
                    💡 Imagine an AI assistant read your description and wants to make sure it understands.
                    These questions help us understand what you might naturally leave out when describing an app.
                </p>
            </div>

            {/* Questions */}
            <div className="space-y-6">
                {questions.map((question, index) => (
                    <div key={question.id} className="space-y-2">
                        <label
                            htmlFor={`clarifying-${question.id}`}
                            className="block text-lg font-medium"
                        >
                            {index + 1}. {question.question}
                        </label>
                        <TextArea
                            id={`clarifying-${question.id}`}
                            value={responses[question.id] || ''}
                            onChange={(e) => onResponseChange(question.id, e.target.value)}
                            placeholder={question.placeholder}
                            rows={3}
                            className="w-full"
                        />
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                    onClick={onContinue}
                    disabled={false}
                    className="flex-1 sm:flex-none"
                >
                    Continue
                </Button>
                <button
                    onClick={onSkip}
                    className="text-[#A0A0A0] hover:text-[#FAFAFA] transition-colors text-sm"
                >
                    Skip this section
                </button>
            </div>

            {/* Response indicator */}
            {hasAnyResponse && (
                <p className="text-xs text-[#666666]">
                    {Object.values(responses).filter(v => v.trim().length > 0).length} of {questions.length} questions answered
                </p>
            )}
        </div>
    );
}

export default ClarifyingQuestionsScreen;

