import type { IVector3D } from '../../utils';
import type { IObjectData, RoomObjectCategoryEnum, RoomObjectOperationType } from '../object';

export interface ISelectedRoomObjectData {
    id: number;
    category: RoomObjectCategoryEnum;
    operation: RoomObjectOperationType;
    loc: IVector3D;
    dir: IVector3D;
    typeId: number;
    instanceData: string;
    stuffData: IObjectData;
    state: number;
    animFrame: number;
    posture: string;
    dispose: () => void;
}
