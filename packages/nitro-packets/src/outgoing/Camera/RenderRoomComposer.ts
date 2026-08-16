import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RenderRoomComposerType = object;

export class RenderRoomComposer implements IOutgoingPacket<RenderRoomComposerType> {
    public constructor(private params: RenderRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
