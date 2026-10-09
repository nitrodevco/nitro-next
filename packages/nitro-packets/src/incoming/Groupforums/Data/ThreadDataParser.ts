// Body filled by hand from the AS3 parser (`groupforums/ThreadData.readFromMessage`).
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `ThreadData`. `state`: 0 and 1 shown, 10 hidden by the group's admin, 20 hidden by staff. */
export interface IThreadData {
    threadId: number;
    threadAuthorId: number;
    threadAuthorName: string;
    header: string;
    isSticky: boolean;
    isLocked: boolean;
    creationTimeAsSecondsAgo: number;
    nMessages: number;
    nUnreadMessages: number;
    lastMessageId: number;
    lastMessageAuthorId: number;
    lastMessageAuthorName: string;
    lastMessageTimeAsSecondsAgo: number;
    state: number;
    adminId: number;
    adminName: string;
    adminOperationTimeAsSecondsAgo: number;
}

export const ThreadDataParser = (wrapper: IMessageDataWrapper): IThreadData => ({
    threadId: wrapper.readInt(),
    threadAuthorId: wrapper.readInt(),
    threadAuthorName: wrapper.readString(),
    header: wrapper.readString(),
    isSticky: wrapper.readBoolean(),
    isLocked: wrapper.readBoolean(),
    creationTimeAsSecondsAgo: wrapper.readInt(),
    nMessages: wrapper.readInt(),
    nUnreadMessages: wrapper.readInt(),
    lastMessageId: wrapper.readInt(),
    lastMessageAuthorId: wrapper.readInt(),
    lastMessageAuthorName: wrapper.readString(),
    lastMessageTimeAsSecondsAgo: wrapper.readInt(),
    state: wrapper.readByte(),
    adminId: wrapper.readInt(),
    adminName: wrapper.readString(),
    adminOperationTimeAsSecondsAgo: wrapper.readInt(),
});
