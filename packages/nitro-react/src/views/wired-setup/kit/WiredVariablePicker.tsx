/**
 * `uibuilder/presets/VariablePickerPreset` + `newvariablepicker/NewVariablePicker` - the
 * searchable tree dropdown a wired box chooses a variable with (`search_tree_dropdown` layout).
 *
 * Closed it is a 22px field showing the selected variable's name; a click opens
 * `WiredVariablePickerExpandedView` in a popup above the dialog, dropping from the closed field:
 * `expandView` puts the expanded view at the picker container's own global position
 * (`_container.getGlobalPosition(p); p.y -= searchWrapperExpanded.y`), and `search_wrapper_expanded`
 * sits at y 0 inside the row container the layout places at y 20, so its own `y` - which is what
 * Flash reads, a window's `y` being local (`WindowModel.get y`) - is 0 and nothing is subtracted.
 * The tab row therefore covers the closed field and the search field and the tree hang below it.
 * Read as the row's y instead, the popup rides 20px up and the closed field ends up inside it.
 *
 * It is controlled: the selection lives in a `WiredVariablePickerState` in the element's form
 * (`createVariablePickerState` is Flash's `init`, `state.variableId` its `finalizeSelection`,
 * `setPickerTarget` its `variableTarget` setter) and `onChange` hands back the next state
 * together with the variable, the way Flash calls the element's selection callback. What Flash
 * resolves lazily - text that was typed but never confirmed - is resolved when the popup closes:
 * a press outside takes the variable whose name was typed and otherwise restores the selection's
 * name (`onDeactivate`); Escape applies `updateSelected`, which also clears the selection for an
 * emptied field.
 *
 * `variables` is the room's list (`wiredContext.roomVariablesList`, kept fresh by the variables
 * synchronizer), `filter` what the element passes `createVariablePicker`; see
 * `WiredVariablePickerModel` for why rejected variables are listed greyed out rather than
 * hidden. The "recent" tab reads `WiredVariablePickerHistory` for `roomId`.
 */
import { IWiredVariable } from '@nitrodevco/nitro-packets';
import { Container } from 'pixi.js';
import { useRef, useState, useSyncExternalStore } from 'react';

import { useTranslation } from '#base/context/system';
import { Border, Box, BoxLayout, FloatingPopup, getGlobalRect, Icon, Region, ThemeText } from '#base/theme';
import { determineInitialVariablePickerTab, filterPickerVariables, findPickerVariableByDisplayName, findPickerVariableById, getVariablePickerHistory, selectPickerVariable, subscribeVariablePickerHistory, VARIABLE_PICKER_TAB_SEARCH, WiredVariableFilter, WiredVariablePickerState } from '#base/wired';

import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { useWiredFillLayout } from './useWiredFillLayout';
import { useWiredStyle } from './WiredStyleContext';
import { WiredVariablePickerExpandedView } from './WiredVariablePickerExpandedView';

export interface WiredVariablePickerProps {
    variables: readonly IWiredVariable[] | null | undefined;
    state: WiredVariablePickerState;
    onChange: (state: WiredVariablePickerState, variable: IWiredVariable | null) => void;
    filter?: WiredVariableFilter;
    roomId: number;
    disabled?: boolean;
    layout?: BoxLayout;
}

export const WiredVariablePicker = ({ variables, state, onChange, filter, roomId, disabled: ownDisabled, layout }: WiredVariablePickerProps) => {
    const t = useTranslation();
    const style = useWiredStyle();
    const disabled = useWiredDisabled(ownDisabled);
    const fillLayout = useWiredFillLayout();
    const anchorRef = useRef<Container>(null);
    const [ expanded, setExpanded ] = useState<{ x: number; y: number; width: number } | null>(null);
    const [ query, setQuery ] = useState('');
    const [ tabId, setTabId ] = useState<number | null>(null);
    const history = useSyncExternalStore(subscribeVariablePickerHistory, () => getVariablePickerHistory(roomId, state.target));

    // `setWiredStyle`: illumina draws the picker with its input border, every other style with border 12.
    const borderVariant = (style.name === 'illumina') ? '105' : '12';
    const pickerVariables = filterPickerVariables(variables, state.target, state.initialVariableId);
    const selected = findPickerVariableById(pickerVariables, state.variableId);

    const select = (variable: IWiredVariable | null, keepOpen: boolean) => {
        if (!keepOpen) setExpanded(null);

        setQuery(variable?.variableName ?? '');
        onChange(selectPickerVariable(state, variable), variable);
    };

    const expand = () => {
        const anchor = anchorRef.current;

        if (!anchor || disabled) return;

        const rect = getGlobalRect(anchor);

        setQuery(selected?.variableName ?? '');
        setTabId(current => current ?? determineInitialVariablePickerTab(selected));
        setExpanded({ x: rect.x, y: rect.y, width: rect.width });
    };

    /** Closing with text that was typed but not confirmed; `clearsEmpty` is Escape's `updateSelected`. */
    const close = (clearsEmpty: boolean) => {
        const typed = findPickerVariableByDisplayName(pickerVariables, query, filter);

        setExpanded(null);

        if (typed && (typed.variableId !== state.variableId)) return select(typed, false);

        if (clearsEmpty && (query === '') && selected) select(null, false);
    };

    return (
        <Box
            ref={anchorRef}
            alpha={wiredDisabledAlpha(disabled)}
            layout={{ ...fillLayout, height: 22, ...layout }}
        >
            {/* Left in place under the open picker, which covers it: the popup is not drawn until it is laid out. */}
            <Border
                variant={borderVariant}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 22 }}
            >
                <Region
                    cursor={disabled ? 'default' : 'pointer'}
                    onPointerTap={expand}
                    layout={{ position: 'absolute', left: 0, top: 1, width: '100%', height: 20 }}
                >
                    <ThemeText
                        text={selected?.variableName ?? t('wiredfurni.variable_picker.search', 'wiredfurni.variable_picker.search')}
                        textOptions={{ fill: selected ? '#000000' : '#808080' }}
                        flashFormat={{ antiAliasType: 'advanced' }}
                        layout={{ position: 'absolute', left: 7, top: 3 }}
                    />
                </Region>
                <Icon
                    variant={7}
                    tintColor="#777777"
                    layout={{ position: 'absolute', right: 8, top: 9 }}
                />
            </Border>
            {expanded && (
                <FloatingPopup
                    x={expanded.x}
                    y={expanded.y}
                    onOutsideClick={() => close(false)}
                >
                    <WiredVariablePickerExpandedView
                        x={expanded.x}
                        y={expanded.y}
                        width={expanded.width}
                        borderVariant={borderVariant}
                        pickerVariables={pickerVariables}
                        history={history}
                        filter={filter}
                        query={query}
                        tabId={tabId ?? determineInitialVariablePickerTab(selected)}
                        onQueryChange={(value) => {
                            setQuery(value);
                            setTabId(VARIABLE_PICKER_TAB_SEARCH);
                        }}
                        onTabChange={setTabId}
                        onSelect={select}
                        onEscape={() => close(true)}
                    />
                </FloatingPopup>
            )}
        </Box>
    );
};
