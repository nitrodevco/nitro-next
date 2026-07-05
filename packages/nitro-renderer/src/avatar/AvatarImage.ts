import type { AvatarBodyPartType, AvatarFigurePartType, AvatarScaleType, IAdvancedMap, IAnimationLayerData, IAvatarEffectListener, IAvatarFigureContainer, IAvatarImage, IGraphicAsset, IPartColor } from '@nitrodevco/nitro-api';
import { AvatarActionStateType, AvatarGeometryType } from '@nitrodevco/nitro-api';
import { AvatarDirectionAngle, AvatarSetType, type IActiveActionData, type IAvatarDataContainer, type ISpriteDataContainer } from '@nitrodevco/nitro-api';
import { AdvancedMap } from '@nitrodevco/nitro-shared';
import type { Filter } from 'pixi.js';
import { ColorMatrixFilter, Container, RenderTexture } from 'pixi.js';

import { GetTickerTime } from '#renderer/utils';

import { ActiveActionData } from './actions';
import type { AssetAliasCollection } from './alias';
import { AvatarFigureContainer } from './AvatarFigureContainer';
import type { AvatarStructure } from './AvatarStructure';
import { AvatarImageCache } from './cache';
import type { EffectAssetDownloadManager } from './EffectAssetDownloadManager';

export class AvatarImage implements IAvatarImage, IAvatarEffectListener {
    private static CHANNELS_EQUAL: string = 'CHANNELS_EQUAL';
    private static CHANNELS_UNIQUE: string = 'CHANNELS_UNIQUE';
    private static CHANNELS_RED: string = 'CHANNELS_RED';
    private static CHANNELS_GREEN: string = 'CHANNELS_GREEN';
    private static CHANNELS_BLUE: string = 'CHANNELS_BLUE';
    private static CHANNELS_DESATURATED: string = 'CHANNELS_DESATURATED';
    private static DEFAULT_ACTION: string = 'Default';
    private static DEFAULT_DIRECTION: number = 2;
    private static DEFAULT_AVATAR_SET: string = AvatarSetType.Full;
    private static MAX_IMAGE_CACHE: number = 5;

    protected _structure: AvatarStructure;
    protected _assets: AssetAliasCollection;
    private _effectManager: EffectAssetDownloadManager | undefined;
    private _effectListener: IAvatarEffectListener | undefined;
    protected _figure: IAvatarFigureContainer;
    protected _scale: AvatarScaleType;
    protected _cache: AvatarImageCache;
    protected _mainDirection: number;
    protected _headDirection: number;
    protected _actions: ActiveActionData[];
    protected _defaultAction: IActiveActionData;
    protected _fullImageCache: IAdvancedMap<string, RenderTexture>;
    protected _isCachedImage: boolean;
    protected _image: RenderTexture | undefined;
    protected _avatarSpriteData: IAvatarDataContainer | undefined = undefined;


    protected _mainAction: IActiveActionData;
    protected _disposed: boolean = false;
    protected _canvasOffsets: number[] = [];
    protected _reusableTexture: RenderTexture;

    private _frameCounter: number = 0;
    private _directionOffset: number = 0;
    private _changes: boolean = true;
    private _sprites: ISpriteDataContainer[];
    private _isAnimating: boolean = false;
    private _animationHasResetOnToggle: boolean = false;
    private _actionsSorted: boolean = false;
    private _sortedActions: IActiveActionData[];
    private _lastActionsString: string;
    private _currentActionsString: string;
    private _fullImageCacheSize: number = 5;
    private _useFullImageCache: boolean = false;
    private _effectIdInUse: number = -1;
    private _animationFrameCount: number = 0;
    private _cachedBodyParts: AvatarBodyPartType[] = [];
    private _cachedBodyPartsDirection: number = -1;
    private _cachedBodyPartsGeometryType: AvatarGeometryType = AvatarGeometryType.Vertical;
    private _cachedBodyPartsAvatarSet: AvatarSetType = AvatarSetType.Full;

    constructor(structure: AvatarStructure, assets: AssetAliasCollection, container: AvatarFigureContainer | undefined, scale: AvatarScaleType, effectManager: EffectAssetDownloadManager | undefined = undefined, effectListener: IAvatarEffectListener | undefined = undefined) {
        this._structure = structure;
        this._assets = assets;
        this._effectManager = effectManager;
        this._effectListener = effectListener;

        if (!container) container = new AvatarFigureContainer('hr-893-45.hd-180-2.ch-210-66.lg-270-82.sh-300-91.wa-2007-.ri-1-');

        this._figure = container;
        this._scale = scale;
        this._cache = new AvatarImageCache(this._structure, this, this._assets, this._scale);

        this.setDirection(AvatarSetType.Full, 2);
        this._actions = [];
        this._defaultAction = new ActiveActionData(AvatarActionStateType.Stand);
        this._defaultAction.definition = this._structure.getActionDefinition(AvatarImage.DEFAULT_ACTION);
        this.resetActions();
        this._fullImageCache = new AdvancedMap();
        this._isCachedImage = false;
        this._image = undefined;
    }

    public dispose(): void {
        if (this._disposed) return;

        if (this._image) {
            this._image.destroy(true);

            this._image = undefined;
        }

        if (this._cache) {
            this._cache.dispose();
        }

        if (this._fullImageCache) {
            for (const k of this._fullImageCache.getValues()) k.destroy(true);

            this._fullImageCache.reset();
        }

        this._disposed = true;
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

    public getLayerData(sprite: ISpriteDataContainer): IAnimationLayerData | undefined {
        return this._structure.getBodyPartData(sprite.animation.id, this._frameCounter, sprite.id);
    }

    public updateAnimationByFrames(frame: number = 1): void {
        this._frameCounter += frame;
        this._changes = true;
    }

    public resetAnimationFrameCounter(): void {
        this._frameCounter = 0;
        this._changes = true;
    }

    public getImage(setType: AvatarSetType, hightlight: boolean, scale: number = 1): RenderTexture | undefined {
        if (!this._changes) return this._image;

        if (!this._mainAction?.definition) return undefined;

        if (!this._actionsSorted) this.endActionAppends();

        const cacheKey = this.getFullImageCacheKey();

        if (cacheKey) {
            const texture = this.getFullImage(cacheKey);

            if (texture) {
                this._changes = false;
                this._image = texture;
                this._isCachedImage = true;

                return this._image;
            }
        }

        const avatarCanvas = this._structure.getCanvas(this._scale, this._mainAction.definition.geometryType);

        if (!avatarCanvas) return undefined;

        if (this._isCachedImage || !this._image || this._image.width !== avatarCanvas.width || this._image.height !== avatarCanvas.height) {
            if (this._image && !this._isCachedImage) this._image.destroy(true);

            this._image = RenderTexture.create({ width: avatarCanvas.width, height: avatarCanvas.height });
            this._isCachedImage = false;
        }

        const _local_6 = this.getBodyParts(setType, this._mainAction.definition.geometryType, this._mainDirection);

        const container = new Container();

        let isCachable = true;
        let partCount = (_local_6.length - 1);

        while (partCount >= 0) {
            const set = _local_6[partCount];
            const part = this._cache.getImageContainer(set, this._frameCounter);

            console.log(part);

            if (part && part.image) {
                isCachable &&= part.isCacheable;

                const point = part.regPoint.clone();

                point.x += avatarCanvas.offset.x;
                point.y += avatarCanvas.offset.y;

                point.x += avatarCanvas.regPoint.x;
                point.y += avatarCanvas.regPoint.y;

                const partContainer = new Container();

                partContainer.addChild(part.image);

                if (partContainer) {
                    partContainer.position.set(point.x, point.y);

                    container.addChild(partContainer);
                }
            }

            partCount--;
        }

        if (this._avatarSpriteData) {
            const filters: Filter[] = [];

            if (!container.filters) container.filters = [];

            if (this._avatarSpriteData.colorTransform) filters.push(this._avatarSpriteData.colorTransform);

            //if (this._avatarSpriteData.paletteIsGrayscale) filters.push(this.getGrayscaleFilter(), new PaletteMapFilter(this._avatarSpriteData.reds, PaletteMapFilter.CHANNEL_RED));

            container.filters = filters;
        }

        if (cacheKey && isCachable) this.cacheFullImage(cacheKey, this._image);

        return this._image;
    }

    public initActionAppends(): void {
        this._actions = [];
        this._actionsSorted = false;
        this._currentActionsString = '';
        this._useFullImageCache = false;
    }

    public endActionAppends(): void {
        if (!this.sortActions()) return;

        for (const action of this._sortedActions) if (action.type === AvatarActionStateType.Effect && this._effectManager && !this._effectManager.isAvatarEffectReady(action.actionParameter)) this._effectManager.downloadAvatarEffect(action.actionParameter, this);

        this.resetActions();
        this.setActionsToParts();
    }

    public appendAction(action: AvatarActionStateType, ..._args: (AvatarActionStateType | number)[]): boolean {
        const state: AvatarActionStateType | number = _args[0];

        this._actionsSorted = false;

        switch (action) {
            case AvatarActionStateType.Posture: {
                switch (state) {
                    case AvatarActionStateType.Lay:
                    case AvatarActionStateType.Walk:
                    case AvatarActionStateType.Stand:
                    case AvatarActionStateType.Swim:
                    case AvatarActionStateType.Float:
                    case AvatarActionStateType.Sit:
                    case AvatarActionStateType.SnowwarRun:
                    case AvatarActionStateType.SnowwarDieFront:
                    case AvatarActionStateType.SnowwarDieBack:
                    case AvatarActionStateType.SnowwarPick:
                    case AvatarActionStateType.SnowwarThrow: {
                        if (state === AvatarActionStateType.Lay) {
                            if (this._mainDirection === 0) {
                                this.setDirection(AvatarSetType.Full, 4);
                            }
                            else {
                                this.setDirection(AvatarSetType.Full, 2);
                            }
                        }

                        if (state === AvatarActionStateType.Walk || state === AvatarActionStateType.Stand) this._useFullImageCache = true;

                        this.addActionData(state);
                    }
                }

                break;
            }
            case AvatarActionStateType.Gesture: {
                switch (state) {
                    case AvatarActionStateType.Angry:
                    case AvatarActionStateType.Sad:
                    case AvatarActionStateType.Smile:
                    case AvatarActionStateType.Surprised: {
                        this.addActionData(state);
                    }
                }

                break;
            }
            case AvatarActionStateType.Effect:
            case AvatarActionStateType.Dance:
            case AvatarActionStateType.Talk:
            case AvatarActionStateType.Wave:
            case AvatarActionStateType.Sleep:
            case AvatarActionStateType.Sign:
            case AvatarActionStateType.Respect:
            case AvatarActionStateType.BlowAKiss:
            case AvatarActionStateType.Laugh:
            case AvatarActionStateType.Cry:
            case AvatarActionStateType.Idle:
            case AvatarActionStateType.SnowboardOllie:
            case AvatarActionStateType.Snowboard360:
            case AvatarActionStateType.RideJump: {
                const effectId = (_args[0] as unknown as number);

                if (action === AvatarActionStateType.Effect && (effectId === 33 || effectId === 34 || effectId === 35 || effectId === 36 || effectId === 38 || effectId === 39)) this._useFullImageCache = true;

                this.addActionData(action, effectId);

                break;
            }
            case AvatarActionStateType.CarryObject:
            case AvatarActionStateType.UseObject: {
                this.addActionData(action, parseInt(this._structure.getActionDefinitionWithState(action)?.getParameterValue(state.toString()) ?? '0'));

                break;
            }
        }

        return true;
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

    public get mainAction(): string {
        return this._mainAction.type;
    }

    public get avatarSpriteData(): IAvatarDataContainer | undefined {
        return this._avatarSpriteData;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private getFullImage(key: string): RenderTexture | undefined {
        return this._fullImageCache[key];
    }

    private cacheFullImage(key: string, texture: RenderTexture): void {
        const existing = this._fullImageCache.getValue(key);

        if (existing) {
            this._fullImageCache.remove(key);

            existing.destroy(true);
        }

        if (this._fullImageCache.length === AvatarImage.MAX_IMAGE_CACHE) {
            const oldestKey = this._fullImageCache.getKey(0);

            if (oldestKey) {
                const removed = this._fullImageCache.remove(oldestKey);

                if (removed) removed.destroy(true);
            }
        }

        this._fullImageCache.add(key, texture);
    }

    private resetActions(): boolean {
        this._animationHasResetOnToggle = false;
        this._isAnimating = false;
        this._sprites = [];
        this._avatarSpriteData = undefined;
        this._directionOffset = 0;
        this._structure.removeDynamicItems(this);
        this._mainAction = this._defaultAction;
        this._mainAction.definition = this._defaultAction.definition;
        this.resetBodyPartCache(this._defaultAction);
        return true;
    }

    private addActionData(stateType: AvatarActionStateType, parameter: number = -1): void {
        if (!this._actions) this._actions = [];

        for (const action of this._actions) if (action.type === stateType && action.actionParameter === parameter) return;

        this._actions.push(new ActiveActionData(stateType, parameter, this._frameCounter));
    }

    private isHeadTurnPreventedByAction(): boolean {
        for (const action of this._sortedActions) {
            const _local_2 = this._structure.getActionDefinitionWithState(action.type);

            if (_local_2 && _local_2.getPreventHeadTurn(action.actionParameter)) return true;
        }

        return false;
    }

    private sortActions(): boolean {
        let effectActive: boolean = false;
        let effectChanged: boolean = false;
        let k: boolean = false;

        this._currentActionsString = '';
        this._sortedActions = this._structure.sortActions(this._actions);
        this._animationFrameCount = this._structure.maxFrames(this._sortedActions);

        if (!this._sortedActions) {
            this._canvasOffsets = [0, 0, 0];

            if (this._lastActionsString !== '') {
                k = true;

                this._lastActionsString = '';
            }
        } else {
            this._canvasOffsets = this._structure.getCanvasOffsets(this._sortedActions, this._scale, this._mainDirection);

            for (const action of this._sortedActions) {
                this._currentActionsString = (this._currentActionsString + action.type + action.actionParameter);

                if (action.type === AvatarActionStateType.Effect) {
                    if (this._effectIdInUse !== action.actionParameter) effectActive = true;

                    this._effectIdInUse = action.actionParameter;

                    effectChanged = true;
                }
            }

            if (!effectChanged) {
                if (this._effectIdInUse > -1) effectActive = true;

                this._effectIdInUse = -1;
            }

            if (effectActive) this._cache.disposeInactiveActions(0);

            if (this._lastActionsString !== this._currentActionsString) {
                k = true;

                this._lastActionsString = this._currentActionsString;
            }
        }

        this._actionsSorted = true;

        return k;
    }

    private setActionsToParts(): void {
        const time: number = GetTickerTime();
        const _local_4: AvatarActionStateType[] = [];

        for (const action of this._sortedActions) _local_4.push(action.type);

        for (const action of this._sortedActions) {
            if (!action?.definition?.isAnimation) continue;

            const animation = this._structure.getAnimation(action.definition.state + '.' + action.actionParameter);

            if (animation?.hasOverriddenActions()) for (const _local_6 of animation.overriddenActionNames()) if (_local_4.indexOf(_local_6) >= 0) action.overridingAction = animation.overridingAction(_local_6);

            if (animation && animation.resetOnToggle) this._animationHasResetOnToggle = true;
        }

        for (const action of this._sortedActions) {
            if (!action?.definition) continue;

            if (action.definition.isAnimation && action.actionParameter === undefined) action.actionParameter = 1;

            this.setActionToParts(action, time);

            if (!action.definition.isAnimation) continue;

            this._isAnimating = action.definition.isAnimated(action.actionParameter);

            const animation = this._structure.getAnimation(action.definition.state + '.' + action.actionParameter);

            if (!animation) continue;

            this._sprites = this._sprites.concat(animation.spriteData);

            if (animation.directionData) this._directionOffset = animation.directionData.offset;

            if (animation.avatarData) this._avatarSpriteData = animation.avatarData;
        }
    }

    private setActionToParts(action: IActiveActionData, time: number): void {
        console.log(action);
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

    private getFullImageCacheKey(): string | undefined {
        if (!this._useFullImageCache) return undefined;

        if (this._sortedActions.length === 1 && this._mainDirection === this._headDirection) return (this._mainDirection + this._currentActionsString) + (this._frameCounter % 4);

        if (this._sortedActions.length === 2) for (const k of this._sortedActions) {
            if (k.type === AvatarActionStateType.Effect && (k.actionParameter === 33 || k.actionParameter === 34 || k.actionParameter === 35 || k.actionParameter === 36)) return (this._mainDirection + this._currentActionsString) + 0;

            if (k.type === AvatarActionStateType.Effect && (k.actionParameter === 38 || k.actionParameter === 39)) return (((this._mainDirection + '_') + this._headDirection) + this._currentActionsString) + (this._frameCounter % 11);

            if (k.type === AvatarActionStateType.Dance && (k.actionParameter === 1 || k.actionParameter === 2 || k.actionParameter === 3 || k.actionParameter === 4)) {
                let frame = (this._frameCounter % 8);

                if ((k.actionParameter === 3)) frame = (this._frameCounter % 10);

                if ((k.actionParameter === 4)) frame = (this._frameCounter % 16);

                return this._mainDirection + k.type + k.actionParameter + frame;
            }
        }

        return undefined;
    }

    private getGrayscaleFilter(channel: string = 'CHANNELS_EQUAL'): Filter {
        let _local_3 = 0.33;
        let _local_4 = 0.33;
        let _local_5 = 0.33;
        const _local_6 = 1;

        switch (channel) {
            case AvatarImage.CHANNELS_UNIQUE:
                _local_3 = 0.3;
                _local_4 = 0.59;
                _local_5 = 0.11;
                break;
            case AvatarImage.CHANNELS_RED:
                _local_3 = 1;
                _local_4 = 0;
                _local_5 = 0;
                break;
            case AvatarImage.CHANNELS_GREEN:
                _local_3 = 0;
                _local_4 = 1;
                _local_5 = 0;
                break;
            case AvatarImage.CHANNELS_BLUE:
                _local_3 = 0;
                _local_4 = 0;
                _local_5 = 1;
                break;
            case AvatarImage.CHANNELS_DESATURATED:
                _local_3 = 0.3086;
                _local_4 = 0.6094;
                _local_5 = 0.082;
                break;
        }

        const filter = new ColorMatrixFilter();

        filter.matrix = [_local_3, _local_4, _local_5, 0, 0, _local_3, _local_4, _local_5, 0, 0, _local_3, _local_4, _local_5, 0, 0, 0, 0, 0, 1, 0];

        return filter;
    }
}
