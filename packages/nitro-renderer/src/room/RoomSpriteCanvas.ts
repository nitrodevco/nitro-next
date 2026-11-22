import {
    IRoom,
    IRoomGeometry,
    IRoomObject,
    IRoomObjectSprite,
    IRoomObjectSpriteVisualization,
    IRoomRenderingCanvas,
    IRoomSpriteMouseEvent,
    MouseEventType, RoomGeometryScaleType,
    RoomObjectSpriteData,
    RoomObjectSpriteTypeEnum, RoomObjectVariableEnum, RoomSpriteMouseEvent, Vector3d } from '@nitrodevco/nitro-api';
import { Container, Graphics, Matrix, Point, Rectangle, Sprite, Text, TextStyle, Texture } from 'pixi.js';

import { ExtendedSprite, GetTicker, TextureUtils } from '../utils';
import { RoomObjectCache, RoomObjectCacheItem } from './object';
import {
    ObjectMouseData,
    RoomEnterEffect,
    RoomGeometry,
    RoomRotatingEffect,
    RoomShakingEffect,
    SortableSprite,
} from './utils';
import { RoomDownsampleFilter } from './utils/RoomDownsampleFilter';
import { drawnRoomSpriteShift, snapRoomSpriteCoordinate } from './utils/snapRoomSpriteCoordinate';

/**
 * One view of a room: every object's sprites, sorted by depth into one display, with the mouse
 * events that reach them. Ports Flash `com.sulake.room.renderer.RoomSpriteCanvas`.
 */
export class RoomSpriteCanvas implements IRoomRenderingCanvas {
    private _room: IRoom;
    private _geometry: IRoomGeometry;
    private _renderTimestamp: number = 0;

    private _master: Container | undefined = undefined;
    private _roomLayer: Container | undefined = undefined;
    private _display: Container | undefined = undefined;
    // A Graphics rectangle rather than a Sprite: Pixi masks a Sprite through an alpha-mask
    // filter (screen-sized render textures per masked object, and misrendering when several
    // rooms are masked in one frame), while a rect Graphics is a plain stencil/scissor mask.
    private _mask: Graphics | undefined = undefined;
    private _background: Sprite | undefined = undefined;
    private _downsampleFilter: RoomDownsampleFilter | undefined = undefined;
    private _compositeZoom: boolean = false;
    /** `drawnRoomSpriteShift` on each axis for this frame: where every sprite's picture is drawn, in screen pixels from its x / y. */
    private _drawShiftX: number = 0;
    private _drawShiftY: number = 0;

    private _sortableSprites: SortableSprite[] = [];
    private _spriteCount: number = 0;
    private _activeSpriteCount: number = 0;
    private _spritePool: ExtendedSprite[] = [];
    private _skipObjectUpdate: boolean = false;
    private _runningSlow: boolean = false;

    private _width: number = 0;
    private _height: number = 0;
    private _renderedWidth: number = 0;
    private _renderedHeight: number = 0;
    private _screenOffsetX: number = 0;
    private _screenOffsetY: number = 0;
    private _mouseLocation: Point = new Point();
    private _mouseOldX: number = 0;
    private _mouseOldY: number = 0;
    private _mouseCheckCount: number = 0;
    private _mouseSpriteWasHit: boolean = false;
    private _mouseActiveObjects: Map<string, ObjectMouseData> = new Map();
    private _eventCache: Map<string, IRoomSpriteMouseEvent> = new Map();
    private _checkedSprites = new Set<string>();
    private _mouseOutKeys: string[] = [];
    private _eventId: number = 0;
    private _scale: number = 1;
    private _isFlipped: boolean = false;

    private _SafeStr_4507: boolean = false;
    private _rotation: number = 0;
    private _rotationOrigin: Vector3d | undefined = undefined;
    private _rotationRodLength: number = 0;
    private _effectDirection: Vector3d;
    private _effectLocation: Vector3d;
    private _SafeStr_795: number = 0;

    private _noSpriteVisibilityChecking: boolean = false;
    private _usesExclusionRectangles: boolean = false;
    private _usesMask: boolean = true;
    private _backgroundVisible: boolean = true;
    private _compositedByParent: boolean = false;
    private _zDirty: boolean = false;

    /*
     * `calculateUpdateInterval`'s bookkeeping for the fps counter: the frames before the first
     * sample, the frames and their intervals and render times in the sample being taken, the last
     * sample's averages, the last really slow frame and how long the last render took.
     */
    private _fpsCounterEnabled: boolean = false;
    private _fpsText: Text | undefined = undefined;
    private _pingMs: number = -1;
    private _framesBeforeSampling: number = 0;
    private _sampledFrames: number = 0;
    private _sampledIntervalTotal: number = 0;
    private _sampledRenderTimeTotal: number = 0;
    private _averageInterval: number = 0;
    private _averageRenderTime: number = 0;
    private _haltedTime: number = 0;
    private _renderTime: number = 0;

    /** The JS port's 24 ms and 18 ms against its 60 fps frame: into and out of frame skipping. */
    private static readonly RUNNING_SLOW_ENTER_RATIO = 24 / (1000 / 60);
    private static readonly RUNNING_SLOW_LEAVE_RATIO = 18 / (1000 / 60);

    private static readonly _zComparator = (a: SortableSprite, b: SortableSprite): number => b.z - a.z;

    /**
     * Sorts the sprites back to front - the same order as a stable `sort` by `_zComparator`. The list
     * keeps last frame's order, so when something moves it is nearly sorted and an insertion sort
     * finishes in about one pass, where `Array.sort` allocated merge buffers (50-150KB in a busy room)
     * on every frame anything moved. A list far out of order (a room still loading) goes to `sort`.
     */
    private static sortByZ(sprites: SortableSprite[]): void {
        const length = sprites.length;
        const moveLimit = (length * 8) + 64;

        let moves = 0;

        for (let i = 1; i < length; i++) {
            const sprite = sprites[i];
            const z = sprite.z;

            let j = i - 1;

            if (!(z > sprites[j].z)) continue;

            do {
                sprites[j + 1] = sprites[j];
                j--;
                moves++;
            } while ((j >= 0) && (z > sprites[j].z));

            sprites[j + 1] = sprite;

            // Only ever moved past strictly lower sprites, so equal ones keep their order and `sort`
            // finishes exactly as it would have from the start.
            if (moves > moveLimit) {
                sprites.sort(RoomSpriteCanvas._zComparator);

                return;
            }
        }
    }

    private _objectCache: RoomObjectCache;

    constructor(
        room: IRoom,
        width: number,
        height: number,
        scale: RoomGeometryScaleType,
    ) {
        this._room = room;
        this._geometry = new RoomGeometry(
            scale,
            new Vector3d(-135, 30, 0),
            new Vector3d(11, 11, 5),
            new Vector3d(-135, 0.5, 0),
        );
        // `RoomEngine.createRoomCanvas` gives every renderer `object_accurate_z_value` as its accurate-z variable.
        this._objectCache = new RoomObjectCache(RoomObjectVariableEnum.ObjectAccurateZValue);

        this.setupCanvas();
        this.initialize(width, height);
    }

    private setupCanvas(): void {
        if (!this._master) this._master = new Container();

        this._master.eventMode = 'static';
        this._master.interactiveChildren = false;
        this._master.cullableChildren = false;

        if (!this._roomLayer) {
            this._roomLayer = new Container();
            this._master.addChild(this._roomLayer);
        }

        if (!this._display) {
            const display = new Container();

            display.isRenderGroup = false;
            display.cullableChildren = false;

            this._roomLayer.addChild(display);

            this._display = display;

            // Its sprites draw room textures; one destroyed must not stay in a cached batch.
            TextureUtils.watchBatches(display);
        }
    }

    public dispose(): void {
        this._downsampleFilter?.destroy();
        this._downsampleFilter = undefined;

        if (this._display) TextureUtils.unwatchBatches(this._display);

        this.cleanSprites(0, true);

        if (this._geometry) {
            this._geometry.dispose();
        }

        // setMask(false) detaches the mask, so dispose it even outside the room layer.
        this._mask?.destroy();
        this._mask = undefined;

        if (this._objectCache) {
            this._objectCache.dispose();

            this._objectCache = undefined!;
        }

        // A canvas drawn inside this one's room layer, under its display - a client module's secondary
        // room - is its own room's to dispose: let go of here, not destroyed with the layer.
        if (this._roomLayer) {
            for (const child of [ ...this._roomLayer.children ]) {
                if ((child !== this._background) && (child !== this._display) && (child !== this._mask)) this._roomLayer.removeChild(child);
            }
        }

        if (this._master) {
            while (this._master.children.length) {
                const child = this._master.removeChildAt(0);

                child.destroy({ children: child === this._roomLayer });
            }

            if (this._master.parent) this._master.parent.removeChild(this._master);

            this._master.destroy();

            this._master = undefined;
            this._roomLayer = undefined;
        }

        this._display = undefined;
        this._background = undefined;
        this._sortableSprites = [];

        if (this._mouseActiveObjects) this._mouseActiveObjects.clear();

        if (this._spritePool) {
            for (const sprite of this._spritePool) {
                this.cleanSprite(sprite, true);
            }

            this._spritePool = [];
        }

        if (this._eventCache) this._eventCache.clear();
    }

    public initialize(width: number, height: number): void {
        width = width < 1 ? 1 : width;
        height = height < 1 ? 1 : height;

        if (width === this._width && height === this._height) return;

        if (!this._background) {
            this._background = new Sprite(Texture.WHITE);

            this._background.tint = 0;
            this._background.width = width;
            this._background.height = height;
            this._background.visible = this._backgroundVisible;

            if (this._roomLayer) this._roomLayer.addChildAt(this._background, 0);
        } else {
            this._background.width = width;
            this._background.height = height;
        }

        if (this._usesMask) {
            if (!this._mask) {
                this._mask = new Graphics().rect(0, 0, width, height).fill(0xffffff);

                if (this._roomLayer) {
                    this._roomLayer.addChild(this._mask);

                    if (this._display) this._display.mask = this._mask;
                }
            } else {
                this._mask.clear().rect(0, 0, width, height).fill(0xffffff);
            }
        }

        if (this._master) {
            if (this._master.filterArea) {
                const filterArea = this._master.filterArea;

                filterArea.width = width;
                filterArea.height = height;
            } else {
                this._master.filterArea = new Rectangle(0, 0, width, height);
            }

            this._master.hitArea = new Rectangle(0, 0, width, height);
        }

        this._width = width;
        this._height = height;
        this.positionFpsText();
        this.updateZoomSampling();
    }

    /** Whether the canvas paints its black backing (`setBackgroundVisible`). */
    public get backgroundVisible(): boolean {
        return this._backgroundVisible;
    }

    /** Whether another room canvas's half-size pass draws this one (`setCompositedByParent`). */
    public get compositedByParent(): boolean {
        return this._compositedByParent;
    }

    /**
     * Not Flash's: a canvas drawn inside another room canvas's room layer (a client module's secondary
     * room) is reduced to half size by that canvas's pass at zoom 0, so it runs none of its own: a
     * second pass nested in the first renders at the filter's resolution into the wrong part of the
     * outer texture, leaving the room clipped to the top left quarter of the screen.
     */
    public setCompositedByParent(flag: boolean): void {
        if (this._compositedByParent === flag) return;

        this._compositedByParent = flag;
        this.updateZoomSampling();
    }

    public setBackgroundVisible(flag: boolean): void {
        this._backgroundVisible = flag;

        if (this._background) this._background.visible = flag;

        // Without the opaque background under them, additive sprites go back to the `add` blend at once.
        if (!flag && this._display) for (const child of this._display.children) {
            if (!(child instanceof ExtendedSprite) || !child.batchAdditive) continue;

            child.batchAdditive = false;
            child.blendMode = 'add';
        }
    }

    /**
     * Sets the sprite's blend mode. An `add` sprite is drawn with the normal blend in its
     * neighbours' batch (`AdditiveBatcher`) where that is the same picture: over the room's opaque
     * background (the batched sprite leaves the destination's alpha as it was, `add` raises it),
     * not through a filter pass (which composites the sprite's own output alpha), and not rounded
     * by Pixi (whose round-pixels flag the additive mark sits beside).
     */
    private applyBlendMode(extendedSprite: ExtendedSprite, blendMode: ExtendedSprite['blendMode'], filters: readonly unknown[] | undefined): void {
        const batchAdditive = (blendMode === 'add') && this._backgroundVisible && !filters?.length && !extendedSprite.roundPixels;
        const mode = batchAdditive ? 'normal' : blendMode;

        if (extendedSprite.blendMode !== mode) extendedSprite.blendMode = mode;

        extendedSprite.batchAdditive = batchAdditive;
    }

    public setMask(flag: boolean): void {
        if (!this._master || !this._display) return;

        if (flag && !this._usesMask) {
            this._usesMask = true;

            if (this._mask && this._mask.parent !== this._roomLayer) {
                this._roomLayer?.addChild(this._mask);

                this._display.mask = this._mask;
            }
        } else if (!flag && this._usesMask) {
            this._usesMask = false;

            if (this._mask && this._mask.parent === this._roomLayer) {
                this._roomLayer?.removeChild(this._mask);

                this._display.mask = null;
            }
        }

        this.updateZoomSampling();
    }

    public setScale(
        scale: number,
        point: Point | undefined = undefined,
        offsetPoint: Point | undefined = undefined,
    ): void {
        this.setTransform(Math.abs(scale), this._isFlipped, point, offsetPoint);
    }

    /** Flash `RoomSpriteCanvas.setFlip`: invert both display axes around the requested pivot. */
    public setFlip(flipped: boolean, point?: Point, offsetPoint?: Point): void {
        this.setTransform(this._scale, flipped, point, offsetPoint);
    }

    private get displayScale(): number {
        return this._isFlipped ? -this._scale : this._scale;
    }

    public get isFlipped(): boolean {
        return this._isFlipped;
    }

    /** Flash `RoomSpriteCanvas.setTransform`, including consecutive changes before a render. */
    private setTransform(scale: number, flipped: boolean, point?: Point, offsetPoint?: Point): void {
        if (!this._master || !this._display) return;

        if (!point) point = new Point(this._width / 2, this._height / 2);

        if (!offsetPoint) offsetPoint = point;

        const local = new Point(
            (point.x - this.screenOffsetX) / this.displayScale,
            (point.y - this.screenOffsetY) / this.displayScale,
        );

        this._scale = scale;
        this._isFlipped = flipped;

        this.screenOffsetX = offsetPoint.x - local.x * this.displayScale;
        this.screenOffsetY = offsetPoint.y - local.y * this.displayScale;
    }

    public render(time: number, update: boolean = false): void {
        if (time === -1) time = this._renderTimestamp + 1;

        this._skipObjectUpdate = !this._skipObjectUpdate;

        if (!this._geometry || time === this._renderTimestamp) return;

        const renderStart = performance.now();

        // RotatingRoomSpriteCanvas.render: the rotating and shaking room effects move the geometry
        // before each frame is drawn. Once per frame, so a re-entrant render(-1) does not step them twice.
        this.doMagic();

        this.updateZoomSampling();

        if (this._width !== this._renderedWidth || this._height !== this._renderedHeight) update = true;

        if (this._display && (this._display.x !== this._screenOffsetX || this._display.y !== this._screenOffsetY || this._display.scale.x !== this.displayScale)) {
            // Flash assigns the offset unrounded: `renderObject` snaps each sprite against this
            // exact offset (`snapRoomSpriteCoordinate`), so flooring it here moves every sprite
            // off the pixel grid, and a fractional offset would never compare equal again.
            this._display.x = this._screenOffsetX;
            this._display.y = this._screenOffsetY;
            this._display.scale.set(this.displayScale);

            update = true;
        }

        // One shift moves the whole picture. Not for the half-size composite or a flipped room:
        // their pixels are placed differently.
        const drawShift = !this._compositeZoom && !this._isFlipped;

        this._drawShiftX = drawShift ? drawnRoomSpriteShift(this._screenOffsetX) : 0;
        this._drawShiftY = drawShift ? drawnRoomSpriteShift(this._screenOffsetY) : 0;

        let spriteCount = 0;

        this._zDirty = false;

        const objects = this._room.objects;

        for (const object of objects.values()) {
            if (!object) continue;

            spriteCount = spriteCount + this.renderObject(object, time, update, spriteCount);
        }

        if (this._zDirty || spriteCount !== this._sortableSprites.length) {
            RoomSpriteCanvas.sortByZ(this._sortableSprites);

            update = true;
        }

        if (spriteCount < this._sortableSprites.length) this._sortableSprites.length = spriteCount;

        let iterator = 0;

        while (iterator < spriteCount) {
            const sprite = this._sortableSprites[iterator];

            if (sprite && sprite.sprite) this.renderSprite(iterator, sprite, update);

            iterator++;
        }

        this.cleanSprites(spriteCount);

        this._renderTime = performance.now() - renderStart;

        this.calculateUpdateInterval(time);

        this._renderTimestamp = time;
        this._renderedWidth = this._width;
        this._renderedHeight = this._height;
    }

    /**
     * Flash `calculateUpdateInterval`, the fps counter's half: after the first 50 frames, every 50
     * frames the average interval between them and the average time their renders took become the
     * counter's text (`fps`, `frame time`, the ping first when one is known), with the last frame
     * of over 180 ms since the previous text as `halted`.
     *
     * The same average switches the frame skipping mode (`_runningSlow`), in which a furni's
     * sprites are rebuilt only every other frame while its animation runs on. Flash enters it over
     * a 60 ms average and leaves it under 50 ms; Habbo's JS port, drawing at up to 60 fps, over
     * 24 ms and under 18 ms. Here those are taken as shares of the ticker's own frame, as
     * `fps.limit` sets it, so a lower cap is not slow in itself.
     */
    private calculateUpdateInterval(time: number): void {
        if (this._renderTimestamp <= 0) return;

        const interval = time - this._renderTimestamp;

        if (interval <= 0) return;

        // Flash's frame times are whole milliseconds (`getTimer`); the ticker's are not.
        if (interval > (60 * 3)) this._haltedTime = Math.trunc(interval);

        this._framesBeforeSampling++;

        if (this._framesBeforeSampling <= 50) return;

        this._sampledFrames++;
        this._sampledIntervalTotal += interval;
        this._sampledRenderTimeTotal += this._renderTime;

        if (this._sampledFrames < 50) return;

        this._averageInterval = this._sampledIntervalTotal / this._sampledFrames;
        this._averageRenderTime = this._sampledRenderTimeTotal / this._sampledFrames;
        this._sampledFrames = 0;
        this._sampledIntervalTotal = 0;
        this._sampledRenderTimeTotal = 0;

        const maxFPS = GetTicker().maxFPS;
        const frameInterval = 1000 / ((maxFPS > 0) ? maxFPS : 60);

        if (!this._runningSlow && (this._averageInterval > (frameInterval * RoomSpriteCanvas.RUNNING_SLOW_ENTER_RATIO))) this._runningSlow = true;
        else if (this._runningSlow && (this._averageInterval < (frameInterval * RoomSpriteCanvas.RUNNING_SLOW_LEAVE_RATIO))) this._runningSlow = false;

        if (this._fpsCounterEnabled && this._fpsText) {
            const fps = (1000 / this._averageInterval).toFixed(1);
            const frameTime = (this._averageRenderTime < 1) ? '<1.0' : this._averageRenderTime.toFixed(1);

            let text = '';

            if (this._pingMs >= 0) text += 'ping: ' + this._pingMs + 'ms\n';

            text += 'fps: ' + fps + '\n' + 'frame time: ' + frameTime + 'ms';

            if (this._haltedTime > 0) text += '\nhalted ' + this._haltedTime + 'ms';

            this._fpsText.text = text;
        }

        this._haltedTime = 0;
    }

    /**
     * Flash's counter `TextField`: Verdana 9 in 0xFF5500, right aligned in a 100 x 60 box 20 px in
     * from the right edge and 60 px up from the bottom. Flash builds it with every canvas; here it
     * is made the first time a counter is turned on, over the room in the canvas's master.
     */
    private createFpsText(): Text | undefined {
        if (this._fpsText || !this._master) return this._fpsText;

        this._fpsText = new Text({
            text: '',
            style: new TextStyle({
                fontFamily: 'Verdana',
                fontSize: 9,
                fill: 0xFF5500,
                align: 'right',
            }),
        });

        this._fpsText.anchor.x = 1;
        this._fpsText.eventMode = 'none';

        this._master.addChild(this._fpsText);
        this.positionFpsText();

        return this._fpsText;
    }

    /** `initialize`: the box's right edge, less the `TextField`'s 2 px gutter, and its top plus the gutter. */
    private positionFpsText(): void {
        if (!this._fpsText) return;

        this._fpsText.x = this._width - (100 + 20) + 100 - 2;
        this._fpsText.y = this._height - (60 + 60) + 2;
    }

    public get fpsCounterEnabled(): boolean {
        return this._fpsCounterEnabled;
    }

    /** Flash `set fpsCounterEnabled`: turning it off empties the text; on, it fills at the next sample. */
    public set fpsCounterEnabled(flag: boolean) {
        this._fpsCounterEnabled = flag;

        if (flag) this.createFpsText();
        else if (this._fpsText) this._fpsText.text = '';
    }

    public get pingMs(): number {
        return this._pingMs;
    }

    /** Flash `set pingMs`, which `RoomEngine.update` gives the active canvas every frame. */
    public set pingMs(ping: number) {
        this._pingMs = ping;
    }

    public skipSpriteVisibilityChecking(): void {
        this._noSpriteVisibilityChecking = true;

        this.render(-1, true);
    }

    public resumeSpriteVisibilityChecking(): void {
        this._noSpriteVisibilityChecking = false;
    }

    public getSortableSpriteList(): RoomObjectSpriteData[] {
        return this._objectCache.getSortableSpriteList();
    }

    public getPlaneSortableSprites(): SortableSprite[] {
        return this._objectCache.getPlaneSortableSprites();
    }

    public removeFromCache(identifier: number): void {
        this._objectCache.removeObjectCache(identifier);
    }

    /** Join the existing depth-sorted pixels before reducing the room to half size. */
    private updateZoomSampling(): void {
        if (!this._master || !this._display || !this._roomLayer) return;

        const composite = this._scale === 0.5;

        if (composite) {
            this._downsampleFilter ??= new RoomDownsampleFilter();
            this._downsampleFilter.resolution = TextureUtils.getRenderer().resolution * 2;
        }

        this._compositeZoom = composite;

        const pass = composite && !this._compositedByParent;

        if (((this._roomLayer.filters?.length ?? 0) > 0) !== pass) this._roomLayer.filters = pass ? [ this._downsampleFilter! ] : [];

        this._roomLayer.filterArea = this._usesMask ? this._master.filterArea : undefined;

        // The room layer's viewport filterArea supplies the same rectangular clipping.
        // A stencil inside this offscreen pass can leak into subsequent UI draws.
        const mask = composite ? null : (this._usesMask ? this._mask ?? null : null);

        if (this._display.mask !== mask) this._display.mask = mask;
        if (this._mask) this._mask.visible = !composite;
    }

    private renderObject(
        object: IRoomObject,
        time: number,
        update: boolean,
        count: number,
    ): number {
        if (!object) return 0;

        const visualization = object.visualization as IRoomObjectSpriteVisualization;

        if (!visualization) {
            this.removeFromCache(object.instanceId);

            return 0;
        }

        const cache = this.getCacheItem(object.instanceId);
        cache.objectId = object.instanceId;

        const locationCache = cache.location;
        const sortableCache = cache.sprites;

        const vector = locationCache.updateLocation(object, this._geometry);

        if (!vector) {
            this.removeFromCache(object.instanceId);

            return 0;
        }

        visualization.update(
            this._geometry,
            time,
            !sortableCache.isEmpty || update,
            this._skipObjectUpdate && this._runningSlow,
        );

        if (locationCache.locationChanged) update = true;

        if (!sortableCache.needsUpdate(visualization.instanceId, visualization.updateSpriteCounter) && !update) return sortableCache.spriteCount;

        let x = vector.x;
        let y = vector.y;
        let z = vector.z;

        if (x > 0) z = z + x * 1.2e-7;
        else z = z + -x * 1.2e-7;

        x = x + (this._width >> 1);
        y = y + (this._height >> 1);

        const screenOffsetX = this._screenOffsetX;
        const screenOffsetY = this._screenOffsetY;

        let spriteCount = 0;

        // Flash: the visualization's sprites, then its additional ones (`IPlaneVisualization.getAdditionalSprite`).
        const sprites = visualization.sprites;
        const totalSprites = sprites.length + (visualization.additionalSpriteCount ?? 0);

        for (let index = 0; index < totalSprites; index++) {
            const sprite = (index < sprites.length) ? sprites[index] : visualization.getAdditionalSprite(index - sprites.length);

            if (!sprite || !sprite.visible) continue;

            const texture = sprite.texture;
            const baseTexture = texture && texture.source;

            if (!texture || !baseTexture) continue;

            // The composite's source grid has two pixels per screen pixel at zoom 0.
            // A flipped display maps `coordinate` to `offset - coordinate * scale`, so the snap takes the sign.
            const samplingScale = (this._compositeZoom ? 1 : this._scale) * (this._isFlipped ? -1 : 1);
            const samplingOffset = this._compositeZoom ? 2 : 1;
            const spriteX = snapRoomSpriteCoordinate(x + sprite.offsetX, screenOffsetX * samplingOffset, samplingScale) + screenOffsetX;
            const spriteY = snapRoomSpriteCoordinate(y + sprite.offsetY, screenOffsetY * samplingOffset, samplingScale) + screenOffsetY;

            // `rectangleVisible` on the snapped position. Flash drew a flipped sprite from a mirrored
            // copy of its bitmap, so it still started at its x; here the sprite is mirrored in place
            // (`scale -1`) and reaches back from it, so the rectangle starts a width (or height) earlier.
            const visibleX = sprite.flipH ? (spriteX - texture.width) : spriteX;
            const visibleY = sprite.flipV ? (spriteY - texture.height) : spriteY;

            if (!this.isSpriteVisible(visibleX, visibleY, texture.width, texture.height)) continue;

            let sortableSprite = sortableCache.getSprite(spriteCount);

            if (!sortableSprite) {
                sortableSprite = new SortableSprite();

                sortableCache.addSprite(sortableSprite);

                this._sortableSprites.push(sortableSprite);

                sortableSprite.name = `${object.instanceId}`;
            }

            sortableSprite.sprite = sprite;

            if (
                sprite.spriteType === RoomObjectSpriteTypeEnum.Avatar
                || sprite.spriteType === RoomObjectSpriteTypeEnum.AvatarOwn
            ) {
                sortableSprite.sprite.libraryAssetName = 'avatar_' + object.id;
            }

            sortableSprite.x = spriteX - screenOffsetX;
            sortableSprite.y = spriteY - screenOffsetY;

            const newZ = z + sprite.relativeDepth + 3.7e-11 * count;

            if (!this._zDirty && newZ !== sortableSprite.z) this._zDirty = true;

            sortableSprite.z = newZ;

            spriteCount++;
            count++;
        }

        sortableCache.setSpriteCount(spriteCount);

        return spriteCount;
    }

    private getExtendedSprite(index: number): ExtendedSprite | undefined {
        return this._display?.getChildAt<ExtendedSprite>(index);
    }

    protected getExtendedSpriteIdentifier(sprite: ExtendedSprite): string {
        return sprite?.label ?? '';
    }

    private renderSprite(index: number, sprite: SortableSprite, update: boolean = false): boolean {
        if (index >= this._spriteCount) {
            this.createAndAddSprite(sprite);

            return true;
        }

        if (!sprite) return false;

        const objectSprite = sprite.sprite;
        const extendedSprite = this.getExtendedSprite(index);

        if (!objectSprite || !extendedSprite) return false;

        if (extendedSprite.varyingDepth !== objectSprite.varyingDepth) {
            if (extendedSprite.varyingDepth && !objectSprite.varyingDepth) {
                this._display?.removeChildAt(index);

                this._spritePool.push(extendedSprite);

                return this.renderSprite(index, sprite, update);
            }

            this.createAndAddSprite(sprite, index);

            return true;
        }

        if (
            extendedSprite.needsUpdate(objectSprite.id, objectSprite.updateCounter)
            || RoomEnterEffect.isVisualizationOn()
        ) {
            extendedSprite.tag = objectSprite.tag;
            extendedSprite.alphaTolerance = objectSprite.alphaTolerance;
            extendedSprite.label = sprite.name;
            extendedSprite.varyingDepth = objectSprite.varyingDepth;
            extendedSprite.clickHandling = objectSprite.clickHandling;
            extendedSprite.skipMouseHandling = objectSprite.skipMouseHandling;
            extendedSprite.setFilters(objectSprite.filters);

            const alpha = objectSprite.alpha / 255;

            if (extendedSprite.alpha !== alpha) extendedSprite.alpha = alpha;

            if (extendedSprite.tint !== objectSprite.color) extendedSprite.tint = objectSprite.color;

            this.applyBlendMode(extendedSprite, objectSprite.blendMode, objectSprite.filters);

            if (extendedSprite.texture !== objectSprite.texture) extendedSprite.setTexture(objectSprite.texture);

            if (objectSprite.flipH) {
                if (extendedSprite.scale.x !== -1) extendedSprite.scale.x = -1;
            } else if (extendedSprite.scale.x !== 1) extendedSprite.scale.x = 1;

            if (objectSprite.flipV) {
                if (extendedSprite.scale.y !== -1) extendedSprite.scale.y = -1;
            } else if (extendedSprite.scale.y !== 1) extendedSprite.scale.y = 1;

            this.updateEnterRoomEffect(extendedSprite, objectSprite);

            update = true;
        }

        const posChanged = extendedSprite.x !== sprite.x || extendedSprite.y !== sprite.y;
        const offsetChanged = extendedSprite.offsetX !== objectSprite.offsetX || extendedSprite.offsetY !== objectSprite.offsetY;

        if (posChanged || offsetChanged) update = true;

        extendedSprite.x = sprite.x;
        extendedSprite.y = sprite.y;

        this.placeDrawShift(extendedSprite);

        extendedSprite.offsetX = objectSprite.offsetX;
        extendedSprite.offsetY = objectSprite.offsetY;

        return true;
    }

    /**
     * Draws the picture where Flash shows it (`drawnRoomSpriteShift`) and leaves x / y where
     * `renderObject` put them: mouse hits stay on those, as `RoomSpriteCanvas.checkMouseHits` tests them.
     */
    private placeDrawShift(extendedSprite: ExtendedSprite): void {
        const pivotX = this._drawShiftX ? -this._drawShiftX / (extendedSprite.scale.x * this._scale) : 0;
        const pivotY = this._drawShiftY ? -this._drawShiftY / (extendedSprite.scale.y * this._scale) : 0;

        if (extendedSprite.pivot.x !== pivotX || extendedSprite.pivot.y !== pivotY) extendedSprite.pivot.set(pivotX, pivotY);
    }

    private createAndAddSprite(sortableSprite: SortableSprite, index: number = -1): void {
        const sprite = sortableSprite.sprite;

        if (!sprite) return;

        let extendedSprite: ExtendedSprite | undefined = undefined;

        if (this._spritePool.length > 0) extendedSprite = this._spritePool.pop();

        let textureSet = false;

        if (!extendedSprite) {
            extendedSprite = new ExtendedSprite({
                texture: sprite.texture,
            });

            textureSet = true;
        }

        if (extendedSprite.children.length) extendedSprite.removeChildren();

        extendedSprite.tag = sprite.tag;
        extendedSprite.alphaTolerance = sprite.alphaTolerance;
        extendedSprite.alpha = sprite.alpha / 255;
        extendedSprite.tint = sprite.color;
        extendedSprite.x = sortableSprite.x;
        extendedSprite.y = sortableSprite.y;
        extendedSprite.offsetX = sprite.offsetX;
        extendedSprite.offsetY = sprite.offsetY;
        extendedSprite.label = sprite.name;
        extendedSprite.varyingDepth = sprite.varyingDepth;
        extendedSprite.clickHandling = sprite.clickHandling;
        extendedSprite.skipMouseHandling = sprite.skipMouseHandling;
        extendedSprite.setFilters(sprite.filters);
        this.applyBlendMode(extendedSprite, sprite.blendMode, sprite.filters);

        if (!textureSet) extendedSprite.setTexture(sprite.texture);

        if (sprite.flipH) extendedSprite.scale.x = -1;

        if (sprite.flipV) extendedSprite.scale.y = -1;

        this.placeDrawShift(extendedSprite);

        this.updateEnterRoomEffect(extendedSprite, sprite);

        if (index < 0 || index >= this._spriteCount) {
            this._display?.addChild(extendedSprite);

            this._spriteCount++;
        } else {
            this._display?.addChildAt(extendedSprite, index);
        }

        this._activeSpriteCount++;
    }

    private cleanSprites(spriteCount: number, _arg_2: boolean = false): void {
        if (!this._display) return;

        if (spriteCount < 0) spriteCount = 0;

        if (spriteCount < this._activeSpriteCount || !this._activeSpriteCount) {
            let iterator = this._spriteCount - 1;

            while (iterator >= spriteCount) {
                const sprite = this.getExtendedSprite(iterator);

                if (sprite) this.cleanSprite(sprite, _arg_2);

                iterator--;
            }
        }

        this._activeSpriteCount = spriteCount;
    }

    private updateEnterRoomEffect(sprite: ExtendedSprite, spriteData: IRoomObjectSprite): void {
        if (!RoomEnterEffect.isVisualizationOn() || !spriteData) return;

        switch (spriteData.spriteType) {
            case RoomObjectSpriteTypeEnum.AvatarOwn:
                return;
            case RoomObjectSpriteTypeEnum.RoomPlane:
                sprite.alpha = RoomEnterEffect.getDelta(0.9);
                return;
            case RoomObjectSpriteTypeEnum.Avatar:
                sprite.alpha = RoomEnterEffect.getDelta(0.5);
                return;
            default:
                sprite.alpha = RoomEnterEffect.getDelta(0.1);
        }
    }

    private cleanSprite(sprite: ExtendedSprite, _arg_2: boolean): void {
        if (!sprite) return;

        if (!_arg_2) {
            sprite.setTexture(Texture.EMPTY);
        } else {
            if (sprite.parent) sprite.parent.removeChild(sprite);

            sprite.destroy({
                children: true,
            });
        }
    }

    public update(): void {
        this._mouseCheckCount = 0;

        this._eventId++;
    }

    private getCacheItem(id: number): RoomObjectCacheItem {
        return this._objectCache.getObjectCache(id);
    }

    private isSpriteVisible(x: number, y: number, width: number, height: number): boolean {
        if (this._noSpriteVisibilityChecking) return true;

        x = (x - this._screenOffsetX) * this.displayScale + this._screenOffsetX;
        y = (y - this._screenOffsetY) * this.displayScale + this._screenOffsetY;
        width = width * this.displayScale;
        height = height * this.displayScale;

        if (width < 0) {
            x += width;
            width = -width;
        }

        if (height < 0) {
            y += height;
            height = -height;
        }

        if (x < this._width && x + width >= 0 && y < this._height && y + height >= 0) {
            if (!this._usesExclusionRectangles) return true;
        }

        return false;
    }

    public handleMouseEvent(
        x: number,
        y: number,
        type: string,
        altKey: boolean,
        ctrlKey: boolean,
        shiftKey: boolean,
        buttonDown: boolean,
    ): boolean {
        x = x - this._screenOffsetX;
        y = y - this._screenOffsetY;

        this._mouseLocation.x = x / this.displayScale;
        this._mouseLocation.y = y / this.displayScale;

        if (this._mouseCheckCount > 0 && type == MouseEventType.MOUSE_MOVE) return this._mouseSpriteWasHit;

        // Flash's `clickHandler`, the display's own click listener: sprites with a click url get
        // their clicks here, since `checkMouseHits` passes them over.
        if ((type === MouseEventType.MOUSE_CLICK) || (type === MouseEventType.DOUBLE_CLICK)) {
            this.checkMouseClickHits(
                Math.trunc(x / this.displayScale),
                Math.trunc(y / this.displayScale),
                (type === MouseEventType.DOUBLE_CLICK),
                altKey,
                ctrlKey,
                shiftKey,
                buttonDown,
            );
        }

        this._mouseSpriteWasHit = this.checkMouseHits(
            Math.trunc(x / this.displayScale),
            Math.trunc(y / this.displayScale),
            type,
            altKey,
            ctrlKey,
            shiftKey,
            buttonDown,
        );

        this._mouseCheckCount++;

        return this._mouseSpriteWasHit;
    }

    /** `checkMouseClickHits`: a click or double click, for the sprites that handle their own. */
    private checkMouseClickHits(
        x: number,
        y: number,
        doubleClick: boolean,
        altKey: boolean = false,
        ctrlKey: boolean = false,
        shiftKey: boolean = false,
        buttonDown: boolean = false,
    ): boolean {
        const type = doubleClick ? MouseEventType.DOUBLE_CLICK : MouseEventType.MOUSE_CLICK;
        const clicked = new Set<string>();

        let didHitSprite = false;
        let spriteId = this._activeSpriteCount - 1;

        while (spriteId >= 0) {
            const extendedSprite = this.getExtendedSprite(spriteId);

            if (extendedSprite?.clickHandling) {
                if (extendedSprite.containsXY(x - extendedSprite.x, y - extendedSprite.y)) {
                    const identifier = this.getExtendedSpriteIdentifier(extendedSprite);

                    if (!clicked.has(identifier)) {
                        this.bufferMouseEvent(this.createMouseEvent(
                            x,
                            y,
                            x - extendedSprite.x,
                            y - extendedSprite.y,
                            type,
                            extendedSprite.tag,
                            altKey,
                            ctrlKey,
                            shiftKey,
                            buttonDown,
                        ), identifier);

                        clicked.add(identifier);
                    }
                }

                didHitSprite = true;
            }

            spriteId--;
        }

        this.processMouseEvents();

        return didHitSprite;
    }

    private checkMouseHits(
        x: number,
        y: number,
        type: string,
        altKey: boolean = false,
        ctrlKey: boolean = false,
        shiftKey: boolean = false,
        buttonDown: boolean = false,
    ): boolean {
        let didHitSprite = false;
        let mouseEvent: IRoomSpriteMouseEvent | undefined = undefined;
        let spriteId = this._activeSpriteCount - 1;

        this._checkedSprites.clear();

        while (spriteId >= 0) {
            const extendedSprite = this.getExtendedSprite(spriteId);

            if (extendedSprite && extendedSprite.containsXY(x - extendedSprite.x, y - extendedSprite.y)) {
                if (!extendedSprite.skipMouseHandling) {
                    if (
                        extendedSprite.clickHandling
                        && (type === MouseEventType.MOUSE_CLICK || type === MouseEventType.DOUBLE_CLICK)
                    ) {
                        // Left to `checkMouseClickHits`.
                    } else {
                        const identifier = this.getExtendedSpriteIdentifier(extendedSprite);

                        if (!this._checkedSprites.has(identifier)) {
                            const tag = extendedSprite.tag;

                            let mouseData = this._mouseActiveObjects.get(identifier);

                            if (mouseData) {
                                if (mouseData.spriteTag !== tag) {
                                    mouseEvent = this.createMouseEvent(
                                        0,
                                        0,
                                        0,
                                        0,
                                        MouseEventType.ROLL_OUT,
                                        mouseData.spriteTag,
                                        altKey,
                                        ctrlKey,
                                        shiftKey,
                                        buttonDown,
                                    );

                                    this.bufferMouseEvent(mouseEvent, identifier);
                                }
                            }

                            if (type === MouseEventType.MOUSE_MOVE && (!mouseData || mouseData.spriteTag !== tag)) {
                                mouseEvent = this.createMouseEvent(
                                    x,
                                    y,
                                    x - extendedSprite.x,
                                    y - extendedSprite.y,
                                    MouseEventType.ROLL_OVER,
                                    tag,
                                    altKey,
                                    ctrlKey,
                                    shiftKey,
                                    buttonDown,
                                );
                            } else {
                                mouseEvent = this.createMouseEvent(
                                    x,
                                    y,
                                    x - extendedSprite.x,
                                    y - extendedSprite.y,
                                    type,
                                    tag,
                                    altKey,
                                    ctrlKey,
                                    shiftKey,
                                    buttonDown,
                                );

                                mouseEvent.spriteOffsetX = extendedSprite.offsetX;
                                mouseEvent.spriteOffsetY = extendedSprite.offsetY;
                            }

                            if (!mouseData) {
                                mouseData = new ObjectMouseData();

                                mouseData.objectId = identifier;
                                this._mouseActiveObjects.set(identifier, mouseData);
                            }

                            mouseData.spriteTag = tag;

                            if (
                                mouseEvent
                                && (type !== MouseEventType.MOUSE_MOVE || x !== this._mouseOldX || y !== this._mouseOldY)
                            )
                                this.bufferMouseEvent(mouseEvent, identifier);

                            this._checkedSprites.add(identifier);
                        }

                        didHitSprite = true;
                    }
                }
            }

            spriteId--;
        }

        this._mouseOutKeys.length = 0;

        for (const key of this._mouseActiveObjects.keys()) {
            if (!this._checkedSprites.has(key)) this._mouseOutKeys.push(key);
        }

        for (const key of this._mouseOutKeys) {
            const existing = this._mouseActiveObjects.get(key);

            if (existing) this._mouseActiveObjects.delete(key);

            this.bufferMouseEvent(this.createMouseEvent(
                0,
                0,
                0,
                0,
                MouseEventType.ROLL_OUT,
                existing?.spriteTag ?? '',
                altKey,
                ctrlKey,
                shiftKey,
                buttonDown,
            ), key);
        }

        this.processMouseEvents();
        this._mouseOldX = x;
        this._mouseOldY = y;

        return didHitSprite;
    }

    protected createMouseEvent(
        x: number,
        y: number,
        localX: number,
        localY: number,
        type: string,
        tag: string,
        altKey: boolean,
        ctrlKey: boolean,
        shiftKey: boolean,
        buttonDown: boolean,
    ): IRoomSpriteMouseEvent {
        const screenX: number = x - this._width / 2;
        const screenY: number = y - this._height / 2;

        return new RoomSpriteMouseEvent(
            type,
            this._eventId,
            tag,
            screenX,
            screenY,
            localX,
            localY,
            ctrlKey,
            altKey,
            shiftKey,
            buttonDown,
        );
    }

    protected bufferMouseEvent(k: IRoomSpriteMouseEvent, _arg_2: string): void {
        if (!k || !this._eventCache) return;

        this._eventCache.set(_arg_2, k);
    }

    protected processMouseEvents(): void {
        if (!this._eventCache) return;

        for (const [ key, event ] of this._eventCache.entries()) {
            if (!this._eventCache) return;

            if (!event) continue;

            const roomObject = this._room.getRoomObjectByInstanceId(parseInt(key));

            if (!roomObject) continue;

            this._room.eventHandler?.handleRoomCanvasMouseEvent(event, roomObject);
        }

        if (this._eventCache) this._eventCache.clear();
    }

    public getDisplayAsTexture(): Texture | undefined {
        if (!this._display) return;

        this._noSpriteVisibilityChecking = true;

        const currentScale = this._scale;
        const currentOffsetX = this._screenOffsetX;
        const currentOffsetY = this._screenOffsetY;

        this.setScale(1);

        this._screenOffsetX = 0;
        this._screenOffsetY = 0;

        this.render(-1, true);

        this._display.mask = null;

        const bounds = this._display.getBounds();
        const texture = TextureUtils.createAndWriteRenderTexture(
            this._display.width,
            this._display.height,
            this._display,
            new Matrix(1, 0, 0, 1, -bounds.x, -bounds.y),
        );

        if (this._mask) this._display.mask = this._mask;

        this._noSpriteVisibilityChecking = false;

        this.setScale(currentScale);

        this._screenOffsetX = currentOffsetX;
        this._screenOffsetY = currentOffsetY;
        this.render(-1, true);

        return texture;
    }

    private doMagic(): void {
        if (this._rotation !== 0) {
            let direction = this._effectDirection;

            this._geometry.direction = new Vector3d(direction.x + this._rotation, direction.y, direction.z);

            direction = this._geometry.direction as Vector3d;

            this._geometry.setDepthVector(new Vector3d(direction.x, direction.y, 5));

            const location = new Vector3d();

            if (this._rotationOrigin) location.assign(this._rotationOrigin);

            location.x
                = location.x
                    + this._rotationRodLength
                    * Math.cos(((direction.x + 180) / 180) * Math.PI)
                    * Math.cos((direction.y / 180) * Math.PI);
            location.y
                = location.y
                    + this._rotationRodLength
                    * Math.sin(((direction.x + 180) / 180) * Math.PI)
                    * Math.cos((direction.y / 180) * Math.PI);
            location.z = location.z + this._rotationRodLength * Math.sin((direction.y / 180) * Math.PI);

            this._geometry.setLocation(location);

            this._effectLocation = new Vector3d();
            this._effectLocation.assign(location);
            this._effectDirection = new Vector3d();
            this._effectDirection.assign(this._geometry.direction);
        }

        if (RoomShakingEffect.isVisualizationOn() && !this._SafeStr_4507) {
            this.changeShaking();
        } else if (!RoomShakingEffect.isVisualizationOn() && this._SafeStr_4507) this.changeShaking();

        if (RoomRotatingEffect.isVisualizationOn()) this.changeRotation();

        if (this._SafeStr_4507) {
            this._SafeStr_795++;

            const _local_4 = this._effectDirection;
            const _local_1 = Vector3d.sum(
                _local_4,
                new Vector3d(
                    Math.sin(((this._SafeStr_795 * 5) / 180) * Math.PI) * 2,
                    Math.sin((this._SafeStr_795 / 180) * Math.PI) * 5,
                    Math.sin(((this._SafeStr_795 * 10) / 180) * Math.PI) * 2,
                ),
            );

            this._geometry.direction = _local_1;
        } else {
            this._SafeStr_795 = 0;

            this._geometry.direction = this._effectDirection;
        }
    }

    private changeShaking(): void {
        this._SafeStr_4507 = !this._SafeStr_4507;

        if (this._SafeStr_4507) {
            const direction = this.geometry.direction;

            this._effectDirection = new Vector3d(direction.x, direction.y, direction.z);
        }
    }

    private changeRotation(): void {
        if (this._SafeStr_4507) return;

        if (this._rotation === 0) {
            const location = this._geometry.location;
            const directionAxis = this._geometry.directionAxis;

            this._effectLocation = new Vector3d();
            this._effectLocation.assign(location);
            this._effectDirection = new Vector3d();
            this._effectDirection.assign(this._geometry.direction);

            const intersection = RoomGeometry.getIntersectionVector(
                location,
                directionAxis,
                new Vector3d(0, 0, 0),
                new Vector3d(0, 0, 1),
            );

            if (intersection !== null) {
                this._rotationOrigin = new Vector3d(intersection.x, intersection.y, intersection.z);
                this._rotationRodLength = Vector3d.dif(intersection, location).length;
                this._rotation = 1;
            }

            return;
        }

        this._rotation = 0;

        this._geometry.setLocation(this._effectLocation);

        this._geometry.direction = this._effectDirection;
        this._geometry.setDepthVector(new Vector3d(this._effectDirection.x, this._effectDirection.y, 5));
    }

    public moveLeft(): void {
        if (this._rotation !== 0) {
            if (this._rotation === 1) {
                this._rotation = -1;
            } else {
                this._rotation = this._rotation - 1;
            }

            return;
        }

        const direction = ((this._geometry.direction.x - 90) / 180) * Math.PI;

        this._geometry.setLocation(Vector3d.sum(
            this._geometry.location,
            new Vector3d(Math.cos(direction) * Math.sqrt(2), Math.sin(direction) * Math.sqrt(2)),
        ));
    }

    public moveRight(): void {
        if (this._rotation !== 0) {
            if (this._rotation === -1) {
                this._rotation = 1;
            } else {
                this._rotation = this._rotation + 1;
            }

            return;
        }

        const direction = ((this._geometry.direction.x + 90) / 180) * Math.PI;

        this._geometry.setLocation(Vector3d.sum(
            this._geometry.location,
            new Vector3d(Math.cos(direction) * Math.sqrt(2), Math.sin(direction) * Math.sqrt(2)),
        ));
    }

    public moveUp(): void {
        if (this._rotation !== 0) return;

        const direction = (this._geometry.direction.x / 180) * Math.PI;

        this._geometry.setLocation(Vector3d.sum(
            this._geometry.location,
            new Vector3d(Math.cos(direction) * Math.sqrt(2), Math.sin(direction) * Math.sqrt(2)),
        ));
    }

    public moveDown(): void {
        if (this._rotation !== 0) return;

        const direction = ((this._geometry.direction.x + 180) / 180) * Math.PI;

        this._geometry.setLocation(Vector3d.sum(
            this._geometry.location,
            new Vector3d(Math.cos(direction) * Math.sqrt(2), Math.sin(direction) * Math.sqrt(2)),
        ));
    }

    public get geometry(): IRoomGeometry {
        return this._geometry;
    }

    public get master(): Container | undefined {
        return this._master;
    }

    public get display(): Container | undefined {
        return this._display;
    }

    public get screenOffsetX(): number {
        return this._screenOffsetX;
    }

    /** Flash keeps the offset as it is given (a `Number`): sprites snap against it in `renderObject`. */
    public set screenOffsetX(x: number) {
        this._mouseLocation.x = this._mouseLocation.x - (x - this._screenOffsetX);
        this._screenOffsetX = x;
    }

    public get screenOffsetY(): number {
        return this._screenOffsetY;
    }

    /** Flash keeps the offset as it is given (a `Number`): sprites snap against it in `renderObject`. */
    public set screenOffsetY(y: number) {
        this._mouseLocation.y = this._mouseLocation.y - (y - this._screenOffsetY);
        this._screenOffsetY = y;
    }

    public get scale(): number {
        return this._scale;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }
}
