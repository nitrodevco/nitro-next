import { useState } from 'react';

import { maximizeTargetedOffer, purchaseTargetedOffer } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import { TargetedOffer } from '#base/context/targeted-offers';
import { useTargetedOfferLocalization } from '#base/hooks';
import { Box, Button, ButtonThick, CheckBox, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { CatalogCurrencyIcon } from '#base/views/catalog/CatalogCurrencyIcon';

/** The `content` itemlist's rows, `spacing` 10 apart: the 171px product block, the disclaimer, the buttons. */
const PRODUCT_BLOCK_HEIGHT = 171;
const DISCLAIMER_HEIGHT = 17;
const BUTTONS_HEIGHT = 27;
const CONTENT_SPACING = 10;

export interface TargetedOfferPurchaseConfirmationViewProps {
    offer: TargetedOffer;
    quantity: number;
}

/**
 * Flash's `TargetedOfferPurchaseConfirmationView` on `targeted_offer_purchase_confirmation.xml`
 * (325 wide, frame style 3 in `0x418db0`, content margins 1, 25, 1, 1), centred.
 *
 * The `content` itemlist is `resize_to_accommodate_children` + `reflect_vertical_resize_to_parent`,
 * so the frame follows it: 25 + 8 above it, 23 below, 291 with every row. `disclaimer` is disposed
 * unless `disclaimer.credit_spending.enabled` (the hotel's is off), and the frame closes up round it.
 * When it is there its checkbox changes nothing: `setDisclaimerAccepted` enables and disables a
 * `select_button` this layout does not have, so the buy button stays live either way - as in Flash.
 *
 * `product_name` is the offer's title, `quantity` `X <n>` only when
 * `catalog.multiple.purchase.enabled` and more than one is bought, and `purchase_cost_box` is
 * `HabboCatalogUtils.showPriceInContainer`: `amount_N` (the price times the quantity, `+ ` before
 * the second) and `unit_N` (the big currency icon) - credits, then activity points, `0` credits for
 * a free offer. Beside them the image library's `targetedoffers/coins_diamonds_icon.png`.
 *
 * Cancel and the header close go back to the dialog (`maximizeOffer`), buy is
 * `purchaseTargetedOffer`.
 */
export const TargetedOfferPurchaseConfirmationView = ({ offer, quantity }: TargetedOfferPurchaseConfirmationViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const getLocalization = useTargetedOfferLocalization(offer);
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const disclaimerEnabled = (useConfigValue<boolean>('disclaimer.credit_spending.enabled') === true);
    const multiplePurchaseEnabled = (useConfigValue<boolean>('catalog.multiple.purchase.enabled') === true);
    const [ disclaimerSelected, setDisclaimerSelected ] = useState(false);

    const contentHeight = PRODUCT_BLOCK_HEIGHT + CONTENT_SPACING + (disclaimerEnabled ? (DISCLAIMER_HEIGHT + CONTENT_SPACING) : 0) + BUTTONS_HEIGHT;

    const maximize = () => maximizeTargetedOffer(send, offer);

    // `HabboCatalogUtils.getPriceArray(offer, quantity, false)`.
    const prices: { amount: number; unit: number }[] = [];

    if (offer.priceInCredits > 0) prices.push({ amount: offer.priceInCredits * quantity, unit: -1 });
    if (offer.priceInActivityPoints > 0) prices.push({ amount: offer.priceInActivityPoints * quantity, unit: offer.activityPointType });
    if (!prices.length) prices.push({ amount: 0, unit: -1 });

    return (
        <Frame
            id="targeted-offer-purchase-confirmation"
            variant="3"
            caption={t('catalog.purchase_confirmation.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 1, 25, 1, 1 ]}
            onClose={maximize}
            layout={{ position: 'absolute', width: 325, height: 25 + 8 + contentHeight + 23, minWidth: 275, minHeight: 150 }}
        >
            <Region
                name="content"
                layout={{ position: 'absolute', left: 0, width: 323, top: 8, height: contentHeight, flexDirection: 'column', gap: CONTENT_SPACING }}
            >
                <Region layout={{ width: 344, height: PRODUCT_BLOCK_HEIGHT, flexShrink: 0 }}>
                    <Region
                        name="properties_itemlist"
                        layout={{ position: 'absolute', left: 102, width: 176, top: 24, flexDirection: 'column', gap: 7 }}
                    >
                        <Region
                            name="properties_itemlist"
                            layout={{ width: 176, height: 90, flexShrink: 0, flexDirection: 'column' }}
                        >
                            <ThemeText
                                name="product_name"
                                text={getLocalization(offer.title)}
                                textStyle="u_bold"
                                textOptions={{ fontSize: 14, wordWrap: true, wordWrapWidth: 173 }}
                                verticalAlign="top"
                                layout={{ width: 177, flexShrink: 0 }}
                            />
                            <ThemeText
                                name="quantity"
                                text={(multiplePurchaseEnabled && (quantity > 1)) ? `X ${quantity}` : ''}
                                textStyle="u_bold"
                                textOptions={{ fontSize: 14 }}
                                verticalAlign="top"
                                layout={{ flexShrink: 0 }}
                            />
                            <Region layout={{ flexShrink: 0, flexDirection: 'row' }}>
                                <ThemeText
                                    text={t('catalog.purchase.confirmation.dialog.cost')}
                                    textStyle="u_regular"
                                    textOptions={{ fontSize: 14 }}
                                    verticalAlign="top"
                                    layout={{ marginTop: 1, flexShrink: 0 }}
                                />
                                <Region
                                    name="purchase_cost_box"
                                    layout={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1, flexShrink: 0 }}
                                >
                                    <Box layout={{ width: 1, height: 1 }} />
                                    {prices.map((price, index) => (
                                        <Box
                                            key={index}
                                            layout={{ flexDirection: 'row', alignItems: 'flex-start', gap: 1 }}
                                        >
                                            <ThemeText
                                                name={`amount_${index}`}
                                                text={`${(index > 0) ? '+ ' : ''}${price.amount}`}
                                                textStyle="u_bold"
                                                textOptions={{ fontSize: 14 }}
                                                verticalAlign="top"
                                                layout={{ marginTop: 1 }}
                                            />
                                            <CatalogCurrencyIcon
                                                type={price.unit}
                                                big
                                            />
                                        </Box>
                                    ))}
                                    <Box layout={{ width: 2, height: 1 }} />
                                </Region>
                            </Region>
                        </Region>
                    </Region>
                    <ThemeImage
                        src={`${imageLibraryUrl}targetedoffers/coins_diamonds_icon.png`}
                        bitmap={{}}
                        layout={{ position: 'absolute', left: 13, width: 68, top: 23, height: 40 }}
                    />
                </Region>
                {disclaimerEnabled && (
                    <Region
                        name="disclaimer"
                        layout={{ width: 311, height: DISCLAIMER_HEIGHT, flexShrink: 0 }}
                    >
                        <ThemeText
                            text={t('disclaimer.credit_spending')}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 274 }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 33, width: 278, top: 0 }}
                        />
                        <CheckBox
                            variant="3"
                            name="spending_disclaimer"
                            selected={disclaimerSelected}
                            onPointerTap={() => setDisclaimerSelected(value => !value)}
                            layout={{ position: 'absolute', left: 13, width: 296, top: 0, height: 16 }}
                        />
                    </Region>
                )}
                <Region
                    name="buttons"
                    layout={{ height: BUTTONS_HEIGHT, marginLeft: 13, flexShrink: 0, flexDirection: 'row', gap: 76 }}
                >
                    <Button
                        variant="3"
                        name="cancel_button"
                        onPointerTap={maximize}
                        layout={{ width: 110, height: 27, flexShrink: 0 }}
                    >
                        {t('catalog.purchase_confirmation.cancel')}
                    </Button>
                    <ButtonThick
                        variant="5"
                        name="buy_button"
                        tintColor="#00aa00"
                        onPointerTap={() => purchaseTargetedOffer(send, offer, quantity)}
                        layout={{ width: 110, height: 27, flexShrink: 0 }}
                    >
                        {t('catalog.purchase_confirmation.buy')}
                    </ButtonThick>
                </Region>
            </Region>
        </Frame>
    );
};
