/**
 * Habbo Club in the catalogue and the club centre - the controller functions of Flash's
 * `ClubBuyController`, `ClubExtendController`, `ClubGiftController`, the club parts of
 * `HabboCatalog` (`showPurchaseConfirmation` for a `ClubBuyOfferData`, `purchaseProduct`,
 * `purchase*MembershipExtension`, `forgetPageDuringVipPurchase`,
 * `verifyClubLevel` / `openClubCenter`, `showNotEnoughCreditsAlert`), `HabboCatalogUtils.showVipBenefits`
 * and `HabboClubCenter` (`linkReceived` -> `showClubCenter`, `updateData`, `removeView`,
 * the page and help links). Their state is `CatalogClubSlice`; the
 * catalogue store is window-scoped, so each takes it (`useCatalogStoreApi()` in a view, the store
 * the window registered its handlers with in `handlers/catalog`).
 *
 * `rememberPageDuringVipPurchase` is not carried: its only caller, `PurchaseCatalogWidget.onBuyClub`,
 * is attached to no window in the AS3 client nor in Sulake's JavaScript one, so the page name
 * (`vipPurchasePageName`) is never remembered there - only forgotten and read, as here.
 *
 * `doNotCloseAfterVipPurchase` is not carried: the flag only keeps `hideMainWindow` from closing
 * the catalogue once, and nothing in the port hides the catalogue while a club purchase is pending.
 * `HabboCatalog.onHabboClubExtendOffer` first runs `init()` on a catalogue that was never opened;
 * the port builds the catalogue when its window opens (`CatalogComponent`), so the offer is shown
 * without it.
 */
import { IActivePage, ICatalogNode } from '@nitrodevco/nitro-api';
import { EventLogComposer, GetBadgesComposer, GetClubGiftInfoComposer, GetClubOffersComposer, IClubOfferExtendData, PurchaseBasicMembershipExtensionComposer, PurchaseFromCatalogComposer, PurchaseVipMembershipExtensionComposer, ScrGetKickbackInfoComposer, SelectClubGiftComposer } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { CatalogStore, CLUB_CENTER_DATA_UPDATE_INTERVAL, CLUB_OFFERS_SOURCE_CLUB_CENTER, ClubBuyOfferData } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { clubBuyOfferAsPurchasableOffer } from '#base/utils';

import { showPurchaseConfirmation } from './catalogCommands';
import { openCatalogExternalLink } from './catalogLinkCommands';
import { resetPlacedOfferData } from './catalogPlacementCommands';
import { purchaseWillBeGift } from './catalogPurchaseFlowCommands';
import { openClientLink } from './clientLinkCommands';

type Send = WebSocketConnection['send'];
type CatalogStoreApi = StoreApi<CatalogStore>;

const t = (key: string, defaultValue?: string, replacements?: Record<string, string>) => systemStore.getState().getLocalizationValue(key, defaultValue, replacements);

/** `getProperty`: a hotel variable with its `${key}` placeholders filled from the other variables, '' when unset. */
const getProperty = (key: string): string => {
    const { config } = systemStore.getState();
    const value = config[key];

    if ((typeof value !== 'string') && (typeof value !== 'number')) return '';

    return String(value).replace(/\$\{([^}]*)\}/g, (match, name: string) => {
        const replacement = config[name];

        return ((typeof replacement === 'string') || (typeof replacement === 'number')) ? String(replacement) : match;
    });
};

/** `getBoolean`: only `true` / `"true"` / `"1"` count, anything else is Flash's `false` default. */
const getBoolean = (key: string): boolean => {
    const value = systemStore.getState().config[key];

    return (value === true) || (value === 'true') || (value === '1');
};

/** `CatalogNavigator.getNodeById` / `getNodeByName`: the first node below the root that matches. */
const findCatalogNode = (node: ICatalogNode | undefined, match: (node: ICatalogNode) => boolean, isRoot: boolean = true): ICatalogNode | undefined => {
    if (!node) return undefined;

    if (!isRoot && match(node)) return node;

    for (const child of node.children) {
        const found = findCatalogNode(child, match, false);

        if (found) return found;
    }

    return undefined;
};

/**
 * `showNotEnoughCreditsAlert`: a confirm whose OK opens the web shop (`web.shop.relativeUrl`,
 * `HabboWebTools.openWebPageAndMinimizeClient`). Either answer clears a dropped offer
 * (`noCreditsConfirmDialogEventProcessor` -> `resetPlacedOfferData`).
 */
export const showNotEnoughCreditsAlert = () => {
    systemStore.getState().showConfirm(t('catalog.alert.notenough.title'), t('catalog.alert.notenough.credits.description'), () => {
        const url = getProperty('web.shop.relativeUrl');

        if (url.length) window.open(url, 'habboMain');
    }, { onClose: () => resetPlacedOfferData() });
};

/**
 * `showNotEnoughActivityPointsAlert`: duckets get a confirm whose OK follows `link.format.duckets`
 * (behind the "leaving the hotel" alert); any other currency a plain alert. Closing either clears
 * a dropped offer (`noDucketsConfirmDialogEventProcessor` / `alertDialogEventProcessor` ->
 * `resetPlacedOfferData`).
 */
export const showNotEnoughActivityPointsAlert = (type: number) => {
    const { config, showAlert, showConfirm } = systemStore.getState();
    // `getActivityPointName`: the config names the currency's text key, which is then localized.
    const nameKey = (config[`activitypoint.name.${type}`] as string | undefined) ?? '';
    const currencyname = t(nameKey, nameKey);
    const title = t('catalog.alert.notenough.activitypoints.title', '', { currencyname });
    const description = t('catalog.alert.notenough.activitypoints.description', '', { currencyname });

    const onClose = () => resetPlacedOfferData();

    if (type === 0) showConfirm(title, description, () => openCatalogExternalLink(getProperty('link.format.duckets')), { onClose });
    else showAlert(title, description, { onClose });
};

/** `ClubBuyController.registerVisualization` + `requestOffers`: a new buy widget has no offers until the answer. */
export const requestClubOffers = (send: Send, store: CatalogStoreApi, source: number) => {
    store.getState().setClubOffers(undefined);

    send(new GetClubOffersComposer({ requestSource: source }));
};

/**
 * The purse check `HabboCatalog.showPurchaseConfirmation` makes before any dialog: an offer the
 * credits or the activity points cannot pay for gets the "not enough" alert instead.
 */
const canPayForClubOffer = (offer: ClubBuyOfferData): boolean => {
    const { credits, activityPoints } = userStore.getState();

    if ((offer.priceCredits > 0) && (offer.priceCredits > credits)) {
        showNotEnoughCreditsAlert();

        return false;
    }

    if ((offer.priceActivityPoints > 0) && (offer.priceActivityPoints > (activityPoints[offer.priceActivityPointType] ?? 0))) {
        showNotEnoughActivityPointsAlert(offer.priceActivityPointType);

        return false;
    }

    return true;
};

/**
 * `HabboCatalog.showPurchaseConfirmation` for a `ClubBuyOfferData` (`ClubBuyItem.onBuy`,
 * `VipBuyItem.onBuy`, both with `purchaseWillBeGift(false)`): the purse is checked, then the club
 * dialog opens for the page - `hc_membership`'s when the offer came with none (-1).
 */
export const showClubPurchaseConfirmation = (store: CatalogStoreApi, offer: ClubBuyOfferData, pageId: number) => {
    if (!canPayForClubOffer(offer)) return;

    if (pageId === -1) {
        const node = findCatalogNode(store.getState().rootNode, node => (node.pageName === 'hc_membership'));

        if (node) pageId = node.pageId;
    }

    if (pageId >= 0) store.getState().setClubBuyConfirmation({ offer, pageId });
};

/** `VipBuyItem.onBuy`: `purchaseWillBeGift(false)`, then the club offer's own dialog. */
export const buyVipOffer = (store: CatalogStoreApi, offer: ClubBuyOfferData, page: IActivePage) => {
    purchaseWillBeGift(store, false);
    showClubPurchaseConfirmation(store, offer, page.pageId);
};

/**
 * `VipBuyItem.onGift`: `purchaseWillBeGift(true)` and `showPurchaseConfirmation` - `param1 is Offer
 * || _purchaseWillBeGift` sends even a club offer to the purchase confirmation, turned into gifting.
 */
export const giftVipOffer = (store: CatalogStoreApi, offer: ClubBuyOfferData, page: IActivePage) => {
    purchaseWillBeGift(store, true);
    showPurchaseConfirmation(store, clubBuyOfferAsPurchasableOffer(offer, page), page.pageId);
};

/** `ClubBuyConfirmationDialog`'s `select_button`: `ClubBuyController.confirmSelection` - `purchaseProduct(pageId, offerId)`. */
export const confirmClubBuy = (send: Send, store: CatalogStoreApi) => {
    const { clubBuyConfirmation, setClubBuyConfirmation } = store.getState();

    if (!clubBuyConfirmation) return;

    send(new PurchaseFromCatalogComposer({ pageId: clubBuyConfirmation.pageId, offerId: clubBuyConfirmation.offer.offerId, extraParam: '', quantity: 1 }));

    setClubBuyConfirmation(undefined);
};

/** `ClubBuyConfirmationDialog`'s close and `cancel_button`: `forgetPageDuringVipPurchase`, then `closeConfirmation`. */
export const cancelClubBuy = (store: CatalogStoreApi) => {
    const { setVipPurchasePageName, setClubBuyConfirmation } = store.getState();

    setVipPurchasePageName(undefined);
    setClubBuyConfirmation(undefined);
};

/**
 * `ClubExtendController.onOffer`: the offer's dialog, and the `dialog_show` event log line for the
 * VIP or the basic extension.
 */
export const showClubExtendOffer = (send: Send, store: CatalogStoreApi, offer: IClubOfferExtendData) => {
    store.getState().setClubExtendOffer(offer);

    send(new EventLogComposer({ event: 'Catalog', data: 'dialog_show', action: offer.vip ? 'vip.membership.extension.purchase' : 'basic.membership.extension.purchase', extraString: '', extraInt: 0 }));
};

/** `ClubExtendController.confirmSelection`: the purse is checked, then the extension is bought and the dialog closes. */
export const confirmClubExtend = (send: Send, store: CatalogStoreApi) => {
    const { clubExtendOffer, setClubExtendOffer } = store.getState();

    if (!clubExtendOffer) return;

    if (userStore.getState().credits < clubExtendOffer.priceCredits) {
        showNotEnoughCreditsAlert();

        return;
    }

    if (clubExtendOffer.vip) send(new PurchaseVipMembershipExtensionComposer({ offerId: clubExtendOffer.offerId }));
    else send(new PurchaseBasicMembershipExtensionComposer({ offerId: clubExtendOffer.offerId }));

    setClubExtendOffer(undefined);
};

/** `ClubGiftController.set widget`: the gift list asks for the gift info. */
export const requestClubGiftInfo = (send: Send) => send(new GetClubGiftInfoComposer({}));

/** `ClubGiftController.confirmSelection`: the gift is picked by its product code, one fewer is available, the dialog closes. */
export const confirmClubGift = (send: Send, store: CatalogStoreApi) => {
    const { clubGiftConfirmation, consumeClubGift, setClubGiftConfirmation } = store.getState();

    if (!clubGiftConfirmation) return;

    send(new SelectClubGiftComposer({ productCode: clubGiftConfirmation.localizationId }));

    consumeClubGift();
    setClubGiftConfirmation(undefined);
};

/**
 * `HabboCatalogUtils.showVipBenefits`: the benefits window while `catalog.vip.benefits.enabled`,
 * otherwise the club web page (`openLink(link.format.club)`).
 */
export const showVipBenefits = (store: CatalogStoreApi) => {
    if (getBoolean('catalog.vip.benefits.enabled')) store.getState().setVipBenefitsVisible(true);
    else openCatalogExternalLink(getProperty('link.format.club'));
};

/** `openClubCenter`: the `habboUI/open/hccenter` link, which the club centre answers. */
export const openClubCenter = (send: Send) => openClientLink(send, 'habboUI/open/hccenter');

/** `verifyClubLevel`: whether the user has the club level, opening the club centre when not. */
export const verifyClubLevel = (send: Send, level: number = 1): boolean => {
    if (Number(userStore.getState().clubLevel) >= level) return true;

    openClubCenter(send);

    return false;
};

/** `HabboClubCenter.isKickbackEnabled`: `hccenter.activity.enabled` unset or empty is on. */
export const isClubKickbackEnabled = (config: Record<string, unknown>): boolean => {
    const value = config['hccenter.activity.enabled'];

    if ((value === undefined) || (value === null) || (value === '')) return true;

    return (value === true) || (value === 1) || (value === '1') || (value === 'true');
};

/**
 * `HabboClubCenter.showClubCenter` once the `habboUI/open/hccenter` link has opened the window:
 * the new `ClubCenterView` asks for the club centre's offers (its constructor's `getOffers()`),
 * and the data is asked for again when it is more than `DATA_UPDATE_INTERVAL_MSEC` old and no
 * request is out (`updateNeeded` / `updateData`: the badges, the gift info and the kickback info).
 * `now` is `getTimer()`.
 */
export const showClubCenter = (send: Send, store: CatalogStoreApi, now: number) => {
    const { clubCenterUpdating, clubCenterUpdatedAt, setClubCenterUpdating } = store.getState();

    send(new GetClubOffersComposer({ requestSource: CLUB_OFFERS_SOURCE_CLUB_CENTER }));

    if (clubCenterUpdating || ((now - clubCenterUpdatedAt) <= CLUB_CENTER_DATA_UPDATE_INTERVAL)) return;

    setClubCenterUpdating(true);

    send(new GetBadgesComposer({}), new GetClubGiftInfoComposer({}), new ScrGetKickbackInfoComposer({}));
};

/** `HabboClubCenter.removeView`: the window goes (its breakdown bubble with it), and a pending update is forgotten. */
export const removeClubCenter = (store: CatalogStoreApi) => {
    systemStore.getState().hideWindow('club_center');

    store.getState().setClubCenterUpdating(false);
};

/** `openPurchasePage` / `openClubGiftPage`: the catalogue at `hc_membership` / `club_gifts`. */
export const openClubCatalogPage = (pageName: 'hc_membership' | 'club_gifts') => systemStore.getState().showWindow('catalog', { pageName });

/** `openPaydayHelpPage` / `openHelpPage`: the `habbopages/hcpayday` / `habbopages/habboclub` links. */
export const openClubHelpPage = (send: Send, page: 'hcpayday' | 'habboclub') => openClientLink(send, `habbopages/${page}`);
