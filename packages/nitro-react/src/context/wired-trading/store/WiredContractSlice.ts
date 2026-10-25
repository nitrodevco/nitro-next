/**
 * Wired contracts - Flash `wired_trading/contracts/WiredContractController` and the rule
 * editors of the contract windows (`TradeRuleListEditorPreset`, `TradeRuleEditorPreset`) and of
 * `AddEditContractElement`, the window that adds or edits one node of a rule.
 *
 * Flash kept the rules in the presets and handed each node view a `uniqueID` from a static
 * counter, so the element window could find its node again after the rule list changed. The
 * rules live here, each rule and node with a `key` from the same kind of counter: the element
 * window writes into a rule of the contract window without either holding the other.
 *
 * The contract's other fields (payment mode, texts, layout, reward category, ...) are the
 * contract window's own form, read back when it saves.
 *
 * The reference server (turbo-cloud) implements none of the contract packets; Flash's behaviour
 * is the specification.
 */
import type { ITradeRequirementNode, ITradeRequirementRule, IWiredContractContents } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** `TradeRuleEditorPreset.MAX_NODES_IN_RULE`. */
export const WIRED_TRADE_RULE_MAX_NODES = 5;
/** `TradeRuleListEditorPreset.MAX_RULES`. */
export const WIRED_TRADE_RULE_LIST_MAX_RULES = 3;
/** `AddEditContractElement.MAX_COINS` / `MAX_FURNI`. */
export const WIRED_CONTRACT_ELEMENT_MAX_COINS = 100000;
export const WIRED_CONTRACT_ELEMENT_MAX_FURNI = 500;

/** One `TradeRuleNodeView`: a node and its `uniqueID`. */
export interface WiredTradeRuleNodeEdit {
    key: number;
    node: ITradeRequirementNode;
}

/** One `TradeRuleEditorPreset`: a rule's nodes. */
export interface WiredTradeRuleEdit {
    key: number;
    nodes: WiredTradeRuleNodeEdit[];
}

/** What `AddEditContractElement` is editing: a node of a rule, or a new node for it (`nodeKey` -1, `onAdd`). */
export interface WiredContractElementEdit {
    ruleKey: number;
    nodeKey: number;
    /** The node being edited; absent when adding. */
    node: ITradeRequirementNode | undefined;
}

type State = {
    /** `§_-m1D§`: the contract the server asked us to open, -1 when none is pending. */
    contractRequestedId: number;
    /** The contract window that is up, as the server delivered it. */
    contract: IWiredContractContents | undefined;
    /** The "you give" rules (`TradeRuleListEditorPreset`) - payment and trade contracts. */
    contractGiveRules: WiredTradeRuleEdit[];
    /** The "you get" rule (`TradeRuleEditorPreset`) - trade and reward contracts. */
    contractGetRule: WiredTradeRuleEdit | undefined;
    contractElementEdit: WiredContractElementEdit | undefined;
};

type Actions = {
    setContractRequested: (contractId: number) => void;
    /** `onContractContents`: the window for the contract's type, with its rules loaded. */
    openContract: (contents: IWiredContractContents) => void;
    /** `closeAllOpenFrames`. */
    closeContract: () => void;
    /** `TradeRuleListEditorPreset.onAddMore`. */
    addContractGiveRule: () => void;
    /** `TradeRuleListEditorPreset.onRuleRemoved`. */
    removeContractGiveRule: (ruleKey: number) => void;
    /** `TradeRuleEditorPreset.addNode`. */
    addContractNode: (ruleKey: number, node: ITradeRequirementNode) => void;
    /** `TradeRuleEditorPreset.updateNode` - nothing happens if the node is gone. */
    updateContractNode: (ruleKey: number, nodeKey: number, node: ITradeRequirementNode) => void;
    /** `TradeRuleEditorPreset.removeNode`. */
    removeContractNode: (ruleKey: number, nodeKey: number) => void;
    setContractElementEdit: (edit: WiredContractElementEdit | undefined) => void;
};

export const WiredContractSliceInitialState: State = {
    contractRequestedId: -1,
    contract: undefined,
    contractGiveRules: [],
    contractGetRule: undefined,
    contractElementEdit: undefined,
};

export type WiredContractSlice = State & Actions;

/** `TradeRuleNodeView.UNIQUE_ID_COUNTER`, shared by rules and nodes. */
let uniqueKeyCounter = 0;

const nextKey = () => ++uniqueKeyCounter;

/** `TradeRequirementNode.deepCopy`. */
const copyNode = (node: ITradeRequirementNode): ITradeRequirementNode => ({ ...node, itemType: node.itemType ? { ...node.itemType } : undefined });

/** `TradeRuleEditorPreset.rule = ...`: a node view per node, each a deep copy. */
export const createWiredTradeRuleEdit = (rule: ITradeRequirementRule | undefined): WiredTradeRuleEdit => ({
    key: nextKey(),
    nodes: (rule?.nodes ?? []).map(node => ({ key: nextKey(), node: copyNode(node) })),
});

/** `TradeRuleEditorPreset.finalizeRule`. */
export const finalizeWiredTradeRule = (rule: WiredTradeRuleEdit | undefined): ITradeRequirementRule => ({ nodes: (rule?.nodes ?? []).map(edit => edit.node) });

/** `TradeRuleListEditorPreset.finalizeRules`: the rules that have nodes. */
export const finalizeWiredTradeRules = (rules: WiredTradeRuleEdit[]): ITradeRequirementRule[] => rules.map(finalizeWiredTradeRule).filter(rule => rule.nodes.length > 0);

/** `TradeRuleListEditorPreset.rules = ...`: an empty list still gets one empty rule to fill. */
const createRuleList = (rules: ITradeRequirementRule[] | undefined): WiredTradeRuleEdit[] => {
    const source = (rules && rules.length) ? rules : [ { nodes: [] } ];

    return source.map(rule => createWiredTradeRuleEdit(rule));
};

/** Applies `update` to the rule with `ruleKey`, wherever it is. */
const mapRule = (x: State, ruleKey: number, update: (rule: WiredTradeRuleEdit) => WiredTradeRuleEdit): Partial<State> => {
    if (x.contractGetRule && (x.contractGetRule.key === ruleKey)) return { contractGetRule: update(x.contractGetRule) };

    if (!x.contractGiveRules.some(rule => rule.key === ruleKey)) return {};

    return { contractGiveRules: x.contractGiveRules.map(rule => ((rule.key === ruleKey) ? update(rule) : rule)) };
};

export const createWiredContractSlice: StateCreator<WiredContractSlice, [], [], WiredContractSlice> = set => ({
    ...WiredContractSliceInitialState,
    setContractRequested: contractRequestedId => set({ contractRequestedId }),
    openContract: contract => set({
        contractRequestedId: -1,
        contract,
        contractGiveRules: contract.definition.youGiveRule ? createRuleList(contract.definition.youGiveRule) : [],
        contractGetRule: contract.definition.youGetRule ? createWiredTradeRuleEdit(contract.definition.youGetRule) : undefined,
        contractElementEdit: undefined,
    }),
    closeContract: () => set({ contract: undefined, contractGiveRules: [], contractGetRule: undefined, contractElementEdit: undefined }),
    addContractGiveRule: () => set((x) => {
        if (x.contractGiveRules.length >= WIRED_TRADE_RULE_LIST_MAX_RULES) return x;

        return { contractGiveRules: [ ...x.contractGiveRules, createWiredTradeRuleEdit(undefined) ] };
    }),
    removeContractGiveRule: ruleKey => set(x => ({ contractGiveRules: x.contractGiveRules.filter(rule => rule.key !== ruleKey) })),
    addContractNode: (ruleKey, node) => set(x => mapRule(x, ruleKey, rule => ({ ...rule, nodes: [ ...rule.nodes, { key: nextKey(), node: copyNode(node) } ] }))),
    updateContractNode: (ruleKey, nodeKey, node) => set(x => mapRule(x, ruleKey, rule => ({ ...rule, nodes: rule.nodes.map(edit => ((edit.key === nodeKey) ? { key: nodeKey, node } : edit)) }))),
    removeContractNode: (ruleKey, nodeKey) => set(x => mapRule(x, ruleKey, rule => ({ ...rule, nodes: rule.nodes.filter(edit => edit.key !== nodeKey) }))),
    setContractElementEdit: contractElementEdit => set({ contractElementEdit }),
});
