import type { AvatarGenderType } from "@nitrodevco/nitro-api";
import { AvatarFigurePartType } from "@nitrodevco/nitro-api";

export class FigureDataContainer {
    private static BLOCKED_FX_TYPES: number[] = [28, 29, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 68];

    private _gender: AvatarGenderType;
    private _data: Map<string, number> = new Map();
    private _colors: Map<string, number[]> = new Map();

    public loadAvatarData(figure: string, gender: AvatarGenderType): void {
        this._gender = gender;

        this._data.clear();
        this._colors.clear();

        this.parseFigureString(figure);
    }

    public hasSetType(k: string): boolean {
        return !!this._data.get(k);
    }

    public getPartSetId(k: string): number {
        if (this.hasSetType(k)) return this._data.get(k) ?? -1;

        return -1;
    }

    public getColorIds(k: string): number[] {
        if (this._colors.get(k)) return this._colors.get(k) ?? [];

        return [];
    }

    public getFigureString(): string {
        let figure = '';

        const sets: string[] = [];

        for (const [key, value] of this._data.entries()) {
            let set = ((key + '-') + value);

            const colors = this._colors.get(key);

            if (colors) for (const color of colors) set = (set + ('-' + color));

            sets.push(set);
        }

        let i = 0;

        while (i < sets.length) {
            figure = (figure + sets[i]);

            if (i < (sets.length - 1)) figure = (figure + '.');

            i++;
        }

        return figure;
    }

    public getFigureStringWithFace(k: number): string {
        const partSets: AvatarFigurePartType[] = [AvatarFigurePartType.Head];

        let figure = '';
        const sets: string[] = [];

        for (const part of partSets) {
            const colors = this._colors.get(part);

            if (!colors) continue;

            let setId = this._data.get(part);

            if (setId === undefined) continue;

            if (part === AvatarFigurePartType.Head) setId = k;

            let set = `${part}=${setId}`;

            if (setId >= 0) for (const color of colors) set = `${set}-${color}`;

            sets.push(set);
        }

        let i = 0;

        while (i < sets.length) {
            figure = figure + sets[i];

            if (i < (sets.length - 1)) figure = `${figure}.`;

            i++;
        }

        return figure;
    }

    public savePartData(partType: AvatarFigurePartType, setId: number, colorIds: number[]): void {
        this.savePartSetId(partType, setId);
        this.savePartSetColorId(partType, colorIds);
    }

    public get gender(): string {
        return this._gender;
    }

    private parseFigureString(figure: string): void {
        if (!figure) return;

        for (const part of figure.split('.')) {
            const pieces = part.split('-');

            if (pieces.length > 0) {
                const type = pieces[0] as AvatarFigurePartType;
                const setId = parseInt(pieces[1]);
                const colorIds: number[] = [];

                let i = 2;

                while (i < pieces.length) {
                    colorIds.push(parseInt(pieces[i]));

                    i++;
                }

                if (!colorIds.length) colorIds.push(0);

                this.savePartSetId(type, setId);
                this.savePartSetColorId(type, colorIds);
            }
        }
    }

    private savePartSetId(partType: AvatarFigurePartType, setId: number): void {
        switch (partType) {
            case AvatarFigurePartType.Head:
            case AvatarFigurePartType.Hair:
            case AvatarFigurePartType.HeadAccessory:
            case AvatarFigurePartType.HeadAccessoryExtra:
            case AvatarFigurePartType.EyeAccessory:
            case AvatarFigurePartType.FaceAccessory:
            case AvatarFigurePartType.Chest:
            case AvatarFigurePartType.CoatChest:
            case AvatarFigurePartType.ChestAccessory:
            case AvatarFigurePartType.ChestPrint:
            case AvatarFigurePartType.Legs:
            case AvatarFigurePartType.Shoes:
            case AvatarFigurePartType.WaistAccessory:
                if (setId >= 0) {
                    this._data.set(partType, setId);
                } else {
                    this._data.delete(partType);
                }
                break;
        }
    }

    private savePartSetColorId(partType: AvatarFigurePartType, colorIds: number[]): void {
        switch (partType) {
            case AvatarFigurePartType.Head:
            case AvatarFigurePartType.Hair:
            case AvatarFigurePartType.HeadAccessory:
            case AvatarFigurePartType.HeadAccessoryExtra:
            case AvatarFigurePartType.EyeAccessory:
            case AvatarFigurePartType.FaceAccessory:
            case AvatarFigurePartType.Chest:
            case AvatarFigurePartType.CoatChest:
            case AvatarFigurePartType.ChestAccessory:
            case AvatarFigurePartType.ChestPrint:
            case AvatarFigurePartType.Legs:
            case AvatarFigurePartType.Shoes:
            case AvatarFigurePartType.WaistAccessory:
                this._colors.set(partType, colorIds);
                return;
        }
    }
}
