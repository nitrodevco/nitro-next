/**
 * RoomCreateViewCtrl constructor — the hardcoded layout table, in order.
 * RoomLayout(requiredClubLevel, tileSize, name); -1 means staff (hasSecurity(4)).
 */
export type RoomLayout = {
    requiredClubLevel: number;
    tileSize: number;
    name: string;
}

export const ROOM_LAYOUTS: RoomLayout[] = [
    { requiredClubLevel: 0, tileSize: 104, name: 'a' },
    { requiredClubLevel: 0, tileSize: 94, name: 'b' },
    { requiredClubLevel: 0, tileSize: 36, name: 'c' },
    { requiredClubLevel: 0, tileSize: 84, name: 'd' },
    { requiredClubLevel: 0, tileSize: 80, name: 'e' },
    { requiredClubLevel: 0, tileSize: 80, name: 'f' },
    { requiredClubLevel: 0, tileSize: 416, name: 'i' },
    { requiredClubLevel: 0, tileSize: 320, name: 'j' },
    { requiredClubLevel: 0, tileSize: 448, name: 'k' },
    { requiredClubLevel: 0, tileSize: 352, name: 'l' },
    { requiredClubLevel: 0, tileSize: 384, name: 'm' },
    { requiredClubLevel: 0, tileSize: 372, name: 'n' },
    { requiredClubLevel: 1, tileSize: 80, name: 'g' },
    { requiredClubLevel: 1, tileSize: 74, name: 'h' },
    { requiredClubLevel: 1, tileSize: 416, name: 'o' },
    { requiredClubLevel: 1, tileSize: 352, name: 'p' },
    { requiredClubLevel: 1, tileSize: 304, name: 'q' },
    { requiredClubLevel: 1, tileSize: 336, name: 'r' },
    { requiredClubLevel: 1, tileSize: 748, name: 'u' },
    { requiredClubLevel: 1, tileSize: 438, name: 'v' },
    { requiredClubLevel: 2, tileSize: 540, name: 't' },
    { requiredClubLevel: 2, tileSize: 512, name: 'w' },
    { requiredClubLevel: 2, tileSize: 396, name: 'x' },
    { requiredClubLevel: 2, tileSize: 440, name: 'y' },
    { requiredClubLevel: 2, tileSize: 456, name: 'z' },
    { requiredClubLevel: 2, tileSize: 208, name: '0' },
    { requiredClubLevel: 2, tileSize: 1009, name: '1' },
    { requiredClubLevel: 2, tileSize: 1044, name: '2' },
    { requiredClubLevel: 2, tileSize: 183, name: '3' },
    { requiredClubLevel: 2, tileSize: 254, name: '4' },
    { requiredClubLevel: 2, tileSize: 1024, name: '5' },
    { requiredClubLevel: 2, tileSize: 801, name: '6' },
    { requiredClubLevel: 2, tileSize: 354, name: '7' },
    { requiredClubLevel: 2, tileSize: 888, name: '8' },
    { requiredClubLevel: 2, tileSize: 926, name: '9' },
    { requiredClubLevel: -1, tileSize: 2500, name: 'snowwar1' },
    { requiredClubLevel: -1, tileSize: 2500, name: 'snowwar2' }
];

/**
 * RoomCreateViewCtrl.isAllowed(layout, checkClub). Called with false when deciding
 * *visibility* (only staff layouts are hidden) and with true on click, where failing
 * opens the catalog club page instead of selecting.
 */
export const isLayoutAllowed = (layout: RoomLayout, checkClub: boolean, hasClub: boolean, hasVip: boolean, hasStaffSecurity: boolean) => {
    switch (layout.requiredClubLevel) {
        case 0: return true;
        case 1: return !checkClub || hasClub;
        case 2: return !checkClub || hasVip;
        default: return hasStaffSecurity;
    }
};

/** refreshSelection() — exact uints from the ctrl */
export const TILE_TEXT_COLOR_SELECTED = '#ffffff';    /* 4294967295 */
export const TILE_TEXT_COLOR_UNSELECTED = '#000000';    /* 4278190080 */
export const TILE_BG_SELECTED = '#6e8184';    /* 4285432196 */
export const TILE_BG_UNSELECTED = '#cbcbcb';    /* 4291546059 */

/** TextFieldManager.displayError — invalid input background */
export const INPUT_ERROR_BACKGROUND = '#f18f9b';    /* 4294021019 */

/** RoomCreateViewCtrl.ROOM_LIMIT_HC / ROOM_LIMIT_NON_SUBSCRIBER */
export const ROOM_LIMIT_HC = 75;
export const ROOM_LIMIT_NON_SUBSCRIBER = 50;
