import type { AvatarFigurePartType, IAssetAvatarPartSetItem } from "@nitrodevco/nitro-api";

export class PartDefinition {
    private _setType: string;
    private _flippedSetType: AvatarFigurePartType | undefined;
    private _removeSetType: AvatarFigurePartType | undefined;
    private _appendToFigure: boolean;
    private _staticId: number;

    constructor(data: IAssetAvatarPartSetItem) {
        this._setType = data.setType;
        this._flippedSetType = data.flippedSetType ?? undefined;
        this._removeSetType = data.removeSetType ?? undefined;
        this._appendToFigure = false;
        this._staticId = -1;
    }

    public hasStaticId(): boolean {
        return this._staticId >= 0;
    }

    public get staticId(): number {
        return this._staticId;
    }

    public set staticId(k: number) {
        this._staticId = k;
    }

    public get setType(): string {
        return this._setType;
    }

    public get flippedSetType(): AvatarFigurePartType | undefined {
        return this._flippedSetType;
    }

    public set flippedSetType(type: AvatarFigurePartType | undefined) {
        this._flippedSetType = type;
    }

    public get removeSetType(): AvatarFigurePartType | undefined {
        return this._removeSetType;
    }

    public get appendToFigure(): boolean {
        return this._appendToFigure;
    }

    public set appendToFigure(flag: boolean) {
        this._appendToFigure = flag;
    }
}
