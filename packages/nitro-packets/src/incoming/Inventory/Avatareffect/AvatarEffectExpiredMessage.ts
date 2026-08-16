import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AvatarEffectExpiredMessageType = {
  // no fields

};

export class AvatarEffectExpiredMessage implements IIncomingPacket<AvatarEffectExpiredMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AvatarEffectExpiredMessageType
  {

    const packet: AvatarEffectExpiredMessageType = {
    };

    return packet;
  }
}
