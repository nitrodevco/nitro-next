import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { InventoryTradingWiredLayoutAmountTextItem } from './InventoryTradingWiredLayoutAmountTextItem';
import { InventoryTradingWiredLayoutAndTextItem } from './InventoryTradingWiredLayoutAndTextItem';
import { InventoryTradingWiredLayoutRuleIconItem } from './InventoryTradingWiredLayoutRuleIconItem';

/** Row template `rule_node_template` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutRuleNodeTemplateItemProps {
    itemsRuleNodeTemplate?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutRuleNodeTemplateItem = ({ itemsRuleNodeTemplate, layout }: InventoryTradingWiredLayoutRuleNodeTemplateItemProps) => {
    return (
        <Region
            name="rule_node_template"
            layout={{ width: 67, height: 40, flexShrink: 0, flexDirection: 'row', gap: 1, ...layout }}
        >
            {itemsRuleNodeTemplate ?? (
                <>
                    <InventoryTradingWiredLayoutAndTextItem />
                    <InventoryTradingWiredLayoutAmountTextItem />
                    <InventoryTradingWiredLayoutRuleIconItem />
                </>
            )}
        </Region>
    );
};
