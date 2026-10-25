/**
 * `addons/§_-3p§.buildInputs` - the curve (expanded): linear (step size, max level), exponential
 * (first level's xp, increase factor, max level) or manual (`level=xp` lines), each option's
 * inputs under it; the xp preview of levels 1, 2, 3, 5, 10 and 20 (collapsed); and the
 * sub-variables to create (expanded).
 */
import { LEVEL_UP_FIRST_LEVEL_XP, LEVEL_UP_INCREASE_FACTOR, LEVEL_UP_MANUAL_HEIGHT, LEVEL_UP_MANUAL_MAX_LENGTH, LEVEL_UP_MANUAL_RESTRICT, LEVEL_UP_MAX_LEVEL, LEVEL_UP_MODE_EXPONENTIAL, LEVEL_UP_MODE_LINEAR, LEVEL_UP_MODE_MANUAL, LEVEL_UP_PREVIEW_LEVELS, LEVEL_UP_STEP_SIZE, LEVEL_UP_SUB_VARIABLES, VariableLevelUpAddonForm, variableLevelUpPreviewXps, WiredElementView } from '#base/wired';

import { WiredLevelXpPreview } from '../../kit/WiredLevelXpPreview';
import { WiredNamedNumberInput } from '../../kit/WiredNamedNumberInput';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredSubVariableCreator } from '../../kit/WiredSubVariableCreator';
import { WiredTextArea } from '../../kit/WiredTextArea';

export const VariableLevelUpView: WiredElementView<VariableLevelUpAddonForm> = ({ form, setForm }) => (
    <>
        <WiredSection
            title="${wiredfurni.params.levelup.mode}"
            collapsible
        >
            <WiredRadioGroup
                options={[
                    {
                        id: LEVEL_UP_MODE_LINEAR,
                        label: '${wiredfurni.params.levelup.mode.1}',
                        extraUnder: (
                            <WiredSimpleList>
                                <WiredNamedNumberInput
                                    name="${wiredfurni.params.levelup.step_size}"
                                    value={form.stepSize}
                                    onChange={stepSize => setForm({ stepSize })}
                                    min={LEVEL_UP_STEP_SIZE.min}
                                    max={LEVEL_UP_STEP_SIZE.max}
                                    width={LEVEL_UP_STEP_SIZE.width}
                                />
                                <WiredNamedNumberInput
                                    name="${wiredfurni.params.levelup.max_level}"
                                    value={form.linearMaxLevel}
                                    onChange={linearMaxLevel => setForm({ linearMaxLevel })}
                                    min={LEVEL_UP_MAX_LEVEL.min}
                                    max={LEVEL_UP_MAX_LEVEL.max}
                                    width={LEVEL_UP_MAX_LEVEL.width}
                                />
                            </WiredSimpleList>
                        ),
                    },
                    {
                        id: LEVEL_UP_MODE_EXPONENTIAL,
                        label: '${wiredfurni.params.levelup.mode.2}',
                        extraUnder: (
                            <WiredSimpleList>
                                <WiredNamedNumberInput
                                    name="${wiredfurni.params.levelup.first_level_xp}"
                                    value={form.firstLevelXp}
                                    onChange={firstLevelXp => setForm({ firstLevelXp })}
                                    min={LEVEL_UP_FIRST_LEVEL_XP.min}
                                    max={LEVEL_UP_FIRST_LEVEL_XP.max}
                                    width={LEVEL_UP_FIRST_LEVEL_XP.width}
                                />
                                <WiredNamedNumberInput
                                    name="${wiredfurni.params.levelup.increase_factor}"
                                    value={form.increaseFactor}
                                    onChange={increaseFactor => setForm({ increaseFactor })}
                                    min={LEVEL_UP_INCREASE_FACTOR.min}
                                    max={LEVEL_UP_INCREASE_FACTOR.max}
                                    width={LEVEL_UP_INCREASE_FACTOR.width}
                                />
                                <WiredNamedNumberInput
                                    name="${wiredfurni.params.levelup.max_level}"
                                    value={form.exponentialMaxLevel}
                                    onChange={exponentialMaxLevel => setForm({ exponentialMaxLevel })}
                                    min={LEVEL_UP_MAX_LEVEL.min}
                                    max={LEVEL_UP_MAX_LEVEL.max}
                                    width={LEVEL_UP_MAX_LEVEL.width}
                                />
                            </WiredSimpleList>
                        ),
                    },
                    {
                        id: LEVEL_UP_MODE_MANUAL,
                        label: '${wiredfurni.params.levelup.mode.0}',
                        extraUnder: (
                            <WiredTextArea
                                value={form.manualText}
                                onChange={manualText => setForm({ manualText })}
                                height={LEVEL_UP_MANUAL_HEIGHT}
                                maxCharacters={LEVEL_UP_MANUAL_MAX_LENGTH}
                                placeholder="${wiredfurni.params.levelup.interpolation_placeholder}"
                                restrict={LEVEL_UP_MANUAL_RESTRICT}
                            />
                        ),
                    },
                ]}
                selected={form.mode}
                onSelect={mode => setForm({ mode })}
            />
        </WiredSection>
        <WiredSection
            title="${wiredfurni.params.levelup.preview}"
            collapsible
            defaultCollapsed
        >
            <WiredLevelXpPreview
                levels={LEVEL_UP_PREVIEW_LEVELS}
                xps={variableLevelUpPreviewXps(form)}
            />
        </WiredSection>
        <WiredSection
            title="${wiredfurni.params.create_subvariables}"
            collapsible
        >
            <WiredSubVariableCreator
                keyPrefix="wiredfurni.params.levelup.subvariable."
                subVariables={LEVEL_UP_SUB_VARIABLES}
                mask={form.subVariables}
                onChange={subVariables => setForm({ subVariables })}
            />
        </WiredSection>
    </>
);
