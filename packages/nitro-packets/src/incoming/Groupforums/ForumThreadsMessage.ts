// Body filled by hand from the AS3 parser (`groupforums/ForumThreadsMessageParser`).
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IThreadData, ThreadDataParser } from './Data/ThreadDataParser';

export type ForumThreadsMessageType = {
    groupId: number;
    startIndex: number;
    threads: IThreadData[];
};

export class ForumThreadsMessage implements IIncomingPacket<ForumThreadsMessageType> {
    public parse(wrapper: IMessageDataWrapper): ForumThreadsMessageType {
        const groupId = wrapper.readInt();
        const startIndex = wrapper.readInt();
        const threads: IThreadData[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            threads.push(ThreadDataParser(wrapper));

            count--;
        }

        return { groupId, startIndex, threads };
    }
}
