import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(AreaHideData: List<AreaHideDataSnapshot>): List<T> requires custom read loop (length + items).

export type FloorHeightMapMessageType = {
    scaleType: boolean;
    fixedWallsHeight: number;
    modelData: string;
    areaHideData: any[];
};

export class FloorHeightMapMessage implements IIncomingPacket<FloorHeightMapMessageType> {
    public parse(wrapper: IMessageDataWrapper): FloorHeightMapMessageType {

        const packet: FloorHeightMapMessageType = {
            scaleType: wrapper.readBoolean(),
            fixedWallsHeight: wrapper.readInt(),
            modelData: wrapper.readString(),
            areaHideData: [],
        };

        const count = wrapper.readInt();

        return packet;
    }
}
