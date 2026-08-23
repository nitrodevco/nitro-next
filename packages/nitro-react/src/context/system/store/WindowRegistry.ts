import { CatalogViewWindowParams } from '#base/views-pixi/catalog/CatalogViewPixi';
import { FriendListViewWindowParams } from '#base/views-pixi/friendlist/FriendListViewPixi';
import { InventoryViewWindowParams } from '#base/views-pixi/inventory/InventoryViewPixi';
import { NavigatorViewWindowParams } from '#base/views-pixi/navigator/NavigatorViewPixi';

export type WindowRegistry = {
    avatar_editor: NoWindowParams;
    catalog: CatalogViewWindowParams;

    friendlist: FriendListViewWindowParams;
    friendlist_invite: NoWindowParams;
    friendlist_remove_confirmation: NoWindowParams;
    messenger: NoWindowParams;

    inventory: InventoryViewWindowParams;

    navigator: NavigatorViewWindowParams;
};

export type NoWindowParams = Record<string, unknown>;

export type WindowName = keyof WindowRegistry;

export type WindowParams<T extends WindowName = WindowName> = WindowRegistry[T];

export type VisibleWindows = { [K in WindowName]?: WindowRegistry[K] };
