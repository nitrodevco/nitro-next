import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AvatarEffectAddedMessageType = {
  // no fields

};

export class AvatarEffectAddedMessage implements IIncomingPacket<AvatarEffectAddedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AvatarEffectAddedMessageType
  {

    const packet: AvatarEffectAddedMessageType = {
    };

    return packet;
  }
}
