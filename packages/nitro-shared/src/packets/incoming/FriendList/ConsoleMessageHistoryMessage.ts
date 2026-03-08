import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Messages: List<MessageHistoryEntrySnapshot>): List<T> requires custom read loop (length + items).

export type ConsoleMessageHistoryMessageType = {
  chatId: number;
  messages: any[];
};

export class ConsoleMessageHistoryMessage implements IIncomingPacket<ConsoleMessageHistoryMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ConsoleMessageHistoryMessageType
  {

    const packet: ConsoleMessageHistoryMessageType = {
      chatId: wrapper.readInt(),
      messages: undefined as any, // List<T> requires custom read loop (length + items).
    };

    return packet;
  }
}
