// Body filled by hand from the AS3 parser (`groupforums/ThreadMessagesMessageParser`).
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPostMessage } from './Data/IPostMessage';
import { PostMessageParser } from './Data/PostMessageParser';

export type ThreadMessagesMessageType = {
    groupId: number;
    threadId: number;
    startIndex: number;
    messages: IPostMessage[];
};

export class ThreadMessagesMessage implements IIncomingPacket<ThreadMessagesMessageType> {
    public parse(wrapper: IMessageDataWrapper): ThreadMessagesMessageType {
        const groupId = wrapper.readInt();
        const threadId = wrapper.readInt();
        const startIndex = wrapper.readInt();
        const messages: IPostMessage[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            messages.push({ ...PostMessageParser(wrapper), groupID: groupId, threadId });

            count--;
        }

        return { groupId, threadId, startIndex, messages };
    }
}
