// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
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
