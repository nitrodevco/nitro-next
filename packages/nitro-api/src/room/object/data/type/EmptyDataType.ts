import type { IMessageDataWrapper } from '../../../../communication';
import type { IRoomObjectModel } from '../../IRoomObjectModel';
import { RoomObjectVariableEnum } from '../../RoomObjectVariableEnum';
import type { IObjectData } from '../IObjectData';
import { ObjectDataBase } from '../ObjectDataBase';
import { ObjectDataFlagsEnum } from '../ObjectDataFlagsEnum';

export class EmptyDataType extends ObjectDataBase implements IObjectData {
    private _state = '';

    public override parseWrapper(wrapper: IMessageDataWrapper): void {
        this._state = '';

        super.parseWrapper(wrapper);
    }

    public override writeRoomObjectModel(model: IRoomObjectModel): void {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariableEnum.FurnitureDataFormat, ObjectDataFlagsEnum.Empty);
    }

    public override getLegacyString(): string {
        return this._state;
    }

    public override compare(data: IObjectData): boolean {
        return super.compare(data);
    }
}
