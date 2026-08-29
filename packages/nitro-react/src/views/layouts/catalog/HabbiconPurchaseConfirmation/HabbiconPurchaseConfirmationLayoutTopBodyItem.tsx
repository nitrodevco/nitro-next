import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { HabbiconPurchaseConfirmationLayoutDescriptionTextItem } from './HabbiconPurchaseConfirmationLayoutDescriptionTextItem';
import { HabbiconPurchaseConfirmationLayoutPriceLabelItem } from './HabbiconPurchaseConfirmationLayoutPriceLabelItem';
import { HabbiconPurchaseConfirmationLayoutPriceValueItem } from './HabbiconPurchaseConfirmationLayoutPriceValueItem';
import { HabbiconPurchaseConfirmationLayoutProductNameItem } from './HabbiconPurchaseConfirmationLayoutProductNameItem';
import { HabbiconPurchaseConfirmationLayoutReceiveRowItem } from './HabbiconPurchaseConfirmationLayoutReceiveRowItem';

/** Row template `top_body` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutTopBodyItemProps {
    captionPreviewLabel?: string;
    itemsPriceLine?: ReactNode;
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
    srcProductImage?: string;
    tintProductImage?: string;
    visiblePreviewFrame?: boolean;
    visiblePreviewLabel?: boolean;
    visiblePreviewPanel?: boolean;
    visiblePriceLine?: boolean;
    visibleProductImage?: boolean;
    visiblePropertiesItemlist?: boolean;
}

export const HabbiconPurchaseConfirmationLayoutTopBodyItem = ({ captionPreviewLabel, itemsPriceLine, itemsPropertiesItemlist, layout, srcProductImage, tintProductImage, visiblePreviewFrame, visiblePreviewLabel, visiblePreviewPanel, visiblePriceLine, visibleProductImage, visiblePropertiesItemlist }: HabbiconPurchaseConfirmationLayoutTopBodyItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="top_body"
            layout={{ width: 349, height: 164, flexShrink: 0, ...layout }}
        >
            {(visiblePreviewPanel ?? true) && (
                <Border
                    variant="0"
                    name="preview_panel"
                    tintColor="#f6f1df"
                    layout={{ position: 'absolute', left: 10, width: 126, top: 12, height: 152 }}
                >
                    {(visiblePreviewFrame ?? true) && (
                        <Border
                            variant="0"
                            name="preview_frame"
                            layout={{ position: 'absolute', left: 20, width: 86, top: 19, height: 86 }}
                        >
                            {(visibleProductImage ?? true) && (
                                <ThemeImage
                                    name="product_image"
                                    src={srcProductImage}
                                    tint={tintProductImage}
                                    layout={{ position: 'absolute', left: 23, width: 40, top: 23, height: 40 }}
                                />
                            )}
                        </Border>
                    )}
                    {(visiblePreviewLabel ?? true) && (
                        <Region
                            name="preview_label"
                            layout={{ position: 'absolute', left: 8, width: 110, top: 114, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionPreviewLabel ?? t('habbicons.hud.title')}
                                textStyle="text-style-u-bold"
                                textOptions={{ wordWrap: true, wordWrapWidth: 110, align: 'center' }}
                            />
                        </Region>
                    )}
                </Border>
            )}
            {(visiblePropertiesItemlist ?? true) && (
                <Region
                    name="properties_itemlist"
                    layout={{ position: 'absolute', left: 143, right: 9, top: 15, height: 89, flexDirection: 'column', gap: 6 }}
                >
                    {itemsPropertiesItemlist ?? (
                        <>
                            <HabbiconPurchaseConfirmationLayoutProductNameItem />
                            <HabbiconPurchaseConfirmationLayoutDescriptionTextItem />
                            <HabbiconPurchaseConfirmationLayoutReceiveRowItem />
                        </>
                    )}
                </Region>
            )}
            {(visiblePriceLine ?? true) && (
                <Region
                    name="price_line"
                    layout={{ position: 'absolute', left: 144, width: 280, top: 134, height: 22, flexDirection: 'row', gap: 6 }}
                >
                    {itemsPriceLine ?? (
                        <>
                            <HabbiconPurchaseConfirmationLayoutPriceLabelItem />
                            <HabbiconPurchaseConfirmationLayoutPriceValueItem />
                        </>
                    )}
                </Region>
            )}
        </Region>
    );
};
