import type { IFigureData, IFigurePartSet, IFigureSetData, IPalette, ISetType, IStructureData } from '@nitrodevco/nitro-api';

import { Palette, SetType } from './figure';

export class FigureSetData implements IFigureSetData, IStructureData {
    private _palettes: Map<number, Palette>;
    private _setTypes: Map<string, SetType>;

    constructor() {
        this._palettes = new Map();
        this._setTypes = new Map();
    }

    public dispose(): void {

    }

    public parse(data: IFigureData): boolean {
        if (!data) return false;

        if (data.palettes) {
            for (const palette of data.palettes) {
                const newPalette = new Palette(palette);

                if (!newPalette) continue;

                this._palettes.set(newPalette.id, newPalette);
            }
        }

        if (data.setTypes) {
            for (const set of data.setTypes) {
                const newSet = new SetType(set);

                if (!newSet) continue;

                this._setTypes.set(newSet.type, newSet);
            }
        }

        return true;
    }

    public injectJSON(data: IFigureData): void {
        if (data.setTypes) {
            for (const setType of data.setTypes) {
                if (!setType || !setType.type) continue;

                const existingSetType = this._setTypes.get(setType.type);

                if (existingSetType) existingSetType.cleanUp(setType);
                else this._setTypes.set(setType.type, new SetType(setType));
            }
        }

        this.appendJSON(data);
    }

    public appendJSON(data: IFigureData): boolean {
        if (!data) return false;

        if (data.palettes) {
            for (const palette of data.palettes) {
                const existingPalette = this._palettes.get(palette.id);

                if (!existingPalette) this._palettes.set(palette.id, new Palette(palette));
                else existingPalette.append(palette);
            }
        }

        if (data.setTypes) {
            for (const setType of data.setTypes) {
                if (!setType || !setType.type) continue;

                const existingSetType = this._setTypes.get(setType.type);

                if (!existingSetType) this._setTypes.set(setType.type, new SetType(setType));
                else existingSetType.append(setType);
            }
        }

        return false;
    }

    public getMandatorySetTypeIds(gender: string, _arg_2: number): string[] {
        const types: string[] = [];

        for (const set of this._setTypes.values()) {
            if (!set || !set.isMandatory(gender, _arg_2)) continue;

            types.push(set.type);
        }

        return types;
    }

    public getDefaultPartSet(type: string, gender: string): IFigurePartSet | undefined {
        return this._setTypes.get(type)?.getDefaultPartSet(gender);
    }

    public getSetType(type: string): ISetType | undefined {
        return this._setTypes.get(type);
    }

    public getPalette(paletteId: number): IPalette | undefined {
        return this._palettes.get(paletteId);
    }

    public getFigurePartSet(id: number): IFigurePartSet | undefined {
        for (const set of this._setTypes.values()) {
            const partSet = set.getPartSet(id);

            if (!partSet) continue;

            return partSet;
        }

        return undefined;
    }
}
