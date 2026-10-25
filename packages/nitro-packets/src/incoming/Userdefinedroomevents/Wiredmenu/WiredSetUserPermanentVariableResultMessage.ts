// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredSetUserPermanentVariableResultMessageType = {
    success: boolean;
};

/** The answer to `WiredSetUserPermanentVariableComposer`. Flash parser `_-a2Q._-Z2I`. */
export class WiredSetUserPermanentVariableResultMessage implements IIncomingPacket<WiredSetUserPermanentVariableResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredSetUserPermanentVariableResultMessageType {
        const success = wrapper.readBoolean();

        return { success };
    }
}
