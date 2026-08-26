import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NotificationDialogMessageType = {
    type: string;
    parameters: Record<string, string>;
};

export class NotificationDialogMessage implements IIncomingPacket<NotificationDialogMessageType> {
    public parse(wrapper: IMessageDataWrapper): NotificationDialogMessageType {
        const type = wrapper.readString();
        const parameters: Record<string, string> = {};

        let totalParameters = wrapper.readInt();

        while (totalParameters > 0) {
            const key = wrapper.readString();

            parameters[key] = wrapper.readString();

            totalParameters--;
        }

        const packet: NotificationDialogMessageType = {
            type,
            parameters
        };

        return packet;
    }
}
