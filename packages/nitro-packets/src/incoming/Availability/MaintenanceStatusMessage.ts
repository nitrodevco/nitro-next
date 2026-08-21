import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MaintenanceStatusMessageType = {
  isInMaintenance: boolean;
  minutesUntilMaintenance: number;
  duration: number;
};

export class MaintenanceStatusMessage implements IIncomingPacket<MaintenanceStatusMessageType>
{
  public parse(wrapper: IMessageDataWrapper): MaintenanceStatusMessageType
  {
    const packet: MaintenanceStatusMessageType = {
      isInMaintenance: false,
      minutesUntilMaintenance: 0,
      duration: 0,
    };

    packet.isInMaintenance = wrapper.readBoolean();
    packet.minutesUntilMaintenance = wrapper.readInt();
    if (wrapper.bytesAvailable) {
        packet.duration = wrapper.readInt();
    }

    return packet;
  }
}
