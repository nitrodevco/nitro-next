import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { InventoryTradingWiredLayoutRuleNodeColumnsTemplateItem } from './InventoryTradingWiredLayoutRuleNodeColumnsTemplateItem';

/** Named region `rule_nodes_rows` of InventoryTradingWiredLayout - configured through the parent's `ruleNodesRows` prop. */
export interface InventoryTradingWiredLayoutRuleNodesRowsProps {
    itemsRuleNodesRows?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutRuleNodesRows = ({ itemsRuleNodesRows, layout }: InventoryTradingWiredLayoutRuleNodesRowsProps) => {
    return (
        <Region
            name="rule_nodes_rows"
            layout={{ position: 'absolute', left: 32, right: 0, top: 0, height: 40, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsRuleNodesRows ?? (
                <InventoryTradingWiredLayoutRuleNodeColumnsTemplateItem />
            )}
        </Region>
    );
};
