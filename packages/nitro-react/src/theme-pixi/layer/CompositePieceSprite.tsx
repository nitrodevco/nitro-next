import { usePixiTexture } from "../utils/usePixiTexture";
import { CompositePiece } from "./CompositePiece";

export const CompositePieceSprite = ({ piece, tintColor }: { piece: CompositePiece, tintColor?: string }) => {
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