import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AvatarEffectMessageType = {
  userId: number;
  effectId: number;
  delayMilliseconds: number;
};

export class AvatarEffectMessage implements IIncomingPacket<AvatarEffectMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AvatarEffectMessageType
  {

    const packet: AvatarEffectMessageType = {
      userId: wrapper.readInt(),
      effectId: wrapper.readInt(),
      delayMilliseconds: wrapper.readInt(),
    };

    return packet;
  }
}
