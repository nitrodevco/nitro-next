/**
 * The `create_var_bubble` of the inspection tab and of the variable management detail window:
 * a variable picker (`NewVariablePicker` on a `search_tree_dropdown`, in the user's wired style)
 * over a value field, and "create". The value field is disabled for a variable without a value,
 * "create" until a variable is picked (`onChangeCreateVariable`). Closing it on a click elsewhere
 * is the owner's `windowProcedure` (see `isWithinContainer`), which is why the bubble takes a ref.
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer } from 'pixi.js';
import { RefObject, useState } from 'react';

import { useTranslation } from '#base/context/system';
import { useWiredStore } from '#base/context/wired';
import { Border, Box, BoxLayout, Bubble, Button, TextInput, ThemeText } from '#base/theme';
import { createVariablePickerState, getPickerSelectedVariable, getWiredStyleByName, WiredVariableFilter } from '#base/wired';

import { WiredStyleProvider } from '../wired-setup/kit/WiredStyleContext';
import { WiredVariablePicker } from '../wired-setup/kit/WiredVariablePicker';

export interface WiredMenuCreateVariableBubbleProps {
    /** The room's variables, from the synchronizer when the bubble was opened. */
    variables: readonly IWiredVariable[];
    filter: WiredVariableFilter;
    /** The picker's target (`init`'s third argument). */
    target: number;
    roomId: number;
    /** The bubble's container, for the owner's click-away test. */
    bubbleRef: RefObject<PixiContainer | null>;
    onCreate: (variable: IWiredVariable, valueText: string) => void;
    layout?: BoxLayout;
}

export const WiredMenuCreateVariableBubble = ({ variables, filter, target, roomId, bubbleRef, onCreate, layout }: WiredMenuCreateVariableBubbleProps) => {
    const t = useTranslation();
    const preferredWiredStyle = useWiredStore(x => x.preferredWiredStyle);
    const [ pickerState, setPickerState ] = useState(() => createVariablePickerState(variables, '', target));
    const [ valueText, setValueText ] = useState('0');
    const selected = getPickerSelectedVariable(variables, pickerState);
    const valueDisabled = !!selected && !selected.hasValue;

    return (
        <Box
            ref={bubbleRef}
            zIndex={10}
            layout={{ position: 'absolute', width: 186, height: 145, ...layout }}
        >
            <Bubble
                variant="7"
                usePointer={false}
                layout={{ width: 186, height: 145 }}
            >
                <Box layout={{ position: 'absolute', left: 14, top: 14, width: 158, height: 42 }}>
                    <ThemeText
                        text={t('wiredmenu.inspection.select_variable', 'wiredmenu.inspection.select_variable')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#000000' }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, top: 0, height: 17 }}
                    />
                    <Box layout={{ position: 'absolute', left: 0, top: 20, width: 158, height: 22 }}>
                        <WiredStyleProvider style={getWiredStyleByName(preferredWiredStyle)}>
                            <WiredVariablePicker
                                variables={variables}
                                state={pickerState}
                                filter={filter}
                                roomId={roomId}
                                onChange={state => setPickerState(state)}
                                layout={{ width: 158 }}
                            />
                        </WiredStyleProvider>
                    </Box>
                </Box>
                <Box
                    alpha={valueDisabled ? 0.5 : 1}
                    eventMode={valueDisabled ? 'none' : 'auto'}
                    layout={{ position: 'absolute', left: 14, top: 60, width: 158, height: 42 }}
                >
                    <ThemeText
                        text={t('wiredmenu.inspection.select_value', 'wiredmenu.inspection.select_value')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#000000' }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, top: 0, height: 17 }}
                    />
                    <Border
                        variant="4"
                        layout={{ position: 'absolute', left: 0, top: 20, width: 80, height: 22 }}
                    >
                        <TextInput
                            value={valueText}
                            onChange={value => setValueText(value.replace(/[^0-9-]/g, ''))}
                            textStyle="text-style-u-regular"
                            layout={{ position: 'absolute', left: 5, top: 3, width: 71, height: 17 }}
                        />
                    </Border>
                </Box>
                <Box
                    alpha={selected ? 1 : 0.5}
                    layout={{ position: 'absolute', left: 14, top: 108, width: 158, height: 25 }}
                >
                    <Button
                        variant="3"
                        disabled={!selected}
                        onPointerTap={() => {
                            if (!selected) return;

                            onCreate(selected, valueText);
                            setValueText('0');
                        }}
                        layout={{ width: 158, height: 25 }}
                    >
                        {t('wiredmenu.inspection.create', 'wiredmenu.inspection.create')}
                    </Button>
                </Box>
            </Bubble>
        </Box>
    );
};
