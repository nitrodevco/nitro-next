/**
 * Flash's `RoomThumbnailCameraWidget`: `habbo-room-ui-com/iro_room_thumbnail_camera_xml`, centred,
 * opened by `roomThumbnailCamera/open` (`startRoomThumbnailCamera`).
 *
 * - `update` (an update receiver at priority 10): `viewfinder` shows the room under it, every frame -
 *   the room stage drawn into it from the viewfinder's own place on screen
 *   (`snapshotRoomCanvasToBitmap`), over the room's background colour.
 * - `button_capture`: the shutter sound, then the render data of the room under the viewfinder
 *   (`RoomThumbnailCameraWidgetHandler.collectPhotoData` -> `RoomEngine.getRenderRoomMessage`,
 *   `SpriteDataCollector`) is sent as `RenderRoomThumbnailMessageComposer`; both buttons are disabled
 *   and the viewfinder stops. `ThumbnailStatusMessage` takes the window down (`onThumbnailStatus`).
 * - `button_cancel` and the close button take it down; so does leaving the room (`onRoomDisposed`) and
 *   zooming out or turning the room over (`onRoomZoomed`).
 */
import { RenderRoomThumbnailComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom } from '#base/context/room';
import { useIsWindowVisible, useWindowActions } from '#base/context/system';
import { GetSoundManager, HabboSoundTypesEnum } from '#base/sound';
import { TemplateWindow, useTemplateFrame } from '#base/theme';
import { buildRenderRoomMessageData } from '#base/utils';

import { useRoomViewfinder } from '../../useRoomViewfinder';

const TEMPLATE = 'habbo-room-ui-com/iro_room_thumbnail_camera_xml';

/** `viewfinder`'s size in the layout. */
const VIEWFINDER_SIZE = 110;

export const RoomThumbnailCameraWidget = () => {
    const isVisible = useIsWindowVisible('room_thumbnail_camera');
    const room = useRoom();

    if (!isVisible || !room) return null;

    return <RoomThumbnailCameraView />;
};

const RoomThumbnailCameraView = () => {
    const { hideWindow } = useWindowActions();
    const { send } = useWebSocketContext();
    const close = () => hideWindow('room_thumbnail_camera');
    const frame = useTemplateFrame({ id: 'room-thumbnail-camera', centered: true, rememberPosition: false, resizeDirection: 'none', onClose: close });
    // Once the picture is sent: the buttons are disabled and the viewfinder stops (`removeUpdateReceiver`).
    const [ sent, setSent ] = useState(false);
    const { texture, viewfinder, collect } = useRoomViewfinder(VIEWFINDER_SIZE, VIEWFINDER_SIZE, !sent, close);

    /** `windowProcedure`'s `button_capture`. */
    const capture = async () => {
        GetSoundManager().playSound(HabboSoundTypesEnum.CAMERA_SHUTTER);

        const collected = collect();

        if (!collected) return;

        setSent(true);

        send(new RenderRoomThumbnailComposer({ data: await buildRenderRoomMessageData(collected.render) }));
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={{
                viewfinder: {
                    children: (
                        <pixiSprite
                            ref={viewfinder}
                            texture={texture}
                            eventMode="none"
                            layout={false}
                        />
                    ),
                },
                button_capture: { disabled: sent, onPointerTap: () => void capture() },
                button_cancel: { disabled: sent, onPointerTap: close },
            }}
        />
    );
};
