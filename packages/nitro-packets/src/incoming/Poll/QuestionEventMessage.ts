import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type QuestionEventMessageType = {
  // no fields

};

export class QuestionEventMessage implements IIncomingPacket<QuestionEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): QuestionEventMessageType
  {

    const packet: QuestionEventMessageType = {
    };

    return packet;
  }
}
