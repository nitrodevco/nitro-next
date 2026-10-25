/**
 * The starter room camera's window (not Flash's - see `StarterRoomCameraWidget`): the new user
 * flow's round room picture as the viewfinder, 296x284, with the white ellipse Turbo draws the
 * picture into marked on it (centred 147.5,142.5, radii 148 x 142, a 10px ring) and the corners
 * dimmed; the hint, or the failure; cancel and the shutter.
 */
import { RenderTexture, Sprite } from 'pixi.js';
import { RefObject } from 'react';

import { useTranslation } from '#base/context/system';
import { Box, Button, Frame, ThemeText } from '#base/theme';

/** The picture's ellipse's bounding box: what is captured. */
export const STARTER_ROOM_VIEWFINDER_WIDTH = 296;
export const STARTER_ROOM_VIEWFINDER_HEIGHT = 284;
/** The ellipse in it, and its ring (Turbo's `starter-room` frame, measured from Habbo's pictures). */
const ELLIPSE = { cx: 147.5, cy: 142.5, rx: 148, ry: 142, ring: 10 };

const PADDING = 10;
const BUTTON_HEIGHT = 30;
const HINT_HEIGHT = 34;

/** The viewfinder's four corners outside the ellipse, each a polygon: the corner, then the arc back. */
const CORNERS = [ [ 0, 0, Math.PI, 1.5 * Math.PI ], [ STARTER_ROOM_VIEWFINDER_WIDTH, 0, 1.5 * Math.PI, 2 * Math.PI ], [ STARTER_ROOM_VIEWFINDER_WIDTH, STARTER_ROOM_VIEWFINDER_HEIGHT, 0, 0.5 * Math.PI ], [ 0, STARTER_ROOM_VIEWFINDER_HEIGHT, 0.5 * Math.PI, Math.PI ] ]
    .map(([ x, y, from, to ]) => {
        const points = [ x, y ];

        for (let step = 0; step <= 24; step++) {
            const angle = from + (((to - from) * step) / 24);

            points.push(ELLIPSE.cx + (ELLIPSE.rx * Math.cos(angle)), ELLIPSE.cy + (ELLIPSE.ry * Math.sin(angle)));
        }

        return points;
    });

export interface StarterRoomCameraViewProps {
    texture: RenderTexture;
    viewfinder: RefObject<Sprite | null>;
    /** The picture is being drawn: both buttons are off. */
    taking: boolean;
    failed: boolean;
    onCancel: () => void;
    onCapture: () => void;
}

export const StarterRoomCameraView = ({ texture, viewfinder, taking, failed, onCancel, onCapture }: StarterRoomCameraViewProps) => {
    const t = useTranslation();
    const width = STARTER_ROOM_VIEWFINDER_WIDTH + (PADDING * 2);
    const height = STARTER_ROOM_VIEWFINDER_HEIGHT + HINT_HEIGHT + BUTTON_HEIGHT + (PADDING * 4) + 30;

    return (
        <Frame
            variant="3"
            id="starter-room-camera"
            caption={t('starterroom.camera.title', 'Starter room picture')}
            onClose={onCancel}
            centered
            margins={[ 1, 30, 1, 1 ]}
            layout={{ width, height, minWidth: width, minHeight: height }}
        >
            <Box layout={{ position: 'absolute', left: PADDING, top: PADDING, width: STARTER_ROOM_VIEWFINDER_WIDTH, height: STARTER_ROOM_VIEWFINDER_HEIGHT }}>
                <pixiSprite
                    ref={viewfinder}
                    texture={texture}
                    eventMode="none"
                    layout={false}
                />
                <pixiGraphics
                    eventMode="none"
                    layout={false}
                    draw={(graphics) => {
                        graphics.clear();
                        for (const corner of CORNERS) graphics.poly(corner).fill({ color: 0x000000, alpha: 0.55 });
                        graphics.ellipse(ELLIPSE.cx, ELLIPSE.cy, ELLIPSE.rx - (ELLIPSE.ring / 2), ELLIPSE.ry - (ELLIPSE.ring / 2)).stroke({ width: ELLIPSE.ring, color: 0xffffff });
                    }}
                />
            </Box>
            <Box layout={{ position: 'absolute', left: PADDING, top: STARTER_ROOM_VIEWFINDER_HEIGHT + (PADDING * 2), width: STARTER_ROOM_VIEWFINDER_WIDTH }}>
                <ThemeText
                    text={failed
                        ? t('starterroom.camera.failed', 'The picture could not be drawn. Try again.')
                        : t('starterroom.camera.hint', 'Frame the room in the circle (step out of it yourself). Furni at the front may break out of it.')}
                    textStyle="u_regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: STARTER_ROOM_VIEWFINDER_WIDTH - 4 }}
                    verticalAlign="top"
                    layout={{ width: STARTER_ROOM_VIEWFINDER_WIDTH }}
                />
            </Box>
            <Button
                variant="101"
                name="cancel"
                tintColor="#bbbbbb"
                disabled={taking}
                onPointerTap={onCancel}
                layout={{ position: 'absolute', left: PADDING, bottom: PADDING, width: 100, height: BUTTON_HEIGHT }}
            >
                {t('generic.cancel', 'Cancel')}
            </Button>
            <Button
                variant="101"
                name="capture"
                tintColor="#bbbbbb"
                disabled={taking}
                onPointerTap={onCapture}
                layout={{ position: 'absolute', right: PADDING, bottom: PADDING, width: 140, height: BUTTON_HEIGHT }}
            >
                {taking ? t('starterroom.camera.taking', 'Drawing...') : t('starterroom.camera.capture', 'Take picture')}
            </Button>
        </Frame>
    );
};
