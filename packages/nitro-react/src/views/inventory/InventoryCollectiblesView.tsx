/**
 * The inventory's collectibles page - the `collectibles` region of `inventory_xml` (Flash
 * `collectibles/CollectiblesView` with `CollectiblesGridView` and its `CollectibleGroupedItem`
 * cells): the `options_container` row with the search box, the `item_grid` (0,27 284x221) of the
 * wallet's NFTs, and the `preview_container` (290,27 180 wide) with the picked product's name and
 * type, its `nft_image` and, while a trade runs, the `offer_options` row - `offertotrade_cnt` and
 * `offertotrade_btn`.
 *
 * - Opening the page asks for the trade inventory (`GetNftTradeInventoryComposer`), which is the
 *   list of NFTs a trade may offer from.
 * - The grid is one cell per product, not per copy (`CollectibleGroupedItem`): the copies sit
 *   behind it, and the ones already in the trade are counted out of what may still be offered
 *   (`unlockedAssetCount`).
 * - The offer button clamps the amount between 1 and that unlocked count, writes the clamped value
 *   back into the field and offers exactly those copies (`windowEventProc`'s `offertotrade_btn`).
 * - A trade is shown on this page as well as on the furni one, so it is not minimised here
 *   (`TradingModel.categorySwitch`).
 *
 * Not ported: the 200-item pages under the grid (`item_grid_pages` / `items.shown`, the grid
 * scrolls instead), the `filter.options` menu's own options, and the rarity and limited overlays
 * over the preview.
 */
import { useEffect, useState } from 'react';

import { getCollectiblePreviewIcon, getCollectibleProductName, getCollectibleProductType, requestAddNftsToTrading, requestNftTradeInventory } from '#base/commands';
import { wrapBaseItem } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import { groupTradingNftInventory, InventoryCollectibleGroup, takeTradingNftAssetIds, useInventoryStore, useInventoryTradingActions } from '#base/context/inventory';
import { useTranslation } from '#base/context/system';
import { Border, Box, Button, InfiniteGrid, LayoutImage, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { CollectiblesProductPreview } from '#base/views/collectibles/CollectiblesProductPreview';

import { InventoryOptionsContainer } from './InventoryOptionsContainer';

/** The grid's cells are the same 42x42 thumb the furni grid uses. */
const THUMB_SIZE = 42;
const THUMB_COLOR = '#cccccc';

interface CollectibleThumbProps {
    group: InventoryCollectibleGroup;
    selected: boolean;
    onSelect: (key: string) => void;
}

/** One `CollectibleGroupedItem` cell: the product's preview, with how many copies are still free. */
const CollectibleThumb = ({ group, selected, onSelect }: CollectibleThumbProps) => (
    <Region
        cursor="pointer"
        onPointerDown={() => onSelect(group.key)}
        layout={{ position: 'relative', width: THUMB_SIZE, height: THUMB_SIZE }}
    >
        <Border
            variant="5"
            tintColor={THUMB_COLOR}
            layout={{ position: 'absolute', left: 1, top: 1, width: 40, height: 40 }}
        >
            <CollectiblesProductPreview
                preview={getCollectiblePreviewIcon(wrapBaseItem(group.item))}
                slots={{
                    productPreview: { left: 0, top: 0, width: 40, height: 40 },
                    badge: { left: 0, top: 0, width: 40, height: 40, zoom: 1 },
                    unknown: { left: 11, top: 11, width: 18, height: 18, src: LayoutImage('shared/collectables_icon_curator_stamp_small.png'), stretched: true },
                    pet: { left: 0, top: 0, width: 40, height: 40, zoom: 1, shrinkOnOverflow: true },
                }}
            />
            {(group.unlockedAssetCount > 1) && (
                <Region
                    backgroundColor="#2f6982"
                    layout={{ position: 'absolute', right: 1, top: 2, minWidth: 6, minHeight: 15, paddingLeft: 1, paddingTop: 1, flexDirection: 'row', alignItems: 'flex-start' }}
                >
                    <Region backgroundColor="#ffffff">
                        <ThemeText
                            text={String(group.unlockedAssetCount)}
                            textStyle="regular"
                            textOptions={{ fill: '#2f6982' }}
                            flashFormat={{ antiAliasType: 'advanced' }}
                            verticalAlign="top"
                        />
                    </Region>
                </Region>
            )}
        </Border>
        {selected && (
            <ThemeImage
                src={LayoutImage('shared/inventory_thumb_selected_outline.png')}
                bitmap={{}}
                layout={{ position: 'absolute', left: 0, top: 0, width: THUMB_SIZE, height: THUMB_SIZE }}
            />
        )}
    </Region>
);

export const InventoryCollectiblesView = () => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const inventory = useInventoryStore(x => x.tradingNftInventory);
    const offered = useInventoryStore(x => x.tradingOwnUser.nftItems);
    const selectedKey = useInventoryStore(x => x.tradingNftSelectedKey);
    const tradingActive = useInventoryStore(x => x.tradingActive);
    const { selectTradingNft } = useInventoryTradingActions();
    const [ searchText, setSearchText ] = useState('');
    // `offertotrade_cnt`'s caption.
    const [ offerCount, setOfferCount ] = useState('1');

    useEffect(() => {
        requestNftTradeInventory(send);
    }, [ send ]);

    const groups = groupTradingNftInventory(inventory, offered);

    const visibleGroups = !searchText
        ? groups
        : groups.filter(group => getCollectibleProductName(wrapBaseItem(group.item)).toLowerCase().includes(searchText.toLowerCase()));

    const selectedGroup = groups.find(group => group.key === selectedKey);
    const selectedInfo = selectedGroup ? wrapBaseItem(selectedGroup.item) : undefined;

    const onOffer = () => {
        if (!selectedGroup) return;

        // `offertotrade_btn`: at least one, at most what is still free, and the field is corrected.
        const wanted = Math.min(Math.max(1, parseInt(offerCount, 10) || 0), selectedGroup.unlockedAssetCount);

        if (String(wanted) !== offerCount) setOfferCount(String(wanted));

        requestAddNftsToTrading(send, takeTradingNftAssetIds(selectedGroup, offered, wanted));
    };

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, width: 468, bottom: 0, overflow: 'hidden' }}>
            <InventoryOptionsContainer
                filterText={searchText}
                onFilterTextChange={setSearchText}
            />
            <Region layout={{ position: 'absolute', left: 0, top: 27, width: 284, bottom: 3, overflow: 'hidden' }}>
                <Box layout={{ position: 'absolute', left: 0, top: 0, width: 284, bottom: 10, flexDirection: 'column' }}>
                    <InfiniteGrid
                        items={visibleGroups}
                        itemGrid={{ width: THUMB_SIZE, height: THUMB_SIZE, spacing: 2 }}
                        getKey={group => `collectible-${group.key}`}
                        itemRender={group => (
                            <CollectibleThumb
                                group={group}
                                selected={group.key === selectedKey}
                                onSelect={selectTradingNft}
                            />
                        )}
                    />
                </Box>
            </Region>
            <Region layout={{ position: 'absolute', left: 290, top: 27, width: 180, bottom: -3 }}>
                {selectedGroup && selectedInfo && (
                    <>
                        <Region layout={{ position: 'absolute', left: 5, top: 5, right: 0, flexDirection: 'column', gap: 1 }}>
                            <ThemeText
                                text={getCollectibleProductName(selectedInfo)}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 168 }}
                                flashFormat={{ bold: true }}
                                verticalAlign="top"
                                layout={{ width: 170, flexShrink: 0 }}
                            />
                            <ThemeText
                                text={getCollectibleProductType(selectedInfo)}
                                textStyle="u_regular"
                                verticalAlign="top"
                                layout={{ width: 170, flexShrink: 0 }}
                            />
                        </Region>
                        <Box layout={{ position: 'absolute', left: 2, top: 45, width: 170, height: 110 }}>
                            <CollectiblesProductPreview
                                preview={getCollectiblePreviewIcon(selectedInfo)}
                                slots={{
                                    productPreview: { left: 0, top: 0, width: 170, height: 110 },
                                    badge: { left: 65, top: 35, width: 40, height: 40, zoom: 1 },
                                    unknown: { left: 76, top: 46, width: 18, height: 18, src: LayoutImage('shared/collectables_icon_curator_stamp_small.png'), stretched: true },
                                    pet: { left: 0, top: 0, width: 170, height: 110, zoom: 1, shrinkOnOverflow: true },
                                }}
                            />
                        </Box>
                        {tradingActive && (
                            <Region layout={{ position: 'absolute', left: 0, right: 5, top: 160, height: 25, flexDirection: 'row', gap: 10 }}>
                                <TextInput
                                    value={offerCount}
                                    onChange={setOfferCount}
                                    textStyle="u_regular"
                                    flashPlacement
                                    border="#000000"
                                    alwaysShowSelection
                                    backgroundColor="#ffffff"
                                    focusedBackgroundColor="#ffffff"
                                    layout={{ width: 50, height: 19, flexShrink: 0 }}
                                />
                                <Button
                                    variant="3"
                                    name="offertotrade_btn"
                                    textStyle="button_shiny_regular"
                                    disabled={selectedGroup.unlockedAssetCount <= 0}
                                    onPointerTap={onOffer}
                                    layout={{ width: 110, height: 22, flexShrink: 0 }}
                                >
                                    {t('inventory.trading.offer')}
                                </Button>
                            </Region>
                        )}
                    </>
                )}
            </Region>
        </Region>
    );
};
