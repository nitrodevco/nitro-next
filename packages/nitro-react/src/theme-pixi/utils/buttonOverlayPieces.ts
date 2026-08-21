import type { CompositePiece } from './Layer';

/**
 * Shared composite-overlay piece data for the "landing view"/"window" button chrome
 * (`button-100-*` assets) and the "plain"/"unetched" curve chrome (a 2-piece subset of the
 * same asset set) - reused verbatim by both Button (variants 100/101/102/103) and
 * ContainerButton (same variant numbers), since theme/Button.tsx's and
 * theme/ContainerButton.tsx's `buttonOverlayVariantsConfig`/`containerButtonOverlay
 * VariantsConfig` reference the exact same `--button-100-*`/`--button-100-pressed-*`
 * CSS custom properties for both components - real DOM asset sharing, not a coincidence.
 */

// Full 11-piece button-piece composite shared by variants 100/101, default+hovering state.
const buttonPieces = (prefix: string): CompositePiece[] => [
    { textureKey: `${prefix}-top-left-src`, top: 11, left: 11, width: 6, height: 8 },
    { textureKey: `${prefix}-top-center-src`, top: 11, left: 17, right: 15, height: 8 },
    { textureKey: `${prefix}-top-right-src`, top: 11, right: 11, width: 4, height: 8 },
    { textureKey: `${prefix}-center-left-src`, top: 19, left: 11, bottom: 19, width: 6 },
    { textureKey: `${prefix}-center-center-src`, top: 19, left: 17, right: 15, bottom: 19 },
    { textureKey: `${prefix}-center-right-src`, top: 19, right: 11, bottom: 19, width: 4 },
    { textureKey: `${prefix}-bottom-left-src`, bottom: 11, left: 11, width: 6, height: 8 },
    { textureKey: `${prefix}-bottom-center-src`, bottom: 11, left: 17, right: 15, height: 8 },
    { textureKey: `${prefix}-bottom-right-src`, bottom: 11, right: 11, width: 4, height: 8 },
    // Curve pieces are DOM `background-position: ... center` - left/right unset on the cross
    // axis so the button's own Box `alignItems: 'center'` (flexDirection 'row') centers them
    // vertically, the same "unset edge = not anchored" convention CompositePiece already uses
    // for stretch, extended here to centering via the parent's own cross-axis alignment.
    { textureKey: 'button-100-default-button-center-left-curve-src', left: 12, width: 3, height: 5 },
    { textureKey: 'button-100-default-button-center-right-curve-src', right: 12, width: 3, height: 5 },
];

export const BUTTON_100_DEFAULT_OVERLAY = buttonPieces('button-100-default-button');
export const BUTTON_100_PRESSED_OVERLAY: CompositePiece[] = [
    ...buttonPieces('button-100-pressed-button').slice(0, 9),
    { textureKey: 'bubble-0-default-spacer-src', left: 12, width: 1, height: 1 },
    { textureKey: 'bubble-0-default-spacer-src', right: 12, width: 1, height: 1 },
];

// 2-piece curve composite shared by variants 102/103.
export const BUTTON_CURVE_OVERLAY: CompositePiece[] = [
    { textureKey: 'button-100-default-button-center-left-curve-src', left: 1, width: 3, height: 5 },
    { textureKey: 'button-100-default-button-center-right-curve-src', right: 1, width: 3, height: 5 },
];
export const BUTTON_CURVE_PRESSED_OVERLAY: CompositePiece[] = [
    { textureKey: 'bubble-0-default-spacer-src', left: 1, width: 1, height: 1 },
    { textureKey: 'bubble-0-default-spacer-src', right: 1, width: 1, height: 1 },
];
