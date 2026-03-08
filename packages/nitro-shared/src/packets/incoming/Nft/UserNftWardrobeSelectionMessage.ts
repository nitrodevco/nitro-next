import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserNftWardrobeSelectionMessageType = {
  // no fields

};

export class UserNftWardrobeSelectionMessage implements IIncomingPacket<UserNftWardrobeSelectionMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UserNftWardrobeSelectionMessageType
  {

    const packet: UserNftWardrobeSelectionMessageType = {
    };

    return packet;
  }
}
