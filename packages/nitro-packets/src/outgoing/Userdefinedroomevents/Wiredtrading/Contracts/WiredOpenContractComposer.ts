// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredOpenContractComposerType = {
    /** `WiredOpenContractMessage.contractId`. */
    contractId: number;
};

/** Flash `_-EC.WiredOpenContractMessageComposer`: `WiredContractController`'s reply to `WiredOpenContractMessage`; answered by `WiredContractContentsMessage`. */
export class WiredOpenContractComposer implements IOutgoingPacket<WiredOpenContractComposerType> {
    public constructor(private params: WiredOpenContractComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.contractId,
        ];
    }
}
