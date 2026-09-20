import { RoomEngineTriggerWidgetEvent } from './RoomEngineTriggerWidgetEvent';

/**
 * An area hide furni switched on or off. Mirrors
 * `com.sulake.habbo.room.events.RoomEngineAreaHideStateWidgetEvent` (paired in `scripts/drift/known.py`).
 */
export class RoomEngineAreaHideStateEvent extends RoomEngineTriggerWidgetEvent {
    public static UPDATE_STATE_AREA_HIDE: string = 'RETWE_UPDATE_STATE_AREA_HIDE' as const;

    private _isOn: boolean;

    constructor(roomId: number, furniId: number, category: number, on: boolean) {
        super(RoomEngineAreaHideStateEvent.UPDATE_STATE_AREA_HIDE, roomId, furniId, category);

        this._isOn = on;
    }

    public get isOn(): boolean {
        return this._isOn;
    }
}
