import type { IActionDefinition, IPartColor } from '@nitrodevco/nitro-api';
import { AvatarFigurePartType } from '@nitrodevco/nitro-api';
import type { AdjustmentFilter } from 'pixi-filters';

import { AvatarAnimationFrame } from './structure';

export class AvatarImagePartContainer {
    private _bodyPartId: string;
    private _partType: AvatarFigurePartType;
    private _flippedPartType: AvatarFigurePartType;
    private _partId: number;
    private _color: IPartColor;
    private _frames: AvatarAnimationFrame[];
    private _action: IActionDefinition;
    private _isColorable: boolean;
    private _isBlendable: boolean;
    private _blendTransform: AdjustmentFilter | undefined;
    private _paletteMapId: number;

    constructor(bodyPartId: string, partType: AvatarFigurePartType, partId: number, partColor: IPartColor, frames: AvatarAnimationFrame[], action: IActionDefinition, isColorable: boolean, paletteMapId: number, flippedPartType: AvatarFigurePartType = AvatarFigurePartType.None, isBlendable: boolean = false, _arg_11: number = 1) {
        this._bodyPartId = bodyPartId;
        this._partType = partType;
        this._partId = partId;
        this._color = partColor;
        this._frames = frames;
        this._action = action;
        this._isColorable = isColorable;
        this._paletteMapId = paletteMapId;
        this._flippedPartType = flippedPartType;
        this._isBlendable = isBlendable;
        this._blendTransform = undefined;

        if (this._partType === AvatarFigurePartType.Eyes) this._isColorable = false;
    }

    public getFrameIndex(frame: number): number {
        if (!this._frames || !this._frames.length) return 0;

        const frameNumber = (frame % this._frames.length);

        if (this._frames[frameNumber] instanceof AvatarAnimationFrame) {
            return this._frames[frameNumber].number;
        }

        return frameNumber;
    }

    public getFrameDefinition(k: number): AvatarAnimationFrame | undefined {
        const frameNumber = (k % this._frames.length);

        if (this._frames && (this._frames.length > frameNumber)) {
            if (this._frames[frameNumber] instanceof AvatarAnimationFrame) {
                return this._frames[frameNumber];
            }
        }

        return undefined;
    }

    public getCacheableKey(frame: number): string {
        const frameNumber = (frame % this._frames.length);

        if (this._frames && (this._frames.length > frameNumber)) {
            if (this._frames[frameNumber] instanceof AvatarAnimationFrame) {
                const frame = this._frames[frameNumber];

                return (this.partId + ':' + frame.assetPartDefinition + ':' + frame.number);
            }
        }

        return (this.partId + ':' + frameNumber);
    }

    public get bodyPartId(): string {
        return this._bodyPartId;
    }

    public get partType(): AvatarFigurePartType {
        return this._partType;
    }

    public get partId(): number {
        return this._partId;
    }

    public get color(): IPartColor {
        return this._color;
    }

    public get action(): IActionDefinition {
        return this._action;
    }

    public get isColorable(): boolean {
        return this._isColorable;
    }

    public set isColorable(k: boolean) {
        this._isColorable = k;
    }

    public get paletteMapId(): number {
        return this._paletteMapId;
    }

    public get flippedPartType(): AvatarFigurePartType {
        return this._flippedPartType;
    }

    public get isBlendable(): boolean {
        return this._isBlendable;
    }

    public toString(): string {
        return [this._bodyPartId, this._partType, this._partId].join(':');
    }
}
