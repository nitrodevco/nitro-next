/**
 * Theme style properties in patch files (turbo-cloud `docs/plugin-data.md`): the values the hotel
 * gives in `templates.styles`, `{ "<plugin key>:<name>": value }`, for the `${style:name}` a file names.
 */
const STYLE_TOKEN = /\$\{style:([A-Za-z0-9._:-]+)\}/g;

/** The value a theme's `${style:name}` stands for: its own `<owner>:<name>`, or another's by `<key>:<name>`. */
const styleOf = (styles: Record<string, unknown>, owner: string, name: string): unknown =>
    (`${owner}:${name}` in styles) ? styles[`${owner}:${name}`] : styles[name];

/**
 * A patch file's values with the theme style properties they name resolved (turbo-cloud
 * `docs/plugin-data.md`): a value that is one `${style:name}` becomes the style's value as it is (a
 * colour stays a number); one inside text is written into it. One the hotel has no value of is left
 * as it is and logged once per file.
 */
export const resolveStyles = (value: unknown, styles: Record<string, unknown>, owner: string, missing: Set<string>): unknown => {
    if (typeof value === 'string') {
        const whole = /^\$\{style:([A-Za-z0-9._:-]+)\}$/.exec(value);

        if (whole) {
            const resolved = styleOf(styles, owner, whole[1]);

            if (resolved !== undefined) return resolved;

            missing.add(whole[1]);

            return value;
        }

        return value.replace(STYLE_TOKEN, (token, name: string) => {
            const resolved = styleOf(styles, owner, name);

            if (resolved === undefined) {
                missing.add(name);

                return token;
            }

            return (typeof resolved === 'string' || typeof resolved === 'number' || typeof resolved === 'boolean') ? String(resolved) : JSON.stringify(resolved);
        });
    }

    if (Array.isArray(value)) return value.map(item => resolveStyles(item, styles, owner, missing));

    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([ key, item ]) => [ key, resolveStyles(item, styles, owner, missing) ]));

    return value;
};

export const parseObject = (value: unknown): Record<string, unknown> => {
    try {
        const parsed = (typeof value === 'string') ? JSON.parse(value) as unknown : value;

        return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed as Record<string, unknown> : {};
    } catch {
        return {};
    }
};
