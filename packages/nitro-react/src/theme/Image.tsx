import { forwardRef, HTMLAttributes, useEffect, useState } from "react";

import { useConfigValue } from "#base/context";

import { cn } from "./utils";

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
    className?: string;
    placeholderClassName?: string;
    src?: string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
    ({ className, placeholderClassName, src, onLoad, onError, ...props }, ref) => {
        const normalizedSrc = src?.trim() || undefined;
        const loadingIconUrl = useConfigValue<string>('loading.icon.url')?.trim() || '/assets/icons/loading_icon.png';
        const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(normalizedSrc ? 'loading' : 'error');

        useEffect(() => {
            setStatus(normalizedSrc ? 'loading' : 'error');
        }, [normalizedSrc]);

        return (
            <div className="relative flex items-center justify-center size-full">
                {status === 'loading' && (
                    <img
                        src={loadingIconUrl}
                        className={cn(
                            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 no-select [-webkit-user-drag:none]',
                            placeholderClassName
                        )}
                    />
                )}
                {status !== 'error' && <img
                    ref={ref}
                    src={normalizedSrc}
                    onLoad={e => {
                        setStatus('loaded');
                        onLoad?.(e);
                    }}
                    onError={e => {
                        setStatus('error');
                        onError?.(e);
                    }}
                    className={cn('no-select [-webkit-user-drag:none] transition-opacity duration-100', status === 'loaded' ? 'opacity-100' : 'opacity-0 absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', className)}
                    {...props}
                />}
            </div>
        );
    }
);

Image.displayName = 'Image';
