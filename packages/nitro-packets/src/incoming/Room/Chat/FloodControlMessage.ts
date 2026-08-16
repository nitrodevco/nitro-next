import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FloodControlMessageType = {
  // no fields

};

export class FloodControlMessage implements IIncomingPacket<FloodControlMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FloodControlMessageType
  {

    const packet: FloodControlMessageType = {
    };

    return packet;
  }
}
