import type { IMessageDataWrapper } from '#api/communication';

import type { IRoomObjectModel } from '../../IRoomObjectModel';
import { RoomObjectVariableEnum } from '../../RoomObjectVariableEnum';
import type { IObjectData } from '../IObjectData';
import { ObjectDataBase } from '../ObjectDataBase';
import { ObjectDataFlagsEnum } from '../ObjectDataFlagsEnum';

export class VoteDataType extends ObjectDataBase {
    private _state = '';
    private _result = 0;

    public override parseWrapper(wrapper: IMessageDataWrapper): void {
        if (!wrapper) return;

        this._state = wrapper.readString();
        this._result = wrapper.readInt();

        super.parseWrapper(wrapper);
    }

    public override writeRoomObjectModel(model: IRoomObjectModel): void {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariableEnum.FurnitureDataFormat, ObjectDataFlagsEnum.Vote);

        const data: Record<string, string> = {};

        data.S = this._state;
        data.R = this._result.toString();

        model.setValue(RoomObjectVariableEnum.FurnitureData, data);
    }

    public override getLegacyString(): string {
        return this._state;
    }

    public override compare(data: IObjectData): boolean {
        return true;
    }

    public setString(state: string): void {
        this._state = state;
    }

    public get result(): number {
        return this._result;
    }
}
