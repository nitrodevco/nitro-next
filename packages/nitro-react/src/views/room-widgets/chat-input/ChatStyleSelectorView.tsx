import { Container as PixiContainer } from 'pixi.js';
import { useRef, useState } from 'react';

import { IChatStyle } from '#base/chat';
import { Border, Box, Region, ThemeImage, useOutsideClick } from '#base/theme';

/** `ChatStyleSelector._Str_16506` - the grid never grows past three columns. */
const MAX_COLUMNS = 3;
/** `chatstyle_template` - one swatch is 55x34 with a 1px gap. */
const ENTRY_WIDTH = 55;
const ENTRY_HEIGHT = 34;
const ENTRY_SPACING = 1;

export interface ChatStyleSelectorViewProps {
    styles: IChatStyle[];
    selectedStyleId: number;
    onSelect: (styleId: number) => void;
    onClose: () => void;
}

interface ChatStyleEntryProps {
    style: IChatStyle;
    selected: boolean;
    onSelect: () => void;
}

/** One `chatstyle_template` cell: the style's `selector_preview` bitmap over a highlight that shows when selected or hovered. */
const ChatStyleEntry = ({ style, selected, onSelect }: ChatStyleEntryProps) => {
    const [ hovered, setHovered ] = useState(false);

    return (
        <Region
            name="chatstyle_region"
            cursor="pointer"
            onPointerTap={onSelect}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            layout={{ width: ENTRY_WIDTH, height: ENTRY_HEIGHT, justifyContent: 'center', alignItems: 'center' }}
        >
            {(selected || hovered) && (
                <Border
                    variant="2"
                    name="background_color"
                    tintColor={hovered ? '#b0b0b0' : '#ffffff'}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            )}
            {style.selectorPreviewTexture && (
                <ThemeImage
                    name="bubble_preview"
                    texture={style.selectorPreviewTexture}
                />
            )}
        </Region>
    );
};

/**
 * The Flash `styleselector_menu_new` + `ChatStyleGridView`: a dark translucent panel with the
 * pickable bubble styles laid out column-first (the client's `itemgrid_vertical`), one column
 * per six styles up to three. Closes on a pick or a click anywhere else.
 */
export const ChatStyleSelectorView = ({ styles, selectedStyleId, onSelect, onClose }: ChatStyleSelectorViewProps) => {
    const panelRef = useRef<PixiContainer | null>(null);

    useOutsideClick(panelRef, onClose);

    const columns = Math.max(1, Math.min(Math.floor(styles.length / 6) + 1, MAX_COLUMNS));
    const rows = Math.max(1, Math.ceil(styles.length / columns));
    const gridWidth = (columns * (ENTRY_WIDTH + ENTRY_SPACING)) - ENTRY_SPACING;
    const gridHeight = (rows * (ENTRY_HEIGHT + ENTRY_SPACING)) - ENTRY_SPACING;

    return (
        <Box
            ref={panelRef}
            zIndex={20}
            layout={{ position: 'absolute', left: 0, bottom: 35, width: gridWidth + 12, height: gridHeight + 8 }}
        >
            <Border
                variant="2"
                tintColor="#24231e"
                blend={0.8}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Region
                name="itemgrid"
                layout={{ position: 'absolute', left: 6, top: 5, width: gridWidth, height: gridHeight, flexDirection: 'column', flexWrap: 'wrap', gap: ENTRY_SPACING }}
            >
                {styles.map(style => (
                    <ChatStyleEntry
                        key={style.id}
                        style={style}
                        selected={style.id === selectedStyleId}
                        onSelect={() => onSelect(style.id)}
                    />
                ))}
            </Region>
        </Box>
    );
};
