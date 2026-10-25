import { useState } from 'react';

import { confirmMarketplacePurchase } from '#base/commands';
import { useCatalogMarketplaceActions, useCatalogStore } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigBoolean, useSystemStore, useTranslation } from '#base/context/system';
import { TemplateWindow } from '#base/theme';
import { getMarketplaceOfferTexts, MARKETPLACE_PURCHASE_CONFIRM_TYPE_HIGHER, MARKETPLACE_PURCHASE_CONFIRM_TYPE_NORMAL } from '#base/utils';

import { marketplaceOfferImageBindings } from './marketplaceOfferImage';

/** `marketplace_purchase_confirmation`'s frame height, and the `disclaimer` container's, which `showConfirmation` takes off it when the disclaimer is off. */
const FRAME_HEIGHT = 255;
const DISCLAIMER_HEIGHT = 24;

/**
 * Flash's `catalog/marketplace/MarketplaceConfirmationDialog`, the `marketplace_purchase_confirmation`
 * window built anew, centred, for each `showConfirmation`: the offer's icon (`setImage`, without the
 * extra data) with its limited and rarity overlays, its name, the header (`confirm_header`, or
 * `confirm_higher_header` when the price went up while buying), the price (`confirm_price`), and the
 * average price over the configuration's period (" - " for none) and the offer count - each hidden
 * when its text does not exist (`getLocalizationRaw`).
 *
 * With `disclaimer.credit_spending.enabled` the `spending_disclaimer` checkbox has to be ticked
 * before buy is enabled (`setDisclaimerAccepted`); without it (the hotel's value) the `disclaimer`
 * container is disposed and the window loses its height. Buy sends
 * `BuyMarketplaceOfferMessageComposer` and closes the dialog, as the close button and cancel do.
 * The dialog belongs to the marketplace logic, not the page, so it stays up when the catalogue closes.
 */
export const CatalogMarketplaceConfirmationView = () => {
    const confirmation = useCatalogStore(x => x.marketplaceConfirmation);
    const averagePricePeriod = useCatalogStore(x => x.marketplaceAveragePricePeriod);
    const { setMarketplaceConfirmation } = useCatalogMarketplaceActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const wallItems = useSystemStore(x => x.wallItems);
    const hasAverageText = useSystemStore(x => x.localizations['catalog.marketplace.offer_details.average_price'] !== undefined);
    const hasCountText = useSystemStore(x => x.localizations['catalog.marketplace.offer_details.offer_count'] !== undefined);
    const disclaimerEnabled = (useConfigBoolean('disclaimer.credit_spending.enabled'));
    // `setDisclaimerAccepted`, for the confirmation on show.
    const [ accepted, setAccepted ] = useState<{ for: unknown; value: boolean }>({ for: undefined, value: false });
    const [ frame ] = useState(() => ({ id: 'catalog-marketplace-purchase-confirmation', centered: true, rememberPosition: false, onClose: () => setMarketplaceConfirmation(undefined) }));

    if (!confirmation) return null;

    const { type, offer } = confirmation;
    const disclaimerAccepted = !disclaimerEnabled || ((accepted.for === confirmation) && accepted.value);
    const { name } = getMarketplaceOfferTexts(offer, wallItems, t);

    let headerText: string | undefined = undefined;

    if (type === MARKETPLACE_PURCHASE_CONFIRM_TYPE_NORMAL) headerText = '${catalog.marketplace.confirm_header}';
    if (type === MARKETPLACE_PURCHASE_CONFIRM_TYPE_HIGHER) headerText = '${catalog.marketplace.confirm_higher_header}';

    const hide = () => setMarketplaceConfirmation(undefined);

    const buy = () => {
        confirmMarketplacePurchase(send, offer.offerId);
        hide();
    };

    return (
        <TemplateWindow
            // `showConfirmation` disposes the window and builds it again.
            key={`${offer.offerId}:${type}`}
            id="habbo-catalog-com/marketplace_purchase_confirmation"
            frame={frame}
            height={FRAME_HEIGHT - (disclaimerEnabled ? 0 : DISCLAIMER_HEIGHT)}
            bindings={{
                ...marketplaceOfferImageBindings(offer, false),
                header_text: { caption: headerText },
                item_name: { caption: name },
                item_price: { caption: t('catalog.marketplace.confirm_price', '', { price: String(offer.price) }) },
                item_average_price: hasAverageText
                    ? { caption: t('catalog.marketplace.offer_details.average_price', '', { days: String(averagePricePeriod), average: (offer.averagePrice === 0) ? ' - ' : String(offer.averagePrice) }) }
                    : { visible: false },
                offer_count: hasCountText
                    ? { caption: t('catalog.marketplace.offer_details.offer_count', '', { count: String(offer.offerCount) }) }
                    : { visible: false },
                buy_button: { disabled: !disclaimerAccepted, onPointerTap: buy },
                cancel_button: { onPointerTap: hide },
                disclaimer: { visible: disclaimerEnabled },
                spending_disclaimer: { selected: disclaimerAccepted, onPointerTap: () => setAccepted({ for: confirmation, value: !disclaimerAccepted }) },
            }}
        />
    );
};
