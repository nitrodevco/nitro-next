// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredGenerateWebApiKeyComposerType = {
    /** The variables web API addon that is open in the wired editor. */
    wiredId: number;
    /** True to generate the read key, false for the write key. */
    isReadKey: boolean;
};

/** Flash `WiredGenerateWebApiKeyMessageComposer`, sent by `VariablesWebApiAddon`; answered by `WiredWebApiKeyResultMessage`. */
export class WiredGenerateWebApiKeyComposer implements IOutgoingPacket<WiredGenerateWebApiKeyComposerType> {
    public constructor(private params: WiredGenerateWebApiKeyComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.wiredId,
            this.params.isReadKey,
        ];
    }
}
