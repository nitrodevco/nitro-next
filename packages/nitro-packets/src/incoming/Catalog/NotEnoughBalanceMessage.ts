import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NotEnoughBalanceMessageType = {
    notEnoughCredits: boolean;
    notEnoughActivityPoints: boolean;
    activityPointType: number;
};

export class NotEnoughBalanceMessage implements IIncomingPacket<NotEnoughBalanceMessageType> {
    public parse(wrapper: IMessageDataWrapper): NotEnoughBalanceMessageType {
        return {
            notEnoughCredits: wrapper.readBoolean(),
            notEnoughActivityPoints: wrapper.readBoolean(),
            activityPointType: wrapper.readInt()
        };
    }
}
