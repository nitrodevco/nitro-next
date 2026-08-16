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
        const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
        const loadingIconUrl = useConfigValue<string>('loading.icon.url') ?? '';

        useEffect(() => {
            setStatus('loading');
        }, [src]);

        return (
            <div className="relative flex items-center justify-center size-full">
                {status !== 'loaded' && (
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
                    src={src}
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