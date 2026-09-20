/**
 * The rules of `wired_setup.uibuilder.presets.NumberInputPreset` as pure functions: which
 * characters the field takes (`restrict`), how an int is displayed (`displayValue`), how the
 * text is read back (`parseDisplayValue`), and the message for a text that is not a number or
 * is out of range (`invalidNumberMessage` / `rangeValidationMessage`).
 *
 * A value is an int in the box's own unit. `precision` shifts the decimal point of what is
 * shown (2: `150` reads `1.5`; -1: `15` reads `150`), and `endsWithFive` shows the value times
 * five and refuses a text that does not end in 0 or 5 - `min` and `max` are scaled with it.
 */

export interface WiredNumberInputRules {
    /** `NumberInputParam.min`. */
    min: number;
    /** `NumberInputParam.max`. */
    max: number;
    /** `NumberInputParam.precision`. Default 0. */
    precision?: number;
    /** `NumberInputParam.endsWithFive`. Default `false`. */
    endsWithFive?: boolean;
    /** `NumberInputParam.nonDecimalNotations` - `0b...` and `0x...` are accepted. Default `false`. */
    nonDecimalNotations?: boolean;
}

export const WIRED_INT_MIN = -2147483648;
export const WIRED_INT_MAX = 2147483647;

/** ActionScript's `int(x)`. */
const toInt = (value: number): number => (value | 0);

const VALID_INT = /^-?\d+$/;
const VALID_DECIMAL = /^-?([0-9]*[.])?[0-9]+$/;

const swapChars = (text: string, a: number, b: number): string => {
    const chars = text.split('');
    const held = chars[a];

    chars[a] = chars[b];
    chars[b] = held;

    return chars.join('');
};

/** The field's `restrict`, as a filter over typed text. */
export const restrictNumberInputText = (text: string, { min, precision = 0, nonDecimalNotations = false }: WiredNumberInputRules): string => {
    const allowed = `0-9${(min < 0) ? '\\-' : ''}${(precision > 0) ? ',.' : ''}${nonDecimalNotations ? 'xba-fA-F' : ''}`;

    return text.replace(new RegExp(`[^${allowed}]`, 'g'), '');
};

/** `displayValue` - the shown (already times-five) int with its decimal point moved by `precision`. */
export const formatNumberInputValue = (shownValue: number, precision = 0): string => {
    let text = shownValue.toString();

    if (precision > 0) {
        while (text.length < (precision + 1)) text = `0${text}`;

        text = `${text.substring(0, text.length - precision)}.${text.substring(text.length - precision)}`;

        while (text.charAt(text.length - 1) === '0') text = text.substring(0, text.length - 1);

        if (text.charAt(text.length - 1) === '.') text = text.substring(0, text.length - 1);
    }

    for (let i = 0; i > precision; i--) text += '0';

    return text;
};

/** What the field shows for `value` - `setValue`'s `displayValue(endsWithFive ? value * 5 : value)`. */
export const numberInputText = (value: number, { precision = 0, endsWithFive = false }: WiredNumberInputRules): string =>
    formatNumberInputValue(endsWithFive ? (value * 5) : value, precision);

/** `parseDisplayValue` - the shown int the text stands for, `NaN` when it is not one. */
export const parseNumberInputText = (text: string, { min, precision = 0, endsWithFive = false, nonDecimalNotations = false }: WiredNumberInputRules): number => {
    if ((text === '') || ((text === '-') && (min < 0))) return NaN;

    const lastTyped = text.charAt(text.length - 1);

    if ((precision === 0) && endsWithFive && (lastTyped !== '0') && (lastTyped !== '5')) return NaN;

    if (nonDecimalNotations && ((text.indexOf('0b') === 0) || (text.indexOf('0x') === 0))) {
        return (text.indexOf('0b') === 0) ? parseInt(text.substring(2), 2) : parseInt(text.substring(2), 16);
    }

    let digits = text.replace(',', '.');

    if (precision > 0) {
        if (digits.charAt(digits.length - 1) === '.') digits = digits.substring(0, digits.length - 1);

        if (!VALID_DECIMAL.test(digits)) return NaN;

        for (let i = 0; i < precision; i++) {
            const point = digits.indexOf('.');

            if (point === -1) {
                digits += '0';
            } else {
                digits = swapChars(digits, point, point + 1);

                if (digits.charAt(digits.length - 1) === '.') digits = digits.substring(0, digits.length - 1);
            }
        }
    } else if (precision < 0) {
        for (let i = 0; i > precision; i--) {
            if ((digits === '0') || (digits === '-0') || (digits === '')) break;

            if (digits.charAt(digits.length - 1) !== '0') return NaN;

            digits = digits.substring(0, digits.length - 1);
        }
    }

    const last = digits.charAt(digits.length - 1);

    if (endsWithFive && (last !== '0') && (last !== '5')) return NaN;

    return VALID_INT.test(digits) ? toInt(Number(digits)) : NaN;
};

export type WiredNumberInputResult
    = | { valid: true; value: number }
        | { valid: false; reason: 'invalid' | 'range' };

/** `onTextChange` - the value a text stands for, or why it stands for none. */
export const readNumberInputText = (text: string, rules: WiredNumberInputRules): WiredNumberInputResult => {
    const parsed = parseNumberInputText(text, rules);

    if (Number.isNaN(parsed)) return { valid: false, reason: 'invalid' };

    const shown = toInt(parsed);
    const scale = rules.endsWithFive ? 5 : 1;

    if ((shown < (rules.min * scale)) || (shown > (rules.max * scale))) return { valid: false, reason: 'range' };

    return { valid: true, value: rules.endsWithFive ? toInt(shown / 5) : shown };
};

type Localize = (key: string, fallback: string, replacements?: Record<string, string>) => string;

/** `invalidNumberMessage` / `rangeValidationMessage`, through the caller's localization. */
export const numberInputErrorMessage = (reason: 'invalid' | 'range', rules: WiredNumberInputRules, localize: Localize): string => {
    const scale = rules.endsWithFive ? 5 : 1;
    const min = rules.min * scale;
    const max = rules.max * scale;
    const hasMin = (min !== WIRED_INT_MIN);
    const hasMax = (max !== WIRED_INT_MAX);

    if (reason === 'range') {
        const shownMin = formatNumberInputValue(min, rules.precision);
        const shownMax = formatNumberInputValue(max, rules.precision);

        if (hasMin && hasMax) return localize('wiredfurni.params.number_input.between', 'Number needs to be between %min% and %max%', { min: shownMin, max: shownMax });

        if (hasMin) return localize('wiredfurni.params.number_input.min', 'Number needs to be %min% or higher', { min: shownMin });

        if (hasMax) return localize('wiredfurni.params.number_input.max', 'Number needs to be %max% or lower', { max: shownMax });
    }

    return localize('wiredfurni.params.number_input.invalid', 'Number is invalid');
};
