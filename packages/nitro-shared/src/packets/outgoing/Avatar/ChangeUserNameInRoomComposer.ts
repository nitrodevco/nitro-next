import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChangeUserNameInRoomComposerType = object;

export class ChangeUserNameInRoomComposer implements IOutgoingPacket<ChangeUserNameInRoomComposerType> {
    public constructor(private params: ChangeUserNameInRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
