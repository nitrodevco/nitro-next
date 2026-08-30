import { Composite, CompositePiece, NineSlice } from '../layer';
import { ThemeVariant, ThemeVariants } from '../utils';

/** `Border` variants - the Flash `style` ids it draws. */
export type BorderVariant = ThemeVariant;

export const BORDER_VARIANTS: ThemeVariants<BorderVariant> = {
    0: { layer: NineSlice('border-0-default-src', 6, 6, 6, 6) },
    1: { layer: NineSlice('border-1-default-src', 6, 6, 6, 6) },
    2: { layer: NineSlice('border-2-default-src', 6, 6, 6, 6) },
    3: { layer: NineSlice('border-3-default-src', 3, 3, 3, 3) },
    4: { layer: NineSlice('border-4-default-src', 6, 6, 6, 6) },
    5: { layer: NineSlice('border-5-default-src', 5, 5, 5, 5) },
    6: { layer: NineSlice('border-6-default-src', 8, 8, 8, 8) },
    7: { layer: NineSlice('border-7-default-src', 6, 6, 6, 7) },
    8: { layer: NineSlice('border-8-default-src', 10, 10, 10, 10) },
    9: { layer: NineSlice('border-9-default-src', 7, 7, 7, 8), tintColor: '#686661' },
    10: { layer: NineSlice('border-10-default-src', 6, 6, 6, 8) },
    // habbo_skin - "white with sharpest corners" (border_slot_2)
    11: { layer: NineSlice('border-11-default-src', 3, 3, 3, 3) },
    // "white with thin dark border, sharpest corners, shadow"
    12: { layer: NineSlice('border-12-default-src', 5, 5, 5, 5) },
    // "ancient border"
    13: { layer: NineSlice('border-13-default-src', 12, 11, 12, 11) },
    // ubuntu_skin - "white round with grey light border"
    14: { layer: NineSlice('border-14-default-src', 10, 10, 10, 10) },
    // "recolorable round border" - the dark/mid/light HSV layers are pre-composed (see
    // scripts/extract-skin-assets.ts), the element's `color` tints the result.
    15: { layer: NineSlice('border-15-default-src', 5, 5, 5, 5) },
    16: { layer: NineSlice('border-16-default-src', 6, 6, 6, 6) },
    100: { layer: NineSlice('border-100-default-src', 3, 3, 3, 3) },
    101: {
        layer: Composite([
            CompositePiece('border-101-default-top-left-src', 0, 0, undefined, undefined, 4, 4),
            CompositePiece('border-101-default-top-center-src', 0, 4, 4, undefined, undefined, 4),
            CompositePiece('border-101-default-top-right-src', 0, undefined, 0, undefined, 4, 4),
            CompositePiece('border-101-default-center-left-src', 4, 0, undefined, 7, 1),
            CompositePiece('border-101-default-center-center-src', 4, 1, 1, 7),
            CompositePiece('border-101-default-center-left-src', 4, undefined, 0, 7, 1),
            CompositePiece('border-101-default-bottom-left-src', undefined, 0, undefined, 0, 4, 7),
            CompositePiece('border-101-default-bottom-center-src', undefined, 4, 4, 0, undefined, 7),
            CompositePiece('border-101-default-bottom-right-src', undefined, undefined, 0, 0, 4, 7),
        ]),
    },
    102: {
        layer: Composite([
            CompositePiece('border-102-default-top-left-src', 0, 0, undefined, undefined, 12, 14),
            CompositePiece('border-102-default-top-center-src', 0, 12, 6, undefined, undefined, 14),
            CompositePiece('border-102-default-top-right-src', 0, undefined, 0, undefined, 6, 14),
            CompositePiece('border-102-default-center-left-src', 14, 0, undefined, 4, 8),
            CompositePiece('border-102-default-center-center-src', 14, 8, 1, 4),
            CompositePiece('border-102-default-center-right-src', 14, undefined, 0, 4, 1),
            CompositePiece('border-102-default-bottom-left-src', undefined, 0, undefined, 0, 8, 4),
            CompositePiece('border-102-default-bottom-center-src', undefined, 8, 4, 0, undefined, 4),
            CompositePiece('border-102-default-bottom-right-src', undefined, undefined, 0, 0, 4, 4),
        ]),
    },
    103: {
        layer: Composite([
            CompositePiece('border-103-default-top-src', 0, 0, 0, undefined, undefined, 4),
            CompositePiece('border-103-default-center-src', 4, 0, 0, 12),
            CompositePiece('border-103-default-bottom-left-src', undefined, 0, undefined, 0, 4, 12),
            CompositePiece('border-103-default-bottom-center-src', undefined, 4, 4, 0, undefined, 12),
            CompositePiece('border-103-default-bottom-right-src', undefined, undefined, 0, 0, 4, 12),
        ]),
    },
    104: {
        layer: NineSlice('border-104-default-src', 7, 7, 7, 7),
        overlay: Composite([
            CompositePiece('border-104-default-border-top-left-src', 0, 0, undefined, undefined, 4, 4),
            CompositePiece('border-104-default-border-top-center-src', 0, 4, 4, undefined, undefined, 4),
            CompositePiece('border-104-default-border-top-right-src', 0, undefined, 0, undefined, 4, 4),
            CompositePiece('border-104-default-border-center-left-src', 4, 0, undefined, 5, 1),
            CompositePiece('border-104-default-border-center-left-src', 4, undefined, 0, 5, 1),
            CompositePiece('border-104-default-border-bottom-left-src', undefined, 0, undefined, 0, 4, 5),
            CompositePiece('border-104-default-border-bottom-center-src', undefined, 4, 4, 0, undefined, 5),
            CompositePiece('border-104-default-border-bottom-right-src', undefined, undefined, 0, 0, 4, 5),
        ]),
    },
    105: {
        layer: NineSlice('border-105-default-src', 5, 5, 5, 5),
        overlay: NineSlice('border-105-default-shine-src', 5, 5, 5, 5),
    },
    106: {
        layer: Composite([
            CompositePiece('border-106-default-top-left-src', 0, 0, undefined, undefined, 4, 5),
            CompositePiece('border-106-default-top-center-src', 0, 4, 4, undefined, undefined, 5),
            CompositePiece('border-106-default-top-right-src', 0, undefined, 0, undefined, 4, 5),
            CompositePiece('border-106-default-center-src', 5, 0, 0, 7),
            CompositePiece('border-106-default-bottom-left-src', undefined, 0, undefined, 0, 4, 7),
            CompositePiece('border-106-default-bottom-center-src', undefined, 4, 4, 0, undefined, 7),
            CompositePiece('border-106-default-bottom-right-src', undefined, undefined, 0, 0, 4, 7),
        ]),
    },
    107: {
        layer: Composite([
            CompositePiece('border-107-default-background-top-left-src', 0, 0, undefined, undefined, 5, 10),
            CompositePiece('border-107-default-background-top-center-src', 0, 5, 5, undefined, undefined, 10),
            CompositePiece('border-107-default-background-top-right-src', 0, undefined, 0, undefined, 5, 10),
            CompositePiece('border-107-default-background-center-left-src', 10, 0, undefined, 5, 1),
            CompositePiece('border-107-default-background-center-center-src', 10, 1, 1, 5),
            CompositePiece('border-107-default-background-center-left-src', 10, undefined, 0, 5, 1),
            CompositePiece('border-107-default-background-bottom-left-src', undefined, 0, undefined, 0, 5, 5),
            CompositePiece('border-107-default-background-bottom-center-src', undefined, 5, 5, 0, undefined, 5),
            CompositePiece('border-107-default-background-bottom-right-src', undefined, undefined, 0, 0, 5, 5),
        ]),
    },
    108: { layer: NineSlice('border-108-default-src', 3, 3, 3, 3), tintColor: '#676767' },
    200: { layer: NineSlice('border-200-default-src', 3, 3, 3, 3) },
};
