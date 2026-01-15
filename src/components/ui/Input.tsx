'use client';

import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function Input({
    label,
    className = '',
    ...props
}: InputProps) {
    return (
        <div className="flex flex-col gap-2 w-full mb-6 group">
            <label className="text-[#666666] text-sm font-medium ml-1 transition-colors group-focus-within:text-[#E0FF4F] uppercase tracking-wide">
                {label}
            </label>
            <input
                className={`
          bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-4 
          text-[#FAFAFA] placeholder-[#666666] 
          outline-none transition-all duration-200 
          focus:border-[#E0FF4F] w-full
          ${className}
        `}
                {...props}
            />
        </div>
    );
}
