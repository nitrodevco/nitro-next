import { useState } from 'react';

import { LayoutImage, TemplateBindings } from '#base/theme';

import { FurnitureTemplatePanel } from './FurnitureTemplatePanel';

/**
 * `StickieFurniWidget.COLOR_BUTTON_NAMES`, with the colour each button of the `stickie` layout is
 * (`sendSetColor(button.color)`). They are the eight `FurnitureStickieLogic.setColorIndexFromItemData`
 * maps to `furniture_color` 1-8 in the room.
 */
const STICKIE_COLORS: readonly (readonly [ name: string, hex: string ])[] = [
    [ 'blue', '9CCEFF' ],
    [ 'purple', 'FF9CFF' ],
    [ 'green', '9CFF9C' ],
    [ 'yellow', 'FFFF33' ],
    [ 'white', 'FFFFFF' ],
    [ 'red', 'FF9C9C' ],
    [ 'orange', 'FFCC66' ],
    [ 'cyan', '9CFFFF' ],
];

/** `showInterface`: the container the layout is built into is made at (100, 100). */
const NOTE_POSITION = 100;

export interface FurnitureStickieViewProps {
    /** The object's type: a themed post-it (`post_it_dreams`) has its own paper and no colours. */
    objectType: string;
    colorHex: string;
    text: string;
    canModify: boolean;
    onSave: (colorHex: string, text: string) => void;
    onDelete: () => void;
    onClose: () => void;
}

/**
 * A post-it - `StickieFurniWidget.showInterface`, which builds the `stickie` layout into a container
 * at (100, 100): `text` the note, `bg` (tag `bg`) its paper, `close_button` the close and
 * `delete_button` the bin, each bitmap drawn from the library's art (`stickie_close`,
 * `stickie_remove`), and the colour buttons (`setColorButtons`) shown only to a controller of a
 * plain `post_it`. The note drags by its paper: the root is only the drag target, `bg` its trigger.
 *
 * A plain `post_it` is `stickie_blanco` tinted to its colour (`bg.color = 0xFF<colour>`); a themed one
 * brings its own art untinted (`post_it` read as `stickie` in its type). The bin and its press are
 * the controller's only. Flash leaves the field editable for everyone and lets the server refuse,
 * where this shows the text read-only in the field (`disabled`); the text is saved when the field
 * loses the focus, and a colour press saves it with the colour (`storeTextFromField`).
 */
export const FurnitureStickieView = ({ objectType, colorHex, text, canModify, onSave, onDelete, onClose }: FurnitureStickieViewProps) => {
    const [ draft, setDraft ] = useState<string>(text);
    const [ lastText, setLastText ] = useState<string>(text);

    // The server's copy always wins: a save coming back, or someone else's edit, replaces the
    // draft. Adjusted during render rather than in an effect, as React advises for derived state.
    if (text !== lastText) {
        setLastText(text);
        setDraft(text);
    }

    const isPlain = objectType === 'post_it';
    const showColors = canModify && isPlain;

    const bindings: TemplateBindings = {
        bg: isPlain
            ? { asset: LayoutImage('habbo-room-ui-com/stickie_blanco.png'), color: (0xff000000 | Number.parseInt(colorHex, 16)) >>> 0 }
            : { asset: LayoutImage(`habbo-room-ui-com/${objectType.replace('post_it', 'stickie')}.png`) },
        close: { asset: LayoutImage('habbo-room-ui-com/stickie_close.png'), onPointerTap: onClose },
        delete: { visible: canModify, asset: LayoutImage('habbo-room-ui-com/stickie_remove.png'), onPointerTap: canModify ? onDelete : undefined },
        text: {
            caption: draft,
            onChange: setDraft,
            disabled: !canModify,
            onBlur: () => {
                if (canModify && (draft !== text)) onSave(colorHex, draft);
            },
        },
    };

    for (const [ name, hex ] of STICKIE_COLORS) bindings[name] = { visible: showColors, onPointerTap: showColors ? () => onSave(hex, draft) : undefined };

    return (
        <FurnitureTemplatePanel
            id="habbo-room-ui-com/stickie"
            position={{ x: NOTE_POSITION, y: NOTE_POSITION }}
            bindings={bindings}
        />
    );
};
