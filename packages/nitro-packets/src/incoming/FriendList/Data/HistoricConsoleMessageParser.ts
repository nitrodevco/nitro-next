// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IHistoricConsoleMessage } from './IHistoricConsoleMessage';
import { InstantMessageContentParser } from './InstantMessageContentParser';

/** Flash `MessageHistoryEntry`: the sender, then the typed content, then when it was sent. */
export const HistoricConsoleMessageParser = (wrapper: IMessageDataWrapper): IHistoricConsoleMessage => {
    const senderId = wrapper.readInt();
    const senderName = wrapper.readString();
    const senderFigure = wrapper.readString();
    const content = InstantMessageContentParser(wrapper);

    return {
        senderId,
        senderName,
        senderFigure,
        message: content.messageText,
        habbiconId: content.habbiconId,
        secondsSinceSent: wrapper.readInt(),
        messageId: wrapper.readString(),
    };
};
