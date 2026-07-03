import type { IActionDefinition, IActiveActionData } from "@nitrodevco/nitro-api";

export class ActiveActionData implements IActiveActionData {
    private _type: string;
    private _parameter: number;
    private _definition: IActionDefinition | undefined = undefined;
    private _startFrame: number;
    private _overridingAction: string;

    constructor(type: string, parameter: number = 1, startFrame: number = 0) {
        this._type = type ?? '';
        this._parameter = parameter ?? 1;
        this._startFrame = startFrame ?? 0;
        this._overridingAction = '';
    }

    public dispose(): void {
        this._type = '';
        this._parameter = 1;
        this._definition = undefined;
    }

    public get id(): string {
        if (!this._definition) return '';

        return this._definition.id + '_' + this._parameter;
    }

    public get actionType(): string {
        return this._type;
    }

    public get actionParameter(): number {
        return this._parameter;
    }

    public set actionParameter(parameter: number) {
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

    public get overridingAction(): string {
        return this._overridingAction;
    }

    public set overridingAction(action: string) {
        this._overridingAction = action;
    }
}
