/**
 * `com.sulake.habbo.roomevents.Util` - the wired package's helper class, every member that works
 * on data.
 *
 * The rest of `Util.as` manipulates Flash windows and has no counterpart in a declarative tree:
 * `setProcDirectly`, `getLowestPoint(List)`, `hideChildren` / `showChildren`,
 * `move(All)ChildrenToColumn` (yoga lays columns out), `select` (a controlled `selected` prop),
 * `getIntFromInput` (`getIntFromString` on the input's value) and `disableSection`, whose rule -
 * a disabled window is drawn at half its blend and stops taking input, unless tagged
 * `DO_NOT_DISABLE` - is what the wired kit's `disabled` props implement
 * (`WIRED_DISABLED_BLEND`).
 */
import { ColorConverter } from '@nitrodevco/nitro-api';
import { IWiredVariable, VariableType } from '@nitrodevco/nitro-packets';

/** `Util.VARIABLE_SYNTAX_MODE_*`. */
export const VARIABLE_SYNTAX_MODE_PRETTIFY = 0;
export const VARIABLE_SYNTAX_MODE_NONE = 1;

/** `Util.disableSection`: a disabled window is composited at half its own blend. */
export const WIRED_DISABLED_BLEND = 0.5;

const INT_MAX = 2147483647;
const INT_MIN = -2147483648;

/** ActionScript's `int(x)`: `ToInt32`, with `NaN` becoming 0. */
const toInt = (value: number): number => (value | 0);

/**
 * ActionScript's `Number(string)`: an empty or blank string is 0, anything unparsable is `NaN`.
 * JavaScript's `Number` has the same rules, including `0x` literals, so this only names it.
 */
const toNumber = (text: string): number => Number(text);

/** `Util.flatVariableName` - only the first `@` and `~` go, every dot becomes an underscore. */
export const flatVariableName = (variable: IWiredVariable): string =>
    variable.variableName.replace('@', '').replace('~', '').replace(/\./g, '_');

/** `Util.splitName`. */
export const splitVariableName = (variable: IWiredVariable): string[] => variable.variableName.split('.');

/** `Util.getConnectedText` - the text a variable connects to a value, if it has a text connector. */
export const getConnectedText = (variable: IWiredVariable, value: number): string | null =>
    variable.textConnector?.get(value) ?? null;

/**
 * `Util.variableValueWithString` - `null` for a variable without a value, `Hidden` for the two
 * sentinel ints, otherwise the value with its connected text in parentheses.
 */
export const variableValueWithString = (variable: IWiredVariable, value: number): string | null => {
    if (!variable.hasValue) return null;

    if ((value === INT_MAX) || (value === INT_MIN)) return 'Hidden';

    const connected = getConnectedText(variable, value);

    return String(value) + ((connected === null) ? '' : ` (${connected})`);
};

/**
 * `Util.getIntFromString` - `0b` / `0x` prefixes only when `allowRadixPrefixes`, the fallback for
 * anything that is not a number, and `int()` truncation (so `'1.9'` is 1 and `''` is 0).
 */
export const getIntFromString = (text: string, fallback: number, allowRadixPrefixes = false): number => {
    if (allowRadixPrefixes && (text.indexOf('0b') === 0)) return toInt(parseInt(text.substring(2), 2));

    if (allowRadixPrefixes && (text.indexOf('0x') === 0)) return toInt(parseInt(text.substring(2), 16));

    const value = toNumber(text);

    if (Number.isNaN(value)) return fallback;

    return toInt(value);
};

/** `Util.pushIntAsLong` - a 32-bit value sign-extended into the two ints of a long, high word first. */
export const pushIntAsLong = (params: number[], value: number): void => {
    params.push((value < 0) ? -1 : 0);
    params.push(value);
};

/** The two ints `pushIntAsLong` makes, for a form that builds its array as a literal. */
export const intAsLong = (value: number): [ number, number ] => [ (value < 0) ? -1 : 0, value ];

/**
 * The reverse of `pushIntAsLong`, which Flash writes inline in each `onEditStart`
 * (`intParams[index + 1]`): the low word of the long whose high word sits at `index`.
 */
export const intFromLong = (params: readonly number[], highWordIndex: number, fallback = 0): number =>
    params[highWordIndex + 1] ?? fallback;

/** `Util.variableCompare` - internal variables last, newest id first; the rest by name. */
export const compareVariables = (a: IWiredVariable, b: IWiredVariable): number => {
    const aInternal = Number(a.variableType) === Number(VariableType.INTERNAL);
    const bInternal = Number(b.variableType) === Number(VariableType.INTERNAL);

    if (aInternal && !bInternal) return 1;

    if (bInternal && !aInternal) return -1;

    if (aInternal) {
        const aId = Number(a.variableId);
        const bId = Number(b.variableId);

        if (aId > bId) return -1;

        if (aId === bId) return 0;

        return 1;
    }

    return a.variableName.localeCompare(b.variableName);
};

/**
 * `Util.sortVariables`. Flash sorts the vector in place; stores hold immutable arrays, so this
 * returns a sorted copy.
 */
export const sortVariables = <T extends IWiredVariable>(variables: readonly T[]): T[] => [ ...variables ].sort(compareVariables);

/** `Util.compareIntArrays`. */
export const compareIntArrays = (a: readonly number[], b: readonly number[]): boolean => {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
};

/** `Util.findVariableById`. */
export const findVariableById = <T extends IWiredVariable>(variables: readonly T[], variableId: string): T | null =>
    variables.find(variable => variable.variableId === variableId) ?? null;

/** `Util.uintToHexColor` - `#rrggbb`, zero padded (an alpha byte, if any, is kept as Flash keeps it). */
export const uintToHexColor = (color: number): string => `#${(color >>> 0).toString(16).padStart(6, '0')}`;

/** `Util.snakeToTitle` - `SOME_NAME` to `Some Name`. */
export const snakeToTitle = (text: string): string => {
    if (!text) return '';

    return text.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
};

/** `Util.lightenColor` - scales the HSL lightness byte, capped at 255. */
export const lightenColor = (color: number, factor: number): number => {
    const hsl = ColorConverter.rgbToHSL(color) >>> 0;
    const lightness = Math.min(255, Math.trunc((hsl & 0xFF) * factor));

    return ColorConverter.hslToRGB(((hsl & 0xFFFFFF00) | lightness) >>> 0);
};
