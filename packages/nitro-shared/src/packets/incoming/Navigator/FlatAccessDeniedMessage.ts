import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FlatAccessDeniedMessageType = {
    roomId: number;
    username: string;
};

export class FlatAccessDeniedMessage implements IIncomingPacket<FlatAccessDeniedMessageType> {
    public parse(wrapper: IMessageDataWrapper): FlatAccessDeniedMessageType {
        const packet: FlatAccessDeniedMessageType = {
            roomId: wrapper.readInt(),
            username: wrapper.readString(),
        };

        return packet;
    }
}
