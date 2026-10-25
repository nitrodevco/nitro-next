/**
 * `TrophyTheme`: gold, silver and bronze - the plaque's art (`BACKGROUND_ASSET_NAMES`) and the colour
 * of its title bar (`HEADER_COLORS`) both follow the theme, and anything outside 0-2 is gold
 * (`normalize`). The colours are whole `0xAARRGGBB` values: `title_bg` fills with
 * the colour it is given, alpha and all.
 */
export const TROPHY_THEMES = [
    { background: 'habbo-room-ui-com/trophy_bg_gold.png', header: 0xffecc547 },
    { background: 'habbo-room-ui-com/trophy_bg_silver.png', header: 0xffc9bdcc },
    { background: 'habbo-room-ui-com/trophy_bg_bronze.png', header: 0xffb87834 },
];

/** `TrophyTheme.normalize` then the theme: gold outside 0-2. */
export const getTrophyTheme = (theme: number) => TROPHY_THEMES[theme] ?? TROPHY_THEMES[0];

/** `TrophyTheme.getHeaderColor`: the theme's title bar colour. */
export const getTrophyHeaderColor = (theme: number) => getTrophyTheme(theme).header;
