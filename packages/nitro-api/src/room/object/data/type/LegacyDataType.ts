import type { IMessageDataWrapper } from '../../../../communication';
import type { IRoomObjectModel } from '../../IRoomObjectModel';
import { RoomObjectVariableEnum } from '../../RoomObjectVariableEnum';
import type { IObjectData } from '../IObjectData';
import { ObjectDataBase } from '../ObjectDataBase';
import { ObjectDataFlagsEnum } from '../ObjectDataFlagsEnum';

export class LegacyDataType extends ObjectDataBase implements IObjectData {
    private _data = '';

    public override parseWrapper(wrapper: IMessageDataWrapper): void {
        this._data = wrapper.readString();

        super.parseWrapper(wrapper);
    }

    public override initializeFromRoomObjectModel(model: IRoomObjectModel): void {
        super.initializeFromRoomObjectModel(model);

        this._data = model.getValue<string>(RoomObjectVariableEnum.FurnitureData);
    }

    public override writeRoomObjectModel(model: IRoomObjectModel): void {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariableEnum.FurnitureDataFormat, ObjectDataFlagsEnum.Legacy);
        model.setValue(RoomObjectVariableEnum.FurnitureData, this._data);
    }

    public override getLegacyString(): string {
        return this._data;
    }

    public override compare(data: IObjectData): boolean {
        return this._data === data.getLegacyString();
    }

    public setString(data: string): void {
        this._data = data;
    }
}
