import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { GetChatStyleLibrary } from '#base/chat';
import { requestRecyclerPrizeTable } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { RecyclerPrize, RecyclerPrizeLevel, useRecyclerStore } from '#base/context/recycler';
import { useSystemStore, useTranslation } from '#base/context/system';
import { Border, Box, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { useFurnitureImageTexture } from '#base/views/catalog/useFurnitureImageTexture';

/** `RecyclerPrizesCatalogWidget.STAR_LEVELS`: the star each level's header shows (`star_small_<name>`). */
const STAR_LEVELS = [ 'bronze', 'silver', 'gold', 'diamond', 'ruby', 'pink', 'green', 'grey' ];

/** `gridItem`: 36x36 cells, 2px apart in the level's 328px `itemGrid`. */
const CELL_SIZE = 36;
const CELL_SPACING = 2;
const GRID_WIDTH = 328;

/** `ItemGridCatalogWidget.select`'s selection blue on `border_outline`. */
const HILIGHT_COLOR = '#63c5e9';

/** `RecycleRewardDisplayWrapper.productTypeId`: what the product image widget draws. */
const PRODUCT_TYPE_CHAT_STYLE = 9;
const PRODUCT_TYPE_WALL = 0;
const PRODUCT_TYPE_FLOOR = 1;

const getProductTypeId = (prize: RecyclerPrize) => {
    switch (prize.productItemType) {
        case 'chat_style': return PRODUCT_TYPE_CHAT_STYLE;
        case 'i': return PRODUCT_TYPE_WALL;
        case 's': return PRODUCT_TYPE_FLOOR;
        default: return -1;
    }
};

/**
 * `PrizeGridItem.initProductIcon` / `DealPrizeContainer.setIcon`: a floor or wall item's icon, a
 * chat style's selector preview at half size, or for a deal the `ctlg_pic_deal_icon_narrow`
 * picture with the product count in `bundleCounter`.
 */
const PrizeIcon = ({ prize }: { prize: RecyclerPrize }) => {
    if (prize.isDeal) {
        return (
            <>
                <ThemeImage
                    name="image"
                    src={LayoutImage('catalog/ctlg_pic_deal_icon_narrow.png')}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 0, width: CELL_SIZE, top: 0, height: CELL_SIZE }}
                />
                <ThemeText
                    name="bundleCounter"
                    text={String(prize.subProducts.length)}
                    textStyle="regular"
                    textOptions={{ fill: '#cccc66', fontFamily: 'Volter Bold' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 18, top: 18 }}
                />
            </>
        );
    }

    if (prize.productItemType === 'chat_style') {
        const preview = GetChatStyleLibrary().getStyle(prize.productItemTypeId)?.selectorPreviewTexture;

        if (!preview) return null;

        return (
            <Region layout={{ position: 'absolute', left: 0, width: CELL_SIZE, top: 0, height: CELL_SIZE, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <ThemeImage
                    name="image"
                    texture={preview}
                    scale={0.5}
                />
            </Region>
        );
    }

    const engine = GetRoomEngine();
    let iconUrl = '';

    if (prize.productItemType === 's') iconUrl = engine.getFurnitureFloorIconUrl(prize.productItemTypeId) ?? '';
    else if (prize.productItemType === 'i') iconUrl = engine.getFurnitureWallIconUrl(prize.productItemTypeId, undefined) ?? '';

    if (iconUrl === '') return null;

    return (
        <ThemeImage
            name="image"
            src={iconUrl}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
            layout={{ position: 'absolute', left: 0, width: CELL_SIZE, top: 0, height: CELL_SIZE }}
        />
    );
};

/** One `gridItem` of a level: the prize's icon, and `ITEM_HILIGHT` (the style 2 / style 3 blue borders) while it is the one selected. */
const PrizeGridItem = ({ prize, active, onSelect }: { prize: RecyclerPrize; active: boolean; onSelect: (prize: RecyclerPrize) => void }) => (
    <Region
        cursor="pointer"
        onPointerTap={() => onSelect(prize)}
        layout={{ position: 'relative', width: CELL_SIZE, height: CELL_SIZE, flexShrink: 0 }}
    >
        {active && (
            <Border
                variant="2"
                tintColor="#a1a19b"
                layout={{ position: 'absolute', left: 0, width: CELL_SIZE, top: 0, height: CELL_SIZE }}
            >
                <Border
                    variant="3"
                    name="border_outline"
                    tintColor={HILIGHT_COLOR}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <Border
                        variant="3"
                        layout={{ position: 'absolute', left: 2, width: 32, top: 2, height: 32 }}
                    />
                </Border>
            </Border>
        )}
        <PrizeIcon prize={prize} />
    </Region>
);

/**
 * One `recyclerPrizesWidgetLevelItem` (348 wide, growing with its grid): the header row - the
 * level's star, its bold title (`recycler.prizes.category.<level>`) and, above level 1, " -" and
 * the italic odds (`recycler.prizes.odds`, `1:<denominator>`) - the 1px `0x50000000` line, and the
 * `0xeaeaea` panel with the prizes in a 328px grid of 36px cells 2 apart.
 */
const PrizeLevelItem = ({ level, selected, onSelect }: { level: RecyclerPrizeLevel; selected: RecyclerPrize | undefined; onSelect: (prize: RecyclerPrize) => void }) => {
    const t = useTranslation();
    const columns = Math.max(1, Math.floor((GRID_WIDTH + CELL_SPACING) / (CELL_SIZE + CELL_SPACING)));
    const rows = Math.max(1, Math.ceil(level.prizes.length / columns));
    const gridHeight = (rows * CELL_SIZE) + ((rows - 1) * CELL_SPACING);

    return (
        <Border
            variant="0"
            name="border"
            layout={{ width: 348, height: 5 + 23 + 1 + 5 + gridHeight + 3 + 5, flexShrink: 0 }}
        >
            <Box layout={{ position: 'absolute', left: 5, width: 338, top: 5, flexDirection: 'column' }}>
                <Box layout={{ height: 23, flexDirection: 'row', alignItems: 'flex-start' }}>
                    <ThemeImage
                        name="star_icon"
                        src={LayoutImage(`catalog/star_small_${STAR_LEVELS[level.prizeLevelId - 1] ?? ''}.png`)}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ width: 18, height: 17, marginTop: 3 }}
                    />
                    <ThemeText
                        name="level_title"
                        text={t(`recycler.prizes.category.${level.prizeLevelId}`)}
                        textStyle="u_regular"
                        flashFormat={{ bold: true }}
                        verticalAlign="top"
                        layout={{ marginTop: 3 }}
                    />
                    {(level.prizeLevelId > 1) && (
                        <ThemeText
                            name="level_splitter"
                            text=" -"
                            textStyle="u_regular"
                            verticalAlign="top"
                            layout={{ marginTop: 3 }}
                        />
                    )}
                    {(level.prizeLevelId !== 1) && (
                        <ThemeText
                            name="level_chances"
                            text={t('recycler.prizes.odds', '', { odds: `1:${level.probabilityDenominator}` })}
                            textStyle="u_regular"
                            flashFormat={{ italic: true }}
                            verticalAlign="top"
                            layout={{ marginTop: 3 }}
                        />
                    )}
                </Box>
                <Region
                    backgroundColor="#000000"
                    backgroundAlpha={0x50 / 255}
                    layout={{ width: 338, height: 1 }}
                />
                <Region
                    backgroundColor="#eaeaea"
                    layout={{ width: 338, height: gridHeight + 8 }}
                >
                    <Region
                        name="itemGrid"
                        layout={{ position: 'absolute', left: 5, width: GRID_WIDTH, top: 5, flexDirection: 'row', flexWrap: 'wrap', gap: CELL_SPACING }}
                    >
                        {level.prizes.map((prize, index) => (
                            <PrizeGridItem
                                key={index}
                                prize={prize}
                                active={prize === selected}
                                onSelect={onSelect}
                            />
                        ))}
                    </Region>
                </Region>
            </Box>
        </Border>
    );
};

/** The `product_image` widget for a floor or wall prize: its 64px image facing 90 degrees, centred. */
const PrizeFurnitureImage = ({ className, colorIndex }: { className: string; colorIndex: number }) => {
    const { texture, width, height } = useFurnitureImageTexture(className, colorIndex, 2, RoomGeometryScaleType.ZoomedIn, 0);

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

/**
 * `recyclerPrizesWidget` - Flash's `RecyclerPrizesCatalogWidget` on `layout_recycler_prizes`
 * (the container is tagged `WIDE`, and the widget works with the layout's own `productView` and
 * `itemList`): the prize table (`RecyclerLogic.getPrizeTable`, asked for once and kept) as one
 * `recyclerPrizesWidgetLevelItem` per level in `itemList` (spacing 11), the first prize of the
 * first level selected, and the selected prize in `productView` - the `product_image` widget and
 * its name (`PrizeContainer.title`: the furni's name, a chat style's product name, nothing for a
 * deal); the description is always empty.
 *
 * The product image widget draws a floor or wall item at 64 facing 90 degrees; for a chat style
 * Flash renders a sample bubble (`createChatItemPreview`), which this client does not have, so the
 * style's selector preview stands in; a deal is the widget's unknown image, which is not drawn.
 */
export const CatalogRecyclerPrizesWidgetView = () => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const prizes = useRecyclerStore(x => x.recyclerPrizes);
    const productData = useSystemStore(x => x.productData);
    const [ selected, setSelected ] = useState<RecyclerPrize | undefined>(undefined);

    // `init` -> `getPrizeTable(onPrizesReceived)`.
    useEffect(() => {
        requestRecyclerPrizeTable(send);
    }, [ send ]);

    // `onPrizesReceived`: the first prize of the first level.
    const shown = selected ?? prizes?.[0]?.prizes[0];

    let title = '';

    if (shown && !shown.isDeal) title = shown.furnitureData ? shown.furnitureData.localizedName : ((shown.productItemType === 'chat_style') ? (productData[`chat_bubble_${shown.productItemTypeId}`]?.name ?? '') : '');

    const productTypeId = shown ? getProductTypeId(shown) : -1;
    const chatPreview = (shown && (productTypeId === PRODUCT_TYPE_CHAT_STYLE)) ? GetChatStyleLibrary().getStyle(shown.productItemTypeId)?.selectorPreviewTexture : undefined;

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
            <ScrollArea
                orientation="vertical"
                variant="100"
                layout={{ position: 'absolute', left: 0, width: 360, top: 237, bottom: 0 }}
                contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 11 }}
            >
                {prizes?.map(level => (
                    <PrizeLevelItem
                        key={level.prizeLevelId}
                        level={level}
                        selected={shown}
                        onSelect={setSelected}
                    />
                ))}
            </ScrollArea>
            <Region
                name="productView"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
            >
                <Region
                    name="product_viewer"
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240, justifyContent: 'center', alignItems: 'center' }}
                >
                    {shown && !shown.isDeal && shown.furnitureData && ((productTypeId === PRODUCT_TYPE_FLOOR) || (productTypeId === PRODUCT_TYPE_WALL)) && (
                        <PrizeFurnitureImage
                            key={`${shown.productItemType}${shown.productItemTypeId}`}
                            className={shown.furnitureData.className}
                            colorIndex={shown.furnitureData.colorIndex}
                        />
                    )}
                    {chatPreview && (
                        <ThemeImage texture={chatPreview} />
                    )}
                </Region>
                <ThemeText
                    name="ctlg_product_name"
                    text={shown ? title : t('lorem.title')}
                    textStyle="u_bold"
                    markup
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, top: 16 }}
                />
                <ThemeText
                    name="ctlg_description"
                    text={shown ? '' : t('lorem.title')}
                    textStyle="u_small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 158 }}
                    markup
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, width: 162, top: 33 }}
                />
            </Region>
        </Region>
    );
};
