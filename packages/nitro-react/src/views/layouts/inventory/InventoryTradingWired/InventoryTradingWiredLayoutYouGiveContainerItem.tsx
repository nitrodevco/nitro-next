import { BoxLayout, Region } from '#base/theme';

import { InventoryTradingWiredLayoutOfferingRequirementsTemplate, InventoryTradingWiredLayoutOfferingRequirementsTemplateProps } from './InventoryTradingWiredLayoutOfferingRequirementsTemplate';

/** Row template `you_give_container` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutYouGiveContainerItemProps {
    layout?: BoxLayout;
    offeringRequirementsTemplate?: InventoryTradingWiredLayoutOfferingRequirementsTemplateProps;
    visibleOfferingRequirementsTemplate?: boolean;
}

export const InventoryTradingWiredLayoutYouGiveContainerItem = ({ layout, offeringRequirementsTemplate, visibleOfferingRequirementsTemplate }: InventoryTradingWiredLayoutYouGiveContainerItemProps) => {
    return (
        <Region
            name="you_give_container"
            layout={{ width: 180, height: 179, flexShrink: 0, ...layout }}
        >
            {(visibleOfferingRequirementsTemplate ?? true) && (
                <InventoryTradingWiredLayoutOfferingRequirementsTemplate {...offeringRequirementsTemplate} />
            )}
        </Region>
    );
};
