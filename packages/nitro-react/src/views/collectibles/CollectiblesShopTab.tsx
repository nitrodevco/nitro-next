/**
 * The shop tab - `tabs/ShopTab` in `shopContainer` of `collectible_view.xml` (5 left of the other
 * tabs): the category list (`ShopNavigationNodeRenderer` per localized category), and the
 * category's `collection_content` - the previewer of the offer picked, its name, the mint count
 * (`mintlimit_container`, shown for offers with a mint limit), the emerald price and the buy
 * button (disabled once the limit is reached) - over the category's offers
 * (`ShopCollectibleItemRenderer`: the product's icon, its price and the emerald icon). While the
 * offers are asked for, `loading_contents` covers it.
 */
import { activateShopCategory, buySelectedShopOffer, selectShopItem } from '#base/commands';
import { useCollectiblesStore, wrapBaseItem } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { Border, Button, Icon, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

import { CollectiblesPreviewBackground } from './CollectiblesCollectionView';
import { CollectiblesItemCell } from './CollectiblesItemCell';
import { CollectiblesLoadingView } from './CollectiblesLoadingView';
import { CollectiblesNavigationItem } from './CollectiblesNavigationItem';
import { COLLECTIBLES_HUB_PREVIEW_SLOTS } from './collectiblesPreviewSlots';
import { CollectiblesProductPreview } from './CollectiblesProductPreview';

export const CollectiblesShopTab = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const ready = useCollectiblesStore(x => x.shopReady);
    const categories = useCollectiblesStore(x => x.shopCategories);
    const offersByCategory = useCollectiblesStore(x => x.shopOffersByCategory);
    const activeCategory = useCollectiblesStore(x => x.shopActiveCategory);
    const selectedIndex = useCollectiblesStore(x => x.shopSelectedIndex);
    const preview = useCollectiblesStore(x => x.shopPreview);
    const previewInfo = useCollectiblesStore(x => x.shopPreviewInfo);
    const offers = activeCategory ? (offersByCategory[activeCategory] ?? []) : [];

    return (
        <Region
            name="shopContainer"
            layout={{ position: 'absolute', left: -5, width: 490, top: 125, height: 428 }}
        >
            {ready && (
                <Region
                    name="loaded_content"
                    layout={{ position: 'absolute', left: 0, width: 490, top: 0, height: 428 }}
                >
                    <Region
                        name="navigationContainer"
                        layout={{ position: 'absolute', left: 8, width: 184, top: 3, height: 425 }}
                    >
                        <Border
                            variant="6"
                            blend={0.5}
                            layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 425 }}
                        />
                        <ScrollArea
                            orientation="vertical"
                            variant="3"
                            layout={{ position: 'absolute', left: 3, width: 178, top: 5, height: 415 }}
                        >
                            <Region
                                name="navigationList"
                                layout={{ flexDirection: 'column', width: '100%' }}
                            >
                                {categories.map(category => (
                                    <CollectiblesNavigationItem
                                        key={category}
                                        title={category}
                                        active={category === activeCategory}
                                        onSelect={() => activateShopCategory(send, category)}
                                    />
                                ))}
                            </Region>
                        </ScrollArea>
                    </Region>
                    {(categories.length > 0) && (
                        <Region
                            name="collection_content"
                            layout={{ position: 'absolute', left: 200, width: 290, top: 3, height: 425 }}
                        >
                            <Region
                                name="preview_container"
                                layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260, overflow: 'hidden' }}
                            >
                                <Border
                                    variant="3"
                                    name="collection_preview_bg"
                                    tintColor="#3d1f39"
                                    layout={{ position: 'absolute', left: 0, width: 296, top: 0, height: 260, overflow: 'hidden' }}
                                >
                                    <CollectiblesPreviewBackground starActive={ready} />
                                    <CollectiblesProductPreview
                                        preview={preview}
                                        slots={COLLECTIBLES_HUB_PREVIEW_SLOTS}
                                    />
                                    <Region
                                        name="product_name_container"
                                        backgroundColor="#000000"
                                        backgroundAlpha={0.839}
                                        layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 26 }}
                                    >
                                        <ThemeText
                                            text={previewInfo?.productName ?? 'Lorem ipsum hot air balloon'}
                                            textStyle="u_regular"
                                            textOptions={{ fill: '#ffffff', align: 'center' }}
                                            name="preview_furni_name"
                                            verticalAlign="top"
                                            layout={{ position: 'absolute', left: 0, width: 290, top: 5 }}
                                        />
                                    </Region>
                                    <Region layout={{ position: 'absolute', left: 114, top: 226, flexDirection: 'row', gap: 4 }}>
                                        <ThemeText
                                            text={previewInfo?.price ?? '100'}
                                            textStyle="u_bold"
                                            textOptions={{ fill: '#ffffff', fontSize: 14, align: 'right' }}
                                            name="price_text"
                                            verticalAlign="top"
                                            layout={{ width: 50, marginTop: 5, flexShrink: 0, minHeight: 25 }}
                                        />
                                        <Icon
                                            variant="70"
                                            name="emerald_icon"
                                            layout={{ width: 26, height: 20, marginTop: 6, flexShrink: 0 }}
                                        />
                                        <Button
                                            variant="5"
                                            name="buy_button"
                                            tintColor="#01a101"
                                            disabled={!(previewInfo?.buyEnabled ?? true)}
                                            onPointerTap={buySelectedShopOffer}
                                            layout={{ width: 88, height: 30, flexShrink: 0 }}
                                        >
                                            {t('generic.buy')}
                                        </Button>
                                    </Region>
                                    {(previewInfo?.mintLimitVisible ?? true) && (
                                        <Region
                                            name="mintlimit_container"
                                            layout={{ position: 'absolute', left: 184, top: 196, flexDirection: 'row', gap: 4 }}
                                        >
                                            <ThemeText
                                                text={previewInfo?.mintLimitText ?? '100/1000'}
                                                textStyle="u_bold"
                                                textOptions={{ fill: '#ffffff', fontSize: 14, align: 'right' }}
                                                name="mintlimit_text"
                                                verticalAlign="top"
                                                layout={{ width: 80, marginTop: 5, flexShrink: 0, minHeight: 25 }}
                                            />
                                            <ThemeImage
                                                src={LayoutImage('shared/collectables_icon_curator_stamp_small.png')}
                                                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center right' }}
                                                layout={{ width: 18, height: 30, flexShrink: 0 }}
                                            />
                                        </Region>
                                    )}
                                </Border>
                            </Region>
                            <Region
                                name="item_container"
                                layout={{ position: 'absolute', left: 0, width: 290, top: 270, height: 153 }}
                            >
                                <ScrollArea
                                    orientation="vertical"
                                    variant="3"
                                    layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 153 }}
                                >
                                    <Region
                                        name="itemgrid_shop"
                                        layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
                                    >
                                        {offers.map((offer, index) => (
                                            <CollectiblesItemCell
                                                key={offer.productCode}
                                                kind="shop"
                                                info={wrapBaseItem(offer.productInfo)}
                                                price={offer.emeraldPrice}
                                                active={index === selectedIndex}
                                                onSelect={() => selectShopItem(send, index)}
                                            />
                                        ))}
                                    </Region>
                                </ScrollArea>
                            </Region>
                        </Region>
                    )}
                </Region>
            )}
            {!ready && <CollectiblesLoadingView left={5} />}
        </Region>
    );
};
