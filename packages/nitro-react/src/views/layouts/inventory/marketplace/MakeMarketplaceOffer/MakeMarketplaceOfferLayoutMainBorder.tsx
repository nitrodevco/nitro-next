import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Named region `main_border` of MakeMarketplaceOfferLayout - configured through the parent's `mainBorder` prop. */
export interface MakeMarketplaceOfferLayoutMainBorderProps {
    captionAmountRequest?: string;
    captionAveragePrice?: string;
    captionExpirationInfo?: string;
    captionFinalPrice?: string;
    captionFurniDesc?: string;
    captionFurniName?: string;
    captionLowestPrice?: string;
    captionPriceRequest?: string;
    captionSuggestedPrice?: string;
    layout?: BoxLayout;
    onCancelMakeOfferButton?: () => void;
    onCopySuggestedPriceButton?: () => void;
    onMakeOfferButton?: () => void;
    rarityItemOverlayWidget?: ReactNode;
    srcFurniImage?: string;
    tintFurniImage?: string;
    uniqueItemOverlayWidget?: ReactNode;
    visibleFurniDesc?: boolean;
    visibleRarityItemOverlayWidget?: boolean;
    visibleUniqueItemOverlayWidget?: boolean;
}

export const MakeMarketplaceOfferLayoutMainBorder = ({ captionAmountRequest, captionAveragePrice, captionExpirationInfo, captionFinalPrice, captionFurniDesc, captionFurniName, captionLowestPrice, captionPriceRequest, captionSuggestedPrice, layout, onCancelMakeOfferButton, onCopySuggestedPriceButton, onMakeOfferButton, rarityItemOverlayWidget, srcFurniImage, tintFurniImage, uniqueItemOverlayWidget, visibleFurniDesc, visibleRarityItemOverlayWidget, visibleUniqueItemOverlayWidget }: MakeMarketplaceOfferLayoutMainBorderProps) => {
    const t = useTranslation();
    const [ priceInputValue, setPriceInputValue ] = useState('');
    const [ amountInputValue, setAmountInputValue ] = useState('');

    return (
        <Region
            name="main_border"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: -5, ...layout }}
        >
            <Border
                variant="105"
                name="image_border"
                layout={{ position: 'absolute', left: 10, width: 70, top: 12, height: 70 }}
            >
                <ThemeImage
                    name="furni_image"
                    src={srcFurniImage}
                    tint={tintFurniImage}
                    layout={{ position: 'absolute', left: 0, width: 70, top: 0, height: 70 }}
                />
            </Border>
            {(visibleUniqueItemOverlayWidget ?? false) && (
                <WidgetSlot
                    widgetType="limited_item_overlay_preview"
                    name="unique_item_overlay_widget"
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                >
                    {uniqueItemOverlayWidget}
                </WidgetSlot>
            )}
            {(visibleRarityItemOverlayWidget ?? false) && (
                <WidgetSlot
                    widgetType="rarity_item_overlay_grid"
                    name="rarity_item_overlay_widget"
                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                >
                    {rarityItemOverlayWidget}
                </WidgetSlot>
            )}
            <ThemeText
                text={captionFurniName ?? t('001_lorem_ipsum_title')}
                textStyle="text-style-u-headline-medium"
                textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                name="furni_name"
                verticalAlign="top"
                layout={{ position: 'absolute', right: 10, width: 190, top: 13, height: 56 }}
            />
            {(visibleFurniDesc ?? false) && (
                <ThemeText
                    text={captionFurniDesc ?? t('002_lorem_ipsum_content')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                    name="furni_desc"
                    verticalAlign="top"
                    layout={{ position: 'absolute', right: 10, width: 190, top: 34, height: 49 }}
                />
            )}
            <ThemeText
                text={captionExpirationInfo ?? t('inventory.marketplace.make_offer.expiration_info_days')}
                textOptions={{ wordWrap: true, wordWrapWidth: 268 }}
                name="expiration_info"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, right: 10, top: 87, height: 39 }}
            />
            <ThemeText
                text={captionPriceRequest ?? t('inventory.marketplace.make_offer.price_request')}
                textStyle="text-style-u-headline-small"
                textOptions={{ align: 'right' }}
                name="price_request"
                layout={{ position: 'absolute', right: 79, width: 295, top: 131, height: 19 }}
            />
            <Border
                variant="105"
                name="input_border"
                layout={{ position: 'absolute', right: 10, width: 66, top: 129, height: 26 }}
            >
                <TextInput
                    value={priceInputValue}
                    onChange={setPriceInputValue}
                    layout={{ position: 'absolute', left: 8, right: 8, top: 3, bottom: 4, minWidth: 50, maxWidth: 50 }}
                />
            </Border>
            <ThemeText
                text={captionAmountRequest ?? t('sellinmarketplace.amount')}
                textStyle="text-style-u-headline-small"
                textOptions={{ align: 'right' }}
                name="amount_request"
                layout={{ position: 'absolute', right: 79, width: 295, top: 160, height: 19 }}
            />
            <Border
                variant="105"
                name="amount_input_border"
                layout={{ position: 'absolute', right: 10, width: 66, top: 158, height: 26 }}
            >
                <TextInput
                    value={amountInputValue}
                    onChange={setAmountInputValue}
                    layout={{ position: 'absolute', left: 8, right: 8, top: 3, bottom: 4, minWidth: 50, maxWidth: 50 }}
                />
            </Border>
            <Region layout={{ position: 'absolute', left: 10, right: 10, bottom: 6, height: 197, flexDirection: 'column', gap: 7 }}>
                <ThemeText
                    text={captionAveragePrice ?? t('inventory.marketplace.make_offer.average_price')}
                    name="average_price"
                    layout={{ alignSelf: 'stretch', height: 18, flexShrink: 0 }}
                />
                <ThemeText
                    text={captionLowestPrice ?? t('inventory.marketplace.make_offer.lowest_price')}
                    name="lowest_price"
                    layout={{ alignSelf: 'stretch', height: 18, flexShrink: 0 }}
                />
                <ThemeText
                    text={captionSuggestedPrice ?? t('inventory.marketplace.make_offer.suggested_price')}
                    name="suggested_price"
                    layout={{ alignSelf: 'stretch', height: 18, flexShrink: 0 }}
                />
                <Button
                    variant="3"
                    name="copy_suggested_price_button"
                    onPointerTap={onCopySuggestedPriceButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ width: 138, height: 24, flexShrink: 0, maxWidth: 150 }}
                >
                    {t('inventory.marketplace.make_offer.copy_suggested_price')}
                </Button>
                <Border
                    variant="105"
                    name="final_price_border"
                    layout={{ alignSelf: 'stretch', height: 54, flexShrink: 0 }}
                >
                    <ThemeText
                        text={captionFinalPrice ?? t('inventory.marketplace.make_offer.final_price')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 257, align: 'center' }}
                        name="final_price"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 6, right: 5, alignSelf: 'center', marginTop: -1, marginBottom: 1, height: 30, maxWidth: 257 }}
                    />
                </Border>
                <Region
                    name="buttons"
                    layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0 }}
                >
                    <Button
                        variant="3"
                        name="cancel_make_offer_button"
                        onPointerTap={onCancelMakeOfferButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', right: 2, width: 130, top: 0, bottom: 2, maxWidth: 130 }}
                    >
                        {t('inventory.marketplace.make_offer.cancel')}
                    </Button>
                    <Button
                        variant="3"
                        name="make_offer_button"
                        onPointerTap={onMakeOfferButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', left: 0, width: 130, top: 0, bottom: 2, maxWidth: 130 }}
                    >
                        {t('inventory.marketplace.make_offer.post')}
                    </Button>
                </Region>
            </Region>
        </Region>
    );
};
