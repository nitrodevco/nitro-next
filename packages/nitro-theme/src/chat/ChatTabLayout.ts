/**
 * A port of the Flash `ChatTabLayout` (`freeflowchat/viewer/visualization/ChatTabLayout.as`,
 * WIN63-202610121624): a notification bubble whose text has `[a]` markers lines its cells up in
 * columns. Every cell but each row's last is measured on its own line, unwrapped; a column's tab
 * stop is the widest cell so far plus `COLUMN_GAP` (scaled with the chat font). The markers then
 * become tab characters that the text block advances to those stops.
 */
import { FlashTextFormat, FlashTextLine } from '../font/flash-text';
import { CHAT_TABLE_TAB_MARKER } from './ChatMarkup';

/** `ChatTabLayout.COLUMN_GAP`. */
const COLUMN_GAP = 8;

/** `ChatTabLayout.LITERAL_TAB_SPACES`: a tab the user typed is four spaces, so only markers make columns. */
const LITERAL_TAB_SPACES = '    ';

/** `ChatTabLayout.MEASUREMENT_GUARD_BASE`. */
const MEASUREMENT_GUARD_BASE = '|';

export interface ChatTabLayoutResult {
    /** The markup with every marker a tab character (`createRenderedHtml`). */
    markup: string;
    /** `TextFormat.tabStops` for the bubble's text. */
    tabStops: number[];
}

/** Parses markup into runs and lays them out unwrapped; `null` when it cannot be measured. */
export type ChatTabMeasureLayout = (markup: string) => { lines: FlashTextLine[]; measure: (text: string, format: FlashTextFormat) => number | null } | null;

/** `createMeasurementGuard`: a run of `|` the text does not contain, ending every measured cell. */
const createMeasurementGuard = (text: string): string => {
    let guard = MEASUREMENT_GUARD_BASE;

    while (text.indexOf(guard) !== -1) guard += MEASUREMENT_GUARD_BASE;

    return guard;
};

/** The format of the line's last character - the guard's. */
const lastFormat = (line: FlashTextLine): FlashTextFormat | undefined => line.segments[line.segments.length - 1]?.format;

/**
 * `ChatTabLayout.apply` with table tabs on: the column stops for `markup` and the markup to
 * render with them. `null` when a cell cannot be measured (the caller draws the text as it is).
 */
export const layoutChatTabs = (markup: string, fontSizeScale: number, measureLayout: ChatTabMeasureLayout): ChatTabLayoutResult | null => {
    const text = markup.split('\t').join(LITERAL_TAB_SPACES).replace(/\r\n?/g, '\n');
    const rows = text.split('\n').map(row => row.split(CHAT_TABLE_TAB_MARKER));
    const guard = createMeasurementGuard(text);
    const measured = measureLayout(rows.flat().join(`${guard}\n`) + guard);

    if (!measured) return null;

    const { lines, measure } = measured;
    const columnWidths: number[] = [];
    const terminalRows: boolean[] = [];
    let lineIndex = 0;

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const cells = rows[rowIndex];

        for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
            const line = lines[lineIndex++];

            if (!line) return null;

            // `getCellWidth`: where the guard starts is the cell's width.
            const format = lastFormat(line);
            const guardWidth = format ? measure(guard, format) : 0;

            if (guardWidth == null) return null;

            const cellWidth = Math.max(0, line.width - guardWidth);

            if ((cellIndex < (cells.length - 1)) && ((columnWidths[cellIndex] === undefined) || (cellWidth > columnWidths[cellIndex]))) columnWidths[cellIndex] = cellWidth;

            // `hasVisibleContent`: a row whose last cell is blank ends on its last marker.
            if ((cellIndex === (cells.length - 1)) && (cells.length > 1)) terminalRows[rowIndex] = (line.text.slice(0, line.text.lastIndexOf(guard)).search(/[^ \t]/) === -1);
        }
    }

    const gap = Math.max(1, Math.round(COLUMN_GAP * fontSizeScale));
    const tabStops: number[] = [];
    let stop = 0;

    for (const width of columnWidths) {
        stop += Math.trunc(Math.ceil(width)) + gap;
        tabStops.push(stop);
    }

    // `createRenderedHtml`.
    const rendered = text.split('\n').map((row, rowIndex) => {
        if (terminalRows[rowIndex]) {
            const index = row.lastIndexOf(CHAT_TABLE_TAB_MARKER);

            row = row.substring(0, index) + row.substring(index + CHAT_TABLE_TAB_MARKER.length);
        }

        return row.split(CHAT_TABLE_TAB_MARKER).join('\t');
    });

    return { markup: rendered.join('\n'), tabStops };
};
