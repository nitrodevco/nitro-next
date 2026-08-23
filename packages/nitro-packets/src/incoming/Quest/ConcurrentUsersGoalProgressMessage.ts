import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ConcurrentUsersGoalProgressMessageType = object;

export class ConcurrentUsersGoalProgressMessage implements IIncomingPacket<ConcurrentUsersGoalProgressMessageType> {
    public parse(wrapper: IMessageDataWrapper): ConcurrentUsersGoalProgressMessageType {
        const packet: ConcurrentUsersGoalProgressMessageType = {
        };

        return packet;
    }
}
