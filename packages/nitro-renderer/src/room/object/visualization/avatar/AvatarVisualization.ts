import {
    AlphaTolerance,
    AvatarGuideStatus,
    AvatarSetType,
    type IAdvancedMap,
    type IAvatarEffectListener,
    type IAvatarImage,
    type IAvatarImageListener,
    type IGraphicAsset,
    type IObjectVisualizationData,
    type IRoomGeometry,
    IRoomObject, IRoomObjectModel,
    IVariableFxStatusModelData,
    RoomObjectSpriteTypeEnum,
    RoomObjectVariableEnum,
} from '@nitrodevco/nitro-api';
import { AdvancedMap, AvatarActionStateType, AvatarActionStateTypeUtilities, AvatarGenderType, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { ColorMatrixFilter, Filter, Texture } from 'pixi.js';
import { GlowFilter } from 'pixi-filters';

import { GetAssetManager } from '#renderer/assets';
import { GetTickerTime } from '#renderer/utils';

import { RoomObjectSpriteVisualization } from '../RoomObjectSpriteVisualization';
import { IVariableFxVisualizationHost, IVariableFxVisualizationRoomData } from '../variablefx/IVariableFxVisualizationRoomData';
import { VariableFxStatusReconciler } from '../variablefx/VariableFxStatusReconciler';
import { ExpressionAdditionFactory,
    FloatingIdleZAddition,
    GameClickTargetAddition,
    GuideStatusBubbleAddition,
    IAvatarAddition,
    MutedBubbleAddition,
    NumberBubbleAddition,
    StackedAdditions,
    TypingBubbleAddition,
} from './additions';
import { AvatarVisualizationData } from './AvatarVisualizationData';

/**
 * Draws a room avatar: the avatar image, its shadow and its additions (bubbles, expressions, the
 * Variable FX stack). Ports `AvatarVisualization`.
 */
export class AvatarVisualization
    extends RoomObjectSpriteVisualization
    implements IAvatarImageListener, IAvatarEffectListener, IVariableFxVisualizationHost {
    // The static constants of Flash `AvatarVisualization`, under Flash's names (checked by
    // `scripts/drift/constants.py`). Flash's obfuscated `§_-A1O§` is `SPRITE_INDEX_SHADOW`.
    private static AVATAR_SPRITE_TAG: string = 'avatar';
    private static AVATAR_SPRITE_DEFAULT_DEPTH: number = -0.01;
    private static AVATAR_OWN_DEPTH_ADJUST: number = 0.001;
    private static AVATAR_SPRITE_LAYING_DEPTH: number = -0.409;
    private static BASE_Y_SCALE: number = 1000;
    private static ANIMATION_FRAME_UPDATE_INTERVAL: number = 2;
    private static SNOWBOARDING_EFFECT: number = 97;
    private static FREEZE_EFFECT: number = 218;
    /** How many effect avatar images `getAvatarImage` keeps before disposing the oldest. */
    private static MAX_AVATARS_WITH_EFFECT: number = 3;
    private static SPRITE_INDEX_AVATAR: number = 0;
    private static SPRITE_INDEX_SHADOW: number = 1;
    private static INITIAL_RESERVED_SPRITES: number = 2;
    private static ADDITION_ID_IDLE_BUBBLE: number = 1;
    private static ADDITION_ID_TYPING_BUBBLE: number = 2;
    private static ADDITION_ID_EXPRESSION: number = 3;
    private static ADDITION_ID_NUMBER_BUBBLE: number = 4;
    private static ADDITION_ID_GAME_CLICK_TARGET: number = 5;
    private static ADDITION_ID_MUTED_BUBBLE: number = 6;
    private static ADDITION_ID_GUIDE_STATUS_BUBBLE: number = 7;
    /**
     * The habbicon bubble's addition id. Flash puts a `HabbiconBubble` into the stacked additions
     * when `figure_habbicon` is set; the port has not ported `HabbiconBubble`, so nothing reads
     * this yet (`StackedAdditions.LAYER_HABBICON` is its layer).
     */
    public static readonly ADDITION_ID_HABBICON_BUBBLE: number = 8;
    private static ADDITION_ID_STACKED_ADDITIONS: number = 9;
    private static DEFAULT_CANVAS_OFFSETS: number[] = [ 0, 0, 0 ];
    /** Flash's literal `6710886`: the grey a blocked avatar's placeholder is tinted. */
    private static BLOCKED_AVATAR_COLOR: number = 0x666666;

    /** Flash `GlowFilter(0xFFFFFF, 1, 6, 6)` around a highlighted avatar. */
    private static HIGHLIGHT_FILTERS: Filter[] | undefined = undefined;
    /**
     * Flash `VARIABLE_HOLDER_FILTER`: the tint and inner glow the wired menu puts on the avatars
     * that hold a variable. Pixi's colour matrix takes its offsets in 0-1 where Flash's are 0-255.
     */
    private static VARIABLE_HOLDER_FILTERS: Filter[] | undefined = undefined;

    protected _data: AvatarVisualizationData | undefined = undefined;

    private _avatarImage: IAvatarImage | undefined = undefined;
    private _cachedAvatars: IAdvancedMap<string, IAvatarImage> = new AdvancedMap();
    private _cachedAvatarEffects: IAdvancedMap<string, IAvatarImage> = new AdvancedMap();
    private _shadow: IGraphicAsset | undefined = undefined;
    private _lastUpdate: number = -1000;
    private _disposed: boolean = false;

    private _figure: string | undefined = undefined;
    private _gender: AvatarGenderType = AvatarGenderType.Male;
    private _direction: number = -1;
    private _headDirection: number = -1;
    private _posture: AvatarActionStateType = AvatarActionStateType.Stand;
    private _postureParameter: number = 0;
    private _canStandUp: boolean = false;
    private _postureOffset: number = 0;
    private _verticalOffset: number = 0;
    private _angle: number = -1;
    private _headAngle: number = -1;
    private _talk: boolean = false;
    private _expression: number = 0;
    private _sleep: boolean = false;
    private _blink: boolean = false;
    private _gesture: number = 0;
    private _sign: number = -1;
    private _highlightEnabled: boolean = false;
    private _highlight: boolean = false;
    private _highlightVariableHolder: boolean = false;
    private _blocked: boolean = false;
    private _alphaMultiplier: number = 1;
    private _dance: number = 0;
    private _effect: number = 0;
    private _carryObject: number = 0;
    private _useObject: number = 0;
    private _ownUser: boolean = false;

    private _forceUpdate: boolean = false;
    private _isLaying: boolean = false;
    private _layInside: boolean = false;
    private _isAnimating: boolean = false;
    private _extraSpritesStartIndex: number = 2;
    private _forcedAnimFrames: number = 0;
    private _updatesUntilFrameUpdate: number = 0;
    private _updatesUntilCleanup: number = Math.random() * 200 + 200;

    private _geometryUpdateCounter: number = -1;

    private _additions: Map<number, IAvatarAddition> = new Map();

    private _variableFxRoomData: IVariableFxVisualizationRoomData | undefined = undefined;
    private _variableFxReconciler: VariableFxStatusReconciler = new VariableFxStatusReconciler();
    private _variableFxManagerUpdateId: number = -1;

    public override initialize(data: IObjectVisualizationData): boolean {
        if (!(data instanceof AvatarVisualizationData)) return false;

        this._data = data;

        this.createSprites(AvatarVisualization.INITIAL_RESERVED_SPRITES);

        super.initialize(data);

        return true;
    }

    public override dispose(): void {
        if (this._disposed) return;

        super.dispose();

        if (this._avatarImage) this._avatarImage.dispose();

        for (const addition of this._additions.values()) addition.dispose();

        this._additions.clear();
        this._variableFxRoomData = undefined;
        this._shadow = undefined;
        this._disposed = true;
    }

    /** The room's Variable FX tables for users; set by the room when the visualization is created. */
    public get variableFxRoomData(): IVariableFxVisualizationRoomData | undefined {
        return this._variableFxRoomData;
    }

    public set variableFxRoomData(data: IVariableFxVisualizationRoomData | undefined) {
        this._variableFxRoomData = data;
        this._variableFxManagerUpdateId = -1;
    }

    public override update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean): void {
        if (!this.object || !geometry || !this._data) return;

        if (--this._updatesUntilCleanup <= 0 && this._avatarImage) {
            this._avatarImage.disposeInactiveActionCache();

            this._updatesUntilCleanup = 500;
        }

        const shouldUpdateFrame = time >= this._lastUpdate + RoomObjectSpriteVisualization.UPDATE_TIME_INCREASER;

        if (shouldUpdateFrame) {
            this._lastUpdate += RoomObjectSpriteVisualization.UPDATE_TIME_INCREASER;

            if (this._lastUpdate + RoomObjectSpriteVisualization.UPDATE_TIME_INCREASER < time)
                this._lastUpdate = time - RoomObjectSpriteVisualization.UPDATE_TIME_INCREASER;
        }

        const scale = geometry.scale;
        const effect = this._effect;
        const alphaMultiplier = this._alphaMultiplier;

        let didScaleUpdate = false;
        let didEffectUpdate = false;
        let otherUpdate = false;
        let objectUpdated = false;

        const modelUpdated = this.updateModel(this.object.model, scale, update);

        if (this._forceUpdate) {
            this.resetAvatar();

            this._forceUpdate = false;
        }

        if (modelUpdated || scale !== this._scale || !this._avatarImage) {
            if (scale !== this._scale) {
                didScaleUpdate = true;

                this.updateScale(scale);
            }

            if (effect !== this._effect) didEffectUpdate = true;

            const didAlphaUpdate = alphaMultiplier !== this._alphaMultiplier;

            if (didScaleUpdate || !this._avatarImage || didEffectUpdate || didAlphaUpdate) {
                this._avatarImage?.dispose();

                this._avatarImage = this.createAvatarImage(scale, this._effect);

                if (!this._avatarImage) return;

                otherUpdate = true;

                this._updatesUntilFrameUpdate = 0;

                const sprite = this.getSprite(AvatarVisualization.SPRITE_INDEX_AVATAR);

                if (sprite && (this._avatarImage.isPlaceholder() || this._avatarImage.isBlocked())) {
                    sprite.alpha = 150 * this._alphaMultiplier;
                    sprite.color = this._avatarImage.isBlocked() ? AvatarVisualization.BLOCKED_AVATAR_COLOR : 0xFFFFFF;
                } else if (sprite) {
                    sprite.alpha = 255;
                    sprite.color = 0xFFFFFF;
                }
            }

            if (!this._avatarImage) return;

            if (didEffectUpdate && this._avatarImage.animationHasResetOnToggle) this._avatarImage.resetAnimationFrameCounter();

            this.updateShadow(scale);

            objectUpdated = this.updateObject(this.object, geometry, update, true);

            this.processActionsForAvatar();

            if (this._additions) {
                let index = this._extraSpritesStartIndex;

                for (const addition of this._additions.values()) {
                    const sprite = this.getSprite(index++);
                    if (sprite) addition.update(sprite, scale);
                }
            }

            this._scale = scale;
        } else {
            objectUpdated = this.updateObject(this.object, geometry, update);
        }

        if (shouldUpdateFrame && this._additions) {
            let index = this._extraSpritesStartIndex;

            for (const addition of this._additions.values()) {
                const sprite = this.getSprite(index++);
                if (sprite && addition.animate(sprite)) this.updateSpriteCounter++;
            }

            if (this.removeEmptyStackedAdditions()) this.updateSpriteCounter++;
        }

        const update1 = objectUpdated || modelUpdated || didScaleUpdate;
        const update2 = (this._isAnimating || this._forcedAnimFrames > 0) && update && shouldUpdateFrame;

        if (update1) this._forcedAnimFrames = AvatarVisualization.ANIMATION_FRAME_UPDATE_INTERVAL;

        if (update1 || update2) {
            this.updateSpriteCounter++;

            if (shouldUpdateFrame) {
                this._forcedAnimFrames--;
                this._updatesUntilFrameUpdate--;
            }

            if (!(this._updatesUntilFrameUpdate <= 0 || (shouldUpdateFrame && (didScaleUpdate || modelUpdated || otherUpdate)))) return;

            this._avatarImage.updateAnimationByFrames(1);

            this._updatesUntilFrameUpdate = AvatarVisualization.ANIMATION_FRAME_UPDATE_INTERVAL;

            let _local_20 = this._avatarImage.getCanvasOffsets();

            if (!_local_20 || _local_20.length < 3) _local_20 = AvatarVisualization.DEFAULT_CANVAS_OFFSETS;

            const sprite = this.getSprite(AvatarVisualization.SPRITE_INDEX_AVATAR);

            if (sprite) {
                const highlighted = this._highlightEnabled && this._highlight;

                const avatarImage = this._avatarImage.getImageWithCroppedTop(AvatarSetType.Full, highlighted || this._highlightVariableHolder);

                if (avatarImage) {
                    sprite.texture = avatarImage;

                    // Flash applies one or the other to the avatar bitmap, the hover highlight first.
                    if (highlighted) sprite.filters = AvatarVisualization.getHighlightFilters();
                    else if (this._highlightVariableHolder) sprite.filters = AvatarVisualization.getVariableHolderFilters();
                    else sprite.filters = [];
                }

                if (sprite.texture) {
                    sprite.offsetX = (-1 * scale) / 2 + _local_20[0] - (sprite.texture.width - scale) / 2;
                    sprite.offsetY = -sprite.texture.height + scale / 4 + _local_20[1] + this._postureOffset;

                    if (this._posture === AvatarActionStateType.SnowwarDieBack || this._posture === AvatarActionStateType.SnowwarDieFront) sprite.offsetY += 20 * scale / 32;
                }

                if (this._isLaying) {
                    if (this._layInside) sprite.relativeDepth = -0.5;
                    else sprite.relativeDepth = AvatarVisualization.AVATAR_SPRITE_LAYING_DEPTH + _local_20[2];
                } else {
                    sprite.relativeDepth = AvatarVisualization.AVATAR_SPRITE_DEFAULT_DEPTH + _local_20[2];
                }

                if (this._ownUser) {
                    sprite.relativeDepth -= AvatarVisualization.AVATAR_OWN_DEPTH_ADJUST;
                    sprite.spriteType = RoomObjectSpriteTypeEnum.AvatarOwn;
                } else {
                    sprite.spriteType = RoomObjectSpriteTypeEnum.Avatar;
                }

                sprite.alpha = ((this._avatarImage.isPlaceholder() || this._avatarImage.isBlocked()) ? 150 : 255) * this._alphaMultiplier;
            }

            const typingBubble = this.getAddition(AvatarVisualization.ADDITION_ID_TYPING_BUBBLE) as TypingBubbleAddition;

            if (typingBubble) {
                if (!this._isLaying) typingBubble.relativeDepth = AvatarVisualization.AVATAR_SPRITE_DEFAULT_DEPTH - 0.01 + _local_20[2];
                else typingBubble.relativeDepth = AvatarVisualization.AVATAR_SPRITE_LAYING_DEPTH - 0.01 + _local_20[2];
            }

            this._isAnimating = this._avatarImage.isAnimating();

            let _local_21 = AvatarVisualization.INITIAL_RESERVED_SPRITES;
            const direction = this._avatarImage.getDirection();
            const avatarSpriteData = this._avatarImage.avatarSpriteData;
            const grayscaleColor = (avatarSpriteData && avatarSpriteData.paletteIsGrayscale && avatarSpriteData.reds) ? (avatarSpriteData.reds[0] & 0xFFFFFF) : undefined;

            for (const spriteData of this._avatarImage.getSprites()) {
                if (spriteData.id === AvatarVisualization.AVATAR_SPRITE_TAG) {
                    const sprite = this.getSprite(AvatarVisualization.SPRITE_INDEX_AVATAR);

                    if (sprite) {
                        const layerData = this._avatarImage.getLayerData(spriteData);

                        let offsetX = spriteData.getDirectionOffsetX(direction);
                        let offsetY = spriteData.getDirectionOffsetY(direction);

                        if (layerData) {
                            offsetX += layerData.dx;
                            offsetY += layerData.dy;
                        }

                        if (scale < RoomGeometryScaleType.AvatarSizeNormal) {
                            offsetX /= 2;
                            offsetY /= 2;
                        }

                        if (!this._canStandUp) {
                            sprite.offsetX += offsetX;
                            sprite.offsetY += offsetY;
                        }
                    }
                } else {
                    const sprite = this.getSprite(_local_21);

                    if (sprite) {
                        sprite.alphaTolerance = AlphaTolerance.MATCH_NOTHING;
                        sprite.visible = true;

                        const layerData = this._avatarImage.getLayerData(spriteData);

                        let frameNumber = 0;
                        let offsetX = spriteData.getDirectionOffsetX(direction);
                        let offsetY = spriteData.getDirectionOffsetY(direction);
                        const offsetZ = spriteData.getDirectionOffsetZ(direction);
                        let dd = 0;

                        if (spriteData.hasDirections) dd = direction;

                        if (layerData) {
                            frameNumber = layerData.animationFrame;
                            offsetX += layerData.dx;
                            offsetY += layerData.dy;
                            dd += layerData.dd;
                        }

                        if (scale < RoomGeometryScaleType.AvatarSizeNormal) {
                            offsetX /= 2;
                            offsetY /= 2;
                        }

                        if (dd < 0) dd += 8;
                        else if (dd > 7) dd -= 8;

                        const assetName = `${this._avatarImage.getScale()}_${spriteData.member}_${dd}_${frameNumber}`;
                        const asset = GetAssetManager().getAsset(assetName);

                        if (!asset || !asset.texture) continue;

                        sprite.texture = asset.texture;
                        sprite.offsetX = asset.offsetX - scale / 2 + offsetX;
                        sprite.offsetY = asset.offsetY + offsetY;
                        sprite.flipH = asset.flipH;
                        // Flash leaves the `h_std_fx` / `h_std_sd` (shadow) sprites out of the palette tint
                        sprite.color = (grayscaleColor !== undefined && !assetName.includes('h_std_fx') && !assetName.includes('h_std_sd')) ? grayscaleColor : 0xFFFFFF;

                        if (spriteData.hasStaticY) {
                            sprite.offsetY += this._verticalOffset * scale / (2 * AvatarVisualization.BASE_Y_SCALE);
                        } else {
                            sprite.offsetY += this._postureOffset;
                        }

                        if (this._isLaying) {
                            sprite.relativeDepth
                                = AvatarVisualization.AVATAR_SPRITE_LAYING_DEPTH - 0.001 * this.totalSprites * offsetZ;
                        } else {
                            sprite.relativeDepth
                                = AvatarVisualization.AVATAR_SPRITE_DEFAULT_DEPTH - 0.001 * this.totalSprites * offsetZ;
                        }

                        if (spriteData.ink === 33) sprite.blendMode = 'add';
                        else sprite.blendMode = 'normal';
                    }

                    _local_21++;
                }
            }
        }
    }

    private static getHighlightFilters(): Filter[] {
        if (!AvatarVisualization.HIGHLIGHT_FILTERS) AvatarVisualization.HIGHLIGHT_FILTERS = [ new GlowFilter({ color: 0xFFFFFF, alpha: 1, distance: 6, outerStrength: 2, innerStrength: 0 }) ];

        return AvatarVisualization.HIGHLIGHT_FILTERS;
    }

    private static getVariableHolderFilters(): Filter[] {
        if (!AvatarVisualization.VARIABLE_HOLDER_FILTERS) {
            const tint = new ColorMatrixFilter();

            tint.matrix = [ 0.9, 0, 0, 0, 0, 0, 1, 0, 0, 40 / 255, 0, 0, 1, 0, 80 / 255, 0, 0, 0, 0.85, 0 ];

            AvatarVisualization.VARIABLE_HOLDER_FILTERS = [ tint, new GlowFilter({ color: 0xBBF7FA, alpha: 1, distance: 4, outerStrength: 0, innerStrength: 4 }) ];
        }

        return AvatarVisualization.VARIABLE_HOLDER_FILTERS;
    }

    private createAvatarImage(scale: RoomGeometryScaleType, effectId: number): IAvatarImage | undefined {
        let cachedImage: IAvatarImage | undefined;
        let imageName = 'avatarImage' + scale.toString();

        if (!effectId) {
            cachedImage = this._cachedAvatars.getValue(imageName);
        } else {
            imageName += '-' + effectId;

            cachedImage = this._cachedAvatarEffects.getValue(imageName);
        }

        if (!cachedImage && this._figure && this._figure.length > 0) {
            cachedImage = this._data?.createAvatarImage(this._figure, scale, this._gender, this, this, this._blocked);

            if (cachedImage) {
                if (!effectId) {
                    this._cachedAvatars.add(imageName, cachedImage);
                } else {
                    if (this._cachedAvatarEffects.length >= AvatarVisualization.MAX_AVATARS_WITH_EFFECT) {
                        const cacheKey = this._cachedAvatarEffects.getKey(0);

                        if (cacheKey !== undefined) this._cachedAvatarEffects.remove(cacheKey)?.dispose();
                    }

                    this._cachedAvatarEffects.add(imageName, cachedImage);
                }
            }
        }

        return cachedImage;
    }

    protected updateObject(
        object: IRoomObject,
        geometry: IRoomGeometry,
        update: boolean,
        _arg_4: boolean = false,
    ): boolean {
        if (
            !_arg_4
            && this.updateObjectCounter === object.updateCounter
            && this._geometryUpdateCounter === geometry.updateId
        )
            return false;

        let didUpdate = update;

        let direction = ((object.getDirection().x - geometry.direction.x) % 360 + 360) % 360;
        let headDirection = this._headDirection;

        if (this._posture === AvatarActionStateType.Sit && this._canStandUp) {
            direction -= (direction % 90) - 45;
        }

        if (this._posture === AvatarActionStateType.Float) headDirection = direction;
        else headDirection -= geometry.direction.x;

        headDirection = (headDirection % 360 + 360) % 360;

        if ((this._posture === AvatarActionStateType.Sit && this._canStandUp) || this._posture === AvatarActionStateType.SnowwarDieBack || this._posture === AvatarActionStateType.SnowwarDieFront) headDirection -= headDirection % 90 - 45;

        if (direction !== this._angle || _arg_4) {
            didUpdate = true;

            this._angle = direction;

            direction = ((direction - 112.5) + 360) % 360;

            this._avatarImage?.setDirectionAngle(AvatarSetType.Full, direction);
        }

        if (headDirection !== this._headAngle || _arg_4) {
            didUpdate = true;

            this._headAngle = headDirection;

            if (this._headAngle !== this._angle) {
                headDirection = ((headDirection - 112.5) + 360) % 360;

                this._avatarImage?.setDirectionAngle(AvatarSetType.Head, headDirection);
            }
        }

        this._geometryUpdateCounter = geometry.updateId;

        this.updateObjectCounter = this.object.updateCounter;

        return didUpdate;
    }

    protected updateModel(model: IRoomObjectModel, scale: RoomGeometryScaleType, update: boolean): boolean {
        if (!model) return false;

        const variableFxManagerUpdateId = this._variableFxRoomData?.variableFxVisualizationManager.updateId ?? -1;

        if (this.updateModelCounter === model.updateCounter && variableFxManagerUpdateId === this._variableFxManagerUpdateId) return false;

        this._variableFxManagerUpdateId = variableFxManagerUpdateId;

        let needsUpdate = false;

        if (this.reconcileVariableFxStatuses(model.getValue<IVariableFxStatusModelData | undefined>(RoomObjectVariableEnum.VariableFxStatuses))) needsUpdate = true;

        const talk = model.getValue<number>(RoomObjectVariableEnum.FigureTalk) > 0 && update;

        if (talk !== this._talk) {
            this._talk = talk;

            needsUpdate = true;
        }

        const expression = model.getValue<number>(RoomObjectVariableEnum.FigureExpression);

        if (expression !== this._expression) {
            this._expression = expression;

            needsUpdate = true;
        }

        const sleep = model.getValue<number>(RoomObjectVariableEnum.FigureSleep) > 0;

        if (sleep !== this._sleep) {
            this._sleep = sleep;

            needsUpdate = true;
        }

        const blink = model.getValue<number>(RoomObjectVariableEnum.FigureBlink) > 0 && update;

        if (blink !== this._blink) {
            this._blink = blink;

            needsUpdate = true;
        }

        const gesture = model.getValue<number>(RoomObjectVariableEnum.FigureGesture) || 0;

        if (gesture !== this._gesture) {
            this._gesture = gesture;

            needsUpdate = true;
        }

        const posture = model.getValue<AvatarActionStateType>(RoomObjectVariableEnum.FigurePosture);

        if (posture !== this._posture) {
            this._posture = posture;

            needsUpdate = true;
        }

        const postureParameter = model.getValue<number>(RoomObjectVariableEnum.FigurePostureParameter);

        if (postureParameter !== this._postureParameter) {
            this._postureParameter = postureParameter;

            needsUpdate = true;
        }

        const canStandUp = model.getValue<boolean>(RoomObjectVariableEnum.FigureCanStandUp);

        if (canStandUp !== this._canStandUp) {
            this._canStandUp = canStandUp;

            needsUpdate = true;
        }

        const verticalOffset
            = model.getValue<number>(RoomObjectVariableEnum.FigureVerticalOffset) * AvatarVisualization.BASE_Y_SCALE;

        if (verticalOffset !== this._verticalOffset) {
            this._verticalOffset = verticalOffset;

            needsUpdate = true;
        }

        const dance = model.getValue<number>(RoomObjectVariableEnum.FigureDance) || 0;

        if (dance !== this._dance) {
            this._dance = dance;

            needsUpdate = true;
        }

        const effect = model.getValue<number>(RoomObjectVariableEnum.FigureEffect) || 0;

        if (effect !== this._effect) {
            this._effect = effect;

            needsUpdate = true;
        }

        const carryObject = model.getValue<number>(RoomObjectVariableEnum.FigureCarryObject) || 0;

        if (carryObject !== this._carryObject) {
            this._carryObject = carryObject;

            needsUpdate = true;
        }

        const useObject = model.getValue<number>(RoomObjectVariableEnum.FigureUseObject) || 0;

        if (useObject !== this._useObject) {
            this._useObject = useObject;

            needsUpdate = true;
        }

        const headDirection = model.getValue<number>(RoomObjectVariableEnum.HeadDirection);

        if (headDirection !== this._headDirection) {
            this._headDirection = headDirection;

            needsUpdate = true;
        }

        let alphaMultiplier = model.getValue<number>(RoomObjectVariableEnum.FigureAlphaMultiplier);

        if (alphaMultiplier === undefined || alphaMultiplier === null || isNaN(alphaMultiplier)) alphaMultiplier = 1;

        if (alphaMultiplier !== this._alphaMultiplier) {
            this._alphaMultiplier = alphaMultiplier;

            needsUpdate = true;
        }

        if (this._carryObject > 0 && useObject > 0) {
            if (this._useObject !== this._carryObject) {
                this._useObject = this._carryObject;

                needsUpdate = true;
            }
        } else if (this._useObject !== 0) {
            this._useObject = 0;

            needsUpdate = true;
        }

        let idleAddition = this.getAddition(AvatarVisualization.ADDITION_ID_IDLE_BUBBLE);

        if (this._sleep) {
            if (!idleAddition)

                idleAddition = this.addAddition(
                    new FloatingIdleZAddition(AvatarVisualization.ADDITION_ID_IDLE_BUBBLE, this),
                );

            needsUpdate = true;
        } else if (idleAddition) this.removeAddition(AvatarVisualization.ADDITION_ID_IDLE_BUBBLE);

        const isMuted = model.getValue<number>(RoomObjectVariableEnum.FigureIsMuted) > 0;

        let mutedAddition = this.getAddition(AvatarVisualization.ADDITION_ID_MUTED_BUBBLE);

        if (isMuted) {
            if (!mutedAddition)

                mutedAddition = this.addAddition(new MutedBubbleAddition(AvatarVisualization.ADDITION_ID_MUTED_BUBBLE, this));

            needsUpdate = true;
        } else {
            if (mutedAddition) {
                this.removeAddition(AvatarVisualization.ADDITION_ID_MUTED_BUBBLE);

                needsUpdate = true;
            }

            const isTyping = model.getValue<number>(RoomObjectVariableEnum.FigureIsTyping) > 0;

            let typingAddition = this.getAddition(AvatarVisualization.ADDITION_ID_TYPING_BUBBLE);

            if (isTyping) {
                if (!typingAddition)

                    typingAddition = this.addAddition(
                        new TypingBubbleAddition(AvatarVisualization.ADDITION_ID_TYPING_BUBBLE, this),
                    );

                needsUpdate = true;
            } else if (typingAddition) {
                this.removeAddition(AvatarVisualization.ADDITION_ID_TYPING_BUBBLE);

                needsUpdate = true;
            }
        }

        const guideStatusValue = model.getValue<number>(RoomObjectVariableEnum.FigureGuideStatus) || 0;

        if (guideStatusValue !== AvatarGuideStatus.NONE) {
            this.removeAddition(AvatarVisualization.ADDITION_ID_GUIDE_STATUS_BUBBLE);
            this.addAddition(
                new GuideStatusBubbleAddition(AvatarVisualization.ADDITION_ID_GUIDE_STATUS_BUBBLE, this, guideStatusValue),
            );

            needsUpdate = true;
        } else if (this.getAddition(AvatarVisualization.ADDITION_ID_GUIDE_STATUS_BUBBLE)) {
            this.removeAddition(AvatarVisualization.ADDITION_ID_GUIDE_STATUS_BUBBLE);

            needsUpdate = true;
        }

        const isPlayingGame = model.getValue<number>(RoomObjectVariableEnum.FigureIsPlayingGame) > 0;

        let gameClickAddition = this.getAddition(AvatarVisualization.ADDITION_ID_GAME_CLICK_TARGET);

        if (isPlayingGame) {
            if (!gameClickAddition)

                gameClickAddition = this.addAddition(
                    new GameClickTargetAddition(AvatarVisualization.ADDITION_ID_GAME_CLICK_TARGET),
                );

            needsUpdate = true;
        } else if (gameClickAddition) this.removeAddition(AvatarVisualization.ADDITION_ID_GAME_CLICK_TARGET);

        const numberValue = model.getValue<number>(RoomObjectVariableEnum.FigureNumberValue);

        let numberAddition = this.getAddition(AvatarVisualization.ADDITION_ID_NUMBER_BUBBLE);

        if (numberValue > 0) {
            if (!numberAddition)

                numberAddition = this.addAddition(
                    new NumberBubbleAddition(AvatarVisualization.ADDITION_ID_NUMBER_BUBBLE, numberValue, this),
                );

            needsUpdate = true;
        } else if (numberAddition) this.removeAddition(AvatarVisualization.ADDITION_ID_NUMBER_BUBBLE);

        let expressionAddition = this.getAddition(AvatarVisualization.ADDITION_ID_EXPRESSION);

        if (this._expression > 0) {
            if (!expressionAddition) {
                expressionAddition = ExpressionAdditionFactory.getExpressionAddition(
                    AvatarVisualization.ADDITION_ID_EXPRESSION,
                    this._expression,
                    this,
                );

                if (expressionAddition) this.addAddition(expressionAddition);
            }
        } else if (expressionAddition) this.removeAddition(AvatarVisualization.ADDITION_ID_EXPRESSION);

        this.updateScale(scale);

        const gender = model.getValue<AvatarGenderType>(RoomObjectVariableEnum.Gender);

        if (gender !== this._gender) {
            this._gender = gender;

            needsUpdate = true;
        }

        if (this.updateFigure(model.getValue<string>(RoomObjectVariableEnum.Figure))) needsUpdate = true;

        let sign = model.getValue<number>(RoomObjectVariableEnum.FigureSign);

        if (sign === null) sign = -1;

        if (this._sign !== sign) {
            this._sign = sign;

            needsUpdate = true;
        }

        if (this.updateBlocked(model.getValue<number>(RoomObjectVariableEnum.Blocked) > 0)) needsUpdate = true;

        const highlightEnabled = model.getValue<number>(RoomObjectVariableEnum.FigureHighlightEnable) > 0;

        if (highlightEnabled !== this._highlightEnabled) {
            this._highlightEnabled = highlightEnabled;

            needsUpdate = true;
        }

        if (this._highlightEnabled) {
            const highlight = model.getValue<number>(RoomObjectVariableEnum.FigureHighlight) > 0;

            if (highlight !== this._highlight) {
                this._highlight = highlight;

                needsUpdate = true;
            }
        }

        const highlightVariableHolder = model.getValue<number>(RoomObjectVariableEnum.FigureHighlightVariableHolder) > 0;

        if (highlightVariableHolder !== this._highlightVariableHolder) {
            this._highlightVariableHolder = highlightVariableHolder;

            needsUpdate = true;
        }

        const ownUser = model.getValue<number>(RoomObjectVariableEnum.OwnUser) > 0;

        if (ownUser !== this._ownUser) {
            this._ownUser = ownUser;

            needsUpdate = true;
        }

        this.updateModelCounter = model.updateCounter;

        return needsUpdate;
    }

    /** Flash `updateBlocked`: the cached images are of the other figure, so they all go. */
    private updateBlocked(blocked: boolean): boolean {
        if (blocked === this._blocked) return false;

        this._blocked = blocked;

        this.resetAvatar();

        return true;
    }

    private updateScale(scale: RoomGeometryScaleType): void {
        if (scale < RoomGeometryScaleType.AvatarSizeNormal) this._blink = false;

        if (this._posture === AvatarActionStateType.Sit || this._posture === AvatarActionStateType.Lay) {
            this._postureOffset = scale / 2;
        } else {
            this._postureOffset = 0;
        }

        this._layInside = false;
        this._isLaying = false;

        if (this._posture === AvatarActionStateType.Lay) {
            this._isLaying = true;

            if (this._postureParameter < 0) this._layInside = true;
        }
    }

    private processActionsForAvatar(): void {
        if (!this._avatarImage) return;

        this._avatarImage.initActionAppends();

        this._avatarImage.appendAction(AvatarActionStateType.Posture, this._posture, this._postureParameter);

        if (this._gesture > 0)
            this._avatarImage.appendAction(AvatarActionStateType.Gesture, AvatarActionStateTypeUtilities.getGesture(this._gesture) ?? 0);

        if (this._dance > 0) this._avatarImage.appendAction(AvatarActionStateType.Dance, this._dance);

        if (this._sign > -1) this._avatarImage.appendAction(AvatarActionStateType.Sign, this._sign);

        if (this._carryObject > 0) this._avatarImage.appendAction(AvatarActionStateType.CarryObject, this._carryObject);

        if (this._useObject > 0) this._avatarImage.appendAction(AvatarActionStateType.UseObject, this._useObject);

        if (this._talk) this._avatarImage.appendAction(AvatarActionStateType.Talk);

        if (this._sleep || this._blink) this._avatarImage.appendAction(AvatarActionStateType.Sleep);

        if (this._expression > 0) {
            const expression = AvatarActionStateTypeUtilities.getExpression(this._expression);

            if (expression !== undefined) {
                switch (expression) {
                    case AvatarActionStateType.Dance:
                        this._avatarImage.appendAction(AvatarActionStateType.Dance, 2);
                        break;
                    case AvatarActionStateType.Expression67:
                        this._avatarImage.appendAction(AvatarActionStateType.Dance, 'sixseven');
                        break;
                    default:
                        this._avatarImage.appendAction(expression);
                        break;
                }
            }
        }

        if (this._effect > 0) this._avatarImage.appendAction(AvatarActionStateType.Effect, this._effect);

        this._avatarImage.endActionAppends();

        this._isAnimating = this._avatarImage.isAnimating();

        let spriteCount = AvatarVisualization.INITIAL_RESERVED_SPRITES;

        for (const sprite of this._avatarImage.getSprites()) {
            if (sprite.id !== AvatarVisualization.AVATAR_SPRITE_TAG) spriteCount++;
        }

        if (spriteCount !== this.totalSprites) this.createSprites(spriteCount);

        this._extraSpritesStartIndex = spriteCount;

        if (this._additions) for (const addition of this._additions.values()) this.createSprite();
    }

    private updateFigure(figure: string): boolean {
        if (this._figure === figure) return false;

        this._figure = figure;

        this.resetAvatar();

        return true;
    }

    public resetFigure(figure: string): void {
        this._forceUpdate = true;
    }

    public resetEffect(effect: number): void {
        this._forceUpdate = true;
    }

    private resetAvatar(): void {
        for (const avatar of this._cachedAvatars.getValues()) avatar?.dispose();

        for (const avatar of this._cachedAvatarEffects.getValues()) avatar?.dispose();

        this._cachedAvatars.reset();
        this._cachedAvatarEffects.reset();

        this._avatarImage = undefined;

        const sprite = this.getSprite(AvatarVisualization.SPRITE_INDEX_AVATAR);

        if (sprite) {
            sprite.texture = Texture.EMPTY;
            sprite.alpha = 255;
        }
    }

    private getAddition(id: number): IAvatarAddition | undefined {
        return this._additions.get(id);
    }

    private addAddition(addition: IAvatarAddition): IAvatarAddition {
        const existing = this.getAddition(addition.id);

        if (existing) return existing;

        this._additions.set(addition.id, addition);

        return addition;
    }

    private removeAddition(id: number): void {
        const addition = this.getAddition(id);

        if (!addition) return;

        this._additions.delete(addition.id);

        addition.dispose();
    }

    private reconcileVariableFxStatuses(data: IVariableFxStatusModelData | undefined): boolean {
        const hasStatuses = !!data && data.statusesByConfig.size > 0 && !!this._variableFxRoomData;
        const stackedAdditions = this.getStackedAdditions(hasStatuses);

        if (!stackedAdditions) return false;

        return this._variableFxReconciler.reconcile(data, this._variableFxRoomData?.variableFxVisualizationManager, this._variableFxRoomData?.variableFxAssetProvider, this._variableFxRoomData?.variableFxRendererRegistry, stackedAdditions.stack, StackedAdditions.LAYER_VARIABLE_FX, GetTickerTime());
    }

    private getStackedAdditions(create: boolean): StackedAdditions | undefined {
        let stackedAdditions = this.getAddition(AvatarVisualization.ADDITION_ID_STACKED_ADDITIONS) as StackedAdditions | undefined;

        if (!stackedAdditions && create) stackedAdditions = this.addAddition(new StackedAdditions(AvatarVisualization.ADDITION_ID_STACKED_ADDITIONS, this)) as StackedAdditions;

        return stackedAdditions;
    }

    /** Once every stacked addition has faded out the stack sprite goes away and the sprite list is rebuilt. */
    private removeEmptyStackedAdditions(): boolean {
        const stackedAdditions = this.getStackedAdditions(false);

        if (!stackedAdditions || !stackedAdditions.isEmpty) return false;

        this.removeAddition(AvatarVisualization.ADDITION_ID_STACKED_ADDITIONS);

        this._forceUpdate = true;

        return true;
    }

    private updateShadow(scale: RoomGeometryScaleType): void {
        this._shadow = undefined;

        const sprite = this.getSprite(AvatarVisualization.SPRITE_INDEX_SHADOW);

        if (!sprite) return;

        let hasShadow
            = this._posture === AvatarActionStateType.Walk || this._posture === AvatarActionStateType.Stand || (this._posture === AvatarActionStateType.Sit && this._canStandUp);

        if (this._effect === AvatarVisualization.SNOWBOARDING_EFFECT || this._effect === AvatarVisualization.FREEZE_EFFECT) hasShadow = false;

        if (hasShadow) {
            sprite.visible = true;

            if (!this._shadow || scale !== this._scale) {
                if (scale < RoomGeometryScaleType.AvatarSizeNormal) {
                    sprite.libraryAssetName = 'sh_std_sd_1_0_0';

                    this._shadow = GetAssetManager().getAsset(sprite.libraryAssetName);

                    sprite.offsetX = -8;
                    sprite.offsetY = this._canStandUp ? 6 : -3;
                } else {
                    sprite.libraryAssetName = 'h_std_sd_1_0_0';

                    this._shadow = GetAssetManager().getAsset(sprite.libraryAssetName);

                    sprite.offsetX = -17;
                    sprite.offsetY = this._canStandUp ? 10 : -7;
                }

                if (this._shadow && this._shadow.texture) {
                    sprite.texture = this._shadow.texture;
                    sprite.alpha = 50 * this._alphaMultiplier;
                    sprite.relativeDepth = 1;
                } else {
                    sprite.visible = false;
                }
            }
        } else {
            this._shadow = undefined;

            sprite.visible = false;
        }
    }

    public get direction(): number {
        return this._direction;
    }

    public get posture(): AvatarActionStateType {
        return this._posture;
    }

    public get angle(): number {
        return this._angle;
    }
}
