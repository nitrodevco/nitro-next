/**
 * The "you give" rules of a payment or trade contract - Flash
 * `wired_setup/uibuilder/presets/contracts/TradeRuleListEditorPreset`: the rules stacked
 * `genericVerticalSpacing` apart, each titled `wiredcontracts.payment_rule` with its number
 * (`fixNames`), over a button adding an empty rule, disabled from `MAX_RULES` (3). The first rule
 * cannot be removed (`createRuleEditorPreset(..., null)` for it); the others can.
 *
 * Controlled like `WiredTradeRuleEditor`: the rules are the caller's (`WiredContractSlice`'s
 * `contractGiveRules`), each with a key that survives a removal above it.
 */
import { useTranslation } from '#base/context/system';
import { WIRED_TRADE_RULE_LIST_MAX_RULES, WiredTradeRuleEdit } from '#base/context/wired-trading';
import { WiredButton } from '#base/views/wired-setup/kit/WiredButton';
import { WiredSimpleList } from '#base/views/wired-setup/kit/WiredSimpleList';
import { useWiredStyle } from '#base/views/wired-setup/kit/WiredStyleContext';

import { WiredTradeRuleEditor } from './WiredTradeRuleEditor';

export interface WiredTradeRuleListEditorProps {
    rules: WiredTradeRuleEdit[];
    onAddRule: () => void;
    onRemoveRule: (ruleKey: number) => void;
    onAddNode: (ruleKey: number) => void;
    onEditNode: (ruleKey: number, nodeKey: number) => void;
    onRemoveNode: (ruleKey: number, nodeKey: number) => void;
}

export const WiredTradeRuleListEditor = ({ rules, onAddRule, onRemoveRule, onAddNode, onEditNode, onRemoveNode }: WiredTradeRuleListEditorProps) => {
    const t = useTranslation();
    const style = useWiredStyle();

    return (
        <WiredSimpleList spacing={style.genericVerticalSpacing}>
            {rules.map((rule, index) => (
                <WiredTradeRuleEditor
                    key={rule.key}
                    title={t('wiredcontracts.payment_rule', '', { i: String(index + 1) })}
                    nodes={rule.nodes.map(edit => edit.node)}
                    onAddNode={() => onAddNode(rule.key)}
                    onEditNode={nodeIndex => onEditNode(rule.key, rule.nodes[nodeIndex].key)}
                    onRemoveNode={nodeIndex => onRemoveNode(rule.key, rule.nodes[nodeIndex].key)}
                    onRemove={(index > 0) ? () => onRemoveRule(rule.key) : undefined}
                />
            ))}
            <WiredButton
                label="${wiredcontracts.payment_add_more}"
                onPress={onAddRule}
                disabled={rules.length >= WIRED_TRADE_RULE_LIST_MAX_RULES}
            />
        </WiredSimpleList>
    );
};
