import type { IAssetAvatarGeometry } from "@nitrodevco/nitro-api";
import { AvatarScaleType } from "@nitrodevco/nitro-api";
import { Point } from "pixi.js";

export class AvatarCanvas {
    private readonly _id: string;
    private readonly _width: number;
    private readonly _height: number;
    private readonly _offset: Point;
    private readonly _regPoint: Point;

    constructor(geometry: IAssetAvatarGeometry, scale: string) {
        this._id = geometry.id;
        this._width = geometry.width;
        this._height = geometry.height;
        this._offset = new Point(geometry.dx, geometry.dy);

        if (scale == AvatarScaleType.LARGE) this._regPoint = new Point(((this._width - 64) / 2), 0);
        else this._regPoint = new Point(((this._width - 32) / 2), 0);
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get offset(): Point {
        return this._offset;
    }

    public get id(): string {
        return this._id;
    }

    public get regPoint(): Point {
        return this._regPoint;
    }
}
