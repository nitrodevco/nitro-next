import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Not Habbo's: Turbo's `starter.rooms` extension - the render data of the room under the starter
 * room camera, zlib-deflated as a room thumbnail's is (`RenderRoomThumbnailComposer`), and the
 * camera's own view of it as a PNG: the room, then each as one byte array.
 */
export type TurboStarterRoomPictureComposerType = {
    roomId: number;
    data: Uint8Array;
    scene: Uint8Array;
};

const byteArray = (bytes: Uint8Array): ArrayBuffer => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;

export class TurboStarterRoomPictureComposer implements IOutgoingPacket<TurboStarterRoomPictureComposerType> {
    public constructor(private params: TurboStarterRoomPictureComposerType) { }

    public compose(): (number | string | boolean | ArrayBuffer)[] {
        const { roomId, data, scene } = this.params;

        return [
            roomId,
            data.byteLength,
            byteArray(data),
            scene.byteLength,
            byteArray(scene),
        ];
    }
}
