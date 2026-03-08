import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AvatarEffectActivatedMessageType = {
  // no fields

};

export class AvatarEffectActivatedMessage implements IIncomingPacket<AvatarEffectActivatedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AvatarEffectActivatedMessageType
  {

    const packet: AvatarEffectActivatedMessageType = {
    };

    return packet;
  }
}
