import type { IPlaneDrawingData } from '@nitrodevco/nitro-api';
import type { Point } from 'pixi.js';

export class PlaneDrawingData implements IPlaneDrawingData {
    private _z: number;
    private _points: Point[];
    private _color: number;
    private _maskAssetNames: string[];
    private _maskAssetLocations: Point[];
    private _maskAssetFlipHs: boolean[];
    private _maskAssetFlipVs: boolean[];
    private _alignBottom: boolean;
    private _assetNames: string[][];

    constructor(data: PlaneDrawingData | undefined = undefined, color: number = 0, alignBottom: boolean = false) {
        this._assetNames = [];
        this._maskAssetNames = [];
        this._maskAssetLocations = [];
        this._maskAssetFlipHs = [];
        this._maskAssetFlipVs = [];

        if (data) {
            this._maskAssetNames = data._maskAssetNames;
            this._maskAssetLocations = data._maskAssetLocations;
            this._maskAssetFlipHs = data._maskAssetFlipHs;
            this._maskAssetFlipVs = data._maskAssetFlipVs;
        }

        this._color = color;
        this._alignBottom = alignBottom;
    }

    public addMask(name: string, location: Point, flipH: boolean, flipV: boolean): void {
        this._maskAssetNames.push(name);
        this._maskAssetLocations.push(location);
        this._maskAssetFlipHs.push(flipH);
        this._maskAssetFlipVs.push(flipV);
    }

    public addAssetColumn(k: string[]): void {
        this._assetNames.push(k);
    }

    public set z(k: number) {
        this._z = k;
    }

    public get z(): number {
        return this._z;
    }

    public set cornerPoints(k: Point[]) {
        this._points = k;
    }

    public get cornerPoints(): Point[] {
        return this._points;
    }

    public get color(): number {
        return this._color;
    }

    public get maskAssetNames(): string[] {
        return this._maskAssetNames;
    }

    public get maskAssetLocations(): Point[] {
        return this._maskAssetLocations;
    }

    public get maskAssetFlipHs(): boolean[] {
        return this._maskAssetFlipHs;
    }

    public get maskAssetFlipVs(): boolean[] {
        return this._maskAssetFlipVs;
    }

    public isBottomAligned(): boolean {
        return this._alignBottom;
    }

    public get assetNameColumns(): string[][] {
        return this._assetNames;
    }
}
