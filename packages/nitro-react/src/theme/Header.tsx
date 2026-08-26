import { forwardRef, type HTMLAttributes } from 'react';

import { CloseButton } from './CloseButton';
import { cn, cva, useCascadedVariant, useTintedVars, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const headerVariantsConfig = {
    variant: {
        // blue
        '0': 'sprite min-w-6 min-h-3.75 bg-(image:--header-0-default-src) bg-size-[6px_15px] bg-repeat-x m-1.5 text-white text-style-frame-title font-aa',
        // black
        '1': 'sprite min-w-6 min-h-3.75 bg-(image:--header-0-default-src) bg-size-[6px_15px] bg-repeat-x p-1.5 text-white text-style-frame-title font-aa',
        // yellow
        '2': 'sprite min-w-6 min-h-3.75 bg-(image:--header-0-default-src) bg-size-[6px_15px] bg-repeat-x m-1.5 text-[#000000] text-style-frame-title font-aa',
        // default sprite bg-(image:--header-3-default-src) bg-size-[100%_100%] // bg-(image:--header-3-default-src) bg-size-[6px_20px] bg-repeat-x
        '3': 'sprite h-8.25 min-h-8.25 max-h-8.25 text-[#ffffff] text-style-u-frame-title px-1.5',
        // light
        '4': 'sprite min-w-1.5 min-h-5 bg-(image:--header-3-default-src) bg-size-[100%_100%] pl-2 pt-px pr-2 pb-px text-[#ffffff] text-style-u-frame-title',
        // bubble — graphics asset has no usable "default" state
        '7': 'min-w-16 min-h-8.25 pl-2 pt-px pr-2 pb-px text-black text-style-u-frame-title',
        '100': 'min-h-7.5 text-black text-style-il-frame-title',
        // default
        '200': '[border-image-source:var(--border-200-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border min-h-7.5 text-[#ffffff] text-style-u-frame-title',
    },
} as const;

const headerOverlayVariantsConfig = {
    variant: {
        // blue
        '0': 'bg-(image:--header-0-default-shine-src) bg-size-[6px_15px] bg-repeat-x pixel-art',
        // black
        '1': 'bg-(image:--header-0-default-shine-src) bg-size-[6px_15px] bg-repeat-x pixel-art',
        // yellow
        '2': 'bg-(image:--header-0-default-shine-src) bg-size-[6px_15px] bg-repeat-x pixel-art',
        // default
        '3': '',
        // light
        '4': '',
        // bubble — graphics asset has no usable "default" state
        '7': '',
        // default
        '200': '',
    },
} as const;

const headerTintColors: Partial<Record<string, string>> = {
    '0': '#418db0',
    '1': '#4c4c4c',
    '2': '#fac200',
};

const headerTintableVars: Partial<Record<string, string[]>> = {
    '0': ['header-0-default-src'],
    '1': ['header-0-default-src'],
    '2': ['header-0-default-src'],
    '3': ['header-3-default-src'],
    '4': ['header-3-default-src'],
};

const headerVariants = cva('relative overflow-hidden', { variants: headerVariantsConfig, defaultVariants: { variant: '0' } });
const headerOverlayVariants = cva('', { variants: headerOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type HeaderVariantProps = VariantProps<typeof headerVariantsConfig>;

interface HeaderProps extends HTMLAttributes<HTMLDivElement>, HeaderVariantProps {
    caption?: string;
    onClose?: () => void;
    className?: string;
    tintColor?: string;
    defaultVariant?: string;
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
    ({ caption, onClose, className, variant, defaultVariant, tintColor, style, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('header');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['header']?.[resolvedVariant as string];
        const resolvedTint = tintColor || headerTintColors[resolvedVariant as string];
        const overlayClassName = headerOverlayVariants({ variant: resolvedVariant });
        const tintStyle = useTintedVars(headerTintableVars[resolvedVariant as string], resolvedTint);

        return (
            <div
                ref={ref}
                className={cn(headerVariants({ variant: resolvedVariant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0 z-10', overlayClassName)} />}
                <VariantCascadeProvider map={ownCascade}>
                    <div className="relative flex items-center justify-center h-full">
                        <div className="flex flex-1 items-center justify-center z-20 w-full">
                            <span className="text-center leading-3.75 px-2" style={{ backgroundColor: resolvedTint }}>{caption}</span>
                        </div>
                        <div className="flex shrink-0 items-center justify-center z-20 absolute right-0 top-1/2 -translate-y-1/2" style={{ backgroundColor: resolvedTint }}>
                            <CloseButton className="" onClick={onClose} data-no-drag />
                        </div>
                    </div>
                    {children}
                </VariantCascadeProvider>
            </div>
        );
    }
);

Header.displayName = 'Header';
