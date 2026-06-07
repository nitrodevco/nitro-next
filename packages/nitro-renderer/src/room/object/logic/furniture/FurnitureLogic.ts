import type {
    IAssetData,
    IRoomGeometry,
    IRoomObjectController,
    IRoomObjectModel,
    IRoomObjectUpdateMessage,
    IRoomSpriteMouseEvent,
    IVector3D,
} from '@nitrodevco/nitro-api';
import { MouseEventType, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import {
    RoomObjectMouseEvent,
    RoomObjectRoomAdEvent,
    RoomObjectStateChangedEvent,
    RoomObjectWidgetRequestEvent,
} from '@nitrodevco/nitro-shared';

import {
    ObjectDataUpdateMessage,
    ObjectHeightUpdateMessage,
    ObjectItemDataUpdateMessage,
    ObjectMoveUpdateMessage,
    ObjectSelectedMessage,
    RoomObjectUpdateMessage,
} from '../../../messages';
import { MovingObjectLogic } from '../MovingObjectLogic';

export class FurnitureLogic extends MovingObjectLogic {
    private static BOUNCING_STEPS: number = -1;
    private static BOUNCING_Z: number = -1;

    /* if (FurnitureLogic.BOUNCING_STEPS === -1) {
            FurnitureLogic.BOUNCING_STEPS = GetConfigValue<number>('renderer.furniRotationBounce', 8);
        }

        if (FurnitureLogic.BOUNCING_Z === -1) {
            FurnitureLogic.BOUNCING_Z = GetConfigValue<number>('renderer.furniRotationHeight', 0.0625);
        } */

    private _sizeX: number = 0;
    private _sizeY: number = 0;
    private _sizeZ: number = 0;
    private _centerX: number = 0;
    private _centerY: number = 0;
    private _centerZ: number = 0;
    private _directions: number[] = [];
    private _mouseOver: boolean = false;
    private _locationOffset: IVector3D = new Vector3d();
    private _bouncingStep: number = 0;
    private _storedRotateMessage: IRoomObjectUpdateMessage | undefined = undefined;
    private _directionInitialized: boolean = false;

    public override getEventTypes(): string[] {
        const types = [
            RoomObjectStateChangedEvent.STATE_CHANGE,
            RoomObjectMouseEvent.CLICK,
            RoomObjectMouseEvent.MOUSE_DOWN,
            RoomObjectRoomAdEvent.ROOM_AD_TOOLTIP_SHOW,
            RoomObjectRoomAdEvent.ROOM_AD_TOOLTIP_HIDE,
            RoomObjectRoomAdEvent.ROOM_AD_FURNI_DOUBLE_CLICK,
            RoomObjectRoomAdEvent.ROOM_AD_FURNI_CLICK,
        ];

        if (this.widget)
            types.push(RoomObjectWidgetRequestEvent.OPEN_WIDGET, RoomObjectWidgetRequestEvent.CLOSE_WIDGET);

        if (this.contextMenu)
            types.push(
                RoomObjectWidgetRequestEvent.OPEN_FURNI_CONTEXT_MENU,
                RoomObjectWidgetRequestEvent.CLOSE_FURNI_CONTEXT_MENU,
            );

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public override initialize(asset: IAssetData): void {
        if (!asset) return;

        if (asset.logic) {
            if (asset.logic.model) {
                const dimensions = asset.logic.model.dimensions;

                if (dimensions) {
                    this._sizeX = dimensions.x;
                    this._sizeY = dimensions.y;
                    this._sizeZ = dimensions.z ?? 0;

                    this._centerX = this._sizeX / 2;
                    this._centerY = this._sizeY / 2;
                    this._centerZ = this._sizeZ / 2;
                }

                const directions = asset.logic.model.directions;

                if (directions && directions.length) {
                    for (const direction of directions) this._directions.push(direction);

                    this._directions.sort((a, b) => a - b);
                }
            }

            if (asset.logic.customVars) {
                const variables = asset.logic.customVars.variables;

                if (variables && variables.length) {
                    this.object.model.setValue(RoomObjectVariableEnum.FurnitureCustomVariables, variables);
                }
            }
        }

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureSizeX, this._sizeX);
        this.object.model.setValue(RoomObjectVariableEnum.FurnitureSizeY, this._sizeY);
        this.object.model.setValue(RoomObjectVariableEnum.FurnitureSizeZ, this._sizeZ);
        this.object.model.setValue(RoomObjectVariableEnum.FurnitureCenterX, this._centerX);
        this.object.model.setValue(RoomObjectVariableEnum.FurnitureCenterY, this._centerY);
        this.object.model.setValue(RoomObjectVariableEnum.FurnitureCenterZ, this._centerZ);
        this.object.model.setValue(RoomObjectVariableEnum.FurnitureAllowedDirections, this._directions);
        this.object.model.setValue(RoomObjectVariableEnum.FurnitureAlphaMultiplier, 1);
    }

    public override dispose(): void {
        this._storedRotateMessage = undefined;
        this._directions = [];

        super.dispose();
    }

    public override tearDown(): void {
        if (this.widget && this.isRealRoomObject())
            this.handleRoomObjectEvent(
                new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.CLOSE_WIDGET, this.object),
            );

        super.tearDown();
    }

    public override update(time: number): void {
        super.update(time);

        if (this._bouncingStep > 0) {
            this._bouncingStep++;

            if (this._bouncingStep > FurnitureLogic.BOUNCING_STEPS) this._bouncingStep = 0;
        }
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (!message) return;

        if (message instanceof ObjectDataUpdateMessage) {
            this.object.setState(message.state, 0);

            if (message.data) message.data.writeRoomObjectModel(this.object.model);

            this.object.model.setValue(RoomObjectVariableEnum.FurnitureExtras, message.extra);
            this.object.model.setValue(RoomObjectVariableEnum.FurnitureStateUpdateTime, this.lastUpdateTime);

            return;
        }

        if (message instanceof ObjectHeightUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FurnitureSizeZ, message.height);

            return;
        }

        if (message instanceof ObjectItemDataUpdateMessage) {
            this.object.model.setValue(RoomObjectVariableEnum.FurnitureItemdata, message.data);

            return;
        }

        this._mouseOver = false;

        if (message.location && message.direction) {
            if (!(message instanceof ObjectMoveUpdateMessage)) {
                const direction = this.object.getDirection();
                const location = this.object.getLocation();

                if (
                    direction.x !== message.direction.x &&
                    this._directionInitialized &&
                    location.x === message.location.x &&
                    location.y === message.location.y &&
                    location.z === message.location.z
                ) {
                    this._bouncingStep = 1;
                    this._storedRotateMessage = new RoomObjectUpdateMessage(message.location, message.direction);

                    message = null!;
                }
            } else {
                this.object.setDirection(message.direction);
            }

            this._directionInitialized = true;
        }

        if (message instanceof ObjectSelectedMessage) {
            if (this.contextMenu) {
                const eventType = message.selected
                    ? RoomObjectWidgetRequestEvent.OPEN_FURNI_CONTEXT_MENU
                    : RoomObjectWidgetRequestEvent.CLOSE_FURNI_CONTEXT_MENU;

                this.handleRoomObjectEvent(new RoomObjectWidgetRequestEvent(eventType, this.object));
            }
        }

        super.processUpdateMessage(message);
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry | undefined): void {
        if (!event || !geometry) return;

        const adUrl = this.getAdClickUrl(this.object.model);

        switch (event.type) {
            case MouseEventType.MOUSE_MOVE: {
                const mouseEvent = new RoomObjectMouseEvent(
                    RoomObjectMouseEvent.MOUSE_MOVE,
                    this.object,
                    event.eventId,
                    event.altKey,
                    event.ctrlKey,
                    event.shiftKey,
                    event.buttonDown,
                );

                mouseEvent.localX = event.localX;
                mouseEvent.localY = event.localY;
                mouseEvent.spriteOffsetX = event.spriteOffsetX;
                mouseEvent.spriteOffsetY = event.spriteOffsetY;

                this.handleRoomObjectEvent(mouseEvent);

                return;
            }
            case MouseEventType.ROLL_OVER: {
                if (!this._mouseOver) {
                    if (adUrl && adUrl.indexOf('http') === 0)
                        this.handleRoomObjectEvent(
                            new RoomObjectRoomAdEvent(RoomObjectRoomAdEvent.ROOM_AD_TOOLTIP_SHOW, this.object),
                        );

                    const mouseEvent = new RoomObjectMouseEvent(
                        RoomObjectMouseEvent.MOUSE_ENTER,
                        this.object,
                        event.eventId,
                        event.altKey,
                        event.ctrlKey,
                        event.shiftKey,
                        event.buttonDown,
                    );

                    mouseEvent.localX = event.localX;
                    mouseEvent.localY = event.localY;
                    mouseEvent.spriteOffsetX = event.spriteOffsetX;
                    mouseEvent.spriteOffsetY = event.spriteOffsetY;

                    this.handleRoomObjectEvent(mouseEvent);

                    this._mouseOver = true;
                }

                return;
            }
            case MouseEventType.ROLL_OUT: {
                if (this._mouseOver) {
                    if (adUrl && adUrl.indexOf('http') === 0)
                        this.handleRoomObjectEvent(
                            new RoomObjectRoomAdEvent(RoomObjectRoomAdEvent.ROOM_AD_TOOLTIP_HIDE, this.object),
                        );

                    const mouseEvent = new RoomObjectMouseEvent(
                        RoomObjectMouseEvent.MOUSE_LEAVE,
                        this.object,
                        event.eventId,
                        event.altKey,
                        event.ctrlKey,
                        event.shiftKey,
                        event.buttonDown,
                    );

                    mouseEvent.localX = event.localX;
                    mouseEvent.localY = event.localY;
                    mouseEvent.spriteOffsetX = event.spriteOffsetX;
                    mouseEvent.spriteOffsetY = event.spriteOffsetY;

                    this.handleRoomObjectEvent(mouseEvent);

                    this._mouseOver = false;
                }

                return;
            }
            case MouseEventType.DOUBLE_CLICK:
                this.useObject();
                return;
            case MouseEventType.MOUSE_CLICK: {
                const mouseEvent = new RoomObjectMouseEvent(
                    RoomObjectMouseEvent.CLICK,
                    this.object,
                    event.eventId,
                    event.altKey,
                    event.ctrlKey,
                    event.shiftKey,
                    event.buttonDown,
                );

                mouseEvent.localX = event.localX;
                mouseEvent.localY = event.localY;
                mouseEvent.spriteOffsetX = event.spriteOffsetX;
                mouseEvent.spriteOffsetY = event.spriteOffsetY;

                this.handleRoomObjectEvent(mouseEvent);

                if (adUrl && adUrl.indexOf('http') === 0)
                    this.handleRoomObjectEvent(
                        new RoomObjectRoomAdEvent(RoomObjectRoomAdEvent.ROOM_AD_TOOLTIP_HIDE, this.object),
                    );

                if (adUrl && adUrl.length) this.handleAdClick(this.object.id, this.object.type, adUrl);

                return;
            }
            case MouseEventType.MOUSE_DOWN: {
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

                return;
            }
        }
    }

    public override useObject(): void {
        const clickUrl = this.getAdClickUrl(this.object.model);

        if (clickUrl && clickUrl.length)
            this.handleRoomObjectEvent(
                new RoomObjectRoomAdEvent(RoomObjectRoomAdEvent.ROOM_AD_FURNI_DOUBLE_CLICK, this.object, '', clickUrl),
            );

        if (this.widget)
            this.handleRoomObjectEvent(
                new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.OPEN_WIDGET, this.object),
            );

        this.handleRoomObjectEvent(
            new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object),
        );
    }

    public override setObject(object: IRoomObjectController): void {
        super.setObject(object);

        if (object && object.getLocation().length) this._directionInitialized = true;
    }

    protected getAdClickUrl(model: IRoomObjectModel): string {
        return model.getValue<string>(RoomObjectVariableEnum.FurnitureAdUrl);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected handleAdClick(objectId: number, objectType: string, clickUrl: string): void {
        this.handleRoomObjectEvent(new RoomObjectRoomAdEvent(RoomObjectRoomAdEvent.ROOM_AD_FURNI_CLICK, this.object));
    }

    protected isRealRoomObject(): boolean {
        return this.object.model.getValue<number>(RoomObjectVariableEnum.FurnitureRealRoomObject) === 1;
    }

    protected override getLocationOffset(): IVector3D | undefined {
        if (this._bouncingStep > 0) {
            this._locationOffset.x = 0;
            this._locationOffset.y = 0;

            if (this._bouncingStep <= FurnitureLogic.BOUNCING_STEPS / 2) {
                this._locationOffset.z = FurnitureLogic.BOUNCING_Z * this._bouncingStep;
            } else if (this._bouncingStep <= FurnitureLogic.BOUNCING_STEPS) {
                if (this._storedRotateMessage) {
                    super.processUpdateMessage(this._storedRotateMessage);

                    this._storedRotateMessage = undefined;
                }

                this._locationOffset.z =
                    FurnitureLogic.BOUNCING_Z * (FurnitureLogic.BOUNCING_STEPS - this._bouncingStep);
            }

            return this._locationOffset;
        }

        return undefined;
    }
}
