import { useState } from 'react';

import { TemplateItem, useTemplate } from '#base/theme';

/** `refreshBadWords` gives every visible row this height, whatever its layout declares. */
const ROW_HEIGHT = 20;

/** `getBgColor` of `RoomFilterCtrl` and `WordFilterSettingsView`. */
const ROW_COLOR_SELECTED = 0x9ab8d9;
const ROW_COLOR_HOVERED = 0xb6d9ff;
const ROW_COLOR_ODD = 0xffffff;
const ROW_COLOR_EVEN = 0xe9e9e1;

interface FilterWordRowsOptions {
    /** The row's template - `ros_badword_xml`, `custom_word_filter_item_xml`. */
    rowTemplate: string;
    /** The row's text window. */
    textName: string;
    words: readonly string[];
    selectedIndex: number;
    onSelect: (index: number) => void;
}

/**
 * The word list of the room's word filter (`RoomFilterCtrl`) and the account's
 * (`WordFilterSettingsView`), which Flash builds the same way: one row per word, 20 high
 * (`refreshBadWords`), coloured by `getBgColor` - the selection over the hover, the hover over the
 * row's own stripe - and a click on its `bg_region` selects it. Returns the list's items.
 */
export const useFilterWordRows = ({ rowTemplate, textName, words, selectedIndex, onSelect }: FilterWordRowsOptions): TemplateItem[] => {
    const row = useTemplate(rowTemplate);
    const [ hoveredIndex, setHoveredIndex ] = useState(-1);

    const rowColor = (index: number) => {
        if (index === selectedIndex) return ROW_COLOR_SELECTED;
        if (index === hoveredIndex) return ROW_COLOR_HOVERED;

        return ((index % 2) !== 0) ? ROW_COLOR_ODD : ROW_COLOR_EVEN;
    };

    if (!row) return [];

    return words.map((word, index) => ({
        key: word,
        from: row,
        bindings: {
            '': { color: rowColor(index), background: true },
            bg_region: {
                onPointerTap: () => onSelect(index),
                onPointerOver: () => setHoveredIndex(index),
                onPointerOut: () => setHoveredIndex(current => ((current === index) ? -1 : current)),
            },
            [textName]: { caption: word },
        },
        arrange: ({ root }) => root()?.setHeight(ROW_HEIGHT),
    }));
};
