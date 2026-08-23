import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type YouAreNotControllerMessageType = {
    flatId: number;
};

export class YouAreNotControllerMessage implements IIncomingPacket<YouAreNotControllerMessageType> {
    public parse(wrapper: IMessageDataWrapper): YouAreNotControllerMessageType {
        const packet: YouAreNotControllerMessageType = {
            flatId: wrapper.readInt(),
        };

        return packet;
    }
}
