import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { AreaHideParser } from './Data/AreaHideParser';
import { IAreaHide } from './Data/IAreaHide';

export type FloorHeightMapMessageType = {
    scaleType: boolean;
    fixedWallsHeight: number;
    modelData: string;
    areaHideData: IAreaHide[];
    cameraInitX: number;
    cameraInitY: number;
    cameraInitZ: number;
};

export class FloorHeightMapMessage implements IIncomingPacket<FloorHeightMapMessageType> {
    public parse(wrapper: IMessageDataWrapper): FloorHeightMapMessageType {
        const packet: FloorHeightMapMessageType = {
            scaleType: wrapper.readBoolean(),
            fixedWallsHeight: wrapper.readInt(),
            modelData: wrapper.readString(),
            areaHideData: AreaHideParser(wrapper),
            cameraInitX: wrapper.readInt(),
            cameraInitY: wrapper.readInt(),
            cameraInitZ: wrapper.readFloat(),
        };

        return packet;
    }
}
