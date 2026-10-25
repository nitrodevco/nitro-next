import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { ClubGiftSelectedDataParser } from '../../Data/ClubGiftSelectedDataParser';
import { IClubGiftSelectedData } from '../../Data/IClubGiftSelectedData';

export type WeeklyGameRewardMessageType = {
    gameTypeId: number;
    products: IClubGiftSelectedData[];
    minutesUntilNextWeek: number;
    rewardingOn: boolean;
};

export class WeeklyGameRewardMessage implements IIncomingPacket<WeeklyGameRewardMessageType> {
    public parse(wrapper: IMessageDataWrapper): WeeklyGameRewardMessageType {
        const gameTypeId = wrapper.readInt();
        const products = ParseArray(wrapper, ClubGiftSelectedDataParser);
        const minutesUntilNextWeek = wrapper.readInt();
        const rewardingOn = wrapper.readBoolean();
        return { gameTypeId, products, minutesUntilNextWeek, rewardingOn };
    }
}
