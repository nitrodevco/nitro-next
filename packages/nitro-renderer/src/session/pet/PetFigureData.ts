import type { IPetCustomPart } from '@nitrodevco/nitro-api';

import { PetCustomPart } from './PetCustomPart';

export class PetFigureData {
    private _typeId: number;
    private _paletteId: number;
    private _color: number;
    private _headOnly: boolean;

    private _customParts: IPetCustomPart[] = [];
    private _customLayerIds: number[];
    private _customPartIds: number[];
    private _customPaletteIds: number[];

    constructor(figure: string) {
        this._typeId = this.getTypeId(figure);
        this._paletteId = this.getPaletteId(figure);
        this._color = this.getColor(figure);
        this._headOnly = this.getHeadOnly(figure);

        const parts = this.getCustomData(figure);

        this._customLayerIds = this.getCustomLayerIds(parts);
        this._customPartIds = this.getCustomPartIds(parts);
        this._customPaletteIds = this.getCustomPaletteIds(parts);

        let i = 0;

        while (i < this._customLayerIds.length) {
            this._customParts.push(
                new PetCustomPart(this._customLayerIds[i], this._customPartIds[i], this._customPaletteIds[i]),
            );

            i++;
        }
    }

    public get typeId(): number {
        return this._typeId;
    }

    public get paletteId(): number {
        return this._paletteId;
    }

    public get color(): number {
        return this._color;
    }

    public get customLayerIds(): number[] {
        return this._customLayerIds;
    }

    public get customPartIds(): number[] {
        return this._customPartIds;
    }

    public get customPaletteIds(): number[] {
        return this._customPaletteIds;
    }

    public get customParts(): IPetCustomPart[] {
        return this._customParts;
    }

    public getCustomPart(layerId: number): IPetCustomPart | undefined {
        if (this._customParts) {
            for (const part of this._customParts) {
                if (part.layerId === layerId) return part;
            }
        }

        return undefined;
    }

    public get hasCustomParts(): boolean {
        return !(this._customLayerIds == null) && this._customLayerIds.length > 0;
    }

    public get headOnly(): boolean {
        return this._headOnly;
    }

    public get figureString(): string {
        let figure = this.typeId + ' ' + this.paletteId + ' ' + this.color.toString(16);

        figure = figure + (' ' + this.customParts.length);

        for (const part of this.customParts) {
            figure = figure + (' ' + part.layerId + ' ' + part.partId + ' ' + part.paletteId);
        }

        return figure;
    }

    private getCustomData(figure: string): string[] {
        let data: string[] = [];

        if (figure && figure.length > 0) {
            const parts = figure.split(' ');
            const headOnly = this._headOnly ? 1 : 0;
            const size = 4 + headOnly;

            if (parts.length > size) data = parts.slice(size, size + parseInt(parts[3 + headOnly]) * 3);
        }

        return data;
    }

    private getCustomLayerIds(data: string[]): number[] {
        const layerIds: number[] = [];

        let i = 0;

        while (i < data.length) {
            layerIds.push(parseInt(data[i + 0]));

            i = i + 3;
        }

        return layerIds;
    }

    private getCustomPartIds(data: string[]): number[] {
        const partIds: number[] = [];

        let i = 0;

        while (i < data.length) {
            partIds.push(parseInt(data[i + 1]));

            i = i + 3;
        }

        return partIds;
    }

    private getCustomPaletteIds(data: string[]): number[] {
        const paletteIds: number[] = [];

        let i = 0;

        while (i < data.length) {
            paletteIds.push(parseInt(data[i + 2]));

            i = i + 3;
        }

        return paletteIds;
    }

    private getTypeId(data: string): number {
        if (data) {
            const parts = data.split(' ');

            if (parts.length >= 1) return parseInt(parts[0]);
        }

        return 0;
    }

    private getPaletteId(data: string): number {
        if (data) {
            const parts = data.split(' ');

            if (parts.length >= 2) return parseInt(parts[1]);
        }

        return 0;
    }

    private getColor(data: string): number {
        if (data) {
            const parts = data.split(' ');

            if (parts.length >= 3) return parseInt(parts[2], 16);
        }

        return 0xffffff;
    }

    private getHeadOnly(data: string): boolean {
        if (data) {
            const parts = data.split(' ');

            if (parts.length >= 4) return parts[3] === 'head';
        }

        return false;
    }
}
