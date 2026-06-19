import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UnbanUserFromRoomComposerType = object;

export class UnbanUserFromRoomComposer implements IOutgoingPacket<UnbanUserFromRoomComposerType> {
    public constructor(private params: UnbanUserFromRoomComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
