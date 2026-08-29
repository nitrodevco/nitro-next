import { Stretch } from '../layer';
import { ThemeVariant, ThemeVariants } from '../utils';
import { defineVariants } from './defineVariants';

/**
 * `FramePointerDown` variants - the Flash `style` ids of `frame_pointer_down` elements: the element description's view/colour
 * (see ./elements.ts) merged with the art layers drawn here.
 */
export type FramePointerDownVariant = ThemeVariant;

export const FRAME_POINTER_DOWN_VARIANTS: ThemeVariants<FramePointerDownVariant> = defineVariants<FramePointerDownVariant>('frame_pointer_down', {
    7: { layer: Stretch('framepointerdown-src'), layout: { width: 16, height: 12 } },
});
