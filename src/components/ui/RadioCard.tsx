'use client';

interface RadioCardProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

export function RadioCard({ label, selected, onClick }: RadioCardProps) {
    return (
        <div
            onClick={onClick}
            className={`
        w-full p-5 rounded-lg border cursor-pointer transition-all duration-200 
        flex items-center justify-between group
        ${selected
                    ? 'bg-[#1A1A1A] border-[#E0FF4F] shadow-[0_0_15px_rgba(224,255,79,0.05)]'
                    : 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#444444]'}
      `}
        >
            <span className={`
        text-base transition-colors 
        ${selected ? 'text-[#FAFAFA]' : 'text-[#A0A0A0] group-hover:text-[#e5e5e5]'}
      `}>
                {label}
            </span>
            <div className={`
        w-5 h-5 rounded-full border flex items-center justify-center transition-colors
        ${selected ? 'border-[#E0FF4F]' : 'border-[#444444]'}
      `}>
                {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#E0FF4F]" />}
            </div>
        </div>
    );
}
