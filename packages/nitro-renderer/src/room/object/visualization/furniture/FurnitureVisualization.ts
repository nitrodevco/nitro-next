import { AlphaTolerance, IGraphicAsset, IObjectVisualizationData, IRoomGeometry, IRoomObjectSprite, IVariableFxStatusModelData, RoomGeometryScaleType, RoomObjectSpriteTypeEnum, RoomObjectVariableEnum, RoomObjectVisualizationType } from '@nitrodevco/nitro-api';
import { BLEND_MODES, Filter, Texture } from 'pixi.js';

import { GetTickerTime } from '#renderer/utils';

import { ColorData, LayerData } from '../data';
import { RoomObjectSpriteVisualization } from '../RoomObjectSpriteVisualization';
import { StackedAdditionStack } from '../stacked/StackedAdditionStack';
import { IVariableFxVisualizationHost, IVariableFxVisualizationRoomData } from '../variablefx/IVariableFxVisualizationRoomData';
import { VariableFxStatusReconciler } from '../variablefx/VariableFxStatusReconciler';
import { FurnitureVisualizationData } from './FurnitureVisualizationData';

export class FurnitureVisualization extends RoomObjectSpriteVisualization implements IVariableFxVisualizationHost {
    protected static DEPTH_MULTIPLIER: number = Math.sqrt(0.5);

    public static TYPE: string = RoomObjectVisualizationType.FURNITURE_STATIC;

    private static VARIABLE_FX_SPRITE_TAG: string = 'variable_fx';
    private static VARIABLE_FX_ASSET_NAME: string = 'variable_fx_stack';
    private static VARIABLE_FX_STACK_LAYER: number = 0;
    private static VARIABLE_FX_STACK_GAP: number = 4;
    private static VARIABLE_FX_MANAGER_UPDATE_ID_UNSET: number = -2;

    protected _data: FurnitureVisualizationData | undefined = undefined;
    protected _type: string | undefined = undefined;
    protected _direction: number = 0;
    protected _lastCameraAngle: number = NaN;
    protected _selectedColor: number = 0;
    protected _furnitureLift: number = 0;
    protected _alphaMultiplier: number = 1;
    protected _alphaChanged: boolean = false;
    protected _clickUrl: string | undefined = undefined;
    protected _clickHandling: boolean = false;

    protected _cacheDirection: number = -1;
    protected _cacheScale: RoomGeometryScaleType = RoomGeometryScaleType.None;
    protected _cacheSize: number = -1;

    protected _layerCount: number = 0;
    protected _shadowLayerIndex: number = -1;
    protected _updatedLayers: boolean[] = [];
    protected _assetNames: string[] = [];
    protected _spriteTags: string[] = [];
    protected _spriteBlendModes: BLEND_MODES[] = [];
    protected _spriteAlphas: number[] = [];
    protected _spriteColors: number[] = [];
    protected _spriteMouseCaptures: boolean[] = [];
    protected _spriteXOffsets: number[] = [];
    protected _spriteYOffsets: number[] = [];
    protected _spriteZOffsets: number[] = [];
    protected _filters: Filter[] = [];

    private _animationNumber: number = 0;
    private _lookThrough: boolean = false;
    private _needsLookThroughUpdate: boolean = false;
    private _lastUpdateTime: number = -1000;

    private _variableFxRoomData: IVariableFxVisualizationRoomData | undefined = undefined;
    private _variableFxStack: StackedAdditionStack | undefined = new StackedAdditionStack();
    private _variableFxReconciler: VariableFxStatusReconciler = new VariableFxStatusReconciler();
    private _variableFxManagerUpdateId: number = FurnitureVisualization.VARIABLE_FX_MANAGER_UPDATE_ID_UNSET;
    private _variableFxSpriteIndex: number = -1;
    private _variableFxAnchorY: number = 0;
    private _variableFxAnchorX: number = 0;

    public override initialize(data: IObjectVisualizationData): boolean {
        this.reset();

        if (!(data instanceof FurnitureVisualizationData)) return false;

        this._type = data.type;
        this._data = data;

        return true;
    }

    public override dispose(): void {
        if (this._variableFxStack) {
            this._variableFxStack.dispose();
            this._variableFxStack = undefined;
        }

        super.dispose();

        this._data = undefined;
        this._variableFxRoomData = undefined;
        this.resetSpriteData();
    }

    /** The room's Variable FX tables for this object's kind; set by the room when the visualization is created. */
    public get variableFxRoomData(): IVariableFxVisualizationRoomData | undefined {
        return this._variableFxRoomData;
    }

    public set variableFxRoomData(data: IVariableFxVisualizationRoomData | undefined) {
        this._variableFxRoomData = data;
        this._variableFxManagerUpdateId = FurnitureVisualization.VARIABLE_FX_MANAGER_UPDATE_ID_UNSET;
    }

    protected resetSpriteData(): void {
        this._updatedLayers = [];
        this._assetNames = [];
        this._spriteTags = [];
        this._spriteBlendModes = [];
        this._spriteAlphas = [];
        this._spriteColors = [];
        this._spriteMouseCaptures = [];
        this._spriteXOffsets = [];
        this._spriteYOffsets = [];
        this._spriteZOffsets = [];
        this._filters = [];
    }

    protected override reset(): void {
        super.reset();

        this._data = undefined;

        this.setDirection(-1);
        this.resetVariableFxStack();
        this.resetSpriteData();
        this.createSprites(0);
    }

    protected resetLayers(scale: RoomGeometryScaleType, direction: number): void {
        if (this._cacheDirection === direction && this._cacheScale === scale) return;

        this.resetSpriteData();

        this._cacheDirection = direction;
        this._cacheScale = scale;
        this._cacheSize = this.getValidSize(scale);

        this.setLayerCount(((this._data && this._data.getLayerCount(scale)) || 0) + this.getAdditionalLayerCount());
    }

    public override update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean): void {
        if (!geometry || time < this._lastUpdateTime + RoomObjectSpriteVisualization.UPDATE_TIME_INCREASER) return;

        this._lastUpdateTime += RoomObjectSpriteVisualization.UPDATE_TIME_INCREASER;

        if (this._lastUpdateTime + RoomObjectSpriteVisualization.UPDATE_TIME_INCREASER < time) this._lastUpdateTime = time - RoomObjectSpriteVisualization.UPDATE_TIME_INCREASER;

        const scale = geometry.scale;
        let updateSprites = false;

        if (this.updateObject(scale, geometry.direction.x)) updateSprites = true;

        if (this.updateModel(scale)) updateSprites = true;

        if (this._needsLookThroughUpdate) {
            updateSprites = true;
            this._needsLookThroughUpdate = false;
        }

        let animation = 0;

        if (skipUpdate) {
            this._animationNumber |= this.updateAnimation(scale);
        } else {
            animation = this.updateAnimation(scale) | this._animationNumber;

            this._animationNumber = 0;
        }

        if (updateSprites || animation !== 0) {
            this.updateSprites(scale, updateSprites, animation);

            this._scale = scale;

            this.updateSpriteCounter++;
        }

        if (this.updateVariableFxOverlay(scale, updateSprites || animation !== 0)) this.updateSpriteCounter++;
    }

    protected updateObject(scale: RoomGeometryScaleType, direction: number): boolean {
        if (
            this.updateObjectCounter === this.object.updateCounter
            && scale === this._scale
            && this._lastCameraAngle === direction
        )
            return false;

        if (this._data)
            this.setDirection(
                this._data.getValidDirection(
                    scale,
                    (this.object.getDirection().x - ((direction + 135) % 360) + 360) % 360,
                ),
            );

        this._lastCameraAngle = direction;
        this._scale = scale;

        this.updateObjectCounter = this.object.updateCounter;

        this.resetLayers(scale, this._direction);

        return true;
    }

    protected updateModel(scale: RoomGeometryScaleType): boolean {
        const model = this.object && this.object.model;

        if (!model) return false;

        const variableFxManagerUpdateId = this.getVariableFxVisualizationManagerUpdateId();
        const modelChanged = this.updateModelCounter !== model.updateCounter;
        const variableFxManagerChanged = variableFxManagerUpdateId !== this._variableFxManagerUpdateId;

        if (!modelChanged && !variableFxManagerChanged) return false;

        if (modelChanged) {
            this._selectedColor = model.getValue<number>(RoomObjectVariableEnum.FurnitureColor);
            this._clickUrl = model.getValue<string>(RoomObjectVariableEnum.FurnitureAdUrl);
            this._clickHandling
                = (this._clickUrl && this._clickUrl !== '' && this._clickUrl.indexOf('http') === 0) || false;
            this._furnitureLift = model.getValue<number>(RoomObjectVariableEnum.FurnitureLiftAmount) || 0;

            let alphaMultiplier = model.getValue<number>(RoomObjectVariableEnum.FurnitureAlphaMultiplier);

            if (isNaN(alphaMultiplier)) alphaMultiplier = 1;

            if (this._alphaMultiplier !== alphaMultiplier) {
                this._alphaMultiplier = alphaMultiplier;

                this._alphaChanged = true;
            }
        }

        const variableFxChanged = this.reconcileVariableFxStatuses(model.getValue<IVariableFxStatusModelData | undefined>(RoomObjectVariableEnum.VariableFxStatuses));

        this.updateModelCounter = model.updateCounter;
        this._variableFxManagerUpdateId = variableFxManagerUpdateId;

        return modelChanged || variableFxChanged;
    }

    protected updateSprites(scale: RoomGeometryScaleType, update: boolean, animation: number): void {
        if (this._layerCount !== this.totalSprites) this.createSprites(this._layerCount);

        if (update) {
            let layerId = this.totalSprites - 1;

            while (layerId >= 0) {
                this.updateSprite(scale, layerId);

                layerId--;
            }
        } else {
            let layerId = 0;

            while (animation > 0) {
                if (animation) this.updateSprite(scale, layerId);

                layerId++;
                animation = animation >> 1;
            }
        }

        this._alphaChanged = false;
    }

    protected updateSprite(scale: RoomGeometryScaleType, layerId: number): void {
        if (layerId === this._variableFxSpriteIndex) {
            this.clearVariableFxOverlaySprite(this.getSprite(layerId));

            return;
        }

        const assetName = this.getSpriteAssetName(scale, layerId);
        const sprite = this.getSprite(layerId);

        if (assetName && sprite) {
            const assetData = this.getAsset(assetName, layerId);

            if (assetData) {
                sprite.visible = true;
                sprite.type = this._type!;
                sprite.texture = this.getTexture(scale, layerId, assetData);
                sprite.flipH = assetData.flipH;
                sprite.flipV = assetData.flipV;
                sprite.direction = this._direction;

                let relativeDepth = 0;

                if (layerId !== this._shadowLayerIndex) {
                    sprite.tag = this.getLayerTag(scale, this._direction, layerId);
                    sprite.alpha = this.getLayerAlpha(scale, this._direction, layerId);
                    sprite.color = this.getLayerColor(scale, layerId, this._selectedColor);
                    sprite.offsetX = assetData.offsetX + this.getLayerXOffset(scale, this._direction, layerId);
                    sprite.offsetY = assetData.offsetY + this.getLayerYOffset(scale, this._direction, layerId);
                    sprite.blendMode = this.getLayerBlendMode(scale, this._direction, layerId);
                    sprite.alphaTolerance = this.getLayerIgnoreMouse(scale, this._direction, layerId)
                        ? AlphaTolerance.MATCH_NOTHING
                        : AlphaTolerance.MATCH_OPAQUE_PIXELS;

                    relativeDepth = this.getLayerZOffset(scale, this._direction, layerId);
                    relativeDepth = relativeDepth - layerId * 0.001;
                } else {
                    sprite.offsetX = assetData.offsetX;
                    sprite.offsetY = assetData.offsetY + this.getLayerYOffset(scale, this._direction, layerId);
                    sprite.alpha = 48 * this._alphaMultiplier;
                    sprite.alphaTolerance = AlphaTolerance.MATCH_NOTHING;

                    relativeDepth = 1;
                }

                if (this._lookThrough) sprite.alpha *= 0.2;

                sprite.relativeDepth = relativeDepth * FurnitureVisualization.DEPTH_MULTIPLIER;
                sprite.name = assetName;
                sprite.libraryAssetName = this.getLibraryAssetNameForSprite(assetData, sprite);
                sprite.posture = assetData.source ? this.getPostureForAsset(scale, assetData.source) : undefined;
                sprite.clickHandling = this._clickHandling;

                if (sprite.blendMode !== 'add') sprite.filters = this._filters;
            } else {
                this.resetSprite(sprite);
            }
        } else if (sprite) this.resetSprite(sprite);
    }

    protected getLibraryAssetNameForSprite(asset: IGraphicAsset, sprite: IRoomObjectSprite): string | undefined {
        return asset?.source;
    }

    protected getPostureForAssetFile(scale: RoomGeometryScaleType, _arg_2: string): string | undefined {
        return undefined;
    }

    private resetSprite(sprite: IRoomObjectSprite): void {
        if (!sprite) return;

        sprite.texture = Texture.EMPTY;
        sprite.libraryAssetName = '';
        sprite.posture = '';
        sprite.tag = '';
        sprite.offsetX = 0;
        sprite.offsetY = 0;
        sprite.flipH = false;
        sprite.flipV = false;
        sprite.relativeDepth = 0;
        sprite.clickHandling = false;
    }

    protected getSpriteAssetName(scale: RoomGeometryScaleType, layerId: number): string {
        if (!this._data || layerId >= FurnitureVisualizationData.LAYER_LETTERS.length) return '';

        let assetName = this._assetNames[layerId];
        let updated = this._updatedLayers[layerId];

        if (!assetName || !assetName.length) {
            assetName = this.cacheSpriteAssetName(scale, layerId, true);
            updated = this._cacheSize !== 1;
        }

        if (updated) assetName += this.getFrameNumber(scale, layerId);

        return assetName;
    }

    protected cacheSpriteAssetName(scale: RoomGeometryScaleType, layerId: number, cache: boolean): string {
        const size = cache ? this._cacheSize : this.getValidSize(scale);
        const isntIcon = size !== 1;

        let assetName = '';

        if (layerId !== this._shadowLayerIndex) {
            assetName = FurnitureVisualizationData.LAYER_LETTERS[layerId] || '';
        } else {
            assetName = 'sd';
        }

        if (assetName.length > 0) {
            assetName
                = this._type
                    + (isntIcon ? '_' + size + '_' + assetName + '_' + this._direction + '_' : '_icon_' + assetName);
        }

        if (cache) {
            this._assetNames[layerId] = assetName;
            this._updatedLayers[layerId] = isntIcon;
        }

        return assetName;
    }

    protected getLayerTag(scale: RoomGeometryScaleType, direction: number, layerId: number): string {
        const existing = this._spriteTags[layerId];

        if (existing !== undefined) return existing;

        if (!this._data) return LayerData.DEFAULT_TAG;

        const tag = this._data.getLayerTag(scale, direction, layerId);

        this._spriteTags[layerId] = tag;

        return tag;
    }

    protected getLayerBlendMode(scale: RoomGeometryScaleType, direction: number, layerId: number): BLEND_MODES {
        const existing = this._spriteBlendModes[layerId];

        if (existing !== undefined) return existing;

        if (!this._data) return LayerData.DEFAULT_BLEND_MODE;

        const blendMode = this._data.getLayerBlendMode(scale, direction, layerId);

        this._spriteBlendModes[layerId] = blendMode;

        return blendMode;
    }

    protected getLayerAlpha(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        if (!this._alphaChanged) {
            const existing = this._spriteAlphas[layerId];

            if (existing !== undefined) return existing;
        }

        if (!this._data) return LayerData.DEFAULT_ALPHA;

        let alpha = this._data.getLayerAlpha(scale, direction, layerId);

        if (this._alphaMultiplier !== null) alpha = alpha * this._alphaMultiplier;

        this._spriteAlphas[layerId] = alpha;

        return alpha;
    }

    protected getLayerColor(scale: RoomGeometryScaleType, layerId: number, colorId: number): number {
        const existing = this._spriteColors[layerId];

        if (existing !== undefined) return existing;

        if (!this._data) return ColorData.DEFAULT_COLOR;

        const color = this._data.getLayerColor(scale, layerId, colorId);

        this._spriteColors[layerId] = color;

        return color;
    }

    protected getLayerIgnoreMouse(scale: RoomGeometryScaleType, direction: number, layerId: number): boolean {
        const existing = this._spriteMouseCaptures[layerId];

        if (existing !== undefined) return existing;

        if (!this._data) return LayerData.DEFAULT_IGNORE_MOUSE;

        const ignoreMouse = this._data.getLayerIgnoreMouse(scale, direction, layerId);

        this._spriteMouseCaptures[layerId] = ignoreMouse;

        return ignoreMouse;
    }

    protected getLayerXOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        const existing = this._spriteXOffsets[layerId];

        if (existing !== undefined) return existing;

        if (!this._data) return LayerData.DEFAULT_XOFFSET;

        const xOffset = this._data.getLayerXOffset(scale, direction, layerId);

        this._spriteXOffsets[layerId] = xOffset;

        return xOffset;
    }

    protected getLayerYOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        if (layerId === this._shadowLayerIndex) return Math.ceil(this._furnitureLift * (scale / 2));

        const existing = this._spriteYOffsets[layerId];

        if (existing !== undefined) return existing;

        if (!this._data) return LayerData.DEFAULT_YOFFSET;

        const yOffset = this._data.getLayerYOffset(scale, direction, layerId);

        this._spriteYOffsets[layerId] = yOffset;

        return yOffset;
    }

    protected getLayerZOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        const existing = this._spriteZOffsets[layerId];

        if (existing !== undefined) return existing;

        if (!this._data) return LayerData.DEFAULT_ZOFFSET;

        const zOffset = this._data.getLayerZOffset(scale, direction, layerId);

        this._spriteZOffsets[layerId] = zOffset;

        return zOffset;
    }

    protected getValidSize(scale: RoomGeometryScaleType): number {
        if (!this._data) return scale;

        return this._data.getValidSize(scale);
    }

    protected setLayerCount(count: number): void {
        this._layerCount = count;
        this._shadowLayerIndex = count - this.getAdditionalLayerCount();

        this.reserveVariableFxOverlaySprite();
    }

    /** One extra sprite, right after the shadow, carries the composed Variable FX stack. */
    protected reserveVariableFxOverlaySprite(): void {
        this._variableFxSpriteIndex = this._shadowLayerIndex >= 0 ? this._shadowLayerIndex + 1 : this._layerCount;
        this._layerCount++;
    }

    private updateVariableFxOverlay(scale: RoomGeometryScaleType, update: boolean): boolean {
        const stack = this._variableFxStack;

        if (!stack) return false;
        if (!update && stack.isCachedIdle) return false;

        const sprite = this.getVariableFxSprite();

        if (!sprite) return false;
        if (stack.isEmpty && !sprite.visible) return false;
        if (!update && stack.isIdleInvisible && !sprite.visible) return false;

        const updateCounter = sprite.updateCounter;

        this.applyVariableFxOverlaySpriteDefaults(sprite);

        if (!this.resolveVariableFxAnchor()) {
            const animated = stack.animate(sprite, 0);

            this.clearVariableFxOverlaySprite(sprite);

            return animated || sprite.updateCounter !== updateCounter;
        }

        const changed = update ? stack.update(sprite, scale, this._variableFxAnchorY) : stack.animate(sprite, this._variableFxAnchorY);
        const positioned = update || changed || sprite.updateCounter !== updateCounter;

        this.applyVariableFxOverlaySpriteDefaults(sprite);

        if (sprite.visible && stack.texture && positioned) {
            sprite.offsetX += this._variableFxAnchorX;
        } else if (!sprite.visible) {
            sprite.texture = Texture.EMPTY;
        }

        return changed || sprite.updateCounter !== updateCounter;
    }

    /** The stack sits above the furni: centred on the union of its visible layers, 4px above the topmost one. */
    private resolveVariableFxAnchor(): boolean {
        const limit = this._shadowLayerIndex >= 0 ? this._shadowLayerIndex : this._variableFxSpriteIndex;

        let found = false;
        let minX = 0;
        let maxX = 0;
        let minY = 0;

        for (let index = 0; index < limit; index++) {
            const sprite = this.getSprite(index);

            if (!sprite || !sprite.visible || !sprite.texture || sprite.texture === Texture.EMPTY || sprite.alpha <= 0 || sprite.width <= 0 || sprite.height <= 0) continue;

            const left = sprite.offsetX;
            const right = left + sprite.width;

            if (!found) {
                minX = left;
                maxX = right;
                minY = sprite.offsetY;
                found = true;
            } else {
                if (left < minX) minX = left;
                if (right > maxX) maxX = right;
                if (sprite.offsetY < minY) minY = sprite.offsetY;
            }
        }

        if (!found) return false;

        this._variableFxAnchorX = Math.round((minX + maxX) / 2);
        this._variableFxAnchorY = minY - FurnitureVisualization.VARIABLE_FX_STACK_GAP;

        return true;
    }

    private applyVariableFxOverlaySpriteDefaults(sprite: IRoomObjectSprite | undefined): void {
        if (!sprite) return;

        sprite.type = this._type ?? '';
        sprite.name = FurnitureVisualization.VARIABLE_FX_ASSET_NAME;
        sprite.libraryAssetName = FurnitureVisualization.VARIABLE_FX_ASSET_NAME;
        sprite.posture = undefined;
        sprite.tag = FurnitureVisualization.VARIABLE_FX_SPRITE_TAG;
        sprite.color = 0xffffff;
        sprite.blendMode = 'normal';
        sprite.flipH = false;
        sprite.flipV = false;
        sprite.direction = this._direction;
        sprite.alphaTolerance = AlphaTolerance.MATCH_NOTHING;
        sprite.clickHandling = false;
        sprite.skipMouseHandling = true;
        sprite.filters = [];
        sprite.spriteType = RoomObjectSpriteTypeEnum.Default;
        sprite.varyingDepth = false;
    }

    private clearVariableFxOverlaySprite(sprite: IRoomObjectSprite | undefined): void {
        if (!sprite) return;

        this.applyVariableFxOverlaySpriteDefaults(sprite);

        sprite.texture = Texture.EMPTY;
        sprite.visible = false;
        sprite.alpha = 0;
        sprite.offsetX = 0;
        sprite.offsetY = 0;
        sprite.relativeDepth = 0;
    }

    private getVariableFxSprite(): IRoomObjectSprite | undefined {
        return this._variableFxSpriteIndex < 0 ? undefined : this.getSprite(this._variableFxSpriteIndex);
    }

    private getVariableFxVisualizationManagerUpdateId(): number {
        return this._variableFxRoomData?.variableFxVisualizationManager.updateId ?? -1;
    }

    private reconcileVariableFxStatuses(data: IVariableFxStatusModelData | undefined): boolean {
        if (!this._variableFxStack) this._variableFxStack = new StackedAdditionStack();

        return this._variableFxReconciler.reconcile(data, this._variableFxRoomData?.variableFxVisualizationManager, this._variableFxRoomData?.variableFxAssetProvider, this._variableFxRoomData?.variableFxRendererRegistry, this._variableFxStack, FurnitureVisualization.VARIABLE_FX_STACK_LAYER, GetTickerTime());
    }

    private resetVariableFxStack(): void {
        if (this._variableFxStack) this._variableFxStack.dispose();

        this._variableFxStack = new StackedAdditionStack();
        this._variableFxReconciler = new VariableFxStatusReconciler();
        this._variableFxManagerUpdateId = FurnitureVisualization.VARIABLE_FX_MANAGER_UPDATE_ID_UNSET;
        this._variableFxSpriteIndex = -1;
        this._variableFxAnchorY = 0;
        this._variableFxAnchorX = 0;
    }

    protected setDirection(direction: number): void {
        if (this._direction === direction) return;

        this._direction = direction;
    }

    protected getAdditionalLayerCount(): number {
        return 1;
    }

    protected updateAnimation(scale: RoomGeometryScaleType): number {
        return 0;
    }

    protected getFrameNumber(scale: RoomGeometryScaleType, layerId: number): number {
        return 0;
    }

    protected getPostureForAsset(scale: RoomGeometryScaleType, name: string): string | undefined {
        return undefined;
    }

    public getAsset(name: string, layerId: number = -1): IGraphicAsset | undefined {
        return this.asset?.getAsset(name);
    }

    public getTexture(scale: RoomGeometryScaleType, layerId: number, asset: IGraphicAsset): Texture {
        return asset?.texture || Texture.EMPTY;
    }

    public set lookThrough(flag: boolean) {
        if (this._lookThrough == flag) return;

        this._lookThrough = flag;
        this._needsLookThroughUpdate = true;
    }

    protected get direction(): number {
        return this._direction;
    }

    protected get data(): FurnitureVisualizationData | undefined {
        return this._data;
    }
}
