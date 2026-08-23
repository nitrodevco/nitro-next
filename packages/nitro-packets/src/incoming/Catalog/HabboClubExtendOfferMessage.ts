import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboClubExtendOfferMessageType = object;

export class HabboClubExtendOfferMessage implements IIncomingPacket<HabboClubExtendOfferMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboClubExtendOfferMessageType {
        const packet: HabboClubExtendOfferMessageType = {
        };

        return packet;
    }
}
