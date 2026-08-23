import { IVector3D } from '../utils';
import { IObjectData } from './object';

export interface IRoomFurnitureData {
    readonly objectId: number;
    readonly typeId: number;
    readonly typeName: string;
    readonly location: IVector3D;
    readonly direction: IVector3D;
    readonly state: number;
    readonly objectData: IObjectData;
    readonly extra: number;
    readonly expires: number;
    readonly usagePolicy: number;
    readonly ownerId: number;
    readonly ownerName: string;
    readonly realRoomObject: boolean;
    readonly sizeZ: number;
}
