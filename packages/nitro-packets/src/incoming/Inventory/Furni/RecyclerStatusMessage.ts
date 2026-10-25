// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** Flash `RecyclerStatusMessageEvent` (`RecyclerStatusMessageParser`): `RecyclerLogic.setSystemStatus`'s arguments. */
export type RecyclerStatusMessageType = {
    recyclerStatus: number;
    recyclerTimeoutSeconds: number;
};

export class RecyclerStatusMessage implements IIncomingPacket<RecyclerStatusMessageType> {
    public parse(wrapper: IMessageDataWrapper): RecyclerStatusMessageType {
        const recyclerStatus = wrapper.readInt();
        const recyclerTimeoutSeconds = wrapper.readInt();

        return { recyclerStatus, recyclerTimeoutSeconds };
    }
}
