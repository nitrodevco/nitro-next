import type { RoomObjectVariableEnum } from './RoomObjectVariableEnum';

export interface IRoomObjectModel {
    dispose(): void;
    getValue<T>(key: RoomObjectVariableEnum): T;
    setValue<T>(key: RoomObjectVariableEnum, value: T): void;
    removeKey(key: RoomObjectVariableEnum): void;
    updateCounter: number;
}
