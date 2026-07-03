import type { Container, Point, Texture } from "pixi.js";
import { Rectangle } from "pixi.js";

export class ImageData {
    private _texture: Texture | undefined;
    private _rect: Rectangle;
    private _regPoint: Point;
    private _flipH: boolean;
    private _colorTransform: number;
    private _container: Container | undefined;

    constructor(texture: Texture | undefined, rectangle: Rectangle, regPoint: Point, flipH: boolean, color: number, container: Container | undefined = undefined) {
        this._texture = texture;
        this._rect = rectangle;
        this._regPoint = regPoint;
        this._flipH = flipH;
        this._colorTransform = color;
        this._container = container;

        if (flipH) this._regPoint.x = (-(this._regPoint.x) + rectangle.width);
    }

    public dispose(): void {

    }

    public get texture(): Texture | undefined {
        return this._texture;
    }

    public get rect(): Rectangle {
        return this._rect;
    }

    public get regPoint(): Point {
        return this._regPoint;
    }

    public get flipH(): boolean {
        return this._flipH;
    }

    public get colorTransform(): number {
        return this._colorTransform;
    }

    public get container(): Container | undefined {
        return this._container;
    }

    public get offsetRect(): Rectangle {
        return new Rectangle(-(this._regPoint.x), -(this._regPoint.y), this._rect.width, this._rect.height);
    }
}
