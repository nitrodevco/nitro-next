import type { IVector3D } from '../../utils';

export interface IRoomObjectUpdateMessage {
    readonly location: IVector3D;
    readonly direction: IVector3D;
}
