/**
 * An avatar's face - `HabboFaceFocuser.focusUserFace`: the head image at a direction, uncropped,
 * with a 50x50 window (times the scale) copied out of it at the face's place for that direction
 * (`_SafeStr_11489` / `_SafeStr_11490`, only directions 2 and 3 have one). Here the window is a
 * clipping box over the renderer's own head image, moved so the face lands in it.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { Container as PixiContainer } from 'pixi.js';
import { forwardRef } from 'react';

import { Box, BoxLayout } from '#base/theme';

import { AvatarImage } from './AvatarImage';

/** The face's top-left in the head image, by direction; -100 where the focuser has none. */
const FACE_X = [ -100, -100, 21, 21, -100, -100, -100, -100, -100 ];
const FACE_Y = [ -100, -100, 28, 30, -100, -100, -100, -100, -100 ];
/** `ICON_WIDTH_NORMAL` / `ICON_HEIGHT_NORMAL`: the face box's size at scale 1. */
export const AVATAR_FACE_SIZE = 50;

export interface AvatarFaceImageProps {
    figure: string;
    gender: AvatarGenderType;
    direction: number;
    scale?: number;
    /** Places the 50x50 (times the scale) face box. */
    layout?: BoxLayout;
}

export const AvatarFaceImage = forwardRef<PixiContainer, AvatarFaceImageProps>(({ figure, gender, direction, scale = 1, layout }, ref) => {
    const size = AVATAR_FACE_SIZE * scale;

    return (
        <Box
            ref={ref}
            layout={{ ...layout, width: size, height: size, overflow: 'hidden', flexShrink: 0 }}
        >
            <AvatarImage
                figure={figure}
                gender={gender}
                headOnly
                direction={direction}
                scale={scale}
                layout={{ position: 'absolute', left: -(FACE_X[direction] ?? 0) * scale, top: -(FACE_Y[direction] ?? 0) * scale }}
            />
        </Box>
    );
});

AvatarFaceImage.displayName = 'AvatarFaceImage';
