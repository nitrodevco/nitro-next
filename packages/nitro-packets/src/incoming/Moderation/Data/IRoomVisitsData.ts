import { IRoomVisitsDatad } from './IRoomVisitsDatad';

export interface IRoomVisitsData {
    userId: number;
    userName: string;
    rooms: IRoomVisitsDatad[];
}
