import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { HabbiconPurchaseConfirmationLayoutCancelButtonItem } from './HabbiconPurchaseConfirmationLayoutCancelButtonItem';
import { HabbiconPurchaseConfirmationLayoutConfirmButtonItem } from './HabbiconPurchaseConfirmationLayoutConfirmButtonItem';

/** Row template `buttons` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutButtonsItemProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutButtonsItem = ({ itemsButtons, layout }: HabbiconPurchaseConfirmationLayoutButtonsItemProps) => {
    return (
        <Region
            name="buttons"
            layout={{ minWidth: 341, minHeight: 27, flexShrink: 0, flexDirection: 'row', gap: 105, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <HabbiconPurchaseConfirmationLayoutCancelButtonItem />
                    <HabbiconPurchaseConfirmationLayoutConfirmButtonItem />
                </>
            )}
        </Region>
    );
};
