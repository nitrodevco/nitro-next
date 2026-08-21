import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, useTintedVars, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const dropmenuVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--dropmenu-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border min-w-10 min-h-5.5 text-[#000000] text-style-regular',
        // black
        '1': '[border-image-source:var(--button-1-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border min-w-10 min-h-5.5 text-[#ffffff] text-style-regular',
        // default
        '3': 'sprite min-w-10 min-h-5.75 bg-(image:--dropmenu-3-default-src) bg-size-[100%_100%] hover:bg-(image:--dropmenu-3-hovering-src) hover:bg-size-[100%_100%] hover:bg-no-repeat  text-[#000000] text-style-u-regular',
        // default
        '100': '[border-image-source:var(--dropmenu-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border min-w-10 min-h-5.5 text-[#000000] text-style-il-regular',
    },
} as const;

const dropmenuOverlayVariantsConfig = {
    variant: {
        // default
        '0': 'bg-(image:--dropmenu-0-default-arrow-src) bg-position-[right_5px_top_2px] bg-size-[16px_16px] bg-no-repeat pixel-art',
        // black
        '1': 'bg-(image:--dropmenu-1-default-arrow-src) bg-position-[right_5px_top_2px] bg-size-[16px_16px] bg-no-repeat pixel-art',
        // default
        '3': '',
        // default
        '100': 'bg-(image:--dropmenu-0-default-arrow-src) bg-position-[right_5px_top_2px] bg-size-[16px_16px] bg-no-repeat pixel-art',
    },
} as const;

const dropmenuTintColors: Partial<Record<string, string>> = {

};

const dropmenuTintableVars: Partial<Record<string, string[]>> = {
    '0': ['dropmenu-0-default-src'],
    '1': ['button-1-default-src'],
    '3': ['dropmenu-3-default-src', 'dropmenu-3-hovering-src'],
    '100': ['dropmenu-0-default-src'],
};

const dropmenuVariants = cva('', { variants: dropmenuVariantsConfig, defaultVariants: { variant: '0' } });
const dropmenuOverlayVariants = cva('', { variants: dropmenuOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type DropmenuVariantProps = VariantProps<typeof dropmenuVariantsConfig>;

interface DropmenuProps extends HTMLAttributes<HTMLDivElement>, DropmenuVariantProps {
    className?: string;
    tintColor?: string;
    defaultVariant?: string;
}

export const Dropmenu = forwardRef<HTMLDivElement, DropmenuProps>(
    ({ className, variant, defaultVariant, tintColor, style, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('dropmenu');
        const requestedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0');
        /*
         * SkinContainer.getSkinRendererByTypeAndStyle falls back to style 0 for styles
         * with no registered skin (layout XMLs freely reference e.g. dropmenu style 2/4)
         */
        const resolvedVariant = (requestedVariant in dropmenuVariantsConfig.variant ? requestedVariant : '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['dropmenu']?.[resolvedVariant as string];
        const resolvedTint = tintColor || dropmenuTintColors[resolvedVariant as string];
        const overlayClassName = dropmenuOverlayVariants({ variant: resolvedVariant });
        const tintStyle = useTintedVars(dropmenuTintableVars[resolvedVariant as string], resolvedTint);

        return (
            <div
                ref={ref}
                className={cn(dropmenuVariants({ variant: resolvedVariant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

Dropmenu.displayName = 'Dropmenu';
