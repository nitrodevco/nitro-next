/**
 * The data side of the wired variable picker - `uibuilder/presets/newvariablepicker`:
 * `NewVariablePicker` (which variables a picker offers, resolving typed text to a variable, the
 * tab a picker opens on), `overview/VariableNode` (the dotted names as a tree) and
 * `tabbuttons/TabButtonConfigs` (the six tabs and what each lists). `WiredVariablePicker` in the
 * kit draws it.
 *
 * Two things are carried over as Flash has them, because a picker that lists differently from the
 * Flash client is a worse surprise than either:
 *
 * - A picker's filter does not hide anything. `NewVariablePicker._showFilteredVariables` is `true`
 *   and has no setter, so a variable the filter rejects is listed, greyed out and not selectable
 *   (`isVariableNodeDisabled` / `canSelectVariableNode`); the filter only decides what typed text
 *   and Enter may resolve to.
 * - `nodesFromVector` never gives an existing node a variable. With `a.b` listed before `a`, the
 *   node `a` is created as a group and stays one, so `a` can only be chosen by typing its name.
 */
import { IWiredVariable, VariableType } from '@nitrodevco/nitro-packets';

import { splitVariableName } from './WiredUtil';

/** `NewVariablePicker.UNSPECIFIED_TYPE` - a picker that offers the variables of every target. */
export const WIRED_VARIABLE_TARGET_UNSPECIFIED = 2147483647;

/** `TabButtonConfigs.*_TAB_ID`; the last one (`§_-R27§`) is the search tab typing switches to. */
export const VARIABLE_PICKER_TAB_ALL = 0;
export const VARIABLE_PICKER_TAB_RECENT = 1;
export const VARIABLE_PICKER_TAB_USER_CREATED = 2;
export const VARIABLE_PICKER_TAB_DYNAMIC = 3;
export const VARIABLE_PICKER_TAB_INTERNAL = 4;
export const VARIABLE_PICKER_TAB_SEARCH = 5;

/** `TabButtonConfig` - the list function is `variablePickerTabNodes`. */
export interface WiredVariablePickerTab {
    tabId: number;
    /** `assetUri` - the tab's icon, `public/assets/wired/<asset>.png`. */
    asset: string;
    /** `tooltipCaption` - a localization key. */
    tooltipKey: string;
}

/** `TabButtonConfigs.tabButtons`, in display order. */
export const VARIABLE_PICKER_TABS: readonly WiredVariablePickerTab[] = [
    { tabId: VARIABLE_PICKER_TAB_ALL, asset: 'var_picker_all', tooltipKey: 'wiredfurni.variable_picker.tab.all' },
    { tabId: VARIABLE_PICKER_TAB_RECENT, asset: 'var_picker_recent', tooltipKey: 'wiredfurni.variable_picker.tab.recent' },
    { tabId: VARIABLE_PICKER_TAB_USER_CREATED, asset: 'var_picker_usermade', tooltipKey: 'wiredfurni.variable_picker.tab.user_created' },
    { tabId: VARIABLE_PICKER_TAB_DYNAMIC, asset: 'var_picker_smart', tooltipKey: 'wiredfurni.variable_picker.tab.dynamic' },
    { tabId: VARIABLE_PICKER_TAB_INTERNAL, asset: 'var_picker_internal', tooltipKey: 'wiredfurni.variable_picker.tab.internal' },
    { tabId: VARIABLE_PICKER_TAB_SEARCH, asset: 'var_picker_search', tooltipKey: 'wiredfurni.variable_picker.tab.search' },
];

/** The function an element hands `createVariablePicker` - which variables it can work with. */
export type WiredVariableFilter = (variable: IWiredVariable) => boolean;

/** `VariableNode` - one row of the tree; a group has no variable, a row can be both. */
export interface WiredVariableNode {
    name: string;
    variable: IWiredVariable | null;
    children: WiredVariableNode[];
}

const isType = (variable: IWiredVariable, type: VariableType): boolean => Number(variable.variableType) === Number(type);

/**
 * `NewVariablePicker.filteredAllVariables` - the variables of the picker's target that have a
 * name. An invisible variable is only offered to the box that already uses it
 * (`initialVariableId`, the id `init` was given).
 */
export const filterPickerVariables = (variables: readonly IWiredVariable[] | null | undefined, target: number, initialVariableId: string): IWiredVariable[] => {
    if (!variables) return [];

    return variables.filter((variable) => {
        if (variable.variableName === '') return false;

        if ((Number(variable.variableTarget) !== target) && (target !== WIRED_VARIABLE_TARGET_UNSPECIFIED)) return false;

        return !(variable.isInvisible && (initialVariableId !== variable.variableId));
    });
};

/**
 * What a form keeps for one picker - everything `NewVariablePicker` holds that outlives a click.
 * `variableId` is what `finalizeSelection` returns (`''` for no selection), `target` what
 * `variableTarget` / a section's `target` returns.
 */
export interface WiredVariablePickerState {
    /** The id `init` was given: the one invisible variable this picker still offers. */
    initialVariableId: string;
    target: number;
    variableId: string;
    /** `NewVariablePicker.§_-y1J§` - the selection each target had, restored when the target comes back. */
    rememberedByTarget: Readonly<Record<number, string>>;
}

/** `NewVariablePicker.findVariableById` / `filteredVariableById`. */
export const findPickerVariableById = (pickerVariables: readonly IWiredVariable[], variableId: string): IWiredVariable | null =>
    pickerVariables.find(variable => variable.variableId === variableId) ?? null;

/** `NewVariablePicker.filteredVariableByDisplayName` - typed text to a variable the filter accepts, ignoring case. */
export const findPickerVariableByDisplayName = (pickerVariables: readonly IWiredVariable[], text: string, filter?: WiredVariableFilter): IWiredVariable | null => {
    const lowered = text.toLowerCase();

    return pickerVariables.find(variable => (!filter || filter(variable)) && (variable.variableName.toLowerCase() === lowered)) ?? null;
};

/** `NewVariablePicker.determineInitialTab`. */
export const determineInitialVariablePickerTab = (selected: IWiredVariable | null): number => {
    if (!selected) return VARIABLE_PICKER_TAB_USER_CREATED;

    if (isType(selected, VariableType.UNKNOWN_3)) return VARIABLE_PICKER_TAB_DYNAMIC;

    if (isType(selected, VariableType.INTERNAL)) return VARIABLE_PICKER_TAB_INTERNAL;

    return VARIABLE_PICKER_TAB_USER_CREATED;
};

/**
 * `VariableNode.flatten` - a chain of groups with a single variable at its end collapses into
 * that variable. Returns whether the node ended up as a plain variable row; `rename` gives such a
 * row the variable's full name.
 */
const flattenVariableNode = (node: WiredVariableNode, rename: boolean = false): boolean => {
    if ((node.children.length === 1) && (node.variable === null)) {
        const child = node.children[0];

        if (flattenVariableNode(child)) {
            node.variable = child.variable;
            node.children = [];
        }
    }

    const isLeaf = (node.variable !== null) && (node.children.length === 0);

    if (rename && isLeaf && node.variable) node.name = node.variable.variableName;

    return isLeaf;
};

/**
 * `TabButtonConfigs.nodesFromVector` - the top level rows of a list of variables, grouped by the
 * dot separated parts of their names. `flatten` is what the recent and search tabs pass: a row
 * that leads to one variable shows that variable's whole name instead of a sub menu.
 */
export const buildVariableNodes = (variables: readonly IWiredVariable[], flatten: boolean = false): WiredVariableNode[] => {
    const root: WiredVariableNode = { name: '', variable: null, children: [] };

    for (const variable of variables) {
        const parts = splitVariableName(variable);

        let parent = root;

        parts.forEach((part, index) => {
            let node = parent.children.find(child => child.name === part);

            if (!node) {
                node = { name: part, variable: (index === (parts.length - 1)) ? variable : null, children: [] };

                parent.children.push(node);
            }

            parent = node;
        });
    }

    if (flatten) {
        for (const node of root.children) flattenVariableNode(node, true);
    }

    return root.children;
};

/** `VariableNode.canBeSelected`. */
export const canSelectVariableNode = (node: WiredVariableNode, filter?: WiredVariableFilter): boolean =>
    (node.variable !== null) && (!filter || filter(node.variable));

/** `VariableNode.isDisabled` - nothing in the row or below it can be selected. */
export const isVariableNodeDisabled = (node: WiredVariableNode, filter?: WiredVariableFilter): boolean =>
    !canSelectVariableNode(node, filter) && node.children.every(child => isVariableNodeDisabled(child, filter));

/** `TabButtonConfigs.searchFilter` - every space separated term occurs in the name; nothing for an empty query. */
const searchPickerVariables = (pickerVariables: readonly IWiredVariable[], query: string): IWiredVariable[] => {
    if (query.length === 0) return [];

    const terms = query.split(' ').map(term => term.toLowerCase());

    return pickerVariables.filter((variable) => {
        const name = variable.variableName.toLowerCase();

        return terms.every(term => name.indexOf(term) !== -1);
    });
};

/**
 * `TabButtonConfig.filteredVariables()` - the rows of one tab. `history` is the recent tab's
 * source (`getVariablePickerHistory`, newest first), `query` the search tab's.
 */
export const variablePickerTabNodes = (tabId: number, pickerVariables: readonly IWiredVariable[], history: readonly string[], query: string): WiredVariableNode[] => {
    switch (tabId) {
        case VARIABLE_PICKER_TAB_ALL:
            return buildVariableNodes(pickerVariables);
        case VARIABLE_PICKER_TAB_RECENT: {
            const recent = history
                .map(variableId => findPickerVariableById(pickerVariables, variableId))
                .filter((variable): variable is IWiredVariable => variable !== null);

            return buildVariableNodes(recent, true);
        }
        case VARIABLE_PICKER_TAB_USER_CREATED:
            return buildVariableNodes(pickerVariables.filter(variable => isType(variable, VariableType.UNKNOWN_0) || isType(variable, VariableType.UNKNOWN_2)));
        case VARIABLE_PICKER_TAB_DYNAMIC:
            return buildVariableNodes(pickerVariables.filter(variable => isType(variable, VariableType.UNKNOWN_3)));
        case VARIABLE_PICKER_TAB_INTERNAL:
            return buildVariableNodes(pickerVariables.filter(variable => isType(variable, VariableType.INTERNAL)));
        case VARIABLE_PICKER_TAB_SEARCH:
            return buildVariableNodes(searchPickerVariables(pickerVariables, query), true);
        default:
            return [];
    }
};

/**
 * `ExpandedVariablePickerView`'s constructor - the width of each tab button. Flash takes the
 * spare pixels from `width % count` of the *tab* width, not of the row; kept, since it decides
 * where the tab edges fall.
 */
export const variablePickerTabWidths = (pickerWidth: number, count: number = VARIABLE_PICKER_TABS.length): number[] => {
    const width = Math.trunc((pickerWidth - 3) / count);

    let spare = width % count;

    return Array.from({ length: count }, () => {
        if (spare <= 0) return width;

        spare -= 1;

        return width + 1;
    });
};

/**
 * `NewVariablePicker.init` - an element's `createForm` calls it with the room's variables
 * (`triggerable.wiredContext.roomVariablesList`), the box's variable id and its target. An id
 * that is no longer a variable of that target reads as no selection, as in Flash, where
 * `select(findVariableById(id))` selects `null`. Without a list (the room's variables have not
 * arrived) there is nothing to check the id against and it is kept, so that saving the box
 * untouched cannot drop its variable.
 */
export const createVariablePickerState = (variables: readonly IWiredVariable[] | null | undefined, variableId: string, target: number): WiredVariablePickerState => {
    const selected = findPickerVariableById(filterPickerVariables(variables, target, variableId), variableId);
    const selectedId = variables ? (selected?.variableId ?? '') : variableId;

    return { initialVariableId: variableId, target, variableId: selectedId, rememberedByTarget: { [target]: selectedId } };
};

/** `NewVariablePicker.select` - the selection, remembered for the current target. */
export const selectPickerVariable = (state: WiredVariablePickerState, variable: IWiredVariable | null): WiredVariablePickerState => {
    const variableId = variable?.variableId ?? '';

    return { ...state, variableId, rememberedByTarget: { ...state.rememberedByTarget, [state.target]: variableId } };
};

/**
 * `NewVariablePicker.variableTarget` (the setter) - a pure form update, so an element's
 * `setMergedType` can call it. The new target gets back the selection it had before, or none.
 */
export const setPickerTarget = (state: WiredVariablePickerState, target: number): WiredVariablePickerState => {
    if (target === state.target) return state;

    const variableId = state.rememberedByTarget[target] ?? '';

    return { ...state, target, variableId, rememberedByTarget: { ...state.rememberedByTarget, [target]: variableId } };
};

/** `VariablePickerPreset.selected` - the selected variable, if the room still has it. */
export const getPickerSelectedVariable = (variables: readonly IWiredVariable[] | null | undefined, state: WiredVariablePickerState): IWiredVariable | null =>
    (state.variableId === '') ? null : findPickerVariableById(filterPickerVariables(variables, state.target, state.initialVariableId), state.variableId);

/**
 * `VariablePickerPreset.finalizeSelection` without its side effect - the id an element's
 * `readVariableIds` returns for a picker: the selection if the room still has it, otherwise
 * `''` (Flash's `null`, which `EvaWireFormat.encode` would skip, leaving the packet one string
 * short of its count - the port writes the empty string instead). Where Flash sends
 * `WiredVariable.§_-i8§` (`WIRED_VARIABLE_ID_NONE`, `'n'`) itself, the element names it. Without a
 * variables list the id is passed through, as `createVariablePickerState` keeps it - so a box an
 * element opened with `'n'` still saves `'n'`. The side effect - recording the variable in the
 * recent tab - is `rememberPickedVariables`, which `commands/wiredCommands.ts` runs when it reads
 * the form.
 */
export const finalizePickerSelection = (variables: readonly IWiredVariable[] | null | undefined, state: WiredVariablePickerState): string => {
    if (!variables) return state.variableId;

    return getPickerSelectedVariable(variables, state)?.variableId ?? '';
};

/** `VariableNodeListView.MAX_HEIGHT` / `SCROLLBAR_WIDTH`, and the layout's row height and list padding. */
export const VARIABLE_NODE_LIST_MAX_HEIGHT = 300;
export const VARIABLE_NODE_LIST_SCROLLBAR_WIDTH = 9;
export const VARIABLE_NODE_ROW_HEIGHT = 20;
export const VARIABLE_NODE_LIST_PADDING = 3;

/** `VariableNodeListView.scrollbarWidth` for a list of `count` rows. */
export const variableNodeListScrollbarWidth = (count: number): number =>
    ((count * VARIABLE_NODE_ROW_HEIGHT) > VARIABLE_NODE_LIST_MAX_HEIGHT) ? VARIABLE_NODE_LIST_SCROLLBAR_WIDTH : 0;

/** The height a list of `count` rows takes, padding included - what keeps a sub list on screen. */
export const variableNodeListHeight = (count: number): number =>
    Math.min(count * VARIABLE_NODE_ROW_HEIGHT, VARIABLE_NODE_LIST_MAX_HEIGHT) + (VARIABLE_NODE_LIST_PADDING * 2);
