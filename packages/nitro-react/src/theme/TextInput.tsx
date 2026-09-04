import { GetRenderer } from '@nitrodevco/nitro-renderer';
import { Container as PixiContainer, FederatedPointerEvent, Graphics as PixiGraphics, Point } from 'pixi.js';
import { ChangeEvent, CSSProperties, forwardRef, ForwardRefExoticComponent, KeyboardEvent as ReactKeyboardEvent, Ref, RefAttributes, useEffect, useMemo, useRef, useState } from 'react';

import { Box, BoxLayout } from './Box';
import { boxLayoutToStyle, getDomTextStyle } from './dom';
import { createTextGeometry, TextCaretRect, TextGeometry } from './font/textGeometry';
import { useOutsideClick } from './hooks';
import { ColorLayer } from './layer';
import { ThemeText } from './ThemeText';
import { FillLayout, getRenderMode } from './utils';

export interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    /** Enter on a single-line field, Shift+Enter on a `multiline` one (plain Enter inserts a newline there). */
    onEnter?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    maxLength?: number;
    multiline?: boolean;
    /** Hint drawn in `placeholderColor` while `value` is empty - a DOM input's `placeholder`. */
    placeholder?: string;
    placeholderColor?: string;
    /** Masks every character as a bullet - `<input type="password">`. */
    password?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    /** A raw pixel size switches the text to native canvas rendering at that size (see
     *  `resolveHabboKey`); left out, the field draws with the theme's own truffle
     *  `text-style-regular` preset, like every label around it. */
    fontSize?: number;
    textColor?: string;
    backgroundColor?: string;
    /** Defaults to `textColor`, like a DOM caret. */
    caretColor?: string;
    selectionColor?: string;
    layout?: BoxLayout;
}

const TEXT_STYLE = 'text-style-regular';
/** Chrome's caret blink period. */
const CARET_BLINK_MS = 530;
const CARET_WIDTH = 1;
const PASSWORD_MASK = '•';
const DEFAULT_PLACEHOLDER_COLOR = '#888888';
const DEFAULT_SELECTION_COLOR = '#b3d7ff';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const isWhitespace = (character: string | undefined) => !!character && /\s/.test(character);

/** Ctrl+Left / Ctrl+Backspace target: back over any whitespace, then over the word before it. */
const wordStartBefore = (text: string, index: number) => {
    let cursor = index;

    while (cursor > 0 && isWhitespace(text[cursor - 1])) cursor--;
    while (cursor > 0 && !isWhitespace(text[cursor - 1])) cursor--;

    return cursor;
};

/** Ctrl+Right / Ctrl+Delete target: forward over any whitespace, then over the word after it. */
const wordEndAfter = (text: string, index: number) => {
    let cursor = index;

    while (cursor < text.length && isWhitespace(text[cursor])) cursor++;
    while (cursor < text.length && !isWhitespace(text[cursor])) cursor++;

    return cursor;
};

/** A real DOM field elsewhere on the page (the chat bar, a DOM-mode dialog) owns the keyboard
 *  while it has focus - this field's window-level listeners must not also consume its keys. */
const domFieldHasFocus = () => {
    const active = document.activeElement;

    return active instanceof HTMLElement && (active.isContentEditable || active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT');
};

interface Scroll {
    x: number;
    y: number;
}

/** The scroll offset that keeps the caret inside a `viewport`-sized window over the text - a
 *  DOM input's own "scroll the caret into view" (no scroll past the text's end, and no
 *  vertical scroll at all on a single-line field). Integer results so the masked clip edge and
 *  the pixel-snapped text can't straddle a sub-pixel boundary (see `ScrollViewport.tsx`). */
const revealCaret = (previous: Scroll, caret: TextCaretRect, geometry: TextGeometry, viewport: { width: number; height: number }, multiline: boolean): Scroll => {
    if (!viewport.width || !viewport.height) return previous;

    let { x, y } = previous;

    if (caret.x < x) x = Math.floor(caret.x);
    if (caret.x + CARET_WIDTH > x + viewport.width) x = Math.ceil(caret.x + CARET_WIDTH - viewport.width);
    x = clamp(x, 0, Math.max(0, Math.ceil(geometry.width + CARET_WIDTH - viewport.width)));

    if (multiline) {
        if (caret.y < y) y = Math.floor(caret.y);
        if (caret.y + caret.height > y + viewport.height) y = Math.ceil(caret.y + caret.height - viewport.height);
        y = clamp(y, 0, Math.max(0, Math.ceil(geometry.height - viewport.height)));
    } else {
        y = 0;
    }

    return (x === previous.x && y === previous.y) ? previous : { x, y };
};

/**
 * The Pixi text field. There's no Pixi-native editable text object, so this composes one the
 * way `truffle-text`'s own `TruffleEditable` does: the value is drawn as a plain `ThemeText`
 * sprite, and a caret bar, selection highlight and placeholder are overlaid on it using
 * `createTextGeometry` (`theme/font/textGeometry.ts`) to translate between text indices and
 * sprite pixels - so the caret sits exactly between the glyphs truffle rasterised, clicks land
 * on the character under the pointer, and the field scrolls to keep the caret in view behind a
 * mask, all of it the behavior a DOM `<input>`/`<textarea>` gets for free.
 *
 * Focus is local state: a pointer press focuses (and places the caret, Shift-press or a drag
 * extends a selection), `useOutsideClick`/Escape/Tab blur. While focused, window-level
 * `keydown`/`paste` listeners (the same technique useFrameDrag.ts/useScrollController.ts rely
 * on - nothing in the canvas can hold DOM focus) do the editing: typing/Backspace/Delete at or
 * over the selection, arrow/Home/End/word-jump navigation, Ctrl+A/C/X, and pasted text. Only
 * one field is ever focused (focusing another is an outside click on this one), so at most one
 * pair of listeners is live. The caret blinks on a DOM-like 530ms cycle that restarts solid on
 * every edit or move, exactly when a browser caret does. Not covered: IME composition, and
 * double-click word selection.
 *
 * The inner width/height are read the same `requestAnimationFrame` + `.layout.computedLayout`
 * way InfiniteGrid.tsx measures its own viewport (no ResizeObserver for a yoga-sized Pixi
 * container) - the multiline wrap width and the scroll clamp both need them.
 */
const TextInputPixi = forwardRef<PixiContainer, TextInputProps>(
    ({ value, onChange, onEnter, onFocus, onBlur, maxLength, multiline = false, placeholder, placeholderColor = DEFAULT_PLACEHOLDER_COLOR, password = false, disabled = false, autoFocus = false, fontSize, textColor = '#000000', backgroundColor = '#ffffff', caretColor, selectionColor = DEFAULT_SELECTION_COLOR, layout }, ref) => {
        const [ focused, setFocused ] = useState(() => autoFocus && !disabled);
        const [ caret, setCaret ] = useState(value.length);
        /** The fixed end of a selection (`null` = collapsed); the caret is its moving end. */
        const [ anchor, setAnchor ] = useState<number | null>(null);
        const [ caretVisible, setCaretVisible ] = useState(true);
        const [ blinkCycle, setBlinkCycle ] = useState(0);
        const [ dragging, setDragging ] = useState(false);
        const [ viewport, setViewport ] = useState({ width: 0, height: 0 });
        const [ scroll, setScroll ] = useState<Scroll>({ x: 0, y: 0 });
        const [ viewportNode, setViewportNode ] = useState<PixiContainer | null>(null);
        const [ textNode, setTextNode ] = useState<PixiContainer | null>(null);
        const [ maskNode, setMaskNode ] = useState<PixiGraphics | null>(null);
        const boxRef = useRef<PixiContainer | null>(null);

        const isFocused = focused && !disabled;
        const caretIndex = clamp(caret, 0, value.length);
        const anchorIndex = anchor === null ? null : clamp(anchor, 0, value.length);
        const selectionStart = anchorIndex === null ? caretIndex : Math.min(anchorIndex, caretIndex);
        const selectionEnd = anchorIndex === null ? caretIndex : Math.max(anchorIndex, caretIndex);
        const hasSelection = selectionStart !== selectionEnd;

        // Edits are applied against this mirror, not the rendered props: `onChange` only reaches
        // back here through the parent's next render, and a second keystroke (key repeat, a fast
        // typist, a paste right after a key) routinely arrives before that render - reading the
        // stale `value` then would drop the first edit. The mirror is advanced synchronously by
        // every edit and re-synced from the real props after each render, so a parent that
        // rejects or rewrites a value still wins.
        const editRef = useRef({ value, caret: caretIndex, anchor: anchorIndex });

        useEffect(() => {
            editRef.current = { value, caret: caretIndex, anchor: anchorIndex };
        });

        const readEdit = () => {
            const current = editRef.current;
            const caretAt = clamp(current.caret, 0, current.value.length);
            const anchorAt = current.anchor === null ? null : clamp(current.anchor, 0, current.value.length);
            const start = anchorAt === null ? caretAt : Math.min(anchorAt, caretAt);
            const end = anchorAt === null ? caretAt : Math.max(anchorAt, caretAt);

            return { value: current.value, caret: caretAt, anchor: anchorAt, start, end, hasSelection: start !== end };
        };

        // Bullets are one UTF-16 unit each, so display indices stay 1:1 with `value` indices.
        const display = password ? PASSWORD_MASK.repeat(value.length) : value;
        // No `fontSize` key at all when none was given - an explicit `undefined` would still
        // override the named style's own size once spread into a native `TextStyle`.
        const textOptions = useMemo(() => ({ fill: textColor, ...(fontSize !== undefined ? { fontSize } : {}) }), [ textColor, fontSize ]);
        const placeholderOptions = useMemo(() => ({ fill: placeholderColor, ...(fontSize !== undefined ? { fontSize } : {}) }), [ placeholderColor, fontSize ]);
        const wrapWidth = multiline ? viewport.width : undefined;
        const geometry = useMemo(() => createTextGeometry(display, TEXT_STYLE, textOptions, wrapWidth), [ display, textOptions, wrapWidth ]);
        const renderOptions = useMemo(() => (geometry.wordWrap ? { ...textOptions, wordWrap: true, wordWrapWidth: wrapWidth } : textOptions), [ geometry.wordWrap, textOptions, wrapWidth ]);

        const wake = () => {
            setCaretVisible(true);
            setBlinkCycle(cycle => cycle + 1);
        };

        const focus = () => {
            if (disabled || focused) return;

            setFocused(true);
            wake();
            onFocus?.();
        };

        const blur = () => {
            if (!focused) return;

            setFocused(false);
            setAnchor(null);
            setDragging(false);
            onBlur?.();
        };

        useOutsideClick(boxRef, blur, isFocused);

        useEffect(() => {
            if (autoFocus && !disabled) onFocus?.();
        }, []);

        useEffect(() => {
            if (!viewportNode) return;

            let raf = 0;
            const tick = () => {
                const computed = viewportNode.layout?.computedLayout;
                const width = computed?.width ?? viewportNode.width ?? 0;
                const height = computed?.height ?? viewportNode.height ?? 0;

                setViewport(prev => ((Math.abs(prev.width - width) > 0.5 || Math.abs(prev.height - height) > 0.5) ? { width, height } : prev));
                raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);

            return () => cancelAnimationFrame(raf);
        }, [ viewportNode ]);

        // Deferred a frame so the scroll clamp reads the geometry the text was just laid out
        // with (and so it isn't a synchronous set-state inside the effect body).
        useEffect(() => {
            const raf = requestAnimationFrame(() => setScroll(prev => revealCaret(prev, geometry.caret(caretIndex), geometry, viewport, multiline)));

            return () => cancelAnimationFrame(raf);
        }, [ geometry, caretIndex, viewport, multiline ]);

        useEffect(() => {
            if (!isFocused) return;

            const interval = window.setInterval(() => setCaretVisible(visible => !visible), CARET_BLINK_MS);

            return () => window.clearInterval(interval);
        }, [ isFocused, blinkCycle ]);

        /** Applies one edit: advances the mirror, reports a changed value, updates caret/selection state. */
        const commit = (next: { value?: string; caret: number; anchor: number | null }) => {
            const current = editRef.current;
            const nextValue = next.value ?? current.value;
            const nextCaret = clamp(next.caret, 0, nextValue.length);

            editRef.current = { value: nextValue, caret: nextCaret, anchor: next.anchor };

            if (nextValue !== current.value) onChange(nextValue);

            setCaret(nextCaret);
            setAnchor(next.anchor);
            wake();
        };

        const moveCaret = (index: number, extend: boolean) => {
            const edit = readEdit();

            commit({ caret: index, anchor: extend ? (edit.anchor ?? edit.caret) : null });
        };

        const replaceRange = (from: number, to: number, insert: string) => {
            const { value: current } = readEdit();
            const room = maxLength === undefined ? insert.length : Math.max(0, maxLength - (current.length - (to - from)));
            const inserted = insert.slice(0, room);

            commit({ value: current.slice(0, from) + inserted + current.slice(to), caret: from + inserted.length, anchor: null });
        };

        const insertText = (text: string) => {
            const edit = readEdit();

            replaceRange(edit.start, edit.end, text);
        };

        // Re-subscribed every render (no deps) so the handlers always see the latest geometry
        // and callbacks - cheaper than threading a dozen deps, and nothing is missed because the
        // swap happens synchronously in the commit that follows each render.
        useEffect(() => {
            if (!isFocused) return;

            const lineEdge = (rect: TextCaretRect, direction: -1 | 1) => geometry.hitTest(direction * 1e9, rect.y + rect.height / 2);
            const lineStep = (rect: TextCaretRect, direction: -1 | 1, length: number) => {
                if (!multiline) return direction < 0 ? 0 : length;

                const target = geometry.hitTest(rect.x, direction < 0 ? rect.y - geometry.lineHeight / 2 : rect.y + rect.height + geometry.lineHeight / 2);

                // No line in that direction: a DOM textarea jumps to the text's start/end.
                return geometry.caret(target).lineIndex === rect.lineIndex ? (direction < 0 ? 0 : length) : target;
            };

            const onKeyDown = (event: KeyboardEvent) => {
                if (domFieldHasFocus()) return;

                const ctrl = event.ctrlKey || event.metaKey;
                const edit = readEdit();
                const rect = geometry.caret(edit.caret);

                switch (event.key) {
                    case 'Enter':
                        event.preventDefault();
                        if (multiline && !event.shiftKey) insertText('\n');
                        else onEnter?.();
                        return;
                    case 'Escape':
                    case 'Tab':
                        blur();
                        return;
                    case 'Backspace':
                        event.preventDefault();
                        if (edit.hasSelection) replaceRange(edit.start, edit.end, '');
                        else if (edit.caret > 0) replaceRange(ctrl ? wordStartBefore(edit.value, edit.caret) : edit.caret - 1, edit.caret, '');
                        return;
                    case 'Delete':
                        event.preventDefault();
                        if (edit.hasSelection) replaceRange(edit.start, edit.end, '');
                        else if (edit.caret < edit.value.length) replaceRange(edit.caret, ctrl ? wordEndAfter(edit.value, edit.caret) : edit.caret + 1, '');
                        return;
                    case 'ArrowLeft':
                        event.preventDefault();
                        if (edit.hasSelection && !event.shiftKey) moveCaret(edit.start, false);
                        else moveCaret(ctrl ? wordStartBefore(edit.value, edit.caret) : edit.caret - 1, event.shiftKey);
                        return;
                    case 'ArrowRight':
                        event.preventDefault();
                        if (edit.hasSelection && !event.shiftKey) moveCaret(edit.end, false);
                        else moveCaret(ctrl ? wordEndAfter(edit.value, edit.caret) : edit.caret + 1, event.shiftKey);
                        return;
                    case 'ArrowUp':
                        event.preventDefault();
                        moveCaret(lineStep(rect, -1, edit.value.length), event.shiftKey);
                        return;
                    case 'ArrowDown':
                        event.preventDefault();
                        moveCaret(lineStep(rect, 1, edit.value.length), event.shiftKey);
                        return;
                    case 'Home':
                        event.preventDefault();
                        moveCaret(ctrl ? 0 : lineEdge(rect, -1), event.shiftKey);
                        return;
                    case 'End':
                        event.preventDefault();
                        moveCaret(ctrl ? edit.value.length : lineEdge(rect, 1), event.shiftKey);
                        return;
                    default:
                        break;
                }

                if (ctrl) {
                    const key = event.key.toLowerCase();

                    if (key === 'a') {
                        event.preventDefault();
                        commit({ caret: edit.value.length, anchor: 0 });
                    } else if ((key === 'c' || key === 'x') && edit.hasSelection && !password) {
                        // A password field never hands its text to the clipboard, like the DOM's.
                        event.preventDefault();

                        const clipboard = navigator.clipboard as Clipboard | undefined;

                        void clipboard?.writeText(edit.value.slice(edit.start, edit.end)).catch(() => undefined);

                        if (key === 'x') replaceRange(edit.start, edit.end, '');
                    }

                    // Ctrl+V arrives as the `paste` event below; anything else stays the browser's.
                    return;
                }

                if (event.key.length === 1) {
                    event.preventDefault();
                    insertText(event.key);
                }
            };

            const onPaste = (event: ClipboardEvent) => {
                if (domFieldHasFocus()) return;

                const text = event.clipboardData?.getData('text/plain') ?? '';

                if (!text) return;

                event.preventDefault();
                // A single-line input strips line breaks from pasted text (the HTML value
                // sanitization algorithm); a textarea keeps them, normalised to `\n`.
                insertText(multiline ? text.replace(/\r\n?/g, '\n') : text.replace(/[\r\n]+/g, ''));
            };

            window.addEventListener('keydown', onKeyDown);
            window.addEventListener('paste', onPaste);

            return () => {
                window.removeEventListener('keydown', onKeyDown);
                window.removeEventListener('paste', onPaste);
            };
        });

        /** Text index under a point in the canvas's own CSS-pixel space (Pixi's `event.global`). */
        const indexAtGlobal = (global: { x: number; y: number }) => {
            if (!textNode) return readEdit().value.length;

            const local = textNode.toLocal(global);

            return geometry.hitTest(local.x, local.y);
        };

        const onPointerDown = (event: FederatedPointerEvent) => {
            if (disabled) return;

            const edit = readEdit();
            const index = indexAtGlobal(event.global);

            focus();
            // The press point anchors any drag that follows; a Shift-press extends from the
            // existing anchor (or caret) instead, like a DOM Shift+click.
            commit({ caret: index, anchor: event.shiftKey ? (edit.anchor ?? edit.caret) : index });
            setDragging(true);
        };

        // Drag-select via window-level pointer events (Pixi's FederatedPointerEvent has no
        // pointer capture, so a drag leaving the field would otherwise stop tracking) - the same
        // window-listener + `getBoundingClientRect` conversion `useOutsideClick` uses.
        useEffect(() => {
            if (!dragging || !textNode) return;

            const onMove = (event: PointerEvent) => {
                const canvas = GetRenderer().canvas;

                if (!canvas) return;

                const rect = canvas.getBoundingClientRect();
                const local = textNode.toLocal(new Point(event.clientX - rect.left, event.clientY - rect.top));
                const index = geometry.hitTest(local.x, local.y);

                editRef.current = { ...editRef.current, caret: index };
                setCaret(index);
                setCaretVisible(true);
            };
            const onUp = () => setDragging(false);

            window.addEventListener('pointermove', onMove);
            window.addEventListener('pointerup', onUp);

            return () => {
                window.removeEventListener('pointermove', onMove);
                window.removeEventListener('pointerup', onUp);
            };
        }, [ dragging, textNode, geometry ]);

        const caretRect = geometry.caret(caretIndex);
        const selectionRects = (isFocused && hasSelection) ? geometry.selection(selectionStart, selectionEnd) : [];
        const showCaret = isFocused && !hasSelection && caretVisible;
        const showPlaceholder = !value.length && !!placeholder;
        const resolvedCaretColor = caretColor ?? textColor;

        return (
            <Box
                ref={(node) => {
                    boxRef.current = node;
                    if (typeof ref === 'function') ref(node);
                    else if (ref) ref.current = node;
                }}
                cursor={disabled ? 'default' : 'text'}
                onPointerDown={onPointerDown}
                layout={{ paddingLeft: 2, paddingRight: 2, ...layout }}
            >
                <ColorLayer color={backgroundColor} />
                <pixiContainer
                    ref={setViewportNode}
                    eventMode="none"
                    mask={maskNode ?? undefined}
                    layout={{ flex: 1, minWidth: 0, height: '100%', flexDirection: 'row', alignItems: multiline ? 'flex-start' : 'center' }}
                >
                    <pixiGraphics
                        ref={setMaskNode}
                        eventMode="none"
                        roundPixels
                        layout={FillLayout}
                        draw={(g) => { g.clear().rect(0, 0, 1, 1).fill(0xFFFFFF); }}
                    />
                    <pixiContainer
                        ref={setTextNode}
                        eventMode="none"
                        roundPixels
                        x={-scroll.x}
                        y={-scroll.y}
                        layout={{ position: 'relative', width: geometry.width, height: geometry.height, flexShrink: 0 }}
                    >
                        {selectionRects.map((rect, index) => (
                            <pixiGraphics
                                key={index}
                                eventMode="none"
                                roundPixels
                                layout={{ position: 'absolute', left: rect.x, top: rect.y, width: rect.width, height: rect.height }}
                                draw={(g) => { g.clear().rect(0, 0, rect.width, rect.height).fill(selectionColor); }}
                            />
                        ))}
                        <ThemeText
                            text={showPlaceholder ? placeholder : geometry.renderText}
                            textStyle={TEXT_STYLE}
                            textOptions={showPlaceholder ? placeholderOptions : renderOptions}
                            layout={{ position: 'absolute', left: 0, top: 0 }}
                        />
                        {showCaret && (
                            <pixiGraphics
                                eventMode="none"
                                roundPixels
                                layout={{ position: 'absolute', left: caretRect.x, top: caretRect.y, width: CARET_WIDTH, height: caretRect.height }}
                                draw={(g) => { g.clear().rect(0, 0, CARET_WIDTH, caretRect.height).fill(resolvedCaretColor); }}
                            />
                        )}
                    </pixiContainer>
                </pixiContainer>
            </Box>
        );
    },
);

TextInputPixi.displayName = 'TextInputPixi';

/**
 * DOM counterpart: a real `<input>`/`<textarea>`, which is what every one of these fields was
 * before the Pixi port - the browser supplies the caret, selection, placeholder, clipboard and
 * IME natively. Styled from the same `BoxLayout`/text-style translation every other dual-target
 * component uses; `::placeholder` has no inline-style hook, so `placeholderColor` travels via
 * a CSS variable `base.css`'s `.theme-text-input::placeholder` rule reads.
 */
const TextInputDom = forwardRef<PixiContainer, TextInputProps>(
    ({ value, onChange, onEnter, onFocus, onBlur, maxLength, multiline = false, placeholder, placeholderColor = DEFAULT_PLACEHOLDER_COLOR, password = false, disabled = false, autoFocus = false, fontSize, textColor = '#000000', backgroundColor = '#ffffff', caretColor, layout }, ref) => {
        const style: CSSProperties = {
            ...boxLayoutToStyle({ paddingLeft: 2, paddingRight: 2, ...layout }),
            ...getDomTextStyle(TEXT_STYLE, { fill: textColor, fontSize }),
            display: 'block',
            backgroundColor,
            border: 'none',
            borderRadius: 0,
            outline: 'none',
            boxShadow: 'none',
            resize: 'none',
            overflow: 'hidden',
            whiteSpace: multiline ? 'pre-wrap' : 'pre',
            overflowWrap: multiline ? 'anywhere' : undefined,
            caretColor: caretColor ?? textColor,
            pointerEvents: 'auto',
            userSelect: 'text',
        };

        (style as Record<string, string | number | undefined>)['--theme-text-input-placeholder'] = placeholderColor;

        const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            if (event.key === 'Enter' && (!multiline || event.shiftKey)) {
                event.preventDefault();
                onEnter?.();

                return;
            }

            if (event.key === 'Escape') event.currentTarget.blur();
        };

        const shared = {
            className: 'theme-text-input',
            style,
            value,
            placeholder,
            maxLength,
            disabled,
            autoFocus,
            onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value),
            onKeyDown,
            onFocus: () => onFocus?.(),
            onBlur: () => onBlur?.(),
        };

        // Same `Ref<Container>` -> DOM element redirection `BoxDom` documents: nothing reads a
        // Pixi container off this ref in DOM mode.
        if (multiline) {
            return (
                <textarea
                    ref={ref as unknown as Ref<HTMLTextAreaElement>}
                    {...shared}
                />
            );
        }

        return (
            <input
                ref={ref as unknown as Ref<HTMLInputElement>}
                type={password ? 'password' : 'text'}
                {...shared}
            />
        );
    },
);

TextInputDom.displayName = 'TextInputDom';

/**
 * The one genuinely-interactive text field, shared by every DOM `<input type="text">`/
 * `<textarea>` the Pixi migration hits (friend-list and navigator/catalog search boxes, the
 * room-invite message, generated layouts' `<input>`/`<password>` elements, ...). Behaves like
 * the DOM field it replaces on both render targets: a blinking caret you can click or arrow
 * around, drag/Shift/Ctrl+A selection, placeholder text, password masking, paste, and
 * horizontal (or, `multiline`, vertical) scrolling that keeps the caret in view.
 */
export const TextInput: ForwardRefExoticComponent<TextInputProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TextInputProps>(
    (props, ref) => (getRenderMode() === 'dom'
        ? (
                <TextInputDom
                    ref={ref}
                    {...props}
                />
            )
        : (
                <TextInputPixi
                    ref={ref}
                    {...props}
                />
            )),
);

TextInput.displayName = 'TextInput';
