import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserNftWardrobeMessageType = {
  // no fields

};

export class UserNftWardrobeMessage implements IIncomingPacket<UserNftWardrobeMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UserNftWardrobeMessageType
  {

    const packet: UserNftWardrobeMessageType = {
    };

    return packet;
  }
}
