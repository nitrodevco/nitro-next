import { CompositePiece } from './CompositePiece';
import { CompositePieceSprite } from './CompositePieceSprite';

export interface CompositeLayerProps {
    pieces: CompositePiece[];
    tintColor?: string;
}

export const CompositeLayer = ({ pieces, tintColor }: CompositeLayerProps) => (
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
