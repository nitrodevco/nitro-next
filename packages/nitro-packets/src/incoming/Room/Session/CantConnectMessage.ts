import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/*
 * CantConnectMessageParser — reason int, then a parameter string only when the
 * packet carries more bytes (the reason 3 queue errors put the error key in it).
 */
export type CantConnectMessageType = {
  reason: number;
  parameter: string;
};

export class CantConnectMessage implements IIncomingPacket<CantConnectMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CantConnectMessageType
  {
    const packet: CantConnectMessageType = {
      reason: wrapper.readInt(),
      parameter: wrapper.bytesAvailable ? wrapper.readString() : '',
    };

    return packet;
  }
}
