import {
    IRoomGeometry,
    IRoomMapData,
    IRoomObjectUpdateMessage,
    IRoomSpriteMouseEvent,
    MouseEventType, RoomObjectMouseEvent, RoomObjectTileMouseEvent, RoomObjectVariableEnum, RoomObjectWallMouseEvent, Vector3d } from '@nitrodevco/nitro-api';
import { Point } from 'pixi.js';

import { GetTickerTime } from '../../../utils';
import {
    ObjectRoomColorUpdateMessage,
    ObjectRoomFloorHoleUpdateMessage,
    ObjectRoomMapUpdateMessage,
    ObjectRoomMaskUpdateMessage,
    ObjectRoomPlanePropertyUpdateMessage,
    ObjectRoomPlaneVisibilityUpdateMessage,
    ObjectRoomUpdateMessage,
} from '../../messages';
import { ColorTransitioner } from '../../utils/ColorTransitioner';
import { RoomMapData } from '../RoomMapData';
import { RoomPlaneBitmapMaskData } from '../RoomPlaneBitmapMaskData';
import { RoomPlaneBitmapMaskParser } from '../RoomPlaneBitmapMaskParser';
import { RoomPlaneData } from '../RoomPlaneData';
import { RoomPlaneParser } from '../RoomPlaneParser';
import { ObjectLogicBase } from './ObjectLogicBase';

/** Port of Flash `RoomLogic`, the logic `RoomObjectFactory` builds for `room`. */
export class RoomLogic extends ObjectLogicBase {
    private _planeParser: RoomPlaneParser = new RoomPlaneParser();
    private _planeBitmapMaskParser: RoomPlaneBitmapMaskParser = new RoomPlaneBitmapMaskParser();
    private _colorTransitioner: ColorTransitioner = new ColorTransitioner();
    private _lastHoleUpdate = 0;
    private _needsMapUpdate = false;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectMouseEvent.MOUSE_MOVE, RoomObjectMouseEvent.CLICK ]);
    }

    public override dispose(): void {
        super.dispose();

        if (this._planeParser) {
            this._planeParser.dispose();

            this._planeParser = null!;
        }

        if (this._planeBitmapMaskParser) {
            this._planeBitmapMaskParser.dispose();

            this._planeBitmapMaskParser = null!;
        }
    }

    public override initialize(roomMap: IRoomMapData): void {
        if (!(roomMap instanceof RoomMapData) || !this._planeParser.initializeFromMapData(roomMap)) return;

        this.object.model.setValue(RoomObjectVariableEnum.RoomMapData, roomMap);
        this.object.model.setValue(RoomObjectVariableEnum.RoomBackgroundColor, 0xffffff);
        this.object.model.setValue(RoomObjectVariableEnum.RoomFloorVisibility, 1);
        this.object.model.setValue(RoomObjectVariableEnum.RoomWallVisibility, 1);
        this.object.model.setValue(RoomObjectVariableEnum.RoomLandscapeVisibility, 1);
    }

    public override update(time: number): void {
        super.update(time);

        this.updateBackgroundColor(time);

        if (this._needsMapUpdate) {
            if (this._lastHoleUpdate && time - this._lastHoleUpdate < 5) return;

            const mapData = this._planeParser.getMapData();

            this.object.model.setValue(RoomObjectVariableEnum.RoomMapData, mapData);
            this.object.model.setValue(RoomObjectVariableEnum.RoomFloorHoleUpdateTime, time);

            this._planeParser.initializeFromMapData(mapData);

            this._lastHoleUpdate = 0;
            this._needsMapUpdate = false;
        }
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (!message) return;

        if (message instanceof ObjectRoomUpdateMessage) {
            switch (message.type) {
                case ObjectRoomUpdateMessage.ROOM_FLOOR_UPDATE:
                    this.object.model.setValue(RoomObjectVariableEnum.RoomFloorType, message.value);
                    return;
                case ObjectRoomUpdateMessage.ROOM_WALL_UPDATE:
                    this.object.model.setValue(RoomObjectVariableEnum.RoomWallType, message.value);
                    return;
                case ObjectRoomUpdateMessage.ROOM_LANDSCAPE_UPDATE:
                    this.object.model.setValue(RoomObjectVariableEnum.RoomLandscapeType, message.value);
                    return;
            }

            return;
        }

        if (message instanceof ObjectRoomMaskUpdateMessage) {
            let update = false;

            switch (message.type) {
                case ObjectRoomMaskUpdateMessage.ADD_MASK: {
                    let maskCategory = RoomPlaneBitmapMaskData.WINDOW;

                    if (message.maskCategory === ObjectRoomMaskUpdateMessage.HOLE)
                        maskCategory = RoomPlaneBitmapMaskData.HOLE;

                    if (message.maskId && message.maskType && message.maskLocation) this._planeBitmapMaskParser.addMask(
                        message.maskId,
                        message.maskType,
                        message.maskLocation,
                        maskCategory,
                    );

                    update = true;
                    break;
                }
                case ObjectRoomMaskUpdateMessage.REMOVE_MASK:
                    update = this._planeBitmapMaskParser.removeMask(message.maskId);
                    break;
            }

            if (update) this.object.model.setValue(
                RoomObjectVariableEnum.RoomPlaneMaskData,
                this._planeBitmapMaskParser.getMaskData(),
            );

            return;
        }

        if (message instanceof ObjectRoomPlaneVisibilityUpdateMessage) {
            switch (message.type) {
                case ObjectRoomPlaneVisibilityUpdateMessage.FLOOR_VISIBILITY:
                    this.object.model.setValue(RoomObjectVariableEnum.RoomFloorVisibility, message.visible ? 1 : 0);
                    return;
                case ObjectRoomPlaneVisibilityUpdateMessage.WALL_VISIBILITY:
                    this.object.model.setValue(RoomObjectVariableEnum.RoomWallVisibility, message.visible ? 1 : 0);
                    this.object.model.setValue(RoomObjectVariableEnum.RoomLandscapeVisibility, message.visible ? 1 : 0);
                    return;
            }

            return;
        }

        if (message instanceof ObjectRoomPlanePropertyUpdateMessage) {
            switch (message.type) {
                case ObjectRoomPlanePropertyUpdateMessage.FLOOR_THICKNESS:
                    this.object.model.setValue(RoomObjectVariableEnum.RoomFloorThickness, message.value);
                    return;
                case ObjectRoomPlanePropertyUpdateMessage.WALL_THICKNESS:
                    this.object.model.setValue(RoomObjectVariableEnum.RoomWallThickness, message.value);
                    return;
            }

            return;
        }

        if (message instanceof ObjectRoomFloorHoleUpdateMessage) {
            switch (message.type) {
                case ObjectRoomFloorHoleUpdateMessage.ADD:
                    this._planeParser.addFloorHole(message.id, message.x, message.y, message.width, message.height, message.invert);
                    break;
                case ObjectRoomFloorHoleUpdateMessage.REMOVE:
                    this._planeParser.removeFloorHole(message.id);
                    break;
                default:
                    return;
            }

            this._needsMapUpdate = true;
            /*
             * Entering a room replays every area hide it has at once, and each of them would
             * otherwise re-parse the whole floor. The timestamp holds the rebuild off for a
             * frame so the room is parsed once however many holes arrived together.
             */
            this._lastHoleUpdate = this.time;

            return;
        }

        /*
         * `updateColors`: only a background colour lands on the planes. A colour for the whole
         * room fades them back to white - `RoomDesktop`'s colorizer tints the whole view with it
         * instead (`REE_ROOM_COLOR`). The fade starts at the clock's time (`getTimer()`), not the last
         * update's: a dimmer lit before the room's first update would otherwise start a fade at 0,
         * which is "no fade", and the planes stayed white.
         */
        if (message instanceof ObjectRoomColorUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.RoomColorizeBgOnly, message.backgroundOnly);

            if (message.backgroundOnly) this._colorTransitioner.startTransition(message.color, message.light, GetTickerTime());
            else this._colorTransitioner.startTransition(0xFFFFFF, 0xFF, GetTickerTime());

            return;
        }

        if (message instanceof ObjectRoomMapUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.RoomMapData, message.mapData);
            this.object.model.setValue(RoomObjectVariableEnum.RoomFloorHoleUpdateTime, this.time);

            this._planeParser.initializeFromMapData(message.mapData);

            return;
        }
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry | undefined): void {
        if (!event || !geometry) return;

        const tag = event.spriteTag;

        let planeId = 0;

        if (tag && tag.indexOf('@') >= 0) planeId = parseInt(tag.substr(tag.indexOf('@') + 1));

        if (planeId < 1 || planeId > this._planeParser.planeCount) {
            if (event.type === MouseEventType.ROLL_OUT) {
                this.object.model.setValue(RoomObjectVariableEnum.RoomSelectedPlane, 0);
            }

            return;
        }

        planeId--;

        const planeLocation = this._planeParser.getPlaneLocation(planeId);
        const planeLeftSide = this._planeParser.getPlaneLeftSide(planeId);
        const planeRightSide = this._planeParser.getPlaneRightSide(planeId);
        const planeNormalDirection = this._planeParser.getPlaneNormalDirection(planeId);
        const planeType = this._planeParser.getPlaneType(planeId);

        if (!planeLocation || !planeLeftSide || !planeRightSide || !planeNormalDirection) return;

        const leftSideLength = planeLeftSide.length;
        const rightSideLength = planeRightSide.length;

        if (!leftSideLength || !rightSideLength) return;

        const screenX = event.screenX;
        const screenY = event.screenY;
        const screenPoint = new Point(screenX, screenY);

        const planePosition = geometry.getPlanePosition(screenPoint, planeLocation, planeLeftSide, planeRightSide);

        if (!planePosition) {
            this.object.model.setValue(RoomObjectVariableEnum.RoomSelectedPlane, 0);

            return;
        }

        const _local_18 = Vector3d.product(planeLeftSide, planePosition.x / leftSideLength);

        _local_18.add(Vector3d.product(planeRightSide, planePosition.y / rightSideLength));
        _local_18.add(planeLocation);

        const tileX = _local_18.x;
        const tileY = _local_18.y;
        const tileZ = _local_18.z;

        if (
            planePosition.x >= 0
            && planePosition.x < leftSideLength
            && planePosition.y >= 0
            && planePosition.y < rightSideLength
        ) {
            this.object.model.setValue(RoomObjectVariableEnum.RoomSelectedX, tileX);
            this.object.model.setValue(RoomObjectVariableEnum.RoomSelectedY, tileY);
            this.object.model.setValue(RoomObjectVariableEnum.RoomSelectedZ, tileZ);
            this.object.model.setValue(RoomObjectVariableEnum.RoomSelectedPlane, planeId + 1);
        } else {
            this.object.model.setValue(RoomObjectVariableEnum.RoomSelectedPlane, 0);

            return;
        }

        let eventType: string = event.type;

        if (eventType === MouseEventType.MOUSE_MOVE || eventType === MouseEventType.ROLL_OVER)
            eventType = RoomObjectMouseEvent.MOUSE_MOVE;
        else if (eventType === MouseEventType.MOUSE_CLICK) eventType = RoomObjectMouseEvent.CLICK;
        else if (eventType === MouseEventType.MOUSE_DOWN) eventType = RoomObjectMouseEvent.MOUSE_DOWN;

        switch (event.type) {
            case MouseEventType.MOUSE_MOVE:
            case MouseEventType.ROLL_OVER:
            case MouseEventType.MOUSE_DOWN:
            case MouseEventType.MOUSE_CLICK: {
                if (planeType === RoomPlaneData.PLANE_FLOOR) {
                    this.handleRoomObjectEvent(
                        new RoomObjectTileMouseEvent(
                            eventType,
                            this.object,
                            event.eventId,
                            tileX,
                            tileY,
                            tileZ,
                            event.altKey,
                            event.ctrlKey,
                            event.shiftKey,
                            event.buttonDown,
                        ),
                    );

                    return;
                }

                if (planeType === RoomPlaneData.PLANE_WALL || planeType === RoomPlaneData.PLANE_LANDSCAPE) {
                    let direction = 90;

                    if (planeNormalDirection) {
                        direction = planeNormalDirection.x + 90;

                        if (direction > 360) direction -= 360;
                    }

                    this.handleRoomObjectEvent(
                        new RoomObjectWallMouseEvent(
                            eventType,
                            this.object,
                            event.eventId,
                            planeLocation,
                            planeLeftSide,
                            planeRightSide,
                            (planeLeftSide.length * planePosition.x) / leftSideLength,
                            (planeRightSide.length * planePosition.y) / rightSideLength,
                            direction,
                            event.altKey,
                            event.ctrlKey,
                            event.shiftKey,
                            event.buttonDown,
                        ),
                    );

                    return;
                }

                return;
            }
        }
    }

    /** `updateBackgroundColor`: the faded colour, while a fade runs. */
    private updateBackgroundColor(time: number): void {
        if (!this._colorTransitioner.updateColor(time)) return;

        this.object.model.setValue(RoomObjectVariableEnum.RoomBackgroundColor, this._colorTransitioner.color);
    }
}
