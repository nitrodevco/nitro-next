/**
 * The stored lengths a box may not exceed, which the WIN63-202610201032 boxes that can reach them
 * check before saving (`LinkDataframeCodec.storageError`, the variable leaderboard's
 * `validateStorageLengths`): the int params and the variable ids, each joined with `|`, and the
 * string param's UTF-8 length, whose limit each box sets itself.
 */

/** The int params joined with `|`. */
const MAX_INT_PARAMS_STORAGE_LENGTH = 400;
/** The variable ids joined with `|`. */
const MAX_VARIABLE_IDS_STORAGE_LENGTH = 240;

/** `utf8Length` - `ByteArray.writeUTFBytes(text).length`. */
export const utf8Length = (text: string): number => new TextEncoder().encode(text).length;

/** Whether the int params and the variable ids fit their stored lengths. */
export const fitsWiredParamStorage = (intParams: readonly number[], variableIds: readonly string[]): boolean =>
    (intParams.join('|').length <= MAX_INT_PARAMS_STORAGE_LENGTH) && (variableIds.join('|').length <= MAX_VARIABLE_IDS_STORAGE_LENGTH);
