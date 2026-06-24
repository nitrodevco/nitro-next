import { IIncomingPacket, IMessageDataWrapper, RoomThicknessType } from '@nitrodevco/nitro-api';

export type RoomVisualizationSettingsMessageType = {
    wallsHidden: boolean;
    wallThickness: RoomThicknessType;
    floorThickness: RoomThicknessType;
};

export class RoomVisualizationSettingsMessage implements IIncomingPacket<RoomVisualizationSettingsMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomVisualizationSettingsMessageType {
        const packet: RoomVisualizationSettingsMessageType = {
            wallsHidden: wrapper.readBoolean(),
            wallThickness: wrapper.readInt(),
            floorThickness: wrapper.readInt()
        };

        packet.wallThickness = (packet.wallThickness < -2) ? -2 : (packet.wallThickness > 1) ? 1 : packet.wallThickness;
        packet.floorThickness = (packet.floorThickness < -2) ? -2 : (packet.floorThickness > 1) ? 1 : packet.floorThickness;

        packet.wallThickness = Math.pow(2, packet.wallThickness);
        packet.floorThickness = Math.pow(2, packet.floorThickness);

        return packet;
    }
}
