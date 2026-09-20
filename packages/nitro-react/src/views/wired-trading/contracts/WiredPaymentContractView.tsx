/**
 * The payment contract - Flash `contracts/subcontrollers/PaymentContract`, an ubuntu wired window
 * 262 wide titled `wiredcontracts.payment_contract.title`: the payment mode (two radios), the
 * text the payer receives (60 characters), the "you give" rules (`TradeRuleListEditorPreset`,
 * disabled unless the mode is 1), the layout type of the payment window (`generic` / `games`,
 * collapsed), and the footer ("ready" needs the wired write permission).
 *
 * "Ready" sends the contract back (`AbstractContract.addContentsToComposer` + the payment fields;
 * a layout index out of range goes out as `generic`); the window closes on a successful
 * `WiredContractUpdateResult`.
 */
import type { IWiredContractContents } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { saveWiredContract } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useInterpolate } from '#base/context/system';
import { useWiredHasWritePermission } from '#base/context/wired';
import { finalizeWiredTradeRules, useWiredContractActions, useWiredTradingStore } from '#base/context/wired-trading';
import { WiredDropdown } from '#base/views/wired-setup/kit/WiredDropdown';
import { WiredRadioGroup } from '#base/views/wired-setup/kit/WiredRadioGroup';
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { WiredTextInput } from '#base/views/wired-setup/kit/WiredTextInput';
import { WiredTradeRuleListEditor } from '#base/views/wired-trading/common/WiredTradeRuleListEditor';
import { WiredTradingFooter } from '#base/views/wired-trading/common/WiredTradingFooter';
import { WiredTradingFrame } from '#base/views/wired-trading/common/WiredTradingFrame';

/** `PaymentContract.LAYOUT_TYPES`. */
const LAYOUT_TYPES = [ 'generic', 'games' ];
const FRAME_WIDTH = 262;
/** The payment mode that takes "you give" rules. */
const PAYMENT_MODE_RULES = 1;

export interface WiredPaymentContractViewProps {
    contract: IWiredContractContents;
    onClose: () => void;
}

export const WiredPaymentContractView = ({ contract, onClose }: WiredPaymentContractViewProps) => {
    const { send } = useWebSocketContext();
    const interpolate = useInterpolate();
    const hasWritePermission = useWiredHasWritePermission();
    const rules = useWiredTradingStore(x => x.contractGiveRules);
    const { addContractGiveRule, removeContractGiveRule, removeContractNode, setContractElementEdit } = useWiredContractActions();
    const [ paymentMode, setPaymentMode ] = useState(contract.paymentMode ?? 0);
    const [ receiveText, setReceiveText ] = useState(contract.receiveText ?? '');
    const [ layoutIndex, setLayoutIndex ] = useState(LAYOUT_TYPES.indexOf(contract.layoutType ?? ''));

    const onSave = () => saveWiredContract(send, {
        contractId: contract.contractId,
        contractType: contract.contractType,
        definition: { youGiveRule: finalizeWiredTradeRules(rules), youGetRule: undefined },
        paymentMode,
        receiveText,
        layoutType: LAYOUT_TYPES[((layoutIndex < 0) || (layoutIndex >= LAYOUT_TYPES.length)) ? 0 : layoutIndex],
    });

    return (
        <WiredTradingFrame
            id="wired-contract"
            title={interpolate('${wiredcontracts.payment_contract.title}')}
            width={FRAME_WIDTH}
            rememberLocation
            onClose={onClose}
            parts={[
                <WiredSection
                    key="mode"
                    title="${wiredcontracts.payment_contract.mode}"
                >
                    <WiredRadioGroup
                        options={[
                            { id: 0, label: '${wiredcontracts.payment_contract.mode.0}' },
                            { id: 1, label: '${wiredcontracts.payment_contract.mode.1}' },
                        ]}
                        selected={paymentMode}
                        onSelect={setPaymentMode}
                    />
                </WiredSection>,
                <WiredSection
                    key="text"
                    title="${wiredcontracts.payment_contract.receive_text}"
                >
                    <WiredTextInput
                        value={receiveText}
                        onChange={setReceiveText}
                        maxCharacters={60}
                    />
                </WiredSection>,
                <WiredSection
                    key="rules"
                    title="${wiredcontracts.payment_requirements}"
                    disabled={paymentMode !== PAYMENT_MODE_RULES}
                >
                    <WiredTradeRuleListEditor
                        rules={rules}
                        onAddRule={addContractGiveRule}
                        onRemoveRule={removeContractGiveRule}
                        onAddNode={ruleKey => setContractElementEdit({ ruleKey, nodeKey: -1, node: undefined })}
                        onEditNode={(ruleKey, nodeKey) => setContractElementEdit({ ruleKey, nodeKey, node: rules.find(rule => rule.key === ruleKey)?.nodes.find(edit => edit.key === nodeKey)?.node })}
                        onRemoveNode={removeContractNode}
                    />
                </WiredSection>,
                <WiredSection
                    key="layout"
                    title="${wiredcontracts.payment_contract.layout_type}"
                    collapsible
                    defaultCollapsed
                >
                    <WiredDropdown
                        options={LAYOUT_TYPES.map((_, id) => ({ id, label: `\${wiredcontracts.payment_contract.layout_type.${id}}` }))}
                        selected={layoutIndex}
                        onSelect={setLayoutIndex}
                        caption="${wiredcontracts.payment_contract.layout_type}"
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
