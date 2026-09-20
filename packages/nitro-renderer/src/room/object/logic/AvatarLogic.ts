import {
    AvatarActionStateTypeUtilities,
    type IRoomGeometry,
    type IRoomObjectModel,
    IRoomObjectUpdateMessage, IRoomSpriteMouseEvent,
    type IVector3D,
    MouseEventType,
    RoomObjectUserTypeName,
    RoomObjectVariableEnum,
    Vector3d,
} from '@nitrodevco/nitro-api';
import { RoomObjectFurnitureActionEvent, RoomObjectMouseEvent, RoomObjectMoveEvent } from '@nitrodevco/nitro-api';

import { GetTickerTime } from '../../../utils';
import {
    ObjectAvatarBlockedUpdateMessage,
    ObjectAvatarCarryObjectUpdateMessage,
    ObjectAvatarChatUpdateMessage,
    ObjectAvatarDanceUpdateMessage,
    ObjectAvatarDirectionUpdateMessage,
    ObjectAvatarEffectUpdateMessage,
    ObjectAvatarExpressionUpdateMessage,
    ObjectAvatarFigureUpdateMessage,
    ObjectAvatarFlatControlUpdateMessage,
    ObjectAvatarGestureUpdateMessage,
    ObjectAvatarGuideStatusUpdateMessage,
    ObjectAvatarHabbiconUpdateMessage,
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
    ObjectMoveUpdateMessage,
} from '../../messages';
import { MovingObjectLogic } from './MovingObjectLogic';

/**
 * Ports `com.sulake.habbo.room.object.logic.AvatarLogic`: everything an avatar's model carries
 * besides its position - posture, chat, gestures, expressions, effects, the carried item, the
 * habbicon - and the timers in `updateActions` that clear each of them again.
 *
 * Where the port differs from Flash, on purpose:
 *
 * - `AvatarLogicRoomData` is not ported. That class holds one field, the room's avatar Variable FX
 *   config table, which `AvatarLogic.variableFxLogicManager` reads back; the port's `Room` sets
 *   `variableFxLogicManager` on the logic itself, so the `roomData` accessors and the getter
 *   override have nothing left to do.
 * - Flash's private `targetIsWarping` - and the `1.5` tile distance it compares a target against -
 *   is called from nowhere in the client. It is not ported; `scripts/drift/constants.py` says so
 *   where it skips the constant.
 * - `RoomObjectMouseEvent.DOUBLE_CLICK` is the port's own (`REOE_DOUBLE_CLICK` in
 *   `scripts/drift/known.py`); Flash's avatar has no double click.
 * - `RoomObjectAvatarFlatControlUpdateMessage` carries the controller level as the raw string and
 *   Flash parses it here; the port parses it in `Room.updateRoomObjectUserFlatControl`, so the
 *   message carries a number and the `NaN` / 0..5 gating Flash does after its `parseInt` is done
 *   on that number.
 *
 * The habbicon half writes what Flash writes - `figure_habbicon`,
 * `figure_habbicon_trigger_sequence`, `figure_habbicon_spin_offset` - but nothing shows it yet:
 * `HabbiconBubble` is not ported (`AvatarVisualization.ADDITION_ID_HABBICON_BUBBLE` holds its
 * addition id), and neither is `HabbiconAssetManager`, whose id -> name table decides whether a
 * habbicon is the spinning duck. `habbiconNameResolver` below is where that table plugs in.
 */
export class AvatarLogic extends MovingObjectLogic {
    private static EFFECT_TYPE_SPLASH: number = 28;
    private static EFFECT_TYPE_SWIM: number = 29;
    /** Flash's names for 184 and 185 are obfuscated: the dark water splash and swim. */
    private static EFFECT_TYPE_SPLASH_DARK: number = 184;
    private static EFFECT_TYPE_SWIM_DARK: number = 185;
    private static EFFECT_SPLASH_LENGTH: number = 500;
    private static CARRY_ITEM_NULL: number = 0;
    /** Up to this id a carried item is a consumable: the avatar uses it every so often. */
    private static CARRY_ITEM_LAST_CONSUMABLE: number = 999;
    /** The "carrying nothing" item: it only plays the empty hand animation, then clears itself. */
    private static CARRY_ITEM_EMPTY_HAND: number = 999999999;
    private static CARRY_ITEM_DELAY_BEFORE_USE: number = 5000;
    private static CARRY_ITEM_EMPTY_HAND_ANIMATION_LENGTH: number = 1500;
    private static SPINNING_DUCK_HABBICON_NAME: string = 'duck_spinning';
    private static HABBICON_SPIN_DURATION_MS: number = 3200;
    private static HABBICON_SPIN_STEP_MS: number = 100;
    private static HABBICON_SPIN_STEP_DEGREES: number = -45;

    /**
     * Flash reads a habbicon's name with `HabbiconAssetManager.getHabbiconNameKey(id)` to decide
     * whether it is the one habbicon that spins. That manager - its definitions download from
     * `habbicons.asset.root`, and no packet here triggers a habbicon at all - is not ported, so
     * the port has no id -> name table: with no resolver set, `figure_habbicon` and
     * `figure_habbicon_trigger_sequence` are written and the spin never starts. The habbicon port
     * sets this once, the way Flash's manager is a singleton.
     */
    public static habbiconNameResolver: ((habbiconId: number) => string | undefined) | undefined = undefined;

    private _selected: boolean = false;
    private _reportedLocation: IVector3D | undefined = undefined;
    private _effectChangeTimeStamp: number = 0;
    private _newEffect: number = 0;
    private _blinkingStartTimestamp: number = GetTickerTime() + this.getBlinkInterval();
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
    private _habbiconEndTimestamp: number = 0;
    private _habbiconSpinStartTimestamp: number = 0;
    private _habbiconSpinEndTimestamp: number = 0;
    private _habbiconSpinOffset: number = 0;

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
        if (this._selected && this.object)
            this.handleRoomObjectEvent(new RoomObjectMoveEvent(RoomObjectMoveEvent.OBJECT_REMOVED, this.object));

        super.dispose();

        this._reportedLocation = undefined;
    }

    public override update(time: number): void {
        super.update(time);

        if (!this.object) return;

        if (this._selected) {
            const location = this.object.getLocation();

            if (
                !this._reportedLocation
                || this._reportedLocation.x !== location.x
                || this._reportedLocation.y !== location.y
                || this._reportedLocation.z !== location.z
            ) {
                if (!this._reportedLocation) this._reportedLocation = new Vector3d();

                this._reportedLocation.assign(location);

                this.handleRoomObjectEvent(new RoomObjectMoveEvent(RoomObjectMoveEvent.POSITION_CHANGED, this.object));
            }
        }

        if (this.object.model) this.updateModel(time, this.object.model);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (!message || !this.object) return;

        super.processUpdateMessage(message);

        if (message instanceof ObjectAvatarPostureUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigurePosture, message.postureType);
            this.object.model.setValue(RoomObjectVariableEnum.FigurePostureParameter, message.parameter);

            return;
        }

        if (message instanceof ObjectAvatarChatUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureTalk, 1);

            this._talkingEndTimestamp = GetTickerTime() + message.numberOfWords * 1000;

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

            if (!isNaN(message.jumpingPower)) this.object.model.setValue(RoomObjectVariableEnum.FigureJumpingPower, message.jumpingPower);

            return;
        }

        if (message instanceof ObjectAvatarDirectionUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.HeadDirection, message.headDirction);

            return;
        }

        if (message instanceof ObjectAvatarGestureUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureGesture, message.gesture);

            this._gestureEndTimestamp = GetTickerTime() + 3000;

            return;
        }

        if (message instanceof ObjectAvatarExpressionUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureExpression, message.expressionType);

            this._animationEndTimestamp = AvatarActionStateTypeUtilities.getExpressionTimeout(
                this.object.model.getValue<number>(RoomObjectVariableEnum.FigureExpression),
            );

            if (this._animationEndTimestamp > -1) this._animationEndTimestamp += GetTickerTime();

            return;
        }

        if (message instanceof ObjectAvatarDanceUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureDance, message.danceStyle);

            return;
        }

        if (message instanceof ObjectAvatarSleepUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureSleep, message.isSleeping ? 1 : 0);

            return;
        }

        if (message instanceof ObjectAvatarPlayerValueUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureNumberValue, message.value);

            this._numberValueEndTimestamp = GetTickerTime() + 3000;

            return;
        }

        if (message instanceof ObjectAvatarHabbiconUpdateMessage) {
            const time = GetTickerTime();

            this.object.model.setValue(RoomObjectVariableEnum.FigureHabbicon, message.habbiconId);
            this.object.model.setValue(RoomObjectVariableEnum.FigureHabbiconTriggerSequence, time);

            this._habbiconEndTimestamp = time + 6000;

            this.updateHabbiconSpinForHabbicon(message.habbiconId, time, this.object.model);

            return;
        }

        if (message instanceof ObjectAvatarEffectUpdateMessage) {
            this.updateAvatarEffect(message.effect, message.delayMilliseconds, this.object.model);

            return;
        }

        if (message instanceof ObjectAvatarCarryObjectUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureCarryObject, message.itemType);
            this.object.model.setValue(RoomObjectVariableEnum.FigureUseObject, AvatarLogic.CARRY_ITEM_NULL);

            this._carryObjectStartTimestamp = GetTickerTime();

            if (message.itemType < AvatarLogic.CARRY_ITEM_EMPTY_HAND) {
                this._carryObjectEndTimestamp = 0;
                this._allowUseCarryObject = message.itemType <= AvatarLogic.CARRY_ITEM_LAST_CONSUMABLE;
            } else {
                this._carryObjectEndTimestamp = this._carryObjectStartTimestamp + AvatarLogic.CARRY_ITEM_EMPTY_HAND_ANIMATION_LENGTH;
                this._allowUseCarryObject = false;
            }

            return;
        }

        if (message instanceof ObjectAvatarUseObjectUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureUseObject, message.itemType);

            return;
        }

        if (message instanceof ObjectAvatarSignUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureSign, message.signType);

            this._signEndTimestamp = GetTickerTime() + 5000;

            return;
        }

        if (message instanceof ObjectAvatarFlatControlUpdateMessage) {
            const level = Number(message.level);

            // Flash parses the raw string here; anything unparseable or outside 0..5 is no control
            if (!isNaN(level) && level >= 0 && level <= 5) this.object.model.setValue(RoomObjectVariableEnum.FigureFlatControl, level);
            else this.object.model.setValue(RoomObjectVariableEnum.FigureFlatControl, 0);

            return;
        }

        if (message instanceof ObjectAvatarFigureUpdateMessage) {
            const currentFigure = this.object.model.getValue<string>(RoomObjectVariableEnum.Figure);

            let figure = message.figure;

            // the figure's `.bds-` suffix is the avatar's own, not the server's: it survives a change
            if (currentFigure && currentFigure.indexOf('.bds-') !== -1) figure += currentFigure.slice(currentFigure.indexOf('.bds-'));

            this.object.model.setValue(RoomObjectVariableEnum.Figure, figure);
            this.object.model.setValue(RoomObjectVariableEnum.Gender, message.gender);

            return;
        }

        if (message instanceof ObjectAvatarBlockedUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.Blocked, message.isBlocked ? 1 : 0);

            return;
        }

        if (message instanceof ObjectAvatarSelectedMessage) {
            this._selected = message.selected;
            this._reportedLocation = undefined;

            return;
        }

        if (message instanceof ObjectAvatarGuideStatusUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureGuideStatus, message.guideStatus);

            return;
        }

        if (message instanceof ObjectAvatarOwnMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.OwnUser, 1);

            return;
        }
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry | undefined): void {
        // Flash tests `object == null || param1 == null`; the geometry is always the room's here
        if (!event || !this.object || !geometry) return;

        let eventType: string | undefined = undefined;

        switch (event.type) {
            case MouseEventType.MOUSE_CLICK:
                eventType = RoomObjectMouseEvent.CLICK;
                break;
            case MouseEventType.DOUBLE_CLICK:
                eventType = RoomObjectMouseEvent.DOUBLE_CLICK;
                break;
            case MouseEventType.ROLL_OVER:
                eventType = RoomObjectMouseEvent.MOUSE_ENTER;

                this.object.model.setValue(RoomObjectVariableEnum.FigureHighlight, 1);
                this.setVariableFxHolderHovered(true);

                this.handleRoomObjectEvent(
                    new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_BUTTON, this.object), // this is used to change cursor
                );
                break;
            case MouseEventType.ROLL_OUT:
                eventType = RoomObjectMouseEvent.MOUSE_LEAVE;

                this.object.model.setValue(RoomObjectVariableEnum.FigureHighlight, 0);
                this.setVariableFxHolderHovered(false);

                this.handleRoomObjectEvent(
                    new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_ARROW, this.object), // this is used to change cursor
                );
                break;
            case MouseEventType.MOUSE_DOWN:
                // only a rentable bot is dragged around by its avatar; every other avatar ignores it
                if (this.object.type === RoomObjectUserTypeName.RentableBot) {
                    this.handleRoomObjectEvent(
                        new RoomObjectMouseEvent(
                            RoomObjectMouseEvent.MOUSE_DOWN,
                            this.object,
                            event.eventId,
                            event.altKey,
                            event.ctrlKey,
                            event.shiftKey,
                            event.buttonDown,
                        ),
                    );
                }
                break;
        }

        if (!eventType) return;

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

    /** Flash `updateActions`. */
    private updateModel(time: number, model: IRoomObjectModel): void {
        if (this._talkingEndTimestamp > 0) {
            if (time > this._talkingEndTimestamp) {
                model.setValue(RoomObjectVariableEnum.FigureTalk, 0);

                this._talkingEndTimestamp = 0;
                this._talkingPauseStartTimestamp = 0;
                this._talkingPauseEndTimestamp = 0;
            } else if (!this._talkingPauseEndTimestamp && !this._talkingPauseStartTimestamp) {
                this._talkingPauseStartTimestamp = time + this.getTalkingPauseInterval();
                this._talkingPauseEndTimestamp
                    = this._talkingPauseStartTimestamp + this.getTalkingPauseLength();
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
                model.setValue(RoomObjectVariableEnum.FigureCarryObject, AvatarLogic.CARRY_ITEM_NULL);
                model.setValue(RoomObjectVariableEnum.FigureUseObject, AvatarLogic.CARRY_ITEM_NULL);

                this._carryObjectStartTimestamp = 0;
                this._carryObjectEndTimestamp = 0;
                this._allowUseCarryObject = false;
            }
        }

        // a consumable is used for a second in every ten, from five seconds after it was handed over
        if (this._allowUseCarryObject) {
            if (time - this._carryObjectStartTimestamp > AvatarLogic.CARRY_ITEM_DELAY_BEFORE_USE) {
                if ((time - this._carryObjectStartTimestamp) % 10000 < 1000) {
                    model.setValue(RoomObjectVariableEnum.FigureUseObject, 1);
                } else {
                    model.setValue(RoomObjectVariableEnum.FigureUseObject, 0);
                }
            }
        }

        if (time > this._blinkingStartTimestamp) {
            model.setValue(RoomObjectVariableEnum.FigureBlink, 1);

            this._blinkingStartTimestamp = time + this.getBlinkInterval();
            this._blinkingEndTimestamp = time + this.getBlinkLength();
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

        if (this._habbiconEndTimestamp > 0 && time > this._habbiconEndTimestamp) {
            model.setValue(RoomObjectVariableEnum.FigureHabbicon, 0);
            model.setValue(RoomObjectVariableEnum.FigureHabbiconTriggerSequence, 0);

            this.clearHabbiconSpin(model);

            this._habbiconEndTimestamp = 0;
        }

        this.updateHabbiconSpin(time, model);
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

    /** The spinning duck turns for its own duration, whatever else the habbicon does. */
    private updateHabbiconSpinForHabbicon(habbiconId: number, time: number, model: IRoomObjectModel): void {
        if (AvatarLogic.habbiconNameResolver?.(habbiconId) === AvatarLogic.SPINNING_DUCK_HABBICON_NAME) {
            this._habbiconSpinStartTimestamp = time;
            this._habbiconSpinEndTimestamp = time + AvatarLogic.HABBICON_SPIN_DURATION_MS;

            this.setHabbiconSpinOffset(0, model);

            return;
        }

        this.clearHabbiconSpin(model);
    }

    private updateHabbiconSpin(time: number, model: IRoomObjectModel): void {
        if (this._habbiconSpinEndTimestamp <= 0) return;

        if (time >= this._habbiconSpinEndTimestamp) {
            this.clearHabbiconSpin(model);

            return;
        }

        const offset
            = Math.trunc((time - this._habbiconSpinStartTimestamp) / AvatarLogic.HABBICON_SPIN_STEP_MS)
                * AvatarLogic.HABBICON_SPIN_STEP_DEGREES % 360;

        this.setHabbiconSpinOffset(offset, model);
    }

    private setHabbiconSpinOffset(offset: number, model: IRoomObjectModel): void {
        if (this._habbiconSpinOffset === offset) return;

        this._habbiconSpinOffset = offset;

        model.setValue(RoomObjectVariableEnum.FigureHabbiconSpinOffset, offset);
    }

    private clearHabbiconSpin(model: IRoomObjectModel): void {
        this._habbiconSpinStartTimestamp = 0;
        this._habbiconSpinEndTimestamp = 0;

        this.setHabbiconSpinOffset(0, model);
    }

    private getTalkingPauseInterval(): number {
        return 100 + Math.random() * 200;
    }

    private getTalkingPauseLength(): number {
        return 75 + Math.random() * 75;
    }

    private getBlinkInterval(): number {
        return 4500 + Math.random() * 1000;
    }

    private getBlinkLength(): number {
        return 50 + Math.random() * 200;
    }

    protected override getCurveStrength(message: ObjectMoveUpdateMessage): number {
        if (!message || !this.object) return super.getCurveStrength(message);

        if (message instanceof ObjectAvatarUpdateMessage) {
            return message.jumpingPower;
        }

        const jumpingPower = this.object.model.getValue<number>(RoomObjectVariableEnum.FigureJumpingPower);

        if (jumpingPower !== undefined) return jumpingPower;

        return super.getCurveStrength(message);
    }
}
