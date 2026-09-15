import { AvatarActionStateType, AvatarActionType, AvatarGeometryType, AvatarPartSetType, AvatarScaleType, IActionDefinition, IAssetAvatarAction } from '@nitrodevco/nitro-api';

import { ActionType } from './ActionType';

export class ActionDefinition implements IActionDefinition {
    private _id: AvatarActionType;
    private _state: AvatarActionStateType;
    private _precedence: number;
    private _activePartSet: AvatarPartSetType | undefined;
    private _assetPartDefinition: string;
    private _lay: string | undefined;
    private _geometryType: AvatarGeometryType;
    private _isMain: boolean;
    private _isDefault: boolean;
    private _isAnimation: boolean;
    private _startFromFrameZero: boolean;
    private _prevents: AvatarActionStateType[];
    private _preventHeadTurn: boolean;
    // the Flash parameter is a string (an item / effect id, a dance name); the types are keyed by it
    private _types: Map<string, ActionType>;
    private _params: Map<string, string>;
    private _defaultParameterValue: string;
    private _canvasOffsets: Map<AvatarScaleType, Map<number, [number, number, number]>>;

    constructor(data: IAssetAvatarAction | undefined = undefined) {
        this._id = AvatarActionType.Default;
        this._state = AvatarActionStateType.None;
        this._precedence = 0;
        this._activePartSet = undefined;
        this._assetPartDefinition = '';
        this._lay = undefined;
        this._geometryType = AvatarGeometryType.Vertical;
        this._isMain = false;
        this._isDefault = false;
        this._isAnimation = false;
        this._startFromFrameZero = false;
        this._prevents = [];
        this._preventHeadTurn = false;
        this._types = new Map();
        this._params = new Map();
        this._defaultParameterValue = '';
        this._canvasOffsets = new Map();

        if (data) this.createFromData(data);
    }

    private createFromData(data: IAssetAvatarAction): void {
        this._id = data.id;
        this._state = data.state;
        this._precedence = data.precedence;
        this._activePartSet = data.activePartSet ?? undefined;
        this._assetPartDefinition = data.assetPartDefinition;
        this._lay = data.lay ?? undefined;
        this._geometryType = data.geometryType;
        this._isMain = data.main ?? false;
        this._isDefault = data.isDefault ?? false;
        this._isAnimation = data.animation ?? false;
        this._startFromFrameZero = data.startFromFrameZero ?? false;
        this._prevents = data.prevents as unknown as AvatarActionStateType[] ?? [];
        this._preventHeadTurn = data.preventHeadTurn ?? false;

        if (data.params && (data.params.length > 0)) {
            for (const param of data.params) {
                if (!param) continue;

                if (param.id === 'default') this._defaultParameterValue = param.value;
                else this._params.set(param.id, param.value);
            }
        }

        if (data.types && (data.types.length > 0)) {
            for (const type of data.types) {
                if (!type) continue;

                const action = new ActionType(type);

                this._types.set(action.id.toString(), action);
            }
        }
    }

    public getOffsets(size: AvatarScaleType, direction: number): [number, number, number] {
        return this._canvasOffsets.get(size)?.get(direction) ?? [ 0, 0, 0 ];
    }

    public setOffsets(size: AvatarScaleType, direction: number, offset: [number, number, number]): void {
        let existing = this._canvasOffsets.get(size);

        if (!existing) {
            existing = new Map();

            this._canvasOffsets.set(size, existing);
        }

        existing.set(direction, offset);
    }

    public getType(id: string): ActionType | undefined {
        return this._types.get(id);
    }

    /** An empty parameter stays empty; an unknown one falls back to the `default` param. */
    public getParameterValue(id: string): string {
        if (!id) return '';

        return this._params.get(id) ?? this._defaultParameterValue;
    }

    public getPrevents(parameter: string = ''): AvatarActionStateType[] {
        return this._prevents.concat(this.getTypePrevents(parameter));
    }

    private getTypePrevents(parameter: string): AvatarActionStateType[] {
        if (!parameter) return [];

        return this._types.get(parameter)?.prevents ?? [];
    }

    /** The type's flag when the parameter names one, otherwise the action's own. */
    public getPreventHeadTurn(parameter: string = ''): boolean {
        if (!parameter) return this._preventHeadTurn;

        return this._types.get(parameter)?.preventHeadTurn ?? this._preventHeadTurn;
    }

    public isAnimated(parameter: string = ''): boolean {
        if (!parameter) return true;

        return this._types.get(parameter)?.isAnimated ?? true;
    }

    public setGeometryType(type: AvatarGeometryType): void {
        this._geometryType = type;
    }

    public setState(state: AvatarActionStateType): void {
        this._state = state;
    }

    public setAssetPartDefinition(definition: string): void {
        this._assetPartDefinition = definition;
    }

    /** A shallow copy sharing types, params and offsets - what `AvatarActionManager.getDefaultLayAction` starts from. */
    public copy(): ActionDefinition {
        const definition = new ActionDefinition();

        definition._id = this._id;
        definition._state = this._state;
        definition._precedence = this._precedence;
        definition._activePartSet = this._activePartSet;
        definition._assetPartDefinition = this._assetPartDefinition;
        definition._lay = this._lay;
        definition._geometryType = this._geometryType;
        definition._isMain = this._isMain;
        definition._isDefault = this._isDefault;
        definition._isAnimation = this._isAnimation;
        definition._startFromFrameZero = this._startFromFrameZero;
        definition._prevents = this._prevents;
        definition._preventHeadTurn = this._preventHeadTurn;
        definition._canvasOffsets = this._canvasOffsets;
        definition._types = this._types;
        definition._params = this._params;
        definition._defaultParameterValue = this._defaultParameterValue;

        return definition;
    }

    public get id(): AvatarActionType {
        return this._id;
    }

    public get state(): AvatarActionStateType {
        return this._state;
    }

    public get precedence(): number {
        return this._precedence;
    }

    public get activePartSet(): AvatarPartSetType | undefined {
        return this._activePartSet;
    }

    public get assetPartDefinition(): string {
        return this._assetPartDefinition;
    }

    public get lay(): string | undefined {
        return this._lay;
    }

    public get geometryType(): AvatarGeometryType {
        return this._geometryType;
    }

    public get isMain(): boolean {
        return this._isMain;
    }

    public get isDefault(): boolean {
        return this._isDefault;
    }

    public get isAnimation(): boolean {
        return this._isAnimation;
    }

    public get startFromFrameZero(): boolean {
        return this._startFromFrameZero;
    }

    public get prevents(): AvatarActionStateType[] {
        return this._prevents;
    }

    public get preventHeadTurn(): boolean {
        return this._preventHeadTurn;
    }

    public get params(): Map<string, string> {
        return this._params;
    }
}
