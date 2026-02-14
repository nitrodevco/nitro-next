import type { IMessageDataWrapper } from '../../../../communication';
import type { IRoomObjectModel } from '../../IRoomObjectModel';
import { RoomObjectVariableEnum } from '../../RoomObjectVariableEnum';
import type { IObjectData } from '../IObjectData';
import { ObjectDataBase } from '../ObjectDataBase';
import { ObjectDataFlagsEnum } from '../ObjectDataFlagsEnum';

export class EmptyDataType extends ObjectDataBase implements IObjectData {
    private _state = '';

    public parseWrapper(wrapper: IMessageDataWrapper): void {
        this._state = '';

        super.parseWrapper(wrapper);
    }

    public writeRoomObjectModel(model: IRoomObjectModel): void {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariableEnum.FurnitureDataFormat, ObjectDataFlagsEnum.Empty);
    }

    public getLegacyString(): string {
        return this._state;
    }

    public compare(data: IObjectData): boolean {
        return super.compare(data);
    }
}
