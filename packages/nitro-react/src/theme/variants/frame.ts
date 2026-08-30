import { Composite, CompositePiece, NineSlice } from '../layer';
import { ThemeVariant, ThemeVariants } from '../utils';

/** `Frame` variants - the Flash `style` ids it draws. */
export type FrameVariant = ThemeVariant;

const BLUE_FRAME_SHINE = Composite([
    CompositePiece('frame-0-default-shine-top-left-src', 1, 1, undefined, undefined, 7, 7),
    CompositePiece('frame-0-default-shine-top-center-src', 2, 8, 8, undefined, undefined, 1),
    CompositePiece('frame-0-default-shine-top-right-src', 1, undefined, 1, undefined, 7, 7),
    CompositePiece('frame-0-default-shine-top-center-src', 8, 2, undefined, 8, 1),
    CompositePiece('frame-0-default-shine-top-center-src', 8, undefined, 2, 7, 1),
    CompositePiece('frame-0-default-shine-bottom-left-src', undefined, 1, undefined, 1, 7, 7),
    CompositePiece('frame-0-default-shine-top-center-src', undefined, 8, 7, 2, undefined, 1),
    CompositePiece('frame-0-default-shine-bottom-right-src', undefined, undefined, 1, 1, 6, 6),
]);

const FRAME_3_SHINE = NineSlice('frame-3-default-shine-src', 10, 33, 10, 10);

export const FRAME_VARIANTS: ThemeVariants<FrameVariant> = {
    0: { layer: NineSlice('frame-0-default-src', 13, 13, 13, 13), overlay: BLUE_FRAME_SHINE, layout: { minWidth: 40, minHeight: 50, paddingTop: 2, paddingBottom: 2 }, tintColor: '#418db0' },
    1: { layer: NineSlice('frame-0-default-src', 13, 13, 13, 13), overlay: BLUE_FRAME_SHINE, layout: { minWidth: 40, minHeight: 40 }, tintColor: '#4c4c4c' },
    2: { layer: NineSlice('frame-0-default-src', 13, 13, 13, 13), overlay: BLUE_FRAME_SHINE, layout: { minWidth: 40, minHeight: 40 }, tintColor: '#fac200' },
    3: { layer: NineSlice('frame-3-default-src', 10, 33, 10, 10), overlay: FRAME_3_SHINE, layout: { minWidth: 64, minHeight: 64 }, tintColor: '#418db0' },
    4: { layer: NineSlice('frame-3-default-src', 10, 33, 10, 10), overlay: FRAME_3_SHINE, layout: { minWidth: 64, minHeight: 64 }, tintColor: '#67a3bf' },
    7: { layer: NineSlice('frame-3-default-src', 10, 33, 10, 10), overlay: FRAME_3_SHINE, layout: { minWidth: 64, minHeight: 73 } },
    100: {
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
        ]), layout: { minWidth: 50, minHeight: 50 },
    },
    // illumina "wired" - the light frame art with the wired window layout
    102: {
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
        ]), layout: { minWidth: 50, minHeight: 50 },
    },
    // illumina purple
    103: { layer: NineSlice('frame-103-default-src', 4, 4, 4, 7), layout: { minWidth: 50, minHeight: 50 } },
    200: { layer: NineSlice('frame-200-default-src', 4, 4, 4, 5), layout: { minWidth: 50, minHeight: 50 } },
    // leaderboard "total badges" - a huge fixed-art frame (193x130 sheet, 96/87/96/42 slices)
    10000: { layer: NineSlice('frame-10000-default-src', 96, 87, 96, 42), layout: { minWidth: 200, minHeight: 140 } },
};
