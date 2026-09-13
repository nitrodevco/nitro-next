import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class RoomObjectVariableFxStatusUpdateMessage extends RoomObjectUpdateMessage {
    private _configId: number;
    private _variableId: string;
    private _value: number;
    private _overrideMinValue: number | undefined;
    private _overrideMaxValue: number | undefined;
    private _extra: Map<string, string>;
    private _initialize: boolean;

    constructor(configId: number, variableId: string, value: number, overrideMinValue: number | undefined, overrideMaxValue: number | undefined, extra: Map<string, string>, initialize: boolean) {
        super(undefined, undefined);

        this._configId = configId;
        this._variableId = variableId;
        this._value = value;
        this._overrideMinValue = overrideMinValue;
        this._overrideMaxValue = overrideMaxValue;
        this._extra = extra;
        this._initialize = initialize;
    }

    public get configId(): number {
        return this._configId;
    }

    public get variableId(): string {
        return this._variableId;
    }

    public get value(): number {
        return this._value;
    }

    public get overrideMinValue(): number | undefined {
        return this._overrideMinValue;
    }

    public get overrideMaxValue(): number | undefined {
        return this._overrideMaxValue;
    }

    public get extra(): Map<string, string> {
        return this._extra;
    }

    public get initialize(): boolean {
        return this._initialize;
    }
}
