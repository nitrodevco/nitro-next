import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { TargetedOfferPurchaseConfirmationLayoutBuyButtonItem } from './TargetedOfferPurchaseConfirmationLayoutBuyButtonItem';
import { TargetedOfferPurchaseConfirmationLayoutCancelButtonItem } from './TargetedOfferPurchaseConfirmationLayoutCancelButtonItem';

/** Row template `buttons` of TargetedOfferPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferPurchaseConfirmationLayoutButtonsItemProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const TargetedOfferPurchaseConfirmationLayoutButtonsItem = ({ itemsButtons, layout }: TargetedOfferPurchaseConfirmationLayoutButtonsItemProps) => {
    return (
        <Region
            name="buttons"
            layout={{ minWidth: 315, minHeight: 27, flexShrink: 0, flexDirection: 'row', gap: 76, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <TargetedOfferPurchaseConfirmationLayoutCancelButtonItem />
                    <TargetedOfferPurchaseConfirmationLayoutBuyButtonItem />
                </>
            )}
        </Region>
    );
};
