// Body filled by hand from the AS3 parser (`groupforums/GetForumsListMessageParser`).
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ForumDataParser, IForumData } from './Data/ForumDataParser';

export type ForumsListMessageType = {
    /** 0 active, 1 popular, 2 the forums of the user's groups. */
    listCode: number;
    totalAmount: number;
    startIndex: number;
    forums: IForumData[];
};

export class ForumsListMessage implements IIncomingPacket<ForumsListMessageType> {
    public parse(wrapper: IMessageDataWrapper): ForumsListMessageType {
        const listCode = wrapper.readInt();
        const totalAmount = wrapper.readInt();
        const startIndex = wrapper.readInt();
        const forums: IForumData[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            forums.push(ForumDataParser(wrapper));

            count--;
        }

        return { listCode, totalAmount, startIndex, forums };
    }
}
