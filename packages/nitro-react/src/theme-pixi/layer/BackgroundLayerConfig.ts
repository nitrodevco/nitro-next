import { CompositePiece } from './CompositePiece';

/**
 * CSS's `border-image-width` is independent of `border-image-slice` - a side can slice a
 * nonzero band out of the source (excluding it from the stretched "fill" region) while
 * reserving zero rendered width for it, rather than the slice amount. The original Habbo skin
 * XML/legacy DOM markup use exactly this for a couple of nine-slice assets (TabButton,
 * TabContent variant 3) whose source PNGs have a few padding/anti-aliasing rows past the real
 * art that should be trimmed from the fill but never actually drawn as a border band. Optional
 * and per-side because every other nine-slice asset in this theme has width===slice on all four
 * sides (confirmed by cross-referencing every legacy `border-image-slice`/`-width` pair) - this
 * only needs to override the sides that actually differ.
 *
 * Pixi's `NineSliceSprite` has no equivalent (its `leftWidth`/`topHeight`/`rightWidth`/
 * `bottomHeight` control the source slice AND the rendered size as one coupled value per side,
 * so a trimmed slice always reserves that same amount of visible space) - `borderWidth` is
 * DOM-only, read in `BackgroundLayerDom.tsx`'s nineSlice case. Pixi callers (TabButton.tsx,
 * TabContent.tsx) just pass the plain slice numbers and accept the small approximation: the
 * trimmed band still renders as a real (if usually near-invisible, matching-color-or-
 * transparent) edge instead of being fully absorbed into the fill with zero reserved space.
 */
export interface NineSliceBorderWidth {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

/**
 * `undefined` (every nine-slice asset but two) stretches the fill/edge images to size, same as
 * CSS `border-image-repeat`'s default `stretch`. `'x'`/`'y'` requests `repeat` on that axis
 * instead - the source's fill region tiles at its own native pixel size rather than smearing a
 * handful of source rows/columns across however tall/wide the rendered box ends up. Needed for
 * ScrollbarSliderBarVertical/Horizontal's variant 3 thumb art, whose fill region is a short
 * repeating tick-mark pattern meant to read as many small, crisp marks the length of the thumb -
 * stretching it (the every-other-asset default) smears those into a handful of thick, blurry
 * bands once the thumb is much taller/wider than the source PNG, which is most of the time
 * (confirmed against the deleted legacy DOM port's own `border-image-repeat: stretch_repeat` /
 * `repeat_stretch` classes for this exact asset - the direct predecessor already relied on tiling
 * here, this is restoring that, not inventing new behavior). Only supports the 3-slice case
 * (one axis sliced top/bottom or left/right, the other axis's width/height at 0) that both real
 * callers use - not a general tiling nine-slice with tiling corners.
 */
export type NineSliceRepeatAxis = 'x' | 'y';

export type BackgroundLayerConfig
    = | { kind: 'nineSlice'; textureKey: string; leftWidth: number; topHeight: number; rightWidth: number; bottomHeight: number; borderWidth?: NineSliceBorderWidth; repeat?: NineSliceRepeatAxis }
        | { kind: 'stretch'; textureKey: string }
        | { kind: 'tile'; textureKey: string }
        | { kind: 'composite'; pieces: CompositePiece[] }
        | { kind: 'sprite'; textureKey: string };
