import { ReactNode } from 'react';

import { BoxLayout, WidgetSlot } from '#base/theme';

/** Row template `offering_containers_separator` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutOfferingContainersSeparatorItemProps {
    layout?: BoxLayout;
    offeringContainersSeparator?: ReactNode;
}

export const InventoryTradingWiredLayoutOfferingContainersSeparatorItem = ({ layout, offeringContainersSeparator }: InventoryTradingWiredLayoutOfferingContainersSeparatorItemProps) => {
    return (
        <WidgetSlot
            widgetType="separator"
            name="offering_containers_separator"
            options={{ 'separator:vertical': 'true' }}
            layout={{ width: 30, height: 153, flexShrink: 0, minHeight: 80, ...layout }}
        >
            {offeringContainersSeparator}
        </WidgetSlot>
    );
};
