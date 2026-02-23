import type { IMessageDataWrapper } from '../../../../communication';
import type { IRoomObjectModel } from '../../IRoomObjectModel';
import { RoomObjectVariableEnum } from '../../RoomObjectVariableEnum';
import type { IObjectData } from '../IObjectData';
import { ObjectDataBase } from '../ObjectDataBase';
import { ObjectDataFlagsEnum } from '../ObjectDataFlagsEnum';

export class StringDataType extends ObjectDataBase {
    private static readonly State: number = 0;

    private _data: string[] = [];

    public override parseWrapper(wrapper: IMessageDataWrapper): void {
        if (!wrapper) return;

        this._data = [];

        const totalStrings = wrapper.readInt();

        if (totalStrings) for (let i = 0; i < totalStrings; i++) this._data.push(wrapper.readString());

        super.parseWrapper(wrapper);
    }

    public override initializeFromRoomObjectModel(model: IRoomObjectModel): void {
        super.initializeFromRoomObjectModel(model);

        this._data = model.getValue<string[]>(RoomObjectVariableEnum.FurnitureData);
    }

    public override writeRoomObjectModel(model: IRoomObjectModel): void {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariableEnum.FurnitureDataFormat, ObjectDataFlagsEnum.String);
        model.setValue(RoomObjectVariableEnum.FurnitureData, this._data);
    }

    public override getLegacyString(): string {
        if (!this._data?.length) return '';

        return this._data[StringDataType.State];
    }

    public override compare(data: IObjectData): boolean {
        if (!(data instanceof StringDataType)) return false;

        let i = 0;

        while (i < this._data.length) {
            if (i === 0) {
                //
            } else if (this._data[i] !== data.getValue(i)) return false;

            i++;
        }

        return true;
    }

    public getValue(index: number): string {
        return this._data[index] || '';
    }

    public setValue(data: string[]): void {
        this._data = data;
    }
}
