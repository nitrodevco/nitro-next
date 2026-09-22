/**
 * `Localization.fillParameterValues` - how Flash fills a text's parameters once
 * `registerParameter(key, name, value)` has given them. The system store's `getLocalizationValue`
 * (and so every `t(key, default, parameters)`) runs its text through this:
 *
 * - `%name%` is replaced everywhere and case-insensitively (`registerParameter(..., "num_months", ...)`
 *   fills `%NUM_MONTHS%`);
 * - a plural form `%{name|zero|one|many}` picks by the value read as an AS3 `int` (0, 1, anything
 *   else), and then every `%%` in the text is the value (`%{NUM_DAYS|0 days|1 day|%% days}`). Flash
 *   looks for the form in the lower-cased text with the name as given, so a name with a capital
 *   letter never picks one;
 * - `%%%sub%%%` is the text `<key>.<sub>`, the sub name itself when there is none, the last one
 *   first, each replacing the first occurrence of its own spelling.
 *
 * Every replacement is AS3's `String.replace` with a string, so a `$&` or `$1` in a value is read as
 * a pattern the way Flash reads it. The parameters are applied in the order given, as Flash walks
 * its dictionary.
 *
 * Flash's parameters are state: `registerParameter` keeps them on the `Localization`, so a later
 * plain `getLocalization(key)` still fills what an earlier call registered. The port passes them
 * with each call, and a text asked for without them is its raw text.
 */

/** `Localization.registerParameter`'s default `id`. */
const PARAMETER_ID = '%';

/** `/%%%([A-Za-z0-9_])+%%%/g`. */
const SUB_KEY_PATTERN = /%%%([A-Za-z0-9_])+%%%/g;

/** The name as a `RegExp` source that matches only itself - Flash builds it unescaped, from names that need none. */
const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * `fillParameterValues`: `raw` - the text of `key` - with `parameters` filled, and each
 * `%%%sub%%%` answered by `getLocalization(key + '.' + sub, sub)`.
 */
export const fillLocalizationParameters = (raw: string, key: string, parameters: Record<string, string> | undefined, getLocalization: (key: string, defaultValue: string) => string): string => {
    let text = raw;

    if (parameters) {
        for (const [ name, value ] of Object.entries(parameters)) {
            const escaped = escapeRegExp(name);

            text = text.replace(new RegExp(`${PARAMETER_ID}${escaped}${PARAMETER_ID}`, 'gim'), value);

            if (text.toLowerCase().indexOf(`${PARAMETER_ID}{${name}`) < 0) continue;

            // AS3 `int(value)`: the number's 32-bit integer, 0 for a text that is no number.
            const amount = Number(value) | 0;
            const form = (amount === 0) ? 1 : ((amount === 1) ? 2 : 3);

            text = text.replace(new RegExp(`${PARAMETER_ID}\\{${escaped}\\|([^|]*)\\|([^|]*)\\|([^}]*)\\}`, 'gim'), `$${form}`);
            text = text.replace(new RegExp(`${PARAMETER_ID}${PARAMETER_ID}`, 'gim'), value);
        }
    }

    const subKeys = text.match(SUB_KEY_PATTERN);

    if (subKeys) {
        for (let index = subKeys.length - 1; index >= 0; index--) {
            const sub = subKeys[index].substring(3, subKeys[index].length - 3);

            text = text.replace(subKeys[index], getLocalization(`${key}.${sub}`, sub));
        }
    }

    return text;
};
