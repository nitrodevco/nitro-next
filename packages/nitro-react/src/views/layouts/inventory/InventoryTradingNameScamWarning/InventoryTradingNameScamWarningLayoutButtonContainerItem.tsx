import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { InventoryTradingNameScamWarningLayoutCloseButtonItem } from './InventoryTradingNameScamWarningLayoutCloseButtonItem';
import { InventoryTradingNameScamWarningLayoutCloseCountdownTextItem } from './InventoryTradingNameScamWarningLayoutCloseCountdownTextItem';

/** Row template `button_container` of InventoryTradingNameScamWarningLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingNameScamWarningLayoutButtonContainerItemProps {
    itemsButtonContainer?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingNameScamWarningLayoutButtonContainerItem = ({ itemsButtonContainer, layout }: InventoryTradingNameScamWarningLayoutButtonContainerItemProps) => {
    return (
        <Region
            name="button_container"
            layout={{ width: 73, height: 30, flexShrink: 0, flexDirection: 'row', gap: 7, ...layout }}
        >
            {itemsButtonContainer ?? (
                <>
                    <InventoryTradingNameScamWarningLayoutCloseButtonItem />
                    <InventoryTradingNameScamWarningLayoutCloseCountdownTextItem />
                </>
            )}
        </Region>
    );
};
