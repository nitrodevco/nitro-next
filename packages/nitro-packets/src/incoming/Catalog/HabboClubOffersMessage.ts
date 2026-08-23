import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboClubOffersMessageType = object;

export class HabboClubOffersMessage implements IIncomingPacket<HabboClubOffersMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboClubOffersMessageType {
        const packet: HabboClubOffersMessageType = {
        };

        return packet;
    }
}
