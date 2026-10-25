/**
 * `HabboLocalizationManager`'s badge texts - `getBadgeName` and `getBadgeDesc` - with the
 * `BadgeBaseAndLevel` split they rest on. A badge's own key wins over its base's
 * (`getExistingKey`); `%roman%` is the level as a roman numeral and, in a description, `%limit%`
 * the point limit `BadgePointLimitsMessage` gave the badge (0 when it gave none).
 */

type Translate = (key: string, defaultValue?: string, replacements?: Record<string, string>) => string;

/** `HabboLocalizationManager._romanNumerals`: a badge level as `%roman%`. */
const ROMAN_NUMERALS: readonly string[] = [ 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII', 'XXVIII', 'XXIX', 'XXX' ];

/** `BadgeBaseAndLevel`: a badge code split into its base and the level its trailing digits give (1 without any). */
export const getBadgeBaseAndLevel = (code: string): { base: string; level: number } => {
    let at = code.length - 1;

    while ((at > 0) && (code.charCodeAt(at) >= 48) && (code.charCodeAt(at) <= 57)) at--;

    const digits = code.substring(at + 1);

    return { base: code.substring(0, at + 1), level: digits.length ? parseInt(digits) : 1 };
};

/** `getRomanNumeral`. */
const getRomanNumeral = (level: number) => ROMAN_NUMERALS[Math.max(0, level - 1)] ?? '';

/** `getExistingKey`: the first key with a text, or the first key. */
const getExistingKey = (t: Translate, keys: string[]): string => keys.find(key => (t(key, '') !== '')) ?? keys[0];

/** `getBadgeName`: a badge with no name of its own or its base's shows its key. */
export const getBadgeName = (t: Translate, code: string): string => {
    const { base, level } = getBadgeBaseAndLevel(code);
    const key = getExistingKey(t, [ `badge_name_${code}`, `badge_name_${base}` ]);

    return t(key, key, { roman: getRomanNumeral(level) });
};

/** `getBadgeDesc`: a badge with no description of its own or its base's has an empty one. */
export const getBadgeDesc = (t: Translate, code: string, pointLimits: Record<string, number>): string => {
    const { base, level } = getBadgeBaseAndLevel(code);
    const key = getExistingKey(t, [ `badge_desc_${code}`, `badge_desc_${base}` ]);
    const text = t(key, key, { limit: String(pointLimits[code] ?? 0), roman: getRomanNumeral(level) });

    return (text === key) ? '' : text;
};

/** `§_-ge§.shouldShowOwnerCount`: a badge's owner count is shown between 1 and 999. */
export const shouldShowBadgeOwnerCount = (ownerCount: number | undefined): boolean => (ownerCount !== undefined) && (ownerCount > 0) && (ownerCount < 1000);
