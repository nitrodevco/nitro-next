import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SnowWarGameTokensMessageMessageType = {
  // no fields

};

export class SnowWarGameTokensMessageMessage implements IIncomingPacket<SnowWarGameTokensMessageMessageType>
{
  public parse(wrapper: IMessageDataWrapper): SnowWarGameTokensMessageMessageType
  {

    const packet: SnowWarGameTokensMessageMessageType = {
    };

    return packet;
  }
}
