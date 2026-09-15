import { Container, Point } from 'pixi.js';

export class AvatarImageBodyPartContainer {
    private _image: Container;
    private _regPoint: Point;
    private _offset: Point;
    private _isCacheable: boolean;
    private _faceOffset: Point | undefined;

    constructor(image: Container, regPoint: Point, isCacheable: boolean, faceOffset: Point | undefined = undefined) {
        this._image = image;
        this._regPoint = regPoint;
        this._offset = new Point(0, 0);
        this._isCacheable = isCacheable;
        this._faceOffset = faceOffset;

        this.cleanPoints();
    }

    public dispose(): void {
        if (this._image) {
            this._image.destroy({
                children: true,
            });
        }
    }

    /** Flash truncated both points to whole pixels so parts never land on half-pixel boundaries. */
    private cleanPoints(): void {
        this._regPoint.x = Math.trunc(this._regPoint.x);
        this._regPoint.y = Math.trunc(this._regPoint.y);
        this._offset.x = Math.trunc(this._offset.x);
        this._offset.y = Math.trunc(this._offset.y);
    }

    public setRegPoint(k: Point): void {
        this._regPoint = k;

        this.cleanPoints();
    }

    public get image(): Container {
        return this._image;
    }

    public set image(k: Container) {
        if (this._image && (this._image !== k)) {
            this._image.destroy({
                children: true,
            });
        }

        this._image = k;
    }

    public get regPoint(): Point {
        const clone = this._regPoint.clone();

        clone.x += this._offset.x;
        clone.y += this._offset.y;

        return clone;
    }

    public set offset(k: Point) {
        this._offset = k;

        this.cleanPoints();
    }

    public get isCacheable(): boolean {
        return this._isCacheable;
    }

    /** Where the face part was placed inside this body part's image, when it holds one (the head). */
    public get faceOffset(): Point | undefined {
        return this._faceOffset;
    }
}
