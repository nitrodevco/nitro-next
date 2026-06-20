import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SendRoomInviteComposerType = {
    message: string;
    friendIds: number[];
};

export class SendRoomInviteComposer implements IOutgoingPacket<SendRoomInviteComposerType> {
    public constructor(private params: SendRoomInviteComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.message,
            this.params.friendIds,
        ];
    }
}
