/**
 * The offer centre's behaviour - `catalog/offers/OfferCenter` (`IOfferCenter`: `showRewards`,
 * `showVideo`; `showingVideo` is the store's `getOfferCenterShowingVideo`) and its providers `SupersonicProvider` and `SponsorPayProvider`,
 * whose state is `offerCenterStore`.
 *
 * A provider is a script on the hotel's web page, reached through `ExternalInterface.call`: the
 * port calls the same global functions by the same names (`supersonicAdsLoadCampaigns`,
 * `SponsorPay.loadIntegration`, ...) the way Sulake's own JavaScript client does
 * (`flash/external/ExternalInterface`), and a function the page does not have throws, which each
 * provider catches and logs exactly where Flash does. `ExternalInterface.available` is always true
 * in a browser, so `offers.supersonic.enabled` alone enables Supersonic, and a non-empty
 * `offers.sponsorpay.appid` SponsorPay.
 *
 * `VideoOfferManager` (the SuperSaver ads behind the toolbar's `VideoOfferExtension`) is not here:
 * its `enabled` flag is only ever assigned `false` - in its constructor and again on every
 * `UserRightsMessage` - so `load` and `launch` return at once and the extension is never shown.
 * There is nothing of it to port.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';

import { OFFER_PROVIDERS, offerCenterStore, OfferProviderName } from '#base/context/offer-center';
import { configBoolean, configString, systemStore } from '#base/context/system';
import { callPageFunction } from '#base/utils';

/** `SponsorPayProvider`'s `SponsorPay.loadIntegration` argument: `offers.sponsorpay.appid`. */
const getSponsorPayAppId = (): string => {
    return configString('offers.sponsorpay.appid');
};

/** `ExternalInterface.available`: a page to call into. */
const externalInterfaceAvailable = (): boolean => (typeof window !== 'undefined');

/** `SupersonicProvider.enabled`. */
const supersonicEnabled = (): boolean => (configBoolean('offers.supersonic.enabled')) && externalInterfaceAvailable();

/** `SponsorPayProvider.enabled`. */
const sponsorPayEnabled = (): boolean => (getSponsorPayAppId() !== '') && externalInterfaceAvailable();

/** `IOfferProvider.enabled`. */
export const isOfferProviderEnabled = (provider: OfferProviderName): boolean => ((provider === 'supersonic') ? supersonicEnabled() : sponsorPayEnabled());

/** `OfferCenter.updateVideoStatus`: the first enabled provider with a video, told to the extension. */
export const updateOfferVideoStatus = () => {
    const state = offerCenterStore.getState();
    const provider = OFFER_PROVIDERS.find(name => isOfferProviderEnabled(name) && ((name === 'supersonic') ? (state.supersonic.offerCount > 0) : state.sponsorPay.videoAvailable)) ?? null;

    state.setVideoStatus(provider, provider !== null);
};

/** `SupersonicProvider.load`. */
const loadSupersonic = () => {
    if (!supersonicEnabled() || offerCenterStore.getState().supersonic.loaded) return;

    try {
        callPageFunction('supersonicAdsLoadCampaigns');
        offerCenterStore.getState().setSupersonic({ loaded: true });
    } catch (error) {
        NitroLogger.log(`External interface not working. Could not call supersonicAdsLoadCampaigns: ${error}`);
    }
};

/** `SponsorPayProvider.sponsorPayLoaded`: the integration is in, the page is asked to fetch an offer in the background. */
export const onSponsorPayLoaded = () => {
    const { sponsorPay, setSponsorPay } = offerCenterStore.getState();

    if (sponsorPay.showingPopup) return;

    setSponsorPay({ videoAvailable: false });

    try {
        if (externalInterfaceAvailable()) callPageFunction('SponsorPay.backgroundLoad');
        else NitroLogger.log('External interface not available. Could not call SponsorPay.backgroundLoad.');
    } catch (error) {
        NitroLogger.log(`External interface not working. Could not call SponsorPay.backgroundLoad: ${error}`);
    }
};

/** `SponsorPayProvider.load`. */
const loadSponsorPay = () => {
    if (offerCenterStore.getState().sponsorPay.loaded) {
        onSponsorPayLoaded();

        return;
    }

    if (!sponsorPayEnabled()) return;

    try {
        callPageFunction('SponsorPay.loadIntegration', getSponsorPayAppId());
        offerCenterStore.getState().setSponsorPay({ loaded: true });
    } catch (error) {
        NitroLogger.log(`External interface not working. Could not call SponsorPay.loadIntegration: ${error}`);
    }
};

/** `OfferCenter.onPollTimer`: every enabled provider loads. */
export const loadOfferProviders = () => {
    if (supersonicEnabled()) loadSupersonic();
    if (sponsorPayEnabled()) loadSponsorPay();
};

/** `SupersonicProvider.onCampaignsReady` - the page script's `supersonicAdsOnCampaignsReady(count)`. */
export const onSupersonicCampaignsReady = (count: string) => {
    offerCenterStore.getState().setSupersonic({ offerCount: Math.trunc(Number(count)) || 0 });
    updateOfferVideoStatus();
};

/** `SupersonicProvider.onCampaignOpen` / `onCampaignClose`. */
export const onSupersonicPopup = (showingPopup: boolean) => {
    offerCenterStore.getState().setSupersonic({ showingPopup });
    updateOfferVideoStatus();
};

/** `SponsorPayProvider.sponsorPayOnStart` / `sponsorPayNoOffers`: an offer is ready, or there is none. */
export const onSponsorPayOffer = (videoAvailable: boolean) => {
    offerCenterStore.getState().setSponsorPay({ videoAvailable });
    updateOfferVideoStatus();
};

/** `SponsorPayProvider.sponsorPayOnClose` (also its 150 second reset timer): the popup is gone, a new offer is fetched. */
export const onSponsorPayClose = () => {
    offerCenterStore.getState().setSponsorPay({ showingPopup: false });

    try {
        if (externalInterfaceAvailable()) callPageFunction('SponsorPay.backgroundLoad');
        else NitroLogger.log('External interface not available. Could not call SponsorPay.backgroundLoad.');
    } catch (error) {
        NitroLogger.log(`External interface not working. Could not call SponsorPay.backgroundLoad: ${error}`);
    } finally {
        updateOfferVideoStatus();
    }
};

/**
 * `IOfferCenter.showVideo`: the picked provider plays its video - `SupersonicProvider.showVideo`
 * (one campaign used up) or `SponsorPayProvider.showVideo` (its popup up, the reset timer
 * started by `bridgeOfferCenter`).
 */
export const showOfferVideo = () => {
    const { activeProvider, supersonic, sponsorPay, setSupersonic, setSponsorPay } = offerCenterStore.getState();

    if (activeProvider === 'supersonic') {
        if (!supersonicEnabled() || (supersonic.offerCount <= 0)) return;

        try {
            callPageFunction('supersonicAdsCamapaignEngage');
            setSupersonic({ offerCount: supersonic.offerCount - 1 });
        } catch (error) {
            NitroLogger.log(`External interface not working. Could not call supersonicAdsCamapaignEngage: ${error}`);
        }

        return;
    }

    if (activeProvider === 'sponsorpay') {
        if (!sponsorPay.loaded || !sponsorPayEnabled()) return;

        try {
            callPageFunction('SponsorPay.showVideo');
            setSponsorPay({ showingPopup: true, videoShown: sponsorPay.videoShown + 1 });
            updateOfferVideoStatus();
        } catch (error) {
            NitroLogger.log(`External interface not working. Could not call SponsorPay.showVideo: ${error}`);
        }
    }
};

/**
 * `IOfferCenter.showRewards`: the `offer_center` window, its list built now. No Flash code path
 * calls it in this revision - its one caller, the toolbar's `OfferExtension`, is never
 * constructed - so it is the offer centre's API for a caller that does, as in Flash.
 */
export const showOfferRewards = () => {
    offerCenterStore.getState().stampOfferRewards(new Date().toLocaleString());
    systemStore.getState().showWindow('offer_center');
};
