import { BoxLayout } from "../Box";
import { FillLayout, usePixiTexture } from "../utils";

export interface TileLayerProps {
    textureKey: string | undefined;
    tintColor?: string;
    layout?: BoxLayout;
}

export const TileLayer = ({ textureKey, tintColor, layout }: TileLayerProps) => {
    const texture = usePixiTexture(textureKey);

    if (!texture) return null;

    return <pixiTilingSprite texture={texture} tint={tintColor} eventMode="none" layout={layout ?? FillLayout} />;
};