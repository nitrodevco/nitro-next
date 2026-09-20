/**
 * The trade contract - Flash `contracts/subcontrollers/TradeContract`, an ubuntu wired window
 * 262 wide titled `wiredcontracts.trade_contract.title`: the "you give" rules
 * (`TradeRuleListEditorPreset`), the "you get" rule (`TradeRuleEditorPreset`, titled
 * `wiredcontracts.reward_rule`, not removable), and the footer ("ready" needs the wired write
 * permission). "Ready" sends both halves of the definition back.
 */
import type { IWiredContractContents } from '@nitrodevco/nitro-packets';

import { saveWiredContract } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useInterpolate } from '#base/context/system';
import { useWiredHasWritePermission } from '#base/context/wired';
import { finalizeWiredTradeRule, finalizeWiredTradeRules, useWiredContractActions, useWiredTradingStore } from '#base/context/wired-trading';
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { WiredTradeRuleEditor } from '#base/views/wired-trading/common/WiredTradeRuleEditor';
import { WiredTradeRuleListEditor } from '#base/views/wired-trading/common/WiredTradeRuleListEditor';
import { WiredTradingFooter } from '#base/views/wired-trading/common/WiredTradingFooter';
import { WiredTradingFrame } from '#base/views/wired-trading/common/WiredTradingFrame';

const FRAME_WIDTH = 262;

export interface WiredTradeContractViewProps {
    contract: IWiredContractContents;
    onClose: () => void;
}

export const WiredTradeContractView = ({ contract, onClose }: WiredTradeContractViewProps) => {
    const { send } = useWebSocketContext();
    const interpolate = useInterpolate();
    const hasWritePermission = useWiredHasWritePermission();
    const giveRules = useWiredTradingStore(x => x.contractGiveRules);
    const getRule = useWiredTradingStore(x => x.contractGetRule);
    const { addContractGiveRule, removeContractGiveRule, removeContractNode, setContractElementEdit } = useWiredContractActions();

    const onSave = () => saveWiredContract(send, {
        contractId: contract.contractId,
        contractType: contract.contractType,
        definition: { youGiveRule: finalizeWiredTradeRules(giveRules), youGetRule: finalizeWiredTradeRule(getRule) },
    });

    return (
        <WiredTradingFrame
            id="wired-contract"
            title={interpolate('${wiredcontracts.trade_contract.title}')}
            width={FRAME_WIDTH}
            rememberLocation
            onClose={onClose}
            parts={[
                <WiredSection
                    key="give"
                    title="${wiredcontracts.payment_requirements}"
                >
                    <WiredTradeRuleListEditor
                        rules={giveRules}
                        onAddRule={addContractGiveRule}
                        onRemoveRule={removeContractGiveRule}
                        onAddNode={ruleKey => setContractElementEdit({ ruleKey, nodeKey: -1, node: undefined })}
                        onEditNode={(ruleKey, nodeKey) => setContractElementEdit({ ruleKey, nodeKey, node: giveRules.find(rule => rule.key === ruleKey)?.nodes.find(edit => edit.key === nodeKey)?.node })}
                        onRemoveNode={removeContractNode}
                    />
                </WiredSection>,
                getRule && (
                    <WiredSection
                        key="get"
                        title="${wiredcontracts.reward_requirements}"
                    >
                        <WiredTradeRuleEditor
                            title="${wiredcontracts.reward_rule}"
                            nodes={getRule.nodes.map(edit => edit.node)}
                            onAddNode={() => setContractElementEdit({ ruleKey: getRule.key, nodeKey: -1, node: undefined })}
                            onEditNode={index => setContractElementEdit({ ruleKey: getRule.key, nodeKey: getRule.nodes[index].key, node: getRule.nodes[index].node })}
                            onRemoveNode={index => removeContractNode(getRule.key, getRule.nodes[index].key)}
                        />
                    </WiredSection>
                ),
                <WiredTradingFooter
                    key="footer"
                    onSave={onSave}
                    onCancel={onClose}
                    saveDisabled={!hasWritePermission}
                />,
            ]}
        />
    );
};
