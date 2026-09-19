// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { InstantMessageContentParser } from './Data/InstantMessageContentParser';

export type NewConsoleMessageMessageType = {
    chatId: number;
    /** The text; empty when the message is a habbicon. */
    message: string;
    /** Above zero when the message is a habbicon rather than text. */
    habbiconId: number;
    secondsSinceSent: number;
    messageId: string;
    confirmationId: number;
    senderId: number;
    senderName: string;
    senderFigure: string;
};

export class NewConsoleMessageMessage implements IIncomingPacket<NewConsoleMessageMessageType> {
    public parse(wrapper: IMessageDataWrapper): NewConsoleMessageMessageType {
        const chatId = wrapper.readInt();
        const content = InstantMessageContentParser(wrapper);

        const packet: NewConsoleMessageMessageType = {
            chatId,
            message: content.messageText,
            habbiconId: content.habbiconId,
            secondsSinceSent: wrapper.readInt(),
            messageId: wrapper.readString(),
            confirmationId: wrapper.readInt(),
            senderId: wrapper.readInt(),
            senderName: wrapper.readString(),
            senderFigure: wrapper.readString(),
        };

        return packet;
    }
}
