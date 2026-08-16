import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MaintenanceStatusMessageType = {
  // no fields

};

export class MaintenanceStatusMessage implements IIncomingPacket<MaintenanceStatusMessageType>
{
  public parse(wrapper: IMessageDataWrapper): MaintenanceStatusMessageType
  {

    const packet: MaintenanceStatusMessageType = {
    };

    return packet;
  }
}
