

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes, useEffect, useRef, useState } from 'react';

import { Box, type BoxLayout } from './Box';
import { ColorLayer } from './layer';
import { Text } from './Text';
import { useOutsideClick } from './utils/useOutsideClick';

export interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    onEnter?: () => void;
    maxLength?: number;
    multiline?: boolean;
    fontSize?: number;
    textColor?: string;
    backgroundColor?: string;
    layout?: BoxLayout;
}

/**
 * A single genuinely-interactive Pixi text field, shared by every DOM `<input type="text">`/
 * `<textarea>` this migration hits (FriendListFriendsFooter's list-search box,
 * FriendListSearchFooter's search box, FriendListRoomInviteView's message textarea, and more to
 * come in Navigator/Catalog search) - unlike Dropmenu/Tooltip (confirmed dead in DOM, ported as
 * static skinning only) these DOM inputs have real typed-value + Enter-to-submit behavior, so a
 * static-only port would drop working functionality rather than matching a DOM no-op.
 *
 * There's no Pixi-native editable text object, so this fakes one: a plain `pixiText` shows the
 * current `value`, a pointer tap "focuses" it (tracked in local state, cleared by the same
 * `useOutsideClick` port used elsewhere), and while focused a window-level `keydown` listener
 * (the same window-listener technique useFrameDrag.ts/useScrollController.ts already rely on)
 * appends/removes characters and fires `onEnter`. Deliberately simplified versus a real HTML
 * input: no caret rendering, no click-to-position-cursor or text selection - characters are
 * always appended/removed from the end, which covers every real call site (search-as-you-type,
 * a short message box) without building full glyph-metrics-based caret placement. Focus is
 * signaled with a background tint swap instead, a cheaper affordance than a blinking caret. For
 * `multiline`, the wrap width is measured the same `requestAnimationFrame` + `.layout.
 * computedLayout` way InfiniteGrid.tsx measures its own viewport (no ResizeObserver equivalent
 * for a Pixi container's yoga-computed size), since `pixiText`'s `wordWrap` needs an explicit
 * pixel width.
 */
export const TextInput: ForwardRefExoticComponent<TextInputProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, TextInputProps>(
    ({ value, onChange, onEnter, maxLength, multiline = false, fontSize = 12, textColor = '#000000', backgroundColor = '#ffffff', layout }, ref) => {
        const [ focused, setFocused ] = useState(false);
        const [ wrapWidth, setWrapWidth ] = useState(0);
        const boxRef = useRef<PixiContainer | null>(null);

        useOutsideClick(boxRef, () => setFocused(false), focused);

        useEffect(() => {
            if (!multiline) return;

            const node = boxRef.current;
            if (!node) return;

            let raf = 0;
            const tick = () => {
                const width = node.layout?.computedLayout?.width ?? node.width ?? 0;
                setWrapWidth(prev => (Math.abs(prev - width) > 0.5 ? width : prev));
                raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);

            return () => cancelAnimationFrame(raf);
        }, [ multiline ]);

        useEffect(() => {
            if (!focused) return;

            const onKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Enter') {
                    if (multiline && !event.shiftKey) {
                        event.preventDefault();
                        if (maxLength === undefined || value.length < maxLength) onChange(value + '\n');
                        return;
                    }

                    event.preventDefault();
                    onEnter?.();
                    return;
                }

                if (event.key === 'Escape') {
                    setFocused(false);
                    return;
                }

                if (event.key === 'Backspace') {
                    event.preventDefault();
                    onChange(value.slice(0, -1));
                    return;
                }

                if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
                    event.preventDefault();
                    if (maxLength === undefined || value.length < maxLength) onChange(value + event.key);
                }
            };

            window.addEventListener('keydown', onKeyDown);

            return () => window.removeEventListener('keydown', onKeyDown);
        }, [ focused, value, onChange, onEnter, maxLength, multiline ]);

        return (
            <Box
                ref={(node) => { boxRef.current = node; if (typeof ref === 'function') ref(node); else if (ref) ref.current = node; }}
                eventMode="static"
                cursor="text"
                onPointerTap={() => setFocused(true)}
                layout={{ justifyContent: multiline ? 'flex-start' : 'center', paddingLeft: 2, paddingRight: 2, ...layout }}
            >
                <ColorLayer color={focused ? '#eef6ff' : backgroundColor} />
                <Text
                    text={value}
                    textStyle="text-style-regular"
                    textOptions={{
                        fill: textColor,
                        fontSize,
                        wordWrap: multiline,
                        wordWrapWidth: multiline ? Math.max(1, wrapWidth) : undefined,
                        breakWords: multiline,
                    }}
                />
            </Box>
        );
    },
);

TextInput.displayName = 'TextInput';
