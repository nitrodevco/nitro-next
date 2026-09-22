import { IRoomInfo, ISearchResultList } from '@nitrodevco/nitro-packets';
import { ReactNode } from 'react';

import { useNavigatorStore } from '#base/context/navigator';
import { useInterpolate, useTranslation } from '#base/context/system';
import { LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { ALTERNATING_COLOR_MOD, ALTERNATING_COLOR_NONE, getModulatedBackgroundColor, ROW_BASE_COLOR, TILE_BASE_COLOR } from './NavigatorRoomEntryUtils';
import { NavigatorRoomEntryView } from './NavigatorRoomEntryView';

export const RESULTS_MODE_ROWS = 0;
export const RESULTS_MODE_TILES = 1;

/** `RoomEntryElementFactory.TILES_PER_CONTAINER`. */
const TILES_PER_CONTAINER = 3;
/** `CategoryElementFactory.MARGIN_LAYOUT_CATEGORY_CONTAINER`: a category is `block_results`' width (407) less 13. */
const CATEGORY_WIDTH = 407 - 13;

export interface NavigatorCategoryViewProps {
    block: ISearchResultList;
    onEnter: (room: IRoomInfo) => void;
    onShowInfo?: (room: IRoomInfo) => void;
    onCollapse: (searchCode: string) => void;
    onShowMore: (searchCode: string) => void;
    onBack: () => void;
    onAddQuickLink: (searchCode: string) => void;
    onToggleMode: (searchCode: string, viewMode: number) => void;
}

interface HeaderControlProps {
    name: string;
    tooltip: string;
    image: string;
    width?: number;
    imageWidth?: number;
    imageTop?: number;
    onTap: () => void;
}

/** One `category_controls_itemlist` entry: an 11x18 region at y 4 holding its 11x19 (18x19 for the quick link) bitmap. */
const HeaderControl = ({ name, tooltip, image, width = 11, imageWidth = 11, imageTop = 0, onTap }: HeaderControlProps) => (
    <Region
        name={name}
        tooltip={tooltip}
        cursor="pointer"
        onPointerTap={onTap}
        layout={{ width, height: 18, marginTop: 4, flexShrink: 0, overflow: 'hidden' }}
    >
        <ThemeImage
            src={image}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
            layout={{ position: 'absolute', left: 0, width: imageWidth, top: imageTop, height: 19 }}
        />
    </Region>
);

/**
 * One search result block of `navigator_frame_2`: `category_container` (open) or
 * `category_container_collapsed`, filled by `CategoryElementFactory.getOpenCategoryElement` /
 * `getCollapsedCategoryElement`.
 *
 * - Open: `category_collapse` (hidden, and `category_back` shown, when `actionAllowed == 2`) and
 *   `category_name_region` both collapse; the controls list shows `category_toggle_tiles` /
 *   `category_toggle_rows` only with the `NAVIGATOR_ROOM_THUMBNAIL_CAMERA` perk,
 *   `category_show_more` for `actionAllowed == 1` and `category_add_quick_link` outside
 *   `official_view`. Hidden list items take no room (`ItemListController` skips them).
 * - The block's `category_content_background` resizes round its header and `category_content`
 *   (`resize_to_accommodate_children`); the content list has no spacing in rows mode and 5 in
 *   tiles mode, three tiles to a `navigator_entry_tile_container`, and the alternating colour
 *   steps once per row or per tile container.
 *
 * Every control is a `<static_bitmap>` of the `newnavigator` asset library, so they are drawn as
 * layout art rather than icon-set styles.
 */
export const NavigatorCategoryView = ({ block, onEnter, onShowInfo, onCollapse, onShowMore, onBack, onAddQuickLink, onToggleMode }: NavigatorCategoryViewProps) => {
    const collapsedCategories = useNavigatorStore(x => x.collapsedCategories);
    const searchResult = useNavigatorStore(x => x.searchResult);
    const viewModes = useNavigatorStore(x => x.viewModes);
    const perks = useNavigatorStore(x => x.perks);
    const interpolate = useInterpolate();
    const t = useTranslation();

    const isSingleBlock = (searchResult?.blocks.length ?? 0) === 1;
    const isCollapsed = (collapsedCategories.includes(block.searchCode) && !isSingleBlock) || block.forceClosed;
    const storedMode = viewModes[block.searchCode] ?? block.viewMode;
    const isOfficialView = (searchResult?.searchCodeOriginal ?? '').indexOf('official_view') !== -1;
    const canToggleView = perks.some(x => x.code === 'NAVIGATOR_ROOM_THUMBNAIL_CAMERA' && x.isAllowed);

    const title = block.text === '' ? `\${navigator.searchcode.title.${block.searchCode}}` : block.text;
    const mode = (!canToggleView && searchResult?.searchCodeOriginal !== 'official_view') ? RESULTS_MODE_ROWS : storedMode;

    const showMore = (block.actionAllowed === 1) && (
        <HeaderControl
            name="category_show_more"
            tooltip={t('navigator.tooltip.category.show.more')}
            image={LayoutImage('navigator/newnavigator_button_category_show_more.png')}
            imageTop={1}
            onTap={() => onShowMore(block.searchCode)}
        />
    );

    const addQuickLink = !isOfficialView && (
        <HeaderControl
            name="category_add_quick_link"
            tooltip={t('navigator.tooltip.add.saved.search')}
            image={LayoutImage('navigator/newnavigator_button_quicklink_add.png')}
            width={isCollapsed ? 20 : 19}
            imageWidth={18}
            onTap={() => onAddQuickLink(block.searchCode)}
        />
    );

    const categoryName = (
        <ThemeText
            name="category_name"
            text={interpolate(title)}
            textStyle="u_regular"
            textOptions={{ fill: '#0f557b', fontSize: 14 }}
            verticalAlign="top"
            layout={{ position: 'absolute', left: 20, top: 5, height: 19, maxWidth: isCollapsed ? undefined : 270 }}
        />
    );

    if (isCollapsed) {
        return (
            <Region
                name="category_container_collapsed"
                layout={{ height: 26, width: CATEGORY_WIDTH, marginLeft: 2, flexShrink: 0 }}
            >
                <Region
                    name="category_header"
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 26, overflow: 'hidden' }}
                >
                    <Region
                        name="category_name_region"
                        cursor="pointer"
                        onPointerTap={() => onCollapse(block.searchCode)}
                        layout={{ position: 'absolute', left: 0, width: 209, top: 0, height: 27 }}
                    >
                        <Region
                            name="category_expand"
                            tooltip={t('navigator.tooltip.category.expand')}
                            layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 18, overflow: 'hidden' }}
                        >
                            <ThemeImage
                                src={LayoutImage('navigator/newnavigator_button_category_expand.png')}
                                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
                            />
                        </Region>
                        {categoryName}
                    </Region>
                    <Region
                        name="category_controls_itemlist"
                        layout={{ position: 'absolute', left: 347, top: 1, height: 24, flexDirection: 'row', gap: 5 }}
                    >
                        {showMore}
                        {addQuickLink}
                    </Region>
                </Region>
            </Region>
        );
    }

    const colorFor = (accumulator: number, base: number) => getModulatedBackgroundColor((accumulator % 2 === 0) ? ALTERNATING_COLOR_NONE : ALTERNATING_COLOR_MOD, base);

    const renderEntry = (room: IRoomInfo, backgroundColor: string) => (
        <NavigatorRoomEntryView
            key={room.roomId}
            backgroundColor={backgroundColor}
            mode={mode}
            room={room}
            onEnter={onEnter}
            onShowInfo={onShowInfo}
        />
    );

    let content: ReactNode;

    if (mode === RESULTS_MODE_TILES) {
        const containers: IRoomInfo[][] = [];

        block.guestRooms.forEach((room, index) => {
            if ((index % TILES_PER_CONTAINER) === 0) containers.push([]);

            containers[containers.length - 1].push(room);
        });

        content = containers.map((rooms, index) => (
            <Region
                key={rooms[0].roomId}
                name="navigator_entry_tile_container"
                layout={{ height: 146, width: 392, flexShrink: 0, flexDirection: 'row', gap: 7 }}
            >
                {rooms.map(room => renderEntry(room, colorFor(1 + index, TILE_BASE_COLOR)))}
            </Region>
        ));
    } else {
        content = block.guestRooms.map((room, index) => renderEntry(room, colorFor(1 + index, ROW_BASE_COLOR)));
    }

    return (
        <Region
            name="category_container"
            layout={{ width: CATEGORY_WIDTH, marginLeft: 2, flexShrink: 0 }}
        >
            <Region
                name="category_content_background"
                backgroundColor="#ffffff"
                layout={{ width: '100%', minHeight: 30 }}
            >
                <Region
                    name="category_header"
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30 }}
                >
                    {(block.actionAllowed !== 2) && (
                        <Region
                            name="category_collapse"
                            tooltip={t('navigator.tooltip.category.collapse')}
                            cursor="pointer"
                            onPointerTap={() => onCollapse(block.searchCode)}
                            layout={{ position: 'absolute', left: 5, width: 11, top: 7, height: 19 }}
                        >
                            <ThemeImage
                                src={LayoutImage('navigator/newnavigator_button_category_collapse.png')}
                                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                layout={{ position: 'absolute', left: 0, width: 11, top: 0, height: 19 }}
                            />
                        </Region>
                    )}
                    <Region
                        name="category_name_region"
                        cursor="pointer"
                        onPointerTap={() => onCollapse(block.searchCode)}
                        layout={{ position: 'absolute', left: 0, width: 142, top: 0, height: 27 }}
                    >
                        {categoryName}
                    </Region>
                    <Region
                        name="category_controls_itemlist"
                        layout={{ position: 'absolute', left: 299, top: 1, height: 26, flexDirection: 'row', gap: 5 }}
                    >
                        {canToggleView && ((mode === RESULTS_MODE_ROWS)
                            ? (
                                    <HeaderControl
                                        name="category_toggle_tiles"
                                        tooltip={t('navigator.tooltip.tiles')}
                                        image={LayoutImage('navigator/newnavigator_nav_view_thumbs.png')}
                                        onTap={() => onToggleMode(block.searchCode, RESULTS_MODE_TILES)}
                                    />
                                )
                            : (
                                    <HeaderControl
                                        name="category_toggle_rows"
                                        tooltip={t('navigator.tooltip.rows')}
                                        image={LayoutImage('navigator/newnavigator_nav_view_row.png')}
                                        onTap={() => onToggleMode(block.searchCode, RESULTS_MODE_ROWS)}
                                    />
                                ))}
                        {showMore}
                        {(block.actionAllowed === 2) && (
                            <HeaderControl
                                name="category_back"
                                tooltip={t('navigator.back')}
                                image={LayoutImage('navigator/newnavigator_nav_view_mini.png')}
                                onTap={onBack}
                            />
                        )}
                        {addQuickLink}
                    </Region>
                </Region>
                <Region
                    name="category_content"
                    layout={{ flexDirection: 'column', gap: (mode === RESULTS_MODE_ROWS) ? 0 : 5, marginTop: 29, marginLeft: 4, marginRight: 5 }}
                >
                    {content}
                </Region>
            </Region>
        </Region>
    );
};
