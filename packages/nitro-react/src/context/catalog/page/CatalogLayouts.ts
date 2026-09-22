/**
 * The catalogue page layouts and the widgets each one gets - the data half of Flash's
 * `CatalogPage.createWindow` / `createWidgets`.
 *
 * `createWindow(layoutCode)` builds the asset `layout_<code>` (`frontpage4` is built from
 * `layout_frontpage_featured`), and the component manifest points a few codes at another layout
 * (`<asset name="layout_bots" ref="layout_default_3x3"/>` - `CATALOG_LAYOUT_ALIASES`). A code with
 * no asset builds no window: Flash logs it and the page area stays empty, and so does the port
 * (`resolveCatalogLayout` answers `undefined`).
 *
 * `createWidgetsRecursion` then walks the built window depth first and creates a widget for every
 * element whose name is a `CatalogWidgetEnum` value; `CATALOG_LAYOUT_WIDGETS` is that walk's result
 * for each layout, in walk order, which is also the order the widgets initialise and subscribe in.
 * `LocalizationCatalogWidget` is created on every page on top of these (`initializeLocalizations`),
 * which the port does through `PageLocalization`. `drift/catalog_layouts.py` holds both tables to
 * the layout XML and the manifest of `habbo-catalog-com`.
 */
import { CatalogWidgetEnum as W, CatalogWidgetId } from './CatalogWidgetEnum';

export const CATALOG_LAYOUT_WIDGETS = {
    badge_display: [ W.PRODUCT_VIEW, W.SPECIAL_INFO, W.PURCHASE, W.ITEM_GRID, W.LIMITED_ITEM, W.USER_BADGE_SELECTOR ],
    builders_club_addons: [ W.BUILDER_ADDONS ],
    builders_club_frontpage: [ W.BUILDER_SUBSCRIPTION ],
    builders_club_loyalty: [ W.BUILDER_LOYALTY ],
    club_buy: [ W.CLUB_BUY ],
    club_gifts: [ W.CLUB_GIFTS ],
    default_3x3: [ W.PRODUCT_VIEW, W.ITEM_GRID, W.COLOUR_GRID, W.PURCHASE, W.ACTIVITY_POINT_DISPLAY, W.SPECIAL_INFO, W.LIMITED_ITEM, W.SOLD_LIMITED_ITEMS, W.SPINNER, W.TOTAL_PRICE, W.BUILDER ],
    frontpage4: [ W.REDEEM_ITEM_CODE ],
    frontpage_featured: [ W.FEATURED_ITEMS, W.REDEEM_ITEM_CODE ],
    guild_custom_furni: [ W.ITEM_GRID, W.PRODUCT_VIEW, W.GUILD_SELECTOR, W.SPECIAL_INFO, W.ACTIVITY_POINT_DISPLAY, W.GUILD_BADGE_VIEW, W.PURCHASE ],
    guild_forum: [ W.FIRST_PRODUCT_AUTO_SELECTOR, W.SIMPLE_PRICE, W.GUILD_BADGE_VIEW, W.GUILD_FORUM_SELECTOR, W.WARNING, W.PURCHASE ],
    guild_frontpage: [ W.BUY_GUILD ],
    info_duckets: [],
    info_loyalty: [],
    info_rentables: [],
    loyalty_vip_buy: [ W.LOYALTY_VIP_BUY ],
    marketplace: [ W.MARKET_PLACE ],
    marketplace_own_items: [ W.MARKET_PLACE_OWN_ITEMS ],
    monkey: [],
    petcustomization: [ W.ITEM_GRID, W.PET_PREVIEW, W.PURCHASE ],
    pets: [ W.PETS, W.ADDON_BADGE_VIEW, W.COLOUR_GRID, W.PURCHASE, W.NEW_PETS, W.COLOUR_GRID, W.PURCHASE, W.ADDON_BADGE_VIEW ],
    pets2: [],
    pets3: [],
    recycler: [ W.RECYCLER ],
    recycler_info: [],
    recycler_prizes: [ W.SPECIAL_INFO, W.RECYCLER_PRIZES ],
    roomads: [ W.ROOMADS, W.PURCHASE ],
    single_bundle: [ W.BUNDLE_GRID_SCROLL, W.ADDON_BADGE_VIEW, W.SIMPLE_PRICE, W.PURCHASE ],
    soundmachine: [ W.ITEM_GRID, W.SONG_DISK_PRODUCT_VIEW, W.SPECIAL_INFO, W.PURCHASE ],
    spaces_new: [ W.PRODUCT_VIEW, W.ROOM_PREVIEW, W.ACTIVITY_POINT_DISPLAY, W.SPACES_NEW, W.PURCHASE ],
    trophies: [ W.TROPHY, W.COLOUR_GRID, W.TEXT_INPUT, W.PURCHASE ],
    vip_buy: [ W.VIP_BUY ],
} as const satisfies Record<string, readonly CatalogWidgetId[]>;

/** A layout the client ships: the `<name>` of an asset `layout_<name>`. */
export type CatalogLayoutName = keyof typeof CATALOG_LAYOUT_WIDGETS;

/**
 * Each layout's window width. `CatalogViewer.showCatalogPage` sizes the layout container to it and
 * right-aligns it (`_container.x = parent.width - width - 8`), hiding the search and navigation when
 * that leaves them less than 130px - which only the 552px `frontpage_featured` does.
 */
export const CATALOG_LAYOUT_WIDTHS: Readonly<Record<CatalogLayoutName, number>> = {
    badge_display: 360, builders_club_addons: 360, builders_club_frontpage: 360, builders_club_loyalty: 360,
    club_buy: 360, club_gifts: 360, default_3x3: 360, frontpage4: 360, frontpage_featured: 552,
    guild_custom_furni: 360, guild_forum: 360, guild_frontpage: 360, info_duckets: 360, info_loyalty: 360,
    info_rentables: 360, loyalty_vip_buy: 360, marketplace: 360, marketplace_own_items: 360, monkey: 360,
    petcustomization: 360, pets: 360, pets2: 360, pets3: 360, recycler: 360, recycler_info: 360,
    recycler_prizes: 360, roomads: 360, single_bundle: 360, soundmachine: 360, spaces_new: 360,
    trophies: 360, vip_buy: 360,
};

/** The manifest's `ref` assets: a layout code built from another code's layout. */
export const CATALOG_LAYOUT_ALIASES: Readonly<Record<string, CatalogLayoutName>> = {
    niko: 'monkey',
    bots: 'default_3x3',
    default_3x3_extrainfo: 'default_3x3',
    pixeleffects: 'default_3x3',
    default_3x3_color_grouping: 'default_3x3',
    sold_ltd_items: 'default_3x3',
};

const isCatalogLayoutName = (name: string): name is CatalogLayoutName => Object.hasOwn(CATALOG_LAYOUT_WIDGETS, name);

/** The layout `CatalogPage.createWindow` builds for a page's layout code, or `undefined` when it builds none. */
export const resolveCatalogLayout = (layoutCode: string): CatalogLayoutName | undefined => {
    const code = (layoutCode === 'frontpage4') ? 'frontpage_featured' : layoutCode;
    const name = CATALOG_LAYOUT_ALIASES[code] ?? code;

    return isCatalogLayoutName(name) ? name : undefined;
};
