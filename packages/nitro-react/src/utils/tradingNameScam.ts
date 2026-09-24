/**
 * Whether the person you are trading with has taken a name that only *looks* like someone else's -
 * Flash's name-scam detector in `inventory/trading/namescam`, which the trade dialog warns about
 * when it opens.
 *
 * Two names are "confusable" when one can be walked into the other using only changes a reader
 * would skim past:
 *
 * - the same character (free);
 * - a letter that differs only in case, at most `MAX_CASE_CHANGES` times;
 * - a character from the same look-alike group - zero for a capital o, one for a lower-case L, and
 *   the accented vowels beside their plain ones (free, because a reader cannot tell them apart at
 *   all);
 * - a full stop, comma or colon skipped on either side, at most
 *   `MAX_SMALL_PUNCTUATION_DEVIATIONS` times.
 *
 * Either name having a character outside the allowed set rules the pair out, as does the two names
 * being equal - an exact match is the same person, not an impostor.
 *
 * The walk is a memoised search over both strings, because a skipped punctuation mark on either
 * side branches; `compareNames` keys its memo on the four counters so a pair is only ever walked
 * once per state.
 */

/** How far the walk may bend before the names stop counting as look-alikes. */
const MAX_CASE_CHANGES = 2;
const MAX_SMALL_PUNCTUATION_DEVIATIONS = 2;

/** The punctuation a name may contain at all, and the subset thin enough to be skipped over. */
const ALLOWED_PUNCTUATION = '_-=?!@:.,;';
const SMALL_PUNCTUATION = '.,:';

/** The accented letters a name may contain besides ASCII. */
const EXTRA_ALLOWED_LETTERS = 'ÅÄÖåäöŞÇÜĞşçıüğ';

/** Characters a reader cannot tell apart; a swap inside one group is free. */
const CONFUSABLE_GROUPS = [ '0OoÖö', '1lI!', '.,', ';:', 'AÅÄaåä', 'CÇcç', 'GĞgğ', 'SŞsş', 'UÜuü' ];

const CONFUSABLE_GROUP_BY_CHARACTER = new Map<string, string>();

for (const group of CONFUSABLE_GROUPS) {
    for (const character of group) CONFUSABLE_GROUP_BY_CHARACTER.set(character, group);
}

const isAsciiLetter = (character: string): boolean => /^[A-Za-z]$/.test(character);

const isLetter = (character: string): boolean => isAsciiLetter(character) || EXTRA_ALLOWED_LETTERS.includes(character);

const isAllowedCharacter = (character: string): boolean => isLetter(character) || /^[0-9]$/.test(character) || ALLOWED_PUNCTUATION.includes(character);

const isAllowedName = (name: string): boolean => [ ...name ].every(isAllowedCharacter);

/** Two letters that are the same but for their case - `Il` against `il`. */
const isCaseOnlyChange = (a: string, b: string): boolean => {
    if (!isLetter(a) || !isLetter(b) || (a === b)) return false;

    return (a.toLowerCase() === b.toLowerCase()) && (a.toUpperCase() === b.toUpperCase());
};

const isSmallPunctuation = (character: string): boolean => SMALL_PUNCTUATION.includes(character);

const areConfusable = (a: string, b: string): boolean => {
    if (a === b) return false;

    const group = CONFUSABLE_GROUP_BY_CHARACTER.get(a);

    return !!group && (group === CONFUSABLE_GROUP_BY_CHARACTER.get(b));
};

/** The memoised walk: can `a` from `aIndex` still be bent into `b` from `bIndex` within budget? */
const compareNames = (a: string, b: string, aIndex: number, bIndex: number, punctuationDeviations: number, caseChanges: number, memo: Map<string, boolean>): boolean => {
    if ((punctuationDeviations > MAX_SMALL_PUNCTUATION_DEVIATIONS) || (caseChanges > MAX_CASE_CHANGES)) return false;

    const key = `${aIndex}|${bIndex}|${punctuationDeviations}|${caseChanges}`;
    const seen = memo.get(key);

    if (seen !== undefined) return seen;

    let matched = false;

    if ((aIndex === a.length) && (bIndex === b.length)) {
        matched = true;
    } else if ((aIndex < a.length) && (bIndex < b.length)) {
        const left = a.charAt(aIndex);
        const right = b.charAt(bIndex);

        if (left === right) matched = compareNames(a, b, aIndex + 1, bIndex + 1, punctuationDeviations, caseChanges, memo);
        else if (isCaseOnlyChange(left, right)) matched = compareNames(a, b, aIndex + 1, bIndex + 1, punctuationDeviations, caseChanges + 1, memo);
        else if (areConfusable(left, right)) matched = compareNames(a, b, aIndex + 1, bIndex + 1, punctuationDeviations, caseChanges, memo);
    }

    // Either side may drop a thin punctuation mark, which is what lets `a.b` pass for `ab`.
    if (!matched && (aIndex < a.length) && isSmallPunctuation(a.charAt(aIndex))) {
        matched = compareNames(a, b, aIndex + 1, bIndex, punctuationDeviations + 1, caseChanges, memo);
    }

    if (!matched && (bIndex < b.length) && isSmallPunctuation(b.charAt(bIndex))) {
        matched = compareNames(a, b, aIndex, bIndex + 1, punctuationDeviations + 1, caseChanges, memo);
    }

    memo.set(key, matched);

    return matched;
};

/** `isPotentialScamName`: `name` is a look-alike of `other` without being it. */
export const isPotentialScamName = (name: string, other: string): boolean => {
    if (!name || !other || (name === other)) return false;

    if (!isAllowedName(name) || !isAllowedName(other)) return false;

    return compareNames(name, other, 0, 0, 0, 0, new Map<string, boolean>());
};

/** `collectMatchingNames`: the names in `candidates` that `name` could be mistaken for, each once. */
export const collectScamMatchingNames = (name: string, candidates: readonly string[]): string[] => {
    if (!name) return [];

    const matches: string[] = [];
    const seen = new Set<string>();

    for (const candidate of candidates) {
        if (!candidate || (candidate === name) || seen.has(candidate)) continue;

        if (!isPotentialScamName(name, candidate)) continue;

        seen.add(candidate);
        matches.push(candidate);
    }

    return matches;
};

/** `TradingNameScamDetectionResult`: who the other user's name resembles, in the room and among your friends. */
export interface TradingNameScamResult {
    similarInRoom: string[];
    similarInFriends: string[];
}

/** `§_-51J§.detect`. */
export const detectTradingNameScam = (otherUserName: string, roomUserNames: readonly string[], friendNames: readonly string[]): TradingNameScamResult => ({
    similarInRoom: collectScamMatchingNames(otherUserName, roomUserNames),
    similarInFriends: collectScamMatchingNames(otherUserName, friendNames),
});

/** `TradingNameScamDetectionResult.nameScamDetected`. */
export const hasTradingNameScamMatches = (result: TradingNameScamResult): boolean => (result.similarInRoom.length > 0) || (result.similarInFriends.length > 0);
