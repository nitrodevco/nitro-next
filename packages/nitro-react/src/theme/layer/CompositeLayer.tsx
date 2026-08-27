import { usePixiTexture } from '../hooks';
import { BackgroundLayerConfig } from './BackgroundLayer';

export interface CompositePiece {
    textureKey: string;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    width?: number;
    height?: number;
}

const CompositePieceSprite = ({ piece, tintColor }: { piece: CompositePiece; tintColor?: string }) => {
    const texture = usePixiTexture(piece.textureKey);

    if (!texture) return null;

    // A piece axis with neither inset set used to fall back to the static position - which
    // happens to be the top-left corner only while the container keeps its default flex-start
    // alignment. Generated layouts now legitimately set `justifyContent: 'center'` on a themed
    // component's box to centre an inset-less ported child (see generate-layout-views.ts), and
    // that would silently re-centre any chrome piece relying on the fallback too. Pinning the
    // start inset explicitly keeps every piece anchored where it always rendered, whatever
    // alignment the box declares.
    const left = piece.left ?? (piece.right === undefined ? 0 : undefined);
    const top = piece.top ?? (piece.bottom === undefined ? 0 : undefined);

    return (
        <pixiSprite
            texture={texture}
            tint={tintColor}
            eventMode="none"
            layout={{ position: 'absolute', top, left, right: piece.right, bottom: piece.bottom, width: piece.width, height: piece.height }}
        />
    );
};

const Composite = (pieces: CompositePiece[]): BackgroundLayerConfig => ({ kind: 'composite', pieces });

const CompositeLayer = ({ pieces, tintColor }: {
    pieces: CompositePiece[];
    tintColor?: string;
}) => (
    <>
        {pieces.map((piece, index) => (
            <CompositePieceSprite
                key={index}
                piece={piece}
                tintColor={tintColor}
            />
        ))}
    </>
);

export { Composite, CompositeLayer };
