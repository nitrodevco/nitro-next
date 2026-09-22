import { useState } from 'react';

import { LayoutImage, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/**
 * The eight colours the `stickie` layout offers (its `blue` .. `cyan` buttons), in its own
 * left-to-right order. They are the eight `FurnitureStickieLogic.setColorIndexFromItemData`
 * maps to `furniture_color` 1-8 in the room; a colour outside the list is shown as yellow (4).
 */
const STICKIE_COLORS: string[] = [ '9CCEFF', 'FF9CFF', '9CFF9C', 'FFFF33', 'FFFFFF', 'FF9C9C', 'FFCC66', '9CFFFF' ];

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
 * A post-it, on the `stickie` layout (185x178) that `StickieFurniWidget.showInterface` builds at
 * (100, 100): the colour strip and the bin along the top, the close button opposite them, and the
 * note filling the rest. The whole note drags by its paper (`bg` is the drag trigger of the
 * container, and like the buttons it answers only where its bitmap is at least 10 opaque).
 *
 * A plain `post_it` is blank paper tinted to its colour, and is the only kind that offers the
 * colour strip; a themed one (`post_it_dreams` and friends) brings its own art untinted, which
 * is how `StickieFurniWidget` resolved it. Editing is for the room's owner and its controllers;
 * Flash leaves the field editable for everyone and lets the server refuse, where this shows the
 * text read-only in the field's box.
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

    return (
        <Region
            dragTarget
            layout={{ position: 'absolute', left: 100, top: 100, width: 185, height: 178 }}
        >
            <ThemeImage
                src={LayoutImage(isPlain ? 'room-ui/stickie_blanco.png' : `room-ui/${objectType.replace('post_it', 'stickie')}.png`)}
                tint={isPlain ? `#${colorHex}` : undefined}
                bitmap={{}}
                hitThreshold={10}
                dragTrigger
                layout={{ position: 'absolute', left: 0, top: 0, width: 185, height: 178 }}
            />
            {canModify && (
                <ThemeImage
                    src={LayoutImage('room-ui/stickie_remove.png')}
                    bitmap={{}}
                    hitThreshold={10}
                    cursor="pointer"
                    onPointerTap={onDelete}
                    layout={{ position: 'absolute', left: 9, top: 4, width: 10, height: 10 }}
                />
            )}
            {canModify && isPlain && STICKIE_COLORS.map((color, index) => (
                <Region
                    key={color}
                    backgroundColor={`#${color}`}
                    cursor="pointer"
                    onPointerTap={() => onSave(color, draft)}
                    layout={{ position: 'absolute', left: 26 + (index * 12), top: 5, width: 9, height: 9 }}
                />
            ))}
            <ThemeImage
                src={LayoutImage('room-ui/stickie_close.png')}
                bitmap={{}}
                hitThreshold={10}
                cursor="pointer"
                onPointerTap={onClose}
                layout={{ position: 'absolute', left: 168, top: 5, width: 10, height: 10 }}
            />
            {canModify
                ? (
                        <TextInput
                            value={draft}
                            onChange={setDraft}
                            onFocusChange={focused => (!focused && draft !== text) && onSave(colorHex, draft)}
                            multiline
                            maxLength={500}
                            flashPlacement
                            alwaysShowSelection
                            backgroundColor={null}
                            focusedBackgroundColor={null}
                            layout={{ position: 'absolute', left: 5, top: 24, width: 175, height: 135 }}
                        />
                    )
                : (
                        <ThemeText
                            text={text}
                            textOptions={{ wordWrap: true, wordWrapWidth: 171 }}
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 5, top: 24, width: 175, height: 135 }}
                        />
                    )}
        </Region>
    );
};
