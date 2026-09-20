// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { TradeRequirementRuleParser } from '../../Data/TradeRequirementRuleParser';
import { IWiredTransactionSuccessContents, WIRED_TRANSACTION_SUCCESS_REWARD } from './IWiredTransactionSuccessContents';

/** Flash `WiredTransactionSuccessContents`: the reward is read only `if (bytesAvailable)`, so a server that sends the bare type still parses. */
export const WiredTransactionSuccessContentsParser = (wrapper: IMessageDataWrapper): IWiredTransactionSuccessContents => {
    const contents: IWiredTransactionSuccessContents = { transactionSuccessTypeId: wrapper.readInt() };

    if ((contents.transactionSuccessTypeId === WIRED_TRANSACTION_SUCCESS_REWARD) && wrapper.bytesAvailable) {
        contents.rewardContents = TradeRequirementRuleParser(wrapper);
        contents.rewardText = wrapper.readString();
        contents.openByDefault = wrapper.readBoolean();
    }

    return contents;
};
