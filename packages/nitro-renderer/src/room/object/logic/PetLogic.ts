import type {
    IAssetData,
    IRoomGeometry,
    IRoomObjectModel,
    IRoomObjectUpdateMessage,
    IRoomSpriteMouseEvent,
    IVector3D,
} from '@nitrodevco/nitro-api';
import { MouseEventType, PetType, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { RoomObjectMouseEvent, RoomObjectMoveEvent } from '@nitrodevco/nitro-events';

import { PetFigureData } from '../../../session';
import {
    ObjectAvatarChatUpdateMessage,
    ObjectAvatarDirectionUpdateMessage,
    ObjectAvatarExperienceUpdateMessage,
    ObjectAvatarFigureUpdateMessage,
    ObjectAvatarPetGestureUpdateMessage,
    ObjectAvatarPostureUpdateMessage,
    ObjectAvatarSelectedMessage,
    ObjectAvatarSleepUpdateMessage,
    ObjectAvatarUpdateMessage,
} from '../../messages';
import { MovingObjectLogic } from './MovingObjectLogic';

export class PetLogic extends MovingObjectLogic {
    private _selected: boolean = false;
    private _reportedLocation: IVector3D = new Vector3d();
    private _postureIndex: number = 0;
    private _gestureIndex: number = 0;
    private _headDirectionDelta: number = 0;
    private _directions: number[] = [];
    private _talkingEndTimestamp: number = 0;
    private _gestureEndTimestamp: number = 0;
    private _expressionEndTimestamp: number = 0;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectMouseEvent.CLICK,
            RoomObjectMoveEvent.POSITION_CHANGED,
        ]);
    }

    public override initialize(asset: IAssetData): void {
        if (!asset) return;

        if (asset.logic) {
            if (asset.logic.model) {
                const directions = asset.logic.model.directions;

                if (directions && directions.length) {
                    for (const direction of directions) this._directions.push(direction);

                    this._directions.sort();
                }
            }
        }

        this.object.model.setValue(RoomObjectVariableEnum.PetAllowedDirections, this._directions);
    }

    public override dispose(): void {
        if (this._selected)
            this.dispatchEvent(new RoomObjectMoveEvent(RoomObjectMoveEvent.OBJECT_REMOVED, this.object));

        this._directions = null!;
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

                this.dispatchEvent(new RoomObjectMoveEvent(RoomObjectMoveEvent.POSITION_CHANGED, this.object));
            }
        }

        this.updateModel(time, this.object.model);
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (!message) return;

        super.processUpdateMessage(message);

        if (message instanceof ObjectAvatarUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.HeadDirection, message.headDirection);

            return;
        }

        if (message instanceof ObjectAvatarDirectionUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.HeadDirection, message.headDirction);

            return;
        }

        if (message instanceof ObjectAvatarFigureUpdateMessage) {
            const petFigureData = new PetFigureData(message.figure);

            this.object.model.setValue(RoomObjectVariableEnum.Figure, message.figure);
            this.object.model.setValue(RoomObjectVariableEnum.Race, message.subType);
            this.object.model.setValue(RoomObjectVariableEnum.PetPaletteIndex, petFigureData.paletteId);
            this.object.model.setValue(RoomObjectVariableEnum.PetColor, petFigureData.color);
            this.object.model.setValue(RoomObjectVariableEnum.PetType, petFigureData.typeId);
            this.object.model.setValue(RoomObjectVariableEnum.PetCustomLayerIds, petFigureData.customLayerIds);
            this.object.model.setValue(RoomObjectVariableEnum.PetCustomPartsIds, petFigureData.customPartIds);
            this.object.model.setValue(RoomObjectVariableEnum.PetCustomPaletteIds, petFigureData.customPaletteIds);
            this.object.model.setValue(RoomObjectVariableEnum.PetIsRiding, message.isRiding ? 1 : 0);

            return;
        }

        if (message instanceof ObjectAvatarPostureUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigurePosture, message.postureType);

            return;
        }

        if (message instanceof ObjectAvatarChatUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureTalk, 1);

            this._talkingEndTimestamp = this.time + message.numberOfWords * 1000;

            return;
        }

        if (message instanceof ObjectAvatarSleepUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureSleep, message.isSleeping ? 1 : 0);

            return;
        }

        if (message instanceof ObjectAvatarPetGestureUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureGesture, message.gesture);

            this._gestureEndTimestamp = this.time + 3000;

            return;
        }

        if (message instanceof ObjectAvatarSelectedMessage) {
            this._selected = message.selected;
            this._reportedLocation = new Vector3d();

            return;
        }

        if (message instanceof ObjectAvatarExperienceUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FigureExperienceTimestamp, this.time);
            this.object.model.setValue(RoomObjectVariableEnum.FigureGainedExperience, message.gainedExperience);

            return;
        }
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry): void {
        if (!event || !geometry) return;

        let eventType = event.type;

        switch (eventType) {
            case MouseEventType.MOUSE_CLICK:
                eventType = RoomObjectMouseEvent.CLICK;
                break;
            case MouseEventType.DOUBLE_CLICK:
                break;
            case MouseEventType.MOUSE_DOWN: {
                const petType = this.object.model.getValue<number>(RoomObjectVariableEnum.PetType);

                if (petType === PetType.MONSTERPLANT)
                    this.dispatchEvent(
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

                break;
            }
        }

        this.dispatchEvent(
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
        if (this._gestureEndTimestamp > 0 && time > this._gestureEndTimestamp) {
            model.setValue(RoomObjectVariableEnum.FigureGesture, null);

            this._gestureEndTimestamp = 0;
        }

        if (this._talkingEndTimestamp > 0) {
            if (time > this._talkingEndTimestamp) {
                model.setValue(RoomObjectVariableEnum.FigureTalk, 0);

                this._talkingEndTimestamp = 0;
            }
        }

        if (this._expressionEndTimestamp > 0 && time > this._expressionEndTimestamp) {
            model.setValue(RoomObjectVariableEnum.FigureExpression, 0);

            this._expressionEndTimestamp = 0;
        }
    }
}
