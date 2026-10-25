import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPostMessage } from './Data/IPostMessage';
import { PostMessageParser } from './Data/PostMessageParser';

export type PostMessageType = {
    groupId: number;
    threadId: number;
    message: IPostMessage;
};

export class PostMessage implements IIncomingPacket<PostMessageType> {
    public parse(wrapper: IMessageDataWrapper): PostMessageType {
        const groupId = wrapper.readInt();
        const threadId = wrapper.readInt();
        const message = PostMessageParser(wrapper);
        return { groupId, threadId, message };
    }
}
