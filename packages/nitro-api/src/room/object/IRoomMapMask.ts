import type { IVector3D } from '#api/utils';

export interface IRoomMapMask {
    id: string;
    type: string;
    category: string;
    locations: IVector3D[];
}
