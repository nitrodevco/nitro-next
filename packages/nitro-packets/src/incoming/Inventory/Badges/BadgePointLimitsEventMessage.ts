import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BadgePointLimitData = {
    badgeId: string;
    limit: number;
};

export type BadgePointLimitsEventMessageType = {
    data: BadgePointLimitData[];
};

export class BadgePointLimitsEventMessage implements IIncomingPacket<BadgePointLimitsEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): BadgePointLimitsEventMessageType {
        const data: BadgePointLimitData[] = [];

        let groupCount = wrapper.readInt();

        while (groupCount > 0) {
            const code = wrapper.readString();

            let levelCount = wrapper.readInt();

            // `BadgeAndPointLimit`: the badge is `ACH_` + the achievement code + its level.
            while (levelCount > 0) {
                const level = wrapper.readInt();
                const limit = wrapper.readInt();

                data.push({ badgeId: `ACH_${code}${level}`, limit });

                levelCount--;
            }

            groupCount--;
        }

        return { data };
    }
}
