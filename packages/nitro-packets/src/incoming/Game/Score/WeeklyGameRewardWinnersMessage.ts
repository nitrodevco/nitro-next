import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IWeeklyGameRewardWinnersData } from './Data/IWeeklyGameRewardWinnersData';
import { WeeklyGameRewardWinnersDataParser } from './Data/WeeklyGameRewardWinnersDataParser';

export type WeeklyGameRewardWinnersMessageType = {
    gameTypeId: number;
    winners: IWeeklyGameRewardWinnersData[];
};

export class WeeklyGameRewardWinnersMessage implements IIncomingPacket<WeeklyGameRewardWinnersMessageType> {
    public parse(wrapper: IMessageDataWrapper): WeeklyGameRewardWinnersMessageType {
        const gameTypeId = wrapper.readInt();
        const winners = ParseArray(wrapper, WeeklyGameRewardWinnersDataParser);
        return { gameTypeId, winners };
    }
}
