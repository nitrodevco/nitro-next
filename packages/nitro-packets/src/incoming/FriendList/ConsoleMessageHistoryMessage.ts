import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { HistoricConsoleMessageParser } from './Data/HistoricConsoleMessageParser';
import { IHistoricConsoleMessage } from './Data/IHistoricConsoleMessage';

export type ConsoleMessageHistoryMessageType = {
    chatId: number;
    messages: IHistoricConsoleMessage[];
};

export class ConsoleMessageHistoryMessage implements IIncomingPacket<ConsoleMessageHistoryMessageType> {
    public parse(wrapper: IMessageDataWrapper): ConsoleMessageHistoryMessageType {
        const packet: ConsoleMessageHistoryMessageType = {
            chatId: wrapper.readInt(),
            messages: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.messages.push(HistoricConsoleMessageParser(wrapper));

            count--;
        }

        return packet;
    }
}
