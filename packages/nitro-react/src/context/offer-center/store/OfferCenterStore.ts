/**
 * The offer centre - `catalog/offers/OfferCenter` and its two video offer providers,
 * `SupersonicProvider` and `SponsorPayProvider`, as plain state: the rewards the server delivered
 * (`OfferRewardDeliveredMessage`, newest first), each provider's own fields, the provider
 * `updateVideoStatus` last picked (`§_-Zv§`) and what it last told the offer extension
 * (`IOfferExtension.indicateVideoAvailable`).
 *
 * The providers themselves are page scripts the hotel's web page embeds (`supersonicAds*`,
 * `SponsorPay.*`), reached through `ExternalInterface` - `offerCenterCommands` makes those calls and
 * `bridgeOfferCenter` installs the callbacks the scripts answer on. A page without them never
 * reports a campaign, so no provider ever has a video and the club centre's video button stays
 * hidden, which is what the Flash client does on such a page too.
 *
 * An app-wide singleton: Flash's offer centre lives from `HabboClubCenter.initComponent` (when
 * `offers.enabled` and `offers.habboclub.enabled`) to logout.
 */
import { createStore } from 'zustand';

/** `OfferReward`, plus the time its row was built - `createRewardItem` stamps `new Date().toLocaleString()` then. */
export interface OfferReward {
    name: string;
    /** `s` floor furni, `i` wall furni, `e` effect, `h` club - `HabboCatalogUtils.displayProductIcon`. */
    contentType: string;
    classId: number;
    /** `reward_date`'s caption: when the reward list last built this row. */
    rowDate: string;
}

/** `SupersonicProvider`'s fields. */
export interface SupersonicProviderState {
    loaded: boolean;
    /** `_offerCount`: campaigns the page script reported, less the ones shown. */
    offerCount: number;
    showingPopup: boolean;
}

/** `SponsorPayProvider`'s fields. */
export interface SponsorPayProviderState {
    loaded: boolean;
    /** `§_-z1Z§`: the page script reported an offer. */
    videoAvailable: boolean;
    showingPopup: boolean;
    /** Counts `showVideo` calls: each one restarts the provider's 150 second reset timer (`§_-Z2O§`). */
    videoShown: number;
}

/** `OfferCenter._providers`, in the order it pushes them - the order `getNextProvider` tries them in. */
export type OfferProviderName = 'supersonic' | 'sponsorpay';

export const OFFER_PROVIDERS: readonly OfferProviderName[] = [ 'supersonic', 'sponsorpay' ];

type State = {
    /** `§_-R1E§`, newest first. */
    rewards: OfferReward[];
    /** `§_-Zv§`: the provider `updateVideoStatus` last picked, `null` for none. */
    activeProvider: OfferProviderName | null;
    /** What `indicateVideoAvailable` was last told. */
    videoAvailable: boolean;
    supersonic: SupersonicProviderState;
    sponsorPay: SponsorPayProviderState;
};

type Actions = {
    /** `addReward`: `unshift`, the row stamped now when the list is up (`rowDate`), unstamped otherwise. */
    addOfferReward: (name: string, contentType: string, classId: number, rowDate: string) => void;
    /** `populateRewardList`: every row rebuilt, so every row stamped `rowDate`. */
    stampOfferRewards: (rowDate: string) => void;
    setSupersonic: (state: Partial<SupersonicProviderState>) => void;
    setSponsorPay: (state: Partial<SponsorPayProviderState>) => void;
    /** `updateVideoStatus`'s result. */
    setVideoStatus: (activeProvider: OfferProviderName | null, videoAvailable: boolean) => void;
    /** Logout: `OfferCenter.dispose`. */
    resetOfferCenter: () => void;
};

export const OfferCenterInitialState: State = {
    rewards: [],
    activeProvider: null,
    videoAvailable: false,
    supersonic: { loaded: false, offerCount: 0, showingPopup: false },
    sponsorPay: { loaded: false, videoAvailable: false, showingPopup: false, videoShown: 0 },
};

export type OfferCenterStore = State & Actions;

export const createOfferCenterStore = () => createStore<OfferCenterStore>()(set => ({
    ...structuredClone(OfferCenterInitialState),
    addOfferReward: (name, contentType, classId, rowDate) => set(x => ({ rewards: [ { name, contentType, classId, rowDate }, ...x.rewards ] })),
    stampOfferRewards: rowDate => set(x => ({ rewards: x.rewards.map(reward => ({ ...reward, rowDate })) })),
    setSupersonic: state => set(x => ({ supersonic: { ...x.supersonic, ...state } })),
    setSponsorPay: state => set(x => ({ sponsorPay: { ...x.sponsorPay, ...state } })),
    setVideoStatus: (activeProvider, videoAvailable) => set({ activeProvider, videoAvailable }),
    resetOfferCenter: () => set(structuredClone(OfferCenterInitialState)),
}));

export const offerCenterStore = createOfferCenterStore();

/** `OfferCenter.showingVideo`: the picked provider has its popup up. */
export const getOfferCenterShowingVideo = (state: State): boolean => {
    if (state.activeProvider === 'supersonic') return state.supersonic.showingPopup;
    if (state.activeProvider === 'sponsorpay') return state.sponsorPay.showingPopup;

    return false;
};
