import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type EpicPopupMessageType = {
  // no fields

};

export class EpicPopupMessage implements IIncomingPacket<EpicPopupMessageType>
{
  public parse(wrapper: IMessageDataWrapper): EpicPopupMessageType
  {

    const packet: EpicPopupMessageType = {
    };

    return packet;
  }
}
