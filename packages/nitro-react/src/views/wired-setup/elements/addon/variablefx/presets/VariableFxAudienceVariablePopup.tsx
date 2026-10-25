/**
 * `addons/variablefx/presets/VariableFxAudienceVariablePopup` - the 300px wide window the audience
 * dropdown opens for "users with a variable": a variable picker (any variable, user target), the
 * "select value" checkbox (only for a variable with a value) and the value input (any int, 0x / 0b
 * accepted; only while the checkbox is ticked), padded 8px, over a save / cancel button row, in a
 * frame of the dialog's wired style (`createFramePreset`) titled
 * `wiredfurni.params.variablefx.audience_popup.title`, 300 wide and as high as its list plus the
 * template's margins (`FramePreset.resizeToWidth` / `fixHeight`).
 *
 * Flash adds the frame to the desktop and centres it; here it floats above every window through
 * `FloatingPopup`, centred, and closes only by its close button, cancel or save - not on an
 * outside press. It is not draggable. Save hands back the picked variable (`finalizeSelection`,
 * which also feeds the picker's recent tab), whether a value was chosen and the value.
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { Box, FloatingPopup, Frame } from '#base/theme';
import { createVariablePickerState, getPickerSelectedVariable, rememberPickedVariables, WIRED_INT_MAX, WIRED_INT_MIN, WIRED_SOURCE_USER, WiredVariablePickerState } from '#base/wired';

import { useWiredCaption } from '../../../../kit/useWiredCaption';
import { WiredButton } from '../../../../kit/WiredButton';
import { WiredButtonRow } from '../../../../kit/WiredButtonRow';
import { WiredCheckboxGroup } from '../../../../kit/WiredCheckboxGroup';
import { WiredNamedNumberInput } from '../../../../kit/WiredNamedNumberInput';
import { WiredPaddedContainer } from '../../../../kit/WiredPaddedContainer';
import { WiredSimpleList } from '../../../../kit/WiredSimpleList';
import { WiredSpacer } from '../../../../kit/WiredSpacer';
import { useWiredStyle } from '../../../../kit/WiredStyleContext';
import { WiredVariablePicker } from '../../../../kit/WiredVariablePicker';

/** `resizeToWidth(300)`. */
const WIDTH = 300;
const CONTENT_PADDING = 8;

export interface VariableFxAudienceVariablePopupProps {
    variables: readonly IWiredVariable[] | undefined;
    /** `open(variables, variableId, selectValue, value)`. */
    variableId: string;
    selectValue: boolean;
    value: number;
    roomId: number;
    /** `onAudienceVariableSaved(variableId, withValue, value)`. */
    onSave: (variableId: string, withValue: boolean, value: number) => void;
    /** `hide()`. */
    onClose: () => void;
}

interface AudiencePopupState {
    picker: WiredVariablePickerState;
    selectValue: boolean;
    value: number;
}

const hasValue = (variable: IWiredVariable | null): boolean => (variable !== null) && variable.hasValue;

export const VariableFxAudienceVariablePopup = ({ variables, variableId, selectValue, value, roomId, onSave, onClose }: VariableFxAudienceVariablePopupProps) => {
    const style = useWiredStyle();
    const caption = useWiredCaption();
    // `open` + `refreshValueControls`: a variable without a value cannot keep "select value" ticked.
    const [ popup, setPopup ] = useState<AudiencePopupState>(() => {
        const picker = createVariablePickerState(variables, variableId, WIRED_SOURCE_USER);

        return { picker, selectValue: selectValue && hasValue(getPickerSelectedVariable(variables, picker)), value };
    });
    const selected = getPickerSelectedVariable(variables, popup.picker);
    const selectedHasValue = hasValue(selected);
    const frame = style.templates.frame;

    const save = () => {
        if (!selected) return;

        rememberPickedVariables(roomId, [ selected.variableId ], variables ?? []);
        onSave(selected.variableId, popup.selectValue && selected.hasValue, popup.value);
        onClose();
    };

    return (
        <FloatingPopup
            x={0}
            y={0}
            onOutsideClick={() => undefined}
        >
            <Frame
                id="wired-variablefx-audience"
                variant={frame.variant}
                caption={caption('${wiredfurni.params.variablefx.audience_popup.title}')}
                tintColor={style.frameColor}
                dropShadow={frame.dropShadow}
                resizeDirection="none"
                rememberPosition={false}
                centered
                onClose={onClose}
                // The template's `margin_*` vars place `_CONTENT`; `FramePreset.fixHeight` makes the
                // frame its list's height plus the top and bottom margins.
                margins={[ frame.marginLeft, frame.marginTop, frame.marginRight, frame.marginBottom ]}
                fitContent="height"
                layout={{ position: 'absolute', width: WIDTH, minWidth: WIDTH, minHeight: 0 }}
            >
                <Box layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column', alignItems: 'stretch', width: WIDTH - frame.marginLeft - frame.marginRight }}>
                    <WiredPaddedContainer
                        left={CONTENT_PADDING}
                        top={CONTENT_PADDING}
                        right={CONTENT_PADDING}
                        bottom={CONTENT_PADDING}
                    >
                        <WiredSimpleList spacing={style.genericVerticalSpacing}>
                            <WiredVariablePicker
                                variables={variables}
                                state={popup.picker}
                                onChange={(picker, variable) => setPopup(current => ({ ...current, picker, selectValue: current.selectValue && hasValue(variable) }))}
                                roomId={roomId}
                            />
                            <WiredCheckboxGroup
                                options={[ { label: '${wiredfurni.params.variablefx.audience_popup.select_value}', selected: popup.selectValue, disabled: !selectedHasValue } ]}
                                onToggle={(id, checked) => setPopup(current => ({ ...current, selectValue: checked }))}
                            />
                            <WiredNamedNumberInput
                                name="${wiredfurni.params.variablefx.audience_popup.value}"
                                value={popup.value}
                                onChange={next => setPopup(current => ({ ...current, value: next }))}
                                min={WIRED_INT_MIN}
                                max={WIRED_INT_MAX}
                                nonDecimalNotations
                                disabled={!selectedHasValue || !popup.selectValue}
                            />
                        </WiredSimpleList>
                    </WiredPaddedContainer>
                    <WiredSpacer height={style.sectionSpacing} />
                    <WiredButtonRow>
                        <WiredButton
                            label="${wiredfurni.params.variablefx.audience_popup.save}"
                            onPress={save}
                            disabled={!selected}
                        />
                        <WiredButton
                            label="${cancel}"
                            onPress={onClose}
                        />
                    </WiredButtonRow>
                </Box>
            </Frame>
        </FloatingPopup>
    );
};
