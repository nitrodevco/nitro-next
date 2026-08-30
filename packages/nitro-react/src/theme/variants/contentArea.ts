import { ThemeVariant, ThemeVariants } from '../utils';

/** `ContentArea` variants - the Flash `style` ids it draws. */
export type ContentAreaVariant = ThemeVariant;

export const CONTENT_AREA_VARIANTS: ThemeVariants<ContentAreaVariant> = {
    0: { layout: { paddingBottom: 3, paddingLeft: 6, paddingRight: 6 } },
    3: { layout: { position: 'relative', paddingLeft: 3, paddingRight: 3, paddingTop: 1, paddingBottom: 4 } },
};
