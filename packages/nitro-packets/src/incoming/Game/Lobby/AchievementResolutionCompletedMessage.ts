import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AchievementResolutionCompletedMessageType = object;

export class AchievementResolutionCompletedMessage implements IIncomingPacket<AchievementResolutionCompletedMessageType> {
    public parse(wrapper: IMessageDataWrapper): AchievementResolutionCompletedMessageType {
        const packet: AchievementResolutionCompletedMessageType = {
        };

        return packet;
    }
}
