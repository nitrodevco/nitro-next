import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GroupDetailsChangedMessageType = object;

export class GroupDetailsChangedMessage implements IIncomingPacket<GroupDetailsChangedMessageType> {
    public parse(wrapper: IMessageDataWrapper): GroupDetailsChangedMessageType {
        const packet: GroupDetailsChangedMessageType = {
        };

        return packet;
    }
}
