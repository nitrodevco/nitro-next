import { BoxLayout } from "../Box";
import { FillLayout, usePixiTexture } from "../utils";

export interface SpriteLayerProps {
    textureKey: string | undefined;
    tintColor?: string;
    layout?: BoxLayout;
}

export const SpriteLayer = ({ textureKey, tintColor, layout }: SpriteLayerProps) => {
    const texture = usePixiTexture(textureKey);

    if (!texture) return null;

    return <pixiSprite texture={texture} tint={tintColor} eventMode="none" layout={layout ?? FillLayout} />;
};