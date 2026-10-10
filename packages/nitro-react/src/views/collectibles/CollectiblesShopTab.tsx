/**
 * The shop tab - `tabs/ShopTab` in `shopContainer` of `collectible_view.xml`: the category list
 * (`ShopNavigationNodeRenderer` per localized category), and the category's `collection_content` -
 * the previewer of the offer picked, its name, the mint count (`mintlimit_container`, shown for
 * offers with a mint limit), the emerald price and the buy button (disabled once the limit is
 * reached) - over the category's offers (`ShopCollectibleItemRenderer`: the product's icon, its
 * price and the emerald icon). While the offers are asked for, `loading_contents` covers it.
 *
 * A shop node's highlight is the `SELECTION_HILIGHT` strip alone: the layout hides its
 * `item_hilight_outer`, which nothing shows.
 */
import { activateShopCategory, buySelectedShopOffer, selectShopItem } from '#base/commands';
import { useCollectiblesStore, wrapBaseItem } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';

import { CollectiblesTabWindow } from './CollectiblesTabWindow';
import { collectibleGridItem, collectiblesHubPreviewer, collectiblesLoadingBindings, collectiblesNavigationNode, collectiblesPreviewerBindings, collectiblesStarBinding, useCollectiblesHover, useCollectiblesNavigationLooks } from './collectiblesTemplate';

const PREVIEWER = collectiblesHubPreviewer();

export const CollectiblesShopTab = () => {
    const { send } = useWebSocketContext();
    const ready = useCollectiblesStore(x => x.shopReady);
    const categories = useCollectiblesStore(x => x.shopCategories);
    const offersByCategory = useCollectiblesStore(x => x.shopOffersByCategory);
    const activeCategory = useCollectiblesStore(x => x.shopActiveCategory);
    const selectedIndex = useCollectiblesStore(x => x.shopSelectedIndex);
    const preview = useCollectiblesStore(x => x.shopPreview);
    const previewInfo = useCollectiblesStore(x => x.shopPreviewInfo);
    const looks = useCollectiblesNavigationLooks(categories, activeCategory);
    const hover = useCollectiblesHover();
    const offers = activeCategory ? (offersByCategory[activeCategory] ?? []) : [];

    return (
        <CollectiblesTabWindow
            container="shopContainer"
            bindings={{
                ...collectiblesLoadingBindings(ready),
                navigationList: {
                    items: categories.map(category => collectiblesNavigationNode({
                        key: category,
                        title: category,
                        active: category === activeCategory,
                        looks,
                        onSelect: () => activateShopCategory(send, category),
                    })),
                },
                collection_content: { visible: categories.length > 0 },
                bg_star: collectiblesStarBinding(ready),
                ...collectiblesPreviewerBindings(PREVIEWER, preview),
                ...(previewInfo && {
                    preview_furni_name: { caption: previewInfo.productName },
                    price_text: { caption: previewInfo.price },
                    mintlimit_container: { visible: previewInfo.mintLimitVisible },
                    mintlimit_text: { caption: previewInfo.mintLimitText },
                }),
                buy_button: { ...(previewInfo && { disabled: !previewInfo.buyEnabled }), onPointerTap: buySelectedShopOffer },
                itemgrid_shop: {
                    items: offers.map((offer, index) => collectibleGridItem({
                        key: offer.productCode,
                        from: 'itemgrid_shop/item_template',
                        kind: 'shop',
                        info: wrapBaseItem(offer.productInfo),
                        price: offer.emeraldPrice,
                        active: index === selectedIndex,
                        hover,
                        onSelect: () => selectShopItem(send, index),
                    })),
                },
            }}
        />
    );
};
