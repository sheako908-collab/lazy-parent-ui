import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: string; // Material icon name
    error?: string;
}

/**
 * 通用输入框组件
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, icon, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-white/90 mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <div className={cn(
                        'flex w-full items-center rounded-2xl bg-surface-dark border transition-all duration-200',
                        error
                            ? 'border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500/50'
                            : 'border-border-dark focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/50'
                    )}>
                        {icon && (
                            <div className="flex items-center justify-center pl-4 pr-3 border-r border-border-dark h-8 my-3">
                                <span className="material-symbols-outlined text-text-secondary text-[20px]">{icon}</span>
                            </div>
                        )}
                        <input
                            ref={ref}
                            className={cn(
                                'w-full bg-transparent border-none text-white placeholder:text-text-secondary/50 focus:ring-0 text-base py-4',
                                icon ? 'pl-3' : 'pl-4',
                                className
                            )}
                            {...props}
                        />
                    </div>
                    {error && (
                        <p className="mt-1 text-sm text-red-400">{error}</p>
                    )}
                </div>
            </div>
        );
    }
);

Input.displayName = 'Input';
