import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WeeklyGameRewardEventMessageType = object;

export class WeeklyGameRewardEventMessage implements IIncomingPacket<WeeklyGameRewardEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): WeeklyGameRewardEventMessageType {
        const packet: WeeklyGameRewardEventMessageType = {
        };

        return packet;
    }
}
