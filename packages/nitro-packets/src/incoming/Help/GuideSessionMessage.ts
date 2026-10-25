import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuideSessionMessageType = {
    chatMessage: string;
    senderId: number;
};

export class GuideSessionMessage implements IIncomingPacket<GuideSessionMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuideSessionMessageType {
        const chatMessage = wrapper.readString();
        const senderId = wrapper.readInt();
        return { chatMessage, senderId };
    }
}
