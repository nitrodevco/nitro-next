/**
 * `triggerconfs/ReceiveLinkDataframe` (`wf_trg_receive_dataframe`, code 30, WIN63-202610201032) -
 * WIRED Trigger: Receive Link Dataframe: fires when a dataframe arrives over the WIRED Link
 * networks of the picked Links, and puts each wanted key's value into a text placeholder or a
 * context variable. Its editor is `LinkDataframeReceivePreset`: "Number of rows" and one
 * `LinkDataframeReceiveRowPreset` per row - a key, where it goes, and the placeholder or variable.
 *
 * Int params: `[ row count, destination x 12 ]` - 13 ints; the destination is
 * `LINK_DATAFRAME_PLACEHOLDER_DESTINATION` or `_VARIABLE_DESTINATION`. String param:
 * `[[key, placeholder], ...]` for the rows in use (the placeholder in lower case, `""` for a
 * variable). Variable ids: one per row, 12. A box whose params do not hold that opens with no
 * rows and refuses to save (`wiredfurni.error.link.invalid_dataframe`) until it is reopened.
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';
import { VariableType } from '@nitrodevco/nitro-packets';

import {
    decodeLinkDataframe, encodeLinkDataframe, LINK_DATAFRAME_MAX_ROWS, LINK_DATAFRAME_PLACEHOLDER_DESTINATION, LINK_DATAFRAME_VARIABLE_DESTINATION, linkDataframeKeyError, linkDataframePlaceholderError,
    linkDataframeStorageError, normalizeLinkDataframeKey,
} from '../../common/linkDataframe';
import { createVariablePickerState, finalizePickerSelection, getPickerSelectedVariable, WIRED_VARIABLE_ID_NONE, type WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import type { WiredElementContext, WiredElementDefinition } from '../../WiredElement';
import { getWiredRoomVariables } from '../../WiredTriggerable';
import { TriggerConfCodes } from './triggerCodes';

/** `LinkDataframeReceivePreset.initialize`'s int count: the row count and one per row. */
const RECEIVE_DATAFRAME_INT_COUNT = 1 + LINK_DATAFRAME_MAX_ROWS;
/** The context target (`VariablePickerPreset.init(..., -20)`). */
const CONTEXT_TARGET = -20;

/** The destination dropdown's options (`_-n1q`). */
export const LINK_DATAFRAME_RECEIVE_KIND_OPTIONS = [
    { id: LINK_DATAFRAME_PLACEHOLDER_DESTINATION, label: '${wiredfurni.params.link.destination.placeholder}' },
    { id: LINK_DATAFRAME_VARIABLE_DESTINATION, label: '${wiredfurni.params.link.destination.variable}' },
];

/** `LinkDataframeReceiveRowPreset.variableFilter`: a user-created context variable with a value the box may create and write. */
export const linkDataframeReceiveVariableFilter = (variable: IWiredVariable): boolean =>
    (Number(variable.variableType) === Number(VariableType.UNKNOWN_0)) && (Number(variable.variableTarget) === CONTEXT_TARGET) && variable.hasValue && variable.canCreateAndDelete && variable.canWriteValue;

export interface LinkDataframeReceiveRow {
    key: string;
    /** `_-n1q.selectedId`. */
    kind: number;
    placeholder: string;
    /** `variable`, on the context target. */
    picker: WiredVariablePickerState;
    /** The id the row opened with (`variableId`), kept for a placeholder row. */
    variableId: string;
}

export interface ReceiveLinkDataframeForm {
    count: number;
    rows: LinkDataframeReceiveRow[];
    /** `_loadError`. */
    loadError: string | null;
}

/** `LinkDataframeReceiveRowPreset.text`. */
const rowText = (row: LinkDataframeReceiveRow): string => ((row.kind === LINK_DATAFRAME_PLACEHOLDER_DESTINATION) ? row.placeholder.toLowerCase() : '');

/** `LinkDataframeReceiveRowPreset.variableId`. */
const rowVariableId = (row: LinkDataframeReceiveRow, variables: readonly IWiredVariable[] | null | undefined): string =>
    (((row.kind === LINK_DATAFRAME_VARIABLE_DESTINATION) && getPickerSelectedVariable(variables, row.picker)?.variableId) || row.variableId);

/** `LinkDataframeReceiveRowPreset.validationError` - a text key, or `null`. */
const rowValidationError = (row: LinkDataframeReceiveRow, variables: readonly IWiredVariable[] | null | undefined): string | null => {
    const keyError = linkDataframeKeyError(row.key);

    if (keyError) return keyError;

    if (row.kind === LINK_DATAFRAME_PLACEHOLDER_DESTINATION) return linkDataframePlaceholderError(rowText(row));

    if (row.kind !== LINK_DATAFRAME_VARIABLE_DESTINATION) return 'wiredfurni.error.link.invalid_dataframe';

    const selected = getPickerSelectedVariable(variables, row.picker);

    if (!selected || !linkDataframeReceiveVariableFilter(selected)) return 'wiredfurni.error.link.invalid_capture_variable';

    return null;
};

const readIntParams = (form: ReceiveLinkDataframeForm): number[] => [ form.count, ...form.rows.map(row => row.kind) ];

const readStringParam = (form: ReceiveLinkDataframeForm): string =>
    encodeLinkDataframe(form.rows.slice(0, form.count).map(row => [ normalizeLinkDataframeKey(row.key), rowText(row) ]));

/** `readVariableIds`: the variable rows in use are finalized first (`finalizeVariable`). */
const readVariableIds = (form: ReceiveLinkDataframeForm, ctx: WiredElementContext): string[] => form.rows.map((row, index) =>
    (((index < form.count) && (row.kind === LINK_DATAFRAME_VARIABLE_DESTINATION)) ? finalizePickerSelection(ctx.roomVariables, row.picker) : rowVariableId(row, ctx.roomVariables)));

export const receiveLinkDataframeTrigger: WiredElementDefinition<ReceiveLinkDataframeForm> = {
    holder: 'trigger',
    code: TriggerConfCodes.RECEIVE_LINK_DATAFRAME,
    createForm: (triggerable) => {
        const variables = getWiredRoomVariables(triggerable);
        const ints = triggerable.intParams;
        const decoded = (ints.length === RECEIVE_DATAFRAME_INT_COUNT) ? decodeLinkDataframe(triggerable.stringParam, ints[0]) : null;
        const loadError = (!decoded || (triggerable.variableIds.length !== LINK_DATAFRAME_MAX_ROWS)) ? 'wiredfurni.error.link.invalid_dataframe' : null;
        const rows: LinkDataframeReceiveRow[] = [];

        for (let index = 0; index < LINK_DATAFRAME_MAX_ROWS; index++) {
            const loaded = !loadError && !!decoded;
            const [ key, placeholder ] = (loaded && (index < ints[0])) ? decoded[index] : [ '', '' ];
            const variableId = loaded ? triggerable.variableIds[index] : WIRED_VARIABLE_ID_NONE;

            rows.push({ key, kind: loaded ? ints[1 + index] : LINK_DATAFRAME_PLACEHOLDER_DESTINATION, placeholder, picker: createVariablePickerState(variables, variableId, CONTEXT_TARGET), variableId });
        }

        return { count: loadError ? 0 : ints[0], rows, loadError };
    },
    readIntParams,
    readStringParam,
    readVariableIds,
    // `LinkDataframeReceivePreset.validationError`.
    validate: (form, ctx) => {
        if (form.loadError) return ctx.localize(form.loadError);

        const keys: string[] = [];
        const destinations: string[] = [];

        for (let index = 0; index < form.count; index++) {
            const row = form.rows[index];
            const error = rowValidationError(row, ctx.roomVariables);

            if (error) return ctx.localize('wiredfurni.params.link.row_error', { number: String(index + 1), error: ctx.localize(error) });

            const key = normalizeLinkDataframeKey(row.key);

            if (keys.includes(key)) return ctx.localize('wiredfurni.error.variables.name_uniq');

            keys.push(key);

            const destination = (row.kind === LINK_DATAFRAME_PLACEHOLDER_DESTINATION) ? `text:${rowText(row)}` : `variable:${rowVariableId(row, ctx.roomVariables)}`;

            if (destinations.includes(destination)) return ctx.localize('wiredfurni.error.link.destination_conflict');

            destinations.push(destination);
        }

        const storageError = linkDataframeStorageError(readStringParam(form), readIntParams(form), form.rows.map(row => rowVariableId(row, ctx.roomVariables)));

        return storageError ? ctx.localize(storageError) : null;
    },
    allowScrolling: true,
    widthModifier: 1.4,
    furniSelectionTitle: id => ((id === 0) ? 'wiredfurni.params.link.endpoints' : 'wiredfurni.params.link.source_furni'),
    forceHidePickFurniInstructions: true,
};
