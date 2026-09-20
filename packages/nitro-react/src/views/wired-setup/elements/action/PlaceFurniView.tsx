/**
 * `actiontypes/PlaceFurni.buildInputs`, top to bottom:
 * - the usage info;
 * - `place_furni.target_location` (expanded, foldable): the snapshot's position (with its `.0.info`
 *   note under it in the soft text colour) or the custom reference;
 * - `place_furni.target_altitude` (expanded, foldable): on top, the snapshot's, the custom
 *   reference's;
 * - `place_furni.offsets` (folded): x, y and altitude checkboxes, each continued by its input;
 * - `place_furni.spawn_with_variable` (folded): the checkbox, with the furni variable picker
 *   (`filterSpawnVariable`) and the spawn value's value-or-variable section under it. That section
 *   is disabled until a variable with a value is picked (`updateSpawnValueState`); its source type
 *   selector is merged section 1.
 *
 * The custom reference's furni / users switch is merged section 0, drawn by the dialog; the
 * definition's `isInputSourceDisabled` greys it while neither radio asks for it.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { getWiredRoomVariables, isPlaceFurniSpawnValueDisabled, PLACE_FURNI_ALTITUDE_OFFSET_MAX, PLACE_FURNI_ALTITUDE_OFFSET_MIN, PLACE_FURNI_MERGED_VALUE, PLACE_FURNI_OFFSET_MAX, PLACE_FURNI_OFFSET_MIN, PLACE_FURNI_SPAWN_VALUE_MAX, PLACE_FURNI_SPAWN_VALUE_MIN, PlaceFurniActionForm, placeFurniSpawnVariableFilter, variableReferenceSourceOptions, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredChooseVariableSection } from '../../kit/WiredChooseVariableSection';
import { WiredDisabled } from '../../kit/WiredDisabled';
import { WiredNumberInput } from '../../kit/WiredNumberInput';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { useWiredStyle } from '../../kit/WiredStyleContext';
import { WiredText } from '../../kit/WiredText';
import { WiredUsageInfoSection } from '../../kit/WiredUsageInfoSection';
import { WiredValueOrVariableSection } from '../../kit/WiredValueOrVariableSection';

const ALTITUDE_OPTIONS = [ 0, 1, 2 ].map(id => ({ id, label: `\${wiredfurni.params.place_furni.target_altitude.${id}}` }));

/** The offset checkboxes, in int param order: caption key and input range. */
const OFFSETS = [
    { key: 'x', min: PLACE_FURNI_OFFSET_MIN, max: PLACE_FURNI_OFFSET_MAX },
    { key: 'y', min: PLACE_FURNI_OFFSET_MIN, max: PLACE_FURNI_OFFSET_MAX },
    { key: 'altitude', min: PLACE_FURNI_ALTITUDE_OFFSET_MIN, max: PLACE_FURNI_ALTITUDE_OFFSET_MAX },
];

const replaceAt = <T extends number | boolean>(values: T[], index: number, value: T): T[] => values.map((current, i) => ((i === index) ? value : current));

export const PlaceFurniView: WiredElementView<PlaceFurniActionForm> = ({ form, setForm, triggerable, ctx }) => {
    const style = useWiredStyle();
    const variables = getWiredRoomVariables(triggerable);

    return (
        <>
            <WiredUsageInfoSection text="${wiredfurni.params.place_furni.usage_info}" />
            <WiredSection
                title="${wiredfurni.params.place_furni.target_location}"
                collapsible
            >
                <WiredRadioGroup
                    options={[
                        {
                            id: 0,
                            label: '${wiredfurni.params.place_furni.target_location.0}',
                            extraUnder: (
                                <WiredText
                                    text="${wiredfurni.params.place_furni.target_location.0.info}"
                                    color={style.softTextColor}
                                />
                            ),
                        },
                        { id: 1, label: '${wiredfurni.params.place_furni.target_location.1}' },
                    ]}
                    selected={form.targetLocation}
                    onSelect={targetLocation => setForm({ targetLocation })}
                />
            </WiredSection>
            <WiredSection
                title="${wiredfurni.params.place_furni.target_altitude}"
                collapsible
            >
                <WiredRadioGroup
                    options={ALTITUDE_OPTIONS}
                    selected={form.targetAltitude}
                    onSelect={targetAltitude => setForm({ targetAltitude })}
                />
            </WiredSection>
            <WiredSection
                title="${wiredfurni.params.place_furni.offsets}"
                collapsible
                defaultCollapsed
            >
                <WiredCheckboxGroup
                    options={OFFSETS.map(({ key, min, max }, index) => ({
                        id: index,
                        label: `\${wiredfurni.params.place_furni.offsets.${key}}`,
                        selected: form.offsetEnabled[index],
                        extra: (
                            <WiredNumberInput
                                value={form.offsets[index]}
                                onChange={offset => setForm(current => ({ ...current, offsets: replaceAt(current.offsets, index, offset) }))}
                                min={min}
                                max={max}
                            />
                        ),
                    }))}
                    onToggle={(id, selected) => setForm(current => ({ ...current, offsetEnabled: replaceAt(current.offsetEnabled, id, selected) }))}
                />
            </WiredSection>
            <WiredSection
                title="${wiredfurni.params.place_furni.spawn_with_variable}"
                collapsible
                defaultCollapsed
            >
                <WiredCheckboxGroup
                    options={[ {
                        id: 0,
                        label: '${wiredfurni.params.place_furni.spawn_with_variable}',
                        selected: form.spawnWithVariable,
                        extraUnder: (
                            <WiredSimpleList>
                                <WiredChooseVariableSection
                                    filter={placeFurniSpawnVariableFilter}
                                    state={form.spawnVariable}
                                    onChange={(spawnVariable, variable) => setForm({ spawnVariable, spawnVariableHasValue: variable?.hasValue ?? false })}
                                    variables={variables}
                                    roomId={ctx.roomId}
                                />
                                <WiredDisabled disabled={isPlaceFurniSpawnValueDisabled(form)}>
                                    <WiredValueOrVariableSection
                                        title="${wiredfurni.params.place_furni.spawn_with_value}"
                                        sourceTypeOptions={variableReferenceSourceOptions(ctx, form.spawnValue.picker.target)}
                                        min={PLACE_FURNI_SPAWN_VALUE_MIN}
                                        max={PLACE_FURNI_SPAWN_VALUE_MAX}
                                        state={form.spawnValue}
                                        onChange={spawnValue => setForm({ spawnValue })}
                                        onSourceTypeSelect={sourceType => setWiredMergedSourceType(PLACE_FURNI_MERGED_VALUE, sourceType)}
                                        variables={variables}
                                        roomId={ctx.roomId}
                                    />
                                </WiredDisabled>
                            </WiredSimpleList>
                        ),
                    } ]}
                    onToggle={(_, spawnWithVariable) => setForm({ spawnWithVariable })}
                />
            </WiredSection>
        </>
    );
};
