/**
 * The snowwar game token offers `HabboCatalog` keeps for the games UI - the three
 * `GameTokensOffer`s `onSnowWarGameTokenOffer` builds from a `SnowWarGameTokensMessage`, one per
 * localization id it knows (`GET_SNOWWAR_TOKENS`, `...2`, `...3`); an offer under any other id
 * is dropped, and a new message replaces all three (`disposeSnowWarTokens`).
 *
 * An app-wide singleton, as `HabboCatalog` is: the offers outlive the catalogue window and are
 * read by `buySnowWarTokensOffer` (see `gameTokensCommands`), which leaves the offer to confirm
 * here for the catalogue's purchase confirmation.
 */
import { createStore } from 'zustand';

/** `HabboCatalog.GET_SNOWWAR_TOKENS*`: the localization ids of the three offers. */
export const GET_SNOWWAR_TOKENS = 'GET_SNOWWAR_TOKENS';
export const GET_SNOWWAR_TOKENS2 = 'GET_SNOWWAR_TOKENS2';
export const GET_SNOWWAR_TOKENS3 = 'GET_SNOWWAR_TOKENS3';

export const SNOWWAR_TOKEN_OFFER_IDS: readonly string[] = [ GET_SNOWWAR_TOKENS, GET_SNOWWAR_TOKENS2, GET_SNOWWAR_TOKENS3 ];

/**
 * `viewer/GameTokensOffer`: an offer with no page, no product and no grid item, priced in credits
 * (`priceType` `price_type_credits`) and never giftable, whose name and description are both
 * `${<localizationId>}`.
 */
export interface GameTokensOffer {
    offerId: number;
    localizationId: string;
    priceInCredits: number;
    priceInActivityPoints: number;
    activityPointType: number;
}

type State = {
    /** `§_-is§` / `§_-d2u§` / `§_-62G§`, by localization id. */
    offers: Record<string, GameTokensOffer>;
    /**
     * The offer `buySnowWarTokensOffer` hands to `showPurchaseConfirmation`, waiting for the
     * catalogue - whose window-scoped store holds the dialog - to open it
     * (`bridgeGameTokensPurchaseConfirmation`).
     */
    confirmationRequest: GameTokensOffer | undefined;
};

type Actions = {
    /** `onSnowWarGameTokenOffer`. */
    setGameTokensOffers: (offers: GameTokensOffer[]) => void;
    setConfirmationRequest: (confirmationRequest: GameTokensOffer | undefined) => void;
};

export type GameTokensStore = State & Actions;

export const createGameTokensStore = () => createStore<GameTokensStore>()(set => ({
    offers: {},
    confirmationRequest: undefined,
    setConfirmationRequest: confirmationRequest => set({ confirmationRequest }),
    setGameTokensOffers: (offers) => {
        const next: Record<string, GameTokensOffer> = {};

        for (const offer of offers) {
            if (SNOWWAR_TOKEN_OFFER_IDS.includes(offer.localizationId)) next[offer.localizationId] = offer;
        }

        set({ offers: next });
    },
}));

export const gameTokensStore = createGameTokensStore();
