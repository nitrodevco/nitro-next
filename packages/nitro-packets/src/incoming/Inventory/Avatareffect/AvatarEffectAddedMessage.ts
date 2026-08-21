import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AvatarEffectAddedMessageType = {
  type: number;
  subType: number;
  duration: number;
  isPermanent: boolean;
};

export class AvatarEffectAddedMessage implements IIncomingPacket<AvatarEffectAddedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AvatarEffectAddedMessageType
  {
    const packet: AvatarEffectAddedMessageType = {
      type: wrapper.readInt(),
      subType: wrapper.readInt(),
      duration: wrapper.readInt(),
      isPermanent: wrapper.readBoolean(),
    };

    return packet;
  }
}
