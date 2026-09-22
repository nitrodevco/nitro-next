/**
 * `CoreLocalizationManager.parseLocalizationData` - the rules by which a localization file
 * becomes key/value pairs, for both shapes the client can be served:
 *
 * - Flash's own `external_texts` file, one `key=value` per line: a line starting with `#` is a
 *   comment, the key is everything before the FIRST `=` and the value everything after it (a
 *   value is free to contain `=`, as `<font color="...">` and `<a href="...">` do), both trimmed;
 * - the converted JSON map of the same file.
 *
 * Either way a value then has its literal `\n` escapes turned into line breaks - Flash does it
 * here, at load time, so no text field ever sees the two characters - and a line without a key
 * is skipped.
 *
 * One difference on purpose: Flash does not store an empty value, and its `getLocalization`
 * then answers with the caller's default (`""` when none is given). The ~1700 empty values
 * (`badge_desc_*`, `abtest.motd`) are kept here, which gives a caller with no default the same
 * `""`; a caller that passes a default for one of them gets `""` rather than that default.
 */
const LINE_SEPARATOR = /\n\r+|\n+|\r+/gm;
const SURROUNDING_WHITESPACE = /^\s+|\s+$/g;
const ESCAPED_NEWLINE = /\\n/gm;

/** A value as Flash stores it: trimmed, `\n` escapes resolved. */
export const normalizeLocalizationValue = (value: string): string => value.replace(SURROUNDING_WHITESPACE, '').replace(ESCAPED_NEWLINE, '\n');

/** Parses a Flash `external_texts` file (`key=value` lines). */
export const parseLocalizationText = (text: string): Record<string, string> => {
    const data: Record<string, string> = {};

    for (const line of text.split(LINE_SEPARATOR)) {
        if (line.charAt(0) === '#') continue;

        const separator = line.indexOf('=');

        if (separator <= 0) continue;

        const key = line.substring(0, separator).replace(SURROUNDING_WHITESPACE, '');
        data[key] = normalizeLocalizationValue(line.substring(separator + 1));
    }

    return data;
};

/** Applies the same value rules to an already converted JSON map. */
export const normalizeLocalizationMap = (source: Record<string, unknown>): Record<string, string> => {
    const data: Record<string, string> = {};

    for (const key in source) {
        const raw = source[key];

        if (!key.length || (typeof raw !== 'string')) continue;

        data[key] = normalizeLocalizationValue(raw);
    }

    return data;
};

/** A localization response body: the JSON map when it is one, Flash's text file otherwise. */
export const parseLocalizationData = (body: string): Record<string, string> => {
    const trimmed = body.trimStart();

    if (trimmed.startsWith('{')) return normalizeLocalizationMap(JSON.parse(trimmed) as Record<string, unknown>);

    return parseLocalizationText(body);
};
