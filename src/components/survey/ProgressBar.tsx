'use client';

interface ProgressBarProps {
    progress: number; // 0-100
}

export function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className="fixed top-0 left-0 w-full h-[3px] bg-[#2A2A2A] z-50">
            <div
                className="h-full bg-[#E0FF4F] transition-all duration-700 ease-in-out"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
        </div>
    );
}
