import { BackgroundLayerConfig } from "./Layer";

export const NineSlice = (textureKey: string, leftWidth: number, topHeight: number, rightWidth: number, bottomHeight: number): BackgroundLayerConfig => (
    { kind: 'nineSlice', textureKey, leftWidth, topHeight, rightWidth, bottomHeight }
);