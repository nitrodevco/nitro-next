import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetIgnoreRoomInvitesComposerType = object;

export class SetIgnoreRoomInvitesComposer implements IOutgoingPacket<SetIgnoreRoomInvitesComposerType> {
    public constructor(private params: SetIgnoreRoomInvitesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
