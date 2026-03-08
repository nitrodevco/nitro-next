import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AvailabilityStatusMessageType = {
  isOpen: boolean;
  onShutDown: boolean;
  isAuthenticHabbo: boolean;
};

export class AvailabilityStatusMessage implements IIncomingPacket<AvailabilityStatusMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AvailabilityStatusMessageType
  {

    const packet: AvailabilityStatusMessageType = {
      isOpen: wrapper.readBoolean(),
      onShutDown: wrapper.readBoolean(),
      isAuthenticHabbo: wrapper.readBoolean(),
    };

    return packet;
  }
}
