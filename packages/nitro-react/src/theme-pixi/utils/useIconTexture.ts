import { Rectangle, Texture } from 'pixi.js';
import { useMemo } from 'react';

import { useTextureFromUrl } from './usePixiTexture';
import type { SpriteFrame } from './useSpriteFrameTexture';

/**
 * Discrete-PNG icon registry mirroring theme/icons.css (one image file per icon, as opposed
 * to the habbo-icons.css spritesheet below). Every `.icon-xxx { background(-image): url(...);
 * width: ...; height: ... }` rule in that file is transcribed here 1:1, keyed by the same
 * class name theme/NitroIcon.tsx would receive. Where a class name is declared twice in the
 * CSS (only `.icon-cog` is, with two different images), the later declaration wins, matching
 * CSS cascade order. `.icon-currency`'s three DOM modifier classes (`.credits`/`.duckets`/
 * `.diamonds`, applied as `icon-currency ${type}` via a plain string `icon` prop in
 * theme/ActivityPointsView.tsx - a DOM-only compound-className pattern IconKey's discrete
 * string union can't represent) are flattened into their own keys here instead.
 */
const ICON_ASSETS = {
    'icon-catalog': { url: '/assets/flash/toolbar/icons/catalog.png', width: 37, height: 37 },
    'icon-game': { url: '/assets/flash/toolbar/icons/game.png', width: 44, height: 25 },
    'icon-rooms': { url: '/assets/flash/toolbar/icons/rooms.png', width: 44, height: 30 },
    'icon-progression': { url: '/assets/flash/toolbar/icons/progression.png', width: 32, height: 35 },
    'icon-builders-club': { url: '/assets/flash/toolbar/icons/buildersclub.png', width: 32, height: 33 },
    'icon-progression-introduction': { url: '/assets/flash/toolbar/icons/progression-menu/introduction.png', width: 33, height: 32 },
    'icon-progression-daily-tasks': { url: '/assets/flash/toolbar/icons/progression-menu/daily_tasks.png', width: 32, height: 30 },
    'icon-progression-tasks': { url: '/assets/flash/toolbar/icons/progression-menu/tasks.png', width: 32, height: 30 },
    'icon-progression-leaderboard': { url: '/assets/flash/toolbar/icons/progression-menu/leaderboard.png', width: 25, height: 25 },
    'icon-me-collectibles': { url: '/assets/flash/toolbar/icons/me-menu/collectibles.png', width: 32, height: 30 },
    'icon-wired': { url: '/assets/flash/toolbar/icons/wired.png', width: 40, height: 40 },
    'icon-house': { url: '/assets/flash/toolbar/icons/house.png', width: 32, height: 30 },
    'icon-inventory': { url: '/assets/flash/toolbar/icons/inventory.png', width: 44, height: 41 },
    'icon-modtools': { url: '/assets/flash/toolbar/icons/modtools.png', width: 29, height: 34 },
    'icon-friendall': { url: '/assets/flash/toolbar/icons/friend_all.png', width: 32, height: 33 },
    'icon-friendsearch': { url: '/assets/flash/toolbar/icons/friend_search.png', width: 29, height: 33 },
    'icon-sendmessage': { url: '/assets/flash/toolbar/icons/sendmessage.png', width: 20, height: 21 },
    'icon-me-talents': { url: '/assets/flash/toolbar/icons/me-menu/talents.png', width: 32, height: 30 },
    'icon-me-helper-tool': { url: '/assets/flash/toolbar/icons/me-menu/helper-tool.png', width: 32, height: 30 },
    'icon-me-profile': { url: '/assets/flash/toolbar/icons/me-menu/profile.png', width: 32, height: 30 },
    'icon-me-forums': { url: '/assets/flash/toolbar/icons/me-menu/forums.png', width: 32, height: 30 },
    'icon-me-rooms': { url: '/assets/flash/toolbar/icons/me-menu/my-rooms.png', width: 30, height: 30 },
    'icon-progression-achievements': { url: '/assets/flash/toolbar/icons/progression-menu/achievements.png', width: 31, height: 30 },
    'icon-me-clothing': { url: '/assets/flash/toolbar/icons/me-menu/clothing.png', width: 27, height: 30 },
    'icon-cog': { url: '/assets/flash/icons/cog.png', width: 21, height: 21 },
    'icon-purse-disconnect': { url: '/assets/flash/purse/disconnect_icon.png', width: 13, height: 11 },
    'icon-help': { url: '/assets/flash/icons/help.png', width: 13, height: 23 },
    'icon-habbo': { url: '/assets/flash/toolbar/icons/habbo.png', width: 28, height: 28 },
    'icon-camera': { url: '/assets/flash/toolbar/icons/camera.png', width: 38, height: 45 },
    'icon-me-circle': { url: '/assets/flash/toolbar/icons/me_circle.png', width: 45, height: 45 },
    'icon-message': { url: '/assets/flash/toolbar/icons/message.png', width: 36, height: 32 },
    'icon-wired-trigger': { url: '/assets/flash/wired/icon_trigger.png', width: 13, height: 14 },
    'icon-wired-condition': { url: '/assets/flash/wired/icon_condition.png', width: 13, height: 14 },
    'icon-wired-action': { url: '/assets/flash/wired/icon_action.png', width: 13, height: 14 },
    'chatstyles-icon': { url: '/assets/flash/chat/styles-icon.png', width: 17, height: 19 },
    'pencil-icon': { url: '/assets/flash/infostand/pencil-icon.png', width: 17, height: 18 },
    'disk-icon': { url: '/assets/flash/infostand/disk-icon.png', width: 14, height: 14 },
    'disk-creator': { url: '/assets/flash/infostand/disk-creator.png', width: 14, height: 14 },
    'trade-locked-icon': { url: '/assets/flash/inventory/trading/locked-icon.png', width: 29, height: 43 },
    'trade-unlocked-icon': { url: '/assets/flash/inventory/trading/unlocked-icon.png', width: 29, height: 43 },
    'modtool-room-icon': { url: '/assets/flash/modtool/room.png', width: 20, height: 15 },
    'modtool-chatlog-icon': { url: '/assets/flash/modtool/chatlog.gif', width: 20, height: 15 },
    'modtool-user-icon': { url: '/assets/flash/modtool/user.gif', width: 20, height: 15 },
    'modtool-reports-icon': { url: '/assets/flash/modtool/reports.png', width: 20, height: 15 },
    'modtool-wrench-icon': { url: '/assets/flash/modtool/wrench.gif', width: 20, height: 15 },
    'modtool-key-icon': { url: '/assets/flash/modtool/key.gif', width: 20, height: 15 },
    'icon-catalogue-hc_small': { url: '/assets/flash/catalog/hc_small.png', width: 31, height: 17 },
    'icon-catalogue-hc_big': { url: '/assets/flash/catalog/hc_big.png', width: 68, height: 40 },
    'icon-sign-exclamation': { url: '/assets/flash/icons/sign-exclamation.png', width: 7, height: 17 },
    'icon-lock-open': { url: '/assets/flash/inventory/lock_open.png', width: 29, height: 43 },
    'icon-lock-locked': { url: '/assets/flash/inventory/lock_locked.png', width: 36, height: 44 },
    'icon-confirmed': { url: '/assets/flash/inventory/confirmed.png', width: 18, height: 18 },
    'icon-sign-heart': { url: '/assets/flash/icons/sign-heart.png', width: 15, height: 13 },
    'icon-sign-red': { url: '/assets/flash/icons/sign-red.png', width: 11, height: 19 },
    'icon-sign-yellow': { url: '/assets/flash/icons/sign-yellow.png', width: 11, height: 19 },
    'icon-sign-skull': { url: '/assets/flash/icons/sign-skull.png', width: 12, height: 12 },
    'icon-sign-smile': { url: '/assets/flash/icons/sign-smile.png', width: 7, height: 14 },
    'icon-sign-soccer': { url: '/assets/flash/icons/sign-soccer.png', width: 20, height: 20 },
    'icon-house-small': { url: '/assets/flash/icons/house-small.png', width: 19, height: 14 },
    'icon-favourite-room-active': { url: '/assets/flash/icons/favourite-room-active.png', width: 14, height: 14 },
    'icon-favourite-room-inactive': { url: '/assets/flash/icons/favourite-room-inactive.png', width: 12, height: 11 },
    'icon-room-promote': { url: '/assets/flash/icons/room-promote.png', width: 16, height: 19 },
    'icon-notification_arrow_left': { url: '/assets/flash/notifications/notification_arrow_left.png', width: 18, height: 19 },
    'icon-notification_arrow_down': { url: '/assets/flash/notifications/notification_arrow_down.png', width: 18, height: 19 },
    'icon-nitro-card-header-close': { url: '/assets/flash/messenger/close.png', width: 20, height: 20 },
    'icon-group_icon_room': { url: '/assets/flash/groups/icons/group_icon_room.png', width: 21, height: 16 },
    'icon-camera-small': { url: '/assets/flash/icons/camera-small.png', width: 17, height: 15 },
    'icon-report-room': { url: '/assets/flash/room/report-room.png', width: 19, height: 19 },
    'icon-small-room': { url: '/assets/flash/icons/small-room.png', width: 17, height: 16 },
    'icon-chat-history': { url: '/assets/flash/icons/chat-history.png', width: 17, height: 21 },
    'icon-room-link': { url: '/assets/flash/icons/room-link.png', width: 17, height: 15 },
    'icon-zoom-more': { url: '/assets/flash/icons/zoom-more.png', width: 12, height: 22 },
    'icon-zoom-less': { url: '/assets/flash/icons/zoom-less.png', width: 12, height: 22 },
    'icon-like-room': { url: '/assets/flash/icons/like-room.png', width: 20, height: 22 },
    'icon-link-room': { url: '/assets/flash/room-info/link_icon.png', width: 16, height: 14 },
    'icon-arrows': { url: '/assets/flash/icons/arrows.png', width: 17, height: 15 },
    'icon-context-arrow-left': { url: '/assets/flash/room/arrow-left.png', width: 5, height: 10 },
    'icon-context-arrow-right': { url: '/assets/flash/room/arrow-right.png', width: 5, height: 10 },
    'icon-accept-check': { url: '/assets/flash/buttons/accept.png', width: 16, height: 13 },
    'icon-sound-off': { url: '/assets/flash/settings/sound_off.png', width: 29, height: 22 },
    'icon-sound-off-active': { url: '/assets/flash/settings/sound_off_active.png', width: 29, height: 22 },
    'icon-sound-on': { url: '/assets/flash/settings/sound_on.png', width: 29, height: 22 },
    'icon-sound-on-active': { url: '/assets/flash/settings/sound_on_active.png', width: 29, height: 22 },
    'icon-decline-x': { url: '/assets/flash/buttons/decline.png', width: 13, height: 13 },
    'icon-camera-colormatrix': { url: '/assets/flash/icons/camera-colormatrix.png', width: 32, height: 21 },
    'icon-camera-composite': { url: '/assets/flash/icons/camera-composite.png', width: 32, height: 21 },
    'icon-pen': { url: '/assets/flash/boxes/card/pen.png', width: 17, height: 18 },
    'icon-clear': { url: '/assets/flash/catalogue/x_icon.png', width: 11, height: 11 },
    'icon-nav-plus': { url: '/assets/flash/navigator/plus.png', width: 9, height: 9 },
    'icon-nav-minus': { url: '/assets/flash/navigator/minus.png', width: 9, height: 9 },
    'icon-nav-inline': { url: '/assets/flash/navigator/inline_view.png', width: 11, height: 11 },
    'icon-nav-thumbnail': { url: '/assets/flash/navigator/thumbnail_view.png', width: 11, height: 11 },
    'icon-pf-online': { url: '/assets/flash/profile/icons/online.gif', width: 40, height: 16 },
    'icon-pf-offline': { url: '/assets/flash/profile/icons/offline.png', width: 39, height: 16 },
    'icon-small-coin': { url: '/assets/flash/catalogue/small_coin.png', width: 11, height: 11 },
    'icon-small-5': { url: '/assets/flash/catalogue/small_diamond.png', width: 11, height: 11 },
    'icon-small-0': { url: '/assets/flash/catalogue/small_ducket.png', width: 11, height: 11 },
    'icon-pf-tick': { url: '/assets/flash/profile/icons/tick.png', width: 11, height: 10 },
    'icon-group-type-0': { url: '/assets/flash/groups/icons/grouptype_icon_0.png', width: 16, height: 16 },
    'icon-group-type-1': { url: '/assets/flash/groups/icons/grouptype_icon_1.png', width: 16, height: 16 },
    'icon-group-type-2': { url: '/assets/flash/groups/icons/grouptype_icon_2.png', width: 16, height: 16 },
    'icon-group-decorate': { url: '/assets/flash/groups/icons/group_decorate_icon.png', width: 15, height: 15 },
    'icon-group-member': { url: '/assets/flash/groups/icons/group_icon_big_member.png', width: 20, height: 20 },
    'icon-group-admin': { url: '/assets/flash/groups/icons/group_icon_big_admin.png', width: 20, height: 20 },
    'icon-group-owner': { url: '/assets/flash/groups/icons/group_icon_big_owner.png', width: 20, height: 20 },
    'icon-context-menu-arrow-down': { url: '/assets/flash/room/context_menu_arrow.png', width: 10, height: 5 },
    'icon-context-menu-arrow-up': { url: '/assets/flash/room/context_menu_arrow_up.png', width: 10, height: 5 },
    'icon-group-favorite': { url: '/assets/flash/groups/icons/group_favorite.png', width: 14, height: 14 },
    'icon-group-not-favorite': { url: '/assets/flash/groups/icons/group_notfavorite.png', width: 14, height: 14 },
    'icon-group-small-admin': { url: '/assets/flash/groups/icons/group_icon_admin.png', width: 11, height: 13 },
    'icon-group-small-not-admin': { url: '/assets/flash/groups/icons/group_icon_not_admin.png', width: 11, height: 13 },
    'icon-group-small-owner': { url: '/assets/flash/groups/icons/group_icon_small_owner.png', width: 13, height: 13 },
    'icon-navigator-info': { url: '/assets/flash/navigator/icons/info.png', width: 18, height: 18 },
    'icon-navigator-room-locked': { url: '/assets/flash/navigator/icons/room_locked.png', width: 13, height: 16 },
    'icon-navigator-room-password': { url: '/assets/flash/navigator/icons/room_password.png', width: 13, height: 16 },
    'icon-navigator-room-invisible': { url: '/assets/flash/navigator/icons/room_invisible.png', width: 13, height: 16 },
    'icon-navigator-room-group': { url: '/assets/flash/navigator/icons/room_group.png', width: 13, height: 11 },
    'icon-youtube-next': { url: '/assets/flash/room-widgets/youtube-widget/next.png', width: 21, height: 16 },
    'icon-youtube-prev': { url: '/assets/flash/room-widgets/youtube-widget/prev.png', width: 21, height: 16 },
    'icon-hc-banner': { url: '/assets/flash/catalog/hc_big.png', width: 68, height: 40 },
    'icon-set-tile': { url: '/assets/flash/floorplaneditor/icon-tile-set.png', width: 40, height: 40 },
    'icon-unset-tile': { url: '/assets/flash/floorplaneditor/icon-tile-unset.png', width: 40, height: 40 },
    'icon-increase-height': { url: '/assets/flash/floorplaneditor/icon-tile-up.png', width: 40, height: 40 },
    'icon-decrease-height': { url: '/assets/flash/floorplaneditor/icon-tile-down.png', width: 40, height: 40 },
    'icon-set-door': { url: '/assets/flash/floorplaneditor/icon-door.png', width: 40, height: 40 },
    'icon-door-direction-0': { url: '/assets/flash/floorplaneditor/door-direction-0.png', width: 80, height: 45 },
    'icon-door-direction-1': { url: '/assets/flash/floorplaneditor/door-direction-1.png', width: 80, height: 45 },
    'icon-door-direction-2': { url: '/assets/flash/floorplaneditor/door-direction-2.png', width: 80, height: 45 },
    'icon-door-direction-3': { url: '/assets/flash/floorplaneditor/door-direction-3.png', width: 80, height: 45 },
    'icon-door-direction-4': { url: '/assets/flash/floorplaneditor/door-direction-4.png', width: 80, height: 45 },
    'icon-door-direction-5': { url: '/assets/flash/floorplaneditor/door-direction-5.png', width: 80, height: 45 },
    'icon-door-direction-6': { url: '/assets/flash/floorplaneditor/door-direction-6.png', width: 80, height: 45 },
    'icon-door-direction-7': { url: '/assets/flash/floorplaneditor/door-direction-7.png', width: 80, height: 45 },
    'icon-tickets': { url: '/assets/flash/modtools/tickets.png', width: 17, height: 17 },
    'icon-user': { url: '/assets/flash/icons/user.png', width: 18, height: 19 },
    'icon-profile-house': { url: '/assets/flash/infostand/house_icon.png', width: 11, height: 10 },
    'icon-room-history-back-enabled': { url: '/assets/flash/icons/room-history-back-enabled.png', width: 34, height: 36 },
    'icon-room-history-back-disabled': { url: '/assets/flash/icons/room-history-back-disabled.png', width: 34, height: 36 },
    'icon-room-history-enabled': { url: '/assets/flash/icons/room-history-enabled.png', width: 33, height: 35 },
    'icon-room-history-disabled': { url: '/assets/flash/icons/room-history-disabled.png', width: 33, height: 35 },
    'icon-room-history-next-enabled': { url: '/assets/flash/icons/room-history-next-enabled.png', width: 34, height: 38 },
    'icon-room-history-next-disabled': { url: '/assets/flash/icons/room-history-next-disabled.png', width: 34, height: 38 },
    'icon-search_save': { url: '/assets/flash/navigator/saves-search/search_save.png', width: 18, height: 18 },
    'icon-hc_mini': { url: '/assets/flash/catalog/hc_mini.png', width: 18, height: 18 },
    'icon-sheet': { url: '/assets/flash/hotelview/halloffame/sheet.png', width: 16, height: 12 },
    'icon-tiles': { url: '/assets/flash/navigator/room-creator/tiles.png', width: 16, height: 12 },
    'icon-tiles_room_selected': { url: '/assets/flash/navigator/room-creator/tiles_room_selected.png', width: 16, height: 12 },
    'icon-friendlist_arrow_black_down': { url: '/assets/flash/friendlist/friendlist_arrow_black_down.png', width: 16, height: 12 },
    'icon-friendlist_arrow_black_right': { url: '/assets/flash/friendlist/friendlist_arrow_black_right.png', width: 16, height: 12 },
    'icon-friendlist_arrow_white_down': { url: '/assets/flash/friendlist/friendlist_arrow_white_down.png', width: 16, height: 12 },
    'icon-friendlist_arrow_white_right': { url: '/assets/flash/friendlist/friendlist_arrow_white_right.png', width: 16, height: 12 },
    'icon-friend_message': { url: '/assets/flash/friendlist/friend_message.png', width: 16, height: 14 },
    'icon-hc_gift_monthly': { url: '/assets/flash/habboclub/hc_gift_monthly.png', width: 16, height: 14 },
    'icon-chevron_left_gift': { url: '/assets/flash/catalogue/chevron_left_gift.png', width: 10, height: 10 },
    'icon-chevron_right_gift': { url: '/assets/flash/catalogue/chevron_right_gift.png', width: 10, height: 10 },
    'icon-credits': { url: '/assets/flash/catalogue/credits.png', width: 21, height: 21 },
    'icon-recyclable': { url: '/assets/flash/inventory/allow_recycle.png', width: 21, height: 21 },
    'icon-not-recyclable': { url: '/assets/flash/inventory/not_allow_recycle.png', width: 29, height: 21 },
    'icon-tradeable': { url: '/assets/flash/inventory/allow_trade.png', width: 31, height: 15 },
    'icon-not-tradeable': { url: '/assets/flash/inventory/not_allow_trade.png', width: 40, height: 16 },
    'icon-disconnect': { url: '/assets/flash/purse/disconnect.png', width: 13, height: 11 },
    'icon-settings': { url: '/assets/flash/purse/settings.png', width: 12, height: 12 },
    'icon-hc-small': { url: '/assets/flash/purse/hc.png', width: 15, height: 16 },
    'icon-earnings-small': { url: '/assets/flash/purse/earnings.png', width: 15, height: 15 },
    'icon-arrow-right-black': { url: '/assets/flash/icons/arrow-right-black.png', width: 5, height: 9 },
    'icon-arrow-down-black': { url: '/assets/flash/icons/arrow-down-black.png', width: 9, height: 5 },
    'icon-close-gray': { url: '/assets/flash/icons/close-gray.png', width: 9, height: 9 },
    'icon-homepage-outline': { url: '/assets/flash/friends/homepage.png', width: 13, height: 11 },
    'icon-room-invite': { url: '/assets/flash/friends/room-invite.png', width: 19, height: 13 },
    'icon-search-outline': { url: '/assets/flash/friends/search.png', width: 12, height: 12 },
    'icon-trash-outline': { url: '/assets/flash/friends/trash.png', width: 13, height: 13 },
    'icon-profile-small': { url: '/assets/flash/friends/icon-profile-sm.png', width: 13, height: 11 },
    'icon-message-small': { url: '/assets/flash/friends/message.png', width: 16, height: 14 },
    'icon-follow': { url: '/assets/flash/friends/icon-follow.png', width: 16, height: 14 },
    'icon-add': { url: '/assets/flash/friends/icon-add.png', width: 16, height: 15 },
    'icon-heart-relationship': { url: '/assets/flash/friends/icon-heart.png', width: 16, height: 14 },
    'icon-smile-relationship': { url: '/assets/flash/friends/icon-smile.png', width: 16, height: 14 },
    'icon-bobba-relationship': { url: '/assets/flash/friends/icon-bobba.png', width: 16, height: 14 },
    'catalog-icon-clear': { url: '/assets/catalog/x_icon.png', width: 11, height: 11 },
    'catalog-small-coin': { url: '/assets/catalog/small_coin.png', width: 11, height: 11 },
    'catalog-small-diamond': { url: '/assets/catalog/small_diamong.png', width: 11, height: 11 },
    'catalog-small-ducket': { url: '/assets/catalog/small_ducket.png', width: 11, height: 11 },
    'icon-currency-credits': { url: '/assets/flash/purse/-1.png', width: 15, height: 15 },
    'icon-currency-duckets': { url: '/assets/flash/purse/0.png', width: 15, height: 15 },
    'icon-currency-diamonds': { url: '/assets/flash/purse/5.png', width: 15, height: 15 },
} as const satisfies Record<string, { url: string, width: number, height: number }>;

/**
 * theme/habbo-icons.css's shared spritesheet. Unlike icons.css and the rest of the button/
 * border/etc. asset families in theme/utils/themeUrls.ts, both icons.css and habbo-icons.css
 * reference their images via plain literal `url(...)` paths - not the `var(--x-src)` custom-
 * property indirection THEME_URLS exists to resolve - and habbo-icons.png itself has no
 * THEME_URLS entry at all. So this is addressed directly by its raw asset path below instead
 * of through a theme key, and sliced with the same offset/size Rectangle technique
 * useSpriteFrameTexture.ts uses for closebutton.png (see useHabboIconFrame below) rather than
 * reusing that hook outright, since its signature resolves its texture key through THEME_URLS.
 */
const HABBO_ICONS_URL = '/assets/icons/habbo-icons.png';

const HABBO_ICON_FRAMES = {
    'icon-arrow-down': { x: 0, y: 0, width: 9, height: 10 },
    'icon-arrow-up': { x: 10, y: 0, width: 9, height: 10 },
    'icon-arrow-left': { x: 20, y: 0, width: 10, height: 9 },
    'icon-arrow-right': { x: 31, y: 0, width: 10, height: 9 },
    'icon-tri-arrow-left': { x: 42, y: 0, width: 5, height: 10 },
    'icon-tri-arrow-right': { x: 48, y: 0, width: 5, height: 10 },
    'icon-tri-arrow-up': { x: 54, y: 0, width: 10, height: 5 },
    'icon-tri-arrow-down': { x: 54, y: 6, width: 10, height: 5 },
    'icon-accept': { x: 65, y: 0, width: 16, height: 13 },
    'icon-decline': { x: 82, y: 0, width: 13, height: 13 },
    'icon-coin': { x: 0, y: 49, width: 27, height: 24 },
    'icon-club-small': { x: 96, y: 0, width: 16, height: 10 },
    'icon-vip-small': { x: 113, y: 0, width: 19, height: 10 },
    'icon-club-square': { x: 0, y: 16, width: 16, height: 16 },
    'icon-vip-square': { x: 17, y: 16, width: 16, height: 16 },
    'icon-club-square-big': { x: 32, y: 49, width: 37, height: 37 },
    'icon-vip-square-big': { x: 70, y: 49, width: 37, height: 37 },
    'icon-club-gigantic': { x: 108, y: 49, width: 68, height: 41 },
    'icon-vip-gigantic': { x: 177, y: 49, width: 85, height: 41 },
    'icon-pixel': { x: 34, y: 16, width: 23, height: 26 },
    'icon-clear-text-field': { x: 133, y: 0, width: 13, height: 13 },
    'icon-extended-profile': { x: 149, y: 0, width: 13, height: 11 },
    'icon-extended-profile-hover': { x: 165, y: 0, width: 13, height: 11 },
    'icon-loading-1': { x: 181, y: 0, width: 15, height: 15 },
    'icon-loading-2': { x: 197, y: 0, width: 15, height: 15 },
    'icon-loading-3': { x: 213, y: 0, width: 15, height: 15 },
    'icon-loading-4': { x: 229, y: 0, width: 15, height: 15 },
    'icon-snowflake': { x: 57, y: 16, width: 21, height: 20 },
    'icon-lock': { x: 78, y: 16, width: 20, height: 24 },
    'icon-valentines': { x: 99, y: 16, width: 18, height: 18 },
    'icon-horseshoe-big': { x: 116, y: 16, width: 22, height: 22 },
    'icon-horseshoe-small': { x: 244, y: 0, width: 14, height: 14 },
    'icon-ducket-big': { x: 160, y: 16, width: 22, height: 22 },
    'icon-ducket-small': { x: 272, y: 0, width: 14, height: 14 },
    'icon-credit-big': { x: 138, y: 16, width: 22, height: 22 },
    'icon-credit-small': { x: 258, y: 0, width: 14, height: 14 },
    'icon-subscription-point-big': { x: 182, y: 16, width: 22, height: 22 },
    'icon-subscription-point-small': { x: 286, y: 0, width: 14, height: 14 },
    'icon-nut-big': { x: 204, y: 17, width: 22, height: 20 },
    'icon-nut-small': { x: 301, y: 0, width: 14, height: 14 },
    'icon-nut-credit-combo': { x: 228, y: 17, width: 53, height: 20 },
    'icon-diamond-big': { x: 283, y: 18, width: 19, height: 19 },
    'icon-diamond-small': { x: 316, y: 1, width: 11, height: 11 },
    'icon-diamond-credit-combo': { x: 305, y: 17, width: 55, height: 20 },
    'icon-star-big': { x: 360, y: 16, width: 22, height: 22 },
    'icon-star-small': { x: 328, y: 0, width: 14, height: 14 },
    'icon-cloud-small': { x: 343, y: 1, width: 14, height: 12 },
    'icon-cloud-big': { x: 384, y: 18, width: 19, height: 20 },
    'icon-cloud-credit-combo': { x: 405, y: 17, width: 50, height: 20 },
    'icon-plain-pumpkin-small': { x: 358, y: 0, width: 13, height: 13 },
    'icon-plain-pumpkin-big': { x: 456, y: 16, width: 22, height: 21 },
    'icon-plain-pumpkin-credit-combo': { x: 479, y: 16, width: 54, height: 21 },
    'icon-unknown-16x16': { x: 0, y: 91, width: 16, height: 16 },
    'icon-loyalty-big': { x: 534, y: 16, width: 22, height: 22 },
    'icon-loyalty-small': { x: 371, y: 0, width: 14, height: 14 },
    'icon-seashell': { x: 433, y: 40, width: 20, height: 20 },
    'icon-silver-big': { x: 512, y: 39, width: 20, height: 20 },
    'icon-silver-small': { x: 385, y: 1, width: 11, height: 11 },
    'icon-flower-big': { x: 458, y: 41, width: 19, height: 19 },
    'icon-flower-small': { x: 398, y: 1, width: 12, height: 12 },
    'icon-candy-big': { x: 481, y: 42, width: 18, height: 16 },
    'icon-candy-small': { x: 412, y: 1, width: 12, height: 10 },
    'icon-popsicle-big': { x: 419, y: 41, width: 11, height: 19 },
    'icon-popsicle-small': { x: 426, y: 1, width: 8, height: 12 },
    'icon-goldfish-big': { x: 536, y: 42, width: 19, height: 15 },
    'icon-goldfish-small': { x: 436, y: 1, width: 12, height: 10 },
    'icon-balloon-big': { x: 559, y: 39, width: 13, height: 18 },
    'icon-balloon-small': { x: 451, y: 1, width: 9, height: 12 },
    'icon-pumpkin-big': { x: 574, y: 39, width: 18, height: 18 },
    'icon-pumpkin-small': { x: 462, y: 0, width: 12, height: 12 },
    'icon-emerald-big': { x: 594, y: 39, width: 20, height: 20 },
    'icon-emerald-small': { x: 476, y: 0, width: 12, height: 12 },
    'icon-easter-egg-big': { x: 616, y: 39, width: 14, height: 17 },
    'icon-easter-egg-small': { x: 490, y: 0, width: 10, height: 12 },
    'icon-truffle-big': { x: 553, y: 19, width: 16, height: 16 },
    'icon-truffle-small': { x: 501, y: 0, width: 12, height: 12 },
    'icon-blue-balloon-big': { x: 571, y: 18, width: 12, height: 18 },
    'icon-blue-balloon-small': { x: 514, y: 0, width: 9, height: 12 },
    'icon-mushroom-big': { x: 584, y: 18, width: 16, height: 18 },
    'icon-mushroom-small': { x: 524, y: 0, width: 12, height: 12 },
} as const satisfies Record<string, SpriteFrame>;

export type IconKey = keyof typeof ICON_ASSETS | keyof typeof HABBO_ICON_FRAMES;

/** Slices one icon's sub-rect out of the shared habbo-icons.png texture. */
const useHabboIconFrame = (frame: SpriteFrame | undefined): Texture | undefined => {
    const baseTexture = useTextureFromUrl(frame ? HABBO_ICONS_URL : undefined);

    return useMemo(() => {
        if (!baseTexture || !frame) return undefined;

        return new Texture({
            source: baseTexture.source,
            frame: new Rectangle(baseTexture.frame.x + frame.x, baseTexture.frame.y + frame.y, frame.width, frame.height),
        });
    }, [baseTexture, frame]);
};

/**
 * Resolves an IconKey to a Pixi texture, transparently dispatching to whichever of the two
 * registries above the key belongs to - discrete-PNG (ICON_ASSETS) or spritesheet-frame
 * (HABBO_ICON_FRAMES). The two registries' key sets are disjoint, so for any given `icon`
 * only one branch below ever has real data; the other hook call is simply handed `undefined`
 * and returns `undefined` without doing any work, so call order stays unconditional either way.
 */
export const useIconTexture = (icon: IconKey): { texture: Texture | undefined, width: number, height: number } => {
    const discreteAsset: { url: string, width: number, height: number } | undefined = (ICON_ASSETS as Record<string, { url: string, width: number, height: number }>)[icon];
    const spriteFrame: SpriteFrame | undefined = (HABBO_ICON_FRAMES as Record<string, SpriteFrame>)[icon];

    const discreteTexture = useTextureFromUrl(discreteAsset?.url);
    const spriteTexture = useHabboIconFrame(spriteFrame);

    if (discreteAsset) return { texture: discreteTexture, width: discreteAsset.width, height: discreteAsset.height };

    if (spriteFrame) return { texture: spriteTexture, width: spriteFrame.width, height: spriteFrame.height };

    return { texture: undefined, width: 0, height: 0 };
};
