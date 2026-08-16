import { forwardRef, type HTMLAttributes } from 'react';

import { BitmapText, type BitmapTextRecipe } from './bitmap-text';
import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const tabButtonVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--tabbutton-0-default-src)] [border-image-slice:5_5_2_5_fill] [border-image-width:5px_5px_0px_5px] nine-slice-border hover:[border-image-source:var(--tabbutton-0-hovering-src)] hover:[border-image-slice:5_5_2_5_fill] hover:[border-image-width:5px_5px_0px_5px] aria-selected:[border-image-source:var(--tabbutton-0-selected-src)] aria-selected:[border-image-slice:5_5_2_5_fill] aria-selected:[border-image-width:5px_5px_0px_5px] active:[border-image-source:var(--tabbutton-0-selected-src)] active:[border-image-slice:5_5_2_5_fill] active:[border-image-width:5px_5px_0px_5px]  min-w-5 min-h-5.5 pl-2 pt-0.5 pr-2 pb-1 text-[#000000] text-style-button-tab',
        // black
        '1': '[border-image-source:var(--tabbutton-1-default-src)] [border-image-slice:5_5_2_5_fill] [border-image-width:5px_5px_0px_5px] nine-slice-border hover:[border-image-source:var(--tabbutton-1-hovering-src)] hover:[border-image-slice:5_5_2_5_fill] hover:[border-image-width:5px_5px_0px_5px] aria-selected:[border-image-source:var(--tabbutton-1-selected-src)] aria-selected:[border-image-slice:5_5_2_5_fill] aria-selected:[border-image-width:5px_5px_0px_5px] active:[border-image-source:var(--tabbutton-1-selected-src)] active:[border-image-slice:5_5_2_5_fill] active:[border-image-width:5px_5px_0px_5px]  min-w-5 min-h-5.5 pl-2 pt-0.5 pr-2 pb-1 text-[#ffffff] text-style-button-tab',
        // white
        '2': '[border-image-source:var(--tabbutton-0-default-src)] [border-image-slice:5_5_2_5_fill] [border-image-width:5px_5px_0px_5px] nine-slice-border hover:[border-image-source:var(--tabbutton-0-hovering-src)] hover:[border-image-slice:5_5_2_5_fill] hover:[border-image-width:5px_5px_0px_5px] aria-selected:[border-image-source:var(--tabbutton-0-selected-src)] aria-selected:[border-image-slice:5_5_2_5_fill] aria-selected:[border-image-width:5px_5px_0px_5px] active:[border-image-source:var(--tabbutton-0-selected-src)] active:[border-image-slice:5_5_2_5_fill] active:[border-image-width:5px_5px_0px_5px] min-w-5 min-h-5.5 pl-2 pt-0.5 pr-2 pb-1 text-[#000000] text-style-button-tab',
        // default
        '3': '[border-image-source:var(--tabbutton-3-default-src)] [border-image-slice:0_9_0_9_fill] [border-image-width:0px_9px_0px_9px] nine-slice-border hover:[border-image-source:var(--tabbutton-3-hovering-src)] hover:[border-image-slice:0_9_0_9_fill] hover:[border-image-width:0px_9px_0px_9px] aria-selected:[border-image-source:var(--tabbutton-3-selected-src)] aria-selected:[border-image-slice:0_9_0_9_fill] aria-selected:[border-image-width:0px_9px_0px_9px] active:[border-image-source:var(--tabbutton-3-selected-src)] active:[border-image-slice:0_9_0_9_fill] active:[border-image-width:0px_9px_0px_9px]  min-h-[32px] max-h-[32px] px-2.5 text-[#000000] text-style-button-shiny-regular',
    },
} as const;

const tabButtonVariants = cva(
    'cursor-pointer flex items-center justify-center leading-none',
    {
        variants: tabButtonVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type TabButtonVariantProps = VariantProps<typeof tabButtonVariantsConfig>;

interface TabButtonProps extends HTMLAttributes<HTMLDivElement>, TabButtonVariantProps {
    className?: string;
    defaultVariant?: string;
    textRecipe?: BitmapTextRecipe;
    textColor?: string;
}

export const TabButton = forwardRef<HTMLDivElement, TabButtonProps>(
    (
        {
            className,
            variant,
            defaultVariant,
            textRecipe,
            textColor = '#000000',
            children,
            ...props
        },
        ref,
    ) => {
        const cascadedVariant = useCascadedVariant('tabButton');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['tabButton']?.[resolvedVariant as string];
        return (
            <div
                ref={ref}
                className={cn(tabButtonVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>
                    {textRecipe && (typeof children === 'string' || typeof children === 'number') ? (
                        <BitmapText
                            recipe={textRecipe}
                            color={textColor}
                            align="center"
                            className="relative block h-[18px] w-full">
                            {children}
                        </BitmapText>
                    ) : children}
                </VariantCascadeProvider>
            </div>
        );
    }
);

TabButton.displayName = 'TabButton';
