// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NotificationDialogMessageType = {
    type: string;
    /** The server's key/value pairs; `HabboNotifications.showNotification` merges `notification.<type>` over them. */
    parameters: Record<string, string>;
};

export class NotificationDialogMessage implements IIncomingPacket<NotificationDialogMessageType> {
    public parse(wrapper: IMessageDataWrapper): NotificationDialogMessageType {
        const packet: NotificationDialogMessageType = {
            type: '',
            parameters: {},
        };

        packet.type = wrapper.readString();
        let count = wrapper.readInt();
        while (count > 0) {
            const key = wrapper.readString();
            const value = wrapper.readString();
            packet.parameters[key] = value;
            count--;
        }

        return packet;
    }
}
