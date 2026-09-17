// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BlockUserUpdateMessageType = {
    /** `SessionDataManager.onBlockUserUpdate`: 1 blocked, 2 unblocked. */
    result: number;
    userId: number;
};

export class BlockUserUpdateMessage implements IIncomingPacket<BlockUserUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): BlockUserUpdateMessageType {
        return { result: wrapper.readInt(), userId: wrapper.readInt() };
    }
}
