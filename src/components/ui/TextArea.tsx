'use client';

import { TextareaHTMLAttributes, useEffect, useState } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    showWordCount?: boolean;
}

export function TextArea({
    value = '',
    showWordCount = true,
    className = '',
    ...props
}: TextAreaProps) {
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        const text = String(value).trim();
        const words = text.split(/\s+/);
        setWordCount(text === '' ? 0 : words.length);
    }, [value]);

    return (
        <div className="w-full relative mb-8">
            <textarea
                value={value}
                className={`
          w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-5 
          text-[#FAFAFA] placeholder-[#666666] 
          outline-none transition-all duration-200 
          focus:border-[#E0FF4F] 
          min-h-[240px] resize-y font-body leading-relaxed text-lg
          ${className}
        `}
                {...props}
            />
            {showWordCount && (
                <div className="absolute bottom-4 right-4 font-mono text-xs text-[#666666]">
                    {wordCount} WORDS
                </div>
            )}
        </div>
    );
}
