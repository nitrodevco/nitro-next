import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ErrorType: RoomConnectionErrorType): Unknown type 'RoomConnectionErrorType'. Add override mapping.

export type CantConnectMessageType = {
  errorType: any;
  additionalInfo: string;
};

export class CantConnectMessage implements IIncomingPacket<CantConnectMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CantConnectMessageType
  {

    const packet: CantConnectMessageType = {
      errorType: undefined as any, // Unknown type 'RoomConnectionErrorType'. Add override mapping.
      additionalInfo: wrapper.readString(),
    };

    return packet;
  }
}
