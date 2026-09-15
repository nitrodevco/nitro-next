import { AvatarActionStateType, AvatarBodyPartType, AvatarDirectionAngle, AvatarFigurePartType, AvatarGeometryType, AvatarScaleType, AvatarSetType, IActiveActionData, IAnimationLayerData, IAvatarDataContainer, IAvatarEffectListener, IAvatarFigureContainer, IAvatarImage, IGraphicAsset, IPartColor, ISpriteDataContainer } from '@nitrodevco/nitro-api';
import { Container, ImageLike, Point, PointData, Rectangle, RenderTexture, Sprite, Texture } from 'pixi.js';

import { GetTickerTime, TexturePool, TextureUtils } from '#renderer/utils';

import { ActiveActionData } from './actions';
import { AssetAliasCollection } from './alias';
import { AvatarFigureContainer } from './AvatarFigureContainer';
import { AvatarStructure } from './AvatarStructure';
import { AvatarImageCache } from './cache';
import { EffectAssetDownloadManager } from './EffectAssetDownloadManager';

/** A full-figure render kept for re-use, with the row the figure starts at (for the cropped-top variant). */
export interface AvatarImageCachedFullImage {
    texture: RenderTexture;
    topCropY: number;
}

export class AvatarImage implements IAvatarImage, IAvatarEffectListener {
    private static DEFAULT_DIRECTION: number = 2;
    private static DEFAULT_AVATAR_SET: AvatarSetType = AvatarSetType.Full;
    /** The idle postures loop over 8 frames, everything else over 4 (the full-image cache key). */
    private static MAX_IDLE_FRAMES: number = 8;
    private static MAX_OTHER_FRAMES: number = 4;
    private static IDLE_ACTION_STRINGS: string[] = [ AvatarActionStateType.Stand, AvatarActionStateType.Lay, AvatarActionStateType.Sit ];
    private static DEFAULT_FIGURE: string = 'hr-893-45.hd-180-2.ch-210-66.lg-270-82.sh-300-91.wa-2007-.ri-1-';

    protected _structure: AvatarStructure;
    protected _assets: AssetAliasCollection;
    protected _effectManager: EffectAssetDownloadManager | undefined;
    protected _effectListener: IAvatarEffectListener | undefined;
    protected _figure: IAvatarFigureContainer;
    protected _scale: AvatarScaleType;
    /** Flash `h_50`: rendered from the large assets and halved. */
    protected _largeScaledSmall: boolean;
    protected _cache: AvatarImageCache;
    protected _mainDirection: number;
    protected _headDirection: number;
    protected _mainAction: IActiveActionData;
    protected _defaultAction: IActiveActionData;
    protected _actions: ActiveActionData[];
    protected _canvasOffsets: number[] = [];
    protected _image: RenderTexture | undefined = undefined;
    protected _isCachedImage: boolean = false;
    /** A view of `_image` without the empty rows above the figure. */
    protected _croppedTopImage: Texture | undefined = undefined;
    /** The first row `_image` has figure pixels on; -1 until the image is rendered. */
    protected _topCropY: number = -1;
    protected _avatarSpriteData: IAvatarDataContainer | undefined = undefined;
    protected _disposed: boolean = false;
    protected _sortedActions: IActiveActionData[] = [];
    private _fullImageCache: Map<string, AvatarImageCachedFullImage> = new Map();
    private _frameCounter: number = 0;
    private _directionOffset: number = 0;
    private _changes: boolean = true;
    private _sprites: ISpriteDataContainer[] = [];
    private _isAnimating: boolean = false;
    private _animationHasResetOnToggle: boolean = false;
    private _actionsSorted: boolean = false;
    private _lastActionsString: string = '';
    private _currentActionsString: string = '';
    private _useFullImageCache: boolean = false;
    private _effectIdInUse: number = -1;
    /** The running effect's animation id and the frame it started on: its layers count from there. */
    private _effectAnimationId: string | undefined = undefined;
    private _effectAnimationStartFrame: number = 0;
    private _animationFrameCount: number = 0;
    private _cachedBodyParts: AvatarBodyPartType[] = [];
    private _cachedBodyPartsDirection: number = -1;
    private _cachedBodyPartsGeometryType: AvatarGeometryType | undefined = undefined;
    private _cachedBodyPartsAvatarSet: AvatarSetType | undefined = undefined;
    private _onDisposed: ((image: AvatarImage) => void) | undefined;

    constructor(structure: AvatarStructure, assets: AssetAliasCollection, container: AvatarFigureContainer | undefined, scale: AvatarScaleType, effectManager: EffectAssetDownloadManager | undefined = undefined, effectListener: IAvatarEffectListener | undefined = undefined, onDisposed: ((image: AvatarImage) => void) | undefined = undefined) {
        this._structure = structure;
        this._assets = assets;
        this._effectManager = effectManager;
        this._effectListener = effectListener;
        this._onDisposed = onDisposed;
        this._largeScaledSmall = false;

        if (!scale) scale = AvatarScaleType.Large;
        else if (scale === AvatarScaleType.LargeToSmall) {
            this._largeScaledSmall = true;

            scale = AvatarScaleType.Small;
        }

        if (!container) container = new AvatarFigureContainer(AvatarImage.DEFAULT_FIGURE);

        this._figure = container;
        this._scale = scale;
        this._cache = new AvatarImageCache(this._structure, this, this._assets, this._scale, this._largeScaledSmall);

        this.setDirection(AvatarImage.DEFAULT_AVATAR_SET, AvatarImage.DEFAULT_DIRECTION);

        this._actions = [];
        this._defaultAction = new ActiveActionData(AvatarActionStateType.Stand);
        this._defaultAction.definition = this._structure.getDefaultActionDefinition();
        this._mainAction = this._defaultAction;

        this.resetActions();
    }

    public dispose(): void {
        if (this._disposed) return;

        if (this._image && !this._isCachedImage) TexturePool.releaseTexture(this._image);

        this._image = undefined;

        this.disposeCroppedTopImage();

        if (this._cache) this._cache.dispose();

        this.disposeFullImageCache();

        this._disposed = true;

        if (this._onDisposed) this._onDisposed(this);
    }

    /** Flash `resetCache`: everything rendered is thrown away, the next `getImage` starts from the current assets. */
    public resetCache(): void {
        if (this._cache) this._cache.reset();

        this.disposeFullImageCache();

        this._cachedBodyParts = [];
        this._cachedBodyPartsDirection = -1;
        this._cachedBodyPartsGeometryType = undefined;
        this._cachedBodyPartsAvatarSet = undefined;
        this._lastActionsString = '';
        this._actionsSorted = false;
        this._changes = true;

        if (this._image && !this._isCachedImage) TexturePool.releaseTexture(this._image);

        this._image = undefined;
        this._isCachedImage = false;

        this.disposeCroppedTopImage();

        this._topCropY = -1;
        this._frameCounter = 0;
    }

    public setDirection(setType: AvatarSetType, direction: number): void {
        direction = (direction + this._directionOffset);

        if (direction < AvatarDirectionAngle.MIN_DIRECTION) direction = AvatarDirectionAngle.MAX_DIRECTION + (direction + 1);

        if (direction > AvatarDirectionAngle.MAX_DIRECTION) direction = direction - (AvatarDirectionAngle.MAX_DIRECTION + 1);

        if (this._structure.isMainAvatarSet(setType)) this._mainDirection = direction;

        if (setType === AvatarSetType.Head || setType === AvatarSetType.Full) {
            if (setType === AvatarSetType.Head && this.isHeadTurnPreventedByAction()) direction = this._mainDirection;

            this._headDirection = direction;
        }

        this._cache.setDirection(setType, direction);
        this._changes = true;
    }

    public setDirectionAngle(setType: AvatarSetType, angle: number): void {
        this.setDirection(setType, Math.floor(angle / 45));
    }

    /** An effect's sprite layers count frames from the frame the effect was appended on. */
    public getLayerData(sprite: ISpriteDataContainer): IAnimationLayerData | undefined {
        let frame = this._frameCounter;

        if (sprite.animation.id === this._effectAnimationId) frame -= this._effectAnimationStartFrame;

        return this._structure.getBodyPartData(sprite.animation.id, frame, sprite.id);
    }

    public updateAnimationByFrames(frame: number = 1): void {
        this._frameCounter += frame;
        this._changes = true;
    }

    public resetAnimationFrameCounter(): void {
        this._frameCounter = 0;
        this._effectAnimationStartFrame = 0;
        this._changes = true;
    }

    public getImage(setType: AvatarSetType, hightlight: boolean, scale: number = 1): RenderTexture | undefined {
        return this.getImageInternal(setType, hightlight, scale, false) as RenderTexture | undefined;
    }

    public getImageWithCroppedTop(setType: AvatarSetType, hightlight: boolean, scale: number = 1): Texture | undefined {
        return this.getImageInternal(setType, hightlight, scale, true);
    }

    private getImageInternal(setType: AvatarSetType, hightlight: boolean, scale: number, croppedTop: boolean): Texture | undefined {
        if (!this._changes) {
            if (!croppedTop) return this._image;

            if (this._topCropY >= 0) return this.getCroppedTopImage();

            this._changes = true;
        }

        if (!this._mainAction?.definition) return undefined;

        if (!this._actionsSorted) this.endActionAppends();

        const cacheKey = this.getFullImageCacheKey();

        if (cacheKey) {
            const cached = this.getFullImage(cacheKey);

            if (cached) {
                this._changes = false;

                this.disposeCroppedTopImage();

                this._topCropY = Math.max(0, cached.topCropY);
                this._image = cached.texture;
                this._isCachedImage = true;

                return croppedTop ? this.getCroppedTopImage() : this._image;
            }
        }

        const avatarCanvas = this._structure.getCanvas(this._scale, this._mainAction.definition.geometryType);

        if (!avatarCanvas) return undefined;

        if (this._isCachedImage || !this._image || this._image.width !== avatarCanvas.width || this._image.height !== avatarCanvas.height) {
            if (this._image && !this._isCachedImage) TexturePool.releaseTexture(this._image);

            this._image = TexturePool.createRenderTexture(avatarCanvas.width, avatarCanvas.height);
            this._isCachedImage = false;
        }

        this.disposeCroppedTopImage();

        this._topCropY = -1;

        if (!this._image) return undefined;

        const parts = this.getBodyParts(setType, this._mainAction.definition.geometryType, this._mainDirection);
        const container = new Container();

        let isCachable = true;
        let topY = avatarCanvas.height;

        for (let i = parts.length - 1; i >= 0; i--) {
            const part = this._cache.getImageContainer(parts[i], this._frameCounter);

            if (!part || !part.image) continue;

            isCachable &&= part.isCacheable;

            const point = part.regPoint.clone();

            point.x += avatarCanvas.offset.x;
            point.y += avatarCanvas.offset.y;

            point.x += avatarCanvas.regPoint.x;
            point.y += avatarCanvas.regPoint.y;

            const partContainer = new Container();

            partContainer.addChild(part.image);
            partContainer.position.set(point.x, point.y);

            container.addChild(partContainer);

            topY = Math.min(topY, point.y);
        }

        this._topCropY = (topY === avatarCanvas.height) ? 0 : Math.max(0, Math.min((avatarCanvas.height - 1), topY));

        const imageFilter = this._avatarSpriteData?.imageFilter;

        if (imageFilter) container.filters = [ imageFilter ];

        TextureUtils.getRenderer().render({
            target: this._image,
            container,
            clear: true,
        });

        this._changes = false;

        if (cacheKey && isCachable) {
            const imageClone = TexturePool.createRenderTexture(avatarCanvas.width, avatarCanvas.height);

            if (imageClone) {
                TextureUtils.getRenderer().render({
                    target: imageClone,
                    container,
                    clear: true,
                });

                this.cacheFullImage(cacheKey, imageClone, this._topCropY);
            }
        }

        if (scale !== 1) {
            const reduced = TextureUtils.createReducedTexture(this._image, scale);

            if (reduced) {
                TexturePool.releaseTexture(this._image);

                this._image = reduced;
                this._topCropY = Math.max(0, Math.min((reduced.height - 1), Math.round(this._topCropY * scale)));
            }
        }

        return croppedTop ? this.getCroppedTopImage() : this._image;
    }

    /** The same pixels as `_image`, framed from the first row the figure occupies (the room sprite's texture). */
    private getCroppedTopImage(): Texture | undefined {
        if (!this._image) return undefined;

        if (this._topCropY <= 0) return this._image;

        const height = Math.max(1, (this._image.height - this._topCropY));

        if (!this._croppedTopImage || this._croppedTopImage.source !== this._image.source || this._croppedTopImage.width !== this._image.width || this._croppedTopImage.height !== height) {
            this.disposeCroppedTopImage();

            this._croppedTopImage = new Texture({
                source: this._image.source,
                frame: new Rectangle(0, this._topCropY, this._image.width, height),
            });
        }

        return this._croppedTopImage;
    }

    protected disposeCroppedTopImage(): void {
        if (!this._croppedTopImage) return;

        // a view over `_image`: only the view goes, never the pixels
        this._croppedTopImage.destroy(false);
        this._croppedTopImage = undefined;
    }

    public getHeadRegPoints(_setType: AvatarSetType): Point {
        const container = this._cache.getImageContainer(AvatarBodyPartType.Head, this._frameCounter);

        if (!container) return new Point(0, 0);

        return new Point(container.regPoint.x, container.regPoint.y);
    }

    public getFaceOffset(_setType: AvatarSetType): Point {
        const container = this._cache.getImageContainer(AvatarBodyPartType.Head, this._frameCounter);

        if (!container?.faceOffset) return new Point(0, 0);

        return new Point(container.faceOffset.x, container.faceOffset.y);
    }

    public getCroppedImage(setType: AvatarSetType, hightlight: boolean, scale: number = 1): RenderTexture | undefined {
        if (!this._mainAction?.definition) return undefined;

        if (!this._actionsSorted) this.endActionAppends();

        const avatarCanvas = this._structure.getCanvas(this._scale, this._mainAction.definition.geometryType);

        if (!avatarCanvas) return undefined;

        const container = this.buildSetContainer(setType, avatarCanvas.offset, avatarCanvas.regPoint);

        // The Flash `getCroppedImage` blitted every part of the set onto the avatar canvas, then
        // copied out the union of the parts' bounds - a head set comes back as just the head,
        // not the head floating at the top of a full-body canvas. Only the drawn sprites count:
        // every part container also holds a `Texture.EMPTY` placeholder sized to the part's
        // full union box, which can reach far outside the canvas (a layer with a large negative
        // offset) and would otherwise push the head into a corner of the crop.
        const placeholders: Sprite[] = [];

        const hidePlaceholders = (node: Container) => {
            for (const child of node.children) {
                if ((child instanceof Sprite) && (child.texture === Texture.EMPTY)) {
                    child.measurable = false;
                    placeholders.push(child);
                }

                hidePlaceholders(child);
            }
        };

        hidePlaceholders(container);

        const bounds = container.getLocalBounds().rectangle.clone();

        for (const placeholder of placeholders) placeholder.measurable = true;

        if ((bounds.width <= 0) || (bounds.height <= 0)) return undefined;

        const fullWidth = Math.max(1, Math.ceil(bounds.width));
        const fullHeight = Math.max(1, Math.ceil(bounds.height));
        const fullTexture = TexturePool.createRenderTexture(fullWidth, fullHeight);

        if (!fullTexture) return undefined;

        container.position.set(-bounds.x, -bounds.y);

        TextureUtils.getRenderer().render({
            target: fullTexture,
            container,
            clear: true,
        });

        if (scale === 1) return fullTexture;

        // Flash drew the reduced copy with `smoothing = true` and then sharpened it - a plain
        // nearest-neighbour half-size render drops every other row of a pixel-art head.
        const texture = TextureUtils.createReducedTexture(fullTexture, scale);

        TexturePool.releaseTexture(fullTexture);

        return texture;
    }

    public async getCroppedImageAsync(setType: AvatarSetType, hightlight: boolean, _scale: number = 1): Promise<ImageLike | undefined> {
        const texture = this.renderSetToCanvasTexture(setType);

        if (!texture) return undefined;

        const image = await TextureUtils.generateImage(texture);

        TexturePool.releaseTexture(texture);

        return image;
    }

    public async getCroppedBase64Async(setType: AvatarSetType, hightlight: boolean, _scale: number = 1): Promise<string | undefined> {
        const texture = this.renderSetToCanvasTexture(setType);

        if (!texture) return undefined;

        const base64 = await TextureUtils.getRenderer().extract.base64(new Sprite(texture));

        TexturePool.releaseTexture(texture);

        return base64;
    }

    /** The set's parts laid out on the avatar canvas, with the effect's image filter applied. */
    private buildSetContainer(setType: AvatarSetType, canvasOffset: PointData, canvasRegPoint: PointData): Container {
        const parts = this.getBodyParts(setType, this._mainAction.definition!.geometryType, this._mainDirection);
        const container = new Container();

        for (let i = parts.length - 1; i >= 0; i--) {
            const part = this._cache.getImageContainer(parts[i], this._frameCounter);

            if (!part || !part.image) continue;

            const point = part.regPoint.clone();

            point.x += canvasOffset.x;
            point.y += canvasOffset.y;

            point.x += canvasRegPoint.x;
            point.y += canvasRegPoint.y;

            const partContainer = new Container();

            partContainer.addChild(part.image);
            partContainer.position.set(point.x, point.y);

            container.addChild(partContainer);
        }

        const imageFilter = this._avatarSpriteData?.imageFilter;

        if (imageFilter) container.filters = [ imageFilter ];

        return container;
    }

    private renderSetToCanvasTexture(setType: AvatarSetType): RenderTexture | undefined {
        if (!this._mainAction?.definition) return undefined;

        if (!this._actionsSorted) this.endActionAppends();

        const avatarCanvas = this._structure.getCanvas(this._scale, this._mainAction.definition.geometryType);

        if (!avatarCanvas) return undefined;

        const container = this.buildSetContainer(setType, avatarCanvas.offset, avatarCanvas.regPoint);
        const texture = TexturePool.createRenderTexture(avatarCanvas.width, avatarCanvas.height);

        if (!texture) return undefined;

        TextureUtils.getRenderer().render({
            target: texture,
            container,
            clear: true,
        });

        return texture;
    }

    public initActionAppends(): void {
        this._actions = [];
        this._actionsSorted = false;
        this._currentActionsString = '';
        this._useFullImageCache = false;
    }

    public endActionAppends(): void {
        if (!this.sortActions()) return;

        for (const action of this._sortedActions) {
            if (action.type !== AvatarActionStateType.Effect || !this._effectManager) continue;

            const effectId = parseInt(action.actionParameter);

            if (!this._effectManager.isAvatarEffectReady(effectId)) this._effectManager.downloadAvatarEffect(effectId, this);
        }

        this.resetActions();
        this.setActionsToParts();
    }

    public appendAction(action: AvatarActionStateType, ..._args: (AvatarActionStateType | number | string)[]): boolean {
        const parameter = (_args.length > 0 && _args[0] !== undefined) ? _args[0].toString() : '';

        this._actionsSorted = false;

        switch (action) {
            case AvatarActionStateType.Posture: {
                switch (parameter as AvatarActionStateType) {
                    case AvatarActionStateType.Lay:
                        this.setDirection(AvatarSetType.Full, this._mainDirection === 0 ? 4 : 2);
                    // eslint-disable-next-line no-fallthrough
                    case AvatarActionStateType.Walk:
                    case AvatarActionStateType.Stand:
                    case AvatarActionStateType.Sit:
                        this._useFullImageCache = true;
                        this.addActionData(parameter as AvatarActionStateType);
                        break;
                    case AvatarActionStateType.Swim:
                    case AvatarActionStateType.Float:
                    case AvatarActionStateType.SnowwarRun:
                    case AvatarActionStateType.SnowwarDieFront:
                    case AvatarActionStateType.SnowwarDieBack:
                    case AvatarActionStateType.SnowwarPick:
                    case AvatarActionStateType.SnowwarThrow:
                        this._useFullImageCache = false;
                        this.addActionData(parameter as AvatarActionStateType);
                        break;
                }

                break;
            }
            case AvatarActionStateType.Gesture: {
                switch (parameter as AvatarActionStateType) {
                    case AvatarActionStateType.Angry:
                    case AvatarActionStateType.Sad:
                    case AvatarActionStateType.Smile:
                    case AvatarActionStateType.Surprised:
                        this.addActionData(parameter as AvatarActionStateType);
                        break;
                }

                break;
            }
            case AvatarActionStateType.Effect:
                if (parameter === '33' || parameter === '34' || parameter === '35' || parameter === '36' || parameter === '38' || parameter === '39') this._useFullImageCache = true;
            // eslint-disable-next-line no-fallthrough
            case AvatarActionStateType.Dance:
            case AvatarActionStateType.Talk:
            case AvatarActionStateType.Wave:
            case AvatarActionStateType.Sleep:
            case AvatarActionStateType.Sign:
            case AvatarActionStateType.Respect:
            case AvatarActionStateType.BlowAKiss:
            case AvatarActionStateType.Expression67:
            case AvatarActionStateType.Laugh:
            case AvatarActionStateType.Cry:
            case AvatarActionStateType.Idle:
            case AvatarActionStateType.SnowboardOllie:
            case AvatarActionStateType.Snowboard360:
            case AvatarActionStateType.RideJump:
                this.addActionData(action, parameter);
                break;
            case AvatarActionStateType.CarryObject:
            case AvatarActionStateType.UseObject: {
                // the item id maps to the asset id through the action's params
                const definition = this._structure.getActionDefinitionWithState(action);

                this.addActionData(action, definition ? definition.getParameterValue(parameter) : parameter);
                break;
            }
        }

        return true;
    }

    /*
     * The placeholder and blocked images' `appendAction`: only the plain postures go through
     * the full path, a handful of overlays are added raw (no item-id mapping - the stand-in
     * figure has no such parts) and everything else is ignored.
     */
    protected appendRestrictedAction(action: AvatarActionStateType, args: (AvatarActionStateType | number | string)[]): boolean {
        const parameter = (args.length > 0 && args[0] !== undefined) ? args[0].toString() : '';

        switch (action) {
            case AvatarActionStateType.Posture: {
                switch (parameter as AvatarActionStateType) {
                    case AvatarActionStateType.Lay:
                    case AvatarActionStateType.Walk:
                    case AvatarActionStateType.Stand:
                    case AvatarActionStateType.Swim:
                    case AvatarActionStateType.Float:
                    case AvatarActionStateType.Sit:
                        AvatarImage.prototype.appendAction.call(this, action, ...args);
                        break;
                }

                break;
            }
            case AvatarActionStateType.Effect:
            case AvatarActionStateType.Dance:
            case AvatarActionStateType.Wave:
            case AvatarActionStateType.Sign:
            case AvatarActionStateType.CarryObject:
            case AvatarActionStateType.UseObject:
            case AvatarActionStateType.BlowAKiss:
            case AvatarActionStateType.Expression67:
                this.addActionData(action, parameter);
                break;
        }

        return true;
    }

    protected addActionData(type: AvatarActionStateType, parameter: string = ''): void {
        if (!this._actions) this._actions = [];

        for (const action of this._actions) if (action.type === type && action.actionParameter === parameter) return;

        let startFrame = this._frameCounter;

        // re-appending the running effect keeps its original start frame, so its animation does not restart
        if (type === AvatarActionStateType.Effect && parameter === this._effectIdInUse.toString() && this._effectAnimationId !== undefined) startFrame = this._effectAnimationStartFrame;

        this._actions.push(new ActiveActionData(type, parameter, startFrame));
    }

    public disposeInactiveActionCache(): void {
        this._cache?.disposeInactiveActions();
    }

    public getTotalFrameCount(): number {
        let frameCount = this._animationFrameCount;

        for (const action of this._sortedActions) {
            if (!action?.definition) continue;

            const animation = this._structure.animationManager.getAnimation(`${action.definition.state}.${action.actionParameter}`);

            if (!animation) continue;

            frameCount = Math.max(frameCount, animation.frameCount(action.overridingAction));
        }

        return frameCount;
    }

    public getFigure(): IAvatarFigureContainer {
        return this._figure;
    }

    public getScale(): AvatarScaleType {
        return this._scale;
    }

    public getPartColor(partType: AvatarFigurePartType): IPartColor | undefined {
        return this._structure.getPartColor(this._figure, partType);
    }

    public getSprites(): ISpriteDataContainer[] {
        return this._sprites;
    }

    public getCanvasOffsets(): number[] {
        return this._canvasOffsets;
    }

    public getAsset(name: string): IGraphicAsset | undefined {
        return this._assets.getAsset(name);
    }

    public getDirection(): number {
        return this._mainDirection;
    }

    public isAnimating(): boolean {
        return (this._isAnimating) || (this._animationFrameCount > 1);
    }

    public isPlaceholder(): boolean {
        return false;
    }

    public isBlocked(): boolean {
        return false;
    }

    public forceActionUpdate(): void {
        this._lastActionsString = '';
    }

    public resetEffect(effect: number): void {
        if (effect === this._effectIdInUse) {
            this.resetActions();
            this.setActionsToParts();

            this._animationHasResetOnToggle = true;
            this._changes = true;

            if (this._effectListener) this._effectListener.resetEffect(effect);
        }
    }

    public get animationHasResetOnToggle(): boolean {
        return this._animationHasResetOnToggle;
    }

    public get mainAction(): IActiveActionData {
        return this._mainAction;
    }

    public get avatarSpriteData(): IAvatarDataContainer | undefined {
        return this._avatarSpriteData;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    protected getFullImage(key: string): AvatarImageCachedFullImage | undefined {
        return this._fullImageCache.get(key);
    }

    protected cacheFullImage(key: string, texture: RenderTexture, topCropY: number): void {
        const existing = this._fullImageCache.get(key);

        if (existing) {
            this._fullImageCache.delete(key);

            TexturePool.releaseTexture(existing.texture);
        }

        this._fullImageCache.set(key, { texture, topCropY });
    }

    protected disposeFullImageCache(): void {
        for (const image of this._fullImageCache.values()) TexturePool.releaseTexture(image.texture);

        this._fullImageCache.clear();
    }

    private resetActions(): boolean {
        this._animationHasResetOnToggle = false;
        this._isAnimating = false;
        this._sprites = [];
        this._avatarSpriteData = undefined;
        this._directionOffset = 0;
        this._effectAnimationId = undefined;
        this._effectAnimationStartFrame = 0;
        this._structure.removeDynamicItems(this);
        this._mainAction = this._defaultAction;
        this._mainAction.definition = this._defaultAction.definition;
        this.resetBodyPartCache(this._defaultAction);

        return true;
    }

    private isHeadTurnPreventedByAction(): boolean {
        if (this._sortedActions) for (const action of this._sortedActions) {
            if (!(action.type === AvatarActionStateType.Sleep && this._mainAction.type !== AvatarActionStateType.Lay) && this._structure.getActionDefinitionWithState(action.type)?.getPreventHeadTurn(action.actionParameter)) return true;
        }

        return false;
    }

    private sortActions(): boolean {
        let effectChanged: boolean = false;
        let hasEffect: boolean = false;
        let sorted: boolean = false;

        this._currentActionsString = '';
        this._sortedActions = this._structure.sortActions(this._actions);
        this._animationFrameCount = this._structure.maxFrames(this._sortedActions);

        if (!this._sortedActions) {
            this._canvasOffsets = [ 0, 0, 0 ];

            if (this._lastActionsString !== '') {
                sorted = true;

                this._lastActionsString = '';
            }
        } else {
            this._canvasOffsets = this._structure.getCanvasOffsets(this._sortedActions, this._scale, this._mainDirection);

            for (const action of this._sortedActions) {
                this._currentActionsString = (this._currentActionsString + action.type + action.actionParameter);

                if (action.type === AvatarActionStateType.Effect) {
                    const effectId = parseInt(action.actionParameter);

                    if (this._effectIdInUse !== effectId) effectChanged = true;

                    this._effectIdInUse = effectId;

                    hasEffect = true;
                }
            }

            if (!hasEffect) {
                if (this._effectIdInUse > -1) effectChanged = true;

                this._effectIdInUse = -1;
            }

            if (effectChanged) this._cache.disposeInactiveActions(0);

            if (this._lastActionsString !== this._currentActionsString) {
                sorted = true;

                this._lastActionsString = this._currentActionsString;
            }
        }

        this._actionsSorted = true;

        return sorted;
    }

    private setActionsToParts(): void {
        if (!this._sortedActions) return;

        const time: number = GetTickerTime();
        const actionTypes: AvatarActionStateType[] = [];

        for (const action of this._sortedActions) actionTypes.push(action.type);

        for (const action of this._sortedActions) {
            if (!action?.definition?.isAnimation) continue;

            const animation = this._structure.getAnimation(action.definition.state + '.' + action.actionParameter);

            if (animation?.hasOverriddenActions()) for (const overrideActionType of animation.overriddenActionNames()) if (actionTypes.indexOf(overrideActionType) >= 0) action.overridingAction = animation.overridingAction(overrideActionType);

            if (animation && animation.resetOnToggle) this._animationHasResetOnToggle = true;
        }

        for (const action of this._sortedActions) {
            if (!action?.definition) continue;

            if (action.definition.isAnimation && action.actionParameter === '') action.actionParameter = '1';

            this.setActionToParts(action, time);

            if (!action.definition.isAnimation) continue;

            this._isAnimating = action.definition.isAnimated(action.actionParameter);

            const animation = this._structure.getAnimation(action.definition.state + '.' + action.actionParameter);

            if (!animation) continue;

            if (action.type === AvatarActionStateType.Effect) {
                this._effectAnimationId = animation.id;
                this._effectAnimationStartFrame = action.startFrame;
            }

            this._sprites = this._sprites.concat(animation.spriteData);

            if (animation.hasDirectionData() && animation.directionData) this._directionOffset = animation.directionData.offset;

            if (animation.hasAvatarData()) this._avatarSpriteData = animation.avatarData;
        }
    }

    private setActionToParts(action: IActiveActionData, time: number): void {
        if (!action?.definition?.assetPartDefinition) return;

        if (action.definition.isMain) {
            this._mainAction = action;
            this._cache.setGeometryType(action.definition.geometryType);
        }

        this._cache.setAction(action, time);
        this._changes = true;
    }

    private resetBodyPartCache(action: IActiveActionData): void {
        if (!action?.definition?.assetPartDefinition) return;

        if (action.definition.isMain) {
            this._mainAction = action;
            this._cache.setGeometryType(action.definition.geometryType);
        }

        this._cache.resetBodyPartCache(action);
        this._changes = true;
    }

    private getBodyParts(setType: AvatarSetType, geometryType: AvatarGeometryType, direction: number): AvatarBodyPartType[] {
        if (setType !== this._cachedBodyPartsAvatarSet || geometryType !== this._cachedBodyPartsGeometryType || direction !== this._cachedBodyPartsDirection) {
            this._cachedBodyPartsDirection = direction;
            this._cachedBodyPartsGeometryType = geometryType;
            this._cachedBodyPartsAvatarSet = setType;
            this._cachedBodyParts = this._structure.getBodyParts(setType, geometryType, direction);
        }

        return this._cachedBodyParts;
    }

    /*
     * A key for the finished figure when it is worth keeping: a single plain action with the
     * head facing the body (idle postures loop over 8 frames, others over 4), or one of the
     * static / head-turning effects (33-36 render once, 38-39 loop over 11 frames).
     */
    private getFullImageCacheKey(): string | undefined {
        if (!this._useFullImageCache) return undefined;

        if (this._sortedActions.length === 1 && this._mainDirection === this._headDirection) {
            const isIdle = AvatarImage.IDLE_ACTION_STRINGS.includes(this._currentActionsString);
            const frame = this._frameCounter % (isIdle ? AvatarImage.MAX_IDLE_FRAMES : AvatarImage.MAX_OTHER_FRAMES);

            return `${this._mainDirection}${this._currentActionsString}${frame}`;
        }

        if (this._sortedActions.length === 2) for (const action of this._sortedActions) {
            if (action.type !== AvatarActionStateType.Effect) continue;

            const parameter = action.actionParameter;

            if (parameter === '33' || parameter === '34' || parameter === '35' || parameter === '36') return `${this._mainDirection}${this._currentActionsString}0`;

            if (parameter === '38' || parameter === '39') return `${this._mainDirection}_${this._headDirection}${this._currentActionsString}${this._frameCounter % 11}`;
        }

        return undefined;
    }
}
