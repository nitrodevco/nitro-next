import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CheckUserNameResultMessageType = {
  // no fields

};

export class CheckUserNameResultMessage implements IIncomingPacket<CheckUserNameResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CheckUserNameResultMessageType
  {

    const packet: CheckUserNameResultMessageType = {
    };

    return packet;
  }
}
