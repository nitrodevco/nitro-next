import type {
    IAssetPlaneVisualizationLayer,
    IAssetRoomVisualizationData,
    IRoomGeometry,
    IRoomPlane,
    IVector3D,
} from '@nitrodevco/nitro-api';
import { Vector3d } from '@nitrodevco/nitro-api';
import type { Sprite } from 'pixi.js';
import { TilingSprite } from 'pixi.js';
import { Container, Matrix, Point, Texture } from 'pixi.js';

import { GetAssetManager } from '../../../../assets';
import { GetRenderer, GetTexturePool } from '../../../../utils';
import { RoomGeometry } from '../../../utils';
import type { PlaneMaskManager } from './mask';
import { RoomPlaneBitmapMask } from './RoomPlaneBitmapMask';
import { RoomPlaneRectangleMask } from './RoomPlaneRectangleMask';
import { Randomizer } from './utils';
import type { MaskEntry } from './utils/MergeMasks';
import { MergeMasks } from './utils/MergeMasks';

type PlaneDataType = keyof IAssetRoomVisualizationData;

export class RoomPlane implements IRoomPlane {
    public static readonly HORIZONTAL_ANGLE_DEFAULT = 45;
    public static readonly VERTICAL_ANGLE_DEFAULT = 30;

    public static readonly PLANE_GEOMETRY: Record<number, IRoomGeometry> = {
        32: new RoomGeometry(
            32,
            new Vector3d(RoomPlane.HORIZONTAL_ANGLE_DEFAULT, RoomPlane.VERTICAL_ANGLE_DEFAULT),
            new Vector3d(-10, 0, 0),
        ),
        64: new RoomGeometry(
            64,
            new Vector3d(RoomPlane.HORIZONTAL_ANGLE_DEFAULT, RoomPlane.VERTICAL_ANGLE_DEFAULT),
            new Vector3d(-10, 0, 0),
        ),
    };

    // Kept (even if not used in this file) because some callers/assets rely on this constant.
    private static readonly LANDSCAPE_COLOR = 0x0082f0;

    public static readonly TYPE_UNDEFINED = 0;
    public static readonly TYPE_WALL = 1;
    public static readonly TYPE_FLOOR = 2;
    public static readonly TYPE_LANDSCAPE = 3;

    private static _uniqueIdCounter = 1;

    private _disposed = false;
    private readonly _randomSeed: number;

    private _origin: IVector3D = new Vector3d();
    private _location: IVector3D = new Vector3d();
    private _leftSide: IVector3D = new Vector3d();
    private _rightSide: IVector3D = new Vector3d();

    private _normal: IVector3D;
    private readonly _secondaryNormals: IVector3D[] = [];

    private readonly _type: number;
    private _isVisible = false;
    private _offset: Point = new Point();
    private _relativeDepth = 0;
    private _color = 0;

    private _maskManager?: PlaneMaskManager;
    private _id?: string;

    private readonly _uniqueId: number;

    private _cornerA: IVector3D = new Vector3d();
    private _cornerB: IVector3D = new Vector3d();
    private _cornerC: IVector3D = new Vector3d();
    private _cornerD: IVector3D = new Vector3d();

    private readonly _textureOffsetX: number;
    private readonly _textureOffsetY: number;
    private readonly _textureMaxX: number;
    private readonly _textureMaxY: number;

    private _width = 0;
    private _height = 0;

    private _canBeVisible = true;
    private _geometryUpdateId = -1;
    private _extraDepth = 0;
    private _isHighlighter = false;

    private readonly _useMask: boolean;
    private _bitmapMasks: RoomPlaneBitmapMask[] = [];
    private _rectangleMasks: RoomPlaneRectangleMask[] = [];
    private _maskChanged = false;

    private _planeSprite?: TilingSprite | Sprite;
    private _planeTexture?: Texture;

    private _planeOffsetX = 0;
    private _planeOffsetY = 0;

    constructor(
        origin: IVector3D,
        location: IVector3D,
        leftSide: IVector3D,
        rightSide: IVector3D,
        type: number,
        usesMask: boolean,
        secondaryNormals: IVector3D[],
        randomSeed: number,
        textureOffsetX = 0,
        textureOffsetY = 0,
        textureMaxX = 0,
        textureMaxY = 0,
    ) {
        this._randomSeed = randomSeed;

        this._origin.assign(origin);
        this._location.assign(location);
        this._leftSide.assign(leftSide);
        this._rightSide.assign(rightSide);

        this._normal = Vector3d.crossProduct(this._leftSide, this._rightSide);
        if (this._normal.length > 0) this._normal.multiply(1 / this._normal.length);

        if (secondaryNormals?.length) {
            for (const entry of secondaryNormals) {
                if (!entry) continue;
                const v = new Vector3d();
                v.assign(entry);
                this._secondaryNormals.push(v);
            }
        }

        this._type = type;

        this._textureOffsetX = textureOffsetX;
        this._textureOffsetY = textureOffsetY;
        this._textureMaxX = textureMaxX;
        this._textureMaxY = textureMaxY;

        this._useMask = usesMask;
        this._uniqueId = ++RoomPlane._uniqueIdCounter;
    }

    public dispose(): void {
        if (this._disposed) return;

        this._planeSprite?.destroy();
        this._planeSprite = undefined;

        if (this._planeTexture) {
            GetTexturePool().putTexture(this._planeTexture);
            this._planeTexture = undefined;
        }

        this._disposed = true;
    }

    public update(geometry: IRoomGeometry, timeSinceStartMs: number, needsUpdate = false): boolean {
        if (!geometry || this._disposed) return false;

        const geometryChanged = this._geometryUpdateId !== geometry.updateId;
        if (geometryChanged) {
            this._geometryUpdateId = geometry.updateId;
            needsUpdate = true;
        }

        const maskChanged = this._maskChanged;

        if (!needsUpdate && !maskChanged) {
            if (!this.visible) return false;
        }

        if (!this._canBeVisible) {
            if (!this.visible) return false;
        }

        let contentChanged = false;

        if (needsUpdate) {
            if (!this.updateVisibilityAndCorners(geometry)) return false;

            Randomizer.setSeed(this._randomSeed);

            const planeGeometry = RoomPlane.PLANE_GEOMETRY[geometry.scale];
            let width = this._leftSide.length * geometry.scale;
            let height = this._rightSide.length * geometry.scale;

            const { texture, color } = this.getTextureAndColorForPlane(this._id!, this._type, planeGeometry);

            switch (this._type) {
                case RoomPlane.TYPE_FLOOR: {
                    const origin = planeGeometry.getScreenPoint(new Vector3d(0, 0, 0));
                    const yEnd = planeGeometry.getScreenPoint(new Vector3d(0, height / planeGeometry.scale, 0));
                    const xEnd = planeGeometry.getScreenPoint(new Vector3d(width / planeGeometry.scale, 0, 0));

                    let x = 0;
                    let y = 0;

                    if (origin && yEnd && xEnd) {
                        width = Math.round(Math.abs(origin.x - xEnd.x));
                        height = Math.round(Math.abs(origin.x - yEnd.x));

                        const pixelsPerUnit = Math.abs(
                            origin.x - planeGeometry.getScreenPoint(new Vector3d(1, 0, 0)).x,
                        );

                        x = this._textureOffsetX * pixelsPerUnit;
                        y = this._textureOffsetY * pixelsPerUnit;
                    }

                    if (x !== 0 || y !== 0) {
                        while (x < 0) x += texture.width;
                        while (y < 0) y += texture.height;
                    }

                    this._planeOffsetX = ((x % texture.width) + texture.width) % texture.width;
                    this._planeOffsetY = ((y % texture.height) + texture.height) % texture.height;
                    break;
                }

                case RoomPlane.TYPE_WALL: {
                    const p0 = planeGeometry.getScreenPoint(new Vector3d(0, 0, 0));
                    const pH = planeGeometry.getScreenPoint(new Vector3d(0, 0, height / planeGeometry.scale));
                    const pW = planeGeometry.getScreenPoint(new Vector3d(0, width / planeGeometry.scale, 0));

                    if (p0 && pH && pW) {
                        width = Math.round(Math.abs(p0.x - pW.x));
                        height = Math.round(Math.abs(p0.y - pH.y));
                    }

                    this._planeOffsetX = this._textureOffsetX * texture.width;
                    this._planeOffsetY = this._textureOffsetY * texture.height;
                    break;
                }

                case RoomPlane.TYPE_LANDSCAPE: {
                    const p0 = planeGeometry.getScreenPoint(new Vector3d(0, 0, 0));
                    const pZ = planeGeometry.getScreenPoint(new Vector3d(0, 0, 1));
                    const pY = planeGeometry.getScreenPoint(new Vector3d(0, 1, 0));

                    if (p0 && pZ && pY) {
                        width = Math.round(Math.abs(((p0.x - pY.x) * width) / planeGeometry.scale));
                        height = Math.round(Math.abs(((p0.y - pZ.y) * height) / planeGeometry.scale));
                    }

                    const renderOffsetX = Math.trunc(this._textureOffsetX * Math.abs(p0.x - pY.x));
                    const renderOffsetY = Math.trunc(this._textureOffsetY * Math.abs(p0.y - pZ.y));

                    this._planeOffsetX = renderOffsetX;
                    this._planeOffsetY = renderOffsetY;
                    break;
                }
            }

            if (geometryChanged || !this._planeSprite || this._planeSprite.texture !== texture) {
                this._planeSprite?.destroy();
                this._planeSprite = new TilingSprite({
                    texture,
                    width,
                    height,
                    tilePosition: { x: this._planeOffsetX, y: this._planeOffsetY },
                    tint: color,
                });
                contentChanged = true;
            } else {
                if (this._planeSprite instanceof TilingSprite) {
                    this._planeSprite.tilePosition.set(this._planeOffsetX, this._planeOffsetY);
                }
                if (this._planeSprite.tint !== color) {
                    this._planeSprite.tint = color;
                    contentChanged = true;
                }
            }
        }

        if (
            !this._planeTexture ||
            this._planeTexture.width !== this._width ||
            this._planeTexture.height !== this._height
        ) {
            this._planeTexture = GetTexturePool().getTexture(this._width, this._height);
            contentChanged = true;
        }

        if (this._planeTexture) this._planeTexture.source.label = `room_plane_${this._uniqueId}`;

        if ((contentChanged || maskChanged) && this._planeSprite && this._planeTexture) {
            const container = new Container();
            const maskContainer = this.getMergedMasks(geometry);

            container.addChild(this._planeSprite);

            if (maskContainer) {
                this._planeSprite.setMask({ mask: maskContainer, inverse: true });
                container.addChild(maskContainer);
            } else {
                this._planeSprite.mask = null;
            }

            GetRenderer().render({
                target: this._planeTexture,
                container,
                transform: this.getMatrixForDimensions(this._planeSprite.width, this._planeSprite.height),
                clear: true,
            });
        }

        return true;
    }

    private updateVisibilityAndCorners(geometry: IRoomGeometry): boolean {
        let cosAngle = Vector3d.cosAngle(geometry.directionAxis, this.normal);

        if (cosAngle > -0.001) {
            if (this._isVisible) {
                this._isVisible = false;
                return true;
            }
            return false;
        }

        for (const n of this._secondaryNormals) {
            cosAngle = Vector3d.cosAngle(geometry.directionAxis, n);
            if (cosAngle > -0.001) {
                if (this._isVisible) {
                    this._isVisible = false;
                    return true;
                }
                return false;
            }
        }

        this.updateCorners(geometry);

        let relativeDepth =
            Math.max(this._cornerA.z, this._cornerB.z, this._cornerC.z, this._cornerD.z) -
            geometry.getScreenPosition(this._origin).z;

        switch (this._type) {
            case RoomPlane.TYPE_FLOOR:
                relativeDepth -= (this._location.z + Math.min(0, this._leftSide.z, this._rightSide.z)) * 8;
                break;
            case RoomPlane.TYPE_LANDSCAPE:
                relativeDepth += 0.02;
                break;
        }

        this._relativeDepth = relativeDepth;
        this._isVisible = true;

        return true;
    }

    private getTextureAndColorForPlane(planeId: string, planeType: number, planeGeometry: IRoomGeometry) {
        const dataType: PlaneDataType =
            planeType === RoomPlane.TYPE_FLOOR
                ? 'floorData'
                : planeType === RoomPlane.TYPE_WALL
                    ? 'wallData'
                    : 'landscapeData';

        const roomCollection = GetAssetManager().getCollection('room');
        const planeVisualizationData = roomCollection?.data?.roomVisualization?.[dataType];

        const plane = planeVisualizationData?.planes?.find(p => p.id === planeId);
        const planeVisualization =
            (dataType === 'landscapeData' ? plane?.animatedVisualization : plane?.visualizations)?.find(
                v => v.size === planeGeometry.scale,
            ) ?? null;

        const planeLayer = planeVisualization?.allLayers?.[0] as IAssetPlaneVisualizationLayer | undefined;
        const materialId = planeLayer?.materialId;
        const color = planeLayer?.color ?? 0xffffff;

        const assetName =
            planeVisualizationData?.textures?.find(t => t.id === materialId)?.bitmaps?.[0]?.assetName ?? '';

        const texture = GetAssetManager().getAsset(assetName)?.texture ?? Texture.WHITE;

        return { texture, color };
    }

    private updateCorners(geometry: IRoomGeometry): void {
        this._cornerA.assign(geometry.getScreenPosition(this._location));
        this._cornerB.assign(geometry.getScreenPosition(Vector3d.sum(this._location, this._rightSide)));
        this._cornerC.assign(
            geometry.getScreenPosition(Vector3d.sum(Vector3d.sum(this._location, this._leftSide), this._rightSide)),
        );
        this._cornerD.assign(geometry.getScreenPosition(Vector3d.sum(this._location, this._leftSide)));

        this._offset = geometry.getScreenPoint(this._origin);

        this._cornerA.x = Math.round(this._cornerA.x);
        this._cornerA.y = Math.round(this._cornerA.y);
        this._cornerB.x = Math.round(this._cornerB.x);
        this._cornerB.y = Math.round(this._cornerB.y);
        this._cornerC.x = Math.round(this._cornerC.x);
        this._cornerC.y = Math.round(this._cornerC.y);
        this._cornerD.x = Math.round(this._cornerD.x);
        this._cornerD.y = Math.round(this._cornerD.y);

        this._offset.x = Math.round(this._offset.x);
        this._offset.y = Math.round(this._offset.y);

        const minX = Math.min(this._cornerA.x, this._cornerB.x, this._cornerC.x, this._cornerD.x);
        const maxX = Math.max(this._cornerA.x, this._cornerB.x, this._cornerC.x, this._cornerD.x) - minX;

        const minY = Math.min(this._cornerA.y, this._cornerB.y, this._cornerC.y, this._cornerD.y);
        const maxY = Math.max(this._cornerA.y, this._cornerB.y, this._cornerC.y, this._cornerD.y) - minY;

        this._offset.x -= minX;
        this._cornerA.x -= minX;
        this._cornerB.x -= minX;
        this._cornerC.x -= minX;
        this._cornerD.x -= minX;

        this._offset.y -= minY;
        this._cornerA.y -= minY;
        this._cornerB.y -= minY;
        this._cornerC.y -= minY;
        this._cornerD.y -= minY;

        this._width = maxX;
        this._height = maxY;
    }

    private getMatrixForDimensions(width: number, height: number): Matrix {
        let a = this._cornerD.x - this._cornerC.x;
        let b = this._cornerD.y - this._cornerC.y;
        let c = this._cornerB.x - this._cornerC.x;
        let d = this._cornerB.y - this._cornerC.y;

        if (this._type === RoomPlane.TYPE_WALL || this._type === RoomPlane.TYPE_LANDSCAPE) {
            if (Math.abs(c - width) <= 1) c = width;
            if (Math.abs(d - width) <= 1) d = width;
            if (Math.abs(a - height) <= 1) a = height;
            if (Math.abs(b - height) <= 1) b = height;
        }

        const xScale = c / width;
        const ySkew = d / width;
        const xSkew = a / height;
        const yScale = b / height;

        const matrix = new Matrix(xScale, ySkew, xSkew, yScale);
        matrix.translate(this._cornerC.x, this._cornerC.y);

        return matrix;
    }

    public resetBitmapMasks(): void {
        if (this._disposed || !this._useMask || !this._bitmapMasks.length) return;

        this._maskChanged = true;
        this._bitmapMasks = [];
    }

    public addBitmapMask(maskType: string, leftSideLoc: number, rightSideLoc: number): boolean {
        if (!this._useMask) return false;

        for (const mask of this._bitmapMasks) {
            if (!mask) continue;

            if (mask.type === maskType && mask.leftSideLoc === leftSideLoc && mask.rightSideLoc === rightSideLoc)
                return false;
        }

        this._bitmapMasks.push(new RoomPlaneBitmapMask(maskType, leftSideLoc, rightSideLoc));
        this._maskChanged = true;

        return true;
    }

    public resetRectangleMasks(): void {
        if (!this._useMask || !this._rectangleMasks.length) return;

        this._maskChanged = true;
        this._rectangleMasks = [];
    }

    public addRectangleMask(
        leftLocation: number,
        rightLocation: number,
        leftLength: number,
        rightLength: number,
    ): boolean {
        if (!this._useMask) return false;

        for (const mask of this._rectangleMasks) {
            if (!mask) continue;

            if (
                mask.leftSideLoc === leftLocation &&
                mask.rightSideLoc === rightLocation &&
                mask.leftSideLength === leftLength &&
                mask.rightSideLength === rightLength
            ) {
                return false;
            }
        }

        this._rectangleMasks.push(new RoomPlaneRectangleMask(leftLocation, rightLocation, leftLength, rightLength));
        this._maskChanged = true;

        return true;
    }

    private getMergedMasks(geometry: IRoomGeometry): Container | undefined {
        if (
            !this._useMask ||
            (!this._bitmapMasks.length && !this._rectangleMasks.length) ||
            !this._maskChanged ||
            !this._maskManager
        ) return undefined;

        this._maskChanged = false;

        const width = this._planeSprite?.width ?? 0;
        const height = this._planeSprite?.height ?? 0;

        if (width <= 0 || height <= 0) return undefined;

        const normal = geometry.getCoordinatePosition(this._normal);
        const masks: MaskEntry[] = [];

        for (const mask of this._bitmapMasks) {
            if (!mask) continue;

            const entry = this._maskManager.getMaskEntry(
                mask.type,
                geometry.scale,
                normal,
                width - (width * mask.leftSideLoc) / this._leftSide.length,
                height - (height * mask.rightSideLoc) / this._rightSide.length,
            );

            if (entry) masks.push(entry);
        }

        for (const mask of this._rectangleMasks) {
            if (!mask) continue;

            const posX = width - (width * mask.leftSideLoc) / this._leftSide.length;
            const posY = height - (height * mask.rightSideLoc) / this._rightSide.length;

            const wd = (width * mask.leftSideLength) / this._leftSide.length;
            const ht = (height * mask.rightSideLength) / this._rightSide.length;

            masks.push({
                type: 'rect',
                texture: Texture.WHITE,
                x: Math.trunc(posX - wd),
                y: Math.trunc(posY - ht),
                width: Math.trunc(wd),
                height: Math.trunc(ht),
            } as unknown as MaskEntry);
        }

        return MergeMasks(masks);
    }

    public get canBeVisible(): boolean {
        return this._canBeVisible;
    }

    public set canBeVisible(flag: boolean) {
        this._canBeVisible = flag;
    }

    public get visible(): boolean {
        return this._isVisible && this._canBeVisible;
    }

    public get offset(): Point {
        return this._offset;
    }

    public get relativeDepth(): number {
        return this._relativeDepth + this._extraDepth;
    }

    public set extraDepth(value: number) {
        this._extraDepth = value;
    }

    public get color(): number {
        return this._color;
    }

    public set color(value: number) {
        this._color = value;
    }

    public get type(): number {
        return this._type;
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

    public set id(value: string) {
        if (value === this._id) return;
        this._id = value;
    }

    public set maskManager(value: PlaneMaskManager) {
        this._maskManager = value;
    }

    public get uniqueId(): number {
        return this._uniqueId;
    }

    public get planeTexture(): Texture | undefined {
        return this._planeTexture;
    }

    public get isHighlighter(): boolean {
        return this._isHighlighter;
    }

    public set isHighlighter(flag: boolean) {
        this._isHighlighter = flag;
    }
}
