import { ButtonHTMLAttributes, forwardRef } from 'react';

import { cn, cva, useCascadedVariant, useTintedVars, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const containerButtonVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--button-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border hover:[border-image-source:var(--button-0-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] active:[border-image-source:var(--button-0-pressed-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px]  aria-disabled:[border-image-source:var(--button-0-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] ',
        // black
        '1': '[border-image-source:var(--button-1-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border hover:[border-image-source:var(--button-1-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] active:[border-image-source:var(--border-3-default-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px]  aria-disabled:[border-image-source:var(--button-1-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] ',
        // white
        '2': '[border-image-source:var(--button-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border hover:[border-image-source:var(--button-0-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] active:[border-image-source:var(--button-0-pressed-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px]  aria-disabled:[border-image-source:var(--button-0-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] ',
        // default
        '3': '[border-image-source:var(--buttonthick-3-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] nine-slice-border hover:[border-image-source:var(--buttonthick-3-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] active:[border-image-source:var(--buttonthick-3-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px]  aria-disabled:[border-image-source:var(--buttonthick-3-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] ',
        // black
        '4': '[border-image-source:var(--containerbutton-4-default-src)] [border-image-slice:6_6_7_6_fill] [border-image-width:6px_6px_7px_6px] nine-slice-border hover:[border-image-source:var(--containerbutton-4-hovering-src)] hover:[border-image-slice:6_6_7_6_fill] hover:[border-image-width:6px_6px_7px_6px] active:[border-image-source:var(--containerbutton-4-pressed-src)] active:[border-image-slice:6_6_7_6_fill] active:[border-image-width:6px_6px_7px_6px]  aria-disabled:[border-image-source:var(--containerbutton-4-disabled-src)] aria-disabled:[border-image-slice:6_6_7_6_fill] aria-disabled:[border-image-width:6px_6px_7px_6px] aria-disabled:[border-image-repeat:stretch] ',
        // white
        '5': '[border-image-source:var(--containerbutton-4-default-src)] [border-image-slice:6_6_7_6_fill] [border-image-width:6px_6px_7px_6px] nine-slice-border hover:[border-image-source:var(--containerbutton-4-hovering-src)] hover:[border-image-slice:6_6_7_6_fill] hover:[border-image-width:6px_6px_7px_6px] active:[border-image-source:var(--containerbutton-4-pressed-src)] active:[border-image-slice:6_6_7_6_fill] active:[border-image-width:6px_6px_7px_6px]  aria-disabled:[border-image-source:var(--containerbutton-4-disabled-src)] aria-disabled:[border-image-slice:6_6_7_6_fill] aria-disabled:[border-image-width:6px_6px_7px_6px] aria-disabled:[border-image-repeat:stretch] ',
        // green
        '6': '[border-image-source:var(--buttonthick-3-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] nine-slice-border hover:[border-image-source:var(--buttonthick-3-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] active:[border-image-source:var(--buttonthick-3-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px]  aria-disabled:[border-image-source:var(--buttonthick-3-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] ',
        // landing view
        '100': '[border-image-source:var(--button-100-default-src)] [border-image-slice:1_1_1_1] [border-image-width:1px_1px_1px_1px] nine-slice-border hover:[border-image-source:var(--button-100-hovering-src)] hover:[border-image-slice:19_19_19_19] hover:[border-image-width:19px_19px_19px_19px] active:[border-image-source:var(--button-100-hovering-src)] active:[border-image-slice:19_19_19_19] active:[border-image-width:19px_19px_19px_19px] ',
        // window
        '101': '[border-image-source:var(--button-100-default-src)] [border-image-slice:1_1_1_1] [border-image-width:1px_1px_1px_1px] nine-slice-border hover:[border-image-source:var(--button-100-hovering-src)] hover:[border-image-slice:19_19_19_19] hover:[border-image-width:19px_19px_19px_19px] active:[border-image-source:var(--button-100-hovering-src)] active:[border-image-slice:19_19_19_19] active:[border-image-width:19px_19px_19px_19px] ',
        // plain
        '102': '[border-image-source:var(--button-102-default-src)] [border-image-slice:8_4_8_6_fill] [border-image-width:8px_4px_8px_6px] nine-slice-border active:[border-image-source:var(--button-102-pressed-src)] active:[border-image-slice:8_4_8_6_fill] active:[border-image-width:8px_4px_8px_6px] ',
        // unetched
        '103': '[border-image-source:var(--button-103-default-src)] [border-image-slice:8_4_8_6_fill] [border-image-width:8px_4px_8px_6px] nine-slice-border active:[border-image-source:var(--button-103-pressed-src)] active:[border-image-slice:8_4_8_6_fill] active:[border-image-width:8px_4px_8px_6px] ',
        // default
        '200': '[border-image-source:var(--button-200-default-src)] [border-image-slice:4_4_5_4_fill] [border-image-width:4px_4px_5px_4px] nine-slice-border',
    },
} as const;

const containerButtonOverlayVariantsConfig = {
    variant: {
        // default
        '0': '',
        // black
        '1': '',
        // white
        '2': '',
        // default
        '3': '',
        // black
        '4': '',
        // white
        '5': '',
        // green
        '6': '',
        // landing view
        '100': '[background-image:var(--button-100-default-button-top-left-src),_var(--button-100-default-button-top-center-src),_var(--button-100-default-button-top-right-src),_var(--button-100-default-button-center-left-src),_var(--button-100-default-button-center-center-src),_var(--button-100-default-button-center-right-src),_var(--button-100-default-button-bottom-left-src),_var(--button-100-default-button-bottom-center-src),_var(--button-100-default-button-bottom-right-src),_var(--button-100-default-button-center-left-curve-src),_var(--button-100-default-button-center-right-curve-src)] [background-position:left_11px_top_11px,_left_17px_top_11px,_right_11px_top_11px,_left_11px_top_19px,_left_17px_top_19px,_right_11px_top_19px,_left_11px_bottom_11px,_left_17px_bottom_11px,_right_11px_bottom_11px,_left_12px_center,_right_12px_center] [background-size:6px_8px,_calc(100%_-_17px_-_15px)_8px,_4px_8px,_6px_calc(100%_-_19px_-_19px),_calc(100%_-_17px_-_15px)_calc(100%_-_19px_-_19px),_4px_calc(100%_-_19px_-_19px),_6px_8px,_calc(100%_-_17px_-_15px)_8px,_4px_8px,_3px_5px,_3px_5px] bg-no-repeat pixel-art hover:[background-image:var(--button-100-default-button-top-left-src),_var(--button-100-default-button-top-center-src),_var(--button-100-default-button-top-right-src),_var(--button-100-default-button-center-left-src),_var(--button-100-default-button-center-center-src),_var(--button-100-default-button-center-right-src),_var(--button-100-default-button-bottom-left-src),_var(--button-100-default-button-bottom-center-src),_var(--button-100-default-button-bottom-right-src),_var(--button-100-default-button-center-left-curve-src),_var(--button-100-default-button-center-right-curve-src)] hover:[background-position:left_11px_top_11px,_left_17px_top_11px,_right_11px_top_11px,_left_11px_top_19px,_left_17px_top_19px,_right_11px_top_19px,_left_11px_bottom_11px,_left_17px_bottom_11px,_right_11px_bottom_11px,_left_12px_center,_right_12px_center] hover:[background-size:6px_8px,_calc(100%_-_17px_-_15px)_8px,_4px_8px,_6px_calc(100%_-_19px_-_19px),_calc(100%_-_17px_-_15px)_calc(100%_-_19px_-_19px),_4px_calc(100%_-_19px_-_19px),_6px_8px,_calc(100%_-_17px_-_15px)_8px,_4px_8px,_3px_5px,_3px_5px] active:[background-image:var(--button-100-pressed-button-top-left-src),_var(--button-100-pressed-button-top-center-src),_var(--button-100-pressed-button-top-right-src),_var(--button-100-pressed-button-center-left-src),_var(--button-100-pressed-button-center-center-src),_var(--button-100-pressed-button-center-right-src),_var(--button-100-pressed-button-bottom-left-src),_var(--button-100-pressed-button-bottom-center-src),_var(--button-100-pressed-button-bottom-right-src),_var(--bubble-0-default-spacer-src),_var(--bubble-0-default-spacer-src)] active:[background-position:left_11px_top_11px,_left_17px_top_11px,_right_11px_top_11px,_left_11px_top_19px,_left_17px_top_19px,_right_11px_top_19px,_left_11px_bottom_11px,_left_17px_bottom_11px,_right_11px_bottom_11px,_left_12px_center,_right_12px_center] active:[background-size:6px_8px,_calc(100%_-_17px_-_15px)_8px,_4px_8px,_6px_calc(100%_-_19px_-_19px),_calc(100%_-_17px_-_15px)_calc(100%_-_19px_-_19px),_4px_calc(100%_-_19px_-_19px),_6px_8px,_calc(100%_-_17px_-_15px)_8px,_4px_8px,_1px_1px,_1px_1px]',
        // window
        '101': '[background-image:var(--button-100-default-button-top-left-src),_var(--button-100-default-button-top-center-src),_var(--button-100-default-button-top-right-src),_var(--button-100-default-button-center-left-src),_var(--button-100-default-button-center-center-src),_var(--button-100-default-button-center-right-src),_var(--button-100-default-button-bottom-left-src),_var(--button-100-default-button-bottom-center-src),_var(--button-100-default-button-bottom-right-src),_var(--button-100-default-button-center-left-curve-src),_var(--button-100-default-button-center-right-curve-src)] [background-position:left_11px_top_11px,_left_17px_top_11px,_right_11px_top_11px,_left_11px_top_19px,_left_17px_top_19px,_right_11px_top_19px,_left_11px_bottom_11px,_left_17px_bottom_11px,_right_11px_bottom_11px,_left_12px_center,_right_12px_center] [background-size:6px_8px,_calc(100%_-_17px_-_15px)_8px,_4px_8px,_6px_calc(100%_-_19px_-_19px),_calc(100%_-_17px_-_15px)_calc(100%_-_19px_-_19px),_4px_calc(100%_-_19px_-_19px),_6px_8px,_calc(100%_-_17px_-_15px)_8px,_4px_8px,_3px_5px,_3px_5px] bg-no-repeat pixel-art hover:[background-image:var(--button-100-default-button-top-left-src),_var(--button-100-default-button-top-center-src),_var(--button-100-default-button-top-right-src),_var(--button-100-default-button-center-left-src),_var(--button-100-default-button-center-center-src),_var(--button-100-default-button-center-right-src),_var(--button-100-default-button-bottom-left-src),_var(--button-100-default-button-bottom-center-src),_var(--button-100-default-button-bottom-right-src),_var(--button-100-default-button-center-left-curve-src),_var(--button-100-default-button-center-right-curve-src)] hover:[background-position:left_11px_top_11px,_left_17px_top_11px,_right_11px_top_11px,_left_11px_top_19px,_left_17px_top_19px,_right_11px_top_19px,_left_11px_bottom_11px,_left_17px_bottom_11px,_right_11px_bottom_11px,_left_12px_center,_right_12px_center] hover:[background-size:6px_8px,_calc(100%_-_17px_-_15px)_8px,_4px_8px,_6px_calc(100%_-_19px_-_19px),_calc(100%_-_17px_-_15px)_calc(100%_-_19px_-_19px),_4px_calc(100%_-_19px_-_19px),_6px_8px,_calc(100%_-_17px_-_15px)_8px,_4px_8px,_3px_5px,_3px_5px] active:[background-image:var(--button-100-pressed-button-top-left-src),_var(--button-100-pressed-button-top-center-src),_var(--button-100-pressed-button-top-right-src),_var(--button-100-pressed-button-center-left-src),_var(--button-100-pressed-button-center-center-src),_var(--button-100-pressed-button-center-right-src),_var(--button-100-pressed-button-bottom-left-src),_var(--button-100-pressed-button-bottom-center-src),_var(--button-100-pressed-button-bottom-right-src),_var(--bubble-0-default-spacer-src),_var(--bubble-0-default-spacer-src)] active:[background-position:left_11px_top_11px,_left_17px_top_11px,_right_11px_top_11px,_left_11px_top_19px,_left_17px_top_19px,_right_11px_top_19px,_left_11px_bottom_11px,_left_17px_bottom_11px,_right_11px_bottom_11px,_left_12px_center,_right_12px_center] active:[background-size:6px_8px,_calc(100%_-_17px_-_15px)_8px,_4px_8px,_6px_calc(100%_-_19px_-_19px),_calc(100%_-_17px_-_15px)_calc(100%_-_19px_-_19px),_4px_calc(100%_-_19px_-_19px),_6px_8px,_calc(100%_-_17px_-_15px)_8px,_4px_8px,_1px_1px,_1px_1px] ',
        // plain
        '102': '[background-image:var(--button-100-default-button-center-left-curve-src),_var(--button-100-default-button-center-right-curve-src)] [background-position:left_1px_center,_right_1px_center] [background-size:3px_5px,_3px_5px] bg-no-repeat pixel-art active:[background-image:var(--bubble-0-default-spacer-src),_var(--bubble-0-default-spacer-src)] active:[background-position:left_1px_center,_right_1px_center] active:[background-size:1px_1px,_1px_1px]',
        // unetched
        '103': '[background-image:var(--button-100-default-button-center-left-curve-src),_var(--button-100-default-button-center-right-curve-src)] [background-position:left_1px_center,_right_1px_center] [background-size:3px_5px,_3px_5px] bg-no-repeat pixel-art active:[background-image:var(--bubble-0-default-spacer-src),_var(--bubble-0-default-spacer-src)] active:[background-position:left_1px_center,_right_1px_center] active:[background-size:1px_1px,_1px_1px]',
        // default
        '200': '',
    },
} as const;

const containerButtonTintColors: Partial<Record<string, string>> = {
    '6': '#00aa00',
    '101': '#bbbbbb',
};

const containerButtonTintableVars: Partial<Record<string, string[]>> = {
    '0': ['button-0-default-src', 'button-0-hovering-src', 'button-0-pressed-src', 'button-0-disabled-src'],
    '1': ['button-1-default-src', 'button-1-hovering-src', 'border-3-default-src', 'button-1-disabled-src'],
    '2': ['button-0-default-src', 'button-0-hovering-src', 'button-0-pressed-src', 'button-0-disabled-src'],
    '3': ['buttonthick-3-default-src', 'buttonthick-3-hovering-src', 'buttonthick-3-pressed-src', 'buttonthick-3-disabled-src'],
    '4': ['containerbutton-4-default-src', 'containerbutton-4-hovering-src', 'containerbutton-4-pressed-src', 'containerbutton-4-disabled-src'],
    '5': ['containerbutton-4-default-src', 'containerbutton-4-hovering-src', 'containerbutton-4-pressed-src', 'containerbutton-4-disabled-src'],
    '6': ['buttonthick-3-default-src', 'buttonthick-3-hovering-src', 'buttonthick-3-pressed-src', 'buttonthick-3-disabled-src'],
    '100': ['button-100-default-src', 'button-100-hovering-src'],
    '101': ['button-100-default-src', 'button-100-hovering-src'],
    '103': ['button-103-default-src', 'button-103-pressed-src'],
};

const containerButtonVariants = cva('flex items-center justify-center pointer-events-auto leading-0 not-aria-disabled:cursor-pointer', { variants: containerButtonVariantsConfig, defaultVariants: { variant: '0' } });
const containerButtonOverlayVariants = cva('', { variants: containerButtonOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type ContainerButtonVariantProps = VariantProps<typeof containerButtonVariantsConfig>;

interface ContainerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ContainerButtonVariantProps {
    className?: string;
    tintColor?: string;
    defaultVariant?: string;
}

export const ContainerButton = forwardRef<HTMLButtonElement, ContainerButtonProps>(
    ({ className, variant, defaultVariant, tintColor, style, children, disabled, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('containerButton');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['containerButton']?.[resolvedVariant];
        const resolvedTint = tintColor || containerButtonTintColors[resolvedVariant as string];
        const overlayClassName = containerButtonOverlayVariants({ variant: resolvedVariant });
        const tintStyle = useTintedVars(containerButtonTintableVars[resolvedVariant as string], resolvedTint);

        return (
            <button
                ref={ref}
                className={cn(containerButtonVariants({ variant: resolvedVariant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                disabled={disabled}
                aria-disabled={disabled || undefined}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </button>
        );
    }
);

ContainerButton.displayName = 'ContainerButton';
