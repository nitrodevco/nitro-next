// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ClubOfferExtendDataParser, IClubOfferExtendData } from './Data/ClubOfferDataParser';

/** Flash's `HabboClubExtendOfferMessageParser`: one `ClubOfferExtendData`. */
export type HabboClubExtendOfferMessageType = {
    offer: IClubOfferExtendData;
};

export class HabboClubExtendOfferMessage implements IIncomingPacket<HabboClubExtendOfferMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboClubExtendOfferMessageType {
        return {
            offer: ClubOfferExtendDataParser(wrapper),
        };
    }
}
