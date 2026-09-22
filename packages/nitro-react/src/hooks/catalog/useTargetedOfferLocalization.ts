/**
 * `OfferView.getLocalization(key, default)`: the text under `key` (else `default`, else the key
 * itself - Flash passes `param2 || param1`), with `%itemsleft%` replaced by the offer's
 * `purchaseLimit`. Every targeted offer view localizes through it.
 */
import { useTranslation } from '#base/context/system';
import { TargetedOffer } from '#base/context/targeted-offers';

export const useTargetedOfferLocalization = (offer: TargetedOffer) => {
    const t = useTranslation();

    return (key: string, defaultValue: string = '') => t(key, defaultValue || key, { itemsleft: String(offer.purchaseLimit) });
};
