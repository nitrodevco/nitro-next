import { RoomEngineObjectEvent } from './RoomEngineObjectEvent';

export class RoomEngineTriggerWidgetEvent extends RoomEngineObjectEvent {
    public static OPEN_WIDGET: string = 'RETWE_OPEN_WIDGET' as const;
    public static CLOSE_WIDGET: string = 'RETWE_CLOSE_WIDGET' as const;
    public static OPEN_FURNI_CONTEXT_MENU: string = 'RETWE_OPEN_FURNI_CONTEXT_MENU' as const;
    public static CLOSE_FURNI_CONTEXT_MENU: string = 'RETWE_CLOSE_FURNI_CONTEXT_MENU' as const;
    public static REQUEST_PLACEHOLDER: string = 'RETWE_REQUEST_PLACEHOLDER' as const;
    public static REQUEST_CREDITFURNI: string = 'RETWE_REQUEST_CREDITFURNI' as const;
    public static REQUEST_STACK_HEIGHT: string = 'RETWE_REQUEST_STACK_HEIGHT' as const;
    public static REQUEST_EXTERNAL_IMAGE: string = 'RETWE_REQUEST_EXTERNAL_IMAGE' as const;
    public static REQUEST_STICKIE: string = 'RETWE_REQUEST_STICKIE' as const;
    public static REQUEST_PRESENT: string = 'RETWE_REQUEST_PRESENT' as const;
    public static REQUEST_TROPHY: string = 'RETWE_REQUEST_TROPHY' as const;
    public static REQUEST_TEASER: string = 'RETWE_REQUEST_TEASER' as const;
    public static REQUEST_ECOTRONBOX: string = 'RETWE_REQUEST_ECOTRONBOX' as const;
    public static REQUEST_DIMMER: string = 'RETWE_REQUEST_DIMMER' as const;
    public static REMOVE_DIMMER: string = 'RETWE_REMOVE_DIMMER' as const;
    public static REQUEST_CLOTHING_CHANGE: string = 'RETWE_REQUEST_CLOTHING_CHANGE' as const;
    public static REQUEST_PLAYLIST_EDITOR: string = 'RETWE_REQUEST_PLAYLIST_EDITOR' as const;
    public static REQUEST_MANNEQUIN: string = 'RETWE_REQUEST_MANNEQUIN' as const;
    public static REQUEST_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG: string =
        'ROWRE_REQUEST_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG' as const;
    public static REQUEST_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG: string =
        'ROWRE_REQUEST_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG' as const;
    public static REQUEST_BACKGROUND_COLOR: string = 'RETWE_REQUEST_BACKGROUND_COLOR' as const;
    public static REQUEST_AREA_HIDE: string = 'RETWE_REQUEST_AREA_HIDE' as const;
    public static REQUEST_MYSTERYBOX_OPEN_DIALOG: string = 'RETWE_REQUEST_MYSTERYBOX_OPEN_DIALOG' as const;
    public static REQUEST_EFFECTBOX_OPEN_DIALOG: string = 'RETWE_REQUEST_EFFECTBOX_OPEN_DIALOG' as const;
    public static REQUEST_MYSTERYTROPHY_OPEN_DIALOG: string = 'RETWE_REQUEST_MYSTERYTROPHY_OPEN_DIALOG' as const;
    public static REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING: string = 'RETWE_REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING' as const;
    public static REQUEST_ACHIEVEMENT_RESOLUTION_FAILED: string = 'RETWE_REQUEST_ACHIEVEMENT_RESOLUTION_FAILED' as const;
    public static REQUEST_FRIEND_FURNITURE_CONFIRM: string = 'RETWE_REQUEST_FRIEND_FURNITURE_CONFIRM' as const;
    public static REQUEST_FRIEND_FURNITURE_ENGRAVING: string = 'RETWE_REQUEST_FRIEND_FURNITURE_ENGRAVING' as const;
    public static REQUEST_BADGE_DISPLAY_ENGRAVING: string = 'RETWE_REQUEST_BADGE_DISPLAY_ENGRAVING' as const;
    public static REQUEST_HIGH_SCORE_DISPLAY: string = 'RETWE_REQUEST_HIGH_SCORE_DISPLAY' as const;
    public static REQUEST_HIDE_HIGH_SCORE_DISPLAY: string = 'RETWE_REQUEST_HIDE_HIGH_SCORE_DISPLAY' as const;
    public static REQUEST_INTERNAL_LINK: string = 'RETWE_REQUEST_INTERNAL_LINK' as const;
    public static REQUEST_ROOM_LINK: string = 'RETWE_REQUEST_ROOM_LINK' as const;
    public static REQUEST_YOUTUBE: string = 'RETWE_REQUEST_YOUTUBE' as const;

    private _widget: string;

    constructor(type: string, roomId: number, objectId: number, category: number, widget: string = '') {
        super(type, roomId, objectId, category);

        this._widget = widget;
    }

    public get widget(): string {
        return this._widget;
    }

    public get contextMenu(): string {
        return this._widget;
    }
}
