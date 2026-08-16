import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CfhTopicsInitMessageType = {
  // no fields

};

export class CfhTopicsInitMessage implements IIncomingPacket<CfhTopicsInitMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CfhTopicsInitMessageType
  {

    const packet: CfhTopicsInitMessageType = {
    };

    return packet;
  }
}
