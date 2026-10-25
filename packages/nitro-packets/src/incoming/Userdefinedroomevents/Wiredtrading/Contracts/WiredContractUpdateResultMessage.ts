// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredContractUpdateResultMessageType = {
    contractId: number;
    isSuccess: boolean;
    /** On failure, the tail of the text key `wiredcontracts.error.<failCode>`. */
    failCode: string;
};

/** The answer to `WiredUpdateContractComposer`. Flash parser `_-42y._-b2i`. */
export class WiredContractUpdateResultMessage implements IIncomingPacket<WiredContractUpdateResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredContractUpdateResultMessageType {
        const contractId = wrapper.readInt();
        const isSuccess = wrapper.readBoolean();
        const failCode = wrapper.readString();

        return { contractId, isSuccess, failCode };
    }
}
