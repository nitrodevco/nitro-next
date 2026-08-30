import { ThemeVariant, ThemeVariants } from '../utils';

/** `TabContext` variants - the Flash `style` ids it draws. */
export type TabContextVariant = ThemeVariant;

export const TAB_CONTEXT_VARIANTS: ThemeVariants<TabContextVariant> = {
    0: { layout: { minHeight: 22, maxHeight: 22 } },
    3: {},
};
