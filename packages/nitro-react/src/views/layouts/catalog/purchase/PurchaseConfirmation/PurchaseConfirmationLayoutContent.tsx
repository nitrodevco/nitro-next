import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { PurchaseConfirmationLayoutButtonsItem } from './PurchaseConfirmationLayoutButtonsItem';
import { PurchaseConfirmationLayoutDisclaimerItem } from './PurchaseConfirmationLayoutDisclaimerItem';
import { PurchaseConfirmationLayoutFreeQuantityItem } from './PurchaseConfirmationLayoutFreeQuantityItem';
import { PurchaseConfirmationLayoutProductNameItem } from './PurchaseConfirmationLayoutProductNameItem';
import { PurchaseConfirmationLayoutQuantityItem } from './PurchaseConfirmationLayoutQuantityItem';
import { PurchaseConfirmationLayoutRaffleContainerItem } from './PurchaseConfirmationLayoutRaffleContainerItem';

/** Named region `content` of PurchaseConfirmationLayout - configured through the parent's `content` prop. */
export interface PurchaseConfirmationLayoutContentProps {
    itemsContent?: ReactNode;
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
    nftImage?: ReactNode;
    purchaseCostBox?: ReactNode;
    srcProductImage?: string;
    tintProductImage?: string;
}

export const PurchaseConfirmationLayoutContent = ({ itemsContent, itemsPropertiesItemlist, layout, nftImage, purchaseCostBox, srcProductImage, tintProductImage }: PurchaseConfirmationLayoutContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content"
            layout={{ position: 'absolute', left: 0, right: -10, top: 8, bottom: -4, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsContent ?? (
                <>
                    <PurchaseConfirmationLayoutDisclaimerItem />
                    <PurchaseConfirmationLayoutRaffleContainerItem />
                    <PurchaseConfirmationLayoutButtonsItem />
                </>
            )}
            <Region layout={{ minWidth: 404, minHeight: 171, flexShrink: 0, flexDirection: 'column', gap: 5 }}>
                <Region layout={{ width: 344, height: 171, flexShrink: 0 }}>
                    <Border
                        variant="0"
                        tintColor="#f1f1f1"
                        layout={{ position: 'absolute', left: 10, width: 126, top: 12, height: 152 }}
                    >
                        <ThemeImage
                            name="product_image"
                            src={srcProductImage}
                            tint={tintProductImage}
                            layout={{ position: 'absolute', left: 1, width: 126, top: 1, height: 152 }}
                        />
                        <WidgetSlot
                            widgetType="product_image"
                            name="nft_image"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        >
                            {nftImage}
                        </WidgetSlot>
                    </Border>
                    <Region
                        name="properties_itemlist"
                        layout={{ position: 'absolute', left: 143, width: 176, alignSelf: 'center', marginTop: -19.5, marginBottom: 19.5, height: 116, flexDirection: 'column', gap: 7 }}
                    >
                        {itemsPropertiesItemlist ?? (
                            <>
                                <PurchaseConfirmationLayoutProductNameItem />
                                <PurchaseConfirmationLayoutQuantityItem />
                                <PurchaseConfirmationLayoutFreeQuantityItem />
                            </>
                        )}
                        <Region layout={{ flexShrink: 0, flexDirection: 'row' }}>
                            <Region layout={{ width: 268, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <ThemeText
                                    text={t('catalog.purchase.confirmation.dialog.cost')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                            <Region
                                name="purchase_cost_box"
                                layout={{ width: 20, height: 22, flexShrink: 0 }}
                            >
                                {purchaseCostBox}
                            </Region>
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
