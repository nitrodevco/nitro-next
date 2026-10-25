/**
 * `addons/leaderboard/VariableLeaderboardAddon.buildInputs` (WIN63-202610131318): the General,
 * Columns, Multi-variable mode (collapsed), Filter (collapsed) and Leaderboard location sections.
 *
 * While the editor is open its leaderboard's location is edited in the room - see
 * `components/room/widgets/variable-leaderboard/VariableLeaderboardWidget`. The editor starts the
 * edit (`onEditInitialized` -> `VariableLeaderboardLocationPreset.beginEdit`), sends its config on
 * every change (`configChanged` -> `updateEditDraft`), takes a dragged location back into the form
 * (`onLocationChanged`) and ends the edit when it closes (`onEditEnd` -> `endLocationEdit`).
 */
import { VARIABLE_LEADERBOARD_PAGE_SIZES, VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';
import { useEffect, useMemo } from 'react';

import { endLeaderboardLocationEdit, setWiredMergedSourceType, updateLeaderboardLocationEdit } from '#base/commands';
import { useWiredStore } from '#base/context/wired';
import {
    changeLeaderboardColumn,
    getWiredRoomVariables,
    isLeaderboardFilterVariable,
    isLeaderboardPublished,
    leaderboardColumnTypeLabel,
    leaderboardConfigFromForm,
    leaderboardFilterDisabled,
    leaderboardGeneralWarning,
    leaderboardNeedsColumnTypeInfo,
    leaderboardSortOptions,
    sameLeaderboardLocation,
    selectLeaderboardFilterVariable,
    setLeaderboardColumnCount,
    suggestLeaderboardDisplayNames,
    VARIABLE_LEADERBOARD_MAX_COLUMN_LABEL_LENGTH,
    VARIABLE_LEADERBOARD_MAX_COLUMNS,
    VARIABLE_LEADERBOARD_MAX_DESCRIPTION_LENGTH,
    VARIABLE_LEADERBOARD_MAX_OFFSET_X,
    VARIABLE_LEADERBOARD_MAX_OVERRIDE_LENGTH,
    VARIABLE_LEADERBOARD_MAX_TITLE_LENGTH,
    VARIABLE_LEADERBOARD_MIN_OFFSET_X,
    VARIABLE_LEADERBOARD_OTHER_COLUMN_TYPES,
    VARIABLE_LEADERBOARD_WIDTH_LABELS,
    VariableLeaderboardAddonForm,
    VariableLeaderboardLocation,
    WIRED_INT_MAX,
    WIRED_INT_MIN,
    WiredElementView,
} from '#base/wired';

import { WiredButton } from '../../kit/WiredButton';
import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredChooseVariableSection } from '../../kit/WiredChooseVariableSection';
import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredNamedDropdown } from '../../kit/WiredNamedDropdown';
import { WiredNumberInput } from '../../kit/WiredNumberInput';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredSpacer } from '../../kit/WiredSpacer';
import { useWiredStyle } from '../../kit/WiredStyleContext';
import { WiredText } from '../../kit/WiredText';
import { WiredTextInput } from '../../kit/WiredTextInput';
import { WiredValueOrVariableSection } from '../../kit/WiredValueOrVariableSection';

/** `NumberInputParam(0, int.MIN, int.MAX, 32)` - the tile and altitude inputs. */
const COORDINATE_INPUT_WIDTH = 32;

/** `DropdownParam(..., 82)` - the column width drop-down. */
const COLUMN_WIDTH_DROPDOWN_WIDTH = 82;

/** `Math.max(80, entries_per_page.width)` - the page size label and its drop-down. */
const PAGE_SIZE_WIDTH = 80;

export const VariableLeaderboardAddonView: WiredElementView<VariableLeaderboardAddonForm> = ({ form, setForm, triggerable, ctx }) => {
    const style = useWiredStyle();
    const variables = getWiredRoomVariables(triggerable);
    const draftLocation = useWiredStore(x => x.leaderboardLocationEdit?.draft.location ?? null);
    const config = useMemo(() => leaderboardConfigFromForm(form, ctx.roomVariables), [ form, ctx.roomVariables ]);
    // `beginEdit`'s `_active`: the edit runs for a readable box with its context.
    const active = !!form.context && !form.invalid;
    const published = isLeaderboardPublished(form.context);
    const warning = leaderboardGeneralWarning(form);
    const filterDisabled = leaderboardFilterDisabled(form, variables);

    // `onEditInitialized` -> `beginLocationEdit`, then `updateEditDraft` on every change.
    useEffect(() => {
        if (active && form.context) updateLeaderboardLocationEdit(form.context, config);
    }, [ active, form.context, config ]);

    // `onEditEnd` -> `endLocationEdit`.
    useEffect(() => endLeaderboardLocationEdit, []);

    // `onLocationChanged`: a drag in the room moved the leaderboard.
    useEffect(() => {
        if (!active || !draftLocation || sameLeaderboardLocation(draftLocation, form.location)) return;

        setForm({ location: draftLocation });
    }, [ active, draftLocation ]);

    const setLocation = (patch: Partial<VariableLeaderboardLocation>) => {
        if (active) setForm(current => ({ ...current, location: { ...current.location, ...patch } }));
    };

    const columnRows = form.columns.map((column, index) => (
        <WiredSimpleList
            key={index}
            vertical={false}
            centerVertically
        >
            <WiredDropdown
                options={((index === 0) ? [ 0 ] : VARIABLE_LEADERBOARD_OTHER_COLUMN_TYPES).map(type => ({ id: type, label: leaderboardColumnTypeLabel(type) }))}
                selected={column.type}
                onSelect={type => setForm(current => ({ ...current, columns: changeLeaderboardColumn(current.columns, index, { type }) }))}
                disabled={index === 0}
            />
            <WiredTextInput
                value={column.label}
                onChange={label => setForm(current => ({ ...current, columns: changeLeaderboardColumn(current.columns, index, { label }) }))}
                maxCharacters={VARIABLE_LEADERBOARD_MAX_COLUMN_LABEL_LENGTH}
                placeholder="${wiredfurni.params.variable_leaderboard.column_name}"
                showCharacterLimit={false}
            />
            <WiredDropdown
                options={VARIABLE_LEADERBOARD_WIDTH_LABELS.map((label, id) => ({ id, label }))}
                selected={column.width}
                onSelect={width => setForm(current => ({ ...current, columns: changeLeaderboardColumn(current.columns, index, { width }) }))}
                width={COLUMN_WIDTH_DROPDOWN_WIDTH}
            />
        </WiredSimpleList>
    ));

    return (
        <>
            <WiredSection title="${wiredfurni.params.variable_leaderboard.section.general}">
                <WiredSimpleList>
                    {(warning.length > 0)
                        && (
                            <WiredText
                                text={warning}
                                color={style.redTextColor}
                            />
                        )}
                    <WiredSimpleList
                        vertical={false}
                        centerVertically
                    >
                        <WiredText
                            text="${wiredfurni.params.variable_leaderboard.title}"
                            wrap={false}
                        />
                        <WiredTextInput
                            value={form.title}
                            onChange={title => setForm({ title })}
                            maxCharacters={VARIABLE_LEADERBOARD_MAX_TITLE_LENGTH}
                        />
                    </WiredSimpleList>
                    <WiredSimpleList
                        vertical={false}
                        centerVertically
                    >
                        <WiredText
                            text="${wiredfurni.params.variable_leaderboard.description}"
                            wrap={false}
                        />
                        <WiredTextInput
                            value={form.description}
                            onChange={description => setForm({ description })}
                            maxCharacters={VARIABLE_LEADERBOARD_MAX_DESCRIPTION_LENGTH}
                        />
                    </WiredSimpleList>
                    <WiredSimpleList spacing={2}>
                        <WiredSimpleList vertical={false}>
                            <WiredText
                                text="${wiredfurni.params.variable_leaderboard.section.sorting}"
                                mode="overflow"
                            />
                            <WiredText
                                text="${wiredfurni.params.variable_leaderboard.entries_per_page}"
                                wrap={false}
                                width={PAGE_SIZE_WIDTH}
                            />
                        </WiredSimpleList>
                        <WiredSimpleList
                            vertical={false}
                            centerVertically
                        >
                            <WiredDropdown
                                options={leaderboardSortOptions(form).map(id => ({ id, label: `\${wiredfurni.params.variable_leaderboard.sort.${[ 'highest_value', 'lowest_value', 'oldest_creation', 'latest_creation', 'oldest_update', 'latest_update' ][id]}}` }))}
                                selected={form.sortMode}
                                onSelect={sortMode => setForm({ sortMode })}
                            />
                            <WiredDropdown
                                options={VARIABLE_LEADERBOARD_PAGE_SIZES.map((size, id) => ({ id, label: String(size) }))}
                                selected={form.pageSizeOption}
                                onSelect={pageSizeOption => setForm({ pageSizeOption })}
                                width={PAGE_SIZE_WIDTH}
                            />
                        </WiredSimpleList>
                    </WiredSimpleList>
                </WiredSimpleList>
            </WiredSection>
            <WiredSection title="${wiredfurni.params.variable_leaderboard.section.columns}">
                <WiredSimpleList>
                    <WiredNamedDropdown
                        name="${wiredfurni.params.variable_leaderboard.columns.count}"
                        options={Array.from({ length: VARIABLE_LEADERBOARD_MAX_COLUMNS }, (_, i) => ({ id: i + 1, label: String(i + 1) }))}
                        selected={form.columns.length}
                        onSelect={count => setForm(current => ({ ...current, columns: setLeaderboardColumnCount(current.columns, count) }))}
                    />
                    {!form.hasValueChoice
                        && (
                            <WiredText
                                text="${wiredfurni.params.variable_leaderboard.value_unavailable}"
                                color={style.softTextColor}
                            />
                        )}
                    {columnRows}
                    {leaderboardNeedsColumnTypeInfo(form.columns)
                        && (
                            <WiredText
                                text="${wiredfurni.params.variable_leaderboard.column_type_info}"
                                color={style.softTextColor}
                            />
                        )}
                </WiredSimpleList>
            </WiredSection>
            <WiredSection
                title="${wiredfurni.params.variable_leaderboard.section.multi_variable}"
                collapsible
                defaultCollapsed
            >
                <WiredSimpleList>
                    <WiredText
                        text="${wiredfurni.params.variable_leaderboard.multi_variable_info}"
                        color={style.softTextColor}
                    />
                    <WiredButton
                        label="${wiredfurni.params.variable_leaderboard.suggest}"
                        onPress={() => setForm(current => ({ ...current, displayNames: suggestLeaderboardDisplayNames(current.displayNames) }))}
                    />
                    {form.displayNames.map((row, index) => (
                        <WiredSimpleList
                            key={row.variableId}
                            vertical={false}
                            centerVertically
                        >
                            <WiredText
                                text={`${row.technicalName} =`}
                                wrap={false}
                            />
                            <WiredTextInput
                                value={row.text}
                                onChange={text => setForm(current => ({ ...current, displayNames: current.displayNames.with(index, { ...current.displayNames[index], text }) }))}
                                maxCharacters={VARIABLE_LEADERBOARD_MAX_OVERRIDE_LENGTH}
                            />
                        </WiredSimpleList>
                    ))}
                </WiredSimpleList>
            </WiredSection>
            <WiredSection
                title="${wiredfurni.params.variable_leaderboard.section.filter}"
                collapsible
                defaultCollapsed
            >
                <WiredCheckboxGroup
                    options={[ {
                        label: '${wiredfurni.params.variable_leaderboard.filter.enabled}',
                        selected: form.filterEnabled,
                        disabled: filterDisabled.filter,
                        extraUnder: (
                            <WiredSimpleList>
                                <WiredChooseVariableSection
                                    title="${wiredfurni.params.variable_leaderboard.filter.variable}"
                                    filter={isLeaderboardFilterVariable}
                                    state={form.filterPicker}
                                    onChange={(filterPicker, variable) => setForm(current => selectLeaderboardFilterVariable(current, filterPicker, variable))}
                                    variables={variables}
                                    roomId={ctx.roomId}
                                />
                                <WiredCheckboxGroup
                                    options={[ {
                                        label: '${wiredfurni.params.variable_leaderboard.filter.compare}',
                                        selected: form.comparisonEnabled,
                                        disabled: filterDisabled.comparison,
                                        extraUnder: (
                                            <WiredValueOrVariableSection
                                                title={null}
                                                mergedId={0}
                                                sourceTypeOptions={[ Number(VariableExtraSourceTypes.GLOBAL_SOURCE) ]}
                                                min={WIRED_INT_MIN}
                                                max={WIRED_INT_MAX}
                                                state={form.operand}
                                                onChange={operand => setForm({ operand })}
                                                onSourceTypeSelect={sourceType => setWiredMergedSourceType(0, sourceType)}
                                                variables={variables}
                                                roomId={ctx.roomId}
                                            />
                                        ),
                                    } ]}
                                    onToggle={(_, comparisonEnabled) => setForm({ comparisonEnabled })}
                                />
                            </WiredSimpleList>
                        ),
                    } ]}
                    onToggle={(_, filterEnabled) => setForm(current => ({ ...current, filterEnabled, comparisonEnabled: filterEnabled && current.comparisonEnabled }))}
                />
            </WiredSection>
            <WiredSection title="${wiredfurni.params.variable_leaderboard.section.location}">
                <WiredSimpleList>
                    <WiredText
                        text={active ? (published ? '${wiredfurni.params.variable_leaderboard.location.drag_published}' : '${wiredfurni.params.variable_leaderboard.location.drag_status}') : '${wiredfurni.params.variable_leaderboard.location.unavailable}'}
                        color={style.softTextColor}
                        disabled={!active}
                    />
                    <WiredSimpleList
                        vertical={false}
                        centerVertically
                        spacing={style.genericVerticalSpacing - 1}
                    >
                        <WiredText
                            text="${wiredfurni.params.variable_leaderboard.location.tile}"
                            wrap={false}
                            disabled={!active}
                        />
                        <WiredNumberInput
                            value={form.location.tileX}
                            onChange={tileX => setLocation({ tileX })}
                            min={WIRED_INT_MIN}
                            max={WIRED_INT_MAX}
                            width={COORDINATE_INPUT_WIDTH}
                            disabled={!active}
                        />
                        <WiredText
                            text="-"
                            wrap={false}
                            disabled={!active}
                        />
                        <WiredNumberInput
                            value={form.location.tileY}
                            onChange={tileY => setLocation({ tileY })}
                            min={WIRED_INT_MIN}
                            max={WIRED_INT_MAX}
                            width={COORDINATE_INPUT_WIDTH}
                            disabled={!active}
                        />
                        <WiredSpacer height={0} />
                        <WiredText
                            text="${wiredfurni.params.variable_leaderboard.location.offset}"
                            wrap={false}
                            disabled={!active}
                        />
                        <WiredNumberInput
                            value={form.location.offsetX}
                            onChange={offsetX => setLocation({ offsetX })}
                            min={VARIABLE_LEADERBOARD_MIN_OFFSET_X}
                            max={VARIABLE_LEADERBOARD_MAX_OFFSET_X}
                            width={COORDINATE_INPUT_WIDTH}
                            disabled={!active}
                        />
                        <WiredText
                            text="-"
                            wrap={false}
                            disabled={!active}
                        />
                        <WiredNumberInput
                            value={form.location.altitude}
                            onChange={altitude => setLocation({ altitude })}
                            min={WIRED_INT_MIN}
                            max={WIRED_INT_MAX}
                            width={COORDINATE_INPUT_WIDTH}
                            disabled={!active}
                        />
                    </WiredSimpleList>
                </WiredSimpleList>
            </WiredSection>
        </>
    );
};
