// Body filled by hand from the AS3 parser: the group id, then the thread.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IThreadData, ThreadDataParser } from './Data/ThreadDataParser';

export type PostThreadMessageType = {
    groupId: number;
    thread: IThreadData;
};

export class PostThreadMessage implements IIncomingPacket<PostThreadMessageType> {
    public parse(wrapper: IMessageDataWrapper): PostThreadMessageType {
        const groupId = wrapper.readInt();
        const thread = ThreadDataParser(wrapper);

        return { groupId, thread };
    }
}
