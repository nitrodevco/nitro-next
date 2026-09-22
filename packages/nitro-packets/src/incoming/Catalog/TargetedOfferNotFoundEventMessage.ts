// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket } from '@nitrodevco/nitro-api';

export type TargetedOfferNotFoundEventMessageType = object;

export class TargetedOfferNotFoundEventMessage implements IIncomingPacket<TargetedOfferNotFoundEventMessageType> {
    public parse(): TargetedOfferNotFoundEventMessageType {
        return {};
    }
}
