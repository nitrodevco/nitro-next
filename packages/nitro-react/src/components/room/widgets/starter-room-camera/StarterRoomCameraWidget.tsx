/**
 * Not Flash's: Turbo's starter room camera (`starter.rooms`), which `:starterroom add` and
 * `:starterroom picture` open in the room. It works as `RoomThumbnailCameraWidget` does - the
 * viewfinder shows the room stage under it, every frame, and the capture is the render data of the
 * room under it (`SpriteDataCollector`, `buildRenderRoomMessageData`), not its pixels - but its
 * viewfinder is the new user flow's round room picture (`StarterRoomCameraView`).
 * The capture sends both the render data and the camera's own view of the room (a PNG of the room
 * stage under the viewfinder, walls and floors textured as the user sees them); Turbo frames the
 * view (`--frame starter-room --scene`) and draws the furni that break out of the frame from the
 * data, ring, shadow and all.
 *
 * The camera closes when Turbo has drawn the picture, says so when it could not, and closes on its
 * own when the room is left or zoomed out, as the thumbnail camera does.
 */
import { TurboStarterRoomPictureComposer } from '@nitrodevco/nitro-packets';
import { GetRenderer, GetRoomStage } from '@nitrodevco/nitro-renderer';
import { Rectangle } from 'pixi.js';

import { useWebSocketContext } from '#base/context/communication';
import { useOnboardingActions, useOnboardingStore } from '#base/context/onboarding';
import { useRoom } from '#base/context/room';
import { GetSoundManager, HabboSoundTypesEnum } from '#base/sound';
import { buildRenderRoomMessageData } from '#base/utils';
import { STARTER_ROOM_VIEWFINDER_HEIGHT, STARTER_ROOM_VIEWFINDER_WIDTH, StarterRoomCameraView } from '#base/views/room-widgets/starter-room-camera/StarterRoomCameraView';

import { useRoomViewfinder } from '../../useRoomViewfinder';

/** The room stage's pixels under the viewfinder, as a PNG; empty when they cannot be read. */
const snapshotScene = async (x: number, y: number): Promise<Uint8Array> => {
    try {
        const { pixels, width, height } = GetRenderer().extract.pixels({ target: GetRoomStage(), frame: new Rectangle(x, y, STARTER_ROOM_VIEWFINDER_WIDTH, STARTER_ROOM_VIEWFINDER_HEIGHT), resolution: 1 });
        const canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d')?.putImageData(new ImageData(new Uint8ClampedArray(pixels), width, height), 0, 0);

        const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'));

        return blob ? new Uint8Array(await blob.arrayBuffer()) : new Uint8Array(0);
    } catch {
        return new Uint8Array(0);
    }
};

export const StarterRoomCameraWidget = () => {
    const camera = useOnboardingStore(x => x.starterRoomCamera);
    const room = useRoom();

    if (!camera || !room || (room.roomId !== camera.roomId)) return null;

    return <StarterRoomCamera />;
};

const StarterRoomCamera = () => {
    const { send } = useWebSocketContext();
    const camera = useOnboardingStore(x => x.starterRoomCamera);
    const { setStarterRoomCameraStatus, closeStarterRoomCamera } = useOnboardingActions();
    const taking = camera?.status === 'taking';
    // The camera works at normal zoom and up, upright - as the thumbnail camera does.
    const { texture, viewfinder, collect } = useRoomViewfinder(STARTER_ROOM_VIEWFINDER_WIDTH, STARTER_ROOM_VIEWFINDER_HEIGHT, !taking, closeStarterRoomCamera);

    const capture = async () => {
        GetSoundManager().playSound(HabboSoundTypesEnum.CAMERA_SHUTTER);

        const collected = collect();

        if (!collected) return;

        setStarterRoomCameraStatus('taking');

        const scene = await snapshotScene(collected.viewport.x, collected.viewport.y);
        const data = await buildRenderRoomMessageData(collected.render);

        send(new TurboStarterRoomPictureComposer({ roomId: collected.render.roomId, data, scene }));
    };

    return (
        <StarterRoomCameraView
            texture={texture}
            viewfinder={viewfinder}
            taking={taking}
            failed={camera?.status === 'failed'}
            onCancel={closeStarterRoomCamera}
            onCapture={() => void capture()}
        />
    );
};
