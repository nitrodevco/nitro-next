import { usePixiTexture } from '../hooks';
import { BackgroundLayerConfig } from './BackgroundLayer';

export interface CompositeLayerPieceProps {
    textureKey: string;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    width?: number;
    height?: number;
    /** Centre on the axis that has no inset (a Flash skin entity scaled `center`) instead of pinning it to the start. */
    alignSelf?: 'center';
}

const CompositeLayerPieceSprite = ({ piece, tintColor }: { piece: CompositeLayerPieceProps; tintColor?: string }) => {
    const texture = usePixiTexture(piece.textureKey);

    if (!texture) return null;

    // A piece axis with neither inset set used to fall back to the static position - which
    // happens to be the top-left corner only while the container keeps its default flex-start
    // alignment. Generated layouts now legitimately set `justifyContent: 'center'` on a themed
    // component's box to centre an inset-less ported child (see generate-layout-views.ts), and
    // that would silently re-centre any chrome piece relying on the fallback too. Pinning the
    // start inset explicitly keeps every piece anchored where it always rendered, whatever
    // alignment the box declares.
    const left = piece.left ?? (piece.right === undefined && !piece.alignSelf ? 0 : undefined);
    const top = piece.top ?? (piece.bottom === undefined && !piece.alignSelf ? 0 : undefined);

    return (
        <pixiSprite
            texture={texture}
            tint={tintColor}
            eventMode="none"
            layout={{ position: 'absolute', top, left, right: piece.right, bottom: piece.bottom, width: piece.width, height: piece.height, alignSelf: piece.alignSelf }}
        />
    );
};

const Composite = (pieces: CompositeLayerPieceProps[]): BackgroundLayerConfig => ({ kind: 'composite', pieces });

const CompositePiece = (textureKey: string, top?: number, left?: number, right?: number, bottom?: number, width?: number, height?: number, alignSelf?: 'center'): CompositeLayerPieceProps => ({
    textureKey,
    top,
    left,
    right,
    bottom,
    width,
    height,
    alignSelf,
});

const CompositeLayer = ({ pieces, tintColor }: {
    pieces: CompositeLayerPieceProps[];
    tintColor?: string;
}) => (
    <>
        {pieces.map((piece, index) => (
            <CompositeLayerPieceSprite
                key={index}
                piece={piece}
                tintColor={tintColor}
            />
        ))}
    </>
);

export { Composite, CompositeLayer, CompositePiece };
