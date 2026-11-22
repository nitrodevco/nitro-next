/**
 * The windows the preview host's design window draws with the game's own view and sample content, by
 * window (the window map's id), each in named states: the catalogue on a page of each layout with its
 * parts in it (the badge display page's `badgeGridItem` per badge), the inventory on a tab with things
 * in it, where the bare template would be
 * an empty frame. Said in the host's `ready` (`states`); a `design` message picks one by `state`. Not a
 * Flash feature.
 */

/** One state: its id, the name a panel shows, and what the view is fed. */
export interface DesignState {
    id: string;
    name: string;
    /** The catalogue page's layout code (`CatalogPage.layoutCode`). */
    layout?: string;
    /** The tab the window opens on (the inventory's `furni`, the navigator's `hotel_view`). */
    tab?: string;
    /** How a list shows its entries (the navigator's results: 0 rows, 1 tiles). */
    viewMode?: number;
}

/** The catalogue's states: a page per layout the hotel's front, furni and badge pages use. */
const CATALOG_STATES: DesignState[] = [
    { id: 'page:frontpage4', name: 'Front page', layout: 'frontpage4' },
    { id: 'page:default_3x3', name: 'Furni page', layout: 'default_3x3' },
    { id: 'page:badge_display', name: 'Badge display page', layout: 'badge_display' },
];

export const CATALOG_WINDOW = 'habbo-catalog-com/catalog_ubuntu_with_tabs';
export const INVENTORY_WINDOW = 'habbo-inventory-com/inventory_xml';
export const NAVIGATOR_WINDOW = 'habbo-new-navigator/navigator_frame_2_xml';
export const PURSE_WINDOW = 'habbo-toolbar-com/purse_xml';
export const FRIENDS_WINDOW = 'habbo-friend-list-com/main_window_xml';
export const INFOSTAND_FURNI_WINDOW = 'habbo-room-ui-com/furni_view';
export const MESSENGER_WINDOW = 'habbo-messenger-com/messenger_xml';
/** The room screen: every piece of the HUD a player sees in a room, each its own window (`DesignHudView`). */
export const HUD_WINDOW = 'hud';

/** The inventory's states: a tab with things in it each. */
const INVENTORY_STATES: DesignState[] = [
    { id: 'tab:furni', name: 'Furni', tab: 'furni' },
    { id: 'tab:badges', name: 'Badges', tab: 'badges' },
];

/** The navigator's states: rooms in two categories, as rows or as tiles. */
const NAVIGATOR_STATES: DesignState[] = [
    { id: 'rooms:rows', name: 'Rooms (list)', viewMode: 0 },
    { id: 'rooms:tiles', name: 'Rooms (tiles)', viewMode: 1 },
];

/** The purse's states: currencies with a club subscription, and without. */
const PURSE_STATES: DesignState[] = [
    { id: 'club', name: 'With club', tab: 'club' },
    { id: 'no-club', name: 'No club', tab: 'none' },
];

/** The friends list's states: friends online and offline, and friend requests. */
const FRIENDS_STATES: DesignState[] = [
    { id: 'tab:friends', name: 'Friends', tab: 'friends' },
    { id: 'tab:requests', name: 'Friend requests', tab: 'requests' },
];

/** The furni infostand's states: the room owner's view with its buttons, and a visitor's. */
const INFOSTAND_FURNI_STATES: DesignState[] = [
    { id: 'owner', name: 'Room owner', tab: 'owner' },
    { id: 'visitor', name: 'Visitor', tab: 'visitor' },
];

/** The room screen's states: the room as a visitor sees it with a furni picked, a user picked, with the Me menu open, with the room info open. */
const HUD_STATES: DesignState[] = [
    { id: 'room', name: 'In a room', tab: 'room' },
    { id: 'user', name: 'A user picked', tab: 'user' },
    { id: 'memenu', name: 'Me menu open', tab: 'memenu' },
    { id: 'roominfo', name: 'Room info open', tab: 'roominfo' },
];

/** The states of each window drawn with its own view. */
export const DESIGN_STATES: Readonly<Record<string, readonly DesignState[]>> = {
    [CATALOG_WINDOW]: CATALOG_STATES,
    [INVENTORY_WINDOW]: INVENTORY_STATES,
    [NAVIGATOR_WINDOW]: NAVIGATOR_STATES,
    [PURSE_WINDOW]: PURSE_STATES,
    [FRIENDS_WINDOW]: FRIENDS_STATES,
    [INFOSTAND_FURNI_WINDOW]: INFOSTAND_FURNI_STATES,
    [MESSENGER_WINDOW]: [ { id: 'chat', name: 'Conversation' } ],
    [HUD_WINDOW]: HUD_STATES,
};

/** The state `id` of `window`, its first when `id` names none it has; `undefined` for a window drawn as its bare template. */
export const designState = (window: string, id: string | undefined): DesignState | undefined => {
    const states = DESIGN_STATES[window];

    return states?.find(state => state.id === id) ?? states?.[0];
};

/** The states as the host says them (`ready`): by window, each state's id and name. */
export const designStateList = () => Object.fromEntries(Object.entries(DESIGN_STATES).map(([ window, states ]) => [ window, states.map(({ id, name }) => ({ id, name })) ]));
