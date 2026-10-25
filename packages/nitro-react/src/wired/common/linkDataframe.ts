/**
 * `uibuilder/presets/applications/LinkDataframeCodec` (WIN63-202610201032) - the rules the WIRED
 * Link dataframe boxes (Send Link Dataframe, Receive Link Dataframe) share: how many rows, how the
 * rows are stored, and what a key, a placeholder and a stored configuration may be.
 *
 * A dataframe box stores its rows as the string param `[[key, text], ...]` (JSON, one pair per row
 * in use), its per-row settings in the int params after the row count, and one variable id per
 * row - always `LINK_DATAFRAME_MAX_ROWS` of them.
 */
import { fitsWiredParamStorage, utf8Length } from './wiredStorageLength';

/** `MAX_ROWS`. */
export const LINK_DATAFRAME_MAX_ROWS = 12;
/** `MAX_TEXT_BYTES` - the stored string param's UTF-8 limit. */
export const LINK_DATAFRAME_MAX_TEXT_BYTES = 3000;
/** `MAX_MESSAGE_BYTES` - a send row's custom message. */
export const LINK_DATAFRAME_MAX_MESSAGE_BYTES = 200;
/** A key's and a placeholder's length limit (`keyError` / `placeholderError`, `TextInputParam("", 40, ...)`). */
export const LINK_DATAFRAME_KEY_MAX_LENGTH = 40;

/** A send row's mode: `NUMBER_LITERAL`, `NUMBER_VARIABLE`, `VARIABLE_TEXT`, `CUSTOM_MESSAGE`. */
export const LINK_DATAFRAME_NUMBER_LITERAL = 0;
export const LINK_DATAFRAME_NUMBER_VARIABLE = 1;
export const LINK_DATAFRAME_VARIABLE_TEXT = 2;
export const LINK_DATAFRAME_CUSTOM_MESSAGE = 3;

/** A receive row's destination: a text placeholder (`_-X18`) or a context variable (`VARIABLE_DESTINATION`). */
export const LINK_DATAFRAME_PLACEHOLDER_DESTINATION = 0;
export const LINK_DATAFRAME_VARIABLE_DESTINATION = 1;

/** The placeholder the received message itself goes into (`placeholderError`'s reserved name). */
export const LINK_TRIGGER_TEXT_PLACEHOLDER = 'trigger_text';

/** `decode`: the stored rows, or `null` when the string does not hold exactly `count` `[key, text]` pairs. */
export const decodeLinkDataframe = (stringParam: string, count: number): [ string, string ][] | null => {
    if ((count < 0) || (count > LINK_DATAFRAME_MAX_ROWS)) return null;

    if ((stringParam === '') && (count === 0)) return [];

    let rows: unknown;

    try {
        rows = JSON.parse(stringParam);
    } catch {
        return null;
    }

    if (!Array.isArray(rows) || (rows.length !== count)) return null;

    for (const row of rows) {
        if (!Array.isArray(row) || (row.length !== 2) || (typeof row[0] !== 'string') || (typeof row[1] !== 'string')) return null;
    }

    return rows as [ string, string ][];
};

/** `encode` as the presets' `stringParam` getters write it. */
export const encodeLinkDataframe = (rows: readonly (readonly [ string, string ])[]): string => JSON.stringify(rows);

/** `normalizeKey`'s trim, `/^[\x00- ]+|[\x00- ]+$/`: a space or a control character. */
const isTrimmedChar = (char: string): boolean => char.charCodeAt(0) <= 0x20;

/** `normalizeKey`: underscores count as spaces for the trim, then spaces become underscores, in lower case. */
export const normalizeLinkDataframeKey = (key: string): string => {
    const chars = [ ...key.replace(/_/g, ' ') ];

    let start = 0;
    let end = chars.length;

    while ((start < end) && isTrimmedChar(chars[start])) start++;
    while ((end > start) && isTrimmedChar(chars[end - 1])) end--;

    return chars.slice(start, end).join('').replace(/ /g, '_').toLowerCase();
};

/** `keyError` - a text key, or `null`. */
export const linkDataframeKeyError = (key: string): string | null => {
    const normalized = normalizeLinkDataframeKey(key);

    if ((normalized.length === 0) || (normalized.length > LINK_DATAFRAME_KEY_MAX_LENGTH)) return 'wiredfurni.error.link.key_length';

    if (!/^\w+$/.test(normalized)) return 'wiredfurni.error.variables.name_syntax';

    return null;
};

/** `placeholderError` - a text key, or `null`. */
export const linkDataframePlaceholderError = (placeholder: string): string | null => {
    if ((placeholder.length === 0) || (placeholder.length > LINK_DATAFRAME_KEY_MAX_LENGTH)) return 'wiredfurni.error.placeholder.name_length';

    if (!/^\w+$/.test(placeholder)) return 'wiredfurni.error.placeholder.name_syntax';

    if (placeholder.toLowerCase() === LINK_TRIGGER_TEXT_PLACEHOLDER) return 'wiredfurni.error.placeholder.reserved';

    return null;
};

/** `isTarget`: furni (0), users (1), global (-10) or context (-20). */
export const isLinkDataframeTarget = (target: number): boolean => (target === 0) || (target === 1) || (target === -10) || (target === -20);

/** `storageError` - the stored configuration's limits, a text key or `null`. */
export const linkDataframeStorageError = (stringParam: string, intParams: readonly number[], variableIds: readonly string[]): string | null => {
    if (utf8Length(stringParam) > LINK_DATAFRAME_MAX_TEXT_BYTES) return 'wiredfurni.error.link.configuration_too_large';

    if (!fitsWiredParamStorage(intParams, variableIds)) return 'wiredfurni.error.link.configuration_too_large';

    return null;
};
