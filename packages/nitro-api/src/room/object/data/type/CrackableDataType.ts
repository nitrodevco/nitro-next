import type { IMessageDataWrapper } from '#api/communication';

import type { IRoomObjectModel } from '../../IRoomObjectModel';
import { RoomObjectVariableEnum } from '../../RoomObjectVariableEnum';
import type { IObjectData } from '../IObjectData';
import { ObjectDataBase } from '../ObjectDataBase';
import { ObjectDataFlagsEnum } from '../ObjectDataFlagsEnum';

export class CrackableDataType extends ObjectDataBase implements IObjectData {
    private _state = '';
    private _hits = 0;
    private _target = 0;

    public override parseWrapper(wrapper: IMessageDataWrapper): void {
        this._state = wrapper.readString();
        this._hits = wrapper.readInt();
        this._target = wrapper.readInt();

        super.parseWrapper(wrapper);
    }

    public override initializeFromRoomObjectModel(model: IRoomObjectModel): void {
        super.initializeFromRoomObjectModel(model);

        this._state = model.getValue<string>(RoomObjectVariableEnum.FurnitureCrackableState);
        this._hits = model.getValue<number>(RoomObjectVariableEnum.FurnitureCrackableHits);
        this._target = model.getValue<number>(RoomObjectVariableEnum.FurnitureCrackableTarget);
    }

    public override writeRoomObjectModel(model: IRoomObjectModel): void {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariableEnum.FurnitureDataFormat, ObjectDataFlagsEnum.Crackable);
        model.setValue(RoomObjectVariableEnum.FurnitureCrackableState, this._state);
        model.setValue(RoomObjectVariableEnum.FurnitureCrackableHits, this._hits);
        model.setValue(RoomObjectVariableEnum.FurnitureCrackableTarget, this._target);
    }

    public override getLegacyString(): string {
        return this._state;
    }

    public override compare(data: IObjectData): boolean {
        return true;
    }

    public get hits(): number {
        return this._hits;
    }

    public get target(): number {
        return this._target;
    }
}
