// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredWebApiKeyResultMessageType = {
    /** The variables web API addon the key was generated for. */
    wiredId: number;
    /** True for the read key, false for the write key - the flag `WiredGenerateWebApiKeyComposer` was sent with. */
    isReadKey: boolean;
    key: string;
};

/** The answer to `WiredGenerateWebApiKeyComposer`. Flash `WiredWebApiKeyResultParser`, handled by `VariablesWebApiAddon`. */
export class WiredWebApiKeyResultMessage implements IIncomingPacket<WiredWebApiKeyResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredWebApiKeyResultMessageType {
        const wiredId = wrapper.readInt();
        const isReadKey = wrapper.readBoolean();
        const key = wrapper.readString();

        return { wiredId, isReadKey, key };
    }
}
