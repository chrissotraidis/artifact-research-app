'use client';

interface RatingScaleProps {
    value: number | null;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

export function RatingScale({
    value,
    onChange,
    min = 1,
    max = 5
}: RatingScaleProps) {
    const numbers = Array.from({ length: max - min + 1 }, (_, i) => min + i);

    return (
        <div className="flex gap-3 w-full justify-between sm:justify-start">
            {numbers.map((num) => (
                <button
                    key={num}
                    type="button"
                    onClick={() => onChange(num)}
                    className={`
            w-12 h-12 rounded-lg border font-mono text-lg transition-all duration-200
            ${value === num
                            ? 'bg-[#E0FF4F] border-[#E0FF4F] text-[#0D0D0D] font-bold'
                            : 'bg-[#1A1A1A] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#666666]'}
          `}
                >
                    {num}
                </button>
            ))}
        </div>
    );
}
