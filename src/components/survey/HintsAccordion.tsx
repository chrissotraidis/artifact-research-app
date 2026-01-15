'use client';

import { useState } from 'react';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { HINTS } from '@/constants/survey';

interface HintsAccordionProps {
    onExpand?: () => void;
}

export function HintsAccordion({ onExpand }: HintsAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        if (!isOpen && onExpand) {
            onExpand();
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="mb-12 border border-[#2A2A2A] rounded-lg bg-[#111111] overflow-hidden">
            <button
                onClick={handleToggle}
                className="w-full flex items-center justify-between p-4 text-[#A0A0A0] hover:text-[#FAFAFA] hover:bg-[#1A1A1A] transition-colors"
            >
                <span className="font-medium text-sm flex items-center gap-2">
                    <HelpCircle size={16} /> Need a hint?
                </span>
                <ChevronRight
                    size={16}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                />
            </button>

            <div className={`
        transition-all duration-300 ease-in-out overflow-hidden 
        ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}
      `}>
                <div className="p-5 pt-0 text-[#666666] text-sm leading-relaxed border-t border-[#2A2A2A]">
                    <ul className="space-y-2 mt-4 list-disc pl-4">
                        {HINTS.map((hint, index) => (
                            <li key={index}>{hint}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
