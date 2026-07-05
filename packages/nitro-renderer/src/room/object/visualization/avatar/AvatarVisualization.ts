import type { IRoomObject, IRoomObjectModel } from '@nitrodevco/nitro-api';
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { AvatarActionStateType, AvatarActionStateTypeUtilities, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
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
    RoomObjectSpriteTypeEnum,
    RoomObjectVariableEnum,
} from '@nitrodevco/nitro-api';
import { AdvancedMap } from '@nitrodevco/nitro-shared';
import { Texture } from 'pixi.js';

import { GetAssetManager } from '../../../../assets';
import { RoomObjectSpriteVisualization } from '../RoomObjectSpriteVisualization';
import type { IAvatarAddition } from './additions';
import {
    ExpressionAdditionFactory,
    FloatingIdleZAddition,
    GameClickTargetAddition,
    GuideStatusBubbleAddition,
    MutedBubbleAddition,
    NumberBubbleAddition,
    TypingBubbleAddition,
} from './additions';
import { AvatarVisualizationData } from './AvatarVisualizationData';

export class AvatarVisualization
    extends RoomObjectSpriteVisualization
    implements IAvatarImageListener, IAvatarEffectListener {
    private static AVATAR: string = 'avatar';
    private static FLOATING_IDLE_Z_ID: number = 1;
    private static TYPING_BUBBLE_ID: number = 2;
    private static EXPRESSION_ID: number = 3;
    private static NUMBER_BUBBLE_ID: number = 4;
    private static GAME_CLICK_TARGET_ID: number = 5;
    private static MUTED_BUBBLE_ID: number = 6;
    private static GUIDE_BUBBLE_ID: number = 7;
    private static OWN_USER_ID: number = 4;
    private static UPDATE_TIME_INCREASER: number = 41;
    private static AVATAR_LAYER_ID: number = 0;
    private static SHADOW_LAYER_ID: number = 1;
    private static SNOWBOARDING_EFFECT: number = 97;
    private static INITIAL_RESERVED_SPRITES: number = 2;
    private static ANIMATION_FRAME_UPDATE_INTERVAL: number = 2;
    private static DEFAULT_CANVAS_OFFSETS: number[] = [0, 0, 0];
    private static MAX_EFFECT_CACHE: number = 2;
    private static SPRITE_INDEX_AVATAR: number = 0;
    private static BASE_Y_SCALE: number = 1000;
    private static AVATAR_SPRITE_DEFAULT_DEPTH: number = -0.01;
    private static AVATAR_OWN_DEPTH_ADJUST: number = 0.001;
    private static AVATAR_SPRITE_LAYING_DEPTH: number = -0.409;

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
    private _dance: number = 0;
    private _effect: number = 0;
    private _carryObject: number = 0;
    private _useObject: number = 0;
    private _ownUser: boolean = false;

    private _isLaying: boolean = false;
    private _layInside: boolean = false;
    private _isAnimating: boolean = false;
    private _extraSpritesStartIndex: number = 2;
    private _forcedAnimFrames: number = 0;
    private _updatesUntilFrameUpdate: number = 0;

    private _isAvatarReady: boolean = false;
    private _needsUpdate: boolean = false;
    private _geometryUpdateCounter: number = -1;

    private _additions: Map<number, IAvatarAddition> = new Map();

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

        this._shadow = undefined;
        this._disposed = true;
    }

    public override update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean): void {
        if (!this.object || !geometry || !this._data) return;

        if (time < this._lastUpdate + AvatarVisualization.UPDATE_TIME_INCREASER) return;

        this._lastUpdate += AvatarVisualization.UPDATE_TIME_INCREASER;

        if (this._lastUpdate + AvatarVisualization.UPDATE_TIME_INCREASER < time)
            this._lastUpdate = time - AvatarVisualization.UPDATE_TIME_INCREASER;

        const model = this.object.model;
        const scale = geometry.scale;
        const effect = this._effect;

        let didScaleUpdate = false;
        let didEffectUpdate = false;
        let otherUpdate = false;
        let objectUpdate: boolean;

        const updateModel = this.updateModel(model, scale);

        if (updateModel || scale !== this._scale || !this._avatarImage) {
            if (scale !== this._scale) {
                didScaleUpdate = true;

                this.updateScale(scale);
            }

            if (effect !== this._effect) didEffectUpdate = true;

            if (didScaleUpdate || !this._avatarImage || didEffectUpdate) {
                this._avatarImage = this.createAvatarImage(scale, this._effect);

                if (!this._avatarImage) return;

                otherUpdate = true;

                const sprite = this.getSprite(AvatarVisualization.AVATAR_LAYER_ID);

                if (sprite && this._avatarImage && this._avatarImage.isPlaceholder()) {
                    sprite.alpha = 150;
                } else if (sprite) {
                    sprite.alpha = 255;
                }
            }

            if (!this._avatarImage) return;

            if (didEffectUpdate && this._avatarImage.animationHasResetOnToggle)
                this._avatarImage.resetAnimationFrameCounter();

            this.updateShadow(scale);

            objectUpdate = this.updateObject(this.object, geometry, update, true);

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
            objectUpdate = this.updateObject(this.object, geometry, update);
        }

        if (this._additions) {
            let index = this._extraSpritesStartIndex;

            for (const addition of this._additions.values()) {
                const sprite = this.getSprite(index++);
                if (sprite && addition.animate(sprite)) this.updateSpriteCounter++;
            }
        }

        const update1 = objectUpdate || updateModel || didScaleUpdate;
        const update2 = (this._isAnimating || this._forcedAnimFrames > 0) && update;

        if (update1) this._forcedAnimFrames = AvatarVisualization.ANIMATION_FRAME_UPDATE_INTERVAL;

        if (update1 || update2) {
            this.updateSpriteCounter++;

            this._forcedAnimFrames--;
            this._updatesUntilFrameUpdate--;

            if (this._updatesUntilFrameUpdate <= 0 || didScaleUpdate || updateModel || otherUpdate) {
                this._avatarImage.updateAnimationByFrames(1);

                this._updatesUntilFrameUpdate = AvatarVisualization.ANIMATION_FRAME_UPDATE_INTERVAL;
            } else {
                return;
            }

            let _local_20 = this._avatarImage.getCanvasOffsets();

            if (!_local_20 || _local_20.length < 3) _local_20 = AvatarVisualization.DEFAULT_CANVAS_OFFSETS;

            const sprite = this.getSprite(AvatarVisualization.SPRITE_INDEX_AVATAR);

            if (sprite) {
                const highlightEnabled =
                    this.object.model.getValue<number>(RoomObjectVariableEnum.FigureHighlightEnable) === 1 &&
                    this.object.model.getValue<number>(RoomObjectVariableEnum.FigureHighlight) === 1;

                const avatarImage = this._avatarImage.getImage(AvatarSetType.Full, highlightEnabled);

                if (avatarImage) {
                    sprite.texture = avatarImage;

                    if (highlightEnabled) {
                        // sprite.filters  = [
                        //     new GlowFilter({
                        //         color: 0xFFFFFF,
                        //         distance: 6
                        //     })
                        // ];
                    } else {
                        sprite.filters = [];
                    }
                }

                if (sprite.texture) {
                    sprite.offsetX = (-1 * scale) / 2 + _local_20[0] - (sprite.texture.width - scale) / 2;
                    sprite.offsetY = -sprite.texture.height + scale / 4 + _local_20[1] + this._postureOffset;
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
            }

            const typingBubble = this.getAddition(AvatarVisualization.TYPING_BUBBLE_ID) as TypingBubbleAddition;

            if (typingBubble) {
                if (!this._isLaying)
                    typingBubble.relativeDepth = AvatarVisualization.AVATAR_SPRITE_DEFAULT_DEPTH - 0.01 + _local_20[2];
                else typingBubble.relativeDepth = AvatarVisualization.AVATAR_SPRITE_LAYING_DEPTH - 0.01 + _local_20[2];
            }

            this._isAnimating = this._avatarImage.isAnimating();

            let _local_21 = AvatarVisualization.INITIAL_RESERVED_SPRITES;
            const direction = this._avatarImage.getDirection();

            for (const spriteData of this._avatarImage.getSprites()) {
                if (spriteData.id === AvatarVisualization.AVATAR) {
                    const sprite = this.getSprite(AvatarVisualization.SPRITE_INDEX_AVATAR);

                    if (sprite) {
                        const layerData = this._avatarImage.getLayerData(spriteData);

                        let offsetX = spriteData.getDirectionOffsetX(direction);
                        let offsetY = spriteData.getDirectionOffsetY(direction);

                        if (layerData) {
                            offsetX += layerData.dx;
                            offsetY += layerData.dy;
                        }

                        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                        if (scale < 48) {
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

                        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                        if (scale < 48) {
                            offsetX /= 2;
                            offsetY /= 2;
                        }

                        if (dd < 0) dd += 8;
                        else if (dd > 7) dd -= 8;

                        const assetName =
                            this._avatarImage.getScale() + '_' + spriteData.member + '_' + dd + '_' + frameNumber;

                        const asset = GetAssetManager().getAsset(assetName);

                        if (!asset || !asset.texture) continue;

                        sprite.texture = asset.texture;
                        sprite.offsetX = asset.offsetX - scale / 2 + offsetX;
                        sprite.offsetY = asset.offsetY + offsetY;
                        sprite.flipH = asset.flipH;

                        if (spriteData.hasStaticY) {
                            sprite.offsetY += (this._verticalOffset * scale) / (2 * AvatarVisualization.BASE_Y_SCALE);
                        } else {
                            sprite.offsetY += this._postureOffset;
                        }

                        if (this._isLaying) {
                            sprite.relativeDepth =
                                AvatarVisualization.AVATAR_SPRITE_LAYING_DEPTH - 0.001 * this.totalSprites * offsetZ;
                        } else {
                            sprite.relativeDepth =
                                AvatarVisualization.AVATAR_SPRITE_DEFAULT_DEPTH - 0.001 * this.totalSprites * offsetZ;
                        }

                        if (spriteData.ink === 33) sprite.blendMode = 'add';
                        else sprite.blendMode = 'normal';
                    }

                    _local_21++;
                }
            }
        }
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
            cachedImage = this._data?.createAvatarImage(this._figure, scale, this._gender, this, this);

            if (cachedImage) {
                if (!effectId) {
                    this._cachedAvatars.add(imageName, cachedImage);
                } else {
                    if (this._cachedAvatarEffects.length >= AvatarVisualization.MAX_EFFECT_CACHE) {
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
            !_arg_4 &&
            this.updateObjectCounter === object.updateCounter &&
            this._geometryUpdateCounter === geometry.updateId
        )
            return false;

        let direction = object.getDirection().x - geometry.direction.x;
        let headDirection = this._headDirection - geometry.direction.x;

        if (this._posture === AvatarActionStateType.Float) headDirection = direction;

        direction = ((direction % 360) + 360) % 360;
        headDirection = ((headDirection % 360) + 360) % 360;

        if (this._posture === AvatarActionStateType.Sit && this._canStandUp) {
            direction -= (direction % 90) - 45;
            headDirection -= (headDirection % 90) - 45;
        }

        if (direction !== this._angle || _arg_4) {
            update = true;

            this._angle = direction;

            direction = direction - (135 - 22.5);
            direction = (direction + 360) % 360;

            this._avatarImage?.setDirectionAngle(AvatarSetType.Full, direction);
        }

        if (headDirection !== this._headAngle || _arg_4) {
            update = true;

            this._headAngle = headDirection;

            if (this._headAngle !== this._angle) {
                headDirection = headDirection - (135 - 22.5);
                headDirection = (headDirection + 360) % 360;

                this._avatarImage?.setDirectionAngle(AvatarSetType.Head, headDirection);
            }
        }

        this._geometryUpdateCounter = geometry.updateId;

        this.updateObjectCounter = this.object.updateCounter;

        return update;
    }

    protected updateModel(model: IRoomObjectModel, scale: RoomGeometryScaleType): boolean {
        if (!model) return false;

        if (this.updateModelCounter === model.updateCounter) return false;

        let needsUpdate = false;

        const talk = model.getValue<number>(RoomObjectVariableEnum.FigureTalk) > 0;

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

        const blink = model.getValue<number>(RoomObjectVariableEnum.FigureBlink) > 0;

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

        const verticalOffset =
            model.getValue<number>(RoomObjectVariableEnum.FigureVerticalOffset) * AvatarVisualization.BASE_Y_SCALE;

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

        if (this._carryObject > 0 && useObject > 0) {
            if (this._useObject !== this._carryObject) {
                this._useObject = this._carryObject;

                needsUpdate = true;
            }
        } else if (this._useObject !== 0) {
            this._useObject = 0;

            needsUpdate = true;
        }

        let idleAddition = this.getAddition(AvatarVisualization.FLOATING_IDLE_Z_ID);

        if (this._sleep) {
            if (!idleAddition)
                // eslint-disable-next-line no-useless-assignment
                idleAddition = this.addAddition(
                    new FloatingIdleZAddition(AvatarVisualization.FLOATING_IDLE_Z_ID, this),
                );

            needsUpdate = true;
        } else if (idleAddition) this.removeAddition(AvatarVisualization.FLOATING_IDLE_Z_ID);

        const isMuted = model.getValue<number>(RoomObjectVariableEnum.FigureIsMuted) > 0;

        let mutedAddition = this.getAddition(AvatarVisualization.MUTED_BUBBLE_ID);

        if (isMuted) {
            if (!mutedAddition)
                // eslint-disable-next-line no-useless-assignment
                mutedAddition = this.addAddition(new MutedBubbleAddition(AvatarVisualization.MUTED_BUBBLE_ID, this));

            needsUpdate = true;
        } else {
            if (mutedAddition) {
                this.removeAddition(AvatarVisualization.MUTED_BUBBLE_ID);

                needsUpdate = true;
            }

            const isTyping = model.getValue<number>(RoomObjectVariableEnum.FigureIsTyping) > 0;

            let typingAddition = this.getAddition(AvatarVisualization.TYPING_BUBBLE_ID);

            if (isTyping) {
                if (!typingAddition)
                    // eslint-disable-next-line no-useless-assignment
                    typingAddition = this.addAddition(
                        new TypingBubbleAddition(AvatarVisualization.TYPING_BUBBLE_ID, this),
                    );

                needsUpdate = true;
            } else if (typingAddition) {
                this.removeAddition(AvatarVisualization.TYPING_BUBBLE_ID);

                needsUpdate = true;
            }
        }

        const guideStatusValue = model.getValue<number>(RoomObjectVariableEnum.FigureGuideStatus) || 0;

        if (guideStatusValue !== AvatarGuideStatus.NONE) {
            this.removeAddition(AvatarVisualization.GUIDE_BUBBLE_ID);
            this.addAddition(
                new GuideStatusBubbleAddition(AvatarVisualization.GUIDE_BUBBLE_ID, this, guideStatusValue),
            );

            needsUpdate = true;
        } else if (this.getAddition(AvatarVisualization.GUIDE_BUBBLE_ID)) {
            this.removeAddition(AvatarVisualization.GUIDE_BUBBLE_ID);

            needsUpdate = true;
        }

        const isPlayingGame = model.getValue<number>(RoomObjectVariableEnum.FigureIsPlayingGame) > 0;

        let gameClickAddition = this.getAddition(AvatarVisualization.GAME_CLICK_TARGET_ID);

        if (isPlayingGame) {
            if (!gameClickAddition)
                // eslint-disable-next-line no-useless-assignment
                gameClickAddition = this.addAddition(
                    new GameClickTargetAddition(AvatarVisualization.GAME_CLICK_TARGET_ID),
                );

            needsUpdate = true;
        } else if (gameClickAddition) this.removeAddition(AvatarVisualization.GAME_CLICK_TARGET_ID);

        const numberValue = model.getValue<number>(RoomObjectVariableEnum.FigureNumberValue);

        let numberAddition = this.getAddition(AvatarVisualization.NUMBER_BUBBLE_ID);

        if (numberValue > 0) {
            if (!numberAddition)
                // eslint-disable-next-line no-useless-assignment
                numberAddition = this.addAddition(
                    new NumberBubbleAddition(AvatarVisualization.NUMBER_BUBBLE_ID, numberValue, this),
                );

            needsUpdate = true;
        } else if (numberAddition) this.removeAddition(AvatarVisualization.NUMBER_BUBBLE_ID);

        let expressionAddition = this.getAddition(AvatarVisualization.EXPRESSION_ID);

        if (this._expression > 0) {
            if (!expressionAddition) {
                expressionAddition = ExpressionAdditionFactory.getExpressionAddition(
                    AvatarVisualization.EXPRESSION_ID,
                    this._expression,
                    this,
                );

                if (expressionAddition) this.addAddition(expressionAddition);
            }
        } else if (expressionAddition) this.removeAddition(AvatarVisualization.EXPRESSION_ID);

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

        const ownUser = model.getValue<number>(RoomObjectVariableEnum.OwnUser) > 0;

        if (ownUser !== this._ownUser) {
            this._ownUser = ownUser;

            needsUpdate = true;
        }

        this.updateModelCounter = model.updateCounter;

        return needsUpdate;
    }

    protected setDirection(direction: number): void {
        if (this._direction === direction) return;

        this._direction = direction;

        this._needsUpdate = true;
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
            if (sprite.id !== AvatarVisualization.AVATAR) spriteCount++;
        }

        if (spriteCount !== this.totalSprites) this.createSprites(spriteCount);

        this._extraSpritesStartIndex = spriteCount;

        if (this._additions) for (const addition of this._additions.values()) this.createSprite();
    }

    private updateFigure(figure: string): boolean {
        if (this._figure === figure) return false;

        this._figure = figure;

        this.clearAvatar();

        return true;
    }

    public resetFigure(figure: string): void {
        this.clearAvatar();
    }

    public resetEffect(effect: number): void {
        this.clearAvatar();
    }

    private clearAvatar(): void {
        const sprite = this.getSprite(AvatarVisualization.AVATAR_LAYER_ID);

        if (sprite) {
            sprite.texture = Texture.EMPTY;
            sprite.alpha = 255;
        }

        for (const avatar of this._cachedAvatars.getValues()) avatar?.dispose();

        for (const avatar of this._cachedAvatarEffects.getValues()) avatar?.dispose();

        this._cachedAvatars.reset();
        this._cachedAvatarEffects.reset();

        this._avatarImage = undefined;
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

    private updateShadow(scale: RoomGeometryScaleType): void {
        this._shadow = undefined;

        const sprite = this.getSprite(AvatarVisualization.SHADOW_LAYER_ID);

        if (!sprite) return;

        let hasShadow =
            this._posture === AvatarActionStateType.Walk || this._posture === AvatarActionStateType.Stand || (this._posture === AvatarActionStateType.Sit && this._canStandUp);

        if (this._effect === AvatarVisualization.SNOWBOARDING_EFFECT) hasShadow = false;

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
                    sprite.alpha = 50;
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

    public get posture(): string {
        return this._posture;
    }

    public get angle(): number {
        return this._angle;
    }

    public get disposed(): boolean {
        return this._disposed;
    }
}
