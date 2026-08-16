import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import { RoomEngineEvent } from './RoomEngineEvent';

export class RoomEngineObjectEvent extends RoomEngineEvent {
    public static SELECTED: string = 'REOE_SELECTED' as const;
    public static DESELECTED: string = 'REOE_DESELECTED' as const;
    public static ADDED: string = 'REOE_ADDED' as const;
    public static REMOVED: string = 'REOE_REMOVED' as const;
    public static PLACED: string = 'REOE_PLACED' as const;
    public static PLACED_ON_USER: string = 'REOE_PLACED_ON_USER' as const;
    public static CONTENT_UPDATED: string = 'REOE_CONTENT_UPDATED' as const;
    public static REQUEST_MOVE: string = 'REOE_REQUEST_MOVE' as const;
    public static REQUEST_ROTATE: string = 'REOE_REQUEST_ROTATE' as const;
    public static REQUEST_MANIPULATION: string = 'REOE_REQUEST_MANIPULATION' as const;
    public static MOUSE_ENTER: string = 'REOE_MOUSE_ENTER' as const;
    public static MOUSE_LEAVE: string = 'REOE_MOUSE_LEAVE' as const;
    public static DOUBLE_CLICK: string = 'REOE_DOUBLE_CLICK' as const;

    private _objectId: number;
    private _category: RoomObjectCategoryEnum;

    constructor(type: string, roomId: number, objectId: number, category: RoomObjectCategoryEnum) {
        super(type, roomId);

        this._objectId = objectId;
        this._category = category;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get category(): RoomObjectCategoryEnum {
        return this._category;
    }
}
