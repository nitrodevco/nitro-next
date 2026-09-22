/**
 * The catalogue page widgets by the name of the layout container that hosts them - Flash's
 * `CatalogWidgetEnum`, whose values are the names `CatalogPage.createWidget` switches on. A
 * container in a page layout with one of these names gets that widget; see
 * `views/catalog/page/CatalogPageRegistry.ts` for how the port mounts them.
 *
 * Six Flash members are obfuscated (`§_-O2U§`, `§_-F1H§`, `§_-L1N§`, `§_-u1I§`, `§_-02B§`,
 * `§_-82I§`); they are named here after their value. `drift/enums.py` holds the values to Flash's.
 */
export const CatalogWidgetEnum = {
    ACTIVITY_POINT_DISPLAY: 'activityPointDisplayWidget',
    ADDON_BADGE_VIEW: 'addOnBadgeViewWidget',
    BUILDER: 'builderWidget',
    BUILDER_ADDONS: 'builderAddonsWidget',
    BUILDER_LOYALTY: 'builderLoyaltyWidget',
    BUILDER_SUBSCRIPTION: 'builderSubscriptionWidget',
    BUNDLE_GRID_SCROLL: 'bundleGridScrollWidget',
    BUNDLE_PURCHASE_EXTRA_INFO: 'bundlePurchaseExtraInfoWidget',
    BUY_GUILD: 'buyGuildWidget',
    CLUB_BUY: 'clubBuyWidget',
    CLUB_GIFTS: 'clubGiftWidget',
    COLOUR_GRID: 'colourGridWidget',
    FEATURED_ITEMS: 'featuredItemsWidget',
    GUILD_BADGE_VIEW: 'guildBadgeViewWidget',
    GUILD_SELECTOR: 'guildSelectorWidget',
    GUILD_FORUM_SELECTOR: 'guildForumSelectorWidget',
    ITEM_GRID: 'itemGridWidget',
    LOYALTY_VIP_BUY: 'loyaltyVipBuyWidget',
    MAD_MONEY: 'madMoneyWidget',
    MARKET_PLACE: 'marketPlaceWidget',
    MARKET_PLACE_OWN_ITEMS: 'marketPlaceOwnItemsWidget',
    NEW_PETS: 'newPetsWidget',
    PETS: 'petsWidget',
    PET_PREVIEW: 'petPreviewWidget',
    PRODUCT_VIEW: 'productViewWidget',
    PURCHASE: 'purchaseWidget',
    RECYCLER: 'recyclerWidget',
    RECYCLER_PRIZES: 'recyclerPrizesWidget',
    REDEEM_ITEM_CODE: 'redeemItemCodeWidget',
    ROOMADS: 'roomAdsCatalogWidget',
    ROOM_PREVIEW: 'roomPreviewWidget',
    SIMPLE_PRICE: 'simplePriceWidget',
    SINGLE_VIEW: 'singleViewWidget',
    SOLD_LIMITED_ITEMS: 'soldLtdItemsWidget',
    SONG_DISK_PRODUCT_VIEW: 'songDiskProductViewWidget',
    SPACES_NEW: 'spacesNewWidget',
    SPECIAL_INFO: 'specialInfoWidget',
    SPINNER: 'spinnerWidget',
    TEXT_INPUT: 'textInputWidget',
    TOTAL_PRICE: 'totalPriceWidget',
    TRAX_PREVIEW: 'traxPreviewWidget',
    TROPHY: 'trophyWidget',
    LIMITED_ITEM: 'limitedItemWidget',
    USER_BADGE_SELECTOR: 'userBadgeSelectorWidget',
    VIP_BUY: 'vipBuyWidget',
    VIP_GIFT: 'vipGiftWidget',
    WARNING: 'warningWidget',
    FIRST_PRODUCT_AUTO_SELECTOR: 'firstProductAutoSelectorWidget',
} as const;

/** A widget's container name, which is also its id in the registry. */
export type CatalogWidgetId = typeof CatalogWidgetEnum[keyof typeof CatalogWidgetEnum];
