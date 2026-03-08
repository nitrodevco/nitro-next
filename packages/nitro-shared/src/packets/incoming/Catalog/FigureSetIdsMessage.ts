import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FigureSetIdsMessageType = {
  // no fields

};

export class FigureSetIdsMessage implements IIncomingPacket<FigureSetIdsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FigureSetIdsMessageType
  {

    const packet: FigureSetIdsMessageType = {
    };

    return packet;
  }
}
