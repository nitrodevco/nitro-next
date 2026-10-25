import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPostMessage } from './IPostMessage';

export const PostMessageParser = (wrapper: IMessageDataWrapper): IPostMessage => {
    const result: IPostMessage = { messageId: wrapper.readInt(), messageIndex: wrapper.readInt(), authorId: wrapper.readInt(), authorName: wrapper.readString(), authorFigure: wrapper.readString(), creationTimeAsSecondsAgo: wrapper.readInt(), messageText: wrapper.readString(), state: wrapper.readByte(), adminId: wrapper.readInt(), adminName: wrapper.readString(), adminOperationTimeAsSeccondsAgo: wrapper.readInt(), authorPostCount: wrapper.readInt() };
    return result;
};
