import { NineSlice } from '../layer';
import { ThemeVariant, ThemeVariants } from '../utils';
import { defineVariants } from './defineVariants';

/**
 * `Droplist` variants - the Flash `style` ids of `droplist` elements: the element description's view/colour
 * (see ./elements.ts) merged with the art layers drawn here.
 */
export type DroplistVariant = ThemeVariant & {
    arrowTextureKey: string;
    arrowTop: number;
    arrowRight: number;
};

export const DROPLIST_VARIANTS: ThemeVariants<DroplistVariant> = defineVariants<DroplistVariant>('droplist', {
    0: { layer: NineSlice('dropmenu-0-default-src', 3, 3, 3, 3), arrowTextureKey: 'dropmenu-0-default-arrow-src', arrowTop: 2, arrowRight: 5 },
    1: { layer: NineSlice('droplist-1-default-src', 6, 6, 6, 6), arrowTextureKey: 'droplist-1-default-arrow-src', arrowTop: 10, arrowRight: 4 },
});
