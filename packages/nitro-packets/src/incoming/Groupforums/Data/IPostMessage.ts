export interface IPostMessage {
    messageId: number;
    messageIndex: number;
    authorId: number;
    authorName: string;
    authorFigure: string;
    creationTimeAsSecondsAgo: number;
    messageText: string;
    state: number;
    adminId: number;
    adminName: string;
    adminOperationTimeAsSeccondsAgo: number;
    authorPostCount: number;
    groupID?: number;
    threadId?: number;
}
