import type { IMyCfhReportStatus, ISanctionStatusEntry } from '@nitrodevco/nitro-packets';

import type { HelpReportEntry } from '#base/commands/helpCommands';
import type { WiredMenuWindowParams } from '#base/context/wired';
import type { AvatarEditorViewWindowParams } from '#base/views/avatar-editor/AvatarEditor';
import type { CatalogViewWindowParams } from '#base/views/catalog/CatalogView';
import type { FriendListViewWindowParams } from '#base/views/friendlist/FriendListView';
import type { InventoryViewWindowParams } from '#base/views/inventory/InventoryView';
import type { NavigatorViewWindowParams } from '#base/views/navigator/NavigatorView';
import type { RoomSettingsViewWindowParams } from '#base/views/room-widgets/room-settings/RoomSettingsView';

/**
 * Every window the client can show, with the parameters it is opened with - `showWindow(name,
 * params)`. A new window registers its name and params type here.
 */
export type WindowRegistry = {
    achievements: NoWindowParams;
    /** The quest list (`QuestsList`), from the progression menu or a `questengine/quests` link. */
    quests: NoWindowParams;
    avatar_editor: AvatarEditorViewWindowParams;
    catalog: CatalogViewWindowParams;
    /** The Builders Club catalogue (`toggleCatalog("BUILDERS_CLUB")`) - see `getCatalogWindowName`. */
    builders_catalog: CatalogViewWindowParams;

    friendlist: FriendListViewWindowParams;
    friendlist_invite: NoWindowParams;
    friendlist_remove_confirmation: NoWindowParams;
    /** The user's extended profile (`ExtendedProfileWindowCtrl` in `HabboGroupsManager`). */
    user_profile: { userId?: number };

    inventory: InventoryViewWindowParams;

    /** The avatar's effects wardrobe, opened from the avatar's own menu in the room. */
    avatar_effects: NoWindowParams;

    /** The room info panel and the room settings behind it, both opened from the room tools. */
    room_info: NoWindowParams;
    room_settings: RoomSettingsViewWindowParams;
    /** `RoomFilterCtrl`: the word filter of the room in `roomFilterFlatId`. */
    room_filter: NoWindowParams;

    /** The room thumbnail camera (`RoomThumbnailCameraWidget`), from the room info panel's `roomThumbnailCamera/open`. */
    room_thumbnail_camera: NoWindowParams;

    /** The floor plan editor (`BCFloorPlanEditor`), opened from the room info panel. */
    floor_plan_editor: NoWindowParams;

    navigator: NavigatorViewWindowParams;
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
