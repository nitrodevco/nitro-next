/**
 * `uibuilder/presets/applications/MessageEditorPreset` (WIN63-202610121624) - the message field
 * of Show Message and the bot talk boxes: the box's text area beside an asset button
 * (`message_editor_popout`) that opens the Message Editor window (`WiredMessageEditorPopup`).
 * Both edit the same text. The window is only there in a style that has the editor's templates
 * (illumina); Flash throws for any other, so there the button opens nothing. It closes with the
 * box's editor (`onEditEnd` -> `hideEditor`), as unmounting does here.
 */
import { useState } from 'react';

import { WiredAssetButton } from './WiredAssetButton';
import { WiredMessageEditorPopup, WiredMessageEditorPreviewSettings } from './WiredMessageEditorPopup';
import { WiredSimpleList } from './WiredSimpleList';
import { useWiredStyle } from './WiredStyleContext';
import { WiredTextArea } from './WiredTextArea';

export interface WiredMessageEditorProps {
    value: string;
    onChange: (value: string) => void;
    /** The box's `TextAreaParam`: height, line and character limits. */
    height: number;
    maxLines: number;
    maxCharacters: number;
    tooltip?: string;
    /** `setTextReferences(wiredContext.textPlaceholders)`. */
    placeholderNames: readonly string[];
    /** What the box's preview callbacks answer: style, width and chat type. */
    preview: WiredMessageEditorPreviewSettings;
}

export const WiredMessageEditor = ({ value, onChange, height, maxLines, maxCharacters, tooltip, placeholderNames, preview }: WiredMessageEditorProps) => {
    const style = useWiredStyle();
    const template = style.templates.messageEditor;
    const [ open, setOpen ] = useState(false);

    return (
        <>
            {/* `createSimpleListView(false, [ textArea, popout ], true)`. */}
            <WiredSimpleList
                vertical={false}
                centerVertically
            >
                <WiredTextArea
                    value={value}
                    onChange={onChange}
                    height={height}
                    maxLines={maxLines}
                    maxCharacters={maxCharacters}
                    tooltip={tooltip}
                />
                <WiredAssetButton
                    asset="message_editor_popout"
                    tooltip="${wiredfurni.params.message_editor.open.tooltip}"
                    onPress={() => setOpen(!!template)}
                />
            </WiredSimpleList>
            {open && template && (
                <WiredMessageEditorPopup
                    template={template}
                    value={value}
                    onChange={onChange}
                    maxCharacters={maxCharacters}
                    maxLines={maxLines}
                    placeholderNames={placeholderNames}
                    preview={preview}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
};
