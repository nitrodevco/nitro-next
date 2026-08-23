import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomInviteErrorMessageType = {
    errorCode: number;
    failedRecipients: number[];
};

export class RoomInviteErrorMessage implements IIncomingPacket<RoomInviteErrorMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomInviteErrorMessageType {
        const packet: RoomInviteErrorMessageType = {
            errorCode: wrapper.readInt(),
            failedRecipients: [],
        };

        if (packet.errorCode === 1) {
            let count = wrapper.readInt();

            while (count > 0) {
                packet.failedRecipients.push(wrapper.readInt());

                count--;
            }
        }

        return packet;
    }
}
