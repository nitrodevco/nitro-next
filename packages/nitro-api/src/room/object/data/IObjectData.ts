import { IMessageDataWrapper } from '#api/communication';

import { IRoomObjectModel } from '../IRoomObjectModel';
import { ObjectDataFlagsEnum } from './ObjectDataFlagsEnum';

export interface IObjectData {
    state: number;
    isUnique: boolean;
    uniqueNumber: number;
    uniqueSeries: number;
    rarityLevel: number;
    flags: ObjectDataFlagsEnum;
    parseWrapper(wrapper: IMessageDataWrapper): void;
    initializeFromRoomObjectModel(model: IRoomObjectModel): void;
    writeRoomObjectModel(model: IRoomObjectModel): void;
    getLegacyString(): string;
    compare(data: IObjectData): boolean;
}
