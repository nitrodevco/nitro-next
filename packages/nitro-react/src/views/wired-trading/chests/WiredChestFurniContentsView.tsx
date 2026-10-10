/**
 * The furni chest's contents - Flash `chests/subcontrollers/views/FurniChestView`, drawn from its
 * template `furni_chest_contents_xml` (458x264): the grid of grouped items on the left, the selected
 * item's name, picture and withdraw row on the right.
 *
 * - `grid_items` holds a clone of `furni_template` per group (`FurniChestItemView`), in the order
 *   the store keeps them, set up by `initChestBasedIconUI` / `updateUI` / `updateColoring`: the
 *   icon, a limited item's label background, the count from two up, the border's colour following
 *   the pointer and the focus outline on the selection. The first group is selected whenever nothing
 *   is (`maybeSelectNewItemView`).
 * - From 31 groups up the search bar (`search_border`) shows and the grid moves 28px down
 *   (`updateSearchbarVisibility`); Enter filters by every space-separated word of the text, Escape
 *   or the clear button clears.
 * - `updatePreviewUI`: without a selection the placeholder picture shows and withdraw is disabled;
 *   with one, the name and picture show and withdraw follows `canWithdraw`.
 *   `view_logs_by_furni_btn` is invisible in the layout and nothing shows it (its handler,
 *   `viewLogsWithType`, is empty in Flash).
 *
 * The `limited_item_overlay_grid` / `rarity_item_overlay_grid` widgets (the serial plaque and the
 * rarity flag) are not ported in this client.
 */
import type { IChestItemType, IChestStorage } from '@nitrodevco/nitro-api';
import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { withdrawWiredChestItems } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useWiredTradingStore } from '#base/context/wired-trading';
import { useFurnitureImageTexture, useWiredChestItemFurniData, useWiredChestItemIconUrl, useWiredChestItemName, useWiredChestItemNameResolver } from '#base/hooks';
import { TemplateItem, TemplateWindow, TemplateWindows, ThemeImage } from '#base/theme';
import { WiredChestItemGroup } from '#base/utils';

/** `FurniChestView.§_-u11§`: the search bar shows from this many groups. */
const SEARCH_THRESHOLD = 31;
/** `GRID_OFFSET_SEARCH`. */
const GRID_OFFSET_SEARCH = 28;
/** `FurniChestItemView.NOT_HOVERED_COLOR` / `§_-KJ§`. */
const NOT_HOVERED_COLOR = 13355979;
const HOVERED_COLOR = 14079702;

export const WIRED_FURNI_CHEST_WIDTH = 458;
export const WIRED_FURNI_CHEST_HEIGHT = 264;

/** `furni_icon`, the `product_icon` widget: the furni's icon unscaled in its middle. */
export const ChestItemIcon = ({ itemType }: { itemType: IChestItemType }) => {
    const iconUrl = useWiredChestItemIconUrl(itemType);

    if (iconUrl === '') return null;

    return (
        <ThemeImage
            src={iconUrl}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
            layout={{ position: 'absolute', left: -3, top: 0, width: 46, height: 40 }}
        />
    );
};

/** `preview_image`, the product image widget: the furni at 64 facing 90 degrees, unscaled in its middle. */
const ChestItemPreview = ({ itemType }: { itemType: IChestItemType }) => {
    const furniData = useWiredChestItemFurniData(itemType);
    const { texture } = useFurnitureImageTexture(furniData?.className, furniData?.colorIndex ?? 0, 2, RoomGeometryScaleType.ZoomedIn, 0);

    if (!texture) return null;

    return (
        <ThemeImage
            texture={texture}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
        />
    );
};

/** `updateSearchbarVisibility`: with the search bar up, the grid starts below it. */
const arrangeWithSearch = ({ find }: TemplateWindows) => {
    const grid = find('grid_items');

    if (!grid) return;

    grid.setY(grid.y + GRID_OFFSET_SEARCH);
    grid.setHeight(grid.height - GRID_OFFSET_SEARCH);
};

const groupItem = (group: WiredChestItemGroup, active: boolean, hovered: boolean, select: () => void, hover: (over: boolean) => void): TemplateItem => {
    const sample: IChestStorage = group.storages[0];
    const count = group.storages.length;

    return {
        key: String(group.key),
        from: 'furni_template',
        bindings: {
            '': {
                onPointerTap: select,
                onPointerOver: () => hover(true),
                onPointerOut: () => hover(false),
            },
            border: { color: hovered ? HOVERED_COLOR : NOT_HOVERED_COLOR },
            unique_item_background_bitmap: { visible: sample.stuffData.uniqueNumber > 0 },
            furni_icon: { children: <ChestItemIcon itemType={sample.type} /> },
            number_container: { visible: count > 1 },
            furni_quantity: { caption: String(count), setCaptionAfterBuild: true },
            outline_focus: { visible: active },
        },
    };
};

export interface WiredChestFurniContentsViewProps {
    chestId: number;
    canWithdraw: boolean;
}

export const WiredChestFurniContentsView = ({ chestId, canWithdraw }: WiredChestFurniContentsViewProps) => {
    const { send } = useWebSocketContext();
    const groups = useWiredTradingStore(x => x.chestItemGroups.groups);
    const [ selectedKey, setSelectedKey ] = useState<number | undefined>(undefined);
    const [ hoveredKey, setHoveredKey ] = useState<number | undefined>(undefined);
    const [ searchText, setSearchText ] = useState('');
    const [ appliedSearch, setAppliedSearch ] = useState('');
    const [ withdrawAmount, setWithdrawAmount ] = useState('1');
    const nameOf = useWiredChestItemNameResolver();

    // `maybeSelectNewItemView`: a selection that left the chest falls to the first cell.
    const selected = groups.find(group => group.key === selectedKey);

    if (!selected && groups.length && (selectedKey !== groups[0].key)) setSelectedKey(groups[0].key);

    const showSearch = (groups.length >= SEARCH_THRESHOLD);

    // `updateSearchbarVisibility` clears the search whenever the bar comes or goes.
    const [ searchShownFor, setSearchShownFor ] = useState(showSearch);

    if (searchShownFor !== showSearch) {
        setSearchShownFor(showSearch);
        setSearchText('');
        setAppliedSearch('');
    }

    const words = (appliedSearch.length > 0) ? appliedSearch.toLowerCase().split(' ') : null;
    const shown = words
        ? groups.filter((group) => {
                const name = nameOf(group.storages[0].type, group.storages[0].specialType).toLowerCase();

                return words.every(word => name.indexOf(word) !== -1);
            })
        : groups;

    const clearSearch = () => {
        setSearchText('');
        setAppliedSearch('');
    };

    const sample = selected?.storages[0];
    const name = useWiredChestItemName(sample?.type, sample?.specialType ?? 0);

    const onWithdraw = () => {
        const amount = parseInt(withdrawAmount, 10);

        if (Number.isNaN(amount) || !selected) return;

        withdrawWiredChestItems(send, chestId, selected.storages[0].type, amount);
    };

    return (
        <TemplateWindow
            id="habbo-user-defined-room-events-com/furni_chest_contents_xml"
            arrange={showSearch ? arrangeWithSearch : undefined}
            bindings={{
                search_border: { visible: showSearch },
                search_placeholder: { visible: searchText.length === 0 },
                search_input: {
                    caption: searchText,
                    onChange: setSearchText,
                    onKeyDown: (key) => {
                        if (key === 'Enter') {
                            if (appliedSearch !== searchText) setAppliedSearch(searchText);
                        } else if (key === 'Escape') {
                            clearSearch();
                        }
                    },
                },
                clear_search_button: { visible: searchText.length > 0, onPointerTap: clearSearch },
                no_items_text: { visible: shown.length === 0 },
                grid_items: {
                    items: shown.map(group => groupItem(
                        group,
                        group.key === selected?.key,
                        group.key === hoveredKey,
                        () => setSelectedKey(group.key),
                        over => setHoveredKey(current => (over ? group.key : ((current === group.key) ? undefined : current))),
                    )),
                },
                furni_name: { caption: sample ? name : '' },
                preview_image: { children: sample && <ChestItemPreview itemType={sample.type} /> },
                placeholder_preview_image: { visible: !sample },
                withdraw_input: {
                    caption: withdrawAmount,
                    restrict: '0-9',
                    onChange: setWithdrawAmount,
                    onEnter: onWithdraw,
                },
                withdraw_btn: { disabled: !sample || !canWithdraw, onPointerTap: onWithdraw },
            }}
        />
    );
};
