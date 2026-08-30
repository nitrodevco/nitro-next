import { Composite, NineSlice } from '../layer';
import { ThemeVariant, ThemeVariants } from '../utils';

/** `Frame` variants - the Flash `style` ids it draws. */
export type FrameVariant = ThemeVariant;

const BLUE_FRAME_SHINE = Composite([
    { textureKey: 'frame-0-default-shine-top-left-src', left: 1, top: 1, width: 7, height: 7 },
    { textureKey: 'frame-0-default-shine-top-center-src', left: 8, right: 8, top: 2, height: 1 },
    { textureKey: 'frame-0-default-shine-top-right-src', right: 1, top: 1, width: 7, height: 7 },
    { textureKey: 'frame-0-default-shine-top-center-src', left: 2, top: 8, bottom: 8, width: 1 },
    { textureKey: 'frame-0-default-shine-top-center-src', right: 2, top: 8, bottom: 7, width: 1 },
    { textureKey: 'frame-0-default-shine-bottom-left-src', left: 1, bottom: 1, width: 7, height: 7 },
    { textureKey: 'frame-0-default-shine-top-center-src', left: 8, right: 7, bottom: 2, height: 1 },
    { textureKey: 'frame-0-default-shine-bottom-right-src', right: 1, bottom: 1, width: 6, height: 6 },
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
            { textureKey: 'border-101-default-top-left-src', top: 0, left: 0, width: 4, height: 4 },
            { textureKey: 'border-101-default-top-center-src', top: 0, left: 4, right: 4, height: 4 },
            { textureKey: 'border-101-default-top-right-src', top: 0, right: 0, width: 4, height: 4 },
            { textureKey: 'border-101-default-center-left-src', left: 0, top: 4, bottom: 7, width: 1 },
            { textureKey: 'border-101-default-center-center-src', left: 1, right: 1, top: 4, bottom: 7 },
            { textureKey: 'border-101-default-center-left-src', right: 0, top: 4, bottom: 7, width: 1 },
            { textureKey: 'border-101-default-bottom-left-src', left: 0, bottom: 0, width: 4, height: 7 },
            { textureKey: 'border-101-default-bottom-center-src', left: 4, right: 4, bottom: 0, height: 7 },
            { textureKey: 'border-101-default-bottom-right-src', right: 0, bottom: 0, width: 4, height: 7 },
        ]), layout: { minWidth: 50, minHeight: 50 },
    },
    // illumina "wired" - the light frame art with the wired window layout
    102: {
        layer: Composite([
            { textureKey: 'border-101-default-top-left-src', top: 0, left: 0, width: 4, height: 4 },
            { textureKey: 'border-101-default-top-center-src', top: 0, left: 4, right: 4, height: 4 },
            { textureKey: 'border-101-default-top-right-src', top: 0, right: 0, width: 4, height: 4 },
            { textureKey: 'border-101-default-center-left-src', left: 0, top: 4, bottom: 7, width: 1 },
            { textureKey: 'border-101-default-center-center-src', left: 1, right: 1, top: 4, bottom: 7 },
            { textureKey: 'border-101-default-center-left-src', right: 0, top: 4, bottom: 7, width: 1 },
            { textureKey: 'border-101-default-bottom-left-src', left: 0, bottom: 0, width: 4, height: 7 },
            { textureKey: 'border-101-default-bottom-center-src', left: 4, right: 4, bottom: 0, height: 7 },
            { textureKey: 'border-101-default-bottom-right-src', right: 0, bottom: 0, width: 4, height: 7 },
        ]), layout: { minWidth: 50, minHeight: 50 },
    },
    // illumina purple
    103: { layer: NineSlice('frame-103-default-src', 4, 4, 4, 7), layout: { minWidth: 50, minHeight: 50 } },
    200: { layer: NineSlice('frame-200-default-src', 4, 4, 4, 5), layout: { minWidth: 50, minHeight: 50 } },
    // leaderboard "total badges" - a huge fixed-art frame (193x130 sheet, 96/87/96/42 slices)
    10000: { layer: NineSlice('frame-10000-default-src', 96, 87, 96, 42), layout: { minWidth: 200, minHeight: 140 } },
};
