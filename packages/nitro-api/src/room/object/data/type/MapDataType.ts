import type { IMessageDataWrapper } from '../../../../communication';
import type { IRoomObjectModel } from '../../IRoomObjectModel';
import { RoomObjectVariableEnum } from '../../RoomObjectVariableEnum';
import type { IObjectData } from '../IObjectData';
import { ObjectDataBase } from '../ObjectDataBase';
import { ObjectDataFlagsEnum } from '../ObjectDataFlagsEnum';

export class MapDataType extends ObjectDataBase {
    private static STATE = 'state';
    private static RARITY = 'rarity';

    private _data: Record<string, string> = {};

    public parseWrapper(wrapper: IMessageDataWrapper): void {
        if (!wrapper) return;

        this._data = {};

        const totalSets = wrapper.readInt();

        if (totalSets) for (let i = 0; i < totalSets; i++) this._data[wrapper.readString()] = wrapper.readString();

        super.parseWrapper(wrapper);
    }

    public initializeFromRoomObjectModel(model: IRoomObjectModel): void {
        super.initializeFromRoomObjectModel(model);

        this._data = model.getValue<Record<string, string>>(RoomObjectVariableEnum.FurnitureData) || {};
    }

    public writeRoomObjectModel(model: IRoomObjectModel): void {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariableEnum.FurnitureDataFormat, ObjectDataFlagsEnum.Map);
        model.setValue(RoomObjectVariableEnum.FurnitureData, this._data);
    }

    public getLegacyString(): string {
        if (!this._data) return '';

        const state = this._data[MapDataType.STATE];

        if (state === undefined || state === null) return '';

        return state;
    }

    public compare(data: IObjectData): boolean {
        return false;
    }

    public getValue(key: string): string {
        return this._data[key];
    }

    public get rarityLevel(): number {
        if (!this._data) return -1;

        const state = this._data[MapDataType.RARITY];

        if (state === undefined || state === null) return -1;

        return parseInt(state);
    }

    // TODO: How to get the keys?
    public get data() {
        return this._data;
    }
}
