import { CanvasTextMetrics, Container as PixiContainer, FederatedPointerEvent, TextStyleOptions } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Box, BoxLayout } from './Box';
import { FLASH_TEXT_GUTTER, flashTextCaretRect, FlashTextFieldOverrides, flashTextSelectionRects, HABBO_TEXT_STYLES, resolveFlashTextFormat } from './font/flash-text';
import { useLayoutSize, useOutsideClick } from './hooks';
import { ColorLayer } from './layer';
import { ThemeText } from './ThemeText';
import { DEFAULT_TEXT_STYLE, flashFaceOverride, getPixiTextStyle, resolveFlashStyle, TextStyleKey } from './utils';

export interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
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
    /** Shown in `placeholderColor` while the value is empty and the input isn't focused. */
    placeholder?: string;
    placeholderColor?: string;
    maxLength?: number;
    multiline?: boolean;
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
/** Caret placement on click scans prefix widths; a huge value would make that scan noticeable, so it's capped. */
const MAX_CLICK_SCAN = 500;

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
 * A click places the caret at the nearest glyph boundary, and a single-line field scrolls
 * horizontally to keep the caret in view once the text outgrows the box.
 *
 * Focus can be controlled from outside (`focused` + `onFocusChange`) - the room chat input
 * grabs focus when the user starts typing anywhere, or when the avatar menu asks it to whisper
 * to someone - and a caller can intercept keys (`onKeyDown`) before the browser edits.
 */
export const TextInput: ForwardRefExoticComponent<TextInputProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TextInputProps>(
    ({ value, onChange, onEnter, onKeyDown, focused: controlledFocused, onFocusChange, placeholder, placeholderColor = '#999999', maxLength, multiline = false, password = false, fontSize = 12, textStyle, fontFamily, textColor = '#000000', backgroundColor = '#ffffff', focusedBackgroundColor = '#eef6ff', selectionColor = '#b4d5fe', caretColor, layout, border, restrict, editable = true, alwaysShowSelection = false, flashPlacement = false, flashFormat: fieldFormat }, ref) => {
        const [ internalFocused, setInternalFocused ] = useState(false);
        const [ boxNode, setBoxNode ] = useState<PixiContainer | null>(null);
        const [ selection, setSelection ] = useState({ start: value.length, end: value.length });
        const [ caretVisible, setCaretVisible ] = useState(true);
        const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
        const boxRef = useRef<PixiContainer | null>(null);
        const isControlled = (controlledFocused !== undefined);
        const focused = isControlled ? controlledFocused : internalFocused;
        const focusedRef = useRef(focused);
        const onChangeRef = useRef(onChange);
        const onEnterRef = useRef(onEnter);
        const onKeyDownRef = useRef(onKeyDown);
        const onFocusChangeRef = useRef(onFocusChange);
        const maxLengthRef = useRef(maxLength);
        const restrictTest = useMemo(() => parseFlashRestrict(restrict), [ restrict ]);
        const restrictRef = useRef(restrictTest);
        const paddingX = flashPlacement ? 0 : PADDING_X;

        useEffect(() => {
            focusedRef.current = focused;
            onChangeRef.current = onChange;
            onEnterRef.current = onEnter;
            onKeyDownRef.current = onKeyDown;
            onFocusChangeRef.current = onFocusChange;
            maxLengthRef.current = maxLength;
            restrictRef.current = restrictTest;
        });

        const setFocused = useCallback((next: boolean) => {
            if (focusedRef.current === next) return;

            if (!isControlled) setInternalFocused(next);

            onFocusChangeRef.current?.(next);
        }, [ isControlled ]);

        useOutsideClick(boxRef, () => setFocused(false), focused);

        // The inner text area follows the box's laid-out width (the box may be inset-sized); works on both render targets.
        const { width: boxWidth } = useLayoutSize(boxNode);
        const innerWidth = Math.max(0, boxWidth - (PADDING_X * 2));
        // How far the caret may run before a single line scrolls: the box less its padding, or
        // with Flash placement the whole field less the gutter the text keeps on its right.
        const viewWidth = flashPlacement ? Math.max(0, boxWidth - FLASH_TEXT_GUTTER) : innerWidth;

        const readSelection = useCallback(() => {
            const input = inputRef.current;

            if (!input) return;

            const start = input.selectionStart ?? input.value.length;
            const end = input.selectionEnd ?? start;

            setSelection(prev => ((prev.start === start && prev.end === end) ? prev : { start, end }));
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

                onChangeRef.current(input.value);
                readSelection();
            };
            const onCompositionEnd = () => onInput();

            const onKey = (event: KeyboardEvent) => {
                if (onKeyDownRef.current?.(event)) {
                    event.preventDefault();

                    return;
                }

                if (event.key === 'Enter') {
                    if (multiline && !event.shiftKey) {
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
            const onSelectionChange = () => {
                if (document.activeElement === input) readSelection();
            };

            input.addEventListener('input', onInput);
            input.addEventListener('compositionend', onCompositionEnd);
            input.addEventListener('keydown', onKey);
            input.addEventListener('keyup', readSelection);
            input.addEventListener('mouseup', readSelection);
            input.addEventListener('select', readSelection);
            input.addEventListener('blur', onBlur);
            document.addEventListener('selectionchange', onSelectionChange);
            document.body.appendChild(input);
            inputRef.current = input;

            return () => {
                input.removeEventListener('input', onInput);
                input.removeEventListener('compositionend', onCompositionEnd);
                input.removeEventListener('keydown', onKey);
                input.removeEventListener('keyup', readSelection);
                input.removeEventListener('mouseup', readSelection);
                input.removeEventListener('select', readSelection);
                input.removeEventListener('blur', onBlur);
                document.removeEventListener('selectionchange', onSelectionChange);
                input.remove();

                if (inputRef.current === input) inputRef.current = null;
            };
        }, [ multiline, password, readSelection, setFocused ]);

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
        // lands in the native element with the caret at its end.
        useEffect(() => {
            const input = inputRef.current;

            if (!input || input.value === value) return;

            input.value = value;
            input.setSelectionRange(value.length, value.length);
            readSelection();
        }, [ value, readSelection ]);

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
            ...(multiline ? { wordWrap: true, wordWrapWidth: wrapWidth, breakWords: true } : {}),
        }), [ textColor, textStyle, fontSize, fontFamily, multiline, wrapWidth ]);
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
            const flashRect = flashFormat ? flashTextCaretRect(text, index, flashFormat, { wordWrap: multiline, wrapWidth: multiline ? wrapWidth : undefined, breakWords: multiline }) : null;

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
        }, [ flashFormat, measureStyle, multiline, wrapWidth ]);

        const measureSelection = useCallback((text: string, start: number, end: number): SelectionRect[] => {
            if (start === end) return [];

            const flashRects = flashFormat ? flashTextSelectionRects(text, start, end, flashFormat, { wordWrap: multiline, wrapWidth: multiline ? wrapWidth : undefined, breakWords: multiline }) : null;

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
        }, [ flashFormat, measureCaret, multiline, wrapWidth ]);

        const displayValue = password ? '•'.repeat(value.length) : value;
        const showPlaceholder = !value.length && !focused && !!placeholder;
        const selectionStart = Math.min(selection.start, value.length);
        const selectionEnd = Math.min(selection.end, value.length);
        const caret = useMemo(() => measureCaret(displayValue, selectionEnd), [ measureCaret, displayValue, selectionEnd ]);
        const showSelection = focused || alwaysShowSelection;
        const selectionRects = useMemo(() => (showSelection ? measureSelection(displayValue, Math.min(selectionStart, selectionEnd), Math.max(selectionStart, selectionEnd)) : []), [ showSelection, measureSelection, displayValue, selectionStart, selectionEnd ]);

        // Single-line: slide the text left so the caret stays inside the box.
        const scrollX = (!multiline && viewWidth > 0 && caret.x > (viewWidth - 1)) ? (caret.x - (viewWidth - 1)) : 0;

        /** A click lands the caret on the nearest glyph boundary. */
        const onPointerTap = (event: FederatedPointerEvent) => {
            const input = inputRef.current;
            const node = boxRef.current;

            setFocused(true);

            if (!input || !node || !value.length) return;

            const local = event.getLocalPosition(node);
            const targetX = (local.x - paddingX) + scrollX;
            const limit = Math.min(value.length, MAX_CLICK_SCAN);

            let bestIndex = value.length;
            let bestDistance = Number.POSITIVE_INFINITY;

            for (let i = 0; i <= limit; i++) {
                const geometry = measureCaret(displayValue, i);

                if (multiline && (local.y < geometry.y || local.y > geometry.y + geometry.height)) continue;

                const distance = Math.abs(geometry.x - targetX);

                if (distance < bestDistance) {
                    bestDistance = distance;
                    bestIndex = i;
                }
            }

            // The focus effect runs after this handler; queue the caret so it isn't reset by it.
            setTimeout(() => {
                if (document.activeElement === input) {
                    input.setSelectionRange(bestIndex, bestIndex);
                    readSelection();
                }
            }, 0);
        };

        const fill = focused ? focusedBackgroundColor : backgroundColor;

        return (
            <Box
                ref={(node) => {
                    boxRef.current = node;
                    setBoxNode(node);
                    if (typeof ref === 'function') ref(node);
                    else if (ref) ref.current = node;
                }}
                cursor="text"
                onPointerTap={onPointerTap}
                // Yoga defaults to a row, so the vertical axis is the cross axis: `alignItems` centres a single line.
                layout={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: (multiline || flashPlacement) ? 'flex-start' : 'center', paddingLeft: paddingX, paddingRight: paddingX, overflow: 'hidden', ...layout }}
            >
                {fill && <ColorLayer color={fill} />}
                {border && (
                    <>
                        <ColorLayer
                            color={border}
                            layout={{ position: 'absolute', left: 0, top: 0, right: 0, height: 1 }}
                        />
                        <ColorLayer
                            color={border}
                            layout={{ position: 'absolute', left: 0, bottom: 0, right: 0, height: 1 }}
                        />
                        <ColorLayer
                            color={border}
                            layout={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1 }}
                        />
                        <ColorLayer
                            color={border}
                            layout={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 1 }}
                        />
                    </>
                )}
                {/* `ThemeText` renders nothing for an empty value, so the line height keeps this box (and the caret) centred. */}
                <Box layout={{ position: 'relative', flexDirection: 'row', marginLeft: -scrollX, flexShrink: 0, minWidth: 1, minHeight: Math.max(1, caret.height) }}>
                    {selectionRects.map((rect, index) => (
                        <ColorLayer
                            key={index}
                            color={focused ? selectionColor : UNFOCUSED_SELECTION_COLOR}
                            alpha={focused ? undefined : UNFOCUSED_SELECTION_ALPHA}
                            layout={{ position: 'absolute', left: rect.x, top: rect.y, width: rect.width, height: rect.height }}
                        />
                    ))}
                    <ThemeText
                        text={showPlaceholder ? placeholder : displayValue}
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
