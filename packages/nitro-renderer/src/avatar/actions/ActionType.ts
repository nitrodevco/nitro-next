import type { IAssetAvatarActionType } from "@nitrodevco/nitro-api";

export class ActionType {
    private readonly _id: number;
    private readonly _prevents: string[];
    private readonly _preventHeadTurn: boolean;
    private readonly _isAnimated: boolean;

    constructor(data: IAssetAvatarActionType) {
        this._id = data.id;
        this._prevents = data.prevents ?? [];
        this._preventHeadTurn = data.preventHeadTurn ?? false;
        this._isAnimated = true;

        if (data.animated !== undefined && data.animated === false) this._isAnimated = false;
    }

    public get id(): number {
        return this._id;
    }

    public get value(): number {
        return this._id;
    }

    public get prevents(): string[] {
        return this._prevents;
    }

    public get preventHeadTurn(): boolean {
        return this._preventHeadTurn;
    }

    public get isAnimated(): boolean {
        return this._isAnimated;
    }
}
