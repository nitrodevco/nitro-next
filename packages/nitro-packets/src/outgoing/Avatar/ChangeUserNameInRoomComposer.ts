import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** `NameChangeController.changeName`: the name chosen from the own avatar menu (`ChangeUserNameInRoom`, one string). */
export type ChangeUserNameInRoomComposerType = {
    name: string;
};

export class ChangeUserNameInRoomComposer implements IOutgoingPacket<ChangeUserNameInRoomComposerType> {
    public constructor(private params: ChangeUserNameInRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.name,
        ];
    }
}
