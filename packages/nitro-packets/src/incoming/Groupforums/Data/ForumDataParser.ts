// Body filled by hand from the AS3 parser (`groupforums/ForumData.fillFromMessage` / `ExtendedForumData.readFromMessage`).
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `ForumData`: one group's forum as a list shows it. */
export interface IForumData {
    groupId: number;
    name: string;
    description: string;
    /** The group's badge code. */
    icon: string;
    totalThreads: number;
    leaderboardScore: number;
    totalMessages: number;
    unreadMessages: number;
    lastMessageId: number;
    lastMessageAuthorId: number;
    lastMessageAuthorName: string;
    lastMessageTimeAsSecondsAgo: number;
}

/** `ExtendedForumData`: a forum with the user's permissions in it; an error text is empty where the user may. */
export interface IExtendedForumData extends IForumData {
    readPermissions: number;
    postMessagePermissions: number;
    postThreadPermissions: number;
    moderatePermissions: number;
    readPermissionError: string;
    postMessagePermissionError: string;
    postThreadPermissionError: string;
    moderatePermissionError: string;
    reportPermissionError: string;
    canChangeSettings: boolean;
    isStaff: boolean;
}

export const ForumDataParser = (wrapper: IMessageDataWrapper): IForumData => ({
    groupId: wrapper.readInt(),
    name: wrapper.readString(),
    description: wrapper.readString(),
    icon: wrapper.readString(),
    totalThreads: wrapper.readInt(),
    leaderboardScore: wrapper.readInt(),
    totalMessages: wrapper.readInt(),
    unreadMessages: wrapper.readInt(),
    lastMessageId: wrapper.readInt(),
    lastMessageAuthorId: wrapper.readInt(),
    lastMessageAuthorName: wrapper.readString(),
    lastMessageTimeAsSecondsAgo: wrapper.readInt(),
});

export const ExtendedForumDataParser = (wrapper: IMessageDataWrapper): IExtendedForumData => {
    const forum = ForumDataParser(wrapper);

    return {
        ...forum,
        readPermissions: wrapper.readInt(),
        postMessagePermissions: wrapper.readInt(),
        postThreadPermissions: wrapper.readInt(),
        moderatePermissions: wrapper.readInt(),
        readPermissionError: wrapper.readString(),
        postMessagePermissionError: wrapper.readString(),
        postThreadPermissionError: wrapper.readString(),
        moderatePermissionError: wrapper.readString(),
        reportPermissionError: wrapper.readString(),
        canChangeSettings: wrapper.readBoolean(),
        isStaff: wrapper.readBoolean(),
    };
};
