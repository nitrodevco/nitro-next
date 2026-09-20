// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredTransactionSuccessContents } from './Data/IWiredTransactionSuccessContents';
import { WiredTransactionSuccessContentsParser } from './Data/WiredTransactionSuccessContentsParser';

export type WiredTransactionSuccessMessageType = {
    contents: IWiredTransactionSuccessContents;
};

/** A wired transaction (payment, trade or reward) went through. Flash parser `_-G2P._-01D`. */
export class WiredTransactionSuccessMessage implements IIncomingPacket<WiredTransactionSuccessMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredTransactionSuccessMessageType {
        const contents = WiredTransactionSuccessContentsParser(wrapper);

        return { contents };
    }
}
