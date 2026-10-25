// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ITargetedOfferData, TargetedOfferDataParser } from './Data/TargetedOfferDataParser';

export type TargetedOfferEventMessageType = {
    data: ITargetedOfferData;
};

export class TargetedOfferEventMessage implements IIncomingPacket<TargetedOfferEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): TargetedOfferEventMessageType {
        return { data: TargetedOfferDataParser(wrapper) };
    }
}
