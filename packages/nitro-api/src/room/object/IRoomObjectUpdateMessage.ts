import type { IVector3D } from '#api/utils';

export interface IRoomObjectUpdateMessage {
    readonly location: IVector3D | undefined;
    readonly direction: IVector3D | undefined;
}
