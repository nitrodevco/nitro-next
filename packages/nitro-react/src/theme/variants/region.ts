import { ThemeVariant, ThemeVariants } from '../utils';
import { defineVariants } from './defineVariants';

/**
 * `Region` variants - the Flash `style` ids of `region` elements: the element description's view/colour
 * (see ./elements.ts) merged with the art layers drawn here.
 */
export type RegionVariant = ThemeVariant;

export const REGION_VARIANTS: ThemeVariants<RegionVariant> = defineVariants<RegionVariant>('region', {
    0: {},
});
