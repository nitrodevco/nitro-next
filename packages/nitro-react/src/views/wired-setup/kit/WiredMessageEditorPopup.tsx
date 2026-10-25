/**
 * `MessageEditorPopupPreset` (WIN63-202610121624): the "Message Editor" window, 700 wide, opened
 * on window context 1's desktop by the compact editor's pop-out button. A padded list (8 all
 * round) of the toolbar (`MessageEditorToolbarPreset`), the editor (a `TextAreaParam(140, ...)`
 * with the box's line and character limits) and the preview (`MessageEditorPreviewPreset`), the
 * colour palette (`MessageEditorPalettePreset`) floating under the colour button.
 *
 * The toolbar's B / I / U and the palette wrap the selection in `[b]`...`[/b]` (or unwrap one
 * already wrapped; `wrapSelection`), "Align" puts `[a]` at the caret, "Add placeholder" lists the
 * box's text placeholders and puts `$(name)` at the caret; it is disabled with none. Every edit
 * goes back to the compact field, and the counter is the editor's length over its limit.
 * The editor stops taking the pointer while the palette is hovered or the placeholder list is
 * open (`updateEditorSelectable`).
 */
import { RoomChatTypeEnum } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Border, Box, Button, ContainerButton, Dropmenu, Frame, Region, ThemeText, WindowPlacedContext } from '#base/theme';
import { toCssHexColor } from '#base/utils';
import { applyMessageEditorTag, insertMessageEditorText, MESSAGE_EDITOR_ALIGN_MARKER, MESSAGE_EDITOR_COLOR_OPTIONS, MESSAGE_EDITOR_DEFAULT_COLOR, MESSAGE_EDITOR_HEIGHT, MESSAGE_EDITOR_PADDING, MESSAGE_EDITOR_POPUP_WIDTH, MESSAGE_EDITOR_REFERENCE_BUTTON_SPACING, MESSAGE_EDITOR_REFERENCE_DROPDOWN_WIDTH, MessageEditorEdit, messageEditorPlaceholderToken, WiredStyleMessageEditorFormatButton, WiredStyleMessageEditorTemplate } from '#base/wired';

import { useWiredCaption } from './useWiredCaption';
import { useWiredChatMessagePreview } from './useWiredChatMessagePreview';
import { WiredChatMessagePreview } from './WiredChatMessagePreview';
import { useWiredStyle } from './WiredStyleContext';
import { WiredTextArea } from './WiredTextArea';

export interface WiredMessageEditorPreviewSettings {
    styleId: number;
    bubbleWidth: number;
    chatType: RoomChatTypeEnum;
}

export interface WiredMessageEditorPopupProps {
    template: WiredStyleMessageEditorTemplate;
    value: string;
    onChange: (value: string) => void;
    maxCharacters: number;
    maxLines: number;
    placeholderNames: readonly string[];
    preview: WiredMessageEditorPreviewSettings;
    onClose: () => void;
}

interface Selection {
    start: number;
    end: number;
}

/** `FramePreset`'s frame less its margins, less the padded container's 8 a side. */
const contentWidthOf = (frameMargins: number) => MESSAGE_EDITOR_POPUP_WIDTH - frameMargins - (MESSAGE_EDITOR_PADDING * 2);

const FormatButton = ({ button, dynamicStyle, tooltip, color, bold, italic, underline, onPress }: { button: WiredStyleMessageEditorFormatButton; dynamicStyle: WiredStyleMessageEditorTemplate['toolbar']['dynamicStyle']; tooltip: string; color?: number; bold?: boolean; italic?: boolean; underline?: boolean; onPress: () => void }) => {
    const caption = useWiredCaption();

    return (
        <Box layout={{ position: 'absolute', left: button.x, top: button.y, width: button.width, height: button.height }}>
            <ContainerButton
                variant={button.variant}
                dynamicStyle={dynamicStyle}
                tooltip={caption(tooltip)}
                onPointerTap={onPress}
                layout={{ position: 'relative', width: button.width, height: button.height }}
            >
                <Box
                    eventMode="none"
                    layout={{ position: 'absolute', left: button.label.x, top: button.label.y, width: button.label.width, height: button.label.height }}
                >
                    <ThemeText
                        text={button.label.caption}
                        textStyle="il_regular"
                        textOptions={(color === undefined) ? undefined : { fill: toCssHexColor(color) }}
                        flashFormat={{ bold, italic, underline }}
                    />
                </Box>
            </ContainerButton>
        </Box>
    );
};

export const WiredMessageEditorPopup = ({ template, value, onChange, maxCharacters, maxLines, placeholderNames, preview, onClose }: WiredMessageEditorPopupProps) => {
    const t = useTranslation();
    const caption = useWiredCaption();
    const style = useWiredStyle();
    const frame = style.templates.frame;
    const toolbar = template.toolbar;
    const palette = template.palette;
    const contentWidth = contentWidthOf(frame.marginLeft + frame.marginRight);
    const [ selection, setSelection ] = useState<Selection>({ start: value.length, end: value.length });
    const [ after, setAfter ] = useState<{ start: number; end: number; requestId: number } | null>(null);
    const [ focused, setFocused ] = useState(false);
    const [ colorIndicator, setColorIndicator ] = useState(MESSAGE_EDITOR_DEFAULT_COLOR);
    const [ paletteOpen, setPaletteOpen ] = useState(false);
    const [ swatchHovered, setSwatchHovered ] = useState(false);
    const [ referenceOpen, setReferenceOpen ] = useState(false);
    const [ referenceRequest, setReferenceRequest ] = useState(0);

    const previewState = useWiredChatMessagePreview({ text: value, styleId: preview.styleId, chatType: preview.chatType, bubbleWidth: preview.bubbleWidth, areaWidth: contentWidth, minHeight: template.preview.area.height });

    /** An edit made by a button: the text goes back to the box, the selection and focus to the editor. */
    const apply = (edit: MessageEditorEdit | null): boolean => {
        if (!edit) return false;

        onChange(edit.text);
        setSelection({ start: edit.selectionStart, end: edit.selectionEnd });
        setAfter(previous => ({ start: edit.selectionStart, end: edit.selectionEnd, requestId: (previous?.requestId ?? 0) + 1 }));
        setFocused(true);

        return true;
    };

    const start = Math.min(selection.start, value.length);
    const end = Math.min(selection.end, value.length);
    const applyTag = (tag: string) => apply(applyMessageEditorTag(value, start, end, tag, maxCharacters));
    const insert = (text: string) => apply(insertMessageEditorText(value, start, end, text, maxCharacters));

    // `onColorRequested`: the palette opens under the colour button, inside the frame's content.
    const paletteWidth = (palette.padding * 2) + (MESSAGE_EDITOR_COLOR_OPTIONS.length * palette.swatchWidth) + ((MESSAGE_EDITOR_COLOR_OPTIONS.length - 1) * palette.spacing);
    const paletteHeight = (palette.padding * 2) + palette.swatchHeight + 3;

    const softText = style.softTextColor ?? undefined;
    const editorSelectable = !swatchHovered && !referenceOpen;

    return (
        <WindowPlacedContext.Provider value={false}>
            <Frame
                id="wired-message-editor"
                variant={frame.variant}
                caption={t('wiredfurni.params.message_editor.title', 'wiredfurni.params.message_editor.title')}
                tintColor={style.frameColor}
                dropShadow={frame.dropShadow}
                resizeDirection="none"
                rememberPosition={false}
                centered
                onClose={onClose}
                fitContent="height"
                margins={[ frame.marginLeft, frame.marginTop, frame.marginRight, frame.marginBottom ]}
                layout={{ width: MESSAGE_EDITOR_POPUP_WIDTH, minWidth: MESSAGE_EDITOR_POPUP_WIDTH }}
            >
                <Box layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column', padding: MESSAGE_EDITOR_PADDING, gap: style.genericVerticalSpacing, width: contentWidth + (MESSAGE_EDITOR_PADDING * 2) }}>
                    {/* `MessageEditorToolbarPreset`. */}
                    <Box layout={{ position: 'relative', width: contentWidth, height: toolbar.height, flexShrink: 0 }}>
                        <FormatButton
                            button={toolbar.bold}
                            dynamicStyle={toolbar.dynamicStyle}
                            tooltip="${wiredfurni.params.message_editor.bold.tooltip}"
                            bold
                            onPress={() => applyTag('b')}
                        />
                        <FormatButton
                            button={toolbar.italic}
                            dynamicStyle={toolbar.dynamicStyle}
                            tooltip="${wiredfurni.params.message_editor.italic.tooltip}"
                            italic
                            onPress={() => applyTag('i')}
                        />
                        <FormatButton
                            button={toolbar.underline}
                            dynamicStyle={toolbar.dynamicStyle}
                            tooltip="${wiredfurni.params.message_editor.underline.tooltip}"
                            underline
                            onPress={() => applyTag('u')}
                        />
                        {toolbar.separators.map(x => (
                            <Box
                                key={x}
                                layout={{ position: 'absolute', left: x, top: 0, width: 1, height: toolbar.height }}
                            >
                                <Region
                                    backgroundColor={toolbar.separatorColor}
                                    layout={{ width: 1, height: toolbar.height - 1 }}
                                />
                                <Region
                                    backgroundColor={toolbar.separatorShadowColor}
                                    layout={{ width: 1, height: 1 }}
                                />
                            </Box>
                        ))}
                        <FormatButton
                            button={toolbar.color}
                            dynamicStyle={toolbar.dynamicStyle}
                            tooltip="${wiredfurni.params.message_editor.color.tooltip}"
                            color={colorIndicator}
                            onPress={() => setPaletteOpen(open => !open)}
                        />
                        {/* `layoutControls`: "Align" and "Add placeholder" centred together, 5 apart. The row spans the
                            toolbar to centre them, so it lets presses through to B/I/U/A beneath it. */}
                        <Box
                            pointerTransparent
                            layout={{ position: 'absolute', left: 0, top: 0, width: contentWidth, height: toolbar.height, flexDirection: 'row', justifyContent: 'center', gap: MESSAGE_EDITOR_REFERENCE_BUTTON_SPACING }}
                        >
                            <Button
                                variant={toolbar.buttonVariant}
                                textStyle="il_button"
                                tooltip={caption('${wiredfurni.params.message_editor.align.tooltip}')}
                                onPointerTap={() => insert(MESSAGE_EDITOR_ALIGN_MARKER)}
                                layout={{ height: toolbar.buttonHeight, minHeight: toolbar.buttonHeight, minWidth: toolbar.alignButton.width, flexShrink: 0 }}
                            >
                                {caption('${wiredfurni.params.message_editor.align}')}
                            </Button>
                            <Box layout={{ position: 'relative', flexShrink: 0 }}>
                                <Button
                                    variant={toolbar.buttonVariant}
                                    textStyle="il_button"
                                    disabled={placeholderNames.length === 0}
                                    onPointerTap={() => setReferenceRequest(request => request + 1)}
                                    layout={{ height: toolbar.buttonHeight, minHeight: toolbar.buttonHeight, minWidth: toolbar.placeholderButton.width, flexShrink: 0 }}
                                >
                                    {caption('${wiredfurni.params.message_editor.add_placeholder}')}
                                </Button>
                                {/* `positionDropdown`: an invisible dropdown under the button's right edge, opened by `requestOpen`. */}
                                <Dropmenu
                                    variant={style.templates.dropdown.variant}
                                    visible={false}
                                    openRequest={referenceRequest}
                                    onOpenChange={setReferenceOpen}
                                    options={placeholderNames.map((name, index) => ({ key: index, label: name, onSelect: () => insert(messageEditorPlaceholderToken(name)) }))}
                                    layout={{ position: 'absolute', right: 0, top: toolbar.buttonHeight, width: MESSAGE_EDITOR_REFERENCE_DROPDOWN_WIDTH, height: style.templates.dropdown.height }}
                                />
                            </Box>
                        </Box>
                        <Box
                            pointerTransparent
                            layout={{ position: 'absolute', right: 0, top: toolbar.counter.y, width: toolbar.counter.width, height: toolbar.counter.height, alignItems: 'flex-end' }}
                        >
                            <ThemeText
                                text={`${value.length}/${maxCharacters}`}
                                textStyle={toolbar.textStyle}
                                textOptions={softText ? { fill: softText } : undefined}
                            />
                        </Box>
                    </Box>
                    <Box
                        eventMode={editorSelectable ? 'auto' : 'none'}
                        layout={{ width: contentWidth, flexShrink: 0 }}
                    >
                        <WiredTextArea
                            value={value}
                            onChange={onChange}
                            // The list's width: the field's share of it, as `resizeToWidth` gives it.
                            width={contentWidth - style.templates.input.fieldLeft - style.templates.input.fieldRight}
                            height={MESSAGE_EDITOR_HEIGHT}
                            maxLines={maxLines}
                            maxCharacters={maxCharacters}
                            selection={{
                                onChange: (selectionStart, selectionEnd) => setSelection({ start: selectionStart, end: selectionEnd }),
                                after,
                                focused,
                                onFocusChange: setFocused,
                            }}
                        />
                    </Box>
                    {/* `MessageEditorPreviewPreset`. */}
                    <Box layout={{ width: contentWidth, flexDirection: 'column', flexShrink: 0 }}>
                        <Box layout={{ height: template.preview.title.height }}>
                            <ThemeText
                                text={caption('${wiredfurni.params.message_editor.preview.title}')}
                                textStyle="il_regular"
                                textOptions={softText ? { fill: softText } : undefined}
                            />
                        </Box>
                        <Box layout={{ position: 'relative', marginTop: template.preview.area.y - template.preview.title.height, width: contentWidth, height: previewState.fit.areaHeight, marginBottom: previewState.fit.bottomPadding, overflow: 'hidden' }}>
                            <WiredChatMessagePreview
                                preview={previewState}
                                areaWidth={contentWidth}
                            />
                        </Box>
                    </Box>
                    {paletteOpen && (
                        <Border
                            variant={palette.variant}
                            tintColor={palette.color}
                            layout={{ position: 'absolute', left: MESSAGE_EDITOR_PADDING + toolbar.color.x, top: MESSAGE_EDITOR_PADDING + toolbar.color.y + toolbar.color.height, width: paletteWidth, height: paletteHeight, flexDirection: 'row', paddingLeft: palette.padding, paddingTop: palette.padding, gap: palette.spacing }}
                        >
                            {MESSAGE_EDITOR_COLOR_OPTIONS.map(option => (
                                <Region
                                    key={option.tag}
                                    interactive
                                    tooltip={caption(option.tooltip)}
                                    onPointerOver={() => setSwatchHovered(true)}
                                    onPointerOut={() => setSwatchHovered(false)}
                                    onPointerTap={() => {
                                        // `onSwatchSelected`: the palette closes, then the tag goes round the selection.
                                        setPaletteOpen(false);
                                        setSwatchHovered(false);

                                        if (applyTag(option.tag)) setColorIndicator(option.color);
                                    }}
                                    layout={{ width: palette.swatchWidth, height: palette.swatchHeight }}
                                >
                                    <Border
                                        variant={palette.swatchVariant}
                                        tintColor={toCssHexColor(option.swatchColor)}
                                        layout={{ width: palette.swatchWidth, height: palette.swatchHeight }}
                                    />
                                </Region>
                            ))}
                        </Border>
                    )}
                </Box>
            </Frame>
        </WindowPlacedContext.Provider>
    );
};
