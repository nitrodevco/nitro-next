/**
 * The offer centre's life - `OfferCenter`'s constructor and `dispose`, and the provider
 * constructors' `ExternalInterface.addCallback`s. Not a packet listener, hence not a `*Handlers`.
 *
 * Flash builds the offer centre in `HabboClubCenter.initComponent` when `offers.enabled` and
 * `offers.habboclub.enabled` are both on; from then it polls every enabled provider every 30
 * minutes (`PROVIDER_POLLING_FREQUENCY`, first poll at once). An enabled Supersonic provider
 * publishes `supersonicAdsOnCampaigns{Ready,Completed,Open,Close}` on the page for the ad script to
 * call back; an enabled SponsorPay provider publishes `sponsorPay{Loaded,OnStart,NoOffers,OnClose,
 * OnConversion}`, and closes its own popup 150 seconds after `showVideo` if the script never does
 * (`§_-Z2O§`). `sponsorPayOnConversion` calls `OfferCenter.showSuccess`, which is empty.
 */
import { isOfferProviderEnabled, loadOfferProviders, onSponsorPayClose, onSponsorPayLoaded, onSponsorPayOffer, onSupersonicCampaignsReady, onSupersonicPopup } from '#base/commands';
import { offerCenterStore } from '#base/context/offer-center';
import { systemStore } from '#base/context/system';

/** `OfferCenter.PROVIDER_POLLING_FREQUENCY`. */
const PROVIDER_POLLING_FREQUENCY = 1800000;
/** `SponsorPayProvider.§_-TY§`: the popup's reset timer. */
const SPONSOR_PAY_RESET_DELAY = 150000;

/** `HabboClubCenter.initComponent`'s condition for `catalog.getOfferCenter(this)`. */
export const isOfferCenterEnabled = (): boolean => {
    const { config } = systemStore.getState();

    return (config['offers.enabled'] === true) && (config['offers.habboclub.enabled'] === true);
};

export const bridgeOfferCenter = () => {
    if (!isOfferCenterEnabled()) return () => {};

    const callbacks: string[] = [];

    const addCallback = (name: string, callback: (...args: string[]) => void) => {
        Reflect.set(globalThis, name, callback);
        callbacks.push(name);
    };

    // `SupersonicProvider`'s constructor.
    if (isOfferProviderEnabled('supersonic')) {
        addCallback('supersonicAdsOnCampaignsReady', count => onSupersonicCampaignsReady(count));
        addCallback('supersonicAdsOnCampaignCompleted', () => {});
        addCallback('supersonicAdsOnCampaignOpen', () => onSupersonicPopup(true));
        addCallback('supersonicAdsOnCampaignClose', () => onSupersonicPopup(false));
    }

    // `SponsorPayProvider`'s constructor.
    if (isOfferProviderEnabled('sponsorpay')) {
        addCallback('sponsorPayLoaded', () => onSponsorPayLoaded());
        addCallback('sponsorPayOnStart', () => onSponsorPayOffer(true));
        addCallback('sponsorPayNoOffers', () => onSponsorPayOffer(false));
        addCallback('sponsorPayOnClose', () => onSponsorPayClose());
        addCallback('sponsorPayOnConversion', () => {});
    }

    let resetTimer: ReturnType<typeof setTimeout> | undefined = undefined;

    const stopResetTimer = () => {
        if (resetTimer !== undefined) clearTimeout(resetTimer);

        resetTimer = undefined;
    };

    // `showVideo`: `§_-Z2O§.reset(); start()`; `sponsorPayOnClose`: `stop()`.
    const unsubscribe = offerCenterStore.subscribe((state, previous) => {
        if (state.sponsorPay.videoShown !== previous.sponsorPay.videoShown) {
            stopResetTimer();
            resetTimer = setTimeout(() => {
                resetTimer = undefined;
                onSponsorPayClose();
            }, SPONSOR_PAY_RESET_DELAY);
        } else if (!state.sponsorPay.showingPopup && previous.sponsorPay.showingPopup) {
            stopResetTimer();
        }
    });

    const pollTimer = setInterval(loadOfferProviders, PROVIDER_POLLING_FREQUENCY);

    loadOfferProviders();

    return () => {
        clearInterval(pollTimer);
        stopResetTimer();
        unsubscribe();

        // The providers' `dispose`: `addCallback(name, null)` takes each one off the page again.
        for (const name of callbacks) Reflect.deleteProperty(globalThis, name);

        offerCenterStore.getState().resetOfferCenter();
    };
};
