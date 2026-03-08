import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NestBreedingSuccessEventMessageType = {
  // no fields

};

export class NestBreedingSuccessEventMessage implements IIncomingPacket<NestBreedingSuccessEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NestBreedingSuccessEventMessageType
  {

    const packet: NestBreedingSuccessEventMessageType = {
    };

    return packet;
  }
}
