/**
 * The column layout `RadioGroupPreset` and `CheckboxGroupPreset` share: with one column the
 * options stack; with more, they fill rows of `columns` cells of equal width,
 * `(width - (columns - 1) * genericHorizontalSpacing) / columns`, a row being as high as its
 * tallest option. An option flagged `newLine` (radio groups only) ends its row and spans what is
 * left of it (`spanRemainingWidth`).
 *
 * The cell widths depend on the group's own width, so the grid measures itself; until the first
 * measurement the cells share their row evenly. Once measured every cell has its fixed width, so
 * a short last row (or two options in a four-column group) keeps to the first columns, as the
 * Flash presets place it.
 * Internal to the kit.
 */
import { Container } from 'pixi.js';
import { ReactNode, useState } from 'react';

import { Box, BoxLayout, useLayoutSize } from '#base/theme';

import { useWiredFillLayout } from './useWiredFillLayout';
import { WiredFlow } from './WiredFlow';
import { useWiredStyle } from './WiredStyleContext';

export interface WiredOptionGridCell {
    key: string | number;
    /** `RadioButtonParam.newLine`. */
    newLine?: boolean;
    render: (layout: BoxLayout) => ReactNode;
}

export interface WiredOptionGridProps {
    columns: number;
    cells: WiredOptionGridCell[];
}

interface PlacedCell {
    cell: WiredOptionGridCell;
    column: number;
}

/** The constructors' row building: a row ends after `columns` cells, or after a `newLine` one. */
const placeCells = (cells: WiredOptionGridCell[], columns: number): PlacedCell[][] => {
    const rows: PlacedCell[][] = [];
    let column = 0;

    for (const cell of cells) {
        if (column === 0) rows.push([]);

        rows[rows.length - 1].push({ cell, column });

        column = (cell.newLine || (column === (columns - 1))) ? 0 : (column + 1);
    }

    return rows;
};

export const WiredOptionGrid = ({ columns, cells }: WiredOptionGridProps) => {
    const style = useWiredStyle();
    const fillLayout = useWiredFillLayout();
    const [ node, setNode ] = useState<Container | null>(null);
    const { width } = useLayoutSize(node);

    if (columns <= 1) {
        return (
            <Box layout={{ flexDirection: 'column', flexShrink: 0, ...fillLayout }}>
                <WiredFlow direction="column">
                    {cells.map(cell => cell.render({ alignSelf: 'stretch' }))}
                </WiredFlow>
            </Box>
        );
    }

    const gap = style.genericHorizontalSpacing;
    const cellWidth = Math.trunc((Math.floor(width) - ((columns - 1) * gap)) / columns);
    const measured = (width > 0) && (cellWidth > 0);

    return (
        <Box
            ref={setNode}
            layout={{ flexDirection: 'column', flexShrink: 0, ...fillLayout }}
        >
            <WiredFlow direction="column">
                {placeCells(cells, columns).map((row, rowIndex) => (
                    <Box
                        key={rowIndex}
                        layout={{ flexDirection: 'row', alignItems: 'flex-start', gap, alignSelf: 'stretch' }}
                    >
                        {row.map(({ cell, column }) => {
                            if (!measured) return cell.render({ flexGrow: cell.newLine ? (columns - column) : 1, flexShrink: 1, flexBasis: 0, minWidth: 0 });

                            const taken = (column * cellWidth) + (column * gap);

                            const cellSize = cell.newLine ? Math.max(cellWidth, Math.floor(width) - taken) : cellWidth;

                            // Every key of the unmeasured layout is overwritten: the layout engine merges a
                            // node's new style into the old one, and a `flexGrow: 1` left behind spreads a
                            // short row across the whole width.
                            return cell.render({ width: cellSize, flexGrow: 0, flexShrink: 0, flexBasis: cellSize, minWidth: 0 });
                        })}
                    </Box>
                ))}
            </WiredFlow>
        </Box>
    );
};
