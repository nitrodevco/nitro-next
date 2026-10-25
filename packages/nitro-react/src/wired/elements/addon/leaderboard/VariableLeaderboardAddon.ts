/**
 * `addons/leaderboard/VariableLeaderboardAddon` (VARIABLE_LEADERBOARD, WIN63-202610131318) - the
 * Leaderboard add-on: a leaderboard of the stack's persisted user variables drawn in the room.
 * Its editor has five sections (`buildInputs`): General (title, description, sorting, page size),
 * Columns (`VariableLeaderboardColumnsPreset`), Multi-variable mode (display names,
 * `VariableLeaderboardMultiVariablePreset`), Filter and Leaderboard location
 * (`VariableLeaderboardLocationPreset`). The box's context (`wiredContext.variableLeaderboardContext`)
 * names the stacked variables and the box's own tile, where a box that was never saved puts its
 * leaderboard (`onEditStart`).
 *
 * The form holds what the widgets hold; the config the codec writes is derived from it
 * (`leaderboardConfigFromForm`, Flash's `_config` kept in step by the change callbacks and
 * `syncFilterFromForm`). While the editor is open the leaderboard's location is edited in the
 * room - see `views/wired-setup/elements/addon/VariableLeaderboardAddonView`.
 */
import type { IVariableLeaderboardContext, IWiredVariable } from '@nitrodevco/nitro-packets';
import { isWiredVariablePersisted, VariableExtraSourceTypes, WiredVariableTarget } from '@nitrodevco/nitro-packets';

import { WIRED_INT_MAX, WIRED_INT_MIN } from '../../../common/numberInput';
import { createVariablePickerState, finalizePickerSelection, getPickerSelectedVariable, type WiredVariablePickerState } from '../../../common/WiredVariablePickerModel';
import { createValueOrVariableState, VALUE_OR_VARIABLE_OPTION_VARIABLE, type WiredValueOrVariableState } from '../../../common/WiredVariableSections';
import type { WiredElementContext, WiredElementDefinition } from '../../../WiredElement';
import { getWiredRoomVariables } from '../../../WiredTriggerable';
import { AddonCodes } from '../addonCodes';
import {
    canonicalLeaderboardVariableId,
    createLeaderboardColumn,
    createUnpublishedLeaderboardConfig,
    decodeLeaderboardConfig,
    type EncodedVariableLeaderboardConfig,
    encodeLeaderboardConfig,
    isLeaderboardNullVariableId,
    leaderboardColumnDefaultWidth,
    leaderboardDefaultColumnLabel,
    suggestLeaderboardDisplayName,
    VARIABLE_LEADERBOARD_COLUMN_CREATION,
    VARIABLE_LEADERBOARD_COLUMN_LAST_UPDATE,
    VARIABLE_LEADERBOARD_COLUMN_LEVEL,
    VARIABLE_LEADERBOARD_COLUMN_TEXT,
    VARIABLE_LEADERBOARD_COLUMN_USERNAME,
    VARIABLE_LEADERBOARD_COLUMN_VALUE,
    VARIABLE_LEADERBOARD_MAX_DISPLAY_OVERRIDES,
    VARIABLE_LEADERBOARD_MIN_COLUMN_LABEL_LENGTH,
    VARIABLE_LEADERBOARD_OPERAND_GLOBAL,
    VARIABLE_LEADERBOARD_OPERAND_LITERAL,
    type VariableLeaderboardConfig,
    type VariableLeaderboardConfigColumn,
    type VariableLeaderboardLocation,
} from './VariableLeaderboardConfig';

/** `VariableLeaderboardColumnsPreset.columnTypeOptions` for every row but the first, in this order. */
export const VARIABLE_LEADERBOARD_OTHER_COLUMN_TYPES = [ VARIABLE_LEADERBOARD_COLUMN_VALUE, VARIABLE_LEADERBOARD_COLUMN_TEXT, VARIABLE_LEADERBOARD_COLUMN_LAST_UPDATE, VARIABLE_LEADERBOARD_COLUMN_CREATION, VARIABLE_LEADERBOARD_COLUMN_LEVEL ];

/** `VariableLeaderboardColumnsPreset.columnTypeLabel`. */
export const leaderboardColumnTypeLabel = (type: number): string => {
    switch (type) {
        case VARIABLE_LEADERBOARD_COLUMN_USERNAME: return '${wiredfurni.params.variable_leaderboard.column.username}';
        case VARIABLE_LEADERBOARD_COLUMN_VALUE: return '${wiredfurni.params.variable_leaderboard.column.value}';
        case VARIABLE_LEADERBOARD_COLUMN_LAST_UPDATE: return '${wiredfurni.params.variable_leaderboard.column.last_update}';
        case VARIABLE_LEADERBOARD_COLUMN_CREATION: return '${wiredfurni.params.variable_leaderboard.column.creation}';
        case VARIABLE_LEADERBOARD_COLUMN_LEVEL: return '${wiredfurni.params.variable_leaderboard.column.level}';
        case VARIABLE_LEADERBOARD_COLUMN_TEXT: return '${wiredfurni.params.variable_leaderboard.column.text_connection}';
        default: return String(type);
    }
};

/** `VariableLeaderboardColumnRowPreset.widthOptions`. */
export const VARIABLE_LEADERBOARD_WIDTH_LABELS = [ 'small', 'medium', 'large', 'xl' ].map(name => `\${wiredfurni.params.variable_leaderboard.column_width.${name}}`);

/** One display name row of the multi-variable section (`activateRow`). */
export interface VariableLeaderboardDisplayNameRow {
    variableId: string;
    technicalName: string;
    /** `_suggestions[i]` - `VariableLeaderboardDisplayNameFormatter.suggest(technicalName)`. */
    suggestion: string;
    /** The text input's text. */
    text: string;
}

export interface VariableLeaderboardAddonForm {
    /** `_context` - null when the box came without one. */
    context: IVariableLeaderboardContext | null;
    /** `§_-C§` - the params could not be read; nothing can be saved. */
    invalid: boolean;
    /** `§_-h2c§` - a persisted stacked variable has a value: value columns and value sorting are offered. */
    hasValueChoice: boolean;
    /** `§_-q1u§` - no persisted user variable on the stack. */
    noPersistentUser: boolean;
    /** `§_-i11§` - more than 10 candidate variables. */
    tooManyChoices: boolean;
    title: string;
    description: string;
    /** The active column rows (`VariableLeaderboardColumnsPreset.columns`). */
    columns: VariableLeaderboardConfigColumn[];
    sortMode: number;
    pageSizeOption: number;
    filterEnabled: boolean;
    /** The filtering variable's picker (`§_-W2x§`, user variables). */
    filterPicker: WiredVariablePickerState;
    /** The saved filter variable, kept when the picker no longer offers it (`syncFilterFromForm`). */
    savedFilterVariableId: string;
    comparisonEnabled: boolean;
    /** The comparison operand (`§_-5o§`): a literal or a global variable. */
    operand: WiredValueOrVariableState;
    displayNames: VariableLeaderboardDisplayNameRow[];
    location: VariableLeaderboardLocation;
}

/** `isEligibleFilterVariable`: a persisted user variable usable outside a running stack. */
export const isLeaderboardFilterVariable = (variable: IWiredVariable): boolean =>
    (variable.variableTarget === WiredVariableTarget.User) && isWiredVariablePersisted(variable.availabilityType) && !variable.requiresExecutionContext;

/** `hasEligibleFilterVariable`. */
export const hasLeaderboardFilterVariable = (variables: readonly IWiredVariable[]): boolean => variables.some(isLeaderboardFilterVariable);

/** `published`. */
export const isLeaderboardPublished = (context: IVariableLeaderboardContext | null): boolean => (!!context && (context.overlayInstanceId > 0));

/** `VariableLeaderboardMultiVariablePreset.displayOverrides`: the names typed that differ from the suggestion. */
export const leaderboardDisplayOverrides = (rows: readonly VariableLeaderboardDisplayNameRow[]): Record<string, string> => {
    const overrides: Record<string, string> = {};

    for (const row of rows) {
        if (row.text.length && (row.text !== row.suggestion)) overrides[row.variableId] = row.text;
    }

    return overrides;
};

/**
 * `syncFilterFromForm` + the change callbacks: the config the widgets describe. A disabled filter
 * or comparison carries nothing; an empty picker keeps the saved filtering variable.
 */
export const leaderboardConfigFromForm = (form: VariableLeaderboardAddonForm, variables: readonly IWiredVariable[]): VariableLeaderboardConfig => {
    const config: VariableLeaderboardConfig = {
        ...createUnpublishedLeaderboardConfig(),
        title: form.title,
        description: form.description,
        columns: form.columns,
        sortMode: form.sortMode,
        pageSizeOption: form.pageSizeOption,
        displayOverrides: leaderboardDisplayOverrides(form.displayNames),
        location: form.location,
    };

    if (!form.filterEnabled) return config;

    let filterVariableId = finalizePickerSelection(variables, form.filterPicker);

    if (isLeaderboardNullVariableId(filterVariableId) && !isLeaderboardNullVariableId(form.savedFilterVariableId)) filterVariableId = form.savedFilterVariableId;

    filterVariableId = canonicalLeaderboardVariableId(filterVariableId);

    if (!form.comparisonEnabled) return { ...config, filterEnabled: true, filterVariableId };

    if (form.operand.option === VALUE_OR_VARIABLE_OPTION_VARIABLE) {
        return { ...config, filterEnabled: true, filterVariableId, comparisonEnabled: true, operandKind: VARIABLE_LEADERBOARD_OPERAND_GLOBAL, globalOperandVariableId: canonicalLeaderboardVariableId(finalizePickerSelection(variables, form.operand.picker)) };
    }

    return { ...config, filterEnabled: true, filterVariableId, comparisonEnabled: true, operandKind: VARIABLE_LEADERBOARD_OPERAND_LITERAL, literal: String(form.operand.value) };
};

/** `currentEncodedConfig`: nothing for an unreadable box or one without its context. */
export const encodeLeaderboardForm = (form: VariableLeaderboardAddonForm, variables: readonly IWiredVariable[]): EncodedVariableLeaderboardConfig | null =>
    ((form.invalid || !form.context) ? null : encodeLeaderboardConfig(leaderboardConfigFromForm(form, variables)));

/** `sortOptions`: the value sorts only with a value to sort by, or when already chosen. */
export const leaderboardSortOptions = (form: VariableLeaderboardAddonForm): number[] => {
    const ids: number[] = [];

    if (form.hasValueChoice || (form.sortMode === 0)) ids.push(0);
    if (form.hasValueChoice || (form.sortMode === 1)) ids.push(1);

    return [ ...ids, 2, 3, 4, 5 ];
};

/** `refreshGeneralWarning`. */
export const leaderboardGeneralWarning = (form: VariableLeaderboardAddonForm): string => {
    if (form.invalid) return '${wiredfurni.params.variable_leaderboard.warning.invalid_configuration}';
    if (!form.context) return '${wiredfurni.params.variable_leaderboard.warning.missing_context}';
    if (form.noPersistentUser) return '${wiredfurni.params.variable_leaderboard.warning.no_persistent_user}';
    if (form.tooManyChoices) return '${wiredfurni.params.variable_leaderboard.warning.too_many_choices}';

    return '';
};

/** `VariableLeaderboardColumnsPreset.columnTypeInfo.visible` - a Level or Text column needs other add-ons. */
export const leaderboardNeedsColumnTypeInfo = (columns: readonly VariableLeaderboardConfigColumn[]): boolean =>
    columns.some(column => ((column.type === VARIABLE_LEADERBOARD_COLUMN_TEXT) || (column.type === VARIABLE_LEADERBOARD_COLUMN_LEVEL)));

/** `defaultColumnFor(index)`: Username first, then the first type no earlier row uses. */
const defaultLeaderboardColumn = (columns: readonly VariableLeaderboardConfigColumn[], index: number): VariableLeaderboardConfigColumn => {
    if (index === 0) return createLeaderboardColumn(VARIABLE_LEADERBOARD_COLUMN_USERNAME);

    for (const type of VARIABLE_LEADERBOARD_OTHER_COLUMN_TYPES) {
        if (!columns.slice(0, index).some(column => (column.type === type))) return createLeaderboardColumn(type);
    }

    return createLeaderboardColumn(VARIABLE_LEADERBOARD_COLUMN_LAST_UPDATE);
};

/** `onCountChanged`: the rows between the old and the new count start from their defaults. */
export const setLeaderboardColumnCount = (columns: readonly VariableLeaderboardConfigColumn[], count: number): VariableLeaderboardConfigColumn[] => {
    const next = columns.slice(0, Math.min(columns.length, count));

    while (next.length < count) next.push(defaultLeaderboardColumn(next, next.length));

    return next;
};

/**
 * `onRowChanged`: a new type replaces the label and the width that were its old type's defaults
 * (`_lastTypes`); other edits are taken as they are.
 */
export const changeLeaderboardColumn = (columns: readonly VariableLeaderboardConfigColumn[], index: number, patch: Partial<VariableLeaderboardConfigColumn>): VariableLeaderboardConfigColumn[] => {
    const previous = columns[index];
    let column = { ...previous, ...patch };

    if ((patch.type !== undefined) && (patch.type !== previous.type)) {
        if (column.label === leaderboardDefaultColumnLabel(previous.type)) column = { ...column, label: leaderboardDefaultColumnLabel(column.type) };
        if (column.width === leaderboardColumnDefaultWidth(previous.type)) column = { ...column, width: leaderboardColumnDefaultWidth(column.type) };
    }

    return columns.with(index, column);
};

/** `onFilterVariableChanged`: a filtering variable without a value cannot be compared. */
export const selectLeaderboardFilterVariable = (form: VariableLeaderboardAddonForm, filterPicker: WiredVariablePickerState, variable: IWiredVariable | null): VariableLeaderboardAddonForm =>
    ({ ...form, filterPicker, comparisonEnabled: form.comparisonEnabled && !!variable?.hasValue });

/** `refreshFilterState`: the two checkboxes' disabled states. */
export const leaderboardFilterDisabled = (form: VariableLeaderboardAddonForm, variables: readonly IWiredVariable[]) => ({
    filter: !form.filterEnabled && !hasLeaderboardFilterVariable(variables),
    comparison: !form.filterEnabled || (!form.comparisonEnabled && !getPickerSelectedVariable(variables, form.filterPicker)?.hasValue),
});

/** `onSuggest`: every name back to its suggestion. */
export const suggestLeaderboardDisplayNames = (rows: readonly VariableLeaderboardDisplayNameRow[]): VariableLeaderboardDisplayNameRow[] => rows.map(row => ({ ...row, text: row.suggestion }));

/** `literalValueForForm`: the literal as the number input's int; null when it does not fit (an invalid box). */
const literalValueForForm = (literal: string): number | null => {
    if (!literal.length) return 0;

    const value = Number(literal);

    if ((value < WIRED_INT_MIN) || (value > WIRED_INT_MAX)) return null;

    return Math.trunc(value);
};

/** `localizedError`: the hotel text, or Flash's English fallback when the hotel has none. */
const localizedError = (ctx: WiredElementContext, key: string, fallback: string): string => {
    const text = ctx.localize(key);

    return ((text === key) || !text) ? fallback : text;
};

export const variableLeaderboardAddon: WiredElementDefinition<VariableLeaderboardAddonForm> = {
    holder: 'addon',
    code: AddonCodes.VARIABLE_LEADERBOARD,
    createForm: (triggerable) => {
        const context = triggerable.wiredContext.variableLeaderboardContext ?? null;
        const variables = getWiredRoomVariables(triggerable);
        let config = decodeLeaderboardConfig(triggerable.intParams, triggerable.variableIds, triggerable.stringParam);

        if (config && context && !triggerable.stringParam.length) config = { ...config, location: { tileX: context.physicalTileX, tileY: context.physicalTileY, offsetX: 0, altitude: 0 } };

        let invalid = !config;
        const shown = config ?? createUnpublishedLeaderboardConfig();
        // `updateCapabilities`.
        const persisted = (context?.choices ?? []).filter(choice => choice.persistent);
        const literal = literalValueForForm(shown.literal);

        if (literal === null) invalid = true;

        const displayNames = (context?.choices ?? []).slice(0, VARIABLE_LEADERBOARD_MAX_DISPLAY_OVERRIDES).map((choice): VariableLeaderboardDisplayNameRow => {
            const suggestion = suggestLeaderboardDisplayName(choice.technicalName);
            const override = shown.displayOverrides[choice.variableId];

            return { variableId: choice.variableId, technicalName: choice.technicalName, suggestion, text: override?.length ? override : suggestion };
        });

        return {
            context,
            invalid,
            hasValueChoice: persisted.some(choice => choice.hasValue),
            noPersistentUser: !!context && !persisted.length,
            tooManyChoices: !!context && (context.totalCandidateCount > VARIABLE_LEADERBOARD_MAX_DISPLAY_OVERRIDES),
            title: shown.title,
            description: shown.description,
            columns: shown.columns,
            sortMode: shown.sortMode,
            pageSizeOption: shown.pageSizeOption,
            filterEnabled: shown.filterEnabled,
            filterPicker: createVariablePickerState(variables, shown.filterVariableId, WiredVariableTarget.User),
            savedFilterVariableId: shown.filterVariableId,
            comparisonEnabled: shown.comparisonEnabled,
            operand: createValueOrVariableState(variables, shown.globalOperandVariableId, Number(VariableExtraSourceTypes.GLOBAL_SOURCE), (shown.operandKind === VARIABLE_LEADERBOARD_OPERAND_GLOBAL) ? 1 : 0, literal ?? 0),
            displayNames,
            location: shown.location,
        };
    },
    readIntParams: (form, ctx) => [ ...(encodeLeaderboardForm(form, ctx.roomVariables)?.intParams ?? []) ],
    readVariableIds: (form, ctx) => [ ...(encodeLeaderboardForm(form, ctx.roomVariables)?.variableIds ?? []) ],
    readStringParam: (form, ctx) => encodeLeaderboardForm(form, ctx.roomVariables)?.stringParam ?? '',
    validate: (form, ctx) => {
        const invalidMessage = () => localizedError(ctx, 'wiredfurni.error.variable_leaderboard.invalid_configuration', 'Invalid leaderboard configuration.');

        if (form.invalid) return invalidMessage();
        if (!form.context) return localizedError(ctx, 'wiredfurni.error.variable_leaderboard.missing_context', 'Leaderboard information is unavailable. Close and reopen this Wired box.');

        const config = leaderboardConfigFromForm(form, ctx.roomVariables);

        if (config.title.length < 1) return localizedError(ctx, 'wiredfurni.error.variable_leaderboard.title_required', 'Enter a leaderboard title.');
        if (config.columns.some(column => (column.label.length < VARIABLE_LEADERBOARD_MIN_COLUMN_LABEL_LENGTH))) return localizedError(ctx, 'wiredfurni.error.variable_leaderboard.column_name_length', 'Column names must contain at least two characters.');
        if (config.filterEnabled && isLeaderboardNullVariableId(config.filterVariableId)) return localizedError(ctx, 'wiredfurni.error.variable_leaderboard.filter_required', 'Select a filtering variable.');
        if (config.comparisonEnabled && (config.operandKind === VARIABLE_LEADERBOARD_OPERAND_GLOBAL) && isLeaderboardNullVariableId(config.globalOperandVariableId)) return localizedError(ctx, 'wiredfurni.error.variable_leaderboard.global_operand_required', 'Select a global comparison variable.');

        return encodeLeaderboardConfig(config) ? null : invalidMessage();
    },
    widthModifier: 1.35,
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.variables_reference',
    mergedSelections: [ [ 0, 0 ] ],
    getMergedType: () => Number(VariableExtraSourceTypes.GLOBAL_SOURCE),
    setMergedType: form => form,
    getCustomSourcesForMergedType: () => [ Number(VariableExtraSourceTypes.GLOBAL_SOURCE) ],
    hasCustomTypePicker: () => true,
    forceHidePickFurniInstructions: true,
};
