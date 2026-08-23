import { BackgroundLayerConfig, NineSliceBorderWidth } from './BackgroundLayerConfig';

/** `borderWidth` is optional and DOM-only - see `BackgroundLayerConfig.ts`'s docblock on
 *  `NineSliceBorderWidth` for why (CSS `border-image-width` can differ from `-slice` per side;
 *  Pixi's `NineSliceSprite` has no such independent concept). Omit it unless the asset actually
 *  needs a side trimmed from the slice without being drawn as a border band. */
export const NineSlice = (textureKey: string, leftWidth: number, topHeight: number, rightWidth: number, bottomHeight: number, borderWidth?: NineSliceBorderWidth): BackgroundLayerConfig => (
    { kind: 'nineSlice', textureKey, leftWidth, topHeight, rightWidth, bottomHeight, borderWidth }
);
