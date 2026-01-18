import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'glass';
    onClick?: () => void;
}

/**
 * 通用卡片组件
 */
export function Card({ children, className, variant = 'default', onClick }: CardProps) {
    const baseStyles = 'rounded-2xl p-4 transition-all duration-300';

    const variantStyles = {
        default: 'bg-surface-dark border border-border-dark hover:bg-white/5',
        glass: 'glass-panel',
    };

    const clickableStyles = onClick ? 'cursor-pointer active:scale-[0.98]' : '';

    return (
        <div
            className={cn(baseStyles, variantStyles[variant], clickableStyles, className)}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
