import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { InventoryTradingWiredLayoutRuleNodeTemplateItem } from './InventoryTradingWiredLayoutRuleNodeTemplateItem';

/** Row template `rule_node_columns_template` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutRuleNodeColumnsTemplateItemProps {
    itemsRuleNodeColumnsTemplate?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutRuleNodeColumnsTemplateItem = ({ itemsRuleNodeColumnsTemplate, layout }: InventoryTradingWiredLayoutRuleNodeColumnsTemplateItemProps) => {
    return (
        <Region
            name="rule_node_columns_template"
            layout={{ width: 67, height: 40, flexShrink: 0, flexDirection: 'row', gap: 1, ...layout }}
        >
            {itemsRuleNodeColumnsTemplate ?? (
                <InventoryTradingWiredLayoutRuleNodeTemplateItem />
            )}
        </Region>
    );
};
