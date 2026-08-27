import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1582_marketplace_purchase_confirmation_xml` (layout "purchase_confirmation", 279x255) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MarketplacePurchaseConfirmationLayoutProps {
    captionHeaderText?: string;
    captionItemAveragePrice?: string;
    captionItemName?: string;
    captionItemPrice?: string;
    captionOfferCount?: string;
    layout?: BoxLayout;
    onBuyButton?: () => void;
    onCancelButton?: () => void;
    onClose?: () => void;
    onSpendingDisclaimer?: () => void;
    srcItemImage?: string;
    srcUniqueItemBackgroundBitmap?: string;
}

export const MarketplacePurchaseConfirmationLayout = ({ captionHeaderText, captionItemAveragePrice, captionItemName, captionItemPrice, captionOfferCount, layout, onBuyButton, onCancelButton, onClose, onSpendingDisclaimer, srcItemImage, srcUniqueItemBackgroundBitmap }: MarketplacePurchaseConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={33025}
            caption={t('catalog.marketplace.confirm_title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 279, height: 255, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={2192}
                    layout={{ position: 'absolute', left: 0, width: 273, top: 0, height: 217 }}
                >
                    <Border
                        variant="0"
                        params={16}
                        tintColor="#f1f1f1"
                        layout={{ position: 'absolute', left: 12, width: 48, top: 12, height: 48 }}
                    >
                        <Region
                            name="image_container"
                            params={16}
                            layout={{ position: 'absolute', left: 4, width: 40, top: 4, height: 40 }}
                        >
                            <Region
                                visible={false}
                                layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                            >
                                <ThemeImage
                                    name="unique_item_background_bitmap"
                                    params={16}
                                    src={srcUniqueItemBackgroundBitmap ?? layoutImage('unique_item_label_1.png')}
                                    layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 36 }}
                                />
                            </Region>
                            <ThemeImage
                                name="item_image"
                                tags={[ 'BITMAP' ]}
                                params={16}
                                src={srcItemImage}
                                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, minWidth: 40, maxWidth: 40 }}
                            />
                            <WidgetSlot
                                widgetType="limited_item_overlay_grid"
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
                        </Region>
                    </Border>
                    <Region
                        name="item_name"
                        params={16}
                        layout={{ position: 'absolute', left: 69, width: 184, top: 29, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionItemName ?? t('lorem.title')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                    <Region
                        name="header_text"
                        params={16}
                        layout={{ position: 'absolute', left: 11, width: 256, top: 65, height: 36, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionHeaderText ?? t('lorem.header')}
                            textStyle="text-style-u-italic"
                            textOptions={{ wordWrap: true, wordWrapWidth: 256 }}
                        />
                    </Region>
                    <Region
                        name="item_price"
                        params={16}
                        layout={{ position: 'absolute', left: 11, width: 246, top: 100, height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionItemPrice ?? t('catalog.purchase.confirmation.dialog.costs')}
                            textStyle="text-style-u-small"
                            textOptions={{ wordWrap: true, wordWrapWidth: 246 }}
                        />
                    </Region>
                    <Region
                        name="item_average_price"
                        params={16}
                        layout={{ position: 'absolute', left: 11, width: 246, top: 120, height: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionItemAveragePrice ?? t('catalog.marketplace.offer_details.average_price')}
                            textStyle="text-style-u-small"
                            textOptions={{ wordWrap: true, wordWrapWidth: 246 }}
                        />
                    </Region>
                    <Region
                        name="offer_count"
                        params={16}
                        layout={{ position: 'absolute', left: 11, width: 246, top: 140, height: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionOfferCount ?? t('catalog.marketplace.offer_count')}
                            textStyle="text-style-u-small"
                            textOptions={{ wordWrap: true, wordWrapWidth: 246 }}
                        />
                    </Region>
                    <Button
                        variant="3"
                        name="buy_button"
                        params={132113}
                        onPointerTap={onBuyButton}
                        layout={{ position: 'absolute', left: 9, width: 120, top: 184, height: 25, minWidth: 120, maxWidth: 120 }}
                    >
                        {t('catalog.purchase_confirmation.buy')}
                    </Button>
                    <Button
                        variant="3"
                        name="cancel_button"
                        params={132113}
                        onPointerTap={onCancelButton}
                        layout={{ position: 'absolute', left: 147, width: 120, top: 184, height: 25, minWidth: 120, maxWidth: 120 }}
                    >
                        {t('catalog.purchase_confirmation.cancel')}
                    </Button>
                    <Region
                        name="disclaimer"
                        params={16}
                        layout={{ position: 'absolute', left: 9, width: 252, top: 163, height: 24 }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 17, width: 231, top: 1, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('disclaimer.credit_spending')}
                                textStyle="text-style-u-small"
                                textOptions={{ wordWrap: true, wordWrapWidth: 231 }}
                            />
                        </Region>
                        <CheckBox
                            variant="3"
                            name="spending_disclaimer"
                            params={17}
                            onPointerTap={onSpendingDisclaimer}
                            layout={{ position: 'absolute', left: 0, width: 252, top: 0, height: 24 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
