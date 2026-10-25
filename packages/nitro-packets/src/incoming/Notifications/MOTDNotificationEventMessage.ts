import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MOTDNotificationEventMessageType = {
    messages: string[];
};

export class MOTDNotificationEventMessage implements IIncomingPacket<MOTDNotificationEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): MOTDNotificationEventMessageType {
        const packet: MOTDNotificationEventMessageType = {
            messages: [],
        };

        let v1 = wrapper.readInt();
        while (v1 > 0) {
            packet.messages.push(wrapper.readString());
            v1--;
        }

        return packet;
    }
}
