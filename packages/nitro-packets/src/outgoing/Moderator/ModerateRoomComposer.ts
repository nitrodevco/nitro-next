import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ModerateRoomComposerType = {
    roomId: number;
    lockDoor: boolean;
    changeName: boolean;
    kickUsers: boolean;
};

export class ModerateRoomComposer implements IOutgoingPacket<ModerateRoomComposerType> {
    public constructor(private params: ModerateRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        // as in GetGuestRoomComposer, the SWF encodes these booleans as ints
        return [
            this.params.roomId,
            this.params.lockDoor ? 1 : 0,
            this.params.changeName ? 1 : 0,
            this.params.kickUsers ? 1 : 0,
        ];
    }
}
