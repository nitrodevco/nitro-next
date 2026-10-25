import { IPurchasableOffer } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { maximizeTargetedOffer, purchaseTargetedOffer } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigBoolean, useConfigData } from '#base/context/system';
import { TargetedOffer } from '#base/context/targeted-offers';
import { useTargetedOfferLocalization } from '#base/hooks';
import { TemplateWindow, useTemplateLibrary } from '#base/theme';

import { CATALOG_LIBRARY, catalogTemplateId } from '../page/catalogTemplates';
import { priceDisplayItem } from '../page/widgets/catalogPrice';

/**
 * Flash's `TargetedOfferPurchaseConfirmationView` on
 * `habbo-catalog-com/targeted_offer_purchase_confirmation_xml`, centred.
 *
 * `disclaimer` is disposed unless `disclaimer.credit_spending.enabled`, and the `content` list - and
 * the frame with it - closes up round it. When it is there its checkbox changes nothing:
 * `setDisclaimerAccepted` enables and disables a `select_button` this layout does not have, so the
 * buy button stays live either way - as in Flash.
 *
 * `product_name` is the offer's title, `quantity` `X <n>` only when
 * `catalog.multiple.purchase.enabled` and more than one is bought, and `purchase_cost_box` gets
 * `HabboCatalogUtils.showPriceInContainer(box, offer, quantity)`.
 *
 * Cancel and the header close go back to the dialog (`maximizeOffer`), buy is
 * `purchaseTargetedOffer`.
 */
export interface TargetedOfferPurchaseConfirmationViewProps {
    offer: TargetedOffer;
    quantity: number;
}

/**
 * The `IPurchasableOffer` face of a `TargetedOffer` that `HabboCatalogUtils.getPriceArray` reads:
 * its prices, no bundle discount (`bundlePurchaseAllowed` is false) and no silver (`priceInSilver`
 * is -1).
 */
const asPurchasableOffer = (offer: TargetedOffer) => ({
    priceInCredits: offer.priceInCredits,
    priceInActivityPoints: offer.priceInActivityPoints,
    activityPointType: offer.activityPointType,
    priceInSilver: -1,
    bundlePurchaseAllowed: false,
}) as IPurchasableOffer;

export const TargetedOfferPurchaseConfirmationView = ({ offer, quantity }: TargetedOfferPurchaseConfirmationViewProps) => {
    const { send } = useWebSocketContext();
    const getLocalization = useTargetedOfferLocalization(offer);
    const config = useConfigData();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const disclaimerEnabled = (useConfigBoolean('disclaimer.credit_spending.enabled'));
    const multiplePurchaseEnabled = (useConfigBoolean('catalog.multiple.purchase.enabled'));
    const [ disclaimerSelected, setDisclaimerSelected ] = useState(false);

    const maximize = () => maximizeTargetedOffer(send, offer);

    return (
        <TemplateWindow
            id={catalogTemplateId('targeted_offer_purchase_confirmation_xml')}
            frame={{ id: 'targeted-offer-purchase-confirmation', centered: true, rememberPosition: false, onClose: maximize }}
            bindings={{
                disclaimer: { visible: disclaimerEnabled },
                spending_disclaimer: { selected: disclaimerSelected, onPointerTap: () => setDisclaimerSelected(value => !value) },
                product_name: { caption: getLocalization(offer.title) },
                quantity: { caption: (multiplePurchaseEnabled && (quantity > 1)) ? `X ${quantity}` : '' },
                purchase_cost_box: { items: templates ? [ priceDisplayItem(templates, asPurchasableOffer(offer), { config, quantity }) ] : [] },
                cancel_button: { onPointerTap: maximize },
                buy_button: { onPointerTap: () => purchaseTargetedOffer(send, offer, quantity) },
            }}
        />
    );
};
