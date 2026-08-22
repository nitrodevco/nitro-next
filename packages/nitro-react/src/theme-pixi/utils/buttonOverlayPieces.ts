import { Composite, CompositePiece } from "../layer";

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
    { textureKey: 'button-100-default-button-center-left-curve-src', left: 12, width: 3, height: 5 },
    { textureKey: 'button-100-default-button-center-right-curve-src', right: 12, width: 3, height: 5 },
];

export const BUTTON_100_DEFAULT_OVERLAY = Composite(buttonPieces('button-100-default-button'));

export const BUTTON_100_PRESSED_OVERLAY = Composite([
    ...buttonPieces('button-100-pressed-button').slice(0, 9),
    { textureKey: 'bubble-0-default-spacer-src', left: 12, width: 1, height: 1 },
    { textureKey: 'bubble-0-default-spacer-src', right: 12, width: 1, height: 1 },
]);

export const BUTTON_CURVE_OVERLAY = Composite([
    { textureKey: 'button-100-default-button-center-left-curve-src', left: 1, width: 3, height: 5 },
    { textureKey: 'button-100-default-button-center-right-curve-src', right: 1, width: 3, height: 5 },
]);

export const BUTTON_CURVE_PRESSED_OVERLAY = Composite([
    { textureKey: 'bubble-0-default-spacer-src', left: 1, width: 1, height: 1 },
    { textureKey: 'bubble-0-default-spacer-src', right: 1, width: 1, height: 1 },
]);
