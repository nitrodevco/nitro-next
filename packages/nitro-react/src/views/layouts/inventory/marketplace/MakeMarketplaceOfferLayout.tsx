import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1341_make_marketplace_offer_xml` (layout "make_marketplace_offer", 300x429) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MakeMarketplaceOfferLayoutProps {
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
    onClose?: () => void;
    onCopySuggestedPriceButton?: () => void;
    onMakeOfferButton?: () => void;
    srcFurniImage?: string;
}

export const MakeMarketplaceOfferLayout = ({ captionAmountRequest, captionAveragePrice, captionExpirationInfo, captionFinalPrice, captionFurniDesc, captionFurniName, captionLowestPrice, captionPriceRequest, captionSuggestedPrice, layout, onCancelMakeOfferButton, onClose, onCopySuggestedPriceButton, onMakeOfferButton, srcFurniImage }: MakeMarketplaceOfferLayoutProps) => {
    const t = useTranslation();
    const [ priceInputValue, setPriceInputValue ] = useState('');
    const [ amountInputValue, setAmountInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('inventory.marketplace.make_offer.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 300, height: 429, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="main_border"
                    params={8388624}
                    layout={{ position: 'absolute', left: 0, width: 288, top: 0, height: 393 }}
                >
                    <Border
                        variant="105"
                        name="image_border"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 70, top: 12, height: 70 }}
                    >
                        <ThemeImage
                            name="furni_image"
                            params={16}
                            src={srcFurniImage}
                            layout={{ position: 'absolute', left: 0, width: 70, top: 0, height: 70 }}
                        />
                    </Border>
                    <WidgetSlot
                        widgetType="limited_item_overlay_preview"
                        name="unique_item_overlay_widget"
                        params={16}
                        visible={false}
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                    <WidgetSlot
                        widgetType="rarity_item_overlay_grid"
                        name="rarity_item_overlay_widget"
                        params={16}
                        visible={false}
                        layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                    />
                    <Region
                        name="furni_name"
                        params={16}
                        layout={{ position: 'absolute', left: 88, width: 190, top: 13, height: 56, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionFurniName ?? t('001_lorem_ipsum_title')}
                            textStyle="text-style-u-headline-medium"
                            textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                        />
                    </Region>
                    <Region
                        name="furni_desc"
                        params={16}
                        visible={false}
                        layout={{ position: 'absolute', left: 88, width: 190, top: 34, height: 49, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionFurniDesc ?? t('002_lorem_ipsum_content')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                        />
                    </Region>
                    <Region
                        name="expiration_info"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 268, top: 87, height: 39, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionExpirationInfo ?? t('inventory.marketplace.make_offer.expiration_info_days')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 268 }}
                        />
                    </Region>
                    <Region
                        name="price_request"
                        params={262160}
                        layout={{ position: 'absolute', right: 79, width: 295, top: 131, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                    >
                        <ThemeText
                            text={captionPriceRequest ?? t('inventory.marketplace.make_offer.price_request')}
                            textStyle="text-style-u-headline-small"
                            textOptions={{ align: 'right' }}
                        />
                    </Region>
                    <Border
                        variant="105"
                        name="input_border"
                        params={16}
                        layout={{ position: 'absolute', left: 212, width: 66, top: 129, height: 26 }}
                    >
                        <TextInput
                            value={priceInputValue}
                            onChange={setPriceInputValue}
                            layout={{ position: 'absolute', left: 8, width: 50, top: 3, height: 19, minWidth: 50, maxWidth: 50 }}
                        />
                    </Border>
                    <Region
                        name="amount_request"
                        params={262160}
                        layout={{ position: 'absolute', right: 79, width: 295, top: 160, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                    >
                        <ThemeText
                            text={captionAmountRequest ?? t('sellinmarketplace.amount')}
                            textStyle="text-style-u-headline-small"
                            textOptions={{ align: 'right' }}
                        />
                    </Region>
                    <Border
                        variant="105"
                        name="amount_input_border"
                        params={16}
                        layout={{ position: 'absolute', left: 212, width: 66, top: 158, height: 26 }}
                    >
                        <TextInput
                            value={amountInputValue}
                            onChange={setAmountInputValue}
                            layout={{ position: 'absolute', left: 8, width: 50, top: 3, height: 19, minWidth: 50, maxWidth: 50 }}
                        />
                    </Border>
                    <Region
                        params={8388624}
                        layout={{ position: 'absolute', left: 10, width: 268, top: 190, height: 197, flexDirection: 'column', gap: 7 }}
                    >
                        <Region
                            name="average_price"
                            params={16}
                            layout={{ width: 268, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionAveragePrice ?? t('inventory.marketplace.make_offer.average_price')} />
                        </Region>
                        <Region
                            name="lowest_price"
                            params={16}
                            layout={{ width: 268, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionLowestPrice ?? t('inventory.marketplace.make_offer.lowest_price')} />
                        </Region>
                        <Region
                            name="suggested_price"
                            params={16}
                            layout={{ width: 268, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionSuggestedPrice ?? t('inventory.marketplace.make_offer.suggested_price')} />
                        </Region>
                        <Button
                            variant="3"
                            name="copy_suggested_price_button"
                            params={393217}
                            onPointerTap={onCopySuggestedPriceButton}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ width: 138, height: 24, flexShrink: 0, maxWidth: 150 }}
                        >
                            {t('inventory.marketplace.make_offer.copy_suggested_price')}
                        </Button>
                        <Border
                            variant="105"
                            name="final_price_border"
                            params={16}
                            layout={{ width: 268, height: 54, flexShrink: 0 }}
                        >
                            <Region
                                name="final_price"
                                params={3145744}
                                layout={{ position: 'absolute', left: 6, width: 257, top: '50%', marginTop: -16, height: 30, maxWidth: 257, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={captionFinalPrice ?? t('inventory.marketplace.make_offer.final_price')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 257, align: 'center' }}
                                />
                            </Region>
                        </Border>
                        <Region
                            name="buttons"
                            params={16}
                            layout={{ width: 270, height: 30, flexShrink: 0 }}
                        >
                            <Button
                                variant="3"
                                name="cancel_make_offer_button"
                                params={393233}
                                onPointerTap={onCancelMakeOfferButton}
                                textStyle="text-style-button-shiny-regular"
                                layout={{ position: 'absolute', right: 2, width: 130, top: 0, height: 28, maxWidth: 130 }}
                            >
                                {t('inventory.marketplace.make_offer.cancel')}
                            </Button>
                            <Button
                                variant="3"
                                name="make_offer_button"
                                params={131089}
                                onPointerTap={onMakeOfferButton}
                                textStyle="text-style-button-shiny-regular"
                                layout={{ position: 'absolute', left: 0, width: 130, top: 0, height: 28, maxWidth: 130 }}
                            >
                                {t('inventory.marketplace.make_offer.post')}
                            </Button>
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
