/**
 * AS3's `String.replace(string, string)`: the first occurrence of `search` replaced, the
 * replacement taken literally (no `$&` / `$1` patterns, which JavaScript's own string replace reads).
 */
export const replaceFirst = (text: string, search: string, replacement: string | number): string => text.replace(search, () => String(replacement));
