import { IRoomGeometry, IVector3D, Vector3d } from '@nitrodevco/nitro-api';
import { Matrix, Point, RenderTexture, Sprite, Texture } from 'pixi.js';

import { TextureUtils } from '#renderer/utils';

/**
 * Port of Flash `FurniturePlane`: one flat side of a `FurnitureCuboidVisualization`, a
 * parallelogram spanned by `leftSide` and `rightSide` from `location` (object space, in tiles),
 * filled with one colour and projected through the room geometry.
 *
 * Flash kept a solid-colour texture per scale (`getTexture`, the `_textures` cache) and drew it
 * with an affine matrix into a bitmap the size of the projected bounds (`renderTexture` /
 * `draw`). Here the solid texture is `Texture.WHITE` tinted with the colour and scaled to that
 * size, drawn with the same matrix into a render texture - so there is nothing to cache per
 * scale. The render target has no antialiasing, which keeps Flash's hard `smoothing = false`
 * edges; the stair-stepped `copyPixels` fast path of `draw` for 2:1 edges is what the GPU's
 * nearest sampling already produces.
 */
export class FurniturePlane {
    private _lastUpdateId: number = -1;
    private _lastDirectionX: number = 0;
    private _lastDirectionY: number = 0;
    private _lastDirectionZ: number = 0;
    private _lastScale: number = 0;

    private _origin: Vector3d = new Vector3d();
    private _location: Vector3d = new Vector3d();
    private _leftSide: Vector3d = new Vector3d();
    private _rightSide: Vector3d = new Vector3d();
    private _originalLeftSide: Vector3d = new Vector3d();
    private _originalRightSide: Vector3d = new Vector3d();
    private _normal: Vector3d;
    private _visible: boolean = true;
    private _texture: RenderTexture | undefined = undefined;
    private _offset: Point = new Point();
    private _relativeDepth: number = 0;
    private _color: number = 0;
    private _rotated: boolean = false;
    private _textureScale: number = -1;

    private _cornerA: Vector3d = new Vector3d();
    private _cornerB: Vector3d = new Vector3d();
    private _cornerC: Vector3d = new Vector3d();
    private _cornerD: Vector3d = new Vector3d();
    private _width: number = 0;
    private _height: number = 0;

    constructor(location: IVector3D, leftSide: IVector3D, rightSide: IVector3D) {
        this._location.assign(location);
        this._leftSide.assign(leftSide);
        this._rightSide.assign(rightSide);
        this._originalLeftSide.assign(leftSide);
        this._originalRightSide.assign(rightSide);

        this._normal = Vector3d.crossProduct(this._leftSide, this._rightSide);

        if (this._normal.length > 0) this._normal.multiply(1 / this._normal.length);
    }

    public dispose(): void {
        if (this._texture) {
            TextureUtils.destroyTexture(this._texture);

            this._texture = undefined;
        }
    }

    /** Flash `bitmapData`: what the plane drew, while it faces the camera. */
    public get texture(): Texture | undefined {
        return this._visible ? this._texture : undefined;
    }

    public get visible(): boolean {
        return this._visible;
    }

    public get offset(): Point {
        return this._offset;
    }

    public get relativeDepth(): number {
        return this._relativeDepth;
    }

    public get color(): number {
        return this._color;
    }

    public set color(color: number) {
        this._color = color;
    }

    public get leftSide(): IVector3D {
        return this._leftSide;
    }

    public get rightSide(): IVector3D {
        return this._rightSide;
    }

    public get location(): IVector3D {
        return this._location;
    }

    public get normal(): IVector3D {
        return this._normal;
    }

    /**
     * Flash `setRotation`: turned a quarter (direction 2 or 6), the two sides swap lengths but keep
     * their directions, so a 1x2 cuboid lies 2x1.
     */
    public setRotation(rotated: boolean): void {
        if (rotated === this._rotated) return;

        this._leftSide.assign(this._originalLeftSide);
        this._rightSide.assign(this._originalRightSide);

        if (rotated) {
            this._leftSide.multiply(this._originalRightSide.length / this._originalLeftSide.length);
            this._rightSide.multiply(this._originalLeftSide.length / this._originalRightSide.length);
        }

        this._lastUpdateId = -1;
        this._lastDirectionX -= 1;
        this._rotated = rotated;
        this._textureScale = -1;
    }

    /** Flash `needsNewTexture`: the solid texture is per scale, and only exists while the plane has a size. */
    private needsNewTexture(geometry: IRoomGeometry): boolean {
        return (this._width > 0 && this._height > 0 && this._textureScale !== Number(geometry.scale));
    }

    /** Flash `update`: whether the plane's picture or placement changed. */
    public update(geometry: IRoomGeometry): boolean {
        if (!geometry) return false;

        let geometryChanged = false;

        if (geometry.updateId !== this._lastUpdateId) {
            this._lastUpdateId = geometry.updateId;

            const direction = geometry.direction;

            if (direction && (direction.x !== this._lastDirectionX || direction.y !== this._lastDirectionY || direction.z !== this._lastDirectionZ || Number(geometry.scale) !== this._lastScale)) {
                this._lastDirectionX = direction.x;
                this._lastDirectionY = direction.y;
                this._lastDirectionZ = direction.z;
                this._lastScale = Number(geometry.scale);

                geometryChanged = true;

                const cosAngle = Vector3d.cosAngle(geometry.directionAxis, this._normal);

                if (cosAngle > -0.001) {
                    if (this._visible) {
                        this._visible = false;

                        return true;
                    }

                    return false;
                }

                this.updateCorners(geometry);

                const originZ = geometry.getScreenPosition(this._origin).z;

                this._relativeDepth = Math.max(this._cornerA.z - originZ, this._cornerB.z - originZ, this._cornerC.z - originZ, this._cornerD.z - originZ);
                this._visible = true;
            }
        }

        if (!this.needsNewTexture(geometry) && !geometryChanged) return false;

        if (!this._texture || this._width !== this._texture.width || this._height !== this._texture.height) {
            if (this._texture) {
                TextureUtils.destroyTexture(this._texture);

                this._texture = undefined;

                if (this._width < 1 || this._height < 1) return true;
            } else if (this._width < 1 || this._height < 1) return false;

            this._texture = RenderTexture.create({ width: this._width, height: this._height });
        }

        this.renderTexture(geometry);

        return true;
    }

    private updateCorners(geometry: IRoomGeometry): void {
        this._cornerA.assign(geometry.getScreenPosition(this._location));
        this._cornerB.assign(geometry.getScreenPosition(Vector3d.sum(this._location, this._rightSide)));
        this._cornerC.assign(geometry.getScreenPosition(Vector3d.sum(Vector3d.sum(this._location, this._leftSide), this._rightSide)));
        this._cornerD.assign(geometry.getScreenPosition(Vector3d.sum(this._location, this._leftSide)));

        const offset = geometry.getScreenPoint(this._origin);

        this._offset = new Point(Math.round(offset.x), Math.round(offset.y));

        const corners = [ this._cornerA, this._cornerB, this._cornerC, this._cornerD ];

        for (const corner of corners) {
            corner.x = Math.round(corner.x);
            corner.y = Math.round(corner.y);
        }

        const minX = Math.min(...corners.map(corner => corner.x));
        const maxX = Math.max(...corners.map(corner => corner.x));
        const minY = Math.min(...corners.map(corner => corner.y));
        const maxY = Math.max(...corners.map(corner => corner.y));

        this._offset.x -= minX;
        this._offset.y -= minY;

        for (const corner of corners) {
            corner.x -= minX;
            corner.y -= minY;
        }

        this._width = maxX - minX;
        this._height = maxY - minY;
    }

    /**
     * Flash `getTexture` + `renderTexture`: the solid texture is `leftSide` by `rightSide` long at
     * this scale (at least a pixel each way), mapped onto the corners C -> D and C -> B.
     */
    private renderTexture(geometry: IRoomGeometry): void {
        if (!this._texture) return;

        const textureWidth = Math.max(1, Math.trunc(this._leftSide.length * geometry.scale));
        const textureHeight = Math.max(1, Math.trunc(this._rightSide.length * geometry.scale));

        this._textureScale = Number(geometry.scale);

        let leftX = this._cornerD.x - this._cornerC.x;
        let leftY = this._cornerD.y - this._cornerC.y;
        let rightX = this._cornerB.x - this._cornerC.x;
        let rightY = this._cornerB.y - this._cornerC.y;

        if (Math.abs(rightX - textureWidth) <= 1) rightX = textureWidth;
        if (Math.abs(rightY - textureWidth) <= 1) rightY = textureWidth;
        if (Math.abs(leftX - textureHeight) <= 1) leftX = textureHeight;
        if (Math.abs(leftY - textureHeight) <= 1) leftY = textureHeight;

        // Flash scales its texture by (side / texture size); the white texture is one pixel, so
        // the texture's size multiplies back out and the side is the scale.
        const sprite = new Sprite(Texture.WHITE);

        sprite.tint = this._color;
        sprite.setFromMatrix(new Matrix(rightX, rightY, leftX, leftY, this._cornerC.x, this._cornerC.y));

        TextureUtils.writeToTexture(sprite, this._texture, true);

        sprite.destroy();
    }
}
