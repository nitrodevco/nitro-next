import { AvatarBodyPartType, AvatarDirectionAngle, AvatarFigurePartType, AvatarGeometryType, AvatarScaleType, AvatarSetType, IActiveActionData, IAvatarCanvas, IAvatarImage, IGraphicAsset } from '@nitrodevco/nitro-api';
import { Container, Matrix, Point, Rectangle, Sprite, Texture } from 'pixi.js';

import { GetTickerTime } from '#renderer/utils';

import { AssetAliasCollection } from '../alias';
import { AvatarAnimationLayerData } from '../animation';
import { AvatarImageBodyPartContainer } from '../AvatarImageBodyPartContainer';
import { AvatarImagePartContainer } from '../AvatarImagePartContainer';
import { AvatarStructure } from '../AvatarStructure';
import { AvatarImageActionCache } from './AvatarImageActionCache';
import { AvatarImageBodyPartCache } from './AvatarImageBodyPartCache';
import { AvatarImageDirectionCache } from './AvatarImageDirectionCache';
import { ImageData } from './ImageData';

export class AvatarImageCache {
    private static DEFAULT_MAX_CACHE_STORAGE_TIME_MS: number = 60000;
    private static BASE_ACTION: string = 'std';
    private static LAY_BASE_ACTION: string = 'lay';
    private static ACTION_WAVE: string = 'wav';
    private static ACTION_DRINK: string = 'drk';
    private static ACTION_BLOW: string = 'blw';
    private static ACTION_SIGN: string = 'sig';
    private static ACTION_RESPECT: string = 'respect';

    private _structure: AvatarStructure;
    private _avatar: IAvatarImage;
    private _assets: AssetAliasCollection;
    private _scale: AvatarScaleType;
    /** Flash `h_50`: the parts come from the large assets and the finished body part is halved. */
    private _largeScaledSmall: boolean;
    private _geometryType: AvatarGeometryType;
    private _cache: Map<AvatarBodyPartType, AvatarImageBodyPartCache> = new Map();
    private _canvas: IAvatarCanvas | undefined = undefined;
    private _defaultAction: string = AvatarImageCache.BASE_ACTION;
    private _unionImages: ImageData[] = [];
    private _matrix: Matrix = new Matrix();
    private _disposed: boolean = false;

    constructor(structure: AvatarStructure, avatar: IAvatarImage, assets: AssetAliasCollection, scale: AvatarScaleType, largeScaledSmall: boolean = false) {
        this._structure = structure;
        this._avatar = avatar;
        this._assets = assets;
        this._scale = scale;
        this._largeScaledSmall = largeScaledSmall;
    }

    public dispose(): void {
        if (this._disposed) return;

        this._canvas = undefined;
        this._disposed = true;

        if (this._cache) {
            for (const cache of this._cache.values()) cache.dispose();

            this._cache.clear();
        }

        if (this._unionImages) {
            for (const image of this._unionImages) image.dispose();

            this._unionImages = [];
        }
    }

    /** Drops every rendered body part (assets changed) without disposing the cache itself. */
    public reset(): void {
        for (const cache of this._cache.values()) cache.dispose();

        this._cache.clear();

        this._canvas = undefined;
        this._defaultAction = AvatarImageCache.BASE_ACTION;
    }

    public disposeInactiveActions(k: number = AvatarImageCache.DEFAULT_MAX_CACHE_STORAGE_TIME_MS): void {
        const time = GetTickerTime();

        for (const cache of this._cache.values()) cache.disposeActions(k, time);
    }

    public resetBodyPartCache(action: IActiveActionData): void {
        for (const cache of this._cache.values()) cache.setAction(action, 0);
    }

    public setDirection(setType: AvatarSetType, direction: number): void {
        const parts = this._structure.getBodyPartsUnordered(setType);

        if (parts) {
            for (const part of parts) {
                const actionCache = this.getBodyPartCache(part);

                if (!actionCache) continue;

                actionCache.direction = direction;
            }
        }
    }

    public setAction(action: IActiveActionData, time: number): void {
        for (const bodyPartId of this._structure.getActiveBodyPartIds(action, this._avatar)) this.getBodyPartCache(bodyPartId)?.setAction(action, time);
    }

    /*
     * Standing <-> sitting and anything involving the snowwar geometry keep the rendered
     * parts; every other geometry change (lying down, swimming) throws them away, since the
     * same part renders differently there.
     */
    public setGeometryType(type: AvatarGeometryType): void {
        if (this._geometryType === type) return;

        const keepsParts = (this._geometryType === AvatarGeometryType.Sitting && type === AvatarGeometryType.Vertical)
            || (this._geometryType === AvatarGeometryType.Vertical && type === AvatarGeometryType.Sitting)
            || (this._geometryType === AvatarGeometryType.SnowwarsHorizontal || type === AvatarGeometryType.SnowwarsHorizontal);

        if (!keepsParts) this.disposeInactiveActions(0);

        this._geometryType = type;
        this._canvas = undefined;
        this._defaultAction = AvatarImageCache.getDefaultActionFromGeometryType(type);
    }

    public getImageContainer(setType: AvatarBodyPartType, frameNumber: number): AvatarImageBodyPartContainer | undefined {
        const cache = this.getBodyPartCache(setType);
        let direction = cache.direction;
        let action = cache.action;
        let frame = frameNumber;

        if (!action?.definition) return undefined;

        if (action.definition.startFromFrameZero) frame -= action.startFrame;

        let activeAction = action;
        let removes: string[] = [];
        let layerItems: Map<AvatarFigurePartType, string> = new Map();
        const point = new Point();

        if (action.definition.isAnimation) {
            const animation = this._structure.getAnimation(`${action.definition.state}.${action.actionParameter}`);

            if (animation) {
                const layer = animation.getLayerData((frameNumber - action.startFrame), setType, action.overridingAction);

                if (layer) {
                    let dirOffset = (direction + layer.dd);

                    if (layer.dd < 0) {
                        if (dirOffset < 0) dirOffset = (8 + dirOffset);
                        else if (dirOffset > 7) dirOffset = (8 - dirOffset);
                    } else if (dirOffset < 0) dirOffset = (dirOffset + 8);
                    else if (dirOffset > 7) dirOffset = (dirOffset - 8);

                    if (this._scale === AvatarScaleType.Large) {
                        point.x = layer.dx;
                        point.y = layer.dy;
                    } else {
                        point.x = (layer.dx / 2);
                        point.y = (layer.dy / 2);
                    }

                    frame = layer.animationFrame;

                    if (layer.action) action = layer.action;

                    if (layer.type === AvatarAnimationLayerData.BODYPART) {
                        if (layer.action != null) activeAction = layer.action;

                        direction = dirOffset;
                    } else if (layer.type === AvatarAnimationLayerData.FX) direction = dirOffset;

                    layerItems = layer.items;
                }

                removes = animation.removeData;
            }
        }

        let actionCache = cache.getActionCache(activeAction);

        if (!actionCache) {
            actionCache = new AvatarImageActionCache();

            cache.updateActionCache(activeAction, actionCache);
        }

        let dirCache = actionCache.getDirectionCache(direction);

        if (!dirCache) {
            dirCache = new AvatarImageDirectionCache(this._structure.getParts(setType, this._avatar.getFigure(), activeAction, this._geometryType, direction, removes, this._avatar, layerItems));

            actionCache.updateDirectionCache(direction, dirCache);
        }

        let bodyPartContainer = dirCache.getImageContainer(frame);

        if (!bodyPartContainer) {
            const imagePartContainers = dirCache.getPartList();

            bodyPartContainer = this.renderBodyPart(direction, imagePartContainers, frame, action);

            if (bodyPartContainer) {
                if (bodyPartContainer.isCacheable) dirCache.updateImageContainer(bodyPartContainer, frame);
            } else {
                return undefined;
            }
        }

        const offset = this._structure.getFrameBodyPartOffset(activeAction, direction, frame, setType);

        point.x += offset.x;
        point.y += offset.y;

        bodyPartContainer.offset = point;

        return bodyPartContainer;
    }

    public getBodyPartCache(k: AvatarBodyPartType): AvatarImageBodyPartCache {
        let existing = this._cache.get(k);

        if (!existing) {
            existing = new AvatarImageBodyPartCache();

            this._cache.set(k, existing);
        }

        return existing;
    }

    private renderBodyPart(direction: number, containers: AvatarImagePartContainer[], frameCount: number, action: IActiveActionData): AvatarImageBodyPartContainer | undefined {
        if (!containers || !containers.length || !action?.definition) return undefined;

        if (!this.ensureCanvas()) return undefined;

        const isFlipped = AvatarDirectionAngle.DIRECTION_IS_FLIPPED[direction] ?? false;

        let assetPartDefinition = action.definition.assetPartDefinition;
        let isCacheable = true;
        let faceOffset: Point | undefined = undefined;

        for (let i = containers.length - 1; i >= 0; i--) {
            const container = containers[i];

            // the back view has no face; a hand item slot with nothing in it draws nothing
            if ((direction === 7 && (container.partType === AvatarFigurePartType.Face || container.partType === AvatarFigurePartType.Eyes)) || (container.partType === AvatarFigurePartType.RightHandItem && !container.partId)) continue;

            const partId = container.partId;
            const animationFrame = container.getFrameDefinition(frameCount);

            let partType = container.partType;
            let assetDirection = direction;
            let frameNumber = 0;
            let flipH = false;

            if (animationFrame) {
                frameNumber = animationFrame.number;

                if (animationFrame.assetPartDefinition && animationFrame.assetPartDefinition !== '') assetPartDefinition = animationFrame.assetPartDefinition;
            } else frameNumber = container.getFrameIndex(frameCount);

            if (isFlipped) {
                if ((assetPartDefinition === AvatarImageCache.ACTION_WAVE && (partType === AvatarFigurePartType.LeftHand || partType === AvatarFigurePartType.LeftSleeve || partType === AvatarFigurePartType.LeftCoatSleeve || partType === AvatarFigurePartType.MiscLeft))
                    || (assetPartDefinition === AvatarImageCache.ACTION_DRINK && (partType === AvatarFigurePartType.RightHand || partType === AvatarFigurePartType.RightSleeve || partType === AvatarFigurePartType.RightCoatSleeve || partType === AvatarFigurePartType.MiscRight))
                    || (assetPartDefinition === AvatarImageCache.ACTION_BLOW && partType === AvatarFigurePartType.RightHand)
                    || (assetPartDefinition === AvatarImageCache.ACTION_SIGN && partType === AvatarFigurePartType.LeftHand)
                    || (assetPartDefinition === AvatarImageCache.ACTION_RESPECT && partType === AvatarFigurePartType.LeftHand)
                    || partType === AvatarFigurePartType.RightHandItem
                    || partType === AvatarFigurePartType.LeftHandItem
                    || partType === AvatarFigurePartType.ChestPrint) {
                    flipH = true;
                } else {
                    if (direction === 4) assetDirection = 2;
                    else if (direction === 5) assetDirection = 1;
                    else if (direction === 6) assetDirection = 0;

                    if (container.flippedPartType && container.flippedPartType !== partType) partType = container.flippedPartType;
                }
            }

            const asset = this.tryResolveAsset(assetPartDefinition, partType, partId, assetDirection, frameNumber);

            if (!asset) continue;

            const texture = asset.texture;

            if (!texture) {
                isCacheable = false;

                continue;
            }

            let color = 0xFFFFFF;

            if (container.isColorable && container.color) color = container.color.rgb;

            const alpha = container.isBlendable ? container.blendAlpha : 1;
            const offset = new Point(-(asset.x), -(asset.y));

            if (flipH) offset.x += ((this._scale === AvatarScaleType.Large) ? 65 : 31);

            if (partType === AvatarFigurePartType.Face) faceOffset = offset.clone();

            this._unionImages.push(new ImageData(texture, asset.rectangle, offset, flipH, color, undefined, alpha));
        }

        if (!this._unionImages.length) return undefined;

        const imageData = this.createUnionImage(this._unionImages, isFlipped);
        const canvasOffset = (this._scale === AvatarScaleType.Large) ? (this._canvas!.height - 16) : (this._canvas!.height - 8);

        let regPoint = imageData.regPoint;

        if (this._largeScaledSmall) regPoint = new Point((regPoint.x / 2), (regPoint.y / 2));

        const offset = new Point(-(regPoint.x), (canvasOffset - regPoint.y));

        if (isFlipped && (assetPartDefinition !== AvatarImageCache.LAY_BASE_ACTION)) offset.x += ((this._scale === AvatarScaleType.Large) ? 67 : 31);

        let imageIndex = (this._unionImages.length - 1);

        while (imageIndex >= 0) {
            const image = this._unionImages.pop();

            if (image) image.dispose();

            imageIndex--;
        }

        const image = imageData.container;

        if (!image) return undefined;

        // Flash resampled the large render to half size here
        if (this._largeScaledSmall) image.scale.set(0.5);

        return new AvatarImageBodyPartContainer(image, offset, isCacheable, faceOffset);
    }

    private ensureCanvas(): boolean {
        if (!this._canvas) this._canvas = this._structure.getCanvas(this._scale, this._geometryType);

        return !!this._canvas;
    }

    /*
     * The asset lookup order: the action's own frame, its frame 0, the geometry's default
     * action (`std`, or `lay` when horizontal) at the frame, then that action's frame 0.
     */
    private tryResolveAsset(assetPartDefinition: string, partType: AvatarFigurePartType, partId: string, direction: number, frameNumber: number): IGraphicAsset | undefined {
        const scale = this._largeScaledSmall ? AvatarScaleType.Large : this._scale;

        return this._assets.getAsset(`${scale}_${assetPartDefinition}_${partType}_${partId}_${direction}_${frameNumber}`)
            ?? this._assets.getAsset(`${scale}_${assetPartDefinition}_${partType}_${partId}_${direction}_0`)
            ?? this._assets.getAsset(`${scale}_${this._defaultAction}_${partType}_${partId}_${direction}_${frameNumber}`)
            ?? this._assets.getAsset(`${scale}_${this._defaultAction}_${partType}_${partId}_${direction}_0`);
    }

    private static getDefaultActionFromGeometryType(type: AvatarGeometryType): string {
        return (type === AvatarGeometryType.Horizontal) ? AvatarImageCache.LAY_BASE_ACTION : AvatarImageCache.BASE_ACTION;
    }

    private createUnionImage(images: ImageData[], isFlipped: boolean): ImageData {
        const bounds = new Rectangle();

        for (const image of images) bounds.enlarge(image.offsetRect);

        const point = new Point(-(bounds.x), -(bounds.y));
        const container = new Container();
        const sprite = new Sprite(Texture.EMPTY);

        sprite.width = bounds.width;
        sprite.height = bounds.height;

        container.addChild(sprite);

        for (const data of images) {
            if (!data) continue;

            const texture = data.texture;
            const color = data.colorTransform;
            const flipH = (!(isFlipped && data.flipH) && (isFlipped || data.flipH));
            const regPoint = point.clone();

            regPoint.x -= data.regPoint.x;
            regPoint.y -= data.regPoint.y;

            if (isFlipped) regPoint.x = (container.width - (regPoint.x + data.rect.width));

            if (flipH) {
                this._matrix.a = -1;
                this._matrix.tx = ((data.rect.x + data.rect.width) + regPoint.x);
                this._matrix.ty = (regPoint.y - data.rect.y);
            } else {
                this._matrix.a = 1;
                this._matrix.tx = (regPoint.x - data.rect.x);
                this._matrix.ty = (regPoint.y - data.rect.y);
            }

            const sprite = new Sprite(texture);

            sprite.tint = color;
            sprite.alpha = data.alpha;
            sprite.setFromMatrix(this._matrix);

            container.addChild(sprite);
        }

        return new ImageData(undefined, container.getLocalBounds().rectangle, point, isFlipped, 0, container);
    }
}
