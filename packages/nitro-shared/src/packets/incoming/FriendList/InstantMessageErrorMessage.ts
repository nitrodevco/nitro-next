import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ErrorCode: InstantMessageErrorCodeType): Unknown type 'InstantMessageErrorCodeType'. Add override mapping.

export type InstantMessageErrorMessageType = {
  errorCode: any;
  playerId: number;
  message: string;
};

export class InstantMessageErrorMessage implements IIncomingPacket<InstantMessageErrorMessageType>
{
  public parse(wrapper: IMessageDataWrapper): InstantMessageErrorMessageType
  {

    const packet: InstantMessageErrorMessageType = {
      errorCode: undefined as any, // Unknown type 'InstantMessageErrorCodeType'. Add override mapping.
      playerId: wrapper.readInt(),
      message: wrapper.readString(),
    };

    return packet;
  }
}
