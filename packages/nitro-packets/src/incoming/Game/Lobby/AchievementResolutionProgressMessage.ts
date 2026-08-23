import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AchievementResolutionProgressMessageType = object;

export class AchievementResolutionProgressMessage implements IIncomingPacket<AchievementResolutionProgressMessageType> {
    public parse(wrapper: IMessageDataWrapper): AchievementResolutionProgressMessageType {
        const packet: AchievementResolutionProgressMessageType = {
        };

        return packet;
    }
}
