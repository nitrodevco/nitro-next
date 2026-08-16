import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectWidgetRequestEvent extends RoomObjectEvent {
    public static OPEN_WIDGET: string = 'ROWRE_OPEN_WIDGET' as const;
    public static CLOSE_WIDGET: string = 'ROWRE_CLOSE_WIDGET' as const;
    public static OPEN_FURNI_CONTEXT_MENU: string = 'ROWRE_OPEN_FURNI_CONTEXT_MENU' as const;
    public static CLOSE_FURNI_CONTEXT_MENU: string = 'ROWRE_CLOSE_FURNI_CONTEXT_MENU' as const;
    public static PLACEHOLDER: string = 'ROWRE_PLACEHOLDER' as const;
    public static CREDITFURNI: string = 'ROWRE_CREDITFURNI' as const;
    public static STACK_HEIGHT: string = 'ROWRE_STACK_HEIGHT' as const;
    public static EXTERNAL_IMAGE: string = 'ROWRE_EXTERNAL_IMAGE' as const;
    public static STICKIE: string = 'ROWRE_STICKIE' as const;
    public static PRESENT: string = 'ROWRE_PRESENT' as const;
    public static TROPHY: string = 'ROWRE_TROPHY' as const;
    public static TEASER: string = 'ROWRE_TEASER' as const;
    public static ECOTRONBOX: string = 'ROWRE_ECOTRONBOX' as const;
    public static DIMMER: string = 'ROWRE_DIMMER' as const;
    public static WIDGET_REMOVE_DIMMER: string = 'ROWRE_WIDGET_REMOVE_DIMMER' as const;
    public static CLOTHING_CHANGE: string = 'ROWRE_CLOTHING_CHANGE' as const;
    public static JUKEBOX_PLAYLIST_EDITOR: string = 'ROWRE_JUKEBOX_PLAYLIST_EDITOR' as const;
    public static MANNEQUIN: string = 'ROWRE_MANNEQUIN' as const;
    public static PET_PRODUCT_MENU: string = 'ROWRE_PET_PRODUCT_MENU' as const;
    public static GUILD_FURNI_CONTEXT_MENU: string = 'ROWRE_GUILD_FURNI_CONTEXT_MENU' as const;
    public static MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG: string =
        'ROWRE_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG' as const;
    public static PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG: string = 'ROWRE_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG' as const;
    public static BACKGROUND_COLOR: string = 'ROWRE_BACKGROUND_COLOR' as const;
    public static AREA_HIDE: string = 'ROWRE_AREA_HIDE' as const;
    public static MYSTERYBOX_OPEN_DIALOG: string = 'ROWRE_MYSTERYBOX_OPEN_DIALOG' as const;
    public static EFFECTBOX_OPEN_DIALOG: string = 'ROWRE_EFFECTBOX_OPEN_DIALOG' as const;
    public static MYSTERYTROPHY_OPEN_DIALOG: string = 'ROWRE_MYSTERYTROPHY_OPEN_DIALOG' as const;
    public static ACHIEVEMENT_RESOLUTION_OPEN: string = 'ROWRE_ACHIEVEMENT_RESOLUTION_OPEN' as const;
    public static ACHIEVEMENT_RESOLUTION_ENGRAVING: string = 'ROWRE_ACHIEVEMENT_RESOLUTION_ENGRAVING' as const;
    public static ACHIEVEMENT_RESOLUTION_FAILED: string = 'ROWRE_ACHIEVEMENT_RESOLUTION_FAILED' as const;
    public static FRIEND_FURNITURE_CONFIRM: string = 'ROWRE_FRIEND_FURNITURE_CONFIRM' as const;
    public static FRIEND_FURNITURE_ENGRAVING: string = 'ROWRE_FRIEND_FURNITURE_ENGRAVING' as const;
    public static BADGE_DISPLAY_ENGRAVING: string = 'ROWRE_BADGE_DISPLAY_ENGRAVING' as const;
    public static HIGH_SCORE_DISPLAY: string = 'ROWRE_HIGH_SCORE_DISPLAY' as const;
    public static HIDE_HIGH_SCORE_DISPLAY: string = 'ROWRE_HIDE_HIGH_SCORE_DISPLAY' as const;
    public static INERNAL_LINK: string = 'ROWRE_INTERNAL_LINK' as const;
    public static ROOM_LINK: string = 'ROWRE_ROOM_LINK' as const;
    public static YOUTUBE: string = 'ROWRE_YOUTUBE' as const;
}
