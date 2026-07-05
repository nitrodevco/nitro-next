import type { AvatarFigurePartType, IFigureDataSetType, IFigurePartSet, ISetType } from '@nitrodevco/nitro-api';
import { AvatarGenderType } from '@nitrodevco/nitro-api';

import { FigurePartSet } from './FigurePartSet';

export class SetType implements ISetType {
    private _type: AvatarFigurePartType;
    private _paletteId: number;
    private _partSets: Map<number, IFigurePartSet>;
    private _isMandatory: Record<AvatarGenderType, [boolean, boolean]>;

    constructor(data: IFigureDataSetType) {
        this._type = data.type;
        this._paletteId = data.paletteId ?? -1;
        this._partSets = new Map();

        this._isMandatory[AvatarGenderType.Female] = [data.mandatory_f_0 ?? false, data.mandatory_f_1 ?? false];
        this._isMandatory[AvatarGenderType.Male] = [data.mandatory_m_0 ?? false, data.mandatory_m_1 ?? false];
        this._isMandatory[AvatarGenderType.Unisex] = [false, false];

        this.append(data);
    }

    public dispose(): void {
        for (const set of this._partSets.values()) set.dispose();

        this._partSets.clear();
    }

    public cleanUp(data: IFigureDataSetType): void {
        if (data.sets) {
            for (const set of data.sets) {
                const partSet = this._partSets.get(set.id);

                if (partSet) {
                    partSet.dispose();

                    this._partSets.delete(set.id);
                }
            }
        }
    }

    public append(setType: IFigureDataSetType): void {
        if (!setType || !setType.sets) return;

        for (const set of setType.sets) this._partSets.set(set.id, new FigurePartSet(this._type, set));
    }

    public getDefaultPartSet(gender: AvatarGenderType): IFigurePartSet | undefined {
        for (const set of this._partSets.values()) {
            if (set && (set.clubLevel === 0) && ((set.gender === gender) || (set.gender === 'U'))) return set;
        }

        return undefined;
    }

    public getPartSet(id: number): IFigurePartSet | undefined {
        return this._partSets.get(id);
    }

    public isMandatory(gender: AvatarGenderType, count: number): boolean {
        return this._isMandatory[gender][Math.min(count, 1)];
    }

    public optionalFromClubLevel(gender: AvatarGenderType): number {
        return this._isMandatory[gender]?.indexOf(false);
    }

    public get type(): AvatarFigurePartType {
        return this._type;
    }

    public get paletteId(): number {
        return this._paletteId;
    }

    public get partSets(): Map<number, IFigurePartSet> {
        return this._partSets;
    }
}
