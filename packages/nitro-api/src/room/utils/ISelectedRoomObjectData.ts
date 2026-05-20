import type { IVector3D } from '#api/utils';

import type { IObjectData, RoomObjectCategoryEnum, RoomObjectOperationType } from '../object';

export interface ISelectedRoomObjectData {
    id: number;
    category: RoomObjectCategoryEnum;
    operation: RoomObjectOperationType | undefined;
    loc: IVector3D;
    dir: IVector3D;
    typeId: number;
    instanceData: string;
    stuffData: IObjectData | undefined;
    state: number;
    animFrame: number;
    posture: string;
    dispose: () => void;
}
