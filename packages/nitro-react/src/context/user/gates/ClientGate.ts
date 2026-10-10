import { SecurityLevelEnum } from '@nitrodevco/nitro-api';

/** The Turbo extension that sends `permissionNodes`: see Turbo's `docs/client-capabilities.md`. */
export const TURBO_PERMISSION_NODES_CAPABILITY = 'permission.nodes';

/**
 * One feature the client offers only to some users. Flash asks `hasSecurity(level)`: a threshold,
 * so a user given anything at that level is offered everything at it. A Turbo server that was
 * asked (`permission.nodes`) says instead which nodes the user holds, and then the gate asks its
 * `node`. Every server sends the level, so a gate always has an answer; `node` is `null` for a
 * gate no server node stands behind, which keeps to the level everywhere.
 */
export type ClientGate = {
    readonly node: string | null;
    readonly level: SecurityLevelEnum;
};

/**
 * Every security-level gate the client draws, with the Flash check it ports and the Turbo node
 * that stands behind it. Turbo registers each node with this `level` as its client level, so the
 * two answers agree for a Flash client and for this one. See Turbo's
 * `docs/permissions-client-gates.md` and `docs/client-capabilities.md`.
 */
export const ClientGates = {
    /** `SessionDataManager.isAnyRoomController` (security 5): acts as a controller of every room. */
    AnyRoomController: { node: 'room.control.any', level: SecurityLevelEnum.Moderator },
    /** `HabboCatalog` - the Builders Club catalogue without a membership (security 5). */
    BuildersClubCatalog: { node: 'catalog.builders_club.without_membership', level: SecurityLevelEnum.Moderator },
    /** `ChatInputWidgetHandler` `:furni` - the furni chooser in any room (security 2); no server node stands behind it. */
    FurniChooserAnyRoom: { node: null, level: SecurityLevelEnum.Partner },
    /** `GroupDetailsCtrl` - delete any group (security 5). */
    DeleteAnyGroup: { node: 'guild.delete_any', level: SecurityLevelEnum.Moderator },
    /** `BCFloorPlanEditor` / `ImportExportDialog` - save a floor plan without Builders Club (security 4). */
    FloorPlanSaveWithoutClub: { node: 'room.floorplan.save_without_club', level: SecurityLevelEnum.Employee },
    /** `FurnitureVimeoDisplayWidgetHandler` - set a Vimeo display's video (security 5). */
    VimeoEdit: { node: 'room.furni.vimeo_edit', level: SecurityLevelEnum.Moderator },
    /** `FurnitureYoutubeDisplayWidgetHandler` - control a YouTube display the user does not own (security 4). */
    YoutubeControlAny: { node: 'room.furni.youtube_any', level: SecurityLevelEnum.Employee },
    /** `RentableSpaceDisplayWidget` - cancel a rent on a space the user does not own (security 5). */
    RentCancelAny: { node: 'room.furni.rent_cancel_any', level: SecurityLevelEnum.Moderator },
    /** `InfoStandFurniView` - save an ad furni's branding (security 4). */
    FurniBranding: { node: 'room.furni.branding', level: SecurityLevelEnum.Employee },
    /** `InfoStandFurniView` / `InfoStandWidgetHandler.setObjectData` - a furni's custom variables (security 5). */
    FurniCustomVariables: { node: 'room.furni.custom_variables', level: SecurityLevelEnum.Moderator },
    /** `PurchaseConfirmationDialog.isModerator` - send a gift without the sender's face (security 5). */
    GiftHideSender: { node: 'catalog.gift.hide_sender', level: SecurityLevelEnum.Moderator },
    /** `GuildForumSelectorCatalogWidget` - buy group furni for any group (security 4). */
    GuildAnyGroup: { node: 'catalog.guild.any_group', level: SecurityLevelEnum.Employee },
    /** `IncomingMessages.onUserRights` `roomPicker` - mark staff picks (security 7). */
    StaffPick: { node: 'navigator.staff_pick', level: SecurityLevelEnum.Community },
    /** `IncomingMessages.onUserRights` `eventMod` - edit any room's event from its event card (security 5). No server node. */
    RoomEventModerator: { node: null, level: SecurityLevelEnum.Moderator },
    /** `RoomCreateViewCtrl` / `EnforceCategoryCtrl` - staff-only flat categories (security 7). */
    StaffCategories: { node: 'navigator.category.staff', level: SecurityLevelEnum.Community },
    /** `WiredMenuController` - the wired menu, as the room's owner (security 4). */
    WiredMenu: { node: 'wired.menu', level: SecurityLevelEnum.Employee },
    /** `RoomChatInputView` - the staff chat styles (security 4). */
    StaffChatStyles: { node: 'chat.style.staff', level: SecurityLevelEnum.Employee },
    /** `RoomCreateViewCtrl` - the room-create staff options (security 4). No server node. */
    RoomCreateStaffOptions: { node: null, level: SecurityLevelEnum.Employee },
    /** `RoomSettingsCtrl` - the "door mode overridden" notice is not shown to staff (security 4). No server node. */
    RoomSettingsStaff: { node: null, level: SecurityLevelEnum.Employee },
    /** `VariableFxVisualizationSettingsPreset` - the campaign icons (security 4). No server node. */
    VariableFxCampaignIcons: { node: null, level: SecurityLevelEnum.Employee },
    /** `ChatInputWidgetHandler` - `:kick` / `:mute` left to the server, `:aalert` / `:avisit` without being an ambassador (security 4). No server node. */
    ChatStaffCommands: { node: null, level: SecurityLevelEnum.Employee },
    /** `ChatInputWidgetHandler` `:reload` / `:rollback` - any room's wired state (security 5). No server node. */
    RoomStateAnyRoom: { node: null, level: SecurityLevelEnum.Moderator },
} as const satisfies Record<string, ClientGate>;

/** Whether a user with these rights passes `gate`: its node when the server sent nodes, its level otherwise. */
export const passesClientGate = (rights: { securityLevel: SecurityLevelEnum; permissionNodes: ReadonlySet<string> | null }, gate: ClientGate): boolean => {
    if (rights.permissionNodes && (gate.node !== null)) return rights.permissionNodes.has(gate.node);

    return Number(rights.securityLevel) >= Number(gate.level);
};
