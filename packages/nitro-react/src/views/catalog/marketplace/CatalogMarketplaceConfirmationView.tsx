import { useState } from 'react';

import { confirmMarketplacePurchase } from '#base/commands';
import { useCatalogMarketplaceActions, useCatalogStore } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useSystemStore, useTranslation } from '#base/context/system';
import { Border, Button, CheckBox, Frame, Region, ThemeText } from '#base/theme';
import { getMarketplaceOfferTexts, MARKETPLACE_PURCHASE_CONFIRM_TYPE_HIGHER, MARKETPLACE_PURCHASE_CONFIRM_TYPE_NORMAL } from '#base/utils';

import { CatalogMarketplaceOfferImageView } from './CatalogMarketplaceOfferImageView';

/** `marketplace_purchase_confirmation`'s frame, and the `disclaimer` container `showConfirmation` cuts off it when the disclaimer is off. */
const FRAME_WIDTH = 279;
const FRAME_HEIGHT = 255;
const DISCLAIMER_HEIGHT = 24;

/**
 * Flash's `catalog/marketplace/MarketplaceConfirmationDialog`, drawn from
 * `marketplace_purchase_confirmation.xml` (279x255, style 3 frame in `0x418db0` with its drop
 * shadow, margins 3/35/3/3): the offer's icon in a 48x48 `0xf1f1f1` style 0 border, its name, the
 * header (`confirm_header`, or `confirm_higher_header` when the price went up while buying), the
 * price (`confirm_price`), the average price over the configuration's period (" - " for none) and
 * the offer count - those two only when their texts exist (`getLocalizationRaw`) - and buy and
 * cancel.
 *
 * With `disclaimer.credit_spending.enabled` the `disclaimer` checkbox has to be ticked before buy
 * is enabled; without it (the hotel's value) the container is disposed and the frame loses its
 * 24px. Buy sends `BuyMarketplaceOfferMessageComposer` and closes the dialog, as the close button
 * and cancel do. The dialog belongs to the marketplace logic, not the page, so it stays up when
 * the catalogue closes.
 *
 * The icon carries the limited item plaque and the rarity plaque (`CatalogMarketplaceOfferImageView`).
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
    const disclaimerEnabled = (useConfigValue<boolean>('disclaimer.credit_spending.enabled') === true);
    // `setDisclaimerAccepted`, for the confirmation on show.
    const [ accepted, setAccepted ] = useState<{ for: unknown; value: boolean }>({ for: undefined, value: false });

    if (!confirmation) return null;

    const { type, offer } = confirmation;
    const disclaimerAccepted = !disclaimerEnabled || ((accepted.for === confirmation) && accepted.value);
    const { name } = getMarketplaceOfferTexts(offer, wallItems, t);

    let headerText = '';

    if (type === MARKETPLACE_PURCHASE_CONFIRM_TYPE_NORMAL) headerText = t('catalog.marketplace.confirm_header');
    if (type === MARKETPLACE_PURCHASE_CONFIRM_TYPE_HIGHER) headerText = t('catalog.marketplace.confirm_higher_header');

    const hide = () => setMarketplaceConfirmation(undefined);

    const buy = () => {
        confirmMarketplacePurchase(send, offer.offerId);
        hide();
    };

    return (
        <Frame
            id="catalog-marketplace-purchase-confirmation"
            variant="3"
            centered
            rememberPosition={false}
            caption={t('catalog.marketplace.confirm_title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            margins={[ 3, 35, 3, 3 ]}
            onClose={hide}
            layout={{ position: 'absolute', width: FRAME_WIDTH, height: FRAME_HEIGHT - (disclaimerEnabled ? 0 : DISCLAIMER_HEIGHT) }}
        >
            <Border
                variant="0"
                tintColor="#f1f1f1"
                layout={{ position: 'absolute', left: 12, width: 48, top: 12, height: 48 }}
            >
                <CatalogMarketplaceOfferImageView
                    offer={offer}
                    withExtraData={false}
                    left={4}
                    top={4}
                />
            </Border>
            <ThemeText
                name="item_name"
                text={name}
                textStyle="u_bold"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 69, width: 184, top: 29 }}
            />
            <ThemeText
                name="header_text"
                text={headerText}
                textStyle="u_italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 252 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 11, width: 256, top: 65 }}
            />
            <ThemeText
                name="item_price"
                text={t('catalog.marketplace.confirm_price', '', { price: String(offer.price) })}
                textStyle="u_small"
                textOptions={{ wordWrap: true, wordWrapWidth: 242 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 11, width: 246, top: 100 }}
            />
            {hasAverageText && (
                <ThemeText
                    name="item_average_price"
                    text={t('catalog.marketplace.offer_details.average_price', '', { days: String(averagePricePeriod), average: (offer.averagePrice === 0) ? ' - ' : String(offer.averagePrice) })}
                    textStyle="u_small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 242 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 11, width: 246, top: 120 }}
                />
            )}
            {hasCountText && (
                <ThemeText
                    name="offer_count"
                    text={t('catalog.marketplace.offer_details.offer_count', '', { count: String(offer.offerCount) })}
                    textStyle="u_small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 242 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 11, width: 246, top: 140 }}
                />
            )}
            <Button
                variant="3"
                name="buy_button"
                disabled={!disclaimerAccepted}
                onPointerTap={buy}
                layout={{ position: 'absolute', left: 9, width: 120, top: 184, height: 25 }}
            >
                {t('catalog.purchase_confirmation.buy')}
            </Button>
            <Button
                variant="3"
                name="cancel_button"
                onPointerTap={hide}
                layout={{ position: 'absolute', left: 147, width: 120, top: 184, height: 25 }}
            >
                {t('catalog.purchase_confirmation.cancel')}
            </Button>
            {disclaimerEnabled && (
                <Region
                    name="disclaimer"
                    layout={{ position: 'absolute', left: 9, width: 252, top: 163, height: 24 }}
                >
                    <ThemeText
                        text={t('disclaimer.credit_spending')}
                        textStyle="u_small"
                        textOptions={{ wordWrap: true, wordWrapWidth: 227 }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 17, width: 231, top: 1 }}
                    />
                    <CheckBox
                        variant="3"
                        name="spending_disclaimer"
                        selected={disclaimerAccepted}
                        onPointerTap={() => setAccepted({ for: confirmation, value: !disclaimerAccepted })}
                        layout={{ position: 'absolute', left: 0, width: 252, top: 0, height: 24 }}
                    />
                </Region>
            )}
        </Frame>
    );
};
