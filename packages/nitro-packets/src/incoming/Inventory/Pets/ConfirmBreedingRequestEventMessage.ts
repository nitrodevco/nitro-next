import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ConfirmBreedingRequestEventMessageType = {
  // no fields

};

export class ConfirmBreedingRequestEventMessage implements IIncomingPacket<ConfirmBreedingRequestEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ConfirmBreedingRequestEventMessageType
  {

    const packet: ConfirmBreedingRequestEventMessageType = {
    };

    return packet;
  }
}
