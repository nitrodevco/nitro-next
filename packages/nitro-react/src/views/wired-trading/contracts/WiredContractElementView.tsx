/**
 * Adding or editing one node of a contract rule - Flash `contracts/subcontrollers/AddEditContractElement`,
 * an ubuntu wired window 420 wide that opens 375px right of the centre and keeps its place
 * afterwards: the node's type (coins or furni) beside its amount (1-100000), the furni type
 * selection (disabled for coins), and the footer ("ready" needs the wired write permission).
 *
 * `onEdit` loads the node; `onAdd` starts from 1 coin. `validate`: at most 500 of a furni, and
 * the furni must be known and tradeable - otherwise an alert and nothing changes. "Ready" writes
 * the node into its rule (`updateNode` / `addNode`) and closes.
 */
import type { IChestItemType } from '@nitrodevco/nitro-api';
import type { ITradeRequirementNode } from '@nitrodevco/nitro-packets';
import { TradeRequirementNodeType } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useInterpolate, useSystemStore, useTranslation, useWindowActions } from '#base/context/system';
import { useWiredHasWritePermission } from '#base/context/wired';
import { useWiredContractActions, WIRED_CONTRACT_ELEMENT_MAX_COINS, WIRED_CONTRACT_ELEMENT_MAX_FURNI, WiredContractElementEdit } from '#base/context/wired-trading';
import { WiredHorizontalSectionList } from '#base/views/wired-setup/kit/WiredHorizontalSectionList';
import { WiredNumberInput } from '#base/views/wired-setup/kit/WiredNumberInput';
import { WiredRadioGroup } from '#base/views/wired-setup/kit/WiredRadioGroup';
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { WiredItemTypeSelectionSection } from '#base/views/wired-trading/common/WiredItemTypeSelection';
import { WiredTradingFooter } from '#base/views/wired-trading/common/WiredTradingFooter';
import { WiredTradingFrame } from '#base/views/wired-trading/common/WiredTradingFrame';

const FRAME_WIDTH = 420;
/** `xOffsetFromCenter`: beside the contract window rather than over it. */
const X_OFFSET_FROM_CENTER = 375;

interface ElementForm {
    type: TradeRequirementNodeType;
    amount: number;
    itemType: IChestItemType | undefined;
}

/** `onEdit` / `onAdd`. */
const readForm = (node: ITradeRequirementNode | undefined): ElementForm => (node
    ? { type: node.type, amount: node.amount, itemType: node.itemType }
    : { type: TradeRequirementNodeType.Coin, amount: 1, itemType: undefined });

export interface WiredContractElementViewProps {
    edit: WiredContractElementEdit;
}

export const WiredContractElementView = ({ edit }: WiredContractElementViewProps) => {
    const t = useTranslation();
    const interpolate = useInterpolate();
    const { showAlert } = useWindowActions();
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const hasWritePermission = useWiredHasWritePermission();
    const { addContractNode, updateContractNode, setContractElementEdit } = useWiredContractActions();
    const [ form, setForm ] = useState<ElementForm>(() => readForm(edit.node));
    const [ formFor, setFormFor ] = useState(edit);

    // The window is reused: a new edit reloads it (`onEdit` / `onAdd` on an open window).
    if (formFor !== edit) {
        setFormFor(edit);
        setForm(readForm(edit.node));
    }

    const isFurni = (Number(form.type) === Number(TradeRequirementNodeType.Furni));
    const isEditMode = (edit.nodeKey !== -1);
    const close = () => setContractElementEdit(undefined);

    /** `validate`. */
    const validate = (): string | undefined => {
        if (isFurni && (form.amount > WIRED_CONTRACT_ELEMENT_MAX_FURNI)) return t('wiredcontracts.element.too_many_items', '', { amount: String(WIRED_CONTRACT_ELEMENT_MAX_FURNI) });

        if (isFurni) {
            const furniData = form.itemType ? (form.itemType.isWallItem ? wallItems : floorItems)[form.itemType.typeId] : undefined;

            if (!furniData || !furniData.tradeable) return interpolate('${wiredcontracts.element.item_not_allowed}');
        }

        return undefined;
    };

    /** `onSaveClicked`. */
    const onSave = () => {
        const error = validate();

        if (error !== undefined) {
            showAlert(interpolate('${wiredfurni.error.title}'), error);

            return;
        }

        const node: ITradeRequirementNode = { type: form.type, amount: form.amount, itemType: isFurni ? form.itemType : undefined };

        if (isEditMode) updateContractNode(edit.ruleKey, edit.nodeKey, node);
        else addContractNode(edit.ruleKey, node);

        close();
    };

    return (
        <WiredTradingFrame
            id="wired-contract-element"
            title={interpolate(isEditMode ? '${wiredcontracts.edit_element.title}' : '${wiredcontracts.add_element.title}')}
            width={FRAME_WIDTH}
            xOffsetFromCenter={X_OFFSET_FROM_CENTER}
            rememberLocation
            onClose={close}
            parts={[
                <WiredHorizontalSectionList key="type">
                    <WiredSection title="${wiredcontracts.element.type}">
                        <WiredRadioGroup
                            options={[
                                { id: TradeRequirementNodeType.Coin, label: '${wiredcontracts.element.type.0}' },
                                { id: TradeRequirementNodeType.Furni, label: '${wiredcontracts.element.type.1}' },
                            ]}
                            selected={form.type}
                            onSelect={type => setForm({ ...form, type })}
                        />
                    </WiredSection>
                    <WiredSection title="${wiredcontracts.element.amount}">
                        <WiredNumberInput
                            value={form.amount}
                            onChange={amount => setForm({ ...form, amount })}
                            min={1}
                            max={WIRED_CONTRACT_ELEMENT_MAX_COINS}
                            width={80}
                        />
                    </WiredSection>
                </WiredHorizontalSectionList>,
                <WiredItemTypeSelectionSection
                    key="item"
                    selected={form.itemType}
                    onSelect={itemType => setForm({ ...form, itemType })}
                    resetKey={edit}
                    disabled={!isFurni}
                />,
                <WiredTradingFooter
                    key="footer"
                    onSave={onSave}
                    onCancel={close}
                    saveDisabled={!hasWritePermission}
                />,
            ]}
        />
    );
};
