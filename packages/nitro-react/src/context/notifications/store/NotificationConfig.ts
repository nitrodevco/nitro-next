/**
 * `habbo_notifications_config_xml` from the `HabboNotifications` asset library, carried over by
 * hand: the bubble styles `SingularNotificationController.addItem` looks a type up in, and the
 * timing of each layout's view (`HabboNotificationItemView` reads these as `_viewConfig`).
 *
 * The `position_*` keys of the XML are left out: nothing in the Flash client reads them - the
 * bubbles are always stacked from the top right, under the toolbar's extension view.
 */

/** Which hand-written layout draws a style: the XML's `customlayout`, `default` when it names none. */
export type NotificationLayoutName = 'default' | 'friendonline' | 'treasure_hunt' | 'wired';

export interface NotificationStyleConfig {
    /** `icon`: the library bitmap shown when the caller passes no image of its own. */
    icon?: NotificationAssetName;
    /** `internallink`: where a click leads when the caller passes no link of its own. */
    internalLink?: string;
    /** `customlayout` + `customview`, which the XML always sets as a pair. */
    layout?: Exclude<NotificationLayoutName, 'default'>;
}

/**
 * The `styles` map. `addItem` drops a notification whose type is not a key here, which in Flash
 * silently loses `NotificationType.RESPECT` (`"respect"`) and `"buyfurni"` - both are constants
 * with callers and no style. They are left out of `NotificationStyleName` so that a caller here
 * finds out at compile time instead.
 *
 * `nft_opening` is the one style of the XML that is not here: its layout is built around the
 * `product_icon` window widget and an `IProductDisplayInfo` handed over in the extra data, both
 * of which belong to the collectibles catalogue, which has not been ported.
 */
export const NOTIFICATION_STYLES = {
    achievement: { internalLink: 'questengine/achievements' },
    badge_received: { internalLink: 'inventory/open/badges' },
    habbicon_received: { internalLink: 'habbicons/open' },
    receivedcredits: { icon: 'if_icon_temp_png' },
    friendonline: { layout: 'friendonline' },
    treasure_hunt: { layout: 'treasure_hunt' },
    wired: { layout: 'wired' },
    friendoffline: { internalLink: 'friendlist/open' },
    thirdpartyfriendonline: { internalLink: 'friendlist/open' },
    thirdpartyfriendoffline: { internalLink: 'friendlist/open' },
    info: { icon: 'if_icon_temp_png' },
    club: { icon: 'if_icon_hc_png' },
    vip: { icon: 'if_icon_vip_png' },
    recyclerok: { icon: 'if_icon_recycler_png' },
    soundmachine: {},
    ltd: { icon: 'if_icon_ltd_png' },
    petlevel: { internalLink: 'inventory/open/pets' },
    clubgift: {},
    earning: { icon: 'if_icon_earning_png' },
    roommessagesposted: { internalLink: 'navigator/goto/' },
} as const satisfies Record<string, NotificationStyleConfig>;

export type NotificationStyleName = keyof typeof NOTIFICATION_STYLES;

export interface NotificationViewConfig {
    timeFadeIn: number;
    /** How long the bubble stays once faded in; `NotificationOptions.timeDisplay` overrides it. */
    timeDisplay: number;
    timeFadeOut: number;
    timeSwipeOut: number;
    distanceSwipeOut: number;
    /**
     * `height`: the room the bubble takes in the stack, whatever its window measures. A view
     * without it (`wired_view`) is stacked by the height its window really has.
     */
    height?: number;
}

/** The `view` map and the four `*_view` maps the custom layouts name. */
export const NOTIFICATION_VIEWS: Record<NotificationLayoutName, NotificationViewConfig> = {
    default: { timeFadeIn: 1000, timeDisplay: 15000, timeFadeOut: 1000, timeSwipeOut: 300, distanceSwipeOut: 340, height: 70 },
    friendonline: { timeFadeIn: 800, timeDisplay: 8000, timeFadeOut: 800, timeSwipeOut: 300, distanceSwipeOut: 340, height: 60 },
    treasure_hunt: { timeFadeIn: 800, timeDisplay: 15000, timeFadeOut: 800, timeSwipeOut: 300, distanceSwipeOut: 340, height: 90 },
    wired: { timeFadeIn: 800, timeDisplay: 10000, timeFadeOut: 800, timeSwipeOut: 300, distanceSwipeOut: 340 },
};

/**
 * The bitmaps of the `HabboNotifications` asset library, by the name Flash callers pass as
 * `addItem`'s third argument (`"icon_wired_notification_png"`, `"chests_icon_successful"`).
 * Each is a file under `public/assets/notifications`, for `LayoutImage(`notifications/<file>`)`.
 * `moderation_badge_png` is left out: it belongs to the moderation alert dialogs, not to a bubble.
 */
export const NOTIFICATION_ASSETS = {
    if_icon_temp_png: 'notifications_if_icon_temp.png',
    if_icon_hc_png: 'notifications_if_icon_hc.png',
    if_icon_vip_png: 'notifications_if_icon_vip.png',
    if_icon_recycler_png: 'notifications_if_icon_recycler.png',
    if_icon_friend_bg_blue_png: 'notifications_if_icon_friend_bg_blue.png',
    if_icon_duckets_png: 'notifications_if_icon_duckets.png',
    if_icon_earning_png: 'notifications_if_icon_earning.png',
    if_icon_loyalty_png: 'notifications_if_icon_loyalty.png',
    if_icon_ltd_png: 'notifications_if_icon_ltd.png',
    if_icon_diamond_png: 'notifications_if_icon_diamond.png',
    icon_curator_stamp_large_png: 'notifications_icon_curator_stamp_large.png',
    icon_daily_tasks_png: 'notifications_icon_daily_tasks.png',
    icon_wired_error_png: 'notifications_icon_wired_error.png',
    icon_wired_notification_png: 'notifications_icon_wired_notification.png',
    icon_wired_warning_png: 'notifications_icon_wired_warning.png',
    chests_icon_chest_capacity_exceeds: 'notifications_chests_icon_chest_capacity_exceeds.png',
    chests_icon_chest_donation: 'notifications_chests_icon_chest_donation.png',
    chests_icon_chest_empty: 'notifications_chests_icon_chest_empty.png',
    chests_icon_chest_full: 'notifications_chests_icon_chest_full.png',
    chests_icon_chest_wired_transaction: 'notifications_chests_icon_chest_wired_transaction.png',
    chests_icon_chest_withdraw: 'notifications_chests_icon_chest_withdraw.png',
    chests_icon_rejected: 'notifications_chests_icon_rejected.png',
    chests_icon_successful: 'notifications_chests_icon_successful.png',
    chests_icon_trading_error: 'notifications_chests_icon_trading_error.png',
} as const;

export type NotificationAssetName = keyof typeof NOTIFICATION_ASSETS;
