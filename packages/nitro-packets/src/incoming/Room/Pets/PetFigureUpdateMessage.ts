import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetFigureUpdateMessageType = {
  // no fields

};

export class PetFigureUpdateMessage implements IIncomingPacket<PetFigureUpdateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetFigureUpdateMessageType
  {

    const packet: PetFigureUpdateMessageType = {
    };

    return packet;
  }
}
