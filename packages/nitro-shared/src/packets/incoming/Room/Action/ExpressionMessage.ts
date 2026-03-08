import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ExpressionMessageType = {
  userId: number;
  expressionType: number;
};

export class ExpressionMessage implements IIncomingPacket<ExpressionMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ExpressionMessageType
  {

    const packet: ExpressionMessageType = {
      userId: wrapper.readInt(),
      expressionType: wrapper.readInt(),
    };

    return packet;
  }
}
