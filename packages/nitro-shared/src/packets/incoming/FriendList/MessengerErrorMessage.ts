import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ErrorCode: FriendListErrorCodeType): Unknown type 'FriendListErrorCodeType'. Add override mapping.

export type MessengerErrorMessageType = {
  clientMessageId: number;
  errorCode: any;
};

export class MessengerErrorMessage implements IIncomingPacket<MessengerErrorMessageType>
{
  public parse(wrapper: IMessageDataWrapper): MessengerErrorMessageType
  {

    const packet: MessengerErrorMessageType = {
      clientMessageId: wrapper.readInt(),
      errorCode: undefined as any, // Unknown type 'FriendListErrorCodeType'. Add override mapping.
    };

    return packet;
  }
}
