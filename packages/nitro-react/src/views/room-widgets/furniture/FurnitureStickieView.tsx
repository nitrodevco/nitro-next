import { useState } from 'react';

import { LayoutImage, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/**
 * The eight colours the `stickie` layout offers, in its own left-to-right order. Only the first
 * four have a matching sprite colour in `FurnitureStickieLogic`; the rest fall back to yellow
 * paper in the room, which is what the Flash client did too.
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
 * A post-it, at the `stickie` layout's own size (185x178): the colour strip and the bin along
 * the top, the close button opposite them, and the note filling the rest.
 *
 * A plain `post_it` is blank paper tinted to its colour, and is the only kind that offers the
 * colour strip; a themed one (`post_it_dreams` and friends) brings its own art untinted, which
 * is how `StickieFurniWidget` resolved it. Editing is for the room's owner and its controllers.
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
        <Region layout={{ position: 'absolute', top: 120, left: 120, width: 185, height: 178 }}>
            <ThemeImage
                src={LayoutImage(isPlain ? 'stickie_blanco.png' : `${objectType.replace('post_it', 'stickie')}.png`)}
                tint={isPlain ? `#${colorHex}` : undefined}
                layout={{ position: 'absolute', left: 0, top: 0, width: 185, height: 178 }}
            />
            {canModify && (
                <Region
                    cursor="pointer"
                    onPointerTap={onDelete}
                    layout={{ position: 'absolute', left: 9, top: 4, width: 10, height: 10 }}
                >
                    <ThemeImage src={LayoutImage('stickie_remove.png')} />
                </Region>
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
            <Region
                cursor="pointer"
                onPointerTap={onClose}
                layout={{ position: 'absolute', right: 7, top: 5, width: 10, height: 10 }}
            >
                <ThemeImage src={LayoutImage('stickie_close.png')} />
            </Region>
            {canModify
                ? (
                        <TextInput
                            value={draft}
                            onChange={setDraft}
                            onFocusChange={focused => (!focused && draft !== text) && onSave(colorHex, draft)}
                            multiline
                            maxLength={500}
                            backgroundColor="#00000000"
                            layout={{ position: 'absolute', left: 5, right: 5, top: 20, height: 135 }}
                        />
                    )
                : (
                        <ThemeText
                            text={text}
                            textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 175 }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 5, right: 5, top: 20, height: 135 }}
                        />
                    )}
        </Region>
    );
};
