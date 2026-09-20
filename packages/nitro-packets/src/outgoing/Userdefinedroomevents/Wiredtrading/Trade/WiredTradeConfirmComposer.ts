// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredTradeConfirmComposerType = {
    /** False for the first step (accept the offer), true for the second (confirm after the countdown). */
    isFinalConfirm: boolean;
};

/** Flash `WiredTradeConfirmMessageComposer`, sent by `WiredTradingModel.requestAccept` (false) and `requestConfirm` (true). */
export class WiredTradeConfirmComposer implements IOutgoingPacket<WiredTradeConfirmComposerType> {
    public constructor(private params: WiredTradeConfirmComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.isFinalConfirm,
        ];
    }
}
