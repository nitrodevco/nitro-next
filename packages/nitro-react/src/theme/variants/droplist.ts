import { NineSlice } from '../layer';
import { ThemeVariant, ThemeVariants } from '../utils';

/** `Droplist` variants - the Flash `style` ids it draws. */
export type DroplistVariant = ThemeVariant & {
    arrowTextureKey: string;
    arrowTop: number;
    arrowRight: number;
};

export const DROPLIST_VARIANTS: ThemeVariants<DroplistVariant> = {
    0: { layer: NineSlice('dropmenu-0-default-src', 3, 3, 3, 3), arrowTextureKey: 'dropmenu-0-default-arrow-src', arrowTop: 2, arrowRight: 5 },
    1: { layer: NineSlice('droplist-1-default-src', 6, 6, 6, 6), arrowTextureKey: 'droplist-1-default-arrow-src', arrowTop: 10, arrowRight: 4 },
};
