/**
 * The "add variable" bubble and the delete / add buttons under a variable table - the same windows in
 * the inspection tab's `inspection_container` (`WiredMenuInspectionTab`) and in
 * `variables_management_detail_xml` (`VariableManagementDetailView`), which both bind them alike.
 *
 * - `updateButtonsUI`: "delete" and "add" are `Util.disableSection`ed while they cannot be pressed.
 * - `createCreateVariableBubble`: `var_picker_container` holds the code-built variable picker
 *   (`NewVariablePicker` on a `search_tree_dropdown`, in the user's wired style), as wide as it.
 * - `initializeCreateVariableBubble`: each time the bubble opens, the picker starts over (`init`)
 *   on the room's variables as the synchronizer had them, and "create" is disabled.
 * - `onChangeCreateVariable`: `value_setting` is disabled for a variable without a value, "create"
 *   until a variable is picked.
 * - `onCreateVariableClicked`: the picked variable with the typed value, then `value_input` back to
 *   `0` - and only then: the value stays between openings.
 * - `windowProcedure`: a click in the window that is neither on "add" nor in the bubble closes it.
 *   The bubble's windows are known by the clicks that reach them (`variable_setting`,
 *   `value_setting`, "create"); a click in a popup over the windows (the picker's expanded list)
 *   never reaches the window, as it never reached Flash's.
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useRef, useState } from 'react';

import { useWiredStore } from '#base/context/wired';
import { TemplateBindings } from '#base/theme';
import { createVariablePickerState, getPickerSelectedVariable, getWiredStyleByName, WiredVariableFilter } from '#base/wired';

import { WiredStyleProvider } from '../wired-setup/kit/WiredStyleContext';
import { WiredVariablePicker } from '../wired-setup/kit/WiredVariablePicker';

export interface WiredCreateVariableBubbleOptions {
    /** `create_var_bubble.visible`. */
    open: boolean;
    /** The room's variables, from the synchronizer when the bubble was opened. */
    variables: readonly IWiredVariable[];
    filter: WiredVariableFilter;
    /** The picker's target (`init`'s third argument). */
    target: number;
    roomId: number;
    canDelete: boolean;
    canAdd: boolean;
    onDelete: () => void;
    onAdd: () => void;
    onCreate: (variable: IWiredVariable, valueText: string) => void;
    onClose: () => void;
}

/** Whether `target` is one of `windows` or anything under one. */
const isWithin = (target: unknown, windows: WeakSet<PixiContainer>) => {
    for (let node = (target instanceof PixiContainer) ? target : null; node; node = node.parent) {
        if (windows.has(node)) return true;
    }

    return false;
};

/** The bindings of the bubble and the two buttons, and the window's click (`windowProcedure`). */
export const useWiredCreateVariableBubble = ({ open, variables, filter, target, roomId, canDelete, canAdd, onDelete, onAdd, onCreate, onClose }: WiredCreateVariableBubbleOptions) => {
    const preferredWiredStyle = useWiredStore(x => x.preferredWiredStyle);
    const [ pickerState, setPickerState ] = useState(() => createVariablePickerState(variables, '', target));
    const [ shownOpen, setShownOpen ] = useState(open);
    const [ valueText, setValueText ] = useState('0');
    // "add" and the bubble's windows, as the clicks that reach them find them.
    const ownWindows = useRef(new WeakSet<PixiContainer>());

    // `initializeCreateVariableBubble`: the picker's `init` on each opening.
    if (shownOpen !== open) {
        setShownOpen(open);

        if (open) setPickerState(createVariablePickerState(variables, '', target));
    }

    const selected = open ? getPickerSelectedVariable(variables, pickerState) : null;
    const remember = (event: FederatedPointerEvent) => {
        ownWindows.current.add(event.currentTarget);
    };

    const onWindowTap = (event: FederatedPointerEvent) => {
        if (!open || isWithin(event.target, ownWindows.current)) return;

        onClose();
    };

    const bindings: TemplateBindings = {
        delete_var_btn: { disableSection: !canDelete, onPointerTap: onDelete },
        add_var_btn: {
            disableSection: !canAdd,
            onPointerTap: (event) => {
                remember(event);
                onAdd();
            },
        },
        create_var_bubble: { visible: open },
        variable_setting: { onPointerDown: remember },
        var_picker_container: {
            children: open && (
                <WiredStyleProvider style={getWiredStyleByName(preferredWiredStyle)}>
                    <WiredVariablePicker
                        variables={variables}
                        state={pickerState}
                        filter={filter}
                        roomId={roomId}
                        onChange={state => setPickerState(state)}
                        layout={{ position: 'absolute', left: 0, top: 0, width: '100%' }}
                    />
                </WiredStyleProvider>
            ),
        },
        value_setting: { disableSection: !!selected && !selected.hasValue, onPointerDown: remember },
        value_input: { caption: valueText, onChange: setValueText },
        create_var_btn: {
            disableSection: !selected,
            onPointerTap: (event) => {
                remember(event);

                if (!selected) return;

                onCreate(selected, valueText);
                setValueText('0');
            },
        },
    };

    return { bindings, onWindowTap };
};
