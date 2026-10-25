/**
 * The club purchase confirmation - Flash's `ClubBuyConfirmationDialog`, the `club_buy_confirmation`
 * window: the subscription's name and end date, its cost and the subscribe button.
 *
 * `showConfirmation`: the name is `catalog.vip.buy.confirm.<extension|subscription>.<days|months>`
 * (extension while the purse has VIP left), with `num_days` / `num_months`; the end date is
 * `catalog.vip.buy.confirm.end_date` with the offer's `day`, `month` and `year`, and the cost is
 * `showPriceInContainer` into `purchase_cost_box`. While `disclaimer.credit_spending.enabled` is on
 * the subscribe button waits for the disclaimer's checkbox (`setDisclaimerAccepted`); otherwise the
 * disclaimer is disposed. Subscribe is `confirmSelection` (`purchaseProduct`), the close and cancel
 * `forgetPageDuringVipPurchase`.
 */
import { useState } from 'react';

import { cancelClubBuy, confirmClubBuy } from '#base/commands';
import { useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigBoolean, useConfigData, useTranslation } from '#base/context/system';
import { getPurseHasClubLeft, useOwnClubSubscription } from '#base/context/user';
import { TemplateWindow, useTemplateLibrary } from '#base/theme';
import { getClubOfferPrices } from '#base/utils';

import { CATALOG_LIBRARY, catalogTemplateId } from '../page/catalogTemplates';
import { priceDisplayBindings } from '../page/widgets/catalogPrice';

export const CatalogClubBuyConfirmationView = () => {
    const confirmation = useCatalogStore(x => x.clubBuyConfirmation);
    const clubSubscription = useOwnClubSubscription();
    const hasDisclaimer = useConfigBoolean('disclaimer.credit_spending.enabled');
    const config = useConfigData();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const [ disclaimer, setDisclaimer ] = useState({ offerId: -1, accepted: false });

    if (!confirmation) return null;

    const { offer } = confirmation;
    const accepted = (disclaimer.offerId === offer.offerId) && disclaimer.accepted;
    const kind = (getPurseHasClubLeft(clubSubscription) && clubSubscription.isVip) ? 'extension' : 'subscription';
    const unit = (offer.months === 0) ? 'days' : 'months';
    const cancel = () => cancelClubBuy(store);
    const priceDisplay = templates?.[catalogTemplateId('price_display')];

    return (
        <TemplateWindow
            id={catalogTemplateId('club_buy_confirmation')}
            frame={{ id: 'club-buy-confirmation', centered: true, rememberPosition: false, onClose: cancel }}
            bindings={{
                subscription_name: { caption: t(`catalog.vip.buy.confirm.${kind}.${unit}`, '', { [`num_${unit}`]: String((offer.months === 0) ? offer.extraDays : offer.months) }) },
                end_date: { caption: t('catalog.vip.buy.confirm.end_date', '', { day: String(offer.day), month: String(offer.month), year: String(offer.year) }) },
                purchase_cost_box: {
                    items: priceDisplay
                        ? [ { key: 'price_display', from: priceDisplay, bindings: priceDisplayBindings(getClubOfferPrices(offer.priceCredits, offer.priceActivityPoints, offer.priceActivityPointType), config) } ]
                        : [],
                },
                disclaimer: { visible: hasDisclaimer },
                spending_disclaimer: { selected: accepted, onPointerTap: () => setDisclaimer({ offerId: offer.offerId, accepted: !accepted }) },
                select_button: { disabled: hasDisclaimer && !accepted, onPointerTap: () => (!hasDisclaimer || accepted) && confirmClubBuy(send, store) },
                cancel_button: { onPointerTap: cancel },
            }}
        />
    );
};
