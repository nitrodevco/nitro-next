/**
 * A Leaderboard add-on's settings and how its box stores them - Flash
 * `wired_setup/addons/leaderboard/VariableLeaderboardConfig` and `VariableLeaderboardConfigCodec`
 * (WIN63-202610131318), the column record `variableleaderboard/§_-g1H§` and
 * `VariableLeaderboardDisplayNameFormatter`.
 *
 * 19 int params: [0] sort mode, [1] column count, [2..5] column types (-1 unused), [6] filter on,
 * [7] comparison on, [8] operand kind, [9] display name count, [10..13] tile x, tile y, x offset,
 * altitude, [14..17] column widths, [18] page size option. 12 variable ids: [0] filter variable,
 * [1] global operand, [2..11] the variables with a display name. One string of 17 tab-separated
 * fields: title, description, 4 column names, the literal, 10 display names. An empty string is a
 * box that was never saved (`decodeUnpublished`).
 *
 * The official client saves a new two-column leaderboard on tile 10, 4 as int params
 * `[0,2,0,1,-1,-1,0,0,0,0,10,4,0,0,3,0,0,0,0]`, twelve `"0"` variable ids and
 * `"HP\tTest Descript\tUsername\tValue"` + 13 empty fields (official client capture, WIN63-202610131318).
 *
 * Flash throws an `ArgumentError` for a config it cannot read or write; here the codec returns null.
 */
import { VARIABLE_LEADERBOARD_PAGE_SIZES } from '@nitrodevco/nitro-packets';

import { fitsWiredParamStorage, utf8Length } from '../../../common/wiredStorageLength';

/** `location` (`variableleaderboard/location`): where a leaderboard stands in the room. */
export interface VariableLeaderboardLocation {
    tileX: number;
    tileY: number;
    /** Room pixels right of the tile centre, -32..32. */
    offsetX: number;
    /** Room pixels above the floor. */
    altitude: number;
}

/** `§_-g1H§`: one column - type, header name and width option. */
export interface VariableLeaderboardConfigColumn {
    type: number;
    label: string;
    width: number;
}

export interface VariableLeaderboardConfig {
    title: string;
    description: string;
    columns: VariableLeaderboardConfigColumn[];
    sortMode: number;
    pageSizeOption: number;
    filterEnabled: boolean;
    filterVariableId: string;
    comparisonEnabled: boolean;
    operandKind: number;
    globalOperandVariableId: string;
    literal: string;
    /** Display names by variable id (`_displayOverrides`). */
    displayOverrides: Readonly<Record<string, string>>;
    location: VariableLeaderboardLocation;
}

export const VARIABLE_LEADERBOARD_COLUMN_USERNAME = 0;
export const VARIABLE_LEADERBOARD_COLUMN_VALUE = 1;
export const VARIABLE_LEADERBOARD_COLUMN_LAST_UPDATE = 2;
export const VARIABLE_LEADERBOARD_COLUMN_CREATION = 3;
export const VARIABLE_LEADERBOARD_COLUMN_LEVEL = 4;
export const VARIABLE_LEADERBOARD_COLUMN_TEXT = 5;

/** `VariableLeaderboardConfig.OPERAND_LITERAL` / `§_-02P§`. */
export const VARIABLE_LEADERBOARD_OPERAND_LITERAL = 0;
export const VARIABLE_LEADERBOARD_OPERAND_GLOBAL = 1;

/** `VariableLeaderboardConfigCodec`'s limits. */
export const VARIABLE_LEADERBOARD_MAX_COLUMNS = 4;
export const VARIABLE_LEADERBOARD_MAX_DISPLAY_OVERRIDES = 10;
export const VARIABLE_LEADERBOARD_MAX_TITLE_LENGTH = 50;
export const VARIABLE_LEADERBOARD_MAX_DESCRIPTION_LENGTH = 80;
export const VARIABLE_LEADERBOARD_MIN_COLUMN_LABEL_LENGTH = 2;
export const VARIABLE_LEADERBOARD_MAX_COLUMN_LABEL_LENGTH = 12;
export const VARIABLE_LEADERBOARD_MAX_OVERRIDE_LENGTH = 22;
export const VARIABLE_LEADERBOARD_MIN_OFFSET_X = -32;
export const VARIABLE_LEADERBOARD_MAX_OFFSET_X = 32;

const INT_PARAM_COUNT_MIN = 14;
const VARIABLE_ID_COUNT = 12;
const STRING_FIELD_COUNT = 17;
const COLUMN_WIDTH_PARAM_OFFSET = 14;
const MAX_STRING_PARAM_UTF8_LENGTH = 1000;
const MAX_SIGNED_LONG = '9223372036854775807';
const MIN_SIGNED_LONG_MAGNITUDE = '9223372036854775808';

/** `NULL_VARIABLE_ID`. */
export const VARIABLE_LEADERBOARD_NULL_VARIABLE_ID = '0';

/** `isNullVariableId`: `"0"`, `WiredVariable.§_-I2U§` (`"n"`), or nothing. */
export const isLeaderboardNullVariableId = (id: string | null | undefined): boolean => (!id || (id === '0') || (id === 'n'));

/** `canonicalizeNullVariableId`. */
export const canonicalLeaderboardVariableId = (id: string | null | undefined): string => (isLeaderboardNullVariableId(id) ? VARIABLE_LEADERBOARD_NULL_VARIABLE_ID : id!);

/** `§_-g1H§.defaultWidth`: Username XL, the times medium, Text large, the rest small. */
export const leaderboardColumnDefaultWidth = (type: number): number => {
    switch (type) {
        case VARIABLE_LEADERBOARD_COLUMN_USERNAME: return 3;
        case VARIABLE_LEADERBOARD_COLUMN_LAST_UPDATE:
        case VARIABLE_LEADERBOARD_COLUMN_CREATION: return 1;
        case VARIABLE_LEADERBOARD_COLUMN_TEXT: return 2;
        default: return 0;
    }
};

/** `§_-g1H§.isValidWidth`. */
const isValidColumnWidth = (width: number): boolean => ((width === 0) || (width === 1) || (width === 2) || (width === 3));

/** `VariableLeaderboardColumnsPreset.defaultColumnLabel`. */
export const leaderboardDefaultColumnLabel = (type: number): string => {
    switch (type) {
        case VARIABLE_LEADERBOARD_COLUMN_USERNAME: return 'Username';
        case VARIABLE_LEADERBOARD_COLUMN_VALUE: return 'Value';
        case VARIABLE_LEADERBOARD_COLUMN_LAST_UPDATE: return 'Last update';
        case VARIABLE_LEADERBOARD_COLUMN_CREATION: return 'Creation';
        case VARIABLE_LEADERBOARD_COLUMN_LEVEL: return 'Level';
        case VARIABLE_LEADERBOARD_COLUMN_TEXT: return 'Text';
        default: return 'Column';
    }
};

/** A column of `type` with its default name and width. */
export const createLeaderboardColumn = (type: number): VariableLeaderboardConfigColumn => ({ type, label: leaderboardDefaultColumnLabel(type), width: leaderboardColumnDefaultWidth(type) });

/** `VariableLeaderboardDisplayNameFormatter.suggest`: `"best_score-2"` is `"Best Score 2"`. */
export const suggestLeaderboardDisplayName = (technicalName: string | null | undefined): string => {
    if (!technicalName) return 'Variable';

    const words = technicalName.replace(/[_-]+/g, ' ').split(/\s+/).filter(word => (word.length > 0)).map((word) => {
        const lower = word.toLowerCase();

        return lower.charAt(0).toUpperCase() + lower.substring(1);
    });

    return words.length ? words.join(' ') : 'Variable';
};

/** `decodeUnpublished` / the add-on's `fallbackConfig`. */
export const createUnpublishedLeaderboardConfig = (): VariableLeaderboardConfig => ({
    title: '',
    description: '',
    columns: [ VARIABLE_LEADERBOARD_COLUMN_USERNAME, VARIABLE_LEADERBOARD_COLUMN_VALUE ].map(createLeaderboardColumn),
    sortMode: 0,
    pageSizeOption: 0,
    filterEnabled: false,
    filterVariableId: VARIABLE_LEADERBOARD_NULL_VARIABLE_ID,
    comparisonEnabled: false,
    operandKind: VARIABLE_LEADERBOARD_OPERAND_LITERAL,
    globalOperandVariableId: VARIABLE_LEADERBOARD_NULL_VARIABLE_ID,
    literal: '',
    displayOverrides: {},
    location: { tileX: 0, tileY: 0, offsetX: 0, altitude: 0 },
});

export const sameLeaderboardLocation = (a: VariableLeaderboardLocation, b: VariableLeaderboardLocation): boolean =>
    (a.tileX === b.tileX) && (a.tileY === b.tileY) && (a.offsetX === b.offsetX) && (a.altitude === b.altitude);

const sameDisplayOverrides = (a: Readonly<Record<string, string>>, b: Readonly<Record<string, string>>): boolean => {
    const keys = Object.keys(a);

    return (keys.length === Object.keys(b).length) && keys.every(key => (a[key] === b[key]));
};

/** Whether two configs hold the same settings - an editor sending back the draft it was given changes nothing. */
export const sameLeaderboardConfig = (a: VariableLeaderboardConfig, b: VariableLeaderboardConfig): boolean => (a === b) || (
    (a.title === b.title)
    && (a.description === b.description)
    && (a.sortMode === b.sortMode)
    && (a.pageSizeOption === b.pageSizeOption)
    && (a.filterEnabled === b.filterEnabled)
    && (a.filterVariableId === b.filterVariableId)
    && (a.comparisonEnabled === b.comparisonEnabled)
    && (a.operandKind === b.operandKind)
    && (a.globalOperandVariableId === b.globalOperandVariableId)
    && (a.literal === b.literal)
    && (a.columns.length === b.columns.length)
    && a.columns.every((column, i) => (column.type === b.columns[i].type) && (column.label === b.columns[i].label) && (column.width === b.columns[i].width))
    && sameDisplayOverrides(a.displayOverrides, b.displayOverrides)
    && sameLeaderboardLocation(a.location, b.location)
);

/** `displayOverrideIds`: sorted as strings (`compareSerializedIds`). */
export const leaderboardDisplayOverrideIds = (config: VariableLeaderboardConfig): string[] => Object.keys(config.displayOverrides).sort((a, b) => ((a < b) ? -1 : ((a > b) ? 1 : 0)));

const hasLength = (value: string | null | undefined, min: number, max: number): boolean => ((value !== null) && (value !== undefined) && (value.length >= min) && (value.length <= max));

const isValidSortMode = (sortMode: number): boolean => (Number.isInteger(sortMode) && (sortMode >= 0) && (sortMode <= 5));

/** `validateColumnType`: -1 (unused) to 5. */
const isValidColumnType = (type: number): boolean => (Number.isInteger(type) && (type >= -1) && (type <= 5));

const isValidOperandKind = (kind: number): boolean => ((kind === VARIABLE_LEADERBOARD_OPERAND_LITERAL) || (kind === VARIABLE_LEADERBOARD_OPERAND_GLOBAL));

const isPopulatedVariableId = (id: string): boolean => ((id !== null) && (id.length > 0) && !isLeaderboardNullVariableId(id));

/** `isCanonicalUnsignedDecimal`. */
const isCanonicalUnsignedDecimal = (value: string): boolean => ((value.length > 0) && !((value.length > 1) && (value.charAt(0) === '0')) && /^[0-9]+$/.test(value));

/** `isCanonicalSignedLong`: a decimal without leading zeros, `-0` or a sign alone, within a signed 64-bit long. */
export const isCanonicalSignedLong = (value: string): boolean => {
    if (!value) return false;

    const negative = (value.charAt(0) === '-');
    const digits = negative ? value.substring(1) : value;

    if (!isCanonicalUnsignedDecimal(digits) || (negative && (digits === '0'))) return false;

    const limit = negative ? MIN_SIGNED_LONG_MAGNITUDE : MAX_SIGNED_LONG;

    if (digits.length !== limit.length) return (digits.length < limit.length);

    return (digits <= limit);
};

/** `validateConditionalFields`: a disabled filter or comparison carries nothing. */
const hasCanonicalConditionalFields = (config: VariableLeaderboardConfig): boolean => {
    if (!config.filterEnabled) return isLeaderboardNullVariableId(config.filterVariableId) && isLeaderboardNullVariableId(config.globalOperandVariableId) && !config.comparisonEnabled && (config.operandKind === VARIABLE_LEADERBOARD_OPERAND_LITERAL) && (config.literal.length === 0);

    if (!isPopulatedVariableId(config.filterVariableId)) return false;

    if (!config.comparisonEnabled) return isLeaderboardNullVariableId(config.globalOperandVariableId) && (config.operandKind === VARIABLE_LEADERBOARD_OPERAND_LITERAL) && (config.literal.length === 0);

    if (config.operandKind === VARIABLE_LEADERBOARD_OPERAND_LITERAL) return isLeaderboardNullVariableId(config.globalOperandVariableId) && isCanonicalSignedLong(config.literal);

    return isPopulatedVariableId(config.globalOperandVariableId) && (config.literal.length === 0);
};

/** `VariableLeaderboardConfigCodec.validate`: whether `encode` accepts the config. */
export const isValidLeaderboardConfig = (config: VariableLeaderboardConfig): boolean => {
    if (!hasLength(config.title, 1, VARIABLE_LEADERBOARD_MAX_TITLE_LENGTH)) return false;
    if (!hasLength(config.description, 0, VARIABLE_LEADERBOARD_MAX_DESCRIPTION_LENGTH)) return false;
    if (!isValidSortMode(config.sortMode)) return false;
    if ((config.pageSizeOption < 0) || (config.pageSizeOption >= VARIABLE_LEADERBOARD_PAGE_SIZES.length)) return false;
    if (!isValidOperandKind(config.operandKind)) return false;

    const columns = config.columns;

    if ((columns.length < 1) || (columns.length > VARIABLE_LEADERBOARD_MAX_COLUMNS)) return false;
    if (columns[0].type !== VARIABLE_LEADERBOARD_COLUMN_USERNAME) return false;

    const seen = new Set<number>();

    for (const column of columns) {
        if (!isValidColumnType(column.type) || (column.type === -1) || seen.has(column.type)) return false;

        seen.add(column.type);

        if (!hasLength(column.label, VARIABLE_LEADERBOARD_MIN_COLUMN_LABEL_LENGTH, VARIABLE_LEADERBOARD_MAX_COLUMN_LABEL_LENGTH)) return false;
        if (!isValidColumnWidth(column.width)) return false;
    }

    if (!hasCanonicalConditionalFields(config)) return false;

    const overrideIds = leaderboardDisplayOverrideIds(config);

    if (overrideIds.length > VARIABLE_LEADERBOARD_MAX_DISPLAY_OVERRIDES) return false;

    for (const id of overrideIds) {
        if (isLeaderboardNullVariableId(id) || !hasLength(config.displayOverrides[id], 1, VARIABLE_LEADERBOARD_MAX_OVERRIDE_LENGTH)) return false;
    }

    return (config.location.offsetX >= VARIABLE_LEADERBOARD_MIN_OFFSET_X) && (config.location.offsetX <= VARIABLE_LEADERBOARD_MAX_OFFSET_X);
};

/** `validateStorageLengths`. */
const fitsStorage = (intParams: readonly number[], variableIds: readonly string[], stringParam: string): boolean =>
    fitsWiredParamStorage(intParams, variableIds) && (utf8Length(stringParam) <= MAX_STRING_PARAM_UTF8_LENGTH);

export interface EncodedVariableLeaderboardConfig {
    intParams: number[];
    variableIds: string[];
    stringParam: string;
}

/** `VariableLeaderboardConfigCodec.encode`; null for a config `validate` or the storage limits refuse. */
export const encodeLeaderboardConfig = (config: VariableLeaderboardConfig): EncodedVariableLeaderboardConfig | null => {
    if (!isValidLeaderboardConfig(config)) return null;

    const columns = config.columns;
    const overrideIds = leaderboardDisplayOverrideIds(config);
    const intParams: number[] = [ config.sortMode, columns.length ];

    for (let i = 0; i < VARIABLE_LEADERBOARD_MAX_COLUMNS; i++) intParams.push((i < columns.length) ? columns[i].type : -1);

    intParams.push(config.filterEnabled ? 1 : 0, config.comparisonEnabled ? 1 : 0, config.operandKind, overrideIds.length);
    intParams.push(config.location.tileX, config.location.tileY, config.location.offsetX, config.location.altitude);

    for (let i = 0; i < VARIABLE_LEADERBOARD_MAX_COLUMNS; i++) intParams.push((i < columns.length) ? columns[i].width : 0);

    intParams.push(config.pageSizeOption);

    const variableIds = [ canonicalLeaderboardVariableId(config.filterVariableId), canonicalLeaderboardVariableId(config.globalOperandVariableId), ...overrideIds ];

    while (variableIds.length < VARIABLE_ID_COUNT) variableIds.push(VARIABLE_LEADERBOARD_NULL_VARIABLE_ID);

    const strings = [ config.title, config.description ];

    for (let i = 0; i < VARIABLE_LEADERBOARD_MAX_COLUMNS; i++) strings.push((i < columns.length) ? columns[i].label : '');

    strings.push(config.literal, ...overrideIds.map(id => config.displayOverrides[id]));

    while (strings.length < STRING_FIELD_COUNT) strings.push('');

    const stringParam = strings.join('\t');

    if (!fitsStorage(intParams, variableIds, stringParam)) return null;

    return { intParams, variableIds, stringParam };
};

/** `VariableLeaderboardConfigCodec.decodeParams`; null for params Flash refuses (the add-on's invalid configuration). */
export const decodeLeaderboardConfig = (intParams: readonly number[], variableIds: readonly string[], stringParam: string): VariableLeaderboardConfig | null => {
    if (intParams.some(value => !Number.isInteger(value))) return null;
    if (variableIds.some(id => (typeof id !== 'string') || (id.length === 0))) return null;
    if (!fitsStorage(intParams, variableIds, stringParam)) return null;

    if (stringParam.length === 0) return createUnpublishedLeaderboardConfig();

    if ((intParams.length < INT_PARAM_COUNT_MIN) || (variableIds.length < VARIABLE_ID_COUNT)) return null;

    const sortMode = intParams[0];
    const columnCount = intParams[1];

    if (!isValidSortMode(sortMode) || (columnCount < 1) || (columnCount > VARIABLE_LEADERBOARD_MAX_COLUMNS)) return null;

    const parts = stringParam.split('\t');
    const strings = Array.from({ length: STRING_FIELD_COUNT }, (_, i) => ((i < parts.length) ? parts[i] : ''));
    const columns: VariableLeaderboardConfigColumn[] = [];

    for (let i = 0; i < columnCount; i++) {
        const type = intParams[2 + i];

        if (!isValidColumnType(type) || (type === -1)) return null;

        let width = ((COLUMN_WIDTH_PARAM_OFFSET + i) < intParams.length) ? intParams[COLUMN_WIDTH_PARAM_OFFSET + i] : leaderboardColumnDefaultWidth(type);

        if (!isValidColumnWidth(width)) width = leaderboardColumnDefaultWidth(type);

        columns.push({ type, label: strings[2 + i], width });
    }

    if ((intParams[6] !== 0) && (intParams[6] !== 1)) return null;

    const filterEnabled = (intParams[6] === 1);

    if (filterEnabled && (intParams[7] !== 0) && (intParams[7] !== 1)) return null;

    const comparisonEnabled = filterEnabled && (intParams[7] === 1);
    const operandKind = comparisonEnabled ? intParams[8] : VARIABLE_LEADERBOARD_OPERAND_LITERAL;

    if (comparisonEnabled && !isValidOperandKind(operandKind)) return null;

    const overrideCount = intParams[9];

    if ((overrideCount < 0) || (overrideCount > VARIABLE_LEADERBOARD_MAX_DISPLAY_OVERRIDES)) return null;

    const filterVariableId = filterEnabled ? canonicalLeaderboardVariableId(variableIds[0]) : VARIABLE_LEADERBOARD_NULL_VARIABLE_ID;

    if (filterEnabled && isLeaderboardNullVariableId(filterVariableId)) return null;

    let globalOperandVariableId = VARIABLE_LEADERBOARD_NULL_VARIABLE_ID;
    let literal = '';

    if (comparisonEnabled) {
        if (operandKind === VARIABLE_LEADERBOARD_OPERAND_LITERAL) {
            literal = strings[6];

            if (!isCanonicalSignedLong(literal)) return null;
        } else {
            globalOperandVariableId = canonicalLeaderboardVariableId(variableIds[1]);

            if (isLeaderboardNullVariableId(globalOperandVariableId)) return null;
        }
    }

    const displayOverrides: Record<string, string> = {};

    for (let i = 0; i < overrideCount; i++) {
        const id = variableIds[2 + i];
        const name = strings[7 + i];

        if (isLeaderboardNullVariableId(id) || !name.length || Object.prototype.hasOwnProperty.call(displayOverrides, id)) return null;

        displayOverrides[id] = name;
    }

    const config: VariableLeaderboardConfig = {
        title: strings[0],
        description: strings[1],
        columns,
        sortMode,
        pageSizeOption: intParams[18] ?? 0,
        filterEnabled,
        filterVariableId,
        comparisonEnabled,
        operandKind,
        globalOperandVariableId,
        literal,
        displayOverrides,
        location: { tileX: intParams[10], tileY: intParams[11], offsetX: intParams[12], altitude: intParams[13] },
    };

    return isValidLeaderboardConfig(config) ? config : null;
};
