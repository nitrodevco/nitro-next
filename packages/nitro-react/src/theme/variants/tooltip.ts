import { NineSlice } from '../layer';
import { ThemeVariant, ThemeVariants } from '../utils';

/** `Tooltip` variants - the Flash `style` ids it draws. */
export type TooltipVariant = ThemeVariant;

export const TOOLTIP_VARIANTS: ThemeVariants<TooltipVariant> = {
    // default
    0: {
        layer: NineSlice('tooltip-0-default-src', 6, 6, 6, 6),
        layout: { minWidth: 20, minHeight: 22, paddingLeft: 6, paddingRight: 6 },
    },
};
