import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AvatarEffectSelectedMessageType = {
  type: number;
};

export class AvatarEffectSelectedMessage implements IIncomingPacket<AvatarEffectSelectedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AvatarEffectSelectedMessageType
  {
    const packet: AvatarEffectSelectedMessageType = {
      type: wrapper.readInt(),
    };

    return packet;
  }
}
