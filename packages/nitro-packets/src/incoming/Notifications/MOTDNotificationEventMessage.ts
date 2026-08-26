import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MOTDNotificationEventMessageType = {
    messages: string[];
};

export class MOTDNotificationEventMessage implements IIncomingPacket<MOTDNotificationEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): MOTDNotificationEventMessageType {
        const packet: MOTDNotificationEventMessageType = {
            messages: [],
        };

        let count = wrapper.readInt();

        while (count) {
            packet.messages.push(wrapper.readString());

            count--;
        }

        return packet;
    }
}
