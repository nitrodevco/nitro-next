import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserClassificationMessageType = {
  // no fields

};

export class UserClassificationMessage implements IIncomingPacket<UserClassificationMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UserClassificationMessageType
  {

    const packet: UserClassificationMessageType = {
    };

    return packet;
  }
}
