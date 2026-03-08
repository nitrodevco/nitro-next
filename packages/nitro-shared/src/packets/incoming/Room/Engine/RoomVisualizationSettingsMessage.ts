import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomVisualizationSettingsMessageType = {
  // no fields

};

export class RoomVisualizationSettingsMessage implements IIncomingPacket<RoomVisualizationSettingsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomVisualizationSettingsMessageType
  {

    const packet: RoomVisualizationSettingsMessageType = {
    };

    return packet;
  }
}
