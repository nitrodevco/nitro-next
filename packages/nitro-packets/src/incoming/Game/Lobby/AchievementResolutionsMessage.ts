import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AchievementResolutionsMessageType = object;

export class AchievementResolutionsMessage implements IIncomingPacket<AchievementResolutionsMessageType> {
    public parse(wrapper: IMessageDataWrapper): AchievementResolutionsMessageType {
        const packet: AchievementResolutionsMessageType = {
        };

        return packet;
    }
}
