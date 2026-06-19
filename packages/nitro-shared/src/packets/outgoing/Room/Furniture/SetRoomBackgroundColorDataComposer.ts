import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetRoomBackgroundColorDataComposerType = object;

export class SetRoomBackgroundColorDataComposer implements IOutgoingPacket<SetRoomBackgroundColorDataComposerType> {
    public constructor(private params: SetRoomBackgroundColorDataComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
