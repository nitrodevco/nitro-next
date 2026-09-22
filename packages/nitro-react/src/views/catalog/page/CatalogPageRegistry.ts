/**
 * The catalogue page registries: which view draws each page layout, and which component is each
 * widget. Together with `context/catalog/page` this is the port of Flash's `CatalogPage`
 * (`createWindow`, `createWidgets`, `initializeWidgets`) and `CatalogWidget`.
 *
 * ## How a page is built
 *
 * `CatalogPageMessage` -> `registerCatalogHandlers` -> `showCatalogPage` (commands) puts a
 * `CatalogPage` in the store. `CatalogPageView` resolves its layout code
 * (`resolveCatalogLayout`: `frontpage4` and the manifest aliases such as `bots` -> `default_3x3`;
 * an unknown code draws nothing, as Flash builds no window), renders the view
 * `CATALOG_LAYOUT_VIEWS` has for it, and once every widget is mounted dispatches
 * `WIDGETS_INITIALIZED` and selects the page's offer (`CatalogPage.selectOffer`).
 *
 * A layout view draws its Flash layout 1:1 - every element the XML has, at its rect - and puts a
 * `<CatalogWidgetSlot page={page} name="itemGridWidget" tags={[...]} layout={...} />` where the
 * layout has a widget container. The slot mounts `CATALOG_WIDGET_VIEWS[name]`. The widgets a
 * layout has, in order, are `CATALOG_LAYOUT_WIDGETS` (`context/catalog/page/CatalogLayouts.ts`),
 * held to the XML by `drift/catalog_layouts.py`, which also holds each registered view's slots to
 * that list - so a view's slots appear in the layout's order.
 *
 * Page texts and images come from `PageLocalization` (`getCatalogPageText(page, 'ctlg_text_1')`,
 * `getCatalogPageImage`), which is Flash's `LocalizationCatalogWidget` - the one widget every page
 * gets without a container.
 *
 * ## Adding a layout
 *
 * 1. Read `scripts/flash-js-resources/habbo-catalog-com/layout_<name>.xml` and its generated
 *    reference under `scripts/layouts/catalog/pages/`.
 * 2. Write `views/catalog/page/layouts/CatalogLayout<Name>View.tsx`: a `CatalogLayoutProps`
 *    component, root `Region name="<the layout's root name>"` at the layout's size, the static
 *    elements hand-written, a `CatalogWidgetSlot` per widget container. Docblock: the layout and
 *    what it leaves out.
 * 3. Register it below under the layout name (the part after `layout_`).
 * 4. Add the layout's row to `known.LAYOUT_VIEWS` (`python layout_views.py --print <asset>`).
 *
 * ## Adding a widget
 *
 * 1. Read the Flash class (`viewer/widgets/<Name>CatalogWidget.as`), its view XML
 *    (`habbo-catalog-com/<widgetId>.xml`, attached by `attachWidgetView` unless the container is
 *    tagged `EMBEDDED`, in which case the layout's own children are the view) and the generated
 *    reference under `scripts/layouts/catalog/widgets/`.
 * 2. Write `views/catalog/page/widgets/Catalog<Name>WidgetView.tsx`, a `CatalogWidgetProps`
 *    component. `init()` is the component body: subscribe with
 *    `useCatalogWidgetEvent(page, CatalogWidgetEventEnum.X, handler)` at the top, before any early
 *    return; what `init()` dispatches goes in a mount effect after the subscriptions. The widget's
 *    fields are its state (`useState`, or a ref for what never draws); page state Flash keeps on
 *    the catalogue or viewer goes into a catalogue store slice. `init()` returning false is the
 *    component rendering nothing. `window.visible = x` is rendering or not; the container stays.
 * 3. Send with `page.events.dispatchEvent({ type: CatalogWidgetEventEnum.X, ... })` - the payload
 *    is the Flash event class's getters (`CatalogWidgetEvents.ts`). Packets go through
 *    `commands/`, and the window-level flows the widget opens (purchase confirmation, gift
 *    dialog, ...) through the catalogue store.
 * 4. Register it below under its `CatalogWidgetEnum` id.
 *
 * ## Adding an event
 *
 * Every Flash widget event already has its interface in `CatalogWidgetEvents.ts` and its type in
 * `CatalogWidgetEventEnum` / `CatalogWidgetSpinnerEvent` / `CatalogWidgetBundleDisplayExtraInfoEvent`.
 * A packet that Flash forwards to the open page (`currentPage.dispatchWidgetEvent(...)`) is
 * dispatched from its handler with `store.getState().activePage?.dispatchWidgetEvent(...)`. An
 * event Flash does not have is not added: widgets talk the way Flash's do.
 */
import { ComponentType, ReactNode } from 'react';

import { CatalogLayoutName, CatalogPage, CatalogWidgetEnum, CatalogWidgetId } from '#base/context/catalog';

import { CatalogLayoutBadgeDisplayView } from './layouts/CatalogLayoutBadgeDisplayView';
import { CatalogLayoutBuildersClubAddonsView } from './layouts/CatalogLayoutBuildersClubAddonsView';
import { CatalogLayoutBuildersClubFrontpageView } from './layouts/CatalogLayoutBuildersClubFrontpageView';
import { CatalogLayoutBuildersClubLoyaltyView } from './layouts/CatalogLayoutBuildersClubLoyaltyView';
import { CatalogLayoutClubBuyView } from './layouts/CatalogLayoutClubBuyView';
import { CatalogLayoutClubGiftsView } from './layouts/CatalogLayoutClubGiftsView';
import { CatalogLayoutDefault3x3View } from './layouts/CatalogLayoutDefault3x3View';
import { CatalogLayoutFrontpageFeaturedView } from './layouts/CatalogLayoutFrontpageFeaturedView';
import { CatalogLayoutGuildCustomFurniView } from './layouts/CatalogLayoutGuildCustomFurniView';
import { CatalogLayoutGuildForumView } from './layouts/CatalogLayoutGuildForumView';
import { CatalogLayoutGuildFrontpageView } from './layouts/CatalogLayoutGuildFrontpageView';
import { CatalogLayoutInfoDucketsView } from './layouts/CatalogLayoutInfoDucketsView';
import { CatalogLayoutInfoLoyaltyView } from './layouts/CatalogLayoutInfoLoyaltyView';
import { CatalogLayoutInfoRentablesView } from './layouts/CatalogLayoutInfoRentablesView';
import { CatalogLayoutLoyaltyVipBuyView } from './layouts/CatalogLayoutLoyaltyVipBuyView';
import { CatalogLayoutMarketplaceOwnItemsView } from './layouts/CatalogLayoutMarketplaceOwnItemsView';
import { CatalogLayoutMarketplaceView } from './layouts/CatalogLayoutMarketplaceView';
import { CatalogLayoutMonkeyView } from './layouts/CatalogLayoutMonkeyView';
import { CatalogLayoutPetcustomizationView } from './layouts/CatalogLayoutPetcustomizationView';
import { CatalogLayoutPets2View } from './layouts/CatalogLayoutPets2View';
import { CatalogLayoutPets3View } from './layouts/CatalogLayoutPets3View';
import { CatalogLayoutPetsView } from './layouts/CatalogLayoutPetsView';
import { CatalogLayoutRecyclerInfoView } from './layouts/CatalogLayoutRecyclerInfoView';
import { CatalogLayoutRecyclerPrizesView } from './layouts/CatalogLayoutRecyclerPrizesView';
import { CatalogLayoutRecyclerView } from './layouts/CatalogLayoutRecyclerView';
import { CatalogLayoutRoomadsView } from './layouts/CatalogLayoutRoomadsView';
import { CatalogLayoutSingleBundleView } from './layouts/CatalogLayoutSingleBundleView';
import { CatalogLayoutSoundmachineView } from './layouts/CatalogLayoutSoundmachineView';
import { CatalogLayoutSpacesNewView } from './layouts/CatalogLayoutSpacesNewView';
import { CatalogLayoutTrophiesView } from './layouts/CatalogLayoutTrophiesView';
import { CatalogLayoutVipBuyView } from './layouts/CatalogLayoutVipBuyView';
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

/** What a layout view gets: the page it draws. */
export interface CatalogLayoutProps {
    page: CatalogPage;
}

/** What a widget gets - Flash's `CatalogWidget.page`, and its container's `tags`. */
export interface CatalogWidgetProps {
    page: CatalogPage;
    tags: readonly string[];
    /**
     * The widget containers the layout nests inside this one (`petsWidget`'s colour grid and
     * purchase widget): the widget draws them among its own elements, so a widget whose `init()`
     * fails takes them with it, as `CatalogPage.removeWidgets` does.
     */
    children?: ReactNode;
}

/** Layout name -> the view that draws it. A layout with no view draws nothing. */
export const CATALOG_LAYOUT_VIEWS: Partial<Record<CatalogLayoutName, ComponentType<CatalogLayoutProps>>> = {
    default_3x3: CatalogLayoutDefault3x3View,
    badge_display: CatalogLayoutBadgeDisplayView,
    soundmachine: CatalogLayoutSoundmachineView,
    spaces_new: CatalogLayoutSpacesNewView,
    trophies: CatalogLayoutTrophiesView,
    builders_club_addons: CatalogLayoutBuildersClubAddonsView,
    builders_club_frontpage: CatalogLayoutBuildersClubFrontpageView,
    builders_club_loyalty: CatalogLayoutBuildersClubLoyaltyView,
    frontpage_featured: CatalogLayoutFrontpageFeaturedView,
    info_duckets: CatalogLayoutInfoDucketsView,
    info_loyalty: CatalogLayoutInfoLoyaltyView,
    info_rentables: CatalogLayoutInfoRentablesView,
    monkey: CatalogLayoutMonkeyView,
    pets: CatalogLayoutPetsView,
    pets2: CatalogLayoutPets2View,
    pets3: CatalogLayoutPets3View,
    petcustomization: CatalogLayoutPetcustomizationView,
    guild_custom_furni: CatalogLayoutGuildCustomFurniView,
    guild_forum: CatalogLayoutGuildForumView,
    guild_frontpage: CatalogLayoutGuildFrontpageView,
    roomads: CatalogLayoutRoomadsView,
    single_bundle: CatalogLayoutSingleBundleView,
    club_buy: CatalogLayoutClubBuyView,
    club_gifts: CatalogLayoutClubGiftsView,
    vip_buy: CatalogLayoutVipBuyView,
    loyalty_vip_buy: CatalogLayoutLoyaltyVipBuyView,
    marketplace: CatalogLayoutMarketplaceView,
    marketplace_own_items: CatalogLayoutMarketplaceOwnItemsView,
    recycler: CatalogLayoutRecyclerView,
    recycler_info: CatalogLayoutRecyclerInfoView,
    recycler_prizes: CatalogLayoutRecyclerPrizesView,
};

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
};
