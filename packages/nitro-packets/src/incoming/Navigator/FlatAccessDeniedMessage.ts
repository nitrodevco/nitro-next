import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/*
 * FlatAccessDeniedMessageParser — flatId int, username only when bytes remain.
 * An empty username means our own doorbell ring went unanswered; a username is
 * an answer notification for the rights-holder's doorbell list.
 */
export type FlatAccessDeniedMessageType = {
    roomId: number;
    username: string;
};

export class FlatAccessDeniedMessage implements IIncomingPacket<FlatAccessDeniedMessageType> {
    public parse(wrapper: IMessageDataWrapper): FlatAccessDeniedMessageType {
        return {
            roomId: wrapper.readInt(),
            username: wrapper.bytesAvailable ? wrapper.readString() : '',
        };
    }
}
