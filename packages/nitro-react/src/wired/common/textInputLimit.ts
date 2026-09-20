/**
 * `TextInputPreset.shouldShowWarn` / `TextAreaPreset.shouldShowWarn` - when the character limit
 * bubble (`char_limit_warn`, "95/100") appears over a text field.
 */

/** Limits of 10 characters or fewer never warn; otherwise the last fifth of the limit does, at least 6 and at most 30 characters of it. */
export const showsCharLimitWarning = (length: number, maxCharacters: number): boolean => {
    if (maxCharacters <= 10) return false;

    const margin = Math.min(30, Math.max(6, Math.trunc(maxCharacters / 5)));

    return length > (maxCharacters - margin);
};

/** `TextAreaPreset.text` - the field's carriage returns as line feeds. */
export const normalizeTextAreaText = (text: string): string => text.replace(/\n\r/g, '\n').replace(/\r/g, '\n');
