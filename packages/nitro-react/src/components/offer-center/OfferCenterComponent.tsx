/**
 * Mounts the offer centre's reward list (`OfferCenter.showRewards`) while its window is up -
 * opened by `showOfferRewards`, closed by its close button (`OfferCenter.hide`).
 */
import { useIsWindowVisible, useWindowActions } from '#base/context/system';
import { OfferCenterView } from '#base/views/offer-center/OfferCenterView';

export const OfferCenterComponent = () => {
    const isVisible = useIsWindowVisible('offer_center');
    const { hideWindow } = useWindowActions();

    if (!isVisible) return null;

    return <OfferCenterView onClose={() => hideWindow('offer_center')} />;
};
