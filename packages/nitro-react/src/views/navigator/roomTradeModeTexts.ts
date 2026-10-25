/**
 * The trade mode drop-down's entries, in `RoomTradeModeEnum` order so an entry's index is the mode -
 * written out alike by the navigator's room creation (`RoomCreateViewCtrl.prepareTradeModeSelection`),
 * the room settings (`setTradeModeSelection`) and the enforce category dialog (`show`).
 */
export const ROOM_TRADE_MODE_TEXTS: readonly string[] = [ '${navigator.roomsettings.trade_not_allowed}', '${navigator.roomsettings.trade_not_with_Controller}', '${navigator.roomsettings.trade_allowed}' ];
