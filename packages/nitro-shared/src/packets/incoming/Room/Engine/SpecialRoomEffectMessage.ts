import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SpecialRoomEffectMessageType = {
  // no fields

};

export class SpecialRoomEffectMessage implements IIncomingPacket<SpecialRoomEffectMessageType>
{
  public parse(wrapper: IMessageDataWrapper): SpecialRoomEffectMessageType
  {

    const packet: SpecialRoomEffectMessageType = {
    };

    return packet;
  }
}
