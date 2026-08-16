import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { AreaHideParser } from './Data/AreaHideParser';
import type { IAreaHide } from './Data/IAreaHide';

export type FloorHeightMapMessageType = {
    scaleType: boolean;
    fixedWallsHeight: number;
    modelData: string;
    areaHideData: IAreaHide[];
};

export class FloorHeightMapMessage implements IIncomingPacket<FloorHeightMapMessageType> {
    public parse(wrapper: IMessageDataWrapper): FloorHeightMapMessageType {

        const packet: FloorHeightMapMessageType = {
            scaleType: wrapper.readBoolean(),
            fixedWallsHeight: wrapper.readInt(),
            modelData: wrapper.readString(),
            areaHideData: AreaHideParser(wrapper),
        };

        return packet;
    }
}
