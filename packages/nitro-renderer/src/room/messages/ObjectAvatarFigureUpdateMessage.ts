import { ObjectStateUpdateMessage } from './ObjectStateUpdateMessage';

export class ObjectAvatarFigureUpdateMessage extends ObjectStateUpdateMessage {
    private _figure: string;
    private _gender: string | undefined;
    private _subType: string | undefined;
    private _isRiding: boolean;

    constructor(figure: string, gender?: string, subType?: string, isRiding?: boolean) {
        super();

        this._figure = figure;
        this._gender = gender;
        this._subType = subType;
        this._isRiding = isRiding ?? false;
    }

    public get figure(): string {
        return this._figure;
    }

    public get gender(): string | undefined {
        return this._gender;
    }

    public get subType(): string | undefined {
        return this._subType;
    }

    public get isRiding(): boolean {
        return this._isRiding;
    }
}
