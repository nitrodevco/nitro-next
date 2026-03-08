import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ErrorCode: RoomGenericErrorType): Unknown type 'RoomGenericErrorType'. Add override mapping.

export type GenericErrorMessageType = {
  errorCode: any;
};

export class GenericErrorMessage implements IIncomingPacket<GenericErrorMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GenericErrorMessageType
  {

    const packet: GenericErrorMessageType = {
      errorCode: undefined as any, // Unknown type 'RoomGenericErrorType'. Add override mapping.
    };

    return packet;
  }
}
