import type { IActionDefinition, IAssetAvatarAction } from '@nitrodevco/nitro-api';

import { ActionType } from './ActionType';

export class ActionDefinition implements IActionDefinition {
    private _id: string;
    private _state: string;
    private _precedence: number;
    private _activePartSet: string | undefined;
    private _assetPartDefinition: string;
    private _lay: string | undefined;
    private _geometryType: string;
    private _isMain: boolean;
    private _isDefault: boolean;
    private _isAnimation: boolean;
    private _startFromFrameZero: boolean;
    private _prevents: string[];
    private _preventHeadTurn: boolean;
    private _types: Map<number, ActionType>;
    private _params: Map<string, string>;
    private _defaultParameterValue: string;
    private _canvasOffsets: Map<string, Map<number, [number, number, number]>>;

    constructor(data: IAssetAvatarAction) {
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
        this._prevents = data.prevents ?? [];
        this._preventHeadTurn = data.preventHeadTurn ?? false;
        this._types = new Map();
        this._params = new Map();
        this._defaultParameterValue = '';
        this._canvasOffsets = new Map();

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

                this._types.set(action.id, action);
            }
        }
    }

    public getOffsets(size: string, direction: number): [number, number, number] {
        return this._canvasOffsets.get(size)?.get(direction) ?? [0, 0, 0];
    }

    public setOffsets(size: string, direction: number, offset: [number, number, number]): void {
        let existing = this._canvasOffsets.get(size);

        if (!existing) {
            existing = new Map();

            this._canvasOffsets.set(size, existing);
        }

        existing.set(direction, offset);
    }

    public getType(id: number): ActionType | undefined {
        return this._types.get(id);
    }

    public getParameterValue(id: string): string {
        return this._params.get(id) ?? this._defaultParameterValue;
    }

    public getPrevents(typeId: number): string[] {
        return this._prevents.concat(this.getTypePrevents(typeId));
    }

    private getTypePrevents(typeId: number): string[] {
        return this._types.get(typeId)?.prevents ?? [];
    }

    public getPreventHeadTurn(typeId: number): boolean {
        return this._types.get(typeId)?.preventHeadTurn ?? false;
    }

    public isAnimated(typeId: number): boolean {
        const type = this._types.get(typeId);

        if (type === undefined) return true;

        return type.isAnimated ?? false;
    }

    public get id(): string {
        return this._id;
    }

    public get state(): string {
        return this._state;
    }

    public get precedence(): number {
        return this._precedence;
    }

    public get activePartSet(): string | undefined {
        return this._activePartSet;
    }

    public get assetPartDefinition(): string {
        return this._assetPartDefinition;
    }

    public get lay(): string | undefined {
        return this._lay;
    }

    public get geometryType(): string {
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

    public get prevents(): string[] {
        return this._prevents;
    }

    public get preventHeadTurn(): boolean {
        return this._preventHeadTurn;
    }

    public get params(): Map<string, string> {
        return this._params;
    }
}
