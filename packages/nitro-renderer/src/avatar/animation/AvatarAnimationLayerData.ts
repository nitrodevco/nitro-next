
import type { IActionDefinition, IActiveActionData, IAnimationLayerData, IAssetAnimationFramePart } from '@nitrodevco/nitro-api';

import { ActiveActionData } from '../actions';

export class AvatarAnimationLayerData implements IAnimationLayerData {
    public static BODYPART: string = 'bodypart';
    public static FX: string = 'fx';

    private _id: string;
    private _action: IActiveActionData;
    private _animationFrame: number;
    private _dx: number;
    private _dy: number;
    private _dz: number;
    private _directionOffset: number;
    private _type: string;
    private _base: number;
    private _items: Map<string, string>;

    constructor(part: IAssetAnimationFramePart, type: string, definition: IActionDefinition | undefined) {
        this._id = part.id;
        this._animationFrame = part.frame ?? 0;
        this._dx = part.dx ?? 0;
        this._dy = part.dy ?? 0;
        this._dz = part.dz ?? 0;
        this._directionOffset = part.dd ?? 0;
        this._type = type;
        this._base = parseInt(part.base ?? '');
        this._items = new Map();

        if (part.items) {
            for (const item of part.items) {
                if (!item || !item.id || !item.base) continue;

                this._items.set(item.id, item.base);
            }
        }

        if (definition) {
            this._action = new ActiveActionData(definition.state, this._base);
            this._action.definition = definition;
        }
    }

    public get items(): Map<string, string> {
        return this._items;
    }

    public get id(): string {
        return this._id;
    }

    public get animationFrame(): number {
        return this._animationFrame;
    }

    public get dx(): number {
        return this._dx;
    }

    public get dy(): number {
        return this._dy;
    }

    public get dz(): number {
        return this._dz;
    }

    public get dd(): number {
        return this._directionOffset;
    }

    public get type(): string {
        return this._type;
    }

    public get base(): number {
        return this._base;
    }

    public get action(): IActiveActionData {
        return this._action;
    }
}
