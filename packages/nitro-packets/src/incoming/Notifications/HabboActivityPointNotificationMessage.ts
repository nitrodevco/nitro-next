import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type HabboActivityPointNotificationMessageType = {
    amount: number;
    change: number;
    type: number;
};

export class HabboActivityPointNotificationMessage implements IIncomingPacket<HabboActivityPointNotificationMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboActivityPointNotificationMessageType {
        const packet: HabboActivityPointNotificationMessageType = {
            amount: wrapper.readInt(),
            change: wrapper.readInt(),
            type: wrapper.readInt()
        };

        return packet;
    }
}
