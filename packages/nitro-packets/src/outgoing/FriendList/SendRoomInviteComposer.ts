import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SendRoomInviteComposerType = {
    message: string;
    playerIds: number[];
};

export class SendRoomInviteComposer implements IOutgoingPacket<SendRoomInviteComposerType> {
    public constructor(private params: SendRoomInviteComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.playerIds.length,
            ...this.params.playerIds,
            this.params.message,
        ];
    }
}
