/**
 * Where the navigator opens. Flash puts it where the server's preferences say
 * (`NavigatorView.setInitialWindowDimensions`, NavigatorView.as:149-157, WIN63-202610201032), and the
 * server keeps what the client last sent of it - its own default for a player who never moved it.
 * A theme's `frame.overrides.navigator.position` is the first place for a player who has not placed
 * the window: it goes over the server's preferences until the player drags the window, and from then
 * on the server's (the player's own) win. Where the window was last this session beats both.
 */
export const navigatorFirstPosition = (
    opening: { x: number; y: number } | undefined,
    preferences: { windowX: number; windowY: number } | undefined,
    themePosition: { x: number; y: number } | undefined,
    placedByPlayer: boolean,
): { position: { x: number; y: number }; fromTheme: boolean } => {
    if (opening) return { position: { x: opening.x, y: opening.y }, fromTheme: false };

    if (themePosition && !(placedByPlayer && preferences)) return { position: themePosition, fromTheme: true };

    return { position: { x: preferences?.windowX ?? 20, y: preferences?.windowY ?? 20 }, fromTheme: false };
};

const PLACED_KEY_PREFIX = 'nitro:navigator-placed:';

/**
 * Whether this player dragged the navigator in this browser: the server's preferences are their own
 * place then, not its default. Storage that is unavailable only means the theme's place is used.
 */
export const isNavigatorPlacedByPlayer = (userId: number): boolean => {
    try {
        return (typeof window !== 'undefined') && window.localStorage.getItem(PLACED_KEY_PREFIX + userId) === '1';
    } catch {
        return false;
    }
};

export const setNavigatorPlacedByPlayer = (userId: number): void => {
    try {
        if (typeof window !== 'undefined') window.localStorage.setItem(PLACED_KEY_PREFIX + userId, '1');
    } catch {
        return;
    }
};
