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
import { GetRoomStage, GetTicker, SpriteDataCollector, TextureUtils } from '@nitrodevco/nitro-renderer';
import { Matrix, Rectangle, RenderTexture, Sprite } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { roomStore, useRoom } from '#base/context/room';
import { useConfigValue, useIsWindowVisible, useWindowActions } from '#base/context/system';
import { userStore } from '#base/context/user';
import { GetSoundManager, HabboSoundTypesEnum } from '#base/sound';
import { TemplateWindow, useTemplateFrame } from '#base/theme';
import { buildRenderRoomMessageData } from '#base/utils';

import { GetRoomBackgroundColor } from '../../roomBackgroundColor';

const TEMPLATE = 'habbo-room-ui-com/iro_room_thumbnail_camera_xml';

/** `viewfinder`'s size in the layout. */
const VIEWFINDER_SIZE = 110;

/** `startTakingPhoto` / `onRoomZoomed`: the camera works at normal zoom and up, upright. */
const isNormalZoom = () => {
    const canvas = roomStore.getState().room?.canvas;

    return !canvas || ((canvas.scale >= 1) && !canvas.isFlipped);
};

export const RoomThumbnailCameraWidget = () => {
    const isVisible = useIsWindowVisible('room_thumbnail_camera');
    const room = useRoom();

    if (!isVisible || !room) return null;

    return <RoomThumbnailCameraView />;
};

const RoomThumbnailCameraView = () => {
    const { hideWindow } = useWindowActions();
    const { send } = useWebSocketContext();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const groupBadgeUrl = useConfigValue<string>('group.badge.url') ?? '';
    const close = () => hideWindow('room_thumbnail_camera');
    const frame = useTemplateFrame({ id: 'room-thumbnail-camera', centered: true, rememberPosition: false, resizeDirection: 'none', onClose: close });
    // Once the picture is sent: the buttons are disabled and the viewfinder stops (`removeUpdateReceiver`).
    const [ sent, setSent ] = useState(false);
    const [ texture ] = useState(() => RenderTexture.create({ width: VIEWFINDER_SIZE, height: VIEWFINDER_SIZE }));
    const viewfinder = useRef<Sprite>(null);

    useEffect(() => () => texture.destroy(true), [ texture ]);

    useEffect(() => {
        if (sent) return;

        const update = () => {
            if (!isNormalZoom()) {
                hideWindow('room_thumbnail_camera');

                return;
            }

            const sprite = viewfinder.current;

            if (!sprite) return;

            const position = sprite.getGlobalPosition();

            TextureUtils.writeToTexture(GetRoomStage(), texture, true, new Matrix().translate(-position.x, -position.y));
        };

        GetTicker().add(update);

        return () => {
            GetTicker().remove(update);
        };
    }, [ sent, texture, hideWindow ]);

    /** `windowProcedure`'s `button_capture`. */
    const capture = async () => {
        GetSoundManager().playSound(HabboSoundTypesEnum.CAMERA_SHUTTER);

        const room = roomStore.getState().room;
        const canvas = room?.canvas;
        const sprite = viewfinder.current;

        if (!room || !canvas || !sprite) return;

        const position = sprite.getGlobalPosition();
        const viewport = new Rectangle(Math.round(position.x), Math.round(position.y), VIEWFINDER_SIZE, VIEWFINDER_SIZE);
        const collector = new SpriteDataCollector(room, canvas, imageLibraryUrl, groupBadgeUrl);
        const sprites = collector.getFurniData(viewport, -1);
        const modifiers = collector.getRoomRenderingModifiers();
        const planes = collector.getRoomPlanes(viewport, GetRoomBackgroundColor());

        setSent(true);

        const data = await buildRenderRoomMessageData({ planes, sprites, modifiers, roomId: room.roomId, topSecurityLevel: userStore.getState().securityLevel, time: Date.now() });

        send(new RenderRoomThumbnailComposer({ data }));
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
