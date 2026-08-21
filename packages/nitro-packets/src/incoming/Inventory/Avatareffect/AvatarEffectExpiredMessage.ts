import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AvatarEffectExpiredMessageType = {
  type: number;
};

export class AvatarEffectExpiredMessage implements IIncomingPacket<AvatarEffectExpiredMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AvatarEffectExpiredMessageType
  {
    const packet: AvatarEffectExpiredMessageType = {
      type: wrapper.readInt(),
    };

    return packet;
  }
}
