import { NineSlice } from '../layer';
import { ThemeVariant, ThemeVariants } from '../utils';
import { defineVariants } from './defineVariants';

/**
 * `Tooltip` variants - the Flash `style` ids of `tooltip` elements: the element description's view/colour
 * (see ./elements.ts) merged with the art layers drawn here.
 */
export type TooltipVariant = ThemeVariant;

export const TOOLTIP_VARIANTS: ThemeVariants<TooltipVariant> = defineVariants<TooltipVariant>('tooltip', {
    // default
    0: {
        layer: NineSlice('tooltip-0-default-src', 6, 6, 6, 6),
        layout: { minWidth: 20, minHeight: 22, paddingLeft: 6, paddingRight: 6 },
    },
});
