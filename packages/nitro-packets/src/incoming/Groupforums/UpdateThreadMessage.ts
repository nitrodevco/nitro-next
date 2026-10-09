// Body filled by hand from the AS3 parser: the group id, then the thread.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IThreadData, ThreadDataParser } from './Data/ThreadDataParser';

export type UpdateThreadMessageType = {
    groupId: number;
    thread: IThreadData;
};

export class UpdateThreadMessage implements IIncomingPacket<UpdateThreadMessageType> {
    public parse(wrapper: IMessageDataWrapper): UpdateThreadMessageType {
        const groupId = wrapper.readInt();
        const thread = ThreadDataParser(wrapper);

        return { groupId, thread };
    }
}
