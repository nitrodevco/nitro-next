import { AvatarActionStateType, IActionDefinition, IActiveActionData } from '@nitrodevco/nitro-api';

export class ActiveActionData implements IActiveActionData {
    private _type: AvatarActionStateType;
    private _parameter: string;
    private _definition: IActionDefinition | undefined = undefined;
    private _startFrame: number;
    private _overridingAction: string | undefined;

    constructor(type: AvatarActionStateType, parameter: string = '', startFrame: number = 0) {
        this._type = type;
        this._parameter = parameter;
        this._startFrame = startFrame;
        this._overridingAction = undefined;
    }

    public dispose(): void {
    }

    public get id(): string {
        if (!this._definition) return '';

        return `${this._definition.id}_${this._parameter}`;
    }

    public get type(): AvatarActionStateType {
        return this._type;
    }

    public get actionParameter(): string {
        return this._parameter;
    }

    public set actionParameter(parameter: string) {
        this._parameter = parameter;
    }

    public get definition(): IActionDefinition | undefined {
        return this._definition;
    }

    public set definition(definition: IActionDefinition | undefined) {
        this._definition = definition;
    }

    public get startFrame(): number {
        return this._startFrame;
    }

    public get overridingAction(): string | undefined {
        return this._overridingAction;
    }

    public set overridingAction(action: string | undefined) {
        this._overridingAction = action;
    }

    public toString(): string {
        return `Action: ${this._type}  param: ${this._parameter}`;
    }
}
