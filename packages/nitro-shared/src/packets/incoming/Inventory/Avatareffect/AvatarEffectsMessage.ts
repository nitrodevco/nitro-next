import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Effects: ImmutableArray<AvatarEffectSnapshot>): Unknown type 'ImmutableArray<AvatarEffectSnapshot>'. Add override mapping.

export type AvatarEffectsMessageType = {
  effects: any;
};

export class AvatarEffectsMessage implements IIncomingPacket<AvatarEffectsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AvatarEffectsMessageType
  {

    const packet: AvatarEffectsMessageType = {
      effects: undefined as any, // Unknown type 'ImmutableArray<AvatarEffectSnapshot>'. Add override mapping.
    };

    return packet;
  }
}
