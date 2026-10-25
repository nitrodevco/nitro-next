import { CatalogFrontPageItemType, ICatalogFrontPageItem } from '@nitrodevco/nitro-api';
import { TemplateBindings } from '@nitrodevco/nitro-theme';

import { useCatalogStore } from '#base/context/catalog';
import { useConfigValue } from '#base/context/system';
import { useCatalogNavigation } from '#base/hooks';

import { useCatalogWidgetView } from '../catalogWidgetView';

/** `init`: the first item goes into `firstitem`, the list takes the rest up to the fourth. */
const MAX_ITEMS = 4;

/**
 * The front page's featured items, the embedded `featuredItemsWidget` of
 * `layout_frontpage_featured.xml` - Flash's `FeaturedItemsCatalogWidget`. `init` takes
 * `featured_item_template` out of `itemlist_featured`; the catalogue's front page items
 * (`HabboCatalog.frontPageItems`, which the last `CatalogPageMessage` that had any brought) fill
 * `firstitem` on the left and, from the second to the fourth, clones of the template in the list.
 * With none, the list is empty and `firstitem` keeps its layout.
 *
 * `populateItem`: `item_title` the item's name, `item_image` the promo picture
 * (`image.library.url` + `itemPromoImage`, left as the layout has it when there is none), and its
 * `event_catcher_region` listening. Pressing an item (`WME_DOWN`) opens what it points at
 * (`eventProc`): a page by name - `room_bundles_mobile` and `mobile_subscriptions` go to the
 * desktop's `room_bundles` and `hc_membership` - or the page of an offer. The third type, an
 * in-app purchase, has no case in Flash and does nothing.
 */
export const CatalogFeaturedItemsWidgetView = () => {
    const frontPageItems = useCatalogStore(x => x.frontPageItems);
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const { openPageByName, openPageByOfferId } = useCatalogNavigation();

    const onSelect = (item: ICatalogFrontPageItem) => {
        switch (item.type) {
            case CatalogFrontPageItemType.Page: {
                const location = String(item.value);

                if (location === 'room_bundles_mobile') return openPageByName('room_bundles');
                if (location === 'mobile_subscriptions') return openPageByName('hc_membership');

                return openPageByName(location);
            }
            case CatalogFrontPageItemType.ProductOffer:
                return openPageByOfferId(Number(item.value));
        }
    };

    /** `populateItem`'s bindings, inside the item. */
    const populateItem = (item: ICatalogFrontPageItem): TemplateBindings => ({
        item_title: { caption: item.itemName },
        item_image: item.itemPromoImage ? { asset: `${imageLibraryUrl}${item.itemPromoImage}` } : {},
        event_catcher_region: { onPointerDown: () => onSelect(item) },
    });

    const firstItem = frontPageItems[0];
    const firstBindings: TemplateBindings = firstItem
        ? Object.fromEntries(Object.entries(populateItem(firstItem)).map(([ key, binding ]) => [ `firstitem/${key}`, binding ]))
        : {};

    useCatalogWidgetView({
        bindings: {
            ...firstBindings,
            itemlist_featured: {
                items: frontPageItems.slice(1, MAX_ITEMS).map((item, index) => ({
                    key: String(index),
                    from: 'featured_item_template',
                    bindings: populateItem(item),
                })),
            },
        },
    });

    return null;
};
