'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-[#E0FF4F] text-[#0D0D0D] hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 px-8 py-4',
    secondary: 'bg-transparent text-[#A0A0A0] border border-[#2A2A2A] hover:border-[#666666] hover:text-[#FAFAFA] px-6 py-3',
    ghost: 'text-[#666666] hover:text-[#FAFAFA] text-sm px-4 py-2',
};

export function Button({
    children,
    variant = 'primary',
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            disabled={disabled}
            className={`
        font-medium text-base transition-all duration-200 ease-out rounded-lg 
        flex items-center justify-center gap-2
        ${variantStyles[variant]}
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
}
