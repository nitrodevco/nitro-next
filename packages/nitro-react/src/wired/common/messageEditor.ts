/**
 * The message editor of WIN63-202610121624 (`uibuilder/presets/applications/MessageEditor*Preset`):
 * what its buttons do to the text, as pure functions of the text and its selection
 * (`TextAreaPreset.insertText` / `wrapSelection`), and the palette's colours.
 */

/** `MessageEditorPopupPreset.WIDTH` / `EDITOR_HEIGHT`. */
export const MESSAGE_EDITOR_POPUP_WIDTH = 700;
export const MESSAGE_EDITOR_HEIGHT = 140;

/** `createPaddedContainerPreset(list, 8, 8, 8, 8)`. */
export const MESSAGE_EDITOR_PADDING = 8;

/** `MessageEditorToolbarPreset`: the colour indicator's first colour (the palette's red) and the align / placeholder buttons' gap. */
export const MESSAGE_EDITOR_DEFAULT_COLOR = 9115929;
export const MESSAGE_EDITOR_REFERENCE_BUTTON_SPACING = 5;
export const MESSAGE_EDITOR_REFERENCE_DROPDOWN_WIDTH = 180;

/** `MessageEditorPreviewPreset.EXPANDED_BOTTOM_PADDING`. */
export const MESSAGE_EDITOR_PREVIEW_EXPANDED_PADDING = 5;

export interface MessageEditorColorOption {
    /** The markup tag (`[red]`). */
    tag: string;
    /** The colour the tag draws in on a light bubble - what the toolbar's "A" takes once picked. */
    color: number;
    /** The swatch's own colour. */
    swatchColor: number;
    tooltip: string;
}

/** `MessageEditorPalettePreset.COLOR_OPTIONS`. */
export const MESSAGE_EDITOR_COLOR_OPTIONS: readonly MessageEditorColorOption[] = [
    { tag: 'red', color: 9115929, swatchColor: 10239036, tooltip: '${wiredfurni.params.message_editor.color.red.tooltip}' },
    { tag: 'orange', color: 10238720, swatchColor: 11229215, tooltip: '${wiredfurni.params.message_editor.color.orange.tooltip}' },
    { tag: 'yellow', color: 7297792, swatchColor: 8746022, tooltip: '${wiredfurni.params.message_editor.color.yellow.tooltip}' },
    { tag: 'green', color: 32768, swatchColor: 2528038, tooltip: '${wiredfurni.params.message_editor.color.green.tooltip}' },
    { tag: 'cyan', color: 32639, swatchColor: 2527890, tooltip: '${wiredfurni.params.message_editor.color.cyan.tooltip}' },
    { tag: 'blue', color: 19609, swatchColor: 2516904, tooltip: '${wiredfurni.params.message_editor.color.blue.tooltip}' },
    { tag: 'purple', color: 4980812, swatchColor: 6760039, tooltip: '${wiredfurni.params.message_editor.color.purple.tooltip}' },
    { tag: 'pink', color: 10228827, swatchColor: 11220852, tooltip: '${wiredfurni.params.message_editor.color.pink.tooltip}' },
];

/** The text after an edit, and the selection the field takes. */
export interface MessageEditorEdit {
    text: string;
    selectionStart: number;
    selectionEnd: number;
}

/**
 * `TextAreaPreset.insertText`: the selection replaced by `insert`, the caret after it; `null`
 * (nothing changes) when the result would pass `maxCharacters`.
 */
export const insertMessageEditorText = (text: string, start: number, end: number, insert: string, maxCharacters: number): MessageEditorEdit | null => {
    if ((maxCharacters > 0) && (((text.length - (end - start)) + insert.length) > maxCharacters)) return null;

    const caret = start + insert.length;

    return { text: text.substring(0, start) + insert + text.substring(end), selectionStart: caret, selectionEnd: caret };
};

/**
 * `TextAreaPreset.wrapSelection`: a selection already between `open` and `close` is unwrapped,
 * any other is wrapped; the selection stays on the same text. `null` when wrapping would pass
 * `maxCharacters`.
 */
export const wrapMessageEditorSelection = (text: string, start: number, end: number, open: string, close: string, maxCharacters: number): MessageEditorEdit | null => {
    if ((start >= open.length) && ((end + close.length) <= text.length) && (text.substring(start - open.length, start) === open) && (text.substring(end, end + close.length) === close)) {
        const from = start - open.length;

        return { text: text.substring(0, from) + text.substring(start, end) + text.substring(end + close.length), selectionStart: from, selectionEnd: from + (end - start) };
    }

    if ((maxCharacters > 0) && ((text.length + open.length + close.length) > maxCharacters)) return null;

    const from = start + open.length;

    return { text: text.substring(0, start) + open + text.substring(start, end) + close + text.substring(end), selectionStart: from, selectionEnd: from + (end - start) };
};

/** `MessageEditorPopupPreset.applyTag`: `[tag]` ... `[/tag]` around the selection. */
export const applyMessageEditorTag = (text: string, start: number, end: number, tag: string, maxCharacters: number): MessageEditorEdit | null => wrapMessageEditorSelection(text, start, end, `[${tag}]`, `[/${tag}]`, maxCharacters);

/** `MessageEditorPopupPreset.onAlign`: an `[a]` column marker at the caret. */
export const MESSAGE_EDITOR_ALIGN_MARKER = '[a]';

/** `onPlaceholderSelected`: `$(name)` at the caret. */
export const messageEditorPlaceholderToken = (name: string): string => `$(${name})`;

/**
 * `MessageEditorPreviewPreset.setBitmap`: how a bubble of `width` x `height` fits a preview area
 * `areaWidth` wide whose height is at least `minHeight` - scaled down to the width, never up,
 * the area growing (plus a bottom padding) for a taller bubble.
 */
export const messageEditorPreviewFit = (width: number, height: number, areaWidth: number, minHeight: number): { scale: number; areaHeight: number; bottomPadding: number } => {
    const widthScale = Math.min(1, areaWidth / width);
    const scaledHeight = Math.ceil(height * widthScale);
    const areaHeight = Math.max(minHeight, scaledHeight);
    const scale = Math.min(1, widthScale, areaHeight / height);

    return { scale, areaHeight, bottomPadding: (areaHeight > minHeight) ? MESSAGE_EDITOR_PREVIEW_EXPANDED_PADDING : 0 };
};
