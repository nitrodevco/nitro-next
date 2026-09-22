// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** Flash `RecyclerFinishedMessageEvent` (`RecyclerFinishedMessageParser`): `RecyclerLogic.setFinished`'s arguments. */
export type RecyclerFinishedMessageType = {
    recyclerFinishedStatus: number;
    prizeId: number;
};

export class RecyclerFinishedMessage implements IIncomingPacket<RecyclerFinishedMessageType> {
    public parse(wrapper: IMessageDataWrapper): RecyclerFinishedMessageType {
        const recyclerFinishedStatus = wrapper.readInt();
        const prizeId = wrapper.readInt();

        return { recyclerFinishedStatus, prizeId };
    }
}
