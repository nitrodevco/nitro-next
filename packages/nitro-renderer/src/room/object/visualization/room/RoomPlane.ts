import {
    IAssetPlaneVisualizationLayer,
    IMaskEntry,
    IRoomGeometry,
    IRoomPlane,
    IVector3D,
    Vector3d } from '@nitrodevco/nitro-api';
import { Container, Matrix, Point, Rectangle, RenderTexture, Sprite, Texture, TilingSprite } from 'pixi.js';

import { GetAssetManager } from '#renderer/assets';
import { ExtendedSprite, TexturePool, TextureUtils } from '#renderer/utils';

import { RoomGeometry } from '../../../utils';
import { PlaneMaskManager } from './mask';
import { PlaneTextureCache } from './PlaneTextureCache';
import { IPlaneRasterizer } from './rasterizer/IPlaneRasterizer';
import { acquirePlaneTarget, copyToPlaneCanvas, createPlaneCanvas, fillPlaneCanvas, preparePlaneSampling, releasePlaneCanvas, releasePlaneTarget } from './rasterizer/PlaneCanvas';
import { RoomPlaneBitmapMask } from './RoomPlaneBitmapMask';
import { RoomPlaneRectangleMask } from './RoomPlaneRectangleMask';
import { PlaneBitmapData, Randomizer } from './utils';

type PlaneDataType = 'floorData' | 'wallData';

/**
 * One plane of the room - a floor, wall or landscape face - and the texture it is drawn with. Ports
 * Flash `RoomPlane`.
 *
 * Planes with a rasterizer use its texture - the way Flash's `getTexture` does - and keep one per
 * texture identifier until the rasterizer's time stamp runs out. A plane without one tiles the
 * first floor or wall material cell as `getTextureAndColorForPlane` does.
 *
 * Walls and landscapes are copied onto the plane in pixel-stepped column strips (`drawStepped`),
 * as Flash's `draw` does; anything else is drawn through the plane's matrix. Not ported:
 * `getDrawingDatas` (and `resolveMasks` under it), the per-layer drawing data only the photo
 * camera reads - Flash's `SpriteDataCollector` sends it to the server in `RenderRoomMessageComposer`
 * - and the photo camera is not ported, so nothing would call it.
 */
/** The default plane angles (the port's `PlaneRasterizer` carries the same pair) for the per-size plane geometries. */
const HORIZONTAL_ANGLE_DEFAULT = 45;
const VERTICAL_ANGLE_DEFAULT = 30;

export class RoomPlane implements IRoomPlane {
    public static readonly PLANE_GEOMETRY: Record<number, IRoomGeometry> = {
        32: new RoomGeometry(
            32,
            new Vector3d(HORIZONTAL_ANGLE_DEFAULT, VERTICAL_ANGLE_DEFAULT),
            new Vector3d(-10, 0, 0),
        ),
        64: new RoomGeometry(
            64,
            new Vector3d(HORIZONTAL_ANGLE_DEFAULT, VERTICAL_ANGLE_DEFAULT),
            new Vector3d(-10, 0, 0),
        ),
    };

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
    /** The plane's texture is out of date and was not drawn yet: a budgeted pass left it for later. */
    private _rasterPending = false;
    /** The geometry the texture on show was drawn for (-1 before the first). */
    private _drawnGeometryUpdateId = -1;
    private _offset: Point = new Point();
    private _relativeDepth = 0;
    /** The plane this one is a piece of, whose depth it takes (`setDepthGeometry`). */
    private _depthCorners: IVector3D[] | undefined = undefined;
    private _color = 0;
    private _coloredTexture: RenderTexture | undefined;
    private _textureColor: number = -1;

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
    private _planeOffsetX = 0;
    private _planeOffsetY = 0;

    private _canBeVisible = true;
    private _geometryUpdateId = -1;
    private _extraDepth = 0;
    private _isHighlighter = false;
    private _hasTexture = true;

    private readonly _useMask: boolean;
    private _bitmapMasks: RoomPlaneBitmapMask[] = [];
    private _rectangleMasks: RoomPlaneRectangleMask[] = [];
    private _maskChanged = false;
    /** A tiled plane given another type (`id`): it has no texture cache to empty, so it is drawn again on this. */
    private _tiledTypeChanged = false;

    private _planeSprite: Sprite | TilingSprite | undefined = undefined;
    private _planeTexture: RenderTexture | undefined = undefined;
    private _maskTexture: RenderTexture | undefined = undefined;

    private _rasterizer: IPlaneRasterizer | undefined = undefined;
    private _textures: Map<string, PlaneBitmapData> = new Map();
    /** The room's shared textures, and the key of the one `_planeTexture` is when it is shared. */
    private _sharedTextureCache: PlaneTextureCache | undefined = undefined;
    private _sharedTextureKey: string | undefined = undefined;
    private _activeTexture: PlaneBitmapData | undefined = undefined;

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

        this.resetTextureCache();

        this._planeSprite?.destroy();
        this._planeSprite = undefined;

        this.releasePlaneTexture();

        if (this._maskTexture) {
            TexturePool.releaseTexture(this._maskTexture);
            this._maskTexture = undefined;
        }

        this._disposed = true;

        releasePlaneCanvas(this._coloredTexture);
        this._coloredTexture = undefined;
    }

    /**
     * Brings the plane up to date: its visibility, corners and screen rectangle always (cheap), its
     * texture only when `canRasterize` - a room pass out of time leaves the drawing for a later
     * frame (`rasterPending`), and the next call draws it whether or not anything changed since.
     */
    public update(geometry: IRoomGeometry, timeSinceStartMs: number, canRasterize: boolean = true): boolean {
        if (!geometry || this._disposed) return false;

        let geometryChanged = false;

        if (this._geometryUpdateId !== geometry.updateId) geometryChanged = true;

        if (!geometryChanged || !this._canBeVisible) {
            if (!this.visible) return false;
        }

        if (geometryChanged) {
            this._activeTexture = undefined;

            const result = this.updateVisibilityAndCorners(geometry);

            if (result === false) return false;

            if (result === true) return true;
        }

        if (geometryChanged || this._rasterPending || this.needsNewTexture(geometry, timeSinceStartMs)) {
            if (!canRasterize) {
                this._rasterPending = true;

                return false;
            }

            this._rasterPending = false;
            this._drawnGeometryUpdateId = geometry.updateId;

            const sharedKey = this.getSharedTextureKey(geometry);
            const sharedTexture = sharedKey ? this._sharedTextureCache?.get(sharedKey) : undefined;

            if (sharedKey && sharedTexture) {
                if (this._planeTexture !== sharedTexture) {
                    this.releasePlaneTexture();

                    this._planeTexture = sharedTexture;
                }

                // The tint comes from the cache too, so a copy of its own would only hold memory.
                releasePlaneCanvas(this._coloredTexture);
                this._coloredTexture = undefined;

                this._sharedTextureKey = sharedKey;
                this._textureColor = -1;

                return true;
            }

            // A shared texture is never drawn over: this plane draws into one of its own.
            if (this._sharedTextureCache?.owns(this._planeTexture)) this.releasePlaneTexture();

            let width = 1;
            let height = 1;

            Randomizer.setSeed(this._randomSeed);

            if (this._planeSprite) this._planeSprite.destroy();

            this._planeSprite = undefined;

            if (this._rasterizer) {
                const texture = this.getTexture(geometry, timeSinceStartMs);

                if (!texture) return false;

                width = texture.width;
                height = texture.height;
                this._planeSprite = new Sprite(texture);
            } else {
                ({ width, height } = this.createTiledPlaneSprite(geometry));

                this._tiledTypeChanged = false;
            }

            if (!this._planeSprite) return false;

            if (this._planeTexture && (this._planeTexture.width !== this._width || this._planeTexture.height !== this._height)) this.releasePlaneTexture();

            if (!this._planeTexture) this._planeTexture = acquirePlaneTarget(this._width, this._height);

            if (!this._planeTexture) return false;

            this._planeTexture.source.label = `room_plane_${this._uniqueId}`;

            const container = new Container();
            const maskTexture = this.getMergedMasks(geometry, width, height);

            container.addChild(this._planeSprite);

            if (maskTexture) {
                const maskSprite = new Sprite(this._maskTexture);

                this._planeSprite.setMask({ mask: maskSprite, channel: 'alpha', inverse: true });

                container.addChild(maskSprite);
            }

            const matrix = this.getMatrixForDimensions(width, height);

            this._textureColor = -1;

            if (this.isSteppedDraw(matrix)) this.drawStepped(container, width, height, matrix);
            else {
                // GPU coverage samples pixel centres. Align the matrix-drawn edges with the
                // integer rows used by BitmapData.copyPixels above; otherwise a 2:1 edge leaves
                // an uncovered pixel every second column where a wall meets its top face.
                // Floors keep Flash's sampling: shifted, the 2:1 texture's tile lines cross in a
                // doubled, flat junction instead of a single step.
                if (this._type !== RoomPlane.TYPE_FLOOR) matrix.ty += 0.5;
                TextureUtils.getRenderer().render({ target: this._planeTexture, container, transform: matrix, clear: true });
            }

            container.destroy();

            // The texture is drawn over in place, so a hit map built from what it held is stale.
            ExtendedSprite.removeHitmap(this._planeTexture.source);

            // Only a texture that never runs out (no animation) is worth sharing.
            if (sharedKey && this._activeTexture && (this._activeTexture.timeStamp < 0) && this._sharedTextureCache?.add(sharedKey, this._planeTexture)) {
                this._sharedTextureKey = sharedKey;
            }

            return true;
        }

        return false;
    }

    /** Tiles the first plane material cell until its floor or wall rasterizer is available. */
    private createTiledPlaneSprite(geometry: IRoomGeometry): { width: number; height: number } {
        const planeGeometry = RoomPlane.PLANE_GEOMETRY[geometry.scale];

        let width = this._leftSide.length;
        let height = this._rightSide.length;

        const { texture: materialTexture, color } = this.getTextureAndColorForPlane(this._id ?? 'default', this._type, planeGeometry);
        const texture = this._hasTexture ? materialTexture : Texture.WHITE;

        switch (this._type) {
            case RoomPlane.TYPE_FLOOR: {
                const origin = planeGeometry.getScreenPoint(new Vector3d(0, 0, 0));
                const yEnd = planeGeometry.getScreenPoint(new Vector3d(0, height, 0));
                const xEnd = planeGeometry.getScreenPoint(new Vector3d(width, 0, 0));
                let x = 0;
                let y = 0;

                if (origin && yEnd && xEnd) {
                    width = Math.round(Math.abs(origin.x - xEnd.x));
                    height = Math.round(Math.abs(origin.x - yEnd.x));

                    const pixelsPerUnit = Math.abs(origin.x - planeGeometry.getScreenPoint(new Vector3d(1, 0, 0)).x);

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
                const origin = planeGeometry.getScreenPoint(new Vector3d(0, 0, 0));
                const yEnd = planeGeometry.getScreenPoint(new Vector3d(0, 0, height));
                const xEnd = planeGeometry.getScreenPoint(new Vector3d(0, width, 0));

                if (origin && yEnd && xEnd) {
                    width = Math.round(Math.abs(origin.x - xEnd.x));
                    height = Math.round(Math.abs(origin.y - yEnd.y));
                }

                this._planeOffsetX = this._textureOffsetX * texture.width;
                this._planeOffsetY = this._textureOffsetY * texture.height;
                break;
            }
        }

        width = Math.max(1, width);
        height = Math.max(1, height);
        this._planeSprite = new TilingSprite({ texture, width, height, tilePosition: { x: this._planeOffsetX, y: this._planeOffsetY }, tint: color });

        return { width, height };
    }

    /**
     * Flash `RoomPlane.needsNewTexture`: the masks changed, or the rasterizer's texture for this
     * scale and side is missing or past its time stamp.
     */
    private needsNewTexture(geometry: IRoomGeometry, timeSinceStartMs: number): boolean {
        if (!this._canBeVisible) return false;

        if (this._maskChanged) return true;

        // A shared texture is drawn already and never runs out; the plane's own cache stays empty.
        if (this._sharedTextureKey && this._planeTexture && !this._planeTexture.destroyed) return false;

        if (!this._rasterizer) return this._tiledTypeChanged;

        const texture = this._activeTexture ?? this._textures.get(this.getTextureIdentifier(geometry.scale));

        return !texture || ((texture.timeStamp >= 0) && (timeSinceStartMs > texture.timeStamp));
    }

    private getTextureIdentifier(scale: number): string {
        return this._rasterizer ? this._rasterizer.getTextureIdentifier(scale, this._normal) : String(scale);
    }

    /**
     * Flash `RoomPlane.getTexture`: the rasterizer's texture for the plane, drawn again when it has
     * run out. A plane with no rasterizer is its own colour, filled over its size in world units
     * times the scale, as Flash's `new BitmapData(width, height, true, 0xFF000000 | color)`.
     */
    private getTexture(geometry: IRoomGeometry, timeSinceStartMs: number): Texture | undefined {
        const identifier = this.getTextureIdentifier(geometry.scale);

        if (this.needsNewTexture(geometry, timeSinceStartMs)) {
            const width = this._leftSide.length * geometry.scale;
            const height = this._rightSide.length * geometry.scale;
            let bitmapData: PlaneBitmapData | undefined = undefined;

            if (this._rasterizer) {
                const previous = (this._activeTexture ?? this._textures.get(identifier))?.texture;

                bitmapData = this._rasterizer.render(
                    (previous instanceof RenderTexture) ? previous : undefined,
                    this._id ?? '',
                    width,
                    height,
                    geometry.scale,
                    geometry.getCoordinatePosition(this._normal),
                    this._hasTexture,
                    this._textureOffsetX,
                    this._textureOffsetY,
                    this._textureMaxX,
                    this._textureMaxY,
                    timeSinceStartMs,
                );
            } else {
                const canvas = createPlaneCanvas(width, height);

                fillPlaneCanvas(canvas, this._color);

                bitmapData = new PlaneBitmapData(canvas, -1);
            }

            if (bitmapData) this.cacheTexture(identifier, bitmapData);
        }

        this._activeTexture = this._activeTexture ?? this._textures.get(identifier);

        return this._activeTexture?.texture;
    }

    private cacheTexture(identifier: string, bitmapData: PlaneBitmapData): void {
        const existing = this._textures.get(identifier);

        if (existing) {
            if (existing.texture !== bitmapData.texture) this.releaseTexture(existing.texture);

            existing.dispose();
        }

        this._textures.set(identifier, bitmapData);
        this._activeTexture = bitmapData;
    }

    /**
     * The client's key for a plane whose finished texture can be shared (`PlaneTextureCache`): a
     * floor plane no bigger than a tile each way, with nothing masked out of it. Everything its
     * drawing depends on is in the key, so two planes with one key would draw the same pixels.
     */
    private getSharedTextureKey(geometry: IRoomGeometry): string | undefined {
        const cache = this._sharedTextureCache;

        if (!cache || !this._rasterizer || (this._type !== RoomPlane.TYPE_FLOOR) || this._isHighlighter) return undefined;

        if (this._bitmapMasks.length || this._rectangleMasks.length) return undefined;

        if ((this._leftSide.length > 1) || (this._rightSide.length > 1)) return undefined;

        const normal = geometry.getCoordinatePosition(this._normal);

        return [
            cache.getRasterizerId(this._rasterizer),
            this._id ?? '',
            geometry.scale,
            this._hasTexture,
            this._leftSide.length,
            this._rightSide.length,
            normal?.x,
            normal?.y,
            normal?.z,
            this._textureOffsetX,
            this._textureOffsetY,
            this._textureMaxX,
            this._textureMaxY,
            this._width,
            this._height,
            this._cornerA.x,
            this._cornerA.y,
            this._cornerB.x,
            this._cornerB.y,
            this._cornerC.x,
            this._cornerC.y,
            this._cornerD.x,
            this._cornerD.y,
        ].join('|');
    }

    /** Lets go of the finished texture: back to the pool if it is the plane's own, kept if it is shared. */
    private releasePlaneTexture(): void {
        if (this._planeTexture && !this._sharedTextureCache?.owns(this._planeTexture)) releasePlaneTarget(this._planeTexture);

        this._planeTexture = undefined;
        this._sharedTextureKey = undefined;
        this._textureColor = -1;
    }

    private resetTextureCache(): void {
        // What the shared texture was drawn from has changed: the next pass looks again.
        this._sharedTextureKey = undefined;

        for (const bitmapData of this._textures.values()) {
            this.releaseTexture(bitmapData.texture);

            bitmapData.dispose();
        }

        this._textures.clear();
        this._activeTexture = undefined;
    }

    private releaseTexture(texture: Texture | undefined): void {
        if (texture instanceof RenderTexture) releasePlaneCanvas(texture);
    }

    private updateVisibilityAndCorners(geometry: IRoomGeometry): boolean | undefined {
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

        let relativeDepth
            = (this._depthCorners
                ? Math.max(...this._depthCorners.map(corner => geometry.getScreenPosition(corner)?.z ?? 0))
                : Math.max(this._cornerA.z, this._cornerB.z, this._cornerC.z, this._cornerD.z))
            - geometry.getScreenPosition(this._origin).z;

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
        this._geometryUpdateId = geometry.updateId;

        return undefined;
    }

    private getTextureAndColorForPlane(planeId: string, planeType: number, planeGeometry: IRoomGeometry): { texture: Texture; color: number } {
        const dataType: PlaneDataType = (planeType === RoomPlane.TYPE_FLOOR) ? 'floorData' : 'wallData';
        const planeVisualizationData = GetAssetManager().getCollection('room')?.data?.roomVisualization?.[dataType];
        const plane = planeVisualizationData?.planes?.find(entry => entry.id === planeId)
            ?? planeVisualizationData?.planes?.find(entry => entry.id === 'default');
        const planeVisualization = plane?.visualizations?.find(entry => entry.size === planeGeometry.scale) ?? null;
        const planeLayer = planeVisualization?.allLayers?.[0] as IAssetPlaneVisualizationLayer | undefined;
        const materialId = planeLayer?.materialId;
        const color = planeLayer?.color ?? 0xffffff;
        const inNormalRange = (range: { normalMinX?: number; normalMaxX?: number; normalMinY?: number; normalMaxY?: number }) =>
            this._normal.x >= (range.normalMinX ?? -1)
            && this._normal.x <= (range.normalMaxX ?? 1)
            && this._normal.y >= (range.normalMinY ?? -1)
            && this._normal.y <= (range.normalMaxY ?? 1);
        const material = planeVisualizationData?.materials?.find(entry => entry.id === materialId);
        const matrix = material?.matrices?.find(inNormalRange) ?? material?.matrices?.[0];
        const textureId = matrix?.columns?.[0]?.cells?.[0]?.textureId ?? materialId;
        const bitmaps = planeVisualizationData?.textures?.find(entry => entry.id === textureId)?.bitmaps;
        const assetName = (bitmaps?.find(inNormalRange) ?? bitmaps?.[0])?.assetName ?? '';

        return { texture: GetAssetManager().getAsset(assetName)?.texture ?? Texture.WHITE, color };
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

    /**
     * Flash `draw`'s fast path: a wall or landscape drawn unscaled with a vertical shear of at most
     * one pixel per column (the 2:1 walls, `b = ±0.5`) is copied in column strips, each a pixel
     * lower or higher than the last, rather than resampled through the matrix.
     */
    private isSteppedDraw(matrix: Matrix): boolean {
        return (matrix.a === 1) && (matrix.d === 1) && (matrix.c === 0) && (matrix.b !== 0) && (Math.abs(matrix.b) <= 1)
            && ((this._type === RoomPlane.TYPE_WALL) || (this._type === RoomPlane.TYPE_LANDSCAPE));
    }

    /**
     * Flash `draw`'s column copy. Flash's texture already carries its masks (`updateMask` runs on
     * it before `draw`), so the masked plane is drawn unsheared first and the strips are cut from
     * that: each ends where the accumulated shear reaches a whole pixel, and the next is moved one
     * pixel down (`b > 0`, after the whole plane is lowered one) or up.
     */
    private drawStepped(container: Container, width: number, height: number, matrix: Matrix): void {
        const renderer = TextureUtils.getRenderer();
        const source = TexturePool.createRenderTexture(width, height) ?? RenderTexture.create({ width, height });

        renderer.render({ target: source, container, clear: true });

        const strips = new Container();
        const stepY = (matrix.b > 0) ? 1 : -1;
        const shear = Math.abs(matrix.b);
        const tx = matrix.tx;
        const ty = matrix.ty + ((matrix.b > 0) ? 1 : 0);

        let x = 0;
        let start = 0;
        let accumulated = 0;
        let offsetY = 0;

        const copyStrip = (): void => {
            const sprite = new Sprite(new Texture({ source: source.source, frame: new Rectangle(start, 0, x - start, height) }));

            sprite.position.set(tx + start, ty + offsetY);
            strips.addChild(sprite);
        };

        while (x < width) {
            x++;
            accumulated += shear;

            if (accumulated >= 1) {
                copyStrip();

                start = x;
                offsetY += stepY;
                accumulated = 0;
            }
        }

        if (accumulated > 0) copyStrip();

        renderer.render({ target: this._planeTexture!, container: strips, clear: true });

        for (const strip of strips.children) (strip as Sprite).texture.destroy(false);

        strips.destroy({ children: true });
        TexturePool.releaseTexture(source);
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
                mask.leftSideLoc === leftLocation
                && mask.rightSideLoc === rightLocation
                && mask.leftSideLength === leftLength
                && mask.rightSideLength === rightLength
            ) {
                return false;
            }
        }

        this._rectangleMasks.push(new RoomPlaneRectangleMask(leftLocation, rightLocation, leftLength, rightLength));
        this._maskChanged = true;

        return true;
    }

    private getMergedMasks(geometry: IRoomGeometry, width: number, height: number): Texture | undefined {
        if (!this._useMask || (!this._bitmapMasks.length && !this._rectangleMasks.length)) {
            if (this._maskTexture) {
                // Pooled, and still bound to the alpha mask filter from the last draw.
                TexturePool.releaseTexture(this._maskTexture);
                this._maskTexture = undefined;
            }

            this._maskChanged = false;

            return undefined;
        }

        // Flash updateMask checks bitmap dimensions before accepting the cached mask.
        // A geometry scale change resizes the material even when the door data is unchanged.
        if (!this._maskTexture || this._maskTexture.width !== width || this._maskTexture.height !== height) this._maskChanged = true;

        if (!this._maskChanged || !this._maskManager) return this._maskTexture;

        this._maskChanged = false;

        if (width <= 0 || height <= 0) return undefined;

        const normal = geometry.getCoordinatePosition(this._normal);
        const masks: IMaskEntry[] = [];

        for (const mask of this._bitmapMasks) {
            if (!mask) continue;

            const entry = this._maskManager.getMaskEntry(
                mask.type,
                geometry.scale,
                normal,
                width - ((width * mask.leftSideLoc) / this._leftSide.length),
                height - ((height * mask.rightSideLoc) / this._rightSide.length),
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
                texture: Texture.WHITE,
                position: { x: Math.trunc(posX - wd), y: Math.trunc(posY - ht) },
                size: { width: Math.trunc(wd), height: Math.trunc(ht) },
            });
        }

        if (!masks.length) return undefined;

        if (this._maskTexture && (this._maskTexture.width !== width || this._maskTexture.height !== height)) {
            TexturePool.releaseTexture(this._maskTexture);

            this._maskTexture = undefined;
        }

        if (!this._maskTexture) this._maskTexture = TexturePool.createRenderTexture(width, height);

        const container = new Container();

        for (const entry of masks) {
            const sprite = new Sprite(entry.texture);

            if (entry.position !== undefined) sprite.position.set(entry.position.x, entry.position.y);

            if (entry.size !== undefined) sprite.setSize(entry.size.width, entry.size.height);

            if (entry.scale !== undefined) sprite.scale.set(entry.scale.x, entry.scale.y);

            if (entry.rotation !== undefined) sprite.rotation = entry.rotation;

            container.addChild(sprite);
        }

        TextureUtils.getRenderer().render({
            target: this._maskTexture,
            container,
            clear: true,
        });

        return this._maskTexture;
    }

    public get canBeVisible(): boolean {
        return this._canBeVisible;
    }

    public set canBeVisible(flag: boolean) {
        if (flag === this._canBeVisible) return;

        if (!this._canBeVisible) this.resetTextureCache();

        this._canBeVisible = flag;
    }

    /** Whether the texture still has to be drawn (`update` without `canRasterize`). */
    public get rasterPending(): boolean {
        return this._rasterPending;
    }

    /**
     * Whether the texture on show belongs to another geometry (another scale or view, or none drawn
     * yet) while the current one waits: shown, it would sit in the wrong place. A plane that only
     * waits for its next animation frame keeps showing the last one.
     */
    public get textureOutOfPlace(): boolean {
        return this._rasterPending && (this._drawnGeometryUpdateId !== this._geometryUpdateId);
    }

    /**
     * Where the plane's sprite covers, from its geometry alone - the rectangle its texture fills
     * once drawn, known before it is: the sprite sits at `-offset` and is `width` by `height`.
     */
    public get screenBounds(): Rectangle | undefined {
        if (!this.visible) return undefined;

        return new Rectangle(-this._offset.x, -this._offset.y, this._width, this._height);
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

        this.resetTextureCache();

        // A wall or floor drawn by tiling its material is drawn again for the new one - a wallpaper
        // or floor changed in a room as it stands (`RoomPropertyMessage`) showed nothing otherwise.
        if (this._id !== undefined && !this._rasterizer) this._tiledTypeChanged = true;

        this._id = value;
    }

    /** Flash `hasTexture`: false draws each material as plain white under its layer's colour - `RoomVisualization` sets it on a wall under a tile long. */
    public get hasTexture(): boolean {
        return this._hasTexture;
    }

    public set hasTexture(flag: boolean) {
        this._hasTexture = flag;
    }

    public set rasterizer(value: IPlaneRasterizer | undefined) {
        if (value !== this._rasterizer) this._sharedTextureKey = undefined;

        this._rasterizer = value;
    }

    /**
     * A piece of a longer plane (`RoomVisualization.splitFloorPlane`) sorts as the whole plane
     * did: its depth comes from the whole plane's corners, not its own.
     */
    public setDepthGeometry(location: IVector3D, leftSide: IVector3D, rightSide: IVector3D): void {
        this._depthCorners = [
            location,
            Vector3d.sum(location, leftSide),
            Vector3d.sum(location, rightSide),
            Vector3d.sum(Vector3d.sum(location, leftSide), rightSide),
        ];
    }

    public set sharedTextureCache(value: PlaneTextureCache | undefined) {
        this._sharedTextureCache = value;
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

    /** RoomSpriteCanvas.getColoredBitmapData: cache the quantized tint until this plane changes. */
    public getColoredTexture(color: number): Texture | undefined {
        if (!this._planeTexture || color === 0xFFFFFF) return this._planeTexture;

        if (this._sharedTextureKey && this._sharedTextureCache) {
            const planeTexture = this._planeTexture;

            return this._sharedTextureCache.getColored(this._sharedTextureKey, color, () => {
                const colored = preparePlaneSampling(createPlaneCanvas(planeTexture.width, planeTexture.height));

                copyToPlaneCanvas(colored, planeTexture, 0, 0, undefined, color);

                return colored;
            });
        }

        if (this._coloredTexture && (this._coloredTexture.width !== this._width || this._coloredTexture.height !== this._height)) {
            releasePlaneCanvas(this._coloredTexture);
            this._coloredTexture = undefined;
        }

        if (!this._coloredTexture) this._coloredTexture = preparePlaneSampling(createPlaneCanvas(this._width, this._height));

        if (this._textureColor !== color) {
            TextureUtils.getRenderer().render({ target: this._coloredTexture, container: new Container(), clear: true });
            copyToPlaneCanvas(this._coloredTexture, this._planeTexture, 0, 0, undefined, color);
            ExtendedSprite.removeHitmap(this._coloredTexture.source);
            this._textureColor = color;
        }

        return this._coloredTexture;
    }

    public get isHighlighter(): boolean {
        return this._isHighlighter;
    }

    public set isHighlighter(flag: boolean) {
        this._isHighlighter = flag;
    }
}
