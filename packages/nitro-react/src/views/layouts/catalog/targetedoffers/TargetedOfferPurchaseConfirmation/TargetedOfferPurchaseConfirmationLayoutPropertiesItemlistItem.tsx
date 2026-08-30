import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { TargetedOfferPurchaseConfirmationLayoutProductNameItem } from './TargetedOfferPurchaseConfirmationLayoutProductNameItem';
import { TargetedOfferPurchaseConfirmationLayoutQuantityItem } from './TargetedOfferPurchaseConfirmationLayoutQuantityItem';

/** Row template `properties_itemlist` of TargetedOfferPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistItemProps {
    itemsPropertiesItemlist?: ReactNode;
    layout?: BoxLayout;
    purchaseCostBox?: ReactNode;
    visiblePurchaseCostBox?: boolean;
}

export const TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistItem = ({ itemsPropertiesItemlist, layout, purchaseCostBox, visiblePurchaseCostBox }: TargetedOfferPurchaseConfirmationLayoutPropertiesItemlistItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="properties_itemlist"
            layout={{ width: 176, height: 90, flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsPropertiesItemlist ?? (
                <>
                    <TargetedOfferPurchaseConfirmationLayoutProductNameItem />
                    <TargetedOfferPurchaseConfirmationLayoutQuantityItem />
                </>
            )}
            <Region layout={{ flexShrink: 0, flexDirection: 'row' }}>
                <ThemeText
                    text={t('catalog.purchase.confirmation.dialog.cost')}
                    textStyle="text-style-u-regular"
                    layout={{ width: 268, height: 19, flexShrink: 0 }}
                />
                {(visiblePurchaseCostBox ?? true) && (
                    <Region
                        name="purchase_cost_box"
                        layout={{ width: 20, height: 22, flexShrink: 0 }}
                    >
                        {purchaseCostBox}
                    </Region>
                )}
            </Region>
        </Region>
    );
};
