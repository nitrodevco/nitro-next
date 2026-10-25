/**
 * Flash's `getProperty` / `getBoolean` over the client config, which stands in for the hotel's
 * `external_variables`:
 *
 * - `configString`: the value as text with every `${key}` placeholder filled from the other values
 *   (`${image.library.url}reception/...`), `''` when the key is unset - `getProperty`. Every
 *   external variable is text to Flash, so a number or a flag in the JSON reads as its text
 *   (`true` as `"true"`).
 * - `configBoolean`: `"1"` and `"true"` in any case (a JSON `true` or `1` alike); anything else, an
 *   unset key included, is Flash's `false` default - `HabboConfigurationManager.getBoolean`.
 * - `configInteger`: AS3's `int()` of the value, `fallback` when the key is unset -
 *   `HabboConfigurationManager.getInteger(key, default)`. Text that is no number is 0, as `int`
 *   makes it, and no placeholder is filled.
 * - `resolve`: the placeholders of any string filled the same way - a layout's own `asset_uri`,
 *   which Flash expands against the same variables.
 *
 * The methods keep those names so `scripts/drift/config_keys.py` sees every literal key read
 * through them: destructure the reader and call `configString('landing.view.bgtiming')`.
 */
export const configReader = (config: Record<string, unknown>) => {
    /** The variable as the text Flash holds it, undefined when it is unset. */
    const text = (key: string): string | undefined => {
        const value = config[key];

        return ((typeof value === 'string') || (typeof value === 'number') || (typeof value === 'boolean')) ? String(value) : undefined;
    };

    const resolve = (value: string): string => value.replace(/\$\{([^}]*)\}/g, (match, name: string) => text(name) ?? match);

    const configString = (key: string): string => {
        const value = text(key);

        return (value === undefined) ? '' : resolve(value);
    };

    const configBoolean = (key: string): boolean => {
        const value = text(key);

        return (value === '1') || (value?.toLowerCase() === 'true');
    };

    const configInteger = (key: string, fallback: number): number => {
        const value = text(key);

        // `int(String)`: `Number` of the text cut to 32 bits, 0 for anything that is no number.
        return (value === undefined) ? fallback : (Number(value) | 0);
    };

    /** Whether the variable is set at all - Flash's `getProperty` returning non-null (an empty value is set). */
    const configHas = (key: string): boolean => text(key) !== undefined;

    return { configString, configBoolean, configInteger, configHas, resolve };
};
