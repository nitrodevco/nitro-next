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
            floorThickness: wrapper.readInt(),
        };

        packet.wallThickness = (packet.wallThickness < RoomThicknessType.Thinnest) ? -2 : (packet.wallThickness > RoomThicknessType.Thick) ? 1 : packet.wallThickness;
        packet.floorThickness = (packet.floorThickness < RoomThicknessType.Thinnest) ? -2 : (packet.floorThickness > RoomThicknessType.Thick) ? 1 : packet.floorThickness;

        packet.wallThickness = Math.pow(2, packet.wallThickness);
        packet.floorThickness = Math.pow(2, packet.floorThickness);

        return packet;
    }
}
