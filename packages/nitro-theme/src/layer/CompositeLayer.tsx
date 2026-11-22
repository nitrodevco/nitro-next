import { tintedLayerTexture, usePixiTexture } from '../hooks';
import { ThemeTintMode } from '../utils';
import { insetLayout, LayerInsets } from './layerLayout';

export interface CompositeLayerPieceProps extends LayerInsets {
    textureKey: string;
    /** Centre on the axis that has no inset (a Flash skin entity scaled `center`) instead of pinning it to the start. */
    alignSelf?: 'center';
}

const CompositeLayerPieceSprite = ({ piece, tintColor, tintMode }: { piece: CompositeLayerPieceProps; tintColor?: string; tintMode?: ThemeTintMode }) => {
    const texture = usePixiTexture(piece.textureKey);

    if (!texture) return null;

    const drawn = tintedLayerTexture(texture, tintColor, tintMode);

    // A piece axis with neither inset set used to fall back to the static position - which
    // happens to be the top-left corner only while the container keeps its default flex-start
    // alignment. A layout can legitimately set `justifyContent: 'center'` on a themed
    // component's box to centre an inset-less child, and that would silently re-centre any chrome piece relying on the fallback too. Pinning the
    // start inset explicitly keeps every piece anchored where it always rendered, whatever
    // alignment the box declares.
    const left = piece.left ?? (piece.right === undefined && !piece.alignSelf ? 0 : undefined);
    const top = piece.top ?? (piece.bottom === undefined && !piece.alignSelf ? 0 : undefined);

    return (
        <pixiSprite
            texture={drawn.texture}
            tint={drawn.tint}
            eventMode="none"
            layout={{ ...insetLayout({ ...piece, left, top }), alignSelf: piece.alignSelf }}
        />
    );
};

/**
 * A skin that is not one clean nine-slice grid, drawn as every one of its entities: each a sprite
 * pinned, stretched or centred by the insets Nitro Studio derives from its `BitmapSkinRenderer`
 * scale mode.
 */
export const CompositeLayer = ({ pieces, tintColor, tintMode }: {
    pieces: CompositeLayerPieceProps[];
    tintColor?: string;
    tintMode?: ThemeTintMode;
}) => (
    <>
        {pieces.map((piece, index) => (
            <CompositeLayerPieceSprite
                key={index}
                piece={piece}
                tintColor={tintColor}
                tintMode={tintMode}
            />
        ))}
    </>
);
