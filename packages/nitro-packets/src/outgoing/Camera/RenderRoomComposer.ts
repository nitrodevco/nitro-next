import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * `RenderRoomMessageComposer` (754): the photo's render data - the room under the viewfinder when the
 * shutter went, with the photo lab's effects and zoom added (`addEffectData`, `setZoom`) - deflated
 * by `compressData` and sent as one byte array: its length, then its bytes.
 */
export type RenderRoomComposerType = {
    data: Uint8Array;
};

export class RenderRoomComposer implements IOutgoingPacket<RenderRoomComposerType> {
    public constructor(private params: RenderRoomComposerType) { }

    public compose(): (number | string | boolean | ArrayBuffer)[] {
        const { data } = this.params;

        return [
            data.byteLength,
            data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer,
        ];
    }
}
