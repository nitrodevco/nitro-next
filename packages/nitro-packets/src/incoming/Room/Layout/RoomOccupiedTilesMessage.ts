// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

/** One tile the room will not let the floor plan editor change - something is standing on it. */
export interface IOccupiedTile {
    x: number;
    y: number;
}

export type RoomOccupiedTilesMessageType = {
    occupiedTiles: IOccupiedTile[];
};

export class RoomOccupiedTilesMessage implements IIncomingPacket<RoomOccupiedTilesMessageType> {
    public parse(wrapper: IMessageDataWrapper): RoomOccupiedTilesMessageType {
        const packet: RoomOccupiedTilesMessageType = {
            occupiedTiles: ParseArray(wrapper, wrapper => ({
                x: wrapper.readInt(),
                y: wrapper.readInt(),
            })),
        };

        return packet;
    }
}
