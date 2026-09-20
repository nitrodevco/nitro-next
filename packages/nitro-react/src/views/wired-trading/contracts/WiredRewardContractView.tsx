/**
 * The reward contract - Flash `contracts/subcontrollers/RewardContract`, an ubuntu wired window
 * 262 wide titled `wiredcontracts.reward_contract.title`:
 *
 * - the reward (`TradeRuleEditorPreset` titled `wiredcontracts.reward_rule`, not removable);
 * - the reward popup: its text (3 lines, 200 characters) and whether it opens by itself;
 * - the earnings category (collapsed; 11 or 13, `wiredfurni.params.earnings_category.<n>`),
 *   disabled unless the reward has a coins node (`onRulesChange` -> `hasCreditNode`);
 * - the footer ("ready" needs the wired write permission).
 */
import type { IWiredContractContents } from '@nitrodevco/nitro-packets';
import { TradeRequirementNodeType } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { saveWiredContract } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useInterpolate } from '#base/context/system';
import { useWiredHasWritePermission } from '#base/context/wired';
import { finalizeWiredTradeRule, useWiredContractActions, useWiredTradingStore } from '#base/context/wired-trading';
import { WiredCheckboxGroup } from '#base/views/wired-setup/kit/WiredCheckboxGroup';
import { WiredDropdown } from '#base/views/wired-setup/kit/WiredDropdown';
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { WiredSimpleList } from '#base/views/wired-setup/kit/WiredSimpleList';
import { WiredTextArea } from '#base/views/wired-setup/kit/WiredTextArea';
import { WiredTradeRuleEditor } from '#base/views/wired-trading/common/WiredTradeRuleEditor';
import { WiredTradingFooter } from '#base/views/wired-trading/common/WiredTradingFooter';
import { WiredTradingFrame } from '#base/views/wired-trading/common/WiredTradingFrame';

const FRAME_WIDTH = 262;
/** The earnings categories a reward can be booked under. */
const EARNINGS_CATEGORIES = [ 11, 13 ];

export interface WiredRewardContractViewProps {
    contract: IWiredContractContents;
    onClose: () => void;
}

export const WiredRewardContractView = ({ contract, onClose }: WiredRewardContractViewProps) => {
    const { send } = useWebSocketContext();
    const interpolate = useInterpolate();
    const hasWritePermission = useWiredHasWritePermission();
    const getRule = useWiredTradingStore(x => x.contractGetRule);
    const { removeContractNode, setContractElementEdit } = useWiredContractActions();
    const [ rewardText, setRewardText ] = useState(contract.rewardText ?? '');
    const [ showDialog, setShowDialog ] = useState(contract.showDialog ?? false);
    const [ rewardCategory, setRewardCategory ] = useState(contract.rewardCategory ?? -1);
    const nodes = getRule?.nodes.map(edit => edit.node) ?? [];
    const hasCreditNode = nodes.some(node => Number(node.type) === Number(TradeRequirementNodeType.Coin));

    const onSave = () => saveWiredContract(send, {
        contractId: contract.contractId,
        contractType: contract.contractType,
        definition: { youGiveRule: undefined, youGetRule: finalizeWiredTradeRule(getRule) },
        rewardCategory,
        showDialog,
        rewardText,
    });

    return (
        <WiredTradingFrame
            id="wired-contract"
            title={interpolate('${wiredcontracts.reward_contract.title}')}
            width={FRAME_WIDTH}
            rememberLocation
            onClose={onClose}
            parts={[
                getRule && (
                    <WiredSection
                        key="reward"
                        title="${wiredcontracts.reward_requirements}"
                    >
                        <WiredTradeRuleEditor
                            title="${wiredcontracts.reward_rule}"
                            nodes={nodes}
                            onAddNode={() => setContractElementEdit({ ruleKey: getRule.key, nodeKey: -1, node: undefined })}
                            onEditNode={index => setContractElementEdit({ ruleKey: getRule.key, nodeKey: getRule.nodes[index].key, node: getRule.nodes[index].node })}
                            onRemoveNode={index => removeContractNode(getRule.key, getRule.nodes[index].key)}
                        />
                    </WiredSection>
                ),
                <WiredSection
                    key="popup"
                    title="${wiredcontracts.reward_contract.reward_popup}"
                >
                    <WiredSimpleList>
                        <WiredTextArea
                            value={rewardText}
                            onChange={setRewardText}
                            height={52}
                            maxLines={3}
                            maxCharacters={200}
                            placeholder="${wiredcontracts.reward_contract.reward_popup.text.tooltip}"
                        />
                        <WiredCheckboxGroup
                            options={[ { label: '${wiredcontracts.reward_contract.reward_popup.show_by_default}', selected: showDialog } ]}
                            onToggle={(_, selected) => setShowDialog(selected)}
                        />
                    </WiredSimpleList>
                </WiredSection>,
                <WiredSection
                    key="category"
                    title="${wiredcontracts.reward_contract.earnings_category}"
                    collapsible
                    defaultCollapsed
                    disabled={!hasCreditNode}
                >
                    <WiredDropdown
                        options={EARNINGS_CATEGORIES.map(id => ({ id, label: `\${wiredfurni.params.earnings_category.${id}}` }))}
                        selected={rewardCategory}
                        onSelect={setRewardCategory}
                        caption="${wiredcontracts.reward_contract.earnings_category}"
                    />
                </WiredSection>,
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
