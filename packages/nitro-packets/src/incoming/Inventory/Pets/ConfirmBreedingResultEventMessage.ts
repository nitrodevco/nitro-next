import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ConfirmBreedingResultEventMessageType = {
  // no fields

};

export class ConfirmBreedingResultEventMessage implements IIncomingPacket<ConfirmBreedingResultEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ConfirmBreedingResultEventMessageType
  {

    const packet: ConfirmBreedingResultEventMessageType = {
    };

    return packet;
  }
}
