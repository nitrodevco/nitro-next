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

    return (
        <pixiSprite
            texture={texture}
            tint={tintColor}
            eventMode="none"
            layout={{ position: 'absolute', top: piece.top, left: piece.left, right: piece.right, bottom: piece.bottom, width: piece.width, height: piece.height }}
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
