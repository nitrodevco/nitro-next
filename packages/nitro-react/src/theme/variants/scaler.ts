import { Stretch } from '../layer';
import { ThemeVariant, ThemeVariants } from '../utils';
import { defineVariants } from './defineVariants';

/**
 * `Scaler` variants - the Flash `style` ids of `scaler` elements: the element description's view/colour
 * (see ./elements.ts) merged with the art layers drawn here.
 */
export type ScalerVariant = ThemeVariant;

export const SCALER_VARIANTS: ThemeVariants<ScalerVariant> = defineVariants<ScalerVariant>('scaler', {
    0: {
        layer: Stretch('scaler-0-default-src'),
        overlay: Stretch('scaler-0-default-shine-src'),
        zIndex: 20,
        layout: {
            right: 0,
            bottom: 0,
        },
    },
    1: {
        layer: Stretch('scaler-0-default-src'),
        overlay: Stretch('scaler-0-default-shine-src'),
    },
    2: {
        layer: Stretch('scaler-0-default-src'),
        overlay: Stretch('scaler-0-default-shine-src'),
    },
    3: {
        layer: Stretch('scaler-src'),
    },
    4: {
        layer: Stretch('scaler-src'),
    },
});
