/**
 * The furni chest's contents - Flash `chests/subcontrollers/views/FurniChestView` on
 * `furni_chest_contents_xml` (458x264): the grid of grouped items on the left, the selected
 * item's name, picture and withdraw row on the right.
 *
 * - The grid (`grid_items`, 5 columns of 42x42 cells 3px apart) shows the groups in the order
 *   the store keeps them; the first one is selected whenever nothing is (`maybeSelectNewItemView`).
 * - From 31 groups up the search bar (`search_border`) appears above the grid and pushes it
 *   28px down; Enter filters by every space-separated word of the text, Escape clears.
 * - `updatePreviewUI`: without a selection the chest's empty picture shows and both buttons are
 *   disabled; with one, withdraw follows `canWithdraw` and the log button `canRead`.
 *   `view_logs_by_furni_btn` is invisible in the layout and nothing shows it (its handler,
 *   `viewLogsWithType`, is empty in Flash), so it is not drawn.
 */
import type { IChestItemType, IChestStorage } from '@nitrodevco/nitro-api';
import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { withdrawWiredChestItems } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useWiredTradingStore } from '#base/context/wired-trading';
import { useWiredChestItemFurniData, useWiredChestItemName, useWiredChestItemNameResolver } from '#base/hooks';
import { Border, Box, Button, LayoutImage, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { WiredChestItemGroup } from '#base/utils';
import { useFurnitureImageTexture } from '#base/views/catalog/useFurnitureImageTexture';
import { WiredChestItemCell } from '#base/views/wired-trading/common/WiredChestItemCell';

/** `FurniChestView.§_-u11§`: the search bar shows from this many groups. */
const SEARCH_THRESHOLD = 31;
/** `GRID_OFFSET_SEARCH`. */
const GRID_OFFSET_SEARCH = 28;

export const WIRED_FURNI_CHEST_WIDTH = 458;
export const WIRED_FURNI_CHEST_HEIGHT = 264;

/** `preview_image`: the product image widget, the furni at 64 facing 90 degrees. */
const ChestItemPreview = ({ itemType }: { itemType: IChestItemType }) => {
    const furniData = useWiredChestItemFurniData(itemType);
    const { texture, width, height } = useFurnitureImageTexture(furniData?.className, furniData?.colorIndex ?? 0, 2, RoomGeometryScaleType.ZoomedIn, 0);

    if (!texture) return null;

    return (
        <pixiSprite
            texture={texture}
            width={width}
            height={height}
            layout={{}}
        />
    );
};

interface ChestItemNameProps {
    storage: IChestStorage | undefined;
}

/** `furni_name`: bold, wrapping at 190. */
const ChestItemName = ({ storage }: ChestItemNameProps) => {
    const name = useWiredChestItemName(storage?.type, storage?.specialType ?? 0);

    return (
        <ThemeText
            text={name}
            textStyle="u_bold"
            textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
            verticalAlign="top"
            layout={{ position: 'absolute', left: 5, top: 5, width: 190 }}
        />
    );
};

interface GroupCellProps {
    group: WiredChestItemGroup;
    active: boolean;
    onSelect: () => void;
}

const GroupCell = ({ group, active, onSelect }: GroupCellProps) => {
    const sample = group.storages[0];

    return (
        <WiredChestItemCell
            itemType={sample.type}
            isLimited={sample.stuffData.uniqueNumber > 0}
            count={group.storages.length}
            active={active}
            onPress={onSelect}
        />
    );
};

export interface WiredChestFurniContentsViewProps {
    chestId: number;
    canWithdraw: boolean;
}

export const WiredChestFurniContentsView = ({ chestId, canWithdraw }: WiredChestFurniContentsViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const groups = useWiredTradingStore(x => x.chestItemGroups.groups);
    const [ selectedKey, setSelectedKey ] = useState<number | undefined>(undefined);
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

    const onWithdraw = () => {
        const amount = parseInt(withdrawAmount, 10);

        if (Number.isNaN(amount) || !selected) return;

        withdrawWiredChestItems(send, chestId, selected.storages[0].type, amount);
    };

    const sample = selected?.storages[0];
    const gridTop = showSearch ? (5 + GRID_OFFSET_SEARCH) : 5;

    return (
        <Box layout={{ position: 'relative', width: WIRED_FURNI_CHEST_WIDTH, height: WIRED_FURNI_CHEST_HEIGHT, flexShrink: 0 }}>
            <Border
                variant="2"
                tintColor="#e3e3e3"
                layout={{ position: 'absolute', left: 9, top: 11, width: 255, height: 242 }}
            >
                {showSearch && (
                    <Border
                        variant="105"
                        layout={{ position: 'absolute', left: 5, top: 4, width: 245, height: 24 }}
                    >
                        {(searchText.length === 0) && (
                            <ThemeText
                                text={t('catalog.search')}
                                textStyle="u_regular"
                                textOptions={{ fill: '#666666' }}
                                alpha={0.5}
                                layout={{ position: 'absolute', left: 4, top: 3 }}
                            />
                        )}
                        <TextInput
                            value={searchText}
                            onChange={setSearchText}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    if (appliedSearch !== searchText) setAppliedSearch(searchText);
                                } else if (event.key === 'Escape') {
                                    clearSearch();
                                }
                            }}
                            textStyle="u_regular"
                            textColor="#666666"
                            backgroundColor="#ffffff"
                            focusedBackgroundColor="#ffffff"
                            layout={{ position: 'absolute', left: 4, top: 3, width: 216, height: 18 }}
                        />
                        {(searchText.length > 0) && (
                            <Region
                                cursor="pointer"
                                onPointerTap={clearSearch}
                                layout={{ position: 'absolute', left: 222, top: 2, width: 20, height: 20 }}
                            >
                                <ThemeImage
                                    src={LayoutImage('shared/icons_close.png')}
                                    layout={{ position: 'absolute', left: 4, top: 4 }}
                                />
                            </Region>
                        )}
                    </Border>
                )}
                {!shown.length && (
                    <ThemeText
                        text={t('wiredchests.furni_chest.no_items')}
                        textStyle="u_regular"
                        alpha={0.5}
                        textOptions={{ align: 'center' }}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 113 }}
                    />
                )}
                <ScrollArea
                    variant="3"
                    scrollResetKey={appliedSearch}
                    layout={{ position: 'absolute', left: 5, top: gridTop, width: 245, height: 232 - (gridTop - 5) }}
                    contentLayout={{ position: 'relative', width: '100%', flexDirection: 'row', flexWrap: 'wrap', gap: 3 }}
                >
                    {shown.map(group => (
                        <GroupCell
                            key={group.key}
                            group={group}
                            active={group.key === selected?.key}
                            onSelect={() => setSelectedKey(group.key)}
                        />
                    ))}
                </ScrollArea>
            </Border>
            <Box layout={{ position: 'absolute', left: 274, top: 11, width: 175, height: 242 }}>
                <Border
                    variant="2"
                    tintColor="#d8d8d8"
                    layout={{ position: 'absolute', left: 0, top: 0, width: 175, height: 211 }}
                >
                    {sample
                        ? (
                                <>
                                    <ChestItemName storage={sample} />
                                    <Box layout={{ position: 'absolute', left: 2, top: 35, width: 170, height: 167, alignItems: 'center', justifyContent: 'center' }}>
                                        <ChestItemPreview itemType={sample.type} />
                                    </Box>
                                </>
                            )
                        : (
                                <Box layout={{ position: 'absolute', left: 0, top: 10, width: 175, height: 201, alignItems: 'center', justifyContent: 'center' }}>
                                    <ThemeImage src={LayoutImage('wired/wired_chests_images_classic_furni_chest_empty.png')} />
                                </Box>
                            )}
                </Border>
                <Box layout={{ position: 'absolute', left: 62, top: 211 + 9, width: 113, height: 28, flexDirection: 'row', gap: 10 }}>
                    <Border
                        variant="4"
                        layout={{ width: 30, height: 19, marginTop: 1 }}
                    >
                        <TextInput
                            value={withdrawAmount}
                            onChange={value => setWithdrawAmount(value.replace(/[^0-9]/g, ''))}
                            onEnter={onWithdraw}
                            textStyle="u_regular"
                            layout={{ width: 28, height: 17, marginLeft: 1, marginTop: 1 }}
                        />
                    </Border>
                    <Button
                        variant="3"
                        disabled={!sample || !canWithdraw}
                        onPointerTap={onWithdraw}
                        layout={{ width: 73, height: 22 }}
                    >
                        {t('wiredchests.withdraw')}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
