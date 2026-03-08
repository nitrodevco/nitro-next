import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NewConsoleMessageMessageType = {
  chatId: number;
  message: string;
  secondsSinceSent: number;
  messageId: string;
  confirmationId: number;
  senderId: number;
  senderName: string;
  senderFigure: string;
};

export class NewConsoleMessageMessage implements IIncomingPacket<NewConsoleMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NewConsoleMessageMessageType
  {

    const packet: NewConsoleMessageMessageType = {
      chatId: wrapper.readInt(),
      message: wrapper.readString(),
      secondsSinceSent: wrapper.readInt(),
      messageId: wrapper.readString(),
      confirmationId: wrapper.readInt(),
      senderId: wrapper.readInt(),
      senderName: wrapper.readString(),
      senderFigure: wrapper.readString(),
    };

    return packet;
  }
}
