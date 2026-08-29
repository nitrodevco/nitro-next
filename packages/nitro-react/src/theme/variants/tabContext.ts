import { ThemeVariant, ThemeVariants } from '../utils';
import { defineVariants } from './defineVariants';

/**
 * `TabContext` variants - the Flash `style` ids of `tab_context` elements: the element description's view/colour
 * (see ./elements.ts) merged with the art layers drawn here.
 */
export type TabContextVariant = ThemeVariant;

export const TAB_CONTEXT_VARIANTS: ThemeVariants<TabContextVariant> = defineVariants<TabContextVariant>('tab_context', {
    0: { layout: { minHeight: 22, maxHeight: 22 } },
    3: {},
});
