import { IWiredVariable } from './IWiredVariable';

export interface ISharedVariable {
    wiredVariable: IWiredVariable;
    roomId: number;
    roomName: string;
}
