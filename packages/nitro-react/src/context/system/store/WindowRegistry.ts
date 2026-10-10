import type { AvatarGenderType } from '@nitrodevco/nitro-api';
import type { IMyCfhReportStatus, ISanctionStatusEntry } from '@nitrodevco/nitro-packets';

import type { CatalogRoomAdExtension } from '#base/context/catalog';
import type { HelpReportEntry } from '#base/context/help';
import type { WiredMenuWindowParams } from '#base/context/wired';

/**
 * How the avatar editor is opened. A clothing-change booth borrows it to dress itself: the outfit it
 * already holds is loaded instead of the user's own look, and saving writes back to that furni.
 * Anything else opens the editor on the user, which is the ordinary case and needs no params.
 */
type AvatarEditorWindowParams = {
    clothingChange?: {
        objectId: number;
        figure: string;
        gender: AvatarGenderType;
    };
};

/**
 * The catalogue opened on a page (by id or name) or an offer; `roomAdExtension`: the room ad page
 * opened in extended mode (`openRoomAdCatalogPageInExtendedMode`).
 */
type CatalogWindowParams = { pageId?: number; pageName?: string; offerId?: number; roomAdExtension?: CatalogRoomAdExtension };

/**
 * Every window the client can show, with the parameters it is opened with - `showWindow(name,
 * params)`. A new window registers its name and params type here.
 */
export type WindowRegistry = {
    achievements: NoWindowParams;
    /** The quest list (`QuestsList`), from the progression menu or a `questengine/quests` link. */
    quests: NoWindowParams;
    avatar_editor: AvatarEditorWindowParams;
    catalog: CatalogWindowParams;
    /** The Builders Club catalogue (`toggleCatalog("BUILDERS_CLUB")`) - see `getCatalogWindowName`. */
    builders_catalog: CatalogWindowParams;

    /** The friend list opened on a tab (`''` all closed). */
    friendlist: { tab?: '' | 'friends' | 'requests' | 'search' };
    friendlist_invite: NoWindowParams;
    friendlist_remove_confirmation: NoWindowParams;
    /** The user's extended profile (`ExtendedProfileWindowCtrl` in `HabboGroupsManager`). */
    user_profile: { userId?: number };

    /** The page the inventory opens on (`categoryViewId`). */
    inventory: { tab?: 'furni' | 'collectibles' | 'pets' | 'bots' | 'badges' };

    /** The avatar's effects wardrobe, opened from the avatar's own menu in the room. */
    avatar_effects: NoWindowParams;

    /** The room info panel and the room settings behind it, both opened from the room tools. */
    room_info: NoWindowParams;
    /**
     * `startRoomSettingsEdit` / `startRoomSettingsEditFromNavigator`: with no `roomId` the window edits
     * the room you are standing in; the navigator's room info popup names another room and its group.
     */
    room_settings: { roomId?: number; groupId?: number };
    /** `RoomFilterCtrl`: the word filter of the room in `roomFilterFlatId`. */
    room_filter: NoWindowParams;

    /** The room thumbnail camera (`RoomThumbnailCameraWidget`), from the room info panel's `roomThumbnailCamera/open`. */
    room_thumbnail_camera: NoWindowParams;

    /** The floor plan editor (`BCFloorPlanEditor`), opened from the room info panel. */
    floor_plan_editor: NoWindowParams;

    /** The navigator, searching `searchCode` when given. */
    navigator: { searchCode?: string };
    /** Messenger conversations (`MessengerView`), opened from the toolbar. */
    messenger: NoWindowParams;

    /** Room creation (`RoomCreateViewCtrl`), from the navigator's create room button - `HabboNewNavigator.createRoom`. */
    navigator_room_create: NoWindowParams;

    /** The wired menu (`WiredMenuController`), from the toolbar or a `wiredmenu/...` link. The setup dialog is not a window: it opens when the server says so. */
    wired_menu: WiredMenuWindowParams;

    /** The sandbox self donation tool (`SelfDonationTool`), from a `selfdonation/open` link on sandbox hotels only. */
    wired_self_donation: NoWindowParams;

    /** The toolbar's "other settings" (`OtherSettingsView`), from the settings list under the purse. */
    toolbar_other_settings: NoWindowParams;

    /** The room camera's viewfinder (`CameraViewFinder`), from the toolbar's camera icon. */
    camera: NoWindowParams;

    /** The toolbar's sound settings (`SoundSettingsView`), from the settings list under the purse. */
    toolbar_sound_settings: NoWindowParams;

    /** The toolbar's chat settings (`ChatSettingsView`), from the settings list under the purse. */
    toolbar_chat_settings: NoWindowParams;

    /** The toolbar's word filter (`WordFilterSettingsView`), from the settings list under the purse. */
    toolbar_word_filter: NoWindowParams;

    /** The help window (`HelpView`), from the purse's help button - `HabboHelp.toggleNewHelpWindow`. */
    help: { entry?: HelpReportEntry; openedAt?: number };
    /** `SanctionInfo`, opened by the `SanctionStatusEvent` that answers the help window's sanction status link. */
    help_sanction_info: { sanctions?: ISanctionStatusEntry[]; openedAt?: number };
    /** `MyReportStatus`, opened by the answer to the help window's reports status link. */
    help_my_reports: { reports?: IMyCfhReportStatus[]; openedAt?: number };

    /** The vault (`EarningsView`), from `habboUI/open/vault` - the purse's earnings button or the new earnings bubble. */
    earnings: NoWindowParams;

    /** The club centre (`HabboClubCenter`'s `ClubCenterView`), from `habboUI/open/hccenter` - `openClubCenter`, `verifyClubLevel`. */
    club_center: NoWindowParams;

    /** The special items display (`SpecialItemsView`), from a `special_items_display/<key>` link. */
    special_items_display: NoWindowParams;

    /** The offer centre's reward list (`OfferCenter.showRewards`). */
    offer_center: NoWindowParams;

    /** The habbicon hub (`HabbiconView`), from `habbicons/open` - `HabbiconController.openHabbiconHub`. */
    habbicons: NoWindowParams;

    /** The collectibles hub (`CollectiblesView`), from the me menu or a `collectibles/open` link. */
    collectibles: NoWindowParams;
};

export type NoWindowParams = Record<string, unknown>;

export type WindowName = keyof WindowRegistry;

export type WindowParams<T extends WindowName = WindowName> = WindowRegistry[T];

export type VisibleWindows = { [K in WindowName]?: WindowRegistry[K] };
