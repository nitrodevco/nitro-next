// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredOpenContractMessageType = {
    contractId: number;
};

/**
 * The server asks the client to open a contract. Flash parser `_-42y._-c2K`; `WiredContractController`
 * answers with `WiredOpenContractComposer` and waits for the `WiredContractContentsMessage` of that id.
 */
export class WiredOpenContractMessage implements IIncomingPacket<WiredOpenContractMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredOpenContractMessageType {
        const contractId = wrapper.readInt();

        return { contractId };
    }
}
