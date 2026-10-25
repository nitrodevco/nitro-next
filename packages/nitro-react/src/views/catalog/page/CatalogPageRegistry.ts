/**
 * The catalogue widgets - Flash's `CatalogPage.createWidget` switch: which component is the widget a
 * container of a page layout gets by its name (`CatalogWidgetEnum`).
 *
 * ## How a page is built
 *
 * `CatalogPageMessage` -> `registerCatalogHandlers` -> `showCatalogPage` (commands) puts a
 * `CatalogPage` in the store. `CatalogPageView` draws the page's layout template from
 * `habbo-catalog-com` (`layout_<code>`, or `old_layout_<code>` - `CatalogPage.createWindow`), mounts
 * the widget registered here for every container named after one, and once all have mounted
 * dispatches `WIDGETS_INITIALIZED` and selects the page's offer.
 *
 * ## Writing a widget
 *
 * A widget is a `CatalogWidgetProps` component that renders nothing. Its body is `init()`: subscribe
 * with `useCatalogWidgetEvent(page, CatalogWidgetEventEnum.X, handler)`, keep its fields as state,
 * dispatch with `page.events.dispatchEvent(...)`. What it shows it hands the page with
 * `useCatalogWidgetView({ template, bindings, arrange })` (`catalogWidgetView.ts`):
 *
 * - `template`: the view asset `attachWidgetView(widgetId)` builds into the container; omitted for a
 *   widget that binds the layout's own elements. In a container tagged `EMBEDDED` the layout's
 *   elements are the view whatever `template` says.
 * - `bindings`: what the widget's code sets (`findChildByName(...)`), by names inside its view (or its
 *   container); `''` is the view's root. Clones (`items`), clicks, captions, visibility.
 * - `arrange`: what it sizes and moves once laid out - `ItemGridCatalogWidget` fitting its view to its
 *   container (`fitWidgetView`).
 *
 * `init()` failing is the widget returning `undefined` views: the container stays as the layout has it.
 */
import { ComponentType } from 'react';

import { CatalogPage, CatalogWidgetEnum, CatalogWidgetId } from '#base/context/catalog';

import { CatalogActivityPointDisplayWidgetView } from './widgets/CatalogActivityPointDisplayWidgetView';
import { CatalogAddOnBadgeViewWidgetView } from './widgets/CatalogAddOnBadgeViewWidgetView';
import { CatalogBuilderAddonsWidgetView } from './widgets/CatalogBuilderAddonsWidgetView';
import { CatalogBuilderLoyaltyWidgetView } from './widgets/CatalogBuilderLoyaltyWidgetView';
import { CatalogBuilderSubscriptionWidgetView } from './widgets/CatalogBuilderSubscriptionWidgetView';
import { CatalogBuilderWidgetView } from './widgets/CatalogBuilderWidgetView';
import { CatalogBundleGridScrollWidgetView } from './widgets/CatalogBundleGridScrollWidgetView';
import { CatalogBuyGuildWidgetView } from './widgets/CatalogBuyGuildWidgetView';
import { CatalogClubBuyWidgetView } from './widgets/CatalogClubBuyWidgetView';
import { CatalogClubGiftWidgetView } from './widgets/CatalogClubGiftWidgetView';
import { CatalogColourGridWidgetView } from './widgets/CatalogColourGridWidgetView';
import { CatalogFeaturedItemsWidgetView } from './widgets/CatalogFeaturedItemsWidgetView';
import { CatalogFirstProductAutoSelectorWidgetView } from './widgets/CatalogFirstProductAutoSelectorWidgetView';
import { CatalogGuildBadgeViewWidgetView } from './widgets/CatalogGuildBadgeViewWidgetView';
import { CatalogGuildForumSelectorWidgetView, CatalogGuildSelectorWidgetView } from './widgets/CatalogGuildSelectorWidgetView';
import { CatalogItemGridWidgetView } from './widgets/CatalogItemGridWidgetView';
import { CatalogLimitedItemWidgetView } from './widgets/CatalogLimitedItemWidgetView';
import { CatalogLoyaltyVipBuyWidgetView } from './widgets/CatalogLoyaltyVipBuyWidgetView';
import { CatalogMarketPlaceOwnItemsWidgetView } from './widgets/CatalogMarketPlaceOwnItemsWidgetView';
import { CatalogMarketPlaceWidgetView } from './widgets/CatalogMarketPlaceWidgetView';
import { CatalogNewPetsWidgetView } from './widgets/CatalogNewPetsWidgetView';
import { CatalogPetPreviewWidgetView } from './widgets/CatalogPetPreviewWidgetView';
import { CatalogPetsWidgetView } from './widgets/CatalogPetsWidgetView';
import { CatalogProductViewWidgetView } from './widgets/CatalogProductViewWidgetView';
import { CatalogPurchaseWidgetView } from './widgets/CatalogPurchaseWidgetView';
import { CatalogRecolorableFurnitureWidgetView } from './widgets/CatalogRecolorableFurnitureWidgetView';
import { CatalogRecyclerPrizesWidgetView } from './widgets/CatalogRecyclerPrizesWidgetView';
import { CatalogRecyclerWidgetView } from './widgets/CatalogRecyclerWidgetView';
import { CatalogRedeemItemCodeWidgetView } from './widgets/CatalogRedeemItemCodeWidgetView';
import { CatalogRoomAdsWidgetView } from './widgets/CatalogRoomAdsWidgetView';
import { CatalogRoomPreviewWidgetView } from './widgets/CatalogRoomPreviewWidgetView';
import { CatalogSimplePriceWidgetView } from './widgets/CatalogSimplePriceWidgetView';
import { CatalogSoldLtdItemsWidgetView } from './widgets/CatalogSoldLtdItemsWidgetView';
import { CatalogSongDiskProductViewWidgetView } from './widgets/CatalogSongDiskProductViewWidgetView';
import { CatalogSpacesNewWidgetView } from './widgets/CatalogSpacesNewWidgetView';
import { CatalogSpecialInfoWidgetView } from './widgets/CatalogSpecialInfoWidgetView';
import { CatalogSpinnerWidgetView } from './widgets/CatalogSpinnerWidgetView';
import { CatalogTextInputWidgetView } from './widgets/CatalogTextInputWidgetView';
import { CatalogTotalPriceWidgetView } from './widgets/CatalogTotalPriceWidgetView';
import { CatalogTrophyWidgetView } from './widgets/CatalogTrophyWidgetView';
import { CatalogUserBadgeSelectorWidgetView } from './widgets/CatalogUserBadgeSelectorWidgetView';
import { CatalogVipBuyWidgetView, CatalogVipGiftWidgetView } from './widgets/CatalogVipBuyWidgetView';
import { CatalogWarningWidgetView } from './widgets/CatalogWarningWidgetView';

/** What a widget gets - Flash's `CatalogWidget.page`, and its container's `tags`. */
export interface CatalogWidgetProps {
    page: CatalogPage;
    tags: readonly string[];
}

/** Widget id -> its component. A widget with no component leaves its container empty. */
export const CATALOG_WIDGET_VIEWS: Partial<Record<CatalogWidgetId, ComponentType<CatalogWidgetProps>>> = {
    [CatalogWidgetEnum.ITEM_GRID]: CatalogItemGridWidgetView,
    [CatalogWidgetEnum.PRODUCT_VIEW]: CatalogProductViewWidgetView,
    [CatalogWidgetEnum.PURCHASE]: CatalogPurchaseWidgetView,
    [CatalogWidgetEnum.SPINNER]: CatalogSpinnerWidgetView,
    [CatalogWidgetEnum.TOTAL_PRICE]: CatalogTotalPriceWidgetView,
    [CatalogWidgetEnum.COLOUR_GRID]: CatalogColourGridWidgetView,
    [CatalogWidgetEnum.ACTIVITY_POINT_DISPLAY]: CatalogActivityPointDisplayWidgetView,
    [CatalogWidgetEnum.SPECIAL_INFO]: CatalogSpecialInfoWidgetView,
    [CatalogWidgetEnum.LIMITED_ITEM]: CatalogLimitedItemWidgetView,
    [CatalogWidgetEnum.SOLD_LIMITED_ITEMS]: CatalogSoldLtdItemsWidgetView,
    [CatalogWidgetEnum.BUNDLE_GRID_SCROLL]: CatalogBundleGridScrollWidgetView,
    [CatalogWidgetEnum.ADDON_BADGE_VIEW]: CatalogAddOnBadgeViewWidgetView,
    [CatalogWidgetEnum.SIMPLE_PRICE]: CatalogSimplePriceWidgetView,
    [CatalogWidgetEnum.FIRST_PRODUCT_AUTO_SELECTOR]: CatalogFirstProductAutoSelectorWidgetView,
    [CatalogWidgetEnum.WARNING]: CatalogWarningWidgetView,
    [CatalogWidgetEnum.USER_BADGE_SELECTOR]: CatalogUserBadgeSelectorWidgetView,
    [CatalogWidgetEnum.SONG_DISK_PRODUCT_VIEW]: CatalogSongDiskProductViewWidgetView,
    [CatalogWidgetEnum.TROPHY]: CatalogTrophyWidgetView,
    [CatalogWidgetEnum.TEXT_INPUT]: CatalogTextInputWidgetView,
    [CatalogWidgetEnum.SPACES_NEW]: CatalogSpacesNewWidgetView,
    [CatalogWidgetEnum.ROOM_PREVIEW]: CatalogRoomPreviewWidgetView,
    [CatalogWidgetEnum.BUILDER]: CatalogBuilderWidgetView,
    [CatalogWidgetEnum.BUILDER_ADDONS]: CatalogBuilderAddonsWidgetView,
    [CatalogWidgetEnum.BUILDER_LOYALTY]: CatalogBuilderLoyaltyWidgetView,
    [CatalogWidgetEnum.BUILDER_SUBSCRIPTION]: CatalogBuilderSubscriptionWidgetView,
    [CatalogWidgetEnum.FEATURED_ITEMS]: CatalogFeaturedItemsWidgetView,
    [CatalogWidgetEnum.REDEEM_ITEM_CODE]: CatalogRedeemItemCodeWidgetView,
    [CatalogWidgetEnum.PETS]: CatalogPetsWidgetView,
    [CatalogWidgetEnum.NEW_PETS]: CatalogNewPetsWidgetView,
    [CatalogWidgetEnum.PET_PREVIEW]: CatalogPetPreviewWidgetView,
    [CatalogWidgetEnum.GUILD_SELECTOR]: CatalogGuildSelectorWidgetView,
    [CatalogWidgetEnum.GUILD_FORUM_SELECTOR]: CatalogGuildForumSelectorWidgetView,
    [CatalogWidgetEnum.GUILD_BADGE_VIEW]: CatalogGuildBadgeViewWidgetView,
    [CatalogWidgetEnum.BUY_GUILD]: CatalogBuyGuildWidgetView,
    [CatalogWidgetEnum.ROOMADS]: CatalogRoomAdsWidgetView,
    [CatalogWidgetEnum.CLUB_BUY]: CatalogClubBuyWidgetView,
    [CatalogWidgetEnum.CLUB_GIFTS]: CatalogClubGiftWidgetView,
    [CatalogWidgetEnum.VIP_BUY]: CatalogVipBuyWidgetView,
    [CatalogWidgetEnum.VIP_GIFT]: CatalogVipGiftWidgetView,
    [CatalogWidgetEnum.LOYALTY_VIP_BUY]: CatalogLoyaltyVipBuyWidgetView,
    [CatalogWidgetEnum.MARKET_PLACE]: CatalogMarketPlaceWidgetView,
    [CatalogWidgetEnum.MARKET_PLACE_OWN_ITEMS]: CatalogMarketPlaceOwnItemsWidgetView,
    [CatalogWidgetEnum.RECYCLER]: CatalogRecyclerWidgetView,
    [CatalogWidgetEnum.RECYCLER_PRIZES]: CatalogRecyclerPrizesWidgetView,
    [CatalogWidgetEnum.RECOLORABLE_FURNITURE]: CatalogRecolorableFurnitureWidgetView,
};
