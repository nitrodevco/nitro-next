import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type YouAreNotControllerMessageType = {
    roomId: number;
};

export class YouAreNotControllerMessage implements IIncomingPacket<YouAreNotControllerMessageType> {
    public parse(wrapper: IMessageDataWrapper): YouAreNotControllerMessageType {
        const packet: YouAreNotControllerMessageType = {
            roomId: wrapper.readInt(),
        };

        return packet;
    }
}
