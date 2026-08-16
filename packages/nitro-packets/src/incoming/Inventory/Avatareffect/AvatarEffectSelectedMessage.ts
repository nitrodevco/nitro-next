import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AvatarEffectSelectedMessageType = {
  // no fields

};

export class AvatarEffectSelectedMessage implements IIncomingPacket<AvatarEffectSelectedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AvatarEffectSelectedMessageType
  {

    const packet: AvatarEffectSelectedMessageType = {
    };

    return packet;
  }
}
