import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';

import { RoomWidgetUpdateEvent } from './RoomWidgetUpdateEvent';

/**
 * A room object selected, deselected, added, removed or rolled over, told to the widgets. Mirrors
 * `com.sulake.habbo.ui.widget.events.RoomWidgetRoomObjectUpdateEvent` (paired in
 * `scripts/drift/known.py`); `OBJECT_DOUBLE_CLICKED` is Nitro's own.
 */
export class RoomWidgetUpdateRoomObjectEvent extends RoomWidgetUpdateEvent {
    public static OBJECT_SELECTED: string = 'RWROUE_OBJECT_SELECTED' as const;
    public static OBJECT_DESELECTED: string = 'RWROUE_OBJECT_DESELECTED' as const;
    public static USER_REMOVED: string = 'RWROUE_USER_REMOVED' as const;
    public static FURNI_REMOVED: string = 'RWROUE_FURNI_REMOVED' as const;
    public static FURNI_ADDED: string = 'RWROUE_FURNI_ADDED' as const;
    public static USER_ADDED: string = 'RWROUE_USER_ADDED' as const;
    public static OBJECT_ROLL_OVER: string = 'RWROUE_OBJECT_ROLL_OVER' as const;
    public static OBJECT_ROLL_OUT: string = 'RWROUE_OBJECT_ROLL_OUT' as const;
    public static OBJECT_DOUBLE_CLICKED: string = 'RWROUE_OBJECT_DOUBLE_CLICKED' as const;

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
