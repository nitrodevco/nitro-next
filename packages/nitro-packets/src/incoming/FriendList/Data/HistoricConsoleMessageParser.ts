import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IHistoricConsoleMessage } from './IHistoricConsoleMessage';

export const HistoricConsoleMessageParser = (wrapper: IMessageDataWrapper): IHistoricConsoleMessage => {
    return {
        senderId: wrapper.readInt(),
        senderName: wrapper.readString(),
        senderFigure: wrapper.readString(),
        message: wrapper.readString(),
        secondsSinceSent: wrapper.readInt(),
        messageId: wrapper.readString(),
    };
};
