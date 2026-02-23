import type { IGraphicAsset, IObjectVisualizationData, IRoomGeometry, IRoomObjectSprite } from '@nitrodevco/nitro-api';
import { AlphaTolerance, RoomObjectVariableEnum, RoomObjectVisualizationType } from '@nitrodevco/nitro-api';
import type { BLEND_MODES, Filter } from 'pixi.js';
import { Texture } from 'pixi.js';

import { ColorData, LayerData } from '../data';
import { RoomObjectSpriteVisualization } from '../RoomObjectSpriteVisualization';
import { FurnitureVisualizationData } from './FurnitureVisualizationData';

export class FurnitureVisualization extends RoomObjectSpriteVisualization {
    protected static DEPTH_MULTIPLIER: number = Math.sqrt(0.5);

    public static TYPE: string = RoomObjectVisualizationType.FURNITURE_STATIC;

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
    protected _cacheScale: number = 0;
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

    public override initialize(data: IObjectVisualizationData): boolean {
        this.reset();

        if (!(data instanceof FurnitureVisualizationData)) return false;

        this._type = data.type;
        this._data = data;

        return true;
    }

    public override dispose(): void {
        super.dispose();

        this._data = undefined;
        this.resetSpriteData();
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
        this.resetSpriteData();
        this.createSprites(0);
    }

    protected resetLayers(scale: number, direction: number): void {
        if (this._cacheDirection === direction && this._cacheScale === scale) return;

        this.resetSpriteData();

        this._cacheDirection = direction;
        this._cacheScale = scale;
        this._cacheSize = this.getValidSize(scale);

        this.setLayerCount(((this._data && this._data.getLayerCount(scale)) || 0) + this.getAdditionalLayerCount());
    }

    public override update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean): void {
        if (!geometry || time < this._lastUpdateTime + 41) return;

        this._lastUpdateTime += 41;

        if (this._lastUpdateTime + 41 < time) this._lastUpdateTime = time - 41;

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
    }

    protected updateObject(scale: number, direction: number): boolean {
        if (
            this.updateObjectCounter === this.object.updateCounter &&
            scale === this._scale &&
            this._lastCameraAngle === direction
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

    protected updateModel(scale: number): boolean {
        const model = this.object && this.object.model;

        if (!model) return false;

        if (this.updateModelCounter === model.updateCounter) return false;

        this._selectedColor = model.getValue<number>(RoomObjectVariableEnum.FurnitureColor);
        this._clickUrl = model.getValue<string>(RoomObjectVariableEnum.FurnitureAdUrl);
        this._clickHandling =
            (this._clickUrl && this._clickUrl !== '' && this._clickUrl.indexOf('http') === 0) || false;
        this._furnitureLift = model.getValue<number>(RoomObjectVariableEnum.FurnitureLiftAmount) || 0;

        let alphaMultiplier = model.getValue<number>(RoomObjectVariableEnum.FurnitureAlphaMultiplier);

        if (isNaN(alphaMultiplier)) alphaMultiplier = 1;

        if (this._alphaMultiplier !== alphaMultiplier) {
            this._alphaMultiplier = alphaMultiplier;

            this._alphaChanged = true;
        }

        this.updateModelCounter = model.updateCounter;

        return true;
    }

    protected updateSprites(scale: number, update: boolean, animation: number): void {
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

    protected updateSprite(scale: number, layerId: number): void {
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

    protected getPostureForAssetFile(scale: number, _arg_2: string): string | undefined {
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

    protected getSpriteAssetName(scale: number, layerId: number): string {
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

    protected cacheSpriteAssetName(scale: number, layerId: number, cache: boolean): string {
        const size = cache ? this._cacheSize : this.getValidSize(scale);
        const isntIcon = size !== 1;

        let assetName = '';

        if (layerId !== this._shadowLayerIndex) {
            assetName = FurnitureVisualizationData.LAYER_LETTERS[layerId] || '';
        } else {
            assetName = 'sd';
        }

        if (assetName.length > 0) {
            assetName =
                this._type +
                (isntIcon ? '_' + size + '_' + assetName + '_' + this._direction + '_' : '_icon_' + assetName);
        }

        if (cache) {
            this._assetNames[layerId] = assetName;
            this._updatedLayers[layerId] = isntIcon;
        }

        return assetName;
    }

    protected getLayerTag(scale: number, direction: number, layerId: number): string {
        const existing = this._spriteTags[layerId];

        if (existing !== undefined) return existing;

        if (!this._data) return LayerData.DEFAULT_TAG;

        const tag = this._data.getLayerTag(scale, direction, layerId);

        this._spriteTags[layerId] = tag;

        return tag;
    }

    protected getLayerBlendMode(scale: number, direction: number, layerId: number): BLEND_MODES {
        const existing = this._spriteBlendModes[layerId];

        if (existing !== undefined) return existing;

        if (!this._data) return LayerData.DEFAULT_BLEND_MODE;

        const blendMode = this._data.getLayerBlendMode(scale, direction, layerId);

        this._spriteBlendModes[layerId] = blendMode;

        return blendMode;
    }

    protected getLayerAlpha(scale: number, direction: number, layerId: number): number {
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

    protected getLayerColor(scale: number, layerId: number, colorId: number): number {
        const existing = this._spriteColors[layerId];

        if (existing !== undefined) return existing;

        if (!this._data) return ColorData.DEFAULT_COLOR;

        const color = this._data.getLayerColor(scale, layerId, colorId);

        this._spriteColors[layerId] = color;

        return color;
    }

    protected getLayerIgnoreMouse(scale: number, direction: number, layerId: number): boolean {
        const existing = this._spriteMouseCaptures[layerId];

        if (existing !== undefined) return existing;

        if (!this._data) return LayerData.DEFAULT_IGNORE_MOUSE;

        const ignoreMouse = this._data.getLayerIgnoreMouse(scale, direction, layerId);

        this._spriteMouseCaptures[layerId] = ignoreMouse;

        return ignoreMouse;
    }

    protected getLayerXOffset(scale: number, direction: number, layerId: number): number {
        const existing = this._spriteXOffsets[layerId];

        if (existing !== undefined) return existing;

        if (!this._data) return LayerData.DEFAULT_XOFFSET;

        const xOffset = this._data.getLayerXOffset(scale, direction, layerId);

        this._spriteXOffsets[layerId] = xOffset;

        return xOffset;
    }

    protected getLayerYOffset(scale: number, direction: number, layerId: number): number {
        if (layerId === this._shadowLayerIndex) return Math.ceil(this._furnitureLift * (scale / 2));

        const existing = this._spriteYOffsets[layerId];

        if (existing !== undefined) return existing;

        if (!this._data) return LayerData.DEFAULT_YOFFSET;

        const yOffset = this._data.getLayerYOffset(scale, direction, layerId);

        this._spriteYOffsets[layerId] = yOffset;

        return yOffset;
    }

    protected getLayerZOffset(scale: number, direction: number, layerId: number): number {
        const existing = this._spriteZOffsets[layerId];

        if (existing !== undefined) return existing;

        if (!this._data) return LayerData.DEFAULT_ZOFFSET;

        const zOffset = this._data.getLayerZOffset(scale, direction, layerId);

        this._spriteZOffsets[layerId] = zOffset;

        return zOffset;
    }

    protected getValidSize(scale: number): number {
        if (!this._data) return scale;

        return this._data.getValidSize(scale);
    }

    protected setLayerCount(count: number): void {
        this._layerCount = count;
        this._shadowLayerIndex = count - this.getAdditionalLayerCount();
    }

    protected setDirection(direction: number): void {
        if (this._direction === direction) return;

        this._direction = direction;
    }

    protected getAdditionalLayerCount(): number {
        return 1;
    }

    protected updateAnimation(scale: number): number {
        return 0;
    }

    protected getFrameNumber(scale: number, layerId: number): number {
        return 0;
    }

    protected getPostureForAsset(scale: number, name: string): string | undefined {
        return undefined;
    }

    public getAsset(name: string, layerId: number = -1): IGraphicAsset | undefined {
        return this.asset?.getAsset(name);
    }

    public getTexture(scale: number, layerId: number, asset: IGraphicAsset): Texture {
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
