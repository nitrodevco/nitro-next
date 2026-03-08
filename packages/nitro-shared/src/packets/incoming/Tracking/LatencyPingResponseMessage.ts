import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type LatencyPingResponseMessageType = {
  requestId: number;
};

export class LatencyPingResponseMessage implements IIncomingPacket<LatencyPingResponseMessageType>
{
  public parse(wrapper: IMessageDataWrapper): LatencyPingResponseMessageType
  {

    const packet: LatencyPingResponseMessageType = {
      requestId: wrapper.readInt(),
    };

    return packet;
  }
}
