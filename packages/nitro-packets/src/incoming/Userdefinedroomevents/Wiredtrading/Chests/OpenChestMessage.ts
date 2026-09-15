import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type OpenChestMessageType = {
    chestId: number;
};

export class OpenChestMessage implements IIncomingPacket<OpenChestMessageType> {
    public parse(wrapper: IMessageDataWrapper): OpenChestMessageType {
        const packet: OpenChestMessageType = {
            chestId: wrapper.readInt(),
        };

        return packet;
    }
}
