import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPostMessage } from './Data/IPostMessage';
import { PostMessageParser } from './Data/PostMessageParser';

export type UpdateMessageType = {
    groupId: number;
    threadId: number;
    message: IPostMessage;
};

export class UpdateMessage implements IIncomingPacket<UpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): UpdateMessageType {
        const groupId = wrapper.readInt();
        const threadId = wrapper.readInt();
        const message = PostMessageParser(wrapper);
        return { groupId, threadId, message };
    }
}
