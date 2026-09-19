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

/** A pet drawn to fit a box, the way the breeding dialogs' `preview_image`s were filled. */
export const PetPortraitView = ({ figure, posture, width, height, direction = 2 }: PetPortraitViewProps) => {
    const { texture } = useChatPetFace(figure, posture, { scale: RoomGeometryScaleType.ZoomedIn, direction });
    const scale = texture ? Math.min(1, width / Math.max(1, texture.width), height / Math.max(1, texture.height)) : 1;

    return (
        <Box layout={{ width, height, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {texture && (
                <pixiSprite
                    texture={texture}
                    layout={{ width: texture.width * scale, height: texture.height * scale }}
                />
            )}
        </Box>
    );
};
