import type { WiredMenuWindowParams } from '#base/context/wired';
import type { AvatarEditorViewWindowParams } from '#base/views/avatar-editor/AvatarEditor';
import type { CatalogViewWindowParams } from '#base/views/catalog/CatalogView';
import type { FriendListViewWindowParams } from '#base/views/friendlist/FriendListView';
import type { InventoryViewWindowParams } from '#base/views/inventory/InventoryView';
import type { NavigatorViewWindowParams } from '#base/views/navigator/NavigatorView';

/**
 * Every window the client can show, with the parameters it is opened with - `showWindow(name,
 * params)`. A new window registers its name and params type here.
 */
export type WindowRegistry = {
    avatar_editor: AvatarEditorViewWindowParams;
    catalog: CatalogViewWindowParams;
    /** The Builders Club catalogue (`toggleCatalog("BUILDERS_CLUB")`) - see `getCatalogWindowName`. */
    builders_catalog: CatalogViewWindowParams;

    friendlist: FriendListViewWindowParams;
    friendlist_invite: NoWindowParams;
    friendlist_remove_confirmation: NoWindowParams;
    messenger: NoWindowParams;

    inventory: InventoryViewWindowParams;

    /** The avatar's effects wardrobe, opened from the avatar's own menu in the room. */
    avatar_effects: NoWindowParams;

    /** The room info panel and the room settings behind it, both opened from the room tools. */
    room_info: NoWindowParams;
    room_settings: NoWindowParams;

    /** The floor plan editor (`BCFloorPlanEditor`), opened from the room info panel. */
    floor_plan_editor: NoWindowParams;

    navigator: NavigatorViewWindowParams;

    /** The wired menu (`WiredMenuController`), from the toolbar or a `wiredmenu/...` link. The setup dialog is not a window: it opens when the server says so. */
    wired_menu: WiredMenuWindowParams;

    /** The sandbox self donation tool (`SelfDonationTool`), from a `selfdonation/open` link on sandbox hotels only. */
    wired_self_donation: NoWindowParams;

    /** The toolbar's "other settings" (`OtherSettingsView`), from the settings list under the purse. */
    toolbar_other_settings: NoWindowParams;

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

    /** Dev tool: browse/open any of the generated Flash layout ports (views/layouts). */
    layout_browser: NoWindowParams;
};

export type NoWindowParams = Record<string, unknown>;

export type WindowName = keyof WindowRegistry;

export type WindowParams<T extends WindowName = WindowName> = WindowRegistry[T];

export type VisibleWindows = { [K in WindowName]?: WindowRegistry[K] };
