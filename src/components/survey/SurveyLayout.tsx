'use client';

import { ReactNode } from 'react';

interface SurveyLayoutProps {
    children: ReactNode;
    step: number;
    totalSteps: number;
    onBack?: () => void;
    showNav?: boolean;
}

export function SurveyLayout({
    children,
    step,
    totalSteps,
    onBack,
    showNav = true
}: SurveyLayoutProps) {
    // Don't show nav on first step (welcome) or last step (thank you)
    const shouldShowNav = showNav && step > 0 && step < totalSteps - 1;

    return (
        <main className="relative w-full min-h-screen flex flex-col">
            {/* Header/Nav */}
            {shouldShowNav && (
                <div className="absolute top-0 w-full p-6 md:p-8 flex justify-between items-center z-10">
                    <button
                        onClick={onBack}
                        className="text-[#666666] hover:text-[#FAFAFA] font-mono text-xs uppercase tracking-wider transition-colors"
                    >
                        ← Back
                    </button>
                    <div className="text-[#444444] font-mono text-xs">
                        0{step + 1} / 0{totalSteps - 1}
                    </div>
                </div>
            )}

            <div className="flex-grow flex items-center justify-center px-6 py-24 md:py-32 w-full">
                {children}
            </div>
        </main>
    );
}
