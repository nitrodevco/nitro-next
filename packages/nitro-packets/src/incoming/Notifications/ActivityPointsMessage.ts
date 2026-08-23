import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ActivityPointsMessageType = {
    pointsByCategoryId: Record<number, number>;
};

export class ActivityPointsMessage implements IIncomingPacket<ActivityPointsMessageType> {
    public parse(wrapper: IMessageDataWrapper): ActivityPointsMessageType {
        const packet: ActivityPointsMessageType = {
            pointsByCategoryId: {},
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.pointsByCategoryId[wrapper.readInt()] = wrapper.readInt();

            count--;
        }

        return packet;
    }
}
