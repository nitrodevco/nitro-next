import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { InventoryTradingWiredLayoutRuleTemplateItem } from './InventoryTradingWiredLayoutRuleTemplateItem';

/** Named region `rules_list` of InventoryTradingWiredLayout - configured through the parent's `rulesList` prop. */
export interface InventoryTradingWiredLayoutRulesListProps {
    itemsRulesList?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryTradingWiredLayoutRulesList = ({ itemsRulesList, layout }: InventoryTradingWiredLayoutRulesListProps) => {
    return (
        <Region
            name="rules_list"
            layout={{ position: 'absolute', left: 1, right: 1, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 40, flexDirection: 'column', ...layout }}
        >
            {itemsRulesList ?? (
                <InventoryTradingWiredLayoutRuleTemplateItem />
            )}
        </Region>
    );
};
