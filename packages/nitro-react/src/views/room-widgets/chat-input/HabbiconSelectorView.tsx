import { useState } from 'react';

import { habbiconPreviewAssetName } from '#base/commands';
import { HabbiconState, useHabbiconsStore } from '#base/context/habbicons';
import { isUnseenItem, UnseenItemCategory, useInventoryStore } from '#base/context/inventory';
import { useTranslation } from '#base/context/system';
import { Box, FloatingPopup, GlobalRect, Region, TemplateBindings, TemplateItem, TemplateWindow } from '#base/theme';
import { UnseenItemCounterView } from '#base/views/shared/UnseenItemCounterView';

const TEMPLATE = 'habbo-room-ui-com/habbiconselector_menu_xml';

/** `SCREEN_LEFT_BORDER` / `CHAT_BAR_POPUP_OFFSET`: the menu stays right of 92 and its bottom 55 above the button's. */
const SCREEN_LEFT_BORDER = 92;
const CHAT_BAR_POPUP_OFFSET = 55;
/** `MENU_MIN_HEIGHT` / `MENU_MAX_HEIGHT` / `TOP_BAR_HEIGHT` / `BOTTOM_PADDING`. */
const MENU_MIN_HEIGHT = 91;
const MENU_MAX_HEIGHT = 292;
const TOP_BAR_HEIGHT = 42;
const BOTTOM_PADDING = 6;
/** `updateHeight`'s floor for the section list. */
const SECTION_LIST_MIN_HEIGHT = 46;
/** `GRID_COLUMNS`, `SLOT_SIZE`, `SLOT_SPACING`. */
const GRID_COLUMNS = 5;
const SLOT_SIZE = 42;
const SLOT_SPACING = 2;
/** `createSectionWindow`: a section is its 20 high title, its grid and 2 under it. */
const SECTION_TITLE_HEIGHT = 20;
const SECTION_BOTTOM = 2;
/** `habbicon_section_list`'s `spacing`. */
const SECTION_SPACING = 4;
/** `SLOT_FILLED_COLOR`, `SLOT_EMPTY_COLOR`, `SLOT_FILLED_HOVER_COLOR`. */
const SLOT_FILLED_COLOR = 0x1f1f1f;
const SLOT_EMPTY_COLOR = 0x343434;
const SLOT_FILLED_HOVER_COLOR = 0x2a2a2a;
/** `createHabbiconBitmap`'s stand-in when there is no preview. */
const PLACEHOLDER_SIZE = 40;

/** `HabbiconSelectorEntry`. */
interface SelectorEntry {
    habbiconId: number;
    name: string;
    searchName: string;
    favorite: boolean;
}

/** `HabbiconSelectorSection`. */
interface SelectorSection {
    key: string;
    title: string;
    entries: SelectorEntry[];
}

/** `seededColor`. */
const seededColor = (seed: number): string => [ '#f9cf2f', '#f39a2f', '#ef7e2f', '#8ecb3f', '#4dc0e8', '#c383f5' ][seed % 6];

/** `sortEntries`: favourites first, then by name, then by id. */
const sortEntries = (entries: SelectorEntry[]) => entries.sort((a, b) => {
    if (a.favorite !== b.favorite) return a.favorite ? -1 : 1;
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;

    return a.habbiconId - b.habbiconId;
});

const sectionHeight = (count: number) => {
    const rows = Math.max(1, Math.ceil(count / GRID_COLUMNS));

    return SECTION_TITLE_HEIGHT + ((rows * SLOT_SIZE) + ((rows - 1) * SLOT_SPACING)) + SECTION_BOTTOM;
};

export interface HabbiconSelectorViewProps {
    /** `chat_extra_button` on screen: `alignToAnchor` puts the menu at its x, its bottom 55 above the button's. */
    anchor: GlobalRect;
    /** A habbicon picked; the shift key keeps the menu up. */
    onPick: (habbiconId: number, keepOpen: boolean) => void;
    onOpenHub: () => void;
    onClose: () => void;
}

/**
 * The chat bar's habbicon menu - `HabbiconSelector` over `habbo-room-ui-com/habbiconselector_menu_xml`.
 *
 * Only the habbicons the user owns are offered (`createEntry`: state 2 or 3, 3 a favourite), named by
 * `habbicon_<name key>_name`. `refreshSections` makes the sections: favourites, the recently used,
 * then one per shop set holding owned habbicons (its reward included) once the shop data is in. A
 * search replaces them with one "search results" section over every owned habbicon whose name holds
 * the text (`addSearchResultsSection`). Each section is its title over a five-column grid of 42 px
 * slots, the empty ones darker; a slot shows its preview, lights under the pointer, carries a "1"
 * while the habbicon is unseen, and its name as a tooltip. The list grows the menu up to 292 high
 * (`updateHeight`), and `empty_view` shows when there is nothing.
 *
 * The recently used section is taken as the menu opens: Flash holds back a pick's reorder while the
 * menu is up (`onRecentHabbiconsUpdated`), so shift-picking does not move the slots under the
 * pointer. Flash hides the menu on a press on the room (`RoomDesktop.hideTransientSelectors`); this
 * menu, like the chat style one, closes on a press anywhere outside it.
 */
export const HabbiconSelectorView = ({ anchor, onPick, onOpenHub, onClose }: HabbiconSelectorViewProps) => {
    const ownedHabbicons = useHabbiconsStore(x => x.ownedHabbicons);
    const shopCollections = useHabbiconsStore(x => x.shopCollections);
    const hasLoadedShopData = useHabbiconsStore(x => x.hasLoadedShopData);
    const nameKeys = useHabbiconsStore(x => x.nameKeys);
    const previews = useHabbiconsStore(x => x.previews);
    // The recently used, as they are when the menu opens.
    const liveRecentIds = useHabbiconsStore(x => x.recentHabbiconIds);
    const [ recentIds ] = useState(liveRecentIds);
    const unseenItems = useInventoryStore(x => x.unseenItems);
    const t = useTranslation();
    const [ query, setQuery ] = useState('');
    const [ hovered, setHovered ] = useState<string | undefined>(undefined);

    // `resolveEntryName`.
    const entryName = (habbiconId: number) => {
        const key = nameKeys[habbiconId];

        return (key && key.length) ? t(`habbicon_${key}_name`, key) : 'Habbicon';
    };

    const entries = new Map<number, SelectorEntry>();

    for (const [ id, state ] of Object.entries(ownedHabbicons)) {
        if ((state !== HabbiconState.OWNED) && (state !== HabbiconState.FAVORITE)) continue;

        const habbiconId = Number(id);
        const name = entryName(habbiconId);

        entries.set(habbiconId, { habbiconId, name, searchName: name.toLowerCase(), favorite: state === HabbiconState.FAVORITE });
    }

    const owned = sortEntries([ ...entries.values() ]);
    const normalizedQuery = query.toLowerCase();
    const sections: SelectorSection[] = [];

    if (normalizedQuery.length) {
        const results = owned.filter(entry => entry.searchName.includes(normalizedQuery));

        if (results.length) sections.push({ key: 'search', title: t('habbicon.search.results', 'Search results'), entries: results });
    } else {
        const favorites = owned.filter(entry => entry.favorite);
        const recent = recentIds.map(id => entries.get(id)).filter((entry): entry is SelectorEntry => !!entry);

        if (favorites.length) sections.push({ key: 'favorites', title: t('habbicons.favourites.title', 'Favorites'), entries: favorites });
        if (recent.length) sections.push({ key: 'recent', title: t('habbicon.recently.used', 'Recently used'), entries: recent });

        if (hasLoadedShopData) {
            for (const collection of shopCollections) {
                const held = collection.habbicons.map(item => entries.get(item.habbiconId)).filter((entry): entry is SelectorEntry => !!entry);
                const reward = (collection.rewardHabbiconId > 0) ? entries.get(collection.rewardHabbiconId) : undefined;

                if (reward) held.push(reward);

                if (held.length) sections.push({ key: `collection:${collection.collectionId}`, title: collection.name.length ? t(`habbicon_collection_${collection.name}_name`, collection.name) : 'Habbicons', entries: held });
            }
        }
    }

    // `updateHeight`.
    const contentHeight = sections.reduce((total, section) => total + sectionHeight(section.entries.length), 0) + (Math.max(0, sections.length - 1) * SECTION_SPACING);
    const listHeight = Math.min(Math.max(SECTION_LIST_MIN_HEIGHT, contentHeight + 2), MENU_MAX_HEIGHT - TOP_BAR_HEIGHT - BOTTOM_PADDING);
    const menuHeight = Math.max(MENU_MIN_HEIGHT, TOP_BAR_HEIGHT + listHeight + BOTTOM_PADDING);

    const slotItem = (sectionKey: string, entry: SelectorEntry | undefined, index: number): TemplateItem => {
        const key = `${sectionKey}:${index}`;
        const hasPreview = !!entry && !!previews[entry.habbiconId];
        const unseen = !!entry && isUnseenItem(unseenItems, UnseenItemCategory.HABBICONS, entry.habbiconId);

        return {
            key,
            from: 'habbicon_item_template',
            bindings: {
                habbicon_item_template: entry
                    ? {
                            tooltip: entry.name,
                            onPointerTap: event => onPick(entry.habbiconId, event.shiftKey),
                            onPointerOver: () => setHovered(key),
                            onPointerOut: () => setHovered(current => ((current === key) ? undefined : current)),
                            children: unseen && (
                                <Box layout={{ position: 'absolute', right: 1, top: 1 }}>
                                    <UnseenItemCounterView count={1} />
                                </Box>
                            ),
                        }
                    : {},
                habbicon_item_bg: { color: entry ? ((hovered === key) ? SLOT_FILLED_HOVER_COLOR : SLOT_FILLED_COLOR) : SLOT_EMPTY_COLOR },
                habbicon_icon: (entry && hasPreview)
                    ? { visible: true, asset: habbiconPreviewAssetName(entry.habbiconId) }
                    : {
                            visible: !!entry,
                            children: entry && (
                                <Region
                                    backgroundColor={seededColor(entry.habbiconId * 37)}
                                    layout={{ position: 'absolute', left: 0, top: 0, width: PLACEHOLDER_SIZE, height: PLACEHOLDER_SIZE }}
                                />
                            ),
                        },
            },
        };
    };

    const sectionItems: TemplateItem[] = sections.map((section) => {
        const rows = Math.max(1, Math.ceil(section.entries.length / GRID_COLUMNS));
        const slots = Array.from({ length: rows * GRID_COLUMNS }, (_, index) => slotItem(section.key, section.entries[index], index));

        return {
            key: section.key,
            from: 'habbicon_section_template',
            bindings: {
                section_title: { caption: section.title },
                habbicon_grid: { items: slots },
            },
            arrange: ({ root, find }) => {
                const gridHeight = (rows * SLOT_SIZE) + ((rows - 1) * SLOT_SPACING);

                find('habbicon_grid')?.setHeight(gridHeight);
                root()?.setHeight(SECTION_TITLE_HEIGHT + gridHeight + SECTION_BOTTOM);
            },
        };
    });

    const searching = normalizedQuery.length > 0;
    const bindings: TemplateBindings = {
        habbicon_search_input: {
            caption: query,
            onChange: setQuery,
            // `onSearchKeyDown`: Esc empties a search that has text.
            onKeyDown: (key) => {
                if ((key === 'Escape') && query.length) setQuery('');
            },
            focused: true,
        },
        // `setSearchState`: the placeholder without a search, the clear button with one.
        habbicon_search_placeholder: { visible: !searching },
        habbicon_search_clear_button: { visible: searching, onPointerTap: () => setQuery('') },
        habbicon_open_hub_button: { onPointerTap: onOpenHub },
        habbicon_section_list: { items: sectionItems },
        empty_view: { visible: !sections.length },
    };

    // `alignToAnchor`: at the button's x, kept right of 92; its bottom 55 above the button's, kept on screen.
    const x = Math.max(SCREEN_LEFT_BORDER, Math.round(anchor.x));
    const y = Math.max(0, Math.round(anchor.y + anchor.height) - CHAT_BAR_POPUP_OFFSET - menuHeight);

    return (
        <FloatingPopup
            x={x}
            y={y}
            onOutsideClick={onClose}
            layout={{ width: 245, height: menuHeight }}
        >
            <TemplateWindow
                id={TEMPLATE}
                bindings={bindings}
                arrange={({ root, find }) => {
                    find('habbicon_section_list')?.setHeight(listHeight);
                    root()?.setHeight(menuHeight);
                }}
            />
        </FloatingPopup>
    );
};
