/**
 * Habbo Club's packets - the listeners Flash's `HabboCatalog` registers for the subscription and
 * the club controllers (`onSubscriptionInfo`, `onHabboClubOffers`, `onHabboClubExtendOffer`,
 * `onClubGiftInfo`) and the ones `HabboClubCenter.initComponent` adds (`ClubGiftInfoEvent`,
 * `ScrSendKickbackInfoMessageEvent`, `BadgesEvent`). Registered from the catalogue window with its
 * store (`CatalogComponent`), which lives as long as the client does.
 *
 * `onSubscriptionInfo` writes the purse's subscription half (`userStore`'s `clubSubscription`),
 * and on response type 2 - the answer to a club purchase - rebuilds the catalogue (`reset()`
 * disposes the window) and reopens the remembered page, if any (see `CatalogClubSlice`). Its
 * `ExternalInterface.call("FlashExternalInterface.subscriptionUpdated", ...)` goes to the web page
 * around the Flash client, which this client does not have.
 */
import { CatalogTypeEnum, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { BadgesEventMessage, ClubGiftInfoEventMessage, HabboClubExtendOfferMessage, HabboClubOffersMessage, ScrSendKickbackInfoMessage, ScrSendUserInfoMessage } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { showClubExtendOffer } from '#base/commands';
import { CatalogStore, CLUB_BUY_OFFER_SOURCES } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { processCatalogOffer, resolveClubBadgeId, toClubBuyOffers } from '#base/utils';

import { on, subscribeAll } from '../packetSubscriptions';

/** `ScrSendUserInfoMessageParser`'s response types `onSubscriptionInfo` acts on. */
const SUBSCRIPTION_RESPONSE_PURCHASE = 2;
const SUBSCRIPTION_RESPONSE_EXPIRING = 3;

export const registerCatalogClubHandlers = (store: StoreApi<CatalogStore>, { send, subscribe }: WebSocketConnection) => {
    const { setClubOffers, setClubGiftInfo, setClubCenterGiftsAvailable, setClubKickbackData, setClubBadgeId, setVipPurchasePageName, resetCatalog } = store.getState();
    const { setClubSubscription } = userStore.getState();

    // `HabboClubCenter.§_-M14§`: the badge fragments of the answer being assembled (`addMessageFragment`).
    let badgeFragments: (string[] | undefined)[] | undefined = undefined;

    return subscribeAll(subscribe, [
        on(ScrSendUserInfoMessage, (data) => {
            setClubSubscription({
                clubDays: Math.max(0, data.daysToPeriodEnd),
                clubPeriods: Math.max(0, data.periodsSubscribedAhead),
                isVip: data.isVIP,
                pastClubDays: data.pastClubDays,
                pastVipDays: data.pastVipDays,
                isExpiring: (data.responseType === SUBSCRIPTION_RESPONSE_EXPIRING),
                minutesUntilExpiration: data.minutesUntilExpiration,
                minutesSinceLastModified: data.minutesSinceLastModified,
            });

            if (data.responseType !== SUBSCRIPTION_RESPONSE_PURCHASE) return;

            const { hideWindow, showWindow } = systemStore.getState();
            const pageName = store.getState().vipPurchasePageName;

            resetCatalog();
            hideWindow('catalog');

            if (pageName !== undefined) {
                showWindow('catalog', { pageName });
                setVipPurchasePageName(undefined);
            }
        }),

        /** `onHabboClubOffers`: only the buy pages' sources reach the `ClubBuyController`. */
        on(HabboClubOffersMessage, (data) => {
            if (!CLUB_BUY_OFFER_SOURCES.includes(data.source)) return;

            setClubOffers(toClubBuyOffers(data.offers));
        }),

        on(HabboClubExtendOfferMessage, data => showClubExtendOffer(send, store, data.offer)),

        /**
         * `onClubGiftInfo` (`ClubGiftController.setInfo`, the gifts built as page offers the way
         * `ClubGiftWidget.updateList` builds them) and the club centre's own `onClubGiftInfo`.
         */
        on(ClubGiftInfoEventMessage, (data) => {
            const lookup = systemStore.getState();
            const offers: IPurchasableOffer[] = [];

            for (const offer of data.offers) {
                const giftOffer = processCatalogOffer(offer, CatalogTypeEnum.Normal, lookup);

                if (giftOffer) offers.push(giftOffer);
            }

            setClubGiftInfo({ daysUntilNextGift: data.daysUntilNextGift, giftsAvailable: data.giftsAvailable, offers, giftData: data.giftData });
            setClubCenterGiftsAvailable(data.giftsAvailable);
        }),

        /** `onKickbackInfoMessageEvent`: the data, the update over, and when (`getTimer()`). */
        on(ScrSendKickbackInfoMessage, data => setClubKickbackData(data.data, performance.now())),

        /**
         * `HabboClubCenter.onBadges`: the fragments are collected until every one has arrived, then
         * the club badge is resolved from all the badge codes.
         */
        on(BadgesEventMessage, (data) => {
            const codes = [ ...data.fragment.values() ];

            if (data.totalFragments === 1) {
                badgeFragments = undefined;
                setClubBadgeId(resolveClubBadgeId(codes));

                return;
            }

            if (!badgeFragments) badgeFragments = new Array<string[] | undefined>(data.totalFragments).fill(undefined);

            badgeFragments[data.fragmentNo] = codes;

            if (badgeFragments.some(fragment => !fragment)) return;

            const allCodes = badgeFragments.flatMap(fragment => fragment ?? []);

            badgeFragments = undefined;
            setClubBadgeId(resolveClubBadgeId(allCodes));
        }),
    ]);
};
