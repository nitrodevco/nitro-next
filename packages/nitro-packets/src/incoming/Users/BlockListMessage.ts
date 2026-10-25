// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BlockListMessageType = {
    userIds: number[];
};

export class BlockListMessage implements IIncomingPacket<BlockListMessageType> {
    public parse(wrapper: IMessageDataWrapper): BlockListMessageType {
        const userIds: number[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            userIds.push(wrapper.readInt());

            count--;
        }

        return { userIds };
    }
}
