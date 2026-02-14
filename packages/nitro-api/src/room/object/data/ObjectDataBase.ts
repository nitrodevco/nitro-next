import type { IMessageDataWrapper } from '../../../communication';
import type { IRoomObjectModel } from '../IRoomObjectModel';
import { RoomObjectVariableEnum } from '../RoomObjectVariableEnum';
import type { IObjectData } from './IObjectData';
import { ObjectDataFlagsEnum } from './ObjectDataFlagsEnum';

export class ObjectDataBase implements IObjectData {
    private _flags: ObjectDataFlagsEnum;
    private _uniqueNumber: number;
    private _uniqueSeries: number;

    constructor() {
        this._flags = 0;
        this._uniqueNumber = 0;
        this._uniqueSeries = 0;
    }

    public parseWrapper(wrapper: IMessageDataWrapper): void {
        if ((this._flags & ObjectDataFlagsEnum.UniqueSet) > 0) {
            this._uniqueNumber = wrapper.readInt();
            this._uniqueSeries = wrapper.readInt();
        }
    }

    public initializeFromRoomObjectModel(model: IRoomObjectModel): void {
        this._uniqueNumber = model.getValue<number>(RoomObjectVariableEnum.FurnitureUniqueSerialNumber);
        this._uniqueSeries = model.getValue<number>(RoomObjectVariableEnum.FurnitureUniqueEditionSize);
    }

    public writeRoomObjectModel(model: IRoomObjectModel): void {
        if (!model) return;

        model.setValue(RoomObjectVariableEnum.FurnitureUniqueSerialNumber, this._uniqueNumber);
        model.setValue(RoomObjectVariableEnum.FurnitureUniqueEditionSize, this._uniqueSeries);
    }

    public getLegacyString(): string {
        return '';
    }

    public compare(data: IObjectData): boolean {
        return false;
    }

    public get state(): number {
        const state = parseInt(this.getLegacyString());

        return isNaN(state) ? 0 : state;
    }

    public get isUnique(): boolean {
        return this._uniqueSeries > 0;
    }

    public get uniqueNumber(): number {
        return this._uniqueNumber;
    }

    public set uniqueNumber(number: number) {
        this._uniqueNumber = number;
    }

    public get uniqueSeries(): number {
        return this._uniqueSeries;
    }

    public set uniqueSeries(series: number) {
        this._uniqueSeries = series;
    }

    public get rarityLevel(): number {
        return -1;
    }

    public get flags(): ObjectDataFlagsEnum {
        return this._flags;
    }

    public set flags(flags: ObjectDataFlagsEnum) {
        this._flags = flags;
    }
}
