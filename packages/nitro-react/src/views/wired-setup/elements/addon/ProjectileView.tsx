/**
 * `addons/§_-Gb§.buildInputs`, in its order:
 *
 * 1. the usage info;
 * 2. `projectile.direction` (expanded) - the new direction checkbox, under it (10 apart) the
 *    directional system drop-down, its bitmap centred and the "change shooter direction"
 *    checkbox with the bunny hop checkbox under that;
 * 3. `projectile.animation_trajectory` (collapsed) - the trajectory radio (straight, with its info
 *    in the soft colour; curved, with its height), the distance radio and the distance's
 *    value-or-variable section (merged input source 1, disabled without a distance);
 * 4. `projectile.animation_time` (collapsed) - the override checkbox with, under it, the time per
 *    tile's value-or-variable section (merged input source 0), the x / y / z distance options and
 *    the speed increase;
 * 5. the rotation offset slider (collapsed, 0 to 7, disabled without a new direction);
 * 6. the projectile's internal variables (collapsed);
 * 7. a splitter.
 *
 * Flash's change callbacks only refresh the input source sections (`updateSourceContainer`),
 * which read the form here through `isInputSourceDisabled`.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { getWiredInt, getWiredRoomVariables, PROJECTILE_DIRECTIONAL_SYSTEMS, PROJECTILE_DISTANCE_MAX, PROJECTILE_DISTANCE_MIN, PROJECTILE_ROTATION_OFFSET_MAX, PROJECTILE_SPEED_INCREASE_MAX, PROJECTILE_SUB_VARIABLES, PROJECTILE_TIME_MAX, PROJECTILE_TIME_MIN, PROJECTILE_TRAJECTORY_MAX, PROJECTILE_TRAJECTORY_MIN, ProjectileAddonForm, projectileDirectionalSystemAsset, SLIDER_CONVERTER_ECHO, variableReferenceSourceOptions, WiredElementView } from '#base/wired';

import { WiredAlignCenter } from '../../kit/WiredAlignCenter';
import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredDisabled } from '../../kit/WiredDisabled';
import { WiredNamedDropdown } from '../../kit/WiredNamedDropdown';
import { WiredNamedNumberInput } from '../../kit/WiredNamedNumberInput';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredSliderSection } from '../../kit/WiredSliderSection';
import { WiredSplitter } from '../../kit/WiredSplitter';
import { WiredStaticBitmap } from '../../kit/WiredStaticBitmap';
import { useWiredStyle } from '../../kit/WiredStyleContext';
import { WiredSubVariableCreator } from '../../kit/WiredSubVariableCreator';
import { WiredText } from '../../kit/WiredText';
import { WiredUsageInfoSection } from '../../kit/WiredUsageInfoSection';
import { WiredValueOrVariableSection } from '../../kit/WiredValueOrVariableSection';

/** `_loc14_.spacing = 10` - the new direction's list. */
const DIRECTION_LIST_SPACING = 10;

const DIRECTIONAL_SYSTEM_OPTIONS = PROJECTILE_DIRECTIONAL_SYSTEMS.map(id => ({ id, label: `\${wiredfurni.params.projectile.directional_system.${id}}` }));
const DISTANCE_AXES = [ 'x', 'y', 'z' ];

export const ProjectileView: WiredElementView<ProjectileAddonForm> = ({ form, setForm, triggerable, ctx }) => {
    const style = useWiredStyle();
    const variables = getWiredRoomVariables(triggerable);

    return (
        <>
            <WiredUsageInfoSection text="${wiredfurni.params.projectile.usage_info}" />
            <WiredSection
                title="${wiredfurni.params.projectile.direction}"
                collapsible
            >
                <WiredCheckboxGroup
                    options={[ {
                        label: '${wiredfurni.params.projectile.new_direction_enabled}',
                        selected: form.newDirection,
                        extraUnder: (
                            <WiredSimpleList spacing={DIRECTION_LIST_SPACING}>
                                <WiredNamedDropdown
                                    name="${wiredfurni.params.projectile.directional_system}"
                                    caption="${wiredfurni.params.projectile.directional_system}"
                                    options={DIRECTIONAL_SYSTEM_OPTIONS}
                                    selected={form.directionalSystem}
                                    onSelect={directionalSystem => setForm({ directionalSystem })}
                                />
                                {PROJECTILE_DIRECTIONAL_SYSTEMS.includes(form.directionalSystem) && (
                                    <WiredAlignCenter>
                                        <WiredStaticBitmap asset={`wired/${projectileDirectionalSystemAsset(form.directionalSystem)}`} />
                                    </WiredAlignCenter>
                                )}
                                <WiredCheckboxGroup
                                    options={[ {
                                        label: '${wiredfurni.params.projectile.change_shooter_direction}',
                                        selected: form.changeShooterDirection,
                                        extraUnder: (
                                            <WiredCheckboxGroup
                                                options={[ { label: '${wiredfurni.params.projectile.bunny_hop}', selected: form.bunnyHop } ]}
                                                onToggle={(_, bunnyHop) => setForm({ bunnyHop })}
                                            />
                                        ),
                                    } ]}
                                    onToggle={(_, changeShooterDirection) => setForm({ changeShooterDirection })}
                                />
                            </WiredSimpleList>
                        ),
                    } ]}
                    onToggle={(_, newDirection) => setForm({ newDirection })}
                />
            </WiredSection>
            <WiredSection
                title="${wiredfurni.params.projectile.animation_trajectory}"
                collapsible
                defaultCollapsed
            >
                <WiredSimpleList>
                    <WiredSection title="${wiredfurni.params.projectile.animation_trajectory.trajectory}">
                        <WiredRadioGroup
                            options={[
                                {
                                    id: 0,
                                    label: '${wiredfurni.params.projectile.animation_trajectory.trajectory.0}',
                                    extraUnder: (
                                        <WiredText
                                            text="${wiredfurni.params.projectile.animation_trajectory.trajectory.0.info}"
                                            color={style.softTextColor}
                                        />
                                    ),
                                },
                                {
                                    id: 1,
                                    label: '${wiredfurni.params.projectile.animation_trajectory.trajectory.1}',
                                    extraUnder: (
                                        <WiredNamedNumberInput
                                            name="${wiredfurni.params.projectile.animation_trajectory.trajectory.1.extra}"
                                            value={form.trajectoryHeight}
                                            onChange={trajectoryHeight => setForm({ trajectoryHeight })}
                                            min={PROJECTILE_TRAJECTORY_MIN}
                                            max={PROJECTILE_TRAJECTORY_MAX}
                                        />
                                    ),
                                },
                            ]}
                            selected={form.trajectory}
                            onSelect={trajectory => setForm({ trajectory })}
                        />
                    </WiredSection>
                    <WiredSection title="${wiredfurni.params.projectile.animation_trajectory.distance}">
                        <WiredRadioGroup
                            options={[ 0, 1, 2 ].map(id => ({ id, label: `\${wiredfurni.params.projectile.animation_trajectory.distance.${id}}` }))}
                            selected={form.distanceMode}
                            onSelect={distanceMode => setForm({ distanceMode })}
                        />
                    </WiredSection>
                    <WiredDisabled disabled={form.distanceMode === 0}>
                        <WiredValueOrVariableSection
                            title="${wiredfurni.params.projectile.animation_trajectory.distance_selection}"
                            sourceTypeOptions={variableReferenceSourceOptions(ctx, getWiredInt(triggerable, 17))}
                            min={PROJECTILE_DISTANCE_MIN}
                            max={PROJECTILE_DISTANCE_MAX}
                            state={form.distance}
                            onChange={distance => setForm({ distance })}
                            onSourceTypeSelect={sourceType => setWiredMergedSourceType(1, sourceType)}
                            variables={variables}
                            roomId={ctx.roomId}
                        />
                    </WiredDisabled>
                </WiredSimpleList>
            </WiredSection>
            <WiredSection
                title="${wiredfurni.params.projectile.animation_time}"
                collapsible
                defaultCollapsed
            >
                <WiredCheckboxGroup
                    options={[ {
                        label: '${wiredfurni.params.projectile.override_animation_time}',
                        selected: form.customAnimationTime,
                        extraUnder: (
                            <WiredSimpleList>
                                <WiredValueOrVariableSection
                                    title="${wiredfurni.params.projectile.time_per_tile}"
                                    sourceTypeOptions={variableReferenceSourceOptions(ctx, getWiredInt(triggerable, 5))}
                                    min={PROJECTILE_TIME_MIN}
                                    max={PROJECTILE_TIME_MAX}
                                    state={form.animationTime}
                                    onChange={animationTime => setForm({ animationTime })}
                                    onSourceTypeSelect={sourceType => setWiredMergedSourceType(0, sourceType)}
                                    variables={variables}
                                    roomId={ctx.roomId}
                                />
                                <WiredSection title="${wiredfurni.params.projectile.distance_options}">
                                    <WiredCheckboxGroup
                                        options={DISTANCE_AXES.map((axis, index) => ({ id: index, label: `\${wiredfurni.params.projectile.distance_${axis}}`, selected: form.distanceAxes[index] }))}
                                        onToggle={(id, selected) => setForm(current => ({ ...current, distanceAxes: current.distanceAxes.map((old, index) => ((index === id) ? selected : old)) }))}
                                    />
                                </WiredSection>
                                <WiredSection title="${wiredfurni.params.projectile.increase_speed.title}">
                                    <WiredNamedNumberInput
                                        name="${wiredfurni.params.projectile.increase_speed}"
                                        value={form.speedIncrease}
                                        onChange={speedIncrease => setForm({ speedIncrease })}
                                        min={0}
                                        max={PROJECTILE_SPEED_INCREASE_MAX}
                                    />
                                </WiredSection>
                            </WiredSimpleList>
                        ),
                    } ]}
                    onToggle={(_, customAnimationTime) => setForm({ customAnimationTime })}
                />
            </WiredSection>
            <WiredSliderSection
                titleKey="wiredfurni.params.projectile.rotation_offset"
                unitKey="offset"
                converter={SLIDER_CONVERTER_ECHO}
                min={0}
                max={PROJECTILE_ROTATION_OFFSET_MAX}
                step={1}
                value={form.rotationOffset}
                onChange={rotationOffset => setForm({ rotationOffset })}
                showInput={false}
                sectionProps={{ collapsible: true, defaultCollapsed: true, disabled: !form.newDirection }}
            />
            <WiredSection
                title="${wiredfurni.params.projectile.projectile.variables}"
                collapsible
                defaultCollapsed
            >
                <WiredSubVariableCreator
                    keyPrefix="wiredfurni.params.projectile.variable."
                    subVariables={PROJECTILE_SUB_VARIABLES}
                    mask={form.internalVariables}
                    onChange={internalVariables => setForm({ internalVariables })}
                />
            </WiredSection>
            <WiredSplitter />
        </>
    );
};
