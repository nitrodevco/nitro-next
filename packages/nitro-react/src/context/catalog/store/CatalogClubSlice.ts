/**
 * Habbo Club in the catalogue - what Flash's `HabboCatalog` keeps in its three club controllers,
 * the VIP purchase memory beside them, and the club centre (`HabboClubCenter`):
 *
 * - `ClubBuyController`: the offers of the last `HabboClubOffersMessage` for a buy page
 *   (`clubOffers`, `ClubBuyOfferData` sorted by months, the one VIP offer marked
 *   `upgradeHcPeriodToVip`) and its `ClubBuyConfirmationDialog` (`clubBuyConfirmation`). The
 *   visualisation - `ClubBuyCatalogWidget`, `VipBuyCatalogWidget`, `LoyaltyVipBuyCatalogWidget` -
 *   filters them itself, since `onOffers` hands each one its own `isGift` promotion list.
 * - `ClubExtendController`: the `HabboClubExtendOfferMessage` offer while its
 *   `ClubExtendConfirmationDialog` is open (`clubExtendOffer`).
 * - `ClubGiftController`: `setInfo`'s days, gifts available, offers and requirements
 *   (`clubGiftInfo`), and its `ClubGiftConfirmationDialog` (`clubGiftConfirmation`).
 * - `HabboCatalogUtils.showVipBenefits`' `VipBenefitsWindow` (`vipBenefitsVisible`).
 * - `§_-8U§`: the page name to reopen once a purchase's `ScrSendUserInfoMessage` (response
 *   type 2) has rebuilt the catalogue (`vipPurchasePageName`). Flash sets it only in
 *   `rememberPageDuringVipPurchase`, whose one caller (`PurchaseCatalogWidget.onBuyClub`) no
 *   window is wired to, so in practice it is only cleared (`forgetPageDuringVipPurchase`).
 * - `HabboClubCenter`: the kickback data, its own gifts-available count, the club badge its
 *   `BadgesEvent` listener resolved, and the update-in-flight flag and time (`updateNeeded`). The
 *   payday breakdown bubble (`ClubSpecialInfoBubbleView`) is the club centre view's own state: it
 *   goes with the view (`removeView` -> `removeBreakdown`).
 *
 * Flash's controllers outlive `HabboCatalog.reset()` (`init()` only creates them when null), so
 * `resetCatalog` leaves this slice alone.
 */
import { IPurchasableOffer } from '@nitrodevco/nitro-api';
import { IClubGiftData, IClubOfferData, IClubOfferExtendData, IScrKickbackData } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** `GetClubOffersComposer` sources: `ClubBuyCatalogWidget`, `VipBuyCatalogWidget` (buy / gift), the club centre, `LoyaltyVipBuyCatalogWidget`. */
export const CLUB_OFFERS_SOURCE_CLUB_BUY = 0;
export const CLUB_OFFERS_SOURCE_VIP_BUY = 1;
export const CLUB_OFFERS_SOURCE_VIP_GIFT = 2;
export const CLUB_OFFERS_SOURCE_CLUB_CENTER = 3;
export const CLUB_OFFERS_SOURCE_LOYALTY_VIP_BUY = 6;

/** The sources `HabboCatalog.onHabboClubOffers` hands on to the `ClubBuyController`. */
export const CLUB_BUY_OFFER_SOURCES: readonly number[] = [ CLUB_OFFERS_SOURCE_CLUB_BUY, CLUB_OFFERS_SOURCE_VIP_BUY, CLUB_OFFERS_SOURCE_VIP_GIFT, CLUB_OFFERS_SOURCE_LOYALTY_VIP_BUY ];

/** `HabboClubCenter.DATA_UPDATE_INTERVAL_MSEC`: the data is asked for again at most this often. */
export const CLUB_CENTER_DATA_UPDATE_INTERVAL = 10000;

/** Flash's `ClubBuyOfferData`: the packet's offer and `upgradeHcPeriodToVip`. */
export interface ClubBuyOfferData extends IClubOfferData {
    readonly upgradeHcPeriodToVip: boolean;
}

/** `ClubBuyController.showConfirmation`'s arguments. */
export interface ClubBuyConfirmation {
    readonly offer: ClubBuyOfferData;
    readonly pageId: number;
}

/** `ClubGiftController.setInfo`: the gifts as page offers (`new Offer(...)`) and each one's `ClubGiftData`. */
export interface ClubGiftInfo {
    readonly daysUntilNextGift: number;
    readonly giftsAvailable: number;
    readonly offers: readonly IPurchasableOffer[];
    readonly giftData: ReadonlyMap<number, IClubGiftData>;
}

type State = {
    /** `undefined` from the moment a widget asks until the answer (its item lists are empty meanwhile). */
    clubOffers: readonly ClubBuyOfferData[] | undefined;
    clubBuyConfirmation: ClubBuyConfirmation | undefined;
    clubExtendOffer: IClubOfferExtendData | undefined;
    /** `undefined` until the first `ClubGiftInfoMessage` (`getOffers()` is null then, and the list stays empty). */
    clubGiftInfo: ClubGiftInfo | undefined;
    clubGiftConfirmation: IPurchasableOffer | undefined;
    vipBenefitsVisible: boolean;
    vipPurchasePageName: string | undefined;
    clubKickbackData: IScrKickbackData | undefined;
    clubCenterGiftsAvailable: number;
    clubBadgeId: string | undefined;
    /** `HabboClubCenter.§_-b§`: the data was asked for and has not arrived. */
    clubCenterUpdating: boolean;
    /** `HabboClubCenter.§_-U2h§`: `getTimer()` when the kickback data last arrived. */
    clubCenterUpdatedAt: number;
};

type Actions = {
    setClubOffers: (clubOffers: readonly ClubBuyOfferData[] | undefined) => void;
    setClubBuyConfirmation: (clubBuyConfirmation: ClubBuyConfirmation | undefined) => void;
    setClubExtendOffer: (clubExtendOffer: IClubOfferExtendData | undefined) => void;
    setClubGiftInfo: (clubGiftInfo: ClubGiftInfo) => void;
    /** `ClubGiftController.confirmSelection`: `giftsAvailable--`. */
    consumeClubGift: () => void;
    setClubGiftConfirmation: (clubGiftConfirmation: IPurchasableOffer | undefined) => void;
    setVipBenefitsVisible: (vipBenefitsVisible: boolean) => void;
    setVipPurchasePageName: (vipPurchasePageName: string | undefined) => void;
    /** `onKickbackInfoMessageEvent`: the data, the update over, its time. */
    setClubKickbackData: (clubKickbackData: IScrKickbackData, updatedAt: number) => void;
    setClubCenterGiftsAvailable: (clubCenterGiftsAvailable: number) => void;
    setClubBadgeId: (clubBadgeId: string | undefined) => void;
    setClubCenterUpdating: (clubCenterUpdating: boolean) => void;
};

export const CatalogClubSliceInitialState: State = {
    clubOffers: undefined,
    clubBuyConfirmation: undefined,
    clubExtendOffer: undefined,
    clubGiftInfo: undefined,
    clubGiftConfirmation: undefined,
    vipBenefitsVisible: false,
    vipPurchasePageName: undefined,
    clubKickbackData: undefined,
    clubCenterGiftsAvailable: 0,
    clubBadgeId: undefined,
    clubCenterUpdating: false,
    clubCenterUpdatedAt: -10000,
};

export type CatalogClubSlice = State & Actions;

export const createCatalogClubSlice: StateCreator<CatalogClubSlice, [], [], CatalogClubSlice> = set => ({
    ...CatalogClubSliceInitialState,
    setClubOffers: clubOffers => set({ clubOffers }),
    setClubBuyConfirmation: clubBuyConfirmation => set({ clubBuyConfirmation }),
    setClubExtendOffer: clubExtendOffer => set({ clubExtendOffer }),
    setClubGiftInfo: clubGiftInfo => set({ clubGiftInfo }),
    consumeClubGift: () => set(x => (x.clubGiftInfo ? { clubGiftInfo: { ...x.clubGiftInfo, giftsAvailable: x.clubGiftInfo.giftsAvailable - 1 } } : {})),
    setClubGiftConfirmation: clubGiftConfirmation => set({ clubGiftConfirmation }),
    setVipBenefitsVisible: vipBenefitsVisible => set({ vipBenefitsVisible }),
    setVipPurchasePageName: vipPurchasePageName => set({ vipPurchasePageName }),
    setClubKickbackData: (clubKickbackData, updatedAt) => set({ clubKickbackData, clubCenterUpdating: false, clubCenterUpdatedAt: updatedAt }),
    setClubCenterGiftsAvailable: clubCenterGiftsAvailable => set({ clubCenterGiftsAvailable }),
    setClubBadgeId: clubBadgeId => set({ clubBadgeId }),
    setClubCenterUpdating: clubCenterUpdating => set({ clubCenterUpdating }),
});
