/**
 * `addons/variablefx/presets/VariableFxVisibilitySettingsPreset` - the folded "visibility" section
 * (`SectionParam.COLLAPSED`): the show mode radio (always / when the variable changes / never),
 * where "when the variable changes" carries, under it in a plain bordered box (6/5/6/5), the
 * four update mask checkboxes in two columns, a splitter, the show duration (1500 to 20000 ms, 45px
 * input), a splitter and the "on mouse hover" checkbox; then the named audience dropdown.
 *
 * The audience offers "only the user" and "the user's game team" for a user source only, then
 * "users with a variable" (id 3, or 4 when a value is set; captioned with the variable's name and
 * value) and "everyone". Picking the variable audience opens `VariableFxAudienceVariablePopup`
 * and leaves the dropdown where it was (`refreshForState`); the popup's save sets it. Every other
 * change is `stateChanged` (apply, sanitise, refresh). `closePopups` on edit end is the popup
 * unmounting with the dialog.
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { findVariableById, isCheckboxMaskBitSet, setCheckboxMaskBit, VARIABLE_FX_SHOW_DURATION_MAX, VARIABLE_FX_SHOW_DURATION_MIN, VariableFxAudience, VariableFxState, variableValueWithString, WIRED_SOURCE_USER, WiredDropdownOption, WiredElementContext } from '#base/wired';

import { WiredCheckboxGroup } from '../../../../kit/WiredCheckboxGroup';
import { WiredNamedDropdown } from '../../../../kit/WiredNamedDropdown';
import { WiredNamedNumberInput } from '../../../../kit/WiredNamedNumberInput';
import { WiredPaddedContainer } from '../../../../kit/WiredPaddedContainer';
import { WiredRadioGroup } from '../../../../kit/WiredRadioGroup';
import { WiredSection } from '../../../../kit/WiredSection';
import { WiredSimpleList } from '../../../../kit/WiredSimpleList';
import { WiredSplitter } from '../../../../kit/WiredSplitter';
import { VariableFxAudienceVariablePopup } from './VariableFxAudienceVariablePopup';

/** The update mask checkboxes (`update_mask.1` to `.4`, ids 0 to 3). */
const UPDATE_MASK_IDS = [ 0, 1, 2, 3 ];

const isVariableAudience = (visibility: number): boolean =>
    (visibility === VariableFxAudience.HAS_VARIABLE) || (visibility === VariableFxAudience.HAS_VARIABLE_VALUE);

/** `variableAudienceOptionText`. */
const variableAudienceOptionText = (state: VariableFxState, variables: readonly IWiredVariable[] | undefined, ctx: WiredElementContext): string => {
    if (state.audienceVariableId === '') return ctx.localize('wiredfurni.params.variablefx.visibility.has_variable');

    const variable = variables ? findVariableById(variables, state.audienceVariableId) : null;

    if (!variable) return ctx.localize('wiredfurni.params.variablefx.visibility.has_variable.named', { variable: state.audienceVariableId });

    if (state.visibility === VariableFxAudience.HAS_VARIABLE_VALUE) {
        const value = variableValueWithString(variable, state.audienceVariableValue) ?? String(state.audienceVariableValue);

        return ctx.localize('wiredfurni.params.variablefx.visibility.has_variable.value', { variable: variable.variableName, value });
    }

    return ctx.localize('wiredfurni.params.variablefx.visibility.has_variable.named', { variable: variable.variableName });
};

/** `createAudienceOptions`. */
const createAudienceOptions = (state: VariableFxState, variables: readonly IWiredVariable[] | undefined, ctx: WiredElementContext): WiredDropdownOption[] => {
    const options: WiredDropdownOption[] = [];

    if (state.sourceType === WIRED_SOURCE_USER) {
        options.push({ id: VariableFxAudience.ONLY_USER, label: '${wiredfurni.params.variablefx.visibility.only_user}' });
        options.push({ id: VariableFxAudience.GAME_TEAM, label: '${wiredfurni.params.variablefx.visibility.game_team}' });
    }

    options.push({ id: (state.visibility === VariableFxAudience.HAS_VARIABLE_VALUE) ? VariableFxAudience.HAS_VARIABLE_VALUE : VariableFxAudience.HAS_VARIABLE, label: variableAudienceOptionText(state, variables, ctx) });
    options.push({ id: VariableFxAudience.EVERYONE, label: '${wiredfurni.params.variablefx.visibility.everyone}' });

    return options;
};

export interface VariableFxVisibilitySettingsProps {
    state: VariableFxState;
    variables: readonly IWiredVariable[] | undefined;
    ctx: WiredElementContext;
    onChange: (patch: Partial<Pick<VariableFxState, 'visibility' | 'showMode' | 'showOnMouseHover' | 'updateMask' | 'showDuration'>>) => void;
    onAudienceVariableSaved: (variableId: string, withValue: boolean, value: number) => void;
}

export const VariableFxVisibilitySettings = ({ state, variables, ctx, onChange, onAudienceVariableSaved }: VariableFxVisibilitySettingsProps) => {
    const [ popupOpen, setPopupOpen ] = useState(false);

    const changeDetails = (
        <WiredPaddedContainer
            left={6}
            top={5}
            right={6}
            bottom={5}
            bordered
            plainBorder
        >
            <WiredSimpleList>
                <WiredCheckboxGroup
                    columns={2}
                    options={UPDATE_MASK_IDS.map(id => ({ id, label: `\${wiredfurni.params.variablefx.update_mask.${id + 1}}`, selected: isCheckboxMaskBitSet(state.updateMask, id) }))}
                    onToggle={(id, selected) => onChange({ updateMask: setCheckboxMaskBit(state.updateMask, id, selected) })}
                />
                <WiredSplitter />
                <WiredNamedNumberInput
                    name="${wiredfurni.params.variablefx.show_duration}"
                    value={state.showDuration}
                    onChange={showDuration => onChange({ showDuration })}
                    min={VARIABLE_FX_SHOW_DURATION_MIN}
                    max={VARIABLE_FX_SHOW_DURATION_MAX}
                />
                <WiredSplitter />
                <WiredCheckboxGroup
                    options={[ { id: 0, label: '${wiredfurni.params.variablefx.mouse_hover}', selected: state.showOnMouseHover } ]}
                    onToggle={(id, showOnMouseHover) => onChange({ showOnMouseHover })}
                />
            </WiredSimpleList>
        </WiredPaddedContainer>
    );

    return (
        <WiredSection
            keepsFirstSplitter
            title="${wiredfurni.params.variablefx.visibility}"
            collapsible
            defaultCollapsed
        >
            <WiredSimpleList>
                <WiredRadioGroup
                    options={[
                        { id: 0, label: '${wiredfurni.params.variablefx.show_mode.always}' },
                        { id: 1, label: '${wiredfurni.params.variablefx.show_mode.when_variable_changes}', extraUnder: changeDetails },
                        { id: 2, label: '${wiredfurni.params.variablefx.show_mode.never}' },
                    ]}
                    selected={state.showMode}
                    onSelect={showMode => onChange({ showMode })}
                />
                <WiredNamedDropdown
                    name="${wiredfurni.params.variablefx.visibility.audience}"
                    options={createAudienceOptions(state, variables, ctx)}
                    selected={state.visibility}
                    onSelect={(visibility) => {
                        if (isVariableAudience(visibility)) setPopupOpen(true);
                        else onChange({ visibility });
                    }}
                    caption=""
                />
            </WiredSimpleList>
            {popupOpen && (
                <VariableFxAudienceVariablePopup
                    variables={variables}
                    variableId={state.audienceVariableId}
                    selectValue={state.visibility === VariableFxAudience.HAS_VARIABLE_VALUE}
                    value={state.audienceVariableValue}
                    roomId={ctx.roomId}
                    onSave={onAudienceVariableSaved}
                    onClose={() => setPopupOpen(false)}
                />
            )}
        </WiredSection>
    );
};
