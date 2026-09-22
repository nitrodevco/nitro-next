// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IPrizeLevelMessageData } from './IPrizeLevelMessageData';
import { PrizeMessageDataParser } from './PrizeMessageDataParser';

/**
 * Flash `PrizeLevelMessageData`'s constructor. The prizes are sorted on `productCode` with
 * `Array.CASEINSENSITIVE` (`sortOn("productCode", 1)`).
 */
export const PrizeLevelMessageDataParser = (wrapper: IMessageDataWrapper): IPrizeLevelMessageData => {
    const prizeLevelId = wrapper.readInt();
    const probabilityDenominator = wrapper.readInt();
    const prizes = ParseArray(wrapper, PrizeMessageDataParser);

    prizes.sort((a, b) => {
        const left = a.productCode.toLowerCase();
        const right = b.productCode.toLowerCase();

        return (left < right) ? -1 : ((left > right) ? 1 : 0);
    });

    return { prizeLevelId, probabilityDenominator, prizes };
};
