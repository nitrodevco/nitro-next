import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PurchaseConfirmationLayoutBuyButtonItem } from './PurchaseConfirmationLayoutBuyButtonItem';
import { PurchaseConfirmationLayoutCancelButtonItem } from './PurchaseConfirmationLayoutCancelButtonItem';

/** Row template `buttons` of PurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PurchaseConfirmationLayoutButtonsItemProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const PurchaseConfirmationLayoutButtonsItem = ({ itemsButtons, layout }: PurchaseConfirmationLayoutButtonsItemProps) => {
    return (
        <Region
            name="buttons"
            layout={{ minWidth: 315, minHeight: 27, flexShrink: 0, flexDirection: 'row', gap: 76, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <PurchaseConfirmationLayoutCancelButtonItem />
                    <PurchaseConfirmationLayoutBuyButtonItem />
                </>
            )}
        </Region>
    );
};
