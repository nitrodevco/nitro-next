import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class RoomObjectVariableFxStatusRemoveMessage extends RoomObjectUpdateMessage {
    private _configId: number;
    private _variableId: string;

    constructor(configId: number, variableId: string) {
        super(undefined, undefined);

        this._configId = configId;
        this._variableId = variableId;
    }

    public get configId(): number {
        return this._configId;
    }

    public get variableId(): string {
        return this._variableId;
    }
}
