import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WeeklyGameRewardWinnersEventMessageType = object;

export class WeeklyGameRewardWinnersEventMessage implements IIncomingPacket<WeeklyGameRewardWinnersEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): WeeklyGameRewardWinnersEventMessageType {
        const packet: WeeklyGameRewardWinnersEventMessageType = {
        };

        return packet;
    }
}
