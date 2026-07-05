import type { AvatarFigurePartType, IFigureDataPart, IFigurePart } from "@nitrodevco/nitro-api";

export class FigurePart implements IFigurePart {
    private _id: number;
    private _type: AvatarFigurePartType;
    private _index: number;
    private _colorLayerIndex: number;
    private _paletteMapId: number;
    private _breed: number;

    constructor(data: IFigureDataPart) {
        this._id = data.id;
        this._type = data.type;
        this._index = data.index;
        this._colorLayerIndex = data.colorindex ?? -1;
        this._paletteMapId = -1;
        this._breed = -1;
    }

    public dispose(): void {

    }

    public get id(): number {
        return this._id;
    }

    public get type(): AvatarFigurePartType {
        return this._type;
    }

    public get index(): number {
        return this._index;
    }

    public get colorLayerIndex(): number {
        return this._colorLayerIndex;
    }

    public get paletteMap(): number {
        return this._paletteMapId;
    }

    public get breed(): number {
        return this._breed;
    }
}
