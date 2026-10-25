import { IRoomGeometry } from '#api/room/IRoomGeometry';
import { IVector3D } from '#api/utils';

import { IPlaneDrawingData } from './IPlaneDrawingData';

export interface IRoomPlane {
    uniqueId: number;
    location: IVector3D;
    leftSide: IVector3D;
    rightSide: IVector3D;
    color: number;
    getDrawingDatas(geometry: IRoomGeometry): IPlaneDrawingData[];
}
