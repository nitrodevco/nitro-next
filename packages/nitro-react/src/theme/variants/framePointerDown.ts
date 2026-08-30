import { Stretch } from '../layer';
import { ThemeVariant, ThemeVariants } from '../utils';

/** `FramePointerDown` variants - the Flash `style` ids it draws. */
export type FramePointerDownVariant = ThemeVariant;

export const FRAME_POINTER_DOWN_VARIANTS: ThemeVariants<FramePointerDownVariant> = {
    7: { layer: Stretch('framepointerdown-src'), layout: { width: 16, height: 12 } },
};
