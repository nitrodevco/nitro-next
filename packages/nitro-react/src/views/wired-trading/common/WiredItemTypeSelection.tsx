/**
 * Choosing a furni type - Flash `wired_setup/uibuilder/presets/contracts/ItemTypeSelectionPreset`
 * with its `itemtable/ItemTypeTableObject` rows, and the section around it,
 * `presets/sections/applications/ItemTypeSelectionSection` (title
 * `wiredcontracts.element.itemtype.selection`, the chosen item's icon floating at the header's
 * right - `ChestItemIconPreviewerPreset`).
 *
 * - The furni code of the selection (read only, 150 wide): the type's full class name, or
 *   `poster*<id>` for a legacy poster; a type the furni data does not know shows no code.
 * - A search field (220 characters, 150 wide): from two characters on, the rows whose name or code
 *   contains the whole text (Flash splits the text into words and then tests the whole text for
 *   each - kept as is); below two, everything.
 * - The table (350x234 in Flash, as wide as the section here): name 50%, code 30%, floor/wall 20%,
 *   every floor type with a class name, every wall type but `poster`, and one row per poster id
 *   of `POSTER_IDS` when the hotel has the poster type; sorted by name. A row click selects.
 * - Under it, how many rows show (`wiredcontracts.element.show_count`), half blended.
 *
 * Used by `AddEditContractElement` and the sandbox `SelfDonationTool`; the chest element editors
 * can use it the same way. Controlled: the selection is the caller's.
 */
import type { IChestItemType, IFurnitureData } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useSystemStore, useTranslation } from '#base/context/system';
import { useWiredChestItemIconUrl } from '#base/hooks';
import { Border, Box, ThemeImage } from '#base/theme';
import { WiredTableCell, WiredTableColumn, WiredTableView } from '#base/views/wired-common/WiredTableView';
import { WiredFloatVertically } from '#base/views/wired-setup/kit/WiredFloatVertically';
import { WiredNamedTextInput } from '#base/views/wired-setup/kit/WiredNamedTextInput';
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { WiredSimpleList } from '#base/views/wired-setup/kit/WiredSimpleList';
import { WiredText } from '#base/views/wired-setup/kit/WiredText';

/** `ItemTypeSelectionPreset.POSTER_IDS`. */
const POSTER_IDS = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 83, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512, 513, 514, 515, 516, 517, 518, 520, 521, 522, 523, 1000, 1001, 1002, 1003, 1004, 1005, 1006, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008 ];
const POSTER_CLASS_NAME = 'poster';
/** The table container's height. */
const TABLE_HEIGHT = 234;
const MIN_SEARCH_LENGTH = 2;

/** `ItemTypeTableObject`. */
interface ItemTypeRow {
    type: IChestItemType;
    localizedName: string;
    /** `_displayCode`. */
    code: string;
    /** `§_-ai§`: the name in lower case, for the search. */
    lowerName: string;
}

/** `identifier`. */
const rowId = (row: ItemTypeRow) => `${row.type.isWallItem ? '1-' : '0-'}${row.code}`;

/** `matchesSubstring`. */
const matches = (row: ItemTypeRow, text: string) => (row.lowerName.indexOf(text) !== -1) || (row.code.indexOf(text) !== -1);

/** `createAllFurnis`. */
const createAllFurnis = (floorItems: Record<number, IFurnitureData>, wallItems: Record<number, IFurnitureData>, localize: (key: string) => string): ItemTypeRow[] => {
    const rows: ItemTypeRow[] = [];
    const add = (type: IChestItemType, localizedName: string, code: string) => rows.push({ type, localizedName, code, lowerName: localizedName.toLowerCase() });

    for (const item of Object.values(floorItems)) {
        if (item.fullName === '') continue;

        add({ isWallItem: false, typeId: item.id, legacyPosterId: '' }, item.localizedName || item.fullName, item.fullName);
    }

    let posterTypeId = -1;

    for (const item of Object.values(wallItems)) {
        if (item.className === POSTER_CLASS_NAME) {
            posterTypeId = item.id;

            continue;
        }

        add({ isWallItem: true, typeId: item.id, legacyPosterId: '' }, item.localizedName || item.fullName, item.fullName);
    }

    if (posterTypeId !== -1) {
        for (const posterId of POSTER_IDS) add({ isWallItem: true, typeId: posterTypeId, legacyPosterId: String(posterId) }, localize(`poster_${posterId}_name`), `poster*${posterId}`);
    }

    return rows.sort((a, b) => a.localizedName.localeCompare(b.localizedName));
};

/** The code `selectedItem = ...` writes into the code field; empty for a type the furni data does not know. */
const getWiredItemTypeCode = (type: IChestItemType | undefined, floorItems: Record<number, IFurnitureData>, wallItems: Record<number, IFurnitureData>): string => {
    if (!type) return '';

    const furniData = (type.isWallItem ? wallItems : floorItems)[type.typeId];

    if (!furniData) return '';

    if (type.isWallItem && (furniData.className === POSTER_CLASS_NAME)) return `poster*${type.legacyPosterId}`;

    return furniData.fullName;
};

export interface WiredItemTypeSelectionProps {
    selected: IChestItemType | undefined;
    onSelect: (type: IChestItemType) => void;
    /** Changes whenever the window reopens: `resetInteractions` empties the search and scrolls back up. */
    resetKey?: unknown;
}

/** `ItemTypeSelectionPreset`. */
export const WiredItemTypeSelection = ({ selected, onSelect, resetKey }: WiredItemTypeSelectionProps) => {
    const t = useTranslation();
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const [ search, setSearch ] = useState('');
    const [ searchFor, setSearchFor ] = useState(resetKey);

    if (searchFor !== resetKey) {
        setSearchFor(resetKey);
        setSearch('');
    }

    const allFurnis = createAllFurnis(floorItems, wallItems, key => t(key, key));
    const text = search.toLowerCase();
    const rows = (text.length < MIN_SEARCH_LENGTH) ? allFurnis : allFurnis.filter(row => matches(row, text));
    const selectedCode = getWiredItemTypeCode(selected, floorItems, wallItems);

    const columns: WiredTableColumn[] = [
        { id: 'furni_name', title: t('wiredcontracts.element.itemtype.col.furni_name'), widthFactor: 0.5, alignment: 'left' },
        { id: 'furni_code', title: t('wiredcontracts.element.itemtype.col.furni_code'), widthFactor: 0.3, alignment: 'left' },
        { id: 'furni_type', title: t('wiredcontracts.element.itemtype.col.furni_type'), widthFactor: 0.2, alignment: 'left' },
    ];

    const getCell = (row: ItemTypeRow, columnId: string): WiredTableCell => {
        switch (columnId) {
            case 'furni_name': return { text: row.localizedName, inspectable: true };
            case 'furni_code': return { text: row.code, inspectable: true };
            default: return { text: t(row.type.isWallItem ? 'inventory.filter.placement.wall' : 'inventory.filter.placement.floor') };
        }
    };

    return (
        <WiredSimpleList>
            <WiredNamedTextInput
                name="${wiredcontracts.element.itemtype.furni_code}"
                value={selectedCode}
                onChange={() => undefined}
                placeholder="${wiredcontracts.element.itemtype.furni_code.placeholder}"
                width={150}
                editable={false}
            />
            <WiredNamedTextInput
                name="${wiredcontracts.element.itemtype.search}"
                value={search}
                onChange={setSearch}
                maxCharacters={220}
                width={150}
            />
            <Box layout={{ height: TABLE_HEIGHT, flexShrink: 0, alignSelf: 'stretch' }}>
                <WiredTableView
                    columns={columns}
                    rows={rows}
                    getRowId={rowId}
                    getCell={getCell}
                    scrollResetKey={resetKey}
                    onRowClicked={row => onSelect(row.type)}
                />
            </Box>
            <WiredText
                text={t('wiredcontracts.element.show_count', '', { amount: String(rows.length) })}
                halfBlend
            />
        </WiredSimpleList>
    );
};

/** `ChestItemIconPreviewerPreset`: the ubuntu `product_icon_previewer`, a 42x42 `#dadada` border with the icon. */
export const WiredChestItemIconPreviewer = ({ item }: { item: IChestItemType | undefined }) => {
    const iconUrl = useWiredChestItemIconUrl(item);

    return (
        <Border
            variant="3"
            tintColor="#dadada"
            layout={{ width: 42, height: 42, flexShrink: 0, alignItems: 'center', justifyContent: 'center' }}
        >
            {(iconUrl !== '') && <ThemeImage src={iconUrl} />}
        </Border>
    );
};

export interface WiredItemTypeSelectionSectionProps extends WiredItemTypeSelectionProps {
    disabled?: boolean;
}

/** `ItemTypeSelectionSection`. */
export const WiredItemTypeSelectionSection = ({ selected, onSelect, resetKey, disabled }: WiredItemTypeSelectionSectionProps) => (
    <WiredSection
        title="${wiredcontracts.element.itemtype.selection}"
        disabled={disabled}
        headerOptions={(
            <WiredFloatVertically staticWidth={42}>
                <WiredChestItemIconPreviewer item={selected} />
            </WiredFloatVertically>
        )}
    >
        <WiredItemTypeSelection
            selected={selected}
            onSelect={onSelect}
            resetKey={resetKey}
        />
    </WiredSection>
);
