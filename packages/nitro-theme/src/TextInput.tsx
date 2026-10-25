import { CanvasTextMetrics, Container as PixiContainer, FederatedPointerEvent, FederatedWheelEvent, TextStyleOptions } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Box, BoxLayout } from './Box';
import { FLASH_TEXT_GUTTER, flashTextCaretRect, FlashTextFieldOverrides, flashTextSelectionRects, HABBO_TEXT_STYLES, resolveFlashTextFormat } from './font/flash-text';
import { useLayoutSize, useOutsideClick } from './hooks';
import { useLatest } from './hooks/useLatest';
import type { ScrollController } from './hooks/useScrollController';
import { ColorLayer } from './layer';
import { ThemeText } from './ThemeText';
import { DEFAULT_TEXT_STYLE, escapeMarkup, flashFaceOverride, getPixiTextStyle, resolveFlashStyle, TextStyleKey } from './utils';
import { whenPressCounted } from './utils/clickCount';

/** A run of a `TextInput`'s value, `start` to `end` (exclusive), drawn in `color` (`#rrggbb`). */
export interface TextInputMark {
    start: number;
    end: number;
    color: string;
}

/** The value as markup with each mark in a `<font color>`; marks are taken in order and may not overlap. */
const markedValue = (value: string, marks: readonly TextInputMark[]): string => {
    let markup = '';
    let at = 0;

    for (const mark of [ ...marks ].sort((a, b) => a.start - b.start)) {
        const start = Math.max(at, Math.min(mark.start, value.length));
        const end = Math.max(start, Math.min(mark.end, value.length));

        if (end <= start) continue;

        markup += `${escapeMarkup(value.slice(at, start))}<font color="${mark.color}">${escapeMarkup(value.slice(start, end))}</font>`;
        at = end;
    }

    return markup + escapeMarkup(value.slice(at));
};

/**
 * The scroll a field shares with scrollbars outside it - a Flash layout's own scrollbars, whose
 * `IScrollableWindow` the `TextController` is - one controller per axis they scroll.
 */
export interface TextInputScroll {
    vertical?: ScrollController;
    horizontal?: ScrollController;
    /** `TextField.mouseWheelEnabled`: the wheel over the field scrolls it. */
    wheel?: boolean;
}

export interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    onSelectionChange?: (start: number, end: number) => void;
    selectionAfterChange?: number | null;
    /** With `selectionAfterChange`, the end of a range to select instead of a caret (`TextField.setSelection(begin, end)`). */
    selectionEndAfterChange?: number | null;
    selectionRequestId?: number;
    /** Enter pressed (single-line, or Shift+Enter in multiline). The keyboard event is passed so a caller can read `shiftKey` (the chat input shouts on Shift+Enter). */
    onEnter?: (event: KeyboardEvent) => void;
    /**
     * Every key while focused, before the browser edits the field. Return `true` to say the key
     * was handled and suppress the default edit (the chat input's whisper autocomplete on Space,
     * its `:whisper name ` clearing on Backspace).
     */
    onKeyDown?: (event: KeyboardEvent) => boolean | void;
    /** Controlled focus - when given, the input is focused exactly when this is true and reports changes through `onFocusChange`. */
    focused?: boolean;
    onFocusChange?: (focused: boolean) => void;
    /**
     * `TextFieldController`'s `focus_capturer` var: Flash's `FocusManager` gives the field the
     * keyboard whenever nothing else has it, so what is typed lands in it as typed - any layout's
     * letters, AltGr, dead keys, an IME, the emoji panel. Held that way it still shows unfocused
     * (no caret, the placeholder stays) until a key or an edit arrives; a key that types nothing
     * (Enter, Backspace, the arrows) does nothing then.
     */
    focusCapturer?: boolean;
    /** Shown in `placeholderColor` while the value is empty and the input isn't focused. */
    placeholder?: string;
    placeholderColor?: string;
    maxLength?: number;
    multiline?: boolean;
    /**
     * Whether a multiline field takes line breaks - Enter and pasted ones - which it does unless told
     * otherwise. A Flash field with `word_wrap` but not `multiline` wraps its text yet stays one
     * paragraph: Enter is a key its code hears (`onEnter`), not a new line.
     */
    lineBreaks?: boolean;
    /**
     * Whether a multiline field wraps its lines at the box's width, which it does unless told
     * otherwise. `false` is a Flash input with `multiline` but no `word_wrap` (the floor plan's
     * import/export map): every line stays whole, and the text scrolls on both axes to keep the
     * caret in view, as the `TextField` does.
     */
    wordWrap?: boolean;
    /** Masks the value with bullets (the Flash `display_as_password` text field). */
    password?: boolean;
    fontSize?: number;
    /**
     * A theme text style for the value, `regular` when none is named - a Flash layout's
     * `text_style` var. `fontSize` / `fontFamily` are its `font_size` / `font_face` vars, folded
     * into that style's format the way `ThemeText` folds them, so an override still renders
     * exactly; only a family none of the captured faces covers falls back to canvas text.
     */
    textStyle?: TextStyleKey;
    /** A Flash input's `TextField` vars over its style (`antialias_type`, `sharpness`, `thickness`, ...) - see `ThemeText`. */
    flashFormat?: FlashTextFieldOverrides;
    fontFamily?: string;
    textColor?: string;
    /** The fill behind the field; `null` for none - a Flash input fills only as any window does. */
    backgroundColor?: string | null;
    /** The fill while focused; `null` for none. */
    focusedBackgroundColor?: string | null;
    selectionColor?: string;
    caretColor?: string;
    layout?: BoxLayout;
    /**
     * The `TextField` `border` var with its `border_color`: a 1px rectangle on the field's own
     * edge, inside its box - `TextField` strokes `drawRect(.5, .5, width - 1, height - 1)`, and
     * `TextController` shrinks the field by that pixel so the border stays within the window.
     */
    border?: string;
    /**
     * `TextField.restrict`: the characters the user may enter - ranges (`a-z`), `^` switching
     * between accepting and excluding what follows (a leading `^` accepts everything else), `\`
     * escaping `-`, `^` or `\`. Typed and pasted characters outside it are dropped; a value set
     * from outside is not filtered, as in Flash. See `parseFlashRestrict`.
     */
    restrict?: string;
    /** `false` for a field that shows and selects its text but cannot be edited (a non-`input` `TextField`); no caret. */
    editable?: boolean;
    /**
     * Runs of the value drawn in another colour, as a `TextField` does with `setTextFormat(color,
     * start, end)` - the chat input marking a command argument the server would refuse. Only the
     * colour changes, so the glyphs, the caret and the selection stay where they are. Ignored for
     * a password field and the placeholder.
     */
    marks?: readonly TextInputMark[];
    /**
     * `TextField.alwaysShowSelection`: the selection stays drawn while the field is not focused,
     * in the grey Sulake's `TextField` uses for it (`#888888` at 35%).
     */
    alwaysShowSelection?: boolean;
    /**
     * Places the text the way a Flash input window does (`TextFieldController`: the `TextField`
     * is the whole window): at the field's top-left, inside its 2px gutter, with no vertical
     * centring and no padding of the box's own. Off, a single line is centred with 2px padding.
     */
    flashPlacement?: boolean;
    /**
     * Scrollbars that scroll the field: on each axis it scrolls, the field's scroll is the
     * controller's - its box the viewport, its text the content - rather than worked out from the
     * caret, so a scrollbar can move the text. While focused it still scrolls just far enough to
     * keep the caret in view, as a `TextField` does; a value set from outside leaves it where it is.
     */
    scroll?: TextInputScroll;
}

interface RestrictRule {
    accept: boolean;
    from: number;
    to: number;
}

/**
 * `TextField.restrict` as a character test; `null` (everything allowed) for no restriction, and
 * `''` allows nothing, as in Flash. The last rule a character matches decides; one that no rule
 * matches is accepted only when the string starts with `^`.
 */
const parseFlashRestrict = (restrict: string | undefined): ((char: string) => boolean) | null => {
    if (restrict === undefined) return null;

    const rules: RestrictRule[] = [];
    const chars = Array.from(restrict);
    const acceptByDefault = (chars[0] === '^');
    let accept = true;

    for (let index = 0; index < chars.length; index++) {
        let char = chars[index];

        if (char === '^') {
            accept = !accept;

            continue;
        }

        if (char === '\\' && index + 1 < chars.length) char = chars[++index];

        const from = char.codePointAt(0) ?? 0;
        let to = from;

        if (chars[index + 1] === '-' && index + 2 < chars.length) {
            index += 2;

            let end = chars[index];

            if (end === '\\' && index + 1 < chars.length) end = chars[++index];

            to = end.codePointAt(0) ?? from;
        }

        rules.push({ accept, from: Math.min(from, to), to: Math.max(from, to) });
    }

    return (char: string) => {
        const code = char.codePointAt(0) ?? 0;
        let allowed = acceptByDefault;

        for (const rule of rules) {
            if (code >= rule.from && code <= rule.to) allowed = rule.accept;
        }

        return allowed;
    };
};

interface CaretGeometry {
    x: number;
    y: number;
    height: number;
}

interface SelectionRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

/** The blink period of a native caret (~530ms on, ~530ms off). */
const CARET_BLINK_MS = 530;
const PADDING_X = 2;
/** `alwaysShowSelection`'s colour while the field is not focused - Sulake's `TextField` draws `#888888` at 35%. */
const UNFOCUSED_SELECTION_COLOR = '#888888';
const UNFOCUSED_SELECTION_ALPHA = 0.35;
/** Caret placement on click scans the prefix widths of the line under the pointer; a huge line would make that scan noticeable, so it's capped. */
const MAX_CLICK_SCAN = 500;
/** What a double-click selects around the pointer: a run of letters, digits and `_`. */
const WORD_CHARACTER = /[\p{L}\p{N}_]/u;

/** Keys that only modify another: they leave a held `focusCapturer` field as it is. */
const MODIFIER_KEYS = new Set([ 'Shift', 'Control', 'Alt', 'AltGraph', 'Meta', 'CapsLock', 'NumLock', 'Fn' ]);

/**
 * Whether a key types into a field: one character with no shortcut modifier (Windows reports
 * AltGr as Ctrl+Alt), or the start of a composed one - a dead key, an IME (`Process`), a
 * virtual keyboard (`Unidentified`).
 */
const typesText = (event: KeyboardEvent): boolean => {
    if ((event.key === 'Dead') || (event.key === 'Process') || (event.key === 'Unidentified')) return true;

    if (Array.from(event.key).length !== 1) return false;

    if (event.getModifierState('AltGraph') || (event.ctrlKey && event.altKey)) return true;

    return !event.ctrlKey && !event.metaKey && !event.altKey;
};

/** Nothing on the page has the keyboard - Flash's `stage.focus == null`. */
const keyboardIsFree = (): boolean => {
    const active = document.activeElement;

    return !active || (active === document.body) || (active === document.documentElement);
};

const hiddenInputStyle: Partial<CSSStyleDeclaration> = {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '1px',
    height: '1px',
    opacity: '0',
    pointerEvents: 'none',
    border: '0',
    padding: '0',
    margin: '0',
    outline: 'none',
    resize: 'none',
    overflow: 'hidden',
    fontSize: '16px',
    zIndex: '-1',
};

/**
 * A text field for the Pixi UI. Editing itself is done by a hidden native `<input>` /
 * `<textarea>` parked off-screen: tapping the box focuses it, and from then on the browser owns
 * the keyboard - key repeat, caret movement, Shift-selection, Select All, Copy, Cut, Paste,
 * IME composition - with none of the per-keystroke window listeners the earlier version had to
 * re-attach on every render (the lag). The Pixi side only mirrors: the value through
 * `ThemeText`, the selection as a highlight, and a blinking caret positioned from real glyph
 * metrics - the Flash text layout wherever `ThemeText` draws the value exactly, canvas text
 * metrics only where it falls back to the browser's own text.
 * The mouse works as on a Flash `TextField`: a press places the caret at the nearest glyph
 * boundary, dragging selects from there, Shift with a press extends the selection and a
 * double-click selects the word. A field scrolls to keep the caret in view once the text
 * outgrows the box: a single-line or unwrapped one horizontally, a multiline one vertically.
 *
 * Focus can be controlled from outside (`focused` + `onFocusChange`) - the room chat input
 * grabs focus when the user starts typing anywhere, or when the avatar menu asks it to whisper
 * to someone - and a caller can intercept keys (`onKeyDown`) before the browser edits.
 */
export const TextInput: ForwardRefExoticComponent<TextInputProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TextInputProps>(
    ({ value: rawValue, onChange, onSelectionChange, selectionAfterChange, selectionEndAfterChange, selectionRequestId, onEnter, onKeyDown, focused: controlledFocused, onFocusChange, focusCapturer = false, placeholder, placeholderColor = '#999999', maxLength, multiline = false, lineBreaks = true, wordWrap = true, password = false, fontSize = 12, textStyle, fontFamily, textColor = '#000000', backgroundColor = '#ffffff', focusedBackgroundColor = '#eef6ff', selectionColor = '#b4d5fe', caretColor, layout, border, restrict, editable = true, marks, alwaysShowSelection = false, flashPlacement = false, flashFormat: fieldFormat, scroll }, ref) => {
        // The hidden `<textarea>` holds line breaks as `\n` only, and the Flash text layout breaks
        // lines on `\n` only. A value with Flash's `\r` (the floor plan's map text) would never equal
        // the native value and would be measured as one long line - the caret and the selection
        // landed far from the glyphs Pixi drew on separate lines.
        const value = multiline ? rawValue.replace(/\r\n?/g, '\n') : rawValue;
        const wraps = multiline && wordWrap;
        const [ internalFocused, setInternalFocused ] = useState(false);
        const [ boxNode, setBoxNode ] = useState<PixiContainer | null>(null);
        // `caret` is the selection's moving end: where a drag or Shift+arrow is, `start` when it runs backwards.
        const [ selection, setSelection ] = useState({ start: value.length, end: value.length, caret: value.length });
        const [ caretVisible, setCaretVisible ] = useState(true);
        const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
        const boxRef = useRef<PixiContainer | null>(null);
        const isControlled = (controlledFocused !== undefined);
        const focused = isControlled ? controlledFocused : internalFocused;
        const restrictTest = useMemo(() => parseFlashRestrict(restrict), [ restrict ]);
        const paddingX = flashPlacement ? 0 : PADDING_X;

        const focusedRef = useLatest(focused);
        const onChangeRef = useLatest(onChange);
        const onSelectionChangeRef = useLatest(onSelectionChange);
        const onEnterRef = useLatest(onEnter);
        const onKeyDownRef = useLatest(onKeyDown);
        const onFocusChangeRef = useLatest(onFocusChange);
        const focusCapturerRef = useLatest(focusCapturer);
        const maxLengthRef = useLatest(maxLength);
        const restrictRef = useLatest(restrictTest);

        const setFocused = useCallback((next: boolean) => {
            if (focusedRef.current === next) return;

            // The outside click and the field's own `blur` can both end the focus in one tick, before
            // a render: the ref answers the second at once, so the change is reported once.
            focusedRef.current = next;

            if (!isControlled) setInternalFocused(next);

            onFocusChangeRef.current?.(next);
        }, [ isControlled ]);

        useOutsideClick(boxRef, () => setFocused(false), focused);

        // The inner text area follows the box's laid-out width (the box may be inset-sized).
        const { width: boxWidth, height: boxHeight } = useLayoutSize(boxNode);
        const innerWidth = Math.max(0, boxWidth - (PADDING_X * 2));
        // How far the caret may run before a single line scrolls: the box less its padding, or
        // with Flash placement the whole field less the gutter the text keeps on its right.
        const viewWidth = flashPlacement ? Math.max(0, boxWidth - FLASH_TEXT_GUTTER) : innerWidth;

        const readSelection = useCallback(() => {
            const input = inputRef.current;

            if (!input) return;

            const start = input.selectionStart ?? input.value.length;
            const end = input.selectionEnd ?? start;
            const caret = (input.selectionDirection === 'backward') ? start : end;

            setSelection(prev => ((prev.start === start && prev.end === end && prev.caret === caret) ? prev : { start, end, caret }));
            onSelectionChangeRef.current?.(start, end);
        }, []);

        // The hidden native element that actually does the editing.
        useEffect(() => {
            const input = document.createElement(multiline ? 'textarea' : 'input');

            if (input instanceof HTMLInputElement) input.type = password ? 'password' : 'text';

            Object.assign(input.style, hiddenInputStyle);
            input.setAttribute('aria-hidden', 'true');
            input.setAttribute('autocomplete', 'off');
            input.setAttribute('autocorrect', 'off');
            input.setAttribute('autocapitalize', 'off');
            input.spellcheck = false;
            input.tabIndex = -1;

            if (maxLengthRef.current !== undefined) input.maxLength = maxLengthRef.current;

            const onInput = (event?: Event) => {
                // An IME composition is filtered once it is committed (`compositionend`).
                if ((event instanceof InputEvent) && event.isComposing) return;

                // Text that reached a held `focusCapturer` field without a key (the emoji panel).
                if (!focusedRef.current) setFocused(true);

                const allowed = restrictRef.current;

                if (allowed) {
                    // A line break is the multiline field's own, not a typed character.
                    const keep = (char: string) => (char === '\n') || allowed(char);
                    const filtered = Array.from(input.value).filter(keep).join('');

                    if (filtered !== input.value) {
                        const caret = input.selectionEnd ?? input.value.length;
                        const before = Array.from(input.value.slice(0, caret)).filter(keep).join('').length;

                        input.value = filtered;
                        input.setSelectionRange(before, before);
                    }
                }

                // A field that takes no line breaks drops pasted ones.
                if (multiline && !lineBreaks && /[\r\n]/.test(input.value)) {
                    const caret = input.selectionEnd ?? input.value.length;
                    const before = input.value.slice(0, caret).replace(/[\r\n]/g, '').length;

                    input.value = input.value.replace(/[\r\n]/g, '');
                    input.setSelectionRange(before, before);
                }

                onChangeRef.current(input.value);
                readSelection();
            };
            const onCompositionStart = () => setFocused(true);
            const onCompositionEnd = () => onInput();

            const onKey = (event: KeyboardEvent) => {
                // A held `focusCapturer` field wakes on a key that types; any other key leaves it alone.
                if (!focusedRef.current && focusCapturerRef.current) {
                    if (!typesText(event)) {
                        if (!MODIFIER_KEYS.has(event.key)) event.preventDefault();

                        return;
                    }

                    setFocused(true);
                }

                if (onKeyDownRef.current?.(event)) {
                    event.preventDefault();

                    return;
                }

                if (event.key === 'Enter') {
                    if (multiline && lineBreaks && !event.shiftKey) {
                        // Let the textarea insert the newline, within `maxLength`.
                        const limit = maxLengthRef.current;

                        if (limit !== undefined && input.value.length >= limit) event.preventDefault();

                        return;
                    }

                    event.preventDefault();
                    onEnterRef.current?.(event);

                    return;
                }

                if (event.key === 'Escape') {
                    event.preventDefault();
                    setFocused(false);
                }
            };

            const onBlur = () => setFocused(false);
            const keepFocusOnCanvas = (event: MouseEvent) => {
                if (document.activeElement === input && event.target instanceof HTMLCanvasElement) event.preventDefault();
            };
            const onSelectionChange = () => {
                if (document.activeElement === input) readSelection();
            };

            input.addEventListener('input', onInput);
            input.addEventListener('compositionstart', onCompositionStart);
            input.addEventListener('compositionend', onCompositionEnd);
            input.addEventListener('keydown', onKey);
            input.addEventListener('keyup', readSelection);
            input.addEventListener('mouseup', readSelection);
            input.addEventListener('select', readSelection);
            input.addEventListener('blur', onBlur);
            document.addEventListener('selectionchange', onSelectionChange);
            document.addEventListener('mousedown', keepFocusOnCanvas, true);
            document.body.appendChild(input);
            inputRef.current = input;

            return () => {
                input.removeEventListener('input', onInput);
                input.removeEventListener('compositionstart', onCompositionStart);
                input.removeEventListener('compositionend', onCompositionEnd);
                input.removeEventListener('keydown', onKey);
                input.removeEventListener('keyup', readSelection);
                input.removeEventListener('mouseup', readSelection);
                input.removeEventListener('select', readSelection);
                input.removeEventListener('blur', onBlur);
                document.removeEventListener('selectionchange', onSelectionChange);
                document.removeEventListener('mousedown', keepFocusOnCanvas, true);
                input.remove();

                if (inputRef.current === input) inputRef.current = null;
            };
        }, [ multiline, lineBreaks, password, readSelection, setFocused ]);

        // A read-only field still focuses and selects - `TextField.type` `dynamic` with `selectable`.
        useEffect(() => {
            const input = inputRef.current;

            if (input) input.readOnly = !editable;
        }, [ editable, multiline, password ]);

        useEffect(() => {
            const input = inputRef.current;

            if (!input) return;

            if (maxLength !== undefined) input.maxLength = maxLength;
            else input.removeAttribute('maxlength');
        }, [ maxLength ]);

        // A value set from outside (the chat's whisper pre-fill, a caller clearing the field)
        // lands in the native element with the caret at its end. A requested selection
        // (`selectionAfterChange`) is applied once, when its `selectionRequestId` is new: held on
        // to, it pulled the caret back to it on every key typed after it (the Message Editor's
        // B / I / U / Align / placeholder buttons left one behind, and typing went to the end).
        const appliedRequestRef = useRef<number | undefined>(undefined);

        useEffect(() => {
            const input = inputRef.current;

            if (!input) return;

            const clamp = (index: number) => Math.max(0, Math.min(index, value.length));
            const rangeEnd = (caret: number) => ((selectionEndAfterChange == null) ? caret : Math.max(caret, clamp(selectionEndAfterChange)));
            const requested = ((selectionAfterChange != null) && (appliedRequestRef.current !== selectionRequestId)) ? clamp(selectionAfterChange) : null;

            appliedRequestRef.current = selectionRequestId;

            if (input.value === value) {
                if (requested !== null) {
                    input.setSelectionRange(requested, rangeEnd(requested));
                    readSelection();
                }

                return;
            }

            input.value = value;
            const caret = requested ?? value.length;
            input.setSelectionRange(caret, rangeEnd(caret));
            readSelection();
        }, [ value, readSelection, selectionAfterChange, selectionEndAfterChange, selectionRequestId ]);

        useEffect(() => {
            const input = inputRef.current;

            if (!input) return;

            if (focused) {
                if (document.activeElement !== input) input.focus({ preventScroll: true });

                readSelection();
            } else if (document.activeElement === input) {
                input.blur();
            }
        }, [ focused, readSelection ]);

        /*
         * `focusCapturer` - `FocusManager`: the field takes the keyboard when it is registered and
         * whenever focus is left with nothing (`activate`, `focusOut`). A touch screen is skipped: its
         * keyboard would open on every tap. A key that finds the keyboard free anyway still moves it
         * here before the browser types it, so the key's own text arrives rather than `event.key`.
         */
        useEffect(() => {
            const input = inputRef.current;

            if (!focusCapturer || !editable || !input) return;

            const holds = !window.matchMedia?.('(hover: none)').matches;
            let timer: ReturnType<typeof setTimeout> | undefined;

            const hold = () => {
                if (holds && keyboardIsFree()) input.focus({ preventScroll: true });
            };
            const onFocusOut = () => {
                clearTimeout(timer);
                timer = setTimeout(hold, 0);
            };
            const onWindowKeyDown = (event: KeyboardEvent) => {
                if (event.defaultPrevented || !keyboardIsFree() || !typesText(event)) return;

                input.focus({ preventScroll: true });
                setFocused(true);
            };

            hold();
            window.addEventListener('focus', hold);
            window.addEventListener('keydown', onWindowKeyDown);
            document.addEventListener('focusout', onFocusOut);

            return () => {
                clearTimeout(timer);
                window.removeEventListener('focus', hold);
                window.removeEventListener('keydown', onWindowKeyDown);
                document.removeEventListener('focusout', onFocusOut);

                if ((document.activeElement === input) && !focusedRef.current) input.blur();
            };
        }, [ focusCapturer, editable, multiline, lineBreaks, password, setFocused ]);

        // The caret blinks while focused and shows solid again right after any edit or caret move.
        useEffect(() => {
            if (!focused) return;

            setCaretVisible(true);

            const interval = setInterval(() => setCaretVisible(visible => !visible), CARET_BLINK_MS);

            return () => clearInterval(interval);
        }, [ focused, value, selection ]);

        // The field's own vars go over its style, as `TextController.setTextFormatting` layers them;
        // compared by value, since a view writes them as an object literal.
        const fieldKey = fieldFormat ? JSON.stringify(fieldFormat) : '';
        const wrapWidth = Math.max(1, innerWidth);
        const textOptions = useMemo<TextStyleOptions>(() => ({
            fill: textColor,
            // Only defined overrides: an `undefined` family would replace the base style's font (and break canvas measuring).
            ...(textStyle ? {} : { fontSize }),
            ...((!textStyle && fontFamily) ? { fontFamily } : {}),
            ...(wraps ? { wordWrap: true, wordWrapWidth: wrapWidth, breakWords: true } : {}),
        }), [ textColor, textStyle, fontSize, fontFamily, wraps, wrapWidth ]);
        /*
         * The format the value below is actually drawn in. `ThemeText` renders every field
         * exactly - a style it names or `regular` otherwise, with the `font_face` / `font_size`
         * overrides in `textOptions` folded into that format, not dropped to canvas text - so
         * the caret and the selection have to be measured in the same format or they land in
         * the browser's metrics while the glyphs are in Flash's: two pixels of `TextField`
         * gutter out before the first character, and drifting further with every one after it.
         * `undefined` only where `ThemeText` itself cannot render exactly (`resolveFlashStyle`):
         * a family none of the captured faces covers.
         */
        const flashStyle = resolveFlashStyle(textStyle, textOptions);
        const flashFormat = useMemo(() => (flashStyle
            ? resolveFlashTextFormat({
                    style: HABBO_TEXT_STYLES[flashStyle],
                    field: fieldKey ? JSON.parse(fieldKey) as FlashTextFieldOverrides : undefined,
                    face: flashFaceOverride(textOptions.fontFamily),
                    fontSize: (typeof textOptions.fontSize === 'number') ? textOptions.fontSize : undefined,
                })
            : undefined), [ flashStyle, textOptions, fieldKey ]);

        const measureStyle = useMemo(() => getPixiTextStyle(textStyle ?? DEFAULT_TEXT_STYLE, textOptions), [ textStyle, textOptions ]);

        /** Caret geometry in the text's own space - the Flash text layout wherever the value renders exactly (its 2px `TextField` gutter included), canvas metrics only where it does not. */
        const measureCaret = useCallback((text: string, index: number): CaretGeometry => {
            index = Math.max(0, Math.min(index, text.length));

            // `null` for a character the captured fonts do not carry - ThemeText draws canvas text then, so measure that.
            const flashRect = flashFormat ? flashTextCaretRect(text, index, flashFormat, { wordWrap: wraps, wrapWidth: wraps ? wrapWidth : undefined, breakWords: wraps }) : null;

            if (flashRect) return { x: flashRect.x, y: flashRect.y, height: flashRect.height };

            const metrics = CanvasTextMetrics.measureText(text.length ? text : ' ', measureStyle);

            if (!multiline || metrics.lines.length <= 1) {
                const width = index > 0 ? CanvasTextMetrics.measureText(text.slice(0, index), measureStyle).width : 0;

                return { x: width, y: 0, height: metrics.lineHeight };
            }

            // Wrapped text: find the line holding `index` (wrapping consumes the break character).
            let consumed = 0;

            for (let i = 0; i < metrics.lines.length; i++) {
                const line = metrics.lines[i];
                const isLast = (i === metrics.lines.length - 1);
                const lineEnd = consumed + line.length;

                if (index <= lineEnd || isLast) {
                    const column = Math.max(0, Math.min(index - consumed, line.length));
                    const width = column > 0 ? CanvasTextMetrics.measureText(line.slice(0, column), measureStyle).width : 0;

                    return { x: width, y: i * metrics.lineHeight, height: metrics.lineHeight };
                }

                consumed = lineEnd + 1;
            }

            return { x: 0, y: 0, height: metrics.lineHeight };
        }, [ flashFormat, measureStyle, multiline, wraps, wrapWidth ]);

        const measureSelection = useCallback((text: string, start: number, end: number): SelectionRect[] => {
            if (start === end) return [];

            const flashRects = flashFormat ? flashTextSelectionRects(text, start, end, flashFormat, { wordWrap: wraps, wrapWidth: wraps ? wrapWidth : undefined, breakWords: wraps }) : null;

            if (flashRects) return flashRects;

            const from = measureCaret(text, start);
            const to = measureCaret(text, end);

            if (from.y === to.y) return [ { x: from.x, y: from.y, width: Math.max(1, to.x - from.x), height: from.height } ];

            // Spanning lines: first line to its end, full middle lines, last line from its start.
            const rects: SelectionRect[] = [];
            const lineHeight = from.height;

            rects.push({ x: from.x, y: from.y, width: Math.max(1, wrapWidth - from.x), height: lineHeight });

            for (let y = from.y + lineHeight; y < to.y; y += lineHeight) rects.push({ x: 0, y, width: wrapWidth, height: lineHeight });

            rects.push({ x: 0, y: to.y, width: Math.max(1, to.x), height: lineHeight });

            return rects;
        }, [ flashFormat, measureCaret, wraps, wrapWidth ]);

        const displayValue = password ? '•'.repeat(value.length) : value;
        const showPlaceholder = !value.length && !focused && !!placeholder;
        const showMarks = !password && !!marks?.length;
        const selectionStart = Math.min(selection.start, value.length);
        const selectionEnd = Math.min(selection.end, value.length);
        const selectionCaret = Math.min(selection.caret, value.length);
        const caret = useMemo(() => measureCaret(displayValue, selectionCaret), [ measureCaret, displayValue, selectionCaret ]);
        const showSelection = focused || alwaysShowSelection;
        const selectionRects = useMemo(() => (showSelection ? measureSelection(displayValue, Math.min(selectionStart, selectionEnd), Math.max(selectionStart, selectionEnd)) : []), [ showSelection, measureSelection, displayValue, selectionStart, selectionEnd ]);

        // Unwrapped: slide the text left so the caret stays inside the box; multiline: slide it up.
        // An axis a scrollbar scrolls takes its controller's offset instead.
        const viewHeight = flashPlacement ? Math.max(0, boxHeight - FLASH_TEXT_GUTTER) : boxHeight;
        const scrollHorizontal = scroll?.horizontal;
        const scrollVertical = scroll?.vertical;
        const scrollX = scrollHorizontal ? scrollHorizontal.scrollOffset : ((!wraps && viewWidth > 0 && caret.x > (viewWidth - 1)) ? (caret.x - (viewWidth - 1)) : 0);
        const scrollY = scrollVertical ? scrollVertical.scrollOffset : ((multiline && viewHeight > 0 && (caret.y + caret.height) > viewHeight) ? ((caret.y + caret.height) - viewHeight) : 0);

        const scrollRef = useLatest({ scrollHorizontal, scrollVertical, viewWidth, viewHeight });

        // A controlled axis follows the caret while the field is focused, by as little as keeps it in
        // view. Two frames on, so the range it clamps to has the edit that moved the caret laid out (as
        // `ScrollArea`'s `scrollV` waits). Not
        // for the focus itself: the caret read as the field takes it is the one it had, which a click
        // then moves - following it would scroll to where the field last left off.
        const followFocusedRef = useRef(false);

        useEffect(() => {
            const gainedFocus = focused && !followFocusedRef.current;

            followFocusedRef.current = focused;

            if (!focused || gainedFocus) return;

            let second = 0;
            const first = requestAnimationFrame(() => (second = requestAnimationFrame(() => {
                const { scrollHorizontal: horizontal, scrollVertical: vertical, viewWidth: width, viewHeight: height } = scrollRef.current;

                if (horizontal && (width > 0)) {
                    const offset = horizontal.scrollOffset;

                    if (caret.x < offset) horizontal.scrollTo(caret.x);
                    else if (caret.x > (offset + width - 1)) horizontal.scrollTo(caret.x - (width - 1));
                }

                if (vertical && (height > 0)) {
                    const offset = vertical.scrollOffset;

                    if (caret.y < offset) vertical.scrollTo(caret.y);
                    else if ((caret.y + caret.height) > (offset + height)) vertical.scrollTo((caret.y + caret.height) - height);
                }
            })));

            return () => {
                cancelAnimationFrame(first);
                cancelAnimationFrame(second);
            };
        }, [ focused, caret ]);

        // The box is the scrolled viewport and the text box the content; stable, so a render does not
        // hand the controllers `null` and the node again.
        const horizontalViewportRef = scrollHorizontal?.viewportRef;
        const verticalViewportRef = scrollVertical?.viewportRef;
        const horizontalContentRef = scrollHorizontal?.contentRef;
        const verticalContentRef = scrollVertical?.contentRef;
        const attachBox = useCallback((node: PixiContainer | null) => {
            boxRef.current = node;
            setBoxNode(node);
            horizontalViewportRef?.(node);
            verticalViewportRef?.(node);
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
        }, [ ref, horizontalViewportRef, verticalViewportRef ]);
        const attachContent = useCallback((node: PixiContainer | null) => {
            horizontalContentRef?.(node);
            verticalContentRef?.(node);
        }, [ horizontalContentRef, verticalContentRef ]);

        const onWheel = scroll?.wheel ? (event: FederatedWheelEvent) => (scrollVertical ?? scrollHorizontal)?.onWheel(event) : undefined;

        /** The glyph boundary nearest a point in the box's own space. */
        const indexAt = (local: { x: number; y: number }): number => {
            if (!value.length) return 0;

            const targetX = (local.x - paddingX) + scrollX;
            const targetY = local.y + scrollY;

            /** The first index whose caret satisfies `test` - the caret's line only moves down as the index grows. */
            const firstIndex = (test: (geometry: CaretGeometry) => boolean) => {
                let low = 0;
                let high = value.length;

                while (low < high) {
                    const middle = (low + high) >> 1;

                    if (test(measureCaret(displayValue, middle))) high = middle;
                    else low = middle + 1;
                }

                return low;
            };

            // The line under the pointer - the last one when the pointer is below the text - from its first index.
            const lineY = multiline ? measureCaret(displayValue, firstIndex(geometry => (geometry.y + geometry.height) > targetY)).y : 0;
            const lineStart = multiline ? firstIndex(geometry => geometry.y >= lineY) : 0;
            const limit = Math.min(value.length, lineStart + MAX_CLICK_SCAN);

            let bestIndex = value.length;
            let bestDistance = Number.POSITIVE_INFINITY;

            for (let i = lineStart; i <= limit; i++) {
                const geometry = measureCaret(displayValue, i);

                if (multiline && (geometry.y !== lineY)) break;

                const distance = Math.abs(geometry.x - targetX);

                if (distance < bestDistance) {
                    bestDistance = distance;
                    bestIndex = i;
                }
            }

            return bestIndex;
        };

        // A drag measures against the layout and scroll of the latest render, not the press's.
        const indexAtRef = useLatest(indexAt);

        const stopDragRef = useRef<(() => void) | null>(null);

        useEffect(() => () => stopDragRef.current?.(), []);

        /** From `anchor` to `to`, the caret at `to`. */
        const select = (input: HTMLInputElement | HTMLTextAreaElement, anchor: number, to: number) => {
            input.setSelectionRange(Math.min(anchor, to), Math.max(anchor, to), (to < anchor) ? 'backward' : 'forward');
            readSelection();
        };

        /** A press places the caret (Shift: extends the selection to it), a drag selects, a double-click takes the word. */
        const onPointerDown = (event: FederatedPointerEvent) => {
            if (event.button !== 0) return;

            const input = inputRef.current;
            const node = boxRef.current;
            const wasFocused = focusedRef.current;

            if (input && editable && document.activeElement !== input) input.focus({ preventScroll: true });

            setFocused(true);

            if (!input || !node || (document.activeElement !== input)) return;

            const index = indexAt(event.getLocalPosition(node));
            const anchor = (event.shiftKey && wasFocused)
                ? ((input.selectionDirection === 'backward') ? (input.selectionEnd ?? index) : (input.selectionStart ?? index))
                : index;

            select(input, anchor, index);

            stopDragRef.current?.();

            const onMove = (move: FederatedPointerEvent) => select(input, anchor, indexAtRef.current(move.getLocalPosition(node)));
            const stop = () => {
                node.off('globalpointermove', onMove);
                window.removeEventListener('pointerup', stop);
                stopDragRef.current = null;
            };

            node.on('globalpointermove', onMove);
            window.addEventListener('pointerup', stop);
            stopDragRef.current = stop;

            // The OS's double click (the second press of each pair, as `TextField` counts it) takes the word instead.
            if (event.shiftKey) return;

            whenPressCounted(event, (count) => {
                if ((count % 2) !== 0) return;

                const text = input.value;
                let start = index;
                let end = index;

                while ((start > 0) && WORD_CHARACTER.test(text[start - 1])) start--;
                while ((end < text.length) && WORD_CHARACTER.test(text[end])) end++;

                stop();
                select(input, start, end);
            });
        };

        const fill = focused ? focusedBackgroundColor : backgroundColor;

        return (
            <Box
                ref={attachBox}
                cursor="text"
                onPointerDown={onPointerDown}
                onWheel={onWheel}
                // Yoga defaults to a row, so the vertical axis is the cross axis: `alignItems` centres a single line.
                layout={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: (multiline || flashPlacement) ? 'flex-start' : 'center', paddingLeft: paddingX, paddingRight: paddingX, overflow: 'hidden', ...layout }}
            >
                {fill && <ColorLayer color={fill} />}
                {/* Each edge states its length: insets alone leave a `Graphics` leaf at its intrinsic 1x1, which drew only the corners. */}
                {border && (
                    <>
                        <ColorLayer
                            color={border}
                            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: 1 }}
                        />
                        <ColorLayer
                            color={border}
                            layout={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 1 }}
                        />
                        <ColorLayer
                            color={border}
                            layout={{ position: 'absolute', left: 0, top: 0, width: 1, height: '100%' }}
                        />
                        <ColorLayer
                            color={border}
                            layout={{ position: 'absolute', right: 0, top: 0, width: 1, height: '100%' }}
                        />
                    </>
                )}
                {/* `ThemeText` renders nothing for an empty value, so the line height keeps this box (and the caret) centred. */}
                <Box
                    ref={attachContent}
                    layout={{ position: 'relative', flexDirection: 'row', marginLeft: -scrollX, marginTop: -scrollY, flexShrink: 0, minWidth: 1, minHeight: Math.max(1, caret.height) }}
                >
                    {selectionRects.map((rect, index) => (
                        <ColorLayer
                            key={index}
                            color={focused ? selectionColor : UNFOCUSED_SELECTION_COLOR}
                            alpha={focused ? undefined : UNFOCUSED_SELECTION_ALPHA}
                            layout={{ position: 'absolute', left: rect.x, top: rect.y, width: rect.width, height: rect.height }}
                        />
                    ))}
                    <ThemeText
                        text={showPlaceholder ? placeholder : (showMarks ? markedValue(displayValue, marks ?? []) : displayValue)}
                        markup={!showPlaceholder && showMarks}
                        textStyle={textStyle ?? DEFAULT_TEXT_STYLE}
                        textOptions={showPlaceholder ? { ...textOptions, fill: placeholderColor } : textOptions}
                        flashFormat={fieldFormat}
                    />
                    {focused && editable && caretVisible && (
                        <ColorLayer
                            color={caretColor ?? textColor}
                            layout={{ position: 'absolute', left: caret.x, top: caret.y, width: 1, height: Math.max(1, caret.height) }}
                        />
                    )}
                </Box>
            </Box>
        );
    },
);

TextInput.displayName = 'TextInput';
