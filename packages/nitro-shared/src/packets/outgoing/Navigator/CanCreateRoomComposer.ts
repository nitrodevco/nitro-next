import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CanCreateRoomComposerType = object;

export class CanCreateRoomComposer implements IOutgoingPacket<CanCreateRoomComposerType> {
    public constructor(private params: CanCreateRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
