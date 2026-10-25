/**
 * Flash's `TextField.restrict` as a filter over typed text - what `TextInputParam.restrict` and
 * `TextAreaParam.restrict` set on the wired kit's fields.
 *
 * The rules of the Flash property: `null` accepts every character and `''` none; otherwise the
 * string lists characters and `a-z` ranges, a `^` switches between accepting and refusing what
 * follows (a string that starts with `^` accepts everything it does not refuse), and `\` makes
 * the next character literal (`\-`, `\^`, `\\`). A later entry wins over an earlier one.
 */

interface RestrictEntry {
    from: number;
    to: number;
    accept: boolean;
}

const parseRestrict = (restrict: string): RestrictEntry[] => {
    const entries: RestrictEntry[] = [];
    let accept = true;
    let i = 0;

    while (i < restrict.length) {
        let char = restrict.charAt(i);

        if (char === '^') {
            accept = !accept;
            i++;
            continue;
        }

        if ((char === '\\') && ((i + 1) < restrict.length)) {
            i++;
            char = restrict.charAt(i);
        }

        const from = char.charCodeAt(0);
        let to = from;

        if ((restrict.charAt(i + 1) === '-') && ((i + 2) < restrict.length)) {
            let end = restrict.charAt(i + 2);
            let consumed = 2;

            if ((end === '\\') && ((i + 3) < restrict.length)) {
                end = restrict.charAt(i + 3);
                consumed = 3;
            }

            to = end.charCodeAt(0);
            i += consumed;
        }

        entries.push({ from: Math.min(from, to), to: Math.max(from, to), accept });
        i++;
    }

    return entries;
};

/** Whether `char` passes `restrict`. */
export const isCharAllowedByRestrict = (char: string, restrict: string | null | undefined): boolean => {
    if ((restrict === null) || (restrict === undefined)) return true;

    if (restrict === '') return false;

    const code = char.charCodeAt(0);
    let allowed = (restrict.charAt(0) === '^');

    for (const entry of parseRestrict(restrict)) {
        if ((code >= entry.from) && (code <= entry.to)) allowed = entry.accept;
    }

    return allowed;
};

/** `text` without the characters `restrict` refuses. */
export const applyTextRestrict = (text: string, restrict: string | null | undefined): string => {
    if ((restrict === null) || (restrict === undefined)) return text;

    let result = '';

    for (const char of text) {
        if ((char === '\n') || (char === '\r') || isCharAllowedByRestrict(char, restrict)) result += char;
    }

    return result;
};
