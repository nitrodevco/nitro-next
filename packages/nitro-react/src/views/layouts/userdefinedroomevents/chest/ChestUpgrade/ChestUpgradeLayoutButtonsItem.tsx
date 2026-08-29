import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ChestUpgradeLayoutBuyButtonItem } from './ChestUpgradeLayoutBuyButtonItem';
import { ChestUpgradeLayoutCancelButtonItem } from './ChestUpgradeLayoutCancelButtonItem';

/** Row template `buttons` of ChestUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestUpgradeLayoutButtonsItemProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const ChestUpgradeLayoutButtonsItem = ({ itemsButtons, layout }: ChestUpgradeLayoutButtonsItemProps) => {
    return (
        <Region
            name="buttons"
            layout={{ minWidth: 341, minHeight: 27, flexShrink: 0, flexDirection: 'row', gap: 105, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <ChestUpgradeLayoutCancelButtonItem />
                    <ChestUpgradeLayoutBuyButtonItem />
                </>
            )}
        </Region>
    );
};
