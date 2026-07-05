
import type { AvatarFigurePartType, IFigureDataSet, IFigurePart, IFigurePartSet } from '@nitrodevco/nitro-api';
import { AvatarGenderType } from '@nitrodevco/nitro-api';

import { FigurePart } from './FigurePart';

export class FigurePartSet implements IFigurePartSet {
    private _id: number;
    private _type: AvatarFigurePartType;
    private _gender: AvatarGenderType;
    private _clubLevel: number;
    private _isColorable: boolean;
    private _isSelectable: boolean;
    private _parts: IFigurePart[];
    private _hiddenLayers: string[];
    private _isPreSelectable: boolean;
    private _isSellable: boolean;

    constructor(type: AvatarFigurePartType, data: IFigureDataSet) {
        this._id = data.id;
        this._type = type;
        this._gender = data.gender ?? AvatarGenderType.Unisex;
        this._clubLevel = data.club ?? 0;
        this._isColorable = data.colorable ?? false;
        this._isSelectable = data.selectable ?? false;
        this._parts = [];
        this._hiddenLayers = [];
        this._isPreSelectable = data.preselectable ?? false;
        this._isSellable = data.sellable ?? false;

        if (data.parts) {
            for (const part of data.parts) {
                const newPart = new FigurePart(part);
                const partIndex = this.getPartIndex(newPart);

                if (partIndex !== -1) this._parts.splice(partIndex, 0, newPart);
                else this._parts.push(newPart);
            }
        }

        if (data.hiddenLayers) {
            for (const hiddenLayer of data.hiddenLayers) {
                if (!hiddenLayer || !hiddenLayer.partType) continue;

                this._hiddenLayers.push(hiddenLayer.partType);
            }
        }
    }

    public dispose(): void {
        for (const part of this._parts) {
            const figurePart = part as FigurePart;

            figurePart.dispose();
        }

        this._parts = [];
        this._hiddenLayers = [];
    }

    public getPart(type: AvatarFigurePartType, id: number): IFigurePart | undefined {
        for (const part of this._parts) {
            if ((part.type !== type) || (part.id !== id)) continue;

            return part;
        }

        return undefined;
    }

    public get id(): number {
        return this._id;
    }

    public get type(): AvatarFigurePartType {
        return this._type;
    }

    public get gender(): AvatarGenderType {
        return this._gender;
    }

    public get clubLevel(): number {
        return this._clubLevel;
    }

    public get isColorable(): boolean {
        return this._isColorable;
    }

    public get isSelectable(): boolean {
        return this._isSelectable;
    }

    public get parts(): IFigurePart[] {
        return this._parts;
    }

    public get hiddenLayers(): string[] {
        return this._hiddenLayers;
    }

    public get isPreSelectable(): boolean {
        return this._isPreSelectable;
    }

    public get isSellable(): boolean {
        return this._isSellable;
    }

    private getPartIndex(part: FigurePart): number {
        const totalParts = this._parts.length;

        if (!totalParts) return -1;

        for (let i = 0; i < totalParts; i++) {
            const existingPart = this._parts[i];

            if (!existingPart) continue;

            if (existingPart.type !== part.type || existingPart.index > part.index) continue;

            return i;
        }

        return -1;
    }
}
