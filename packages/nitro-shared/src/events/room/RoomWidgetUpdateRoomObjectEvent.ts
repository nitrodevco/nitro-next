import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import { RoomWidgetUpdateEvent } from './RoomWidgetUpdateEvent';

export class RoomWidgetUpdateRoomObjectEvent extends RoomWidgetUpdateEvent {
    public static OBJECT_SELECTED: string = 'RWUROE_OBJECT_SELECTED' as const;
    public static OBJECT_DESELECTED: string = 'RWUROE_OBJECT_DESELECTED' as const;
    public static USER_REMOVED: string = 'RWUROE_USER_REMOVED' as const;
    public static FURNI_REMOVED: string = 'RWUROE_FURNI_REMOVED' as const;
    public static FURNI_ADDED: string = 'RWUROE_FURNI_ADDED' as const;
    public static USER_ADDED: string = 'RWUROE_USER_ADDED' as const;
    public static OBJECT_ROLL_OVER: string = 'RWUROE_OBJECT_ROLL_OVER' as const;
    public static OBJECT_ROLL_OUT: string = 'RWUROE_OBJECT_ROLL_OUT' as const;
    public static OBJECT_REQUEST_MANIPULATION: string = 'RWUROE_OBJECT_REQUEST_MANIPULATION' as const;
    public static OBJECT_DOUBLE_CLICKED: string = 'RWUROE_OBJECT_DOUBLE_CLICKED' as const;

    private _objectId: number;
    private _category: number;
    private _roomId: number;

    constructor(type: string, objectId: number, category: RoomObjectCategoryEnum, roomId: number) {
        super(type);

        this._objectId = objectId;
        this._category = category;
        this._roomId = roomId;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get category(): RoomObjectCategoryEnum {
        return this._category;
    }

    public get roomId(): number {
        return this._roomId;
    }
}
