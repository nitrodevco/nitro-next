import type { IRoomObjectUpdateMessage, IRoomSpriteMouseEvent } from '@nitrodevco/nitro-api';
import {
    AvatarActionTypeUtilities,
    type IRoomGeometry,
    type IRoomObjectModel,
    type IVector3D,
    MouseEventType,
    RoomObjectVariableEnum,
    Vector3d,
} from '@nitrodevco/nitro-api';
import { RoomObjectFurnitureActionEvent, RoomObjectMouseEvent, RoomObjectMoveEvent } from '@nitrodevco/nitro-shared';

import { GetTickerTime } from '../../../utils';
import {
    ObjectAvatarCarryObjectUpdateMessage,
    ObjectAvatarChatUpdateMessage,
    ObjectAvatarDanceUpdateMessage,
    ObjectAvatarDirectionUpdateMessage,
    ObjectAvatarEffectUpdateMessage,
    ObjectAvatarExpressionUpdateMessage,
    ObjectAvatarFigureUpdateMessage,
    ObjectAvatarFlatControlUpdateMessage,
    ObjectAvatarGestureUpdateMessage,
    ObjectAvatarMutedUpdateMessage,
    ObjectAvatarOwnMessage,
    ObjectAvatarPlayerValueUpdateMessage,
    ObjectAvatarPlayingGameUpdateMessage,
    ObjectAvatarPostureUpdateMessage,
    ObjectAvatarSelectedMessage,
    ObjectAvatarSignUpdateMessage,
    ObjectAvatarSleepUpdateMessage,
    ObjectAvatarTypingUpdateMessage,
    ObjectAvatarUpdateMessage,
    ObjectAvatarUseObjectUpdateMessage,
} from '../../messages';
import { MovingObjectLogic } from './MovingObjectLogic';

export class AvatarLogic extends MovingObjectLogic {
    private static MAX_HAND_ID: number = 999999999;
    private static MAX_HAND_USE_ID: number = 999;
    private static EFFECT_TYPE_SPLASH: number = 28;
    private static EFFECT_SPLASH_LENGTH: number = 500;
    private static EFFECT_TYPE_SWIM: number = 29;
    private static EFFECT_TYPE_SPLASH_DARK: number = 184;
    private static EFFECT_TYPE_SWIM_DARK: number = 185;

    private _selected: boolean = false;
    private _reportedLocation: IVector3D = new Vector3d();
    private _effectChangeTimeStamp: number = 0;
    private _newEffect: number = 0;
    private _blinkingStartTimestamp: number = GetTickerTime() + this.randomBlinkStartTimestamp();
    private _blinkingEndTimestamp: number = 0;
    private _talkingEndTimestamp: number = 0;
    private _talkingPauseStartTimestamp: number = 0;
    private _talkingPauseEndTimestamp: number = 0;
    private _carryObjectStartTimestamp: number = 0;
    private _carryObjectEndTimestamp: number = 0;
    private _allowUseCarryObject: boolean = false;
    private _animationEndTimestamp: number = 0;
    private _signEndTimestamp: number = 0;
    private _gestureEndTimestamp: number = 0;
    private _numberValueEndTimestamp: number = 0;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectMouseEvent.CLICK,
            RoomObjectMouseEvent.DOUBLE_CLICK,
            RoomObjectMouseEvent.MOUSE_ENTER,
            RoomObjectMouseEvent.MOUSE_LEAVE,
            RoomObjectMoveEvent.POSITION_CHANGED,
            RoomObjectFurnitureActionEvent.MOUSE_BUTTON,
            RoomObjectFurnitureActionEvent.MOUSE_ARROW,
        ]);
    }

    public override dispose(): void {
        if (this._selected)
            this.handleRoomObjectEvent(new RoomObjectMoveEvent(RoomObjectMoveEvent.OBJECT_REMOVED, this.object));

        super.dispose();

        this._reportedLocation = null!;
    }

    public override update(time: number): void {
        super.update(time);

        if (this._selected) {
            const location = this.object.getLocation();

            if (
                !this._reportedLocation ||
                this._reportedLocation.x !== location.x ||
                this._reportedLocation.y !== location.y ||
                this._reportedLocation.z !== location.z
            ) {
                if (!this._reportedLocation) this._reportedLocation = new Vector3d();

                this._reportedLocation.assign(location);

                this.handleRoomObjectEvent(new RoomObjectMoveEvent(RoomObjectMoveEvent.POSITION_CHANGED, this.object));
            }
        }

        this.updateModel(this.time, this.object.model);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (!message) return;

        super.processUpdateMessage(message);

        if (message instanceof ObjectAvatarPostureUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigurePosture, message.postureType);
            this.object.model.setValue(RoomObjectVariableEnum.FigurePostureParameter, message.parameter);

            return;
        }

        if (message instanceof ObjectAvatarChatUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureTalk, 1);

            this._talkingEndTimestamp = this.time + message.numberOfWords * 1000;

            return;
        }

        if (message instanceof ObjectAvatarTypingUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureIsTyping, message.isTyping ? 1 : 0);

            return;
        }

        if (message instanceof ObjectAvatarMutedUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureIsMuted, message.isMuted ? 1 : 0);

            return;
        }

        if (message instanceof ObjectAvatarPlayingGameUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureIsPlayingGame, message.isPlayingGame ? 1 : 0);

            return;
        }

        if (message instanceof ObjectAvatarUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.HeadDirection, message.headDirection);
            this.object.model.setValue(RoomObjectVariableEnum.FigureCanStandUp, message.canStandUp);
            this.object.model.setValue(RoomObjectVariableEnum.FigureVerticalOffset, message.baseY);

            return;
        }

        if (message instanceof ObjectAvatarDirectionUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.HeadDirection, message.headDirction);

            return;
        }

        if (message instanceof ObjectAvatarGestureUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureGesture, message.gesture);

            this._gestureEndTimestamp = this.time + 3000;

            return;
        }

        if (message instanceof ObjectAvatarExpressionUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureExpression, message.expressionType);

            this._animationEndTimestamp = AvatarActionTypeUtilities.getExpressionTimeout(
                this.object.model.getValue<number>(RoomObjectVariableEnum.FigureExpression),
            );

            if (this._animationEndTimestamp > -1) this._animationEndTimestamp += this.time;

            return;
        }

        if (message instanceof ObjectAvatarDanceUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureDance, message.danceStyle);

            return;
        }

        if (message instanceof ObjectAvatarSleepUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureSleep, message.isSleeping ? 1 : 0);

            if (message.isSleeping) this._blinkingStartTimestamp = -1;
            else this._blinkingStartTimestamp = this.time + this.randomBlinkStartTimestamp();

            return;
        }

        if (message instanceof ObjectAvatarPlayerValueUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureNumberValue, message.value);

            this._numberValueEndTimestamp = this.time + 3000;

            return;
        }

        if (message instanceof ObjectAvatarEffectUpdateMessage) {
            this.updateAvatarEffect(message.effect, message.delayMilliseconds, this.object.model);

            return;
        }

        if (message instanceof ObjectAvatarCarryObjectUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureCarryObject, message.itemType);
            this.object.model.setValue(RoomObjectVariableEnum.FigureUseObject, 0);

            if (message.itemType === 0) {
                this._carryObjectStartTimestamp = 0;
                this._carryObjectEndTimestamp = 0;
                this._allowUseCarryObject = false;
            } else {
                this._carryObjectStartTimestamp = this.time;

                if (message.itemType < AvatarLogic.MAX_HAND_ID) {
                    this._carryObjectEndTimestamp = 0;
                    this._allowUseCarryObject = message.itemType <= AvatarLogic.MAX_HAND_USE_ID;
                } else {
                    this._carryObjectEndTimestamp = this._carryObjectStartTimestamp + 1500;
                    this._allowUseCarryObject = false;
                }
            }

            return;
        }

        if (message instanceof ObjectAvatarUseObjectUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureUseObject, message.itemType);

            return;
        }

        if (message instanceof ObjectAvatarSignUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureSign, message.signType);

            this._signEndTimestamp = this.time + 5000;

            return;
        }

        if (message instanceof ObjectAvatarFlatControlUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureFlatControl, message.level);

            return;
        }

        if (message instanceof ObjectAvatarFigureUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.Figure, message.figure);
            this.object.model.setValue(RoomObjectVariableEnum.Gender, message.gender);

            return;
        }

        if (message instanceof ObjectAvatarSelectedMessage) {
            this._selected = message.selected;
            this._reportedLocation = new Vector3d();

            return;
        }

        if (message instanceof ObjectAvatarOwnMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.OwnUser, 1);

            return;
        }
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry | undefined): void {
        if (!event || !geometry) return;

        let eventType = event.type;

        switch (eventType) {
            case MouseEventType.MOUSE_CLICK:
                eventType = RoomObjectMouseEvent.CLICK;
                break;
            case MouseEventType.DOUBLE_CLICK:
                eventType = RoomObjectMouseEvent.DOUBLE_CLICK;
                break;
            case MouseEventType.ROLL_OVER:
                eventType = RoomObjectMouseEvent.MOUSE_ENTER;

                this.object.model.setValue(RoomObjectVariableEnum.FigureHighlight, 1);

                this.handleRoomObjectEvent(
                    new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_BUTTON, this.object), // this is used to change cursor
                );
                break;
            case MouseEventType.ROLL_OUT:
                eventType = RoomObjectMouseEvent.MOUSE_LEAVE;

                this.object.model.setValue(RoomObjectVariableEnum.FigureHighlight, 0);

                this.handleRoomObjectEvent(
                    new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_ARROW, this.object), // this is used to change cursor
                );
                break;
        }

        this.handleRoomObjectEvent(
            new RoomObjectMouseEvent(
                eventType,
                this.object,
                event.eventId,
                event.altKey,
                event.ctrlKey,
                event.shiftKey,
                event.buttonDown,
            ),
        );
    }

    private updateModel(time: number, model: IRoomObjectModel): void {
        if (this._talkingEndTimestamp > 0) {
            if (time > this._talkingEndTimestamp) {
                model.setValue(RoomObjectVariableEnum.FigureTalk, 0);

                this._talkingEndTimestamp = 0;
                this._talkingPauseStartTimestamp = 0;
                this._talkingPauseEndTimestamp = 0;
            } else if (!this._talkingPauseEndTimestamp && !this._talkingPauseStartTimestamp) {
                this._talkingPauseStartTimestamp = time + this.randomTalkingPauseStartTimestamp();
                this._talkingPauseEndTimestamp =
                    this._talkingPauseStartTimestamp + this.randomTalkingPauseEndTimestamp();
            } else if (this._talkingPauseStartTimestamp > 0 && time > this._talkingPauseStartTimestamp) {
                model.setValue(RoomObjectVariableEnum.FigureTalk, 0);

                this._talkingPauseStartTimestamp = 0;
            } else if (this._talkingPauseEndTimestamp > 0 && time > this._talkingPauseEndTimestamp) {
                model.setValue(RoomObjectVariableEnum.FigureTalk, 1);

                this._talkingPauseEndTimestamp = 0;
            }
        }

        if (this._animationEndTimestamp > 0 && time > this._animationEndTimestamp) {
            model.setValue(RoomObjectVariableEnum.FigureExpression, 0);

            this._animationEndTimestamp = 0;
        }

        if (this._gestureEndTimestamp > 0 && time > this._gestureEndTimestamp) {
            model.setValue(RoomObjectVariableEnum.FigureGesture, 0);

            this._gestureEndTimestamp = 0;
        }

        if (this._signEndTimestamp > 0 && time > this._signEndTimestamp) {
            model.setValue(RoomObjectVariableEnum.FigureSign, -1);

            this._signEndTimestamp = 0;
        }

        if (this._carryObjectEndTimestamp > 0) {
            if (time > this._carryObjectEndTimestamp) {
                model.setValue(RoomObjectVariableEnum.FigureCarryObject, 0);
                model.setValue(RoomObjectVariableEnum.FigureUseObject, 0);

                this._carryObjectStartTimestamp = 0;
                this._carryObjectEndTimestamp = 0;
                this._allowUseCarryObject = false;
            }
        }

        if (this._allowUseCarryObject) {
            if (time - this._carryObjectStartTimestamp > 5000) {
                if ((time - this._carryObjectStartTimestamp) % 10000 < 1000) {
                    model.setValue(RoomObjectVariableEnum.FigureUseObject, 1);
                } else {
                    model.setValue(RoomObjectVariableEnum.FigureUseObject, 0);
                }
            }
        }

        if (this._blinkingStartTimestamp > -1 && time > this._blinkingStartTimestamp) {
            model.setValue(RoomObjectVariableEnum.FigureBlink, 1);

            this._blinkingStartTimestamp = time + this.randomBlinkStartTimestamp();
            this._blinkingEndTimestamp = time + this.randomBlinkEndTimestamp();
        }

        if (this._blinkingEndTimestamp > 0 && time > this._blinkingEndTimestamp) {
            model.setValue(RoomObjectVariableEnum.FigureBlink, 0);

            this._blinkingEndTimestamp = 0;
        }

        if (this._effectChangeTimeStamp > 0 && time > this._effectChangeTimeStamp) {
            model.setValue(RoomObjectVariableEnum.FigureEffect, this._newEffect);

            this._effectChangeTimeStamp = 0;
        }

        if (this._numberValueEndTimestamp > 0 && time > this._numberValueEndTimestamp) {
            model.setValue(RoomObjectVariableEnum.FigureNumberValue, 0);

            this._numberValueEndTimestamp = 0;
        }
    }

    private updateAvatarEffect(effect: number, delay: number, model: IRoomObjectModel): void {
        if (effect === AvatarLogic.EFFECT_TYPE_SPLASH) {
            this._effectChangeTimeStamp = GetTickerTime() + AvatarLogic.EFFECT_SPLASH_LENGTH;
            this._newEffect = AvatarLogic.EFFECT_TYPE_SWIM;
        } else if (effect === AvatarLogic.EFFECT_TYPE_SPLASH_DARK) {
            this._effectChangeTimeStamp = GetTickerTime() + AvatarLogic.EFFECT_SPLASH_LENGTH;
            this._newEffect = AvatarLogic.EFFECT_TYPE_SWIM_DARK;
        } else if (model.getValue<number>(RoomObjectVariableEnum.FigureEffect) === AvatarLogic.EFFECT_TYPE_SWIM) {
            this._effectChangeTimeStamp = GetTickerTime() + AvatarLogic.EFFECT_SPLASH_LENGTH;
            this._newEffect = effect;

            effect = AvatarLogic.EFFECT_TYPE_SPLASH;
        } else if (model.getValue<number>(RoomObjectVariableEnum.FigureEffect) === AvatarLogic.EFFECT_TYPE_SWIM_DARK) {
            this._effectChangeTimeStamp = GetTickerTime() + AvatarLogic.EFFECT_SPLASH_LENGTH;
            this._newEffect = effect;

            effect = AvatarLogic.EFFECT_TYPE_SPLASH_DARK;
        } else if (delay === 0) {
            this._effectChangeTimeStamp = 0;
        } else {
            this._effectChangeTimeStamp = GetTickerTime() + delay;
            this._newEffect = effect;

            return;
        }

        model.setValue(RoomObjectVariableEnum.FigureEffect, effect);
    }

    private randomTalkingPauseStartTimestamp(): number {
        return 100 + Math.random() * 200;
    }

    private randomTalkingPauseEndTimestamp(): number {
        return 75 + Math.random() * 75;
    }

    private randomBlinkStartTimestamp(): number {
        return 4500 + Math.random() * 1000;
    }

    private randomBlinkEndTimestamp(): number {
        return 50 + Math.random() * 200;
    }
}
