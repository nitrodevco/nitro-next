import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * `RenderRoomThumbnailMessageComposer` (a `RenderRoomMessageComposer` that packs its data straight
 * away): the room's render data, zlib-deflated (`compressData`), sent as one byte array - its length,
 * then its bytes (`EvaWireFormat`'s `ByteArray`).
 */
export type RenderRoomThumbnailComposerType = {
    data: Uint8Array;
};

export class RenderRoomThumbnailComposer implements IOutgoingPacket<RenderRoomThumbnailComposerType> {
    public constructor(private params: RenderRoomThumbnailComposerType) { }

    public compose(): (number | string | boolean | ArrayBuffer)[] {
        const { data } = this.params;

        return [
            data.byteLength,
            data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer,
        ];
    }
}
