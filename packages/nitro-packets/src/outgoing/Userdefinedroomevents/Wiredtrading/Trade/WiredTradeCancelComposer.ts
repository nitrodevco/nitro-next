// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredTradeCancelComposerType = object;

/** Flash `WiredTradeCancelMessageComposer`: no values. Sent by `WiredTradingModel.requestCancelTrading`. */
export class WiredTradeCancelComposer implements IOutgoingPacket<WiredTradeCancelComposerType> {
    public constructor(private params: WiredTradeCancelComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
