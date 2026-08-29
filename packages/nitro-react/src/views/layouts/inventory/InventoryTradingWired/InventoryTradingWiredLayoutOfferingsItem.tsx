import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { InventoryTradingWiredLayoutOfferingContainersSeparatorItem } from './InventoryTradingWiredLayoutOfferingContainersSeparatorItem';
import { InventoryTradingWiredLayoutYouGetContainerItem } from './InventoryTradingWiredLayoutYouGetContainerItem';
import { InventoryTradingWiredLayoutYouGiveContainerItem } from './InventoryTradingWiredLayoutYouGiveContainerItem';

/** Row template `offerings` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutOfferingsItemProps {
    itemsOfferings?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutOfferingsItem = ({ itemsOfferings, layout }: InventoryTradingWiredLayoutOfferingsItemProps) => {
    return (
        <Region
            name="offerings"
            layout={{ width: 390, height: 180, flexShrink: 0, minHeight: 180, maxHeight: 180, flexDirection: 'row', ...layout }}
        >
            {itemsOfferings ?? (
                <>
                    <InventoryTradingWiredLayoutYouGiveContainerItem />
                    <InventoryTradingWiredLayoutOfferingContainersSeparatorItem />
                    <InventoryTradingWiredLayoutYouGetContainerItem />
                </>
            )}
        </Region>
    );
};
