import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { useChatPetFace } from '#base/hooks';
import { Box } from '#base/theme';

export interface PetPortraitViewProps {
    figure: string;
    posture?: string;
    width: number;
    height: number;
    /** Eighths of a turn; 2 faces the viewer the way the infostand's does. */
    direction?: number;
}

/**
 * A pet drawn into a box the way the breeding dialogs fill their `preview_image` bitmaps
 * (`ConfirmPetBreedingView.updatePreviewImage` and its siblings): the 64-scale image copied in at
 * its own size, centred, and cut at the box - never scaled to fit.
 */
export const PetPortraitView = ({ figure, posture, width, height, direction = 2 }: PetPortraitViewProps) => {
    const { texture } = useChatPetFace(figure, posture, { scale: RoomGeometryScaleType.ZoomedIn, direction });

    return (
        <Box layout={{ width, height, flexShrink: 0, overflow: 'hidden' }}>
            {texture && (
                <pixiSprite
                    texture={texture}
                    layout={{
                        position: 'absolute',
                        left: Math.trunc((width - texture.width) / 2),
                        top: Math.trunc((height - texture.height) / 2),
                        width: texture.width,
                        height: texture.height,
                    }}
                />
            )}
        </Box>
    );
};
