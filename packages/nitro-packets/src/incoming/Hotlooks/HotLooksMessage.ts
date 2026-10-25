// Body filled by hand from the AS3 (HotLooksMessageParser) - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { HotLookInfoParser, IHotLookInfo } from '../Data/HotLookInfoParser';

export type HotLooksMessageType = {
    hotLooks: IHotLookInfo[];
};

/** Flash `HotLooksMessageParser`: a count, then each look's gender and figure (`HotLookInfo`). */
export class HotLooksMessage implements IIncomingPacket<HotLooksMessageType> {
    public parse(wrapper: IMessageDataWrapper): HotLooksMessageType {
        const hotLooks: IHotLookInfo[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            hotLooks.push(HotLookInfoParser(wrapper));

            count--;
        }

        return { hotLooks };
    }
}
