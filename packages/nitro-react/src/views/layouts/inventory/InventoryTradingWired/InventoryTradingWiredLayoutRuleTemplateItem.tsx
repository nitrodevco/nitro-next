import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { InventoryTradingWiredLayoutRuleNodesRows, InventoryTradingWiredLayoutRuleNodesRowsProps } from './InventoryTradingWiredLayoutRuleNodesRows';

/** Row template `rule_template` of InventoryTradingWiredLayout - pass real rows through its `items…` slot. */
export interface InventoryTradingWiredLayoutRuleTemplateItemProps {
    captionOrText?: string;
    layout?: BoxLayout;
    ruleNodesRows?: InventoryTradingWiredLayoutRuleNodesRowsProps;
    visibleOrText?: boolean;
    visibleRuleNodesRows?: boolean;
}

export const InventoryTradingWiredLayoutRuleTemplateItem = ({ captionOrText, layout, ruleNodesRows, visibleOrText, visibleRuleNodesRows }: InventoryTradingWiredLayoutRuleTemplateItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rule_template"
            layout={{ width: 178, height: 40, flexShrink: 0, ...layout }}
        >
            {(visibleOrText ?? true) && (
                <Region
                    name="or_text"
                    layout={{ position: 'absolute', left: 0, width: 32, top: 11, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionOrText ?? t('inventory.wired_trading.requirements.or')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            )}
            {(visibleRuleNodesRows ?? true) && (
                <InventoryTradingWiredLayoutRuleNodesRows {...ruleNodesRows} />
            )}
        </Region>
    );
};
