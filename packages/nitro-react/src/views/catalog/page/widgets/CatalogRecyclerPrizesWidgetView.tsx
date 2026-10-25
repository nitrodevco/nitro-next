import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { Template, TemplateItem } from '@nitrodevco/nitro-theme';
import { ReactNode, useEffect, useState } from 'react';

import { GetChatStyleLibrary } from '#base/chat';
import { requestRecyclerPrizeTable } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { RecyclerPrize, RecyclerPrizeLevel, useRecyclerStore } from '#base/context/recycler';
import { useSystemStore, useTranslation } from '#base/context/system';
import { useFurnitureImageTexture } from '#base/hooks';
import { Box, ThemeImage, useTemplateLibrary } from '#base/theme';

import { CATALOG_LIBRARY, catalogTemplateId } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';

/** `RecyclerPrizesCatalogWidget.STAR_LEVELS`: the star each level's header shows (`star_small_<name>`). */
const STAR_LEVELS = [ 'bronze', 'silver', 'gold', 'diamond', 'ruby', 'pink', 'green', 'grey' ];

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

/** Engine-drawn content centred in the element it is injected into (`setIconImage` / the product image widget). */
const Centred = ({ children }: { children: ReactNode }) => (
    <Box layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        {children}
    </Box>
);

/**
 * `PrizeGridItem.initProductIcon`: a floor or wall item's icon, or a chat style's selector preview
 * at half size, centred in `image` (`setIconImage`).
 */
const prizeIcon = (prize: RecyclerPrize) => {
    if (prize.productItemType === 'chat_style') {
        const preview = GetChatStyleLibrary().getStyle(prize.productItemTypeId)?.selectorPreviewTexture;

        return preview && (
            <Centred>
                <ThemeImage
                    texture={preview}
                    scale={0.5}
                />
            </Centred>
        );
    }

    const engine = GetRoomEngine();
    let iconUrl = '';

    if (prize.productItemType === 's') iconUrl = engine.getFurnitureFloorIconUrl(prize.productItemTypeId) ?? '';
    else if (prize.productItemType === 'i') iconUrl = engine.getFurnitureWallIconUrl(prize.productItemTypeId, undefined) ?? '';

    if (iconUrl === '') return undefined;

    return (
        <Centred>
            <ThemeImage src={iconUrl} />
        </Centred>
    );
};

/**
 * `createPrizeItem`: a `gridItem` clone with its `clubLevelIcon` hidden (`ProductGridItem.set view`
 * hides `ITEM_HILIGHT` and `multiContainer`), the icon set by `PrizeContainer.setIcon` - for a deal
 * (`DealPrizeContainer.setIcon`) `ctlg_pic_deal_icon_narrow` and the product count in
 * `bundleCounter` - and `ITEM_HILIGHT` while it is the one selected (`activate`). `WME_DOWN`
 * selects it (`ProductGridItem.eventProc`).
 */
const prizeGridItem = (from: Template, prize: RecyclerPrize, key: string, active: boolean, onSelect: (prize: RecyclerPrize) => void): TemplateItem => ({
    key,
    from,
    bindings: {
        '': { onPointerDown: () => onSelect(prize) },
        '#ITEM_HILIGHT': { visible: active },
        clubLevelIcon: { visible: false },
        multiContainer: { visible: false },
        image: prize.isDeal ? { asset: 'habbo-catalog-com-ctlg_pic_deal_icon_narrow' } : { children: prizeIcon(prize) },
        bundleCounter: prize.isDeal ? { caption: String(prize.subProducts.length) } : {},
    },
});

/**
 * `createLevelItem`: a `recyclerPrizesWidgetLevelItem` clone - its `level_title`
 * (`recycler.prizes.category.<level>`), above level 1 the `level_splitter` and the `level_chances`
 * (`recycler.prizes.odds`, `1:<denominator>`), the level's star, and a prize item per prize in
 * its `itemGrid`.
 */
const prizeLevelItem = (templates: Record<string, Template>, level: RecyclerPrizeLevel, selected: RecyclerPrize | undefined, onSelect: (prize: RecyclerPrize) => void, t: ReturnType<typeof useTranslation>): TemplateItem => ({
    key: String(level.prizeLevelId),
    from: templates[catalogTemplateId('recyclerPrizesWidgetLevelItem')],
    bindings: {
        level_title: { caption: t(`recycler.prizes.category.${level.prizeLevelId}`) },
        level_chances: (level.prizeLevelId === 1) ? { visible: false } : { visible: true, caption: t('recycler.prizes.odds', '', { odds: `1:${level.probabilityDenominator}` }) },
        level_splitter: { visible: level.prizeLevelId > 1 },
        star_icon: { asset: `habbo-window-manager-com-star_small_${STAR_LEVELS[level.prizeLevelId - 1] ?? ''}` },
        itemGrid: { items: level.prizes.map((prize, index) => prizeGridItem(templates[catalogTemplateId('gridItem')], prize, String(index), prize === selected, onSelect)) },
    },
});

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
 * `recyclerPrizesWidgetLevelItem` per level in `itemList`, the first prize of the first level
 * selected, and the selected prize in `productView` (`viewProduct`) - the `product_image` widget
 * (`RecycleRewardDisplayWrapper`) and its name (`PrizeContainer.title`: the furni's name, a chat
 * style's product name, nothing for a deal); the description is always empty.
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
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
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
    const furniture = (shown && !shown.isDeal && ((productTypeId === PRODUCT_TYPE_FLOOR) || (productTypeId === PRODUCT_TYPE_WALL))) ? shown.furnitureData : undefined;

    useCatalogWidgetView(templates && {
        bindings: {
            itemList: { items: (prizes ?? []).map(level => prizeLevelItem(templates, level, shown, setSelected, t)) },
            ...(shown && {
                'productView/product_viewer': {
                    children: (furniture || chatPreview) && (
                        <Centred>
                            {furniture && (
                                <PrizeFurnitureImage
                                    key={`${shown.productItemType}${shown.productItemTypeId}`}
                                    className={furniture.className}
                                    colorIndex={furniture.colorIndex}
                                />
                            )}
                            {chatPreview && <ThemeImage texture={chatPreview} />}
                        </Centred>
                    ),
                },
                'productView/ctlg_product_name': { caption: title },
                'productView/ctlg_description': { caption: '' },
            }),
        },
    });

    return null;
};
