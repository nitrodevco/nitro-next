import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ChestWiredUpgradeLayoutBuyButtonItem } from './ChestWiredUpgradeLayoutBuyButtonItem';
import { ChestWiredUpgradeLayoutCancelButtonItem } from './ChestWiredUpgradeLayoutCancelButtonItem';

/** Row template `buttons` of ChestWiredUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestWiredUpgradeLayoutButtonsItemProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const ChestWiredUpgradeLayoutButtonsItem = ({ itemsButtons, layout }: ChestWiredUpgradeLayoutButtonsItemProps) => {
    return (
        <Region
            name="buttons"
            layout={{ minWidth: 341, minHeight: 27, flexShrink: 0, flexDirection: 'row', gap: 105, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <ChestWiredUpgradeLayoutCancelButtonItem />
                    <ChestWiredUpgradeLayoutBuyButtonItem />
                </>
            )}
        </Region>
    );
};
