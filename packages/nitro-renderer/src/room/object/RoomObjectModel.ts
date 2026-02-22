import type { IRoomObjectModel, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

export class RoomObjectModel implements IRoomObjectModel {
    private _map: Map<RoomObjectVariableEnum, unknown> = new Map();
    private _updateCounter: number = 0;

    public dispose(): void {
        this._map.clear();

        this._updateCounter = 0;
    }

    public getValue<T>(key: RoomObjectVariableEnum): T {
        return this._map.get(key) as T;
    }

    public setValue<T>(key: RoomObjectVariableEnum, value: T): void {
        if (this._map.has(key)) {
            if (this._map.get(key) === value) return;
        }

        this._map.set(key, value);

        this._updateCounter++;
    }

    public removeKey(key: RoomObjectVariableEnum): void {
        if (!this._map.delete(key)) return;

        this._updateCounter++;
    }

    public get updateCounter(): number {
        return this._updateCounter;
    }
}
