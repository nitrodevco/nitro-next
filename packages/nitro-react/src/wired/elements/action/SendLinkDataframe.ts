/**
 * `actiontypes/SendLinkDataframe` (`wf_act_send_dataframe`, code 64, WIN63-202610201032) - WIRED
 * Effect: Send Link Dataframe: sends up to 12 keyed values over the WIRED Link networks of the
 * picked Links. Its editor is `LinkDataframeSendPreset`: "Number of rows" and one
 * `LinkDataframeSendRowPreset` per row - a key, what the value is (a number, typed or read from a
 * variable; a variable's text; a custom message) and the value.
 *
 * Int params: `[ row count, (mode, number, variable target) x 12 ]` - 37 ints; the mode is
 * `LINK_DATAFRAME_NUMBER_LITERAL` / `_NUMBER_VARIABLE` / `_VARIABLE_TEXT` / `_CUSTOM_MESSAGE`.
 * String param: `[[key, message], ...]` for the rows in use (`LinkDataframeCodec`). Variable ids:
 * one per row, 12 (`"n"` for none). A box whose params do not hold that opens with no rows and
 * refuses to save (`wiredfurni.error.link.invalid_dataframe`, `_loadError`) until it is reopened.
 *
 * Each row's value has its own merged input source (`mergedSelections`: furni selection `i + 1`,
 * user selection `i`; furni selection 0 is the Links, `wiredfurni.params.link.endpoints`).
 */
import { IWiredVariable, VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import {
    decodeLinkDataframe, encodeLinkDataframe, isLinkDataframeTarget, LINK_DATAFRAME_CUSTOM_MESSAGE, LINK_DATAFRAME_MAX_MESSAGE_BYTES, LINK_DATAFRAME_MAX_ROWS, LINK_DATAFRAME_NUMBER_LITERAL, LINK_DATAFRAME_NUMBER_VARIABLE,
    LINK_DATAFRAME_VARIABLE_TEXT, linkDataframeKeyError, linkDataframeStorageError, normalizeLinkDataframeKey,
} from '../../common/linkDataframe';
import { utf8Length } from '../../common/wiredStorageLength';
import { finalizePickerSelection, getPickerSelectedVariable, selectPickerVariable, setPickerTarget, WIRED_VARIABLE_ID_NONE } from '../../common/WiredVariablePickerModel';
import { createValueOrVariableState, VALUE_OR_VARIABLE_OPTION_VALUE, VALUE_OR_VARIABLE_OPTION_VARIABLE, type WiredValueOrVariableState } from '../../common/WiredVariableSections';
import { WIRED_SOURCE_MERGED, type WiredElementContext, type WiredElementDefinition } from '../../WiredElement';
import { getWiredRoomVariables } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** `LinkDataframeSendPreset.initialize`'s int count: the row count and three per row. */
const SEND_DATAFRAME_INT_COUNT = 1 + (LINK_DATAFRAME_MAX_ROWS * 3);

/** The mode dropdown's options (`_mode`): a number (typed or a variable's), a variable's text, a custom message. */
export const LINK_DATAFRAME_SEND_MODE_OPTIONS = [
    { id: LINK_DATAFRAME_NUMBER_LITERAL, label: '${wiredfurni.params.link.source.number}' },
    { id: LINK_DATAFRAME_VARIABLE_TEXT, label: '${wiredfurni.params.link.source.variable_text}' },
    { id: LINK_DATAFRAME_CUSTOM_MESSAGE, label: '${wiredfurni.params.link.source.message}' },
];

export interface LinkDataframeSendRow {
    /** `_key`'s text, as typed. */
    key: string;
    /** `_mode.selectedId`: 0, 2 or 3 - a variable number is 0 with the variable option. */
    modeOption: number;
    /** `_-X3` - the number or the variable. */
    value: WiredValueOrVariableState;
    /** `_-02m` - the custom message. */
    message: string;
}

export interface SendLinkDataframeForm {
    count: number;
    rows: LinkDataframeSendRow[];
    /** `_loadError`. */
    loadError: string | null;
}

/** `LinkDataframeSendRowPreset.mode`. */
export const linkDataframeSendRowMode = (row: LinkDataframeSendRow): number =>
    ((row.modeOption === LINK_DATAFRAME_NUMBER_LITERAL) ? ((row.value.option === VALUE_OR_VARIABLE_OPTION_VARIABLE) ? LINK_DATAFRAME_NUMBER_VARIABLE : LINK_DATAFRAME_NUMBER_LITERAL) : row.modeOption);

/**
 * `ValueOrVariableSection.isEmpty` - inferred from the state: a variable-or-empty field with no
 * variable selected is empty (a typed name that matches nothing fails the section's own check).
 */
const isRowValueEmpty = (row: LinkDataframeSendRow, variables: readonly IWiredVariable[] | null | undefined): boolean =>
    (row.value.option === VALUE_OR_VARIABLE_OPTION_VARIABLE) && !getPickerSelectedVariable(variables, row.value.picker);

/** `LinkDataframeSendRowPreset.variableSelectionFilter`: a variable's text needs a text connector. */
export const linkDataframeSendVariableFilter = (row: LinkDataframeSendRow) => (variable: IWiredVariable): boolean =>
    (row.modeOption !== LINK_DATAFRAME_VARIABLE_TEXT) || !!variable.textConnector;

/** `LinkDataframeSendRowPreset.isSourcePickingDisabled`: the value field is hidden for a custom message. */
const isRowSourcePickingDisabled = (row: LinkDataframeSendRow): boolean => row.modeOption === LINK_DATAFRAME_CUSTOM_MESSAGE;

/** `LinkDataframeSendRowPreset.variableId`. */
const rowVariableId = (row: LinkDataframeSendRow, variables: readonly IWiredVariable[] | null | undefined): string => {
    if ((linkDataframeSendRowMode(row) === LINK_DATAFRAME_VARIABLE_TEXT) && isRowValueEmpty(row, variables)) return WIRED_VARIABLE_ID_NONE;

    return getPickerSelectedVariable(variables, row.value.picker)?.variableId ?? WIRED_VARIABLE_ID_NONE;
};

const createRow = (variables: readonly IWiredVariable[], key: string, message: string, mode: number, literal: number, target: number, variableId: string): LinkDataframeSendRow => ({
    key,
    modeOption: (mode === LINK_DATAFRAME_NUMBER_VARIABLE) ? LINK_DATAFRAME_NUMBER_LITERAL : mode,
    value: createValueOrVariableState(variables, variableId, target, ((mode === LINK_DATAFRAME_NUMBER_VARIABLE) || (mode === LINK_DATAFRAME_VARIABLE_TEXT)) ? VALUE_OR_VARIABLE_OPTION_VARIABLE : VALUE_OR_VARIABLE_OPTION_VALUE, literal),
    message,
});

/**
 * `onModeChanged`: a value the new mode cannot take is reset - an empty field for a variable's
 * text, `0` for a number (Flash rewrites the field, `_-X3.text = mode == 2 ? "" : "0"`).
 */
export const changeLinkDataframeSendRowMode = (row: LinkDataframeSendRow, modeOption: number): LinkDataframeSendRow => {
    const next = { ...row, modeOption };

    if (modeOption === LINK_DATAFRAME_VARIABLE_TEXT && (row.value.option === VALUE_OR_VARIABLE_OPTION_VALUE)) {
        return { ...next, value: { ...row.value, option: VALUE_OR_VARIABLE_OPTION_VARIABLE, picker: selectPickerVariable(row.value.picker, null) } };
    }

    if (modeOption === LINK_DATAFRAME_NUMBER_LITERAL && (row.modeOption === LINK_DATAFRAME_VARIABLE_TEXT) && (row.value.picker.variableId === '')) {
        return { ...next, value: { ...row.value, option: VALUE_OR_VARIABLE_OPTION_VALUE, value: 0 } };
    }

    return next;
};

/** `LinkDataframeSendRowPreset.validationError` - a text key's text, or `null`. */
const rowValidationError = (row: LinkDataframeSendRow, ctx: WiredElementContext): string | null => {
    const keyError = linkDataframeKeyError(row.key);

    if (keyError) return ctx.localize(keyError);

    const mode = linkDataframeSendRowMode(row);
    const target = row.value.picker.target;

    if ((mode < 0) || (mode > 3) || !isLinkDataframeTarget(target)) return ctx.localize('wiredfurni.error.link.invalid_dataframe');

    if ((mode === LINK_DATAFRAME_CUSTOM_MESSAGE) && (utf8Length(row.message) > LINK_DATAFRAME_MAX_MESSAGE_BYTES)) return ctx.localize('wiredfurni.error.too_much_text', { limit: String(LINK_DATAFRAME_MAX_MESSAGE_BYTES) });

    if ((mode === LINK_DATAFRAME_CUSTOM_MESSAGE) || ((mode === LINK_DATAFRAME_VARIABLE_TEXT) && isRowValueEmpty(row, ctx.roomVariables))) return null;

    if ((mode === LINK_DATAFRAME_NUMBER_VARIABLE) || (mode === LINK_DATAFRAME_VARIABLE_TEXT)) {
        const selected = getPickerSelectedVariable(ctx.roomVariables, row.value.picker);

        if ((row.value.option !== VALUE_OR_VARIABLE_OPTION_VARIABLE) || !selected || !selected.hasValue || (Number(selected.variableTarget) !== target)) return ctx.localize('wiredfurni.params.link.select_source_variable');
    }

    return null;
};

const readIntParams = (form: SendLinkDataframeForm): number[] => [ form.count, ...form.rows.flatMap(row => [ linkDataframeSendRowMode(row), row.value.value, row.value.picker.target ]) ];

/** `stringParam`: `[key, message]` of the rows in use, the message only for a custom message. */
const readStringParam = (form: SendLinkDataframeForm): string =>
    encodeLinkDataframe(form.rows.slice(0, form.count).map(row => [ normalizeLinkDataframeKey(row.key), (linkDataframeSendRowMode(row) === LINK_DATAFRAME_CUSTOM_MESSAGE) ? row.message : '' ]));

/** `readVariableIds`: the rows in use that read a variable are finalized first (`finalizeVariable`). */
const readVariableIds = (form: SendLinkDataframeForm, ctx: WiredElementContext): string[] => form.rows.map((row, index) => {
    const mode = linkDataframeSendRowMode(row);

    if ((index < form.count) && ((mode === LINK_DATAFRAME_NUMBER_VARIABLE) || (mode === LINK_DATAFRAME_VARIABLE_TEXT)) && !((mode === LINK_DATAFRAME_VARIABLE_TEXT) && isRowValueEmpty(row, ctx.roomVariables))) {
        return finalizePickerSelection(ctx.roomVariables, row.value.picker);
    }

    return rowVariableId(row, ctx.roomVariables);
});

export const sendLinkDataframeAction: WiredElementDefinition<SendLinkDataframeForm> = {
    holder: 'action',
    code: ActionTypeCodes.SEND_LINK_DATAFRAME,
    createForm: (triggerable) => {
        const variables = getWiredRoomVariables(triggerable);
        const ints = triggerable.intParams;
        const decoded = (ints.length === SEND_DATAFRAME_INT_COUNT) ? decodeLinkDataframe(triggerable.stringParam, ints[0]) : null;
        const loadError = (!decoded || (triggerable.variableIds.length !== LINK_DATAFRAME_MAX_ROWS)) ? 'wiredfurni.error.link.invalid_dataframe' : null;
        const rows: LinkDataframeSendRow[] = [];

        for (let index = 0; index < LINK_DATAFRAME_MAX_ROWS; index++) {
            if (loadError || !decoded) {
                rows.push(createRow(variables, '', '', LINK_DATAFRAME_NUMBER_LITERAL, 0, 0, ''));

                continue;
            }

            const [ key, message ] = (index < ints[0]) ? decoded[index] : [ '', '' ];
            const base = 1 + (index * 3);

            rows.push(createRow(variables, key, message, ints[base], ints[base + 1], ints[base + 2], triggerable.variableIds[index]));
        }

        return { count: loadError ? 0 : ints[0], rows, loadError };
    },
    readIntParams,
    readStringParam,
    readVariableIds,
    // `LinkDataframeSendPreset.validationError`.
    validate: (form, ctx) => {
        if (form.loadError) return ctx.localize(form.loadError);

        const keys: string[] = [];

        for (let index = 0; index < form.count; index++) {
            const row = form.rows[index];
            const error = rowValidationError(row, ctx);

            if (error) return ctx.localize('wiredfurni.params.link.row_error', { number: String(index + 1), error });

            const key = normalizeLinkDataframeKey(row.key);

            if (keys.includes(key)) return ctx.localize('wiredfurni.error.variables.name_uniq');

            keys.push(key);
        }

        const storageError = linkDataframeStorageError(readStringParam(form), readIntParams(form), form.rows.map(row => rowVariableId(row, ctx.roomVariables)));

        return storageError ? ctx.localize(storageError) : null;
    },
    allowScrolling: true,
    widthModifier: 1.4,
    furniSelectionTitle: id => ((id === 0) ? 'wiredfurni.params.link.endpoints' : 'wiredfurni.params.link.source_furni'),
    userSelectionTitle: () => 'wiredfurni.params.link.source_users',
    mergedSelections: Array.from({ length: LINK_DATAFRAME_MAX_ROWS }, (_, index): [ number, number ] => [ index + 1, index ]),
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.variables_reference',
    getMergedType: (form, id) => form.rows[id]?.value.picker.target ?? 0,
    setMergedType: (form, id, sourceType) => ({ ...form, rows: form.rows.map((row, index) => ((index === id) ? { ...row, value: { ...row.value, picker: setPickerTarget(row.value.picker, sourceType) } } : row)) }),
    getCustomSourcesForMergedType: () => [ Number(VariableExtraSourceTypes.GLOBAL_SOURCE), Number(VariableExtraSourceTypes.CONTEXT_SOURCE) ],
    hasCustomTypePicker: () => true,
    isInputSourceDisabled: (form, id, sourceType) => (sourceType === WIRED_SOURCE_MERGED) && ((id >= form.count) || isRowSourcePickingDisabled(form.rows[id])),
    forceHidePickFurniInstructions: true,
};
