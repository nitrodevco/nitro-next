import type { IMessageDataWrapper } from '../../../../communication';
import type { IRoomObjectModel } from '../../IRoomObjectModel';
import { RoomObjectVariableEnum } from '../../RoomObjectVariableEnum';
import type { IObjectData } from '../IObjectData';
import { ObjectDataBase } from '../ObjectDataBase';
import { ObjectDataFlagsEnum } from '../ObjectDataFlagsEnum';

export class NumberDataType extends ObjectDataBase {
    private static STATE = 0;

    private _data: number[] = [];

    public override parseWrapper(wrapper: IMessageDataWrapper): void {
        if (!wrapper) return;

        this._data = [];

        const totalNumbers = wrapper.readInt();

        if (totalNumbers) for (let i = 0; i < totalNumbers; i++) this._data.push(wrapper.readInt());

        super.parseWrapper(wrapper);
    }

    public override initializeFromRoomObjectModel(model: IRoomObjectModel): void {
        super.initializeFromRoomObjectModel(model);

        this._data = model.getValue<number[]>(RoomObjectVariableEnum.FurnitureData);
    }

    public override writeRoomObjectModel(model: IRoomObjectModel): void {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariableEnum.FurnitureDataFormat, ObjectDataFlagsEnum.Number);
        model.setValue(RoomObjectVariableEnum.FurnitureData, this._data);
    }

    public override getLegacyString(): string {
        if (!this._data?.length) return '';

        return this._data[NumberDataType.STATE].toString();
    }

    public override compare(data: IObjectData): boolean {
        if (!(data instanceof NumberDataType)) return false;

        let i = 0;

        while (i < this._data.length) {
            if (i === 0) {
                //
            } else if (this._data[i] !== data.getValue(i)) return false;

            i++;
        }

        return true;
    }

    public getValue(index: number): number {
        if (!this._data?.length) return -1;

        const value = this._data[index];

        if (value === undefined || value === null) return -1;

        return value;
    }
}
