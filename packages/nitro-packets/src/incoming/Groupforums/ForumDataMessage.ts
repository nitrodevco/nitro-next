// Body filled by hand from the AS3 parser (`groupforums/ForumDataMessageParser`).
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ExtendedForumDataParser, IExtendedForumData } from './Data/ForumDataParser';

export type ForumDataMessageType = {
    forumData: IExtendedForumData;
};

export class ForumDataMessage implements IIncomingPacket<ForumDataMessageType> {
    public parse(wrapper: IMessageDataWrapper): ForumDataMessageType {
        return { forumData: ExtendedForumDataParser(wrapper) };
    }
}
