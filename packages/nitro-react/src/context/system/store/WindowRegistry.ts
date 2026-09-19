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

    navigator: NavigatorViewWindowParams;

    /** Dev tool: browse/open any of the generated Flash layout ports (views/layouts). */
    layout_browser: NoWindowParams;
};

export type NoWindowParams = Record<string, unknown>;

export type WindowName = keyof WindowRegistry;

export type WindowParams<T extends WindowName = WindowName> = WindowRegistry[T];

export type VisibleWindows = { [K in WindowName]?: WindowRegistry[K] };
