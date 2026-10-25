/**
 * One WIRED leaderboard panel (WIN63-202610131318 `VariableLeaderboardView`, layout
 * `variable_leaderboard_panel` of `HabboUserDefinedRoomEventsCom`): the title, with the variable
 * shown after it when the leaderboard offers more than one, the description, the column headers,
 * the page's rows and the pager.
 *
 * - The constructor takes `header_template` out of `headers_container`, `row_template` out of
 *   `rows_list` and `choice_template` out of `choice_list`; the headers and rows are clones of them
 *   (`VariableLeaderboardColumnHeaderView`, `VariableLeaderboardRowView`).
 * - `applyPresentation` sizes the window to its columns, `max(250, 38 + column widths + 20)` wide, and
 *   to its page, `rows_list` one 25 px row per entry with the rest of the layout (150 px) around it.
 * - A row (`VariableLeaderboardRowView`): the rank, the holder's face (`focusUserFace(head, 2, 0.5)`
 *   in the 24x24 `face_bitmap`) and name in `profile_region` - a click opens the profile - and one
 *   text per further column (`formatColumn`).
 * - `setBodyState`: the rows, or "Loading..." / "No entries" in their place; `setPager`.
 * - `choice_toggle` (shown with more than one variable) opens `choice_dropdown`, one
 *   `VariableLeaderboardChoiceRowView` per variable: the selected one bold with its tick, the row
 *   under the pointer lighter; a click selects it.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { IVariableLeaderboardDescriptor, IVariableLeaderboardRow } from '@nitrodevco/nitro-packets';

import { AvatarFaceImage } from '#base/components';
import { translate } from '#base/context/system';
import { leaderboardPageSize } from '#base/context/wired';
import { Box, findTemplateChild, TemplateBindings, TemplateElement, TemplateItem, TemplateWindow, TemplateWindows, useTemplate } from '#base/theme';
import { twoDigits } from '#base/utils';
import { VARIABLE_LEADERBOARD_COLUMN_CREATION, VARIABLE_LEADERBOARD_COLUMN_LAST_UPDATE, VARIABLE_LEADERBOARD_COLUMN_LEVEL, VARIABLE_LEADERBOARD_COLUMN_TEXT, VARIABLE_LEADERBOARD_COLUMN_USERNAME, VARIABLE_LEADERBOARD_COLUMN_VALUE } from '#base/wired';

const TEMPLATE = 'habbo-user-defined-room-events-com/variable_leaderboard_panel_xml';

/** `VariableLeaderboardView.MIN_WINDOW_WIDTH`. */
const MIN_WINDOW_WIDTH = 250;

/** `VariableLeaderboardView.RANK_GUTTER_WIDTH`: the rank column every row and the headers start with. */
const RANK_GUTTER_WIDTH = 38;

/** The headers the view builds (`_-U2m`), one per column a leaderboard may have. */
const HEADER_COUNT = 4;

/** `VariableLeaderboardPagingState.MAX_CLIENT_PAGE_SIZE`: the rows the view builds. */
const VARIABLE_LEADERBOARD_ROW_COUNT = 20;

/** `VariableLeaderboardRowView`'s `row_background` colours. */
const ROW_COLOR_LIGHT = 0xff242424;
const ROW_COLOR_DARK = 0xff1c1c1c;

/** `VariableLeaderboardChoiceRowView.NORMAL_BACKGROUND_COLOR` and the colour under the pointer. */
const CHOICE_COLOR = 0xffeeeeee;
const CHOICE_HOVER_COLOR = 0xffd7d7d7;

/** `VariableLeaderboardRowView.CELL_HORIZONTAL_PADDING`. */
const CELL_HORIZONTAL_PADDING = 6;

/** `profile_region`'s `username_text` starts at 31 and keeps 3 px from the region's right edge. */
const USERNAME_RIGHT_GAP = 3;

/** `focusUserFace(image, "head", 2, 0.5, 24, 24)`. */
const FACE_DIRECTION = 2;
const FACE_SCALE = 0.5;

const MINUTE_MS = 60000;
const HOUR_MS = 3600000;

/** `_-g1H.pixelWidth`: a column's width option in pixels. */
const leaderboardColumnWidth = (width: number) => [ 70, 90, 120, 170 ][width] ?? 70;

/** `getBodyState`: 0 loading, 1 rows, 2 no entries. */
export type VariableLeaderboardBodyState = 0 | 1 | 2;

/**
 * `VariableLeaderboardRowView.formatValue`: a whole number gets a comma between each group of three
 * digits (after its sign); anything else is shown as it is.
 */
const formatLeaderboardValue = (value: string | null | undefined) => {
    if (!value) return '';

    const sign = ((value[0] === '-') || (value[0] === '+')) ? value[0] : '';
    const digits = value.slice(sign.length);

    if (!digits.length || !/^[0-9]+$/.test(digits)) return value;

    const head = (digits.length % 3) || 3;
    let text = sign + digits.slice(0, head);

    for (let i = head; i < digits.length; i += 3) text += `,${digits.slice(i, i + 3)}`;

    return text;
};

/**
 * `formatTime`: "-" for no time, "Nm ago" within the hour, the time of day today, else the month
 * (without its dot) and day, with the year when it is another year.
 */
const formatLeaderboardTime = (time: number, now: number) => {
    if (time <= 0) return '-';

    const age = now - time;

    if ((age >= 0) && (age < HOUR_MS)) return translate('wiredfurni.variable_leaderboard.minutes_ago', '%minutes%m ago', { minutes: String(Math.max(1, Math.floor(age / MINUTE_MS))) });

    const date = new Date(time);
    const today = new Date(now);

    if ((date.getFullYear() === today.getFullYear()) && (date.getMonth() === today.getMonth()) && (date.getDate() === today.getDate())) return `${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}`;

    let month = translate(`wiredfurni.params.time.month.${date.getMonth() + 1}`);

    if (month.endsWith('.')) month = month.slice(0, -1);

    const day = `${month} ${date.getDate()}`;

    return (date.getFullYear() === today.getFullYear()) ? day : `${day}, ${date.getFullYear()}`;
};

/** `formatColumn`: a row's text in a column of a type. */
const formatColumn = (type: number, row: IVariableLeaderboardRow, now: number) => {
    switch (type) {
        case VARIABLE_LEADERBOARD_COLUMN_VALUE: {
            const value = formatLeaderboardValue(row.rawValue);

            return value.length ? value : '-';
        }
        case VARIABLE_LEADERBOARD_COLUMN_LAST_UPDATE:
            return formatLeaderboardTime(row.lastUpdateTime, now);
        case VARIABLE_LEADERBOARD_COLUMN_CREATION:
            return formatLeaderboardTime(row.creationTime, now);
        case VARIABLE_LEADERBOARD_COLUMN_LEVEL:
            return (row.level !== null) ? formatLeaderboardValue(row.level) : '-';
        case VARIABLE_LEADERBOARD_COLUMN_TEXT:
            return row.textConnection ?? '-';
        default:
            return '';
    }
};

/** `VariableLeaderboardColumnHeaderView.setColumn`: a value column's header is centred, the username's not. */
const createHeaderPrototype = (header: TemplateElement, centred: boolean): TemplateElement => ({
    ...header,
    children: header.children.map(child => ((child.name === 'header_text') ? { ...child, vars: { ...child.vars, auto_size: centred ? 'center' : 'none' } } : child)),
});

/** Built once per template: the template engine reuses a clone's nodes only while its prototype is the same object. */
const headerPrototypes = new WeakMap<TemplateElement, { centred: TemplateElement; plain: TemplateElement }>();

const headerPrototype = (header: TemplateElement, centred: boolean): TemplateElement => {
    let prototypes = headerPrototypes.get(header);

    if (!prototypes) {
        prototypes = { centred: createHeaderPrototype(header, true), plain: createHeaderPrototype(header, false) };
        headerPrototypes.set(header, prototypes);
    }

    return centred ? prototypes.centred : prototypes.plain;
};

export interface VariableLeaderboardViewProps {
    descriptor: IVariableLeaderboardDescriptor;
    selectedVariableId: string | null;
    bodyState: VariableLeaderboardBodyState;
    /** The page's rows, from its first. */
    rows: readonly IVariableLeaderboardRow[];
    /** The time the rows' times are told against (`refreshRelativeTimes`). */
    now: number;
    /** The rest default to a leaderboard nothing can be done with (`projectDraftView`'s): page 1 of 1, the choices closed. */
    page?: number;
    pageCount?: number;
    canPrevious?: boolean;
    canNext?: boolean;
    dropdownOpen?: boolean;
    hoveredChoice?: string | null;
    onToggleChoices?: () => void;
    onHoverChoice?: (variableId: string | null) => void;
    onSelectChoice?: (variableId: string) => void;
    onPrevious?: () => void;
    onNext?: () => void;
    onProfile?: (userId: number) => void;
}

export const VariableLeaderboardView = (props: VariableLeaderboardViewProps) => {
    const { descriptor, selectedVariableId, bodyState, rows, now, page = 0, pageCount = 1, canPrevious = false, canNext = false, dropdownOpen = false, hoveredChoice = null } = props;
    const template = useTemplate(TEMPLATE);
    const header = template && findTemplateChild(template.elements, 'header_template');

    if (!template || !header) return null;

    const { columns, choices } = descriptor;
    const columnWidths = columns.map(column => leaderboardColumnWidth(column.width));
    // The constructor's `width` / `height`: the layout around `rows_list`.
    const rowsList = findTemplateChild(template.elements, 'rows_list');
    const chromeWidth = template.width - (rowsList?.width ?? 0);
    const chromeHeight = template.height - (rowsList?.height ?? 0);
    const windowWidth = Math.max(MIN_WINDOW_WIDTH, RANK_GUTTER_WIDTH + columnWidths.reduce((sum, width) => sum + width, 0) + chromeWidth);
    const rowHeight = findTemplateChild(template.elements, 'row_template')?.height ?? 0;
    const entriesPerPage = leaderboardPageSize(descriptor);
    const multipleChoices = choices.length > 1;
    const selectedChoice = choices.find(choice => choice.variableId === selectedVariableId);
    // `updateTitle`.
    const title = (multipleChoices && selectedChoice) ? `${descriptor.title}: ${selectedChoice.displayName}` : descriptor.title;

    // `applyPresentation`: each header at its column's place, past the rank gutter.
    const headers: TemplateItem[] = [];
    let headerX = RANK_GUTTER_WIDTH;

    for (let index = 0; index < HEADER_COUNT; index++) {
        const column = columns[index];

        if (!column) {
            headers.push({ key: `header${index}`, from: header, bindings: { '': { visible: false } } });

            continue;
        }

        const x = headerX;
        const width = columnWidths[index];

        headers.push({
            key: `header${index}`,
            from: headerPrototype(header, column.type !== VARIABLE_LEADERBOARD_COLUMN_USERNAME),
            bindings: { header_text: { caption: column.label } },
            arrange: ({ root, find }: TemplateWindows) => {
                root()?.setRectangle(x, 0, width, root()?.height ?? 0);

                const text = find('header_text');

                text?.setRectangle(0, text.y, width, text.height);
            },
        });
        headerX += width;
    }

    // `configureColumns` + `setData` / `clear`: each row's cells by its leaderboard's columns.
    const rowItems: TemplateItem[] = Array.from({ length: VARIABLE_LEADERBOARD_ROW_COUNT }, (_, index): TemplateItem => {
        const row = (bodyState === 1) && (index < entriesPerPage) ? rows[index] : undefined;
        // Inference: the decompiled constructor loses which of its 20 rows take the lighter colour; every other one from the first.
        const light = (index % 2) === 0;

        if (!row) return { key: String(index), from: 'row_template', bindings: { '': { visible: false } } };

        const bindings: TemplateBindings = {
            row_background: { color: light ? ROW_COLOR_LIGHT : ROW_COLOR_DARK },
            rank_text: { caption: String(row.rank) },
            username_text: { caption: row.username },
            profile_region: { onPointerTap: () => props.onProfile?.(row.userId) },
            face_bitmap: {
                children: !!row.figure && (
                    <Box layout={{ position: 'absolute', left: 0, top: 0, width: 24, height: 24, overflow: 'hidden' }}>
                        <AvatarFaceImage
                            figure={row.figure}
                            gender={AvatarGenderType.Male}
                            direction={FACE_DIRECTION}
                            scale={FACE_SCALE}
                        />
                    </Box>
                ),
            },
        };

        for (let cell = 0; cell < 3; cell++) {
            const column = columns[cell + 1];

            bindings[`data_cell_${cell + 1}`] = column ? { caption: formatColumn(column.type, row, now) } : { visible: false, caption: '' };
        }

        return { key: String(index), from: 'row_template', bindings };
    });

    // `rebuildChoices` + `refreshChoiceRows`.
    const choiceItems: TemplateItem[] = choices.map((choice) => {
        const selected = choice.variableId === selectedVariableId;

        return {
            key: choice.variableId,
            from: 'choice_template',
            bindings: {
                '': {
                    color: (hoveredChoice === choice.variableId) ? CHOICE_HOVER_COLOR : CHOICE_COLOR,
                    onPointerTap: () => props.onSelectChoice?.(choice.variableId),
                    onPointerOver: () => props.onHoverChoice?.(choice.variableId),
                    onPointerOut: () => props.onHoverChoice?.(null),
                },
                choice_selection: { visible: selected },
                choice_text: { caption: choice.displayName, visible: !selected },
                selected_choice_text: { caption: choice.displayName, visible: selected },
            },
        };
    });

    const bindings: TemplateBindings = {
        title_text: { caption: title },
        description_text: { caption: descriptor.description, visible: descriptor.description.length > 0 },
        choice_toggle: { visible: multipleChoices, onPointerTap: props.onToggleChoices },
        headers_container: { added: headers },
        header_template: { visible: false },
        rows_list: { visible: bodyState === 1, items: rowItems },
        // `setBodyState`.
        body_state_text: { visible: bodyState !== 1, caption: (bodyState === 0) ? '${wiredfurni.variable_leaderboard.loading}' : (bodyState === 2) ? '${wiredfurni.variable_leaderboard.no_entries}' : '' },
        // `setPager`.
        page_text: { caption: translate('wiredfurni.variable_leaderboard.page', 'Page %page% / %pages%', { page: String(page + 1), pages: String(pageCount) }) },
        previous_button: { disabled: !canPrevious, onPointerTap: props.onPrevious },
        next_button: { disabled: !canNext, onPointerTap: props.onNext },
        choice_dropdown: { visible: multipleChoices && dropdownOpen },
        choice_list: { items: choiceItems },
    };

    const arrange = ({ root, find }: TemplateWindows) => {
        const window = root();
        const list = find('rows_list');

        if (!window || !list) return;

        window.setWidth(windowWidth);
        list.setHeight(entriesPerPage * rowHeight);
        window.setHeight(list.height + chromeHeight);

        // `configureColumns`, on every row once the window has its width.
        for (let index = 0; index < VARIABLE_LEADERBOARD_ROW_COUNT; index++) {
            const row = `rows_list/@${index}`;

            find(row)?.setWidth(list.width);

            const region = find(`${row}/profile_region`);
            const username = find(`${row}/username_text`);

            region?.setRectangle(RANK_GUTTER_WIDTH, region.y, columnWidths[0], region.height);
            username?.setWidth(Math.max(0, columnWidths[0] - username.x - USERNAME_RIGHT_GAP));

            let x = RANK_GUTTER_WIDTH + columnWidths[0];

            for (let cell = 1; cell < columns.length; cell++) {
                const text = find(`${row}/data_cell_${cell}`);

                text?.setRectangle(x + (CELL_HORIZONTAL_PADDING / 2), text.y, Math.max(0, columnWidths[cell] - CELL_HORIZONTAL_PADDING), text.height);
                x += columnWidths[cell];
            }
        }

        const choiceList = find('choice_list');
        const dropdown = find('choice_dropdown');
        const choiceHeight = findTemplateChild(template.elements, 'choice_template')?.height ?? 22;

        choiceList?.setHeight(choices.length * choiceHeight);
        if (choiceList) dropdown?.setHeight(choiceList.height + 4);
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            bindings={bindings}
            arrange={arrange}
        />
    );
};
