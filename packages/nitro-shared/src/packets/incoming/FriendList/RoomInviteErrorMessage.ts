import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(FailedRecipients: List<int>?): List<T> requires custom read loop (length + items).

export type RoomInviteErrorMessageType = {
  errorCode: number;
  failedRecipients: number[];
};

export class RoomInviteErrorMessage implements IIncomingPacket<RoomInviteErrorMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomInviteErrorMessageType
  {

    const packet: RoomInviteErrorMessageType = {
      errorCode: wrapper.readInt(),
      failedRecipients: undefined as any, // List<T> requires custom read loop (length + items).
    };

    return packet;
  }
}
