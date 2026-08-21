import type { CatalogViewWindowParams } from '#base/views/catalog/CatalogView';
import type { FriendListViewWindowParams } from '#base/views/friendlist/FriendListView';
import type { InventoryViewWindowParams } from '#base/views/inventory/InventoryView';

export type WindowRegistry = {
    avatar_editor: NoWindowParams;
    catalog: CatalogViewWindowParams;

    friendlist: FriendListViewWindowParams;
    friendlist_invite: NoWindowParams;
    friendlist_remove_confirmation: NoWindowParams;
    messenger: NoWindowParams;

    inventory: InventoryViewWindowParams;
};

export type NoWindowParams = Record<string, unknown>;

export type WindowName = keyof WindowRegistry;

export type WindowParams<T extends WindowName = WindowName> = WindowRegistry[T];

export type VisibleWindows = { [K in WindowName]?: WindowRegistry[K] };
