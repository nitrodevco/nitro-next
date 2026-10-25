/**
 * Where the room tools sit and how much room they take, so anything placed beside them - the
 * card that names the room, the chat bar - can keep out of their way.
 * `RoomToolsCtrlBase.TOOLBAR_X` / `DISTANCE_FROM_BOTTOM` and `RoomToolsInfoCtrl.MARGIN`.
 */
export const ROOM_TOOLS_X = -5;
export const ROOM_TOOLS_BOTTOM = 55;

/** The column is 165 wide with the strip down its left; collapsed, only that strip is left. */
export const ROOM_TOOLS_WIDTH = 165;
export const ROOM_TOOLS_SIDE_BAR_WIDTH = 19;

/** The gap the room-entry card keeps from the column. */
export const ROOM_TOOLS_INFO_MARGIN = 12;

/** How far the tools reach from the left edge - `RoomToolsToolbarCtrl.right`. */
export const roomToolsRight = (collapsed: boolean) =>
    ROOM_TOOLS_X + (collapsed ? ROOM_TOOLS_SIDE_BAR_WIDTH : ROOM_TOOLS_WIDTH);
