import { CatalogFrontPageItemType, ICatalogFrontPageItem } from '@nitrodevco/nitro-api';

import { useCatalogStore } from '#base/context/catalog';
import { useConfigValue } from '#base/context/system';
import { useCatalogNavigation } from '#base/hooks';
import { Border, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** `init`: the first item goes into `firstitem`, the list takes the rest up to the fourth. */
const MAX_ITEMS = 4;

interface FeaturedItemProps {
    item: ICatalogFrontPageItem | undefined;
    imageLibraryUrl: string;
    onSelect: () => void;
}

/**
 * `populateItem` on the list's `featured_item_template`: the promo picture (`image.library.url` +
 * `itemPromoImage`, left as the template has it when there is none) under a translucent dark
 * border with the title in `ubuntu_condensed_title`, and the `event_catcher_region` over it all.
 */
const FeaturedListItem = ({ item, imageLibraryUrl, onSelect }: FeaturedItemProps) => (
    <Region
        name="featured_item_template"
        layout={{ height: 126, width: 360, flexShrink: 0 }}
    >
        <ThemeImage
            name="item_image"
            src={item?.itemPromoImage ? `${imageLibraryUrl}${item.itemPromoImage}` : undefined}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
            layout={{ position: 'absolute', left: 0, width: 356, top: 0, height: 126 }}
        />
        <Border
            variant="3"
            name="text_container"
            tintColor="#333333"
            blend={0.5}
            layout={{ position: 'absolute', left: 5, width: 346, top: 93, bottom: 3 }}
        >
            <Region
                name="item_title"
                layout={{ position: 'absolute', left: 5, width: 340, top: 5, maxWidth: 340, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', paddingRight: 5, paddingBottom: 5 }}
            >
                <ThemeText
                    text={item?.itemName ?? ''}
                    textStyle="ubuntu_condensed_title"
                    textOptions={{ wordWrap: true, wordWrapWidth: 331 }}
                />
            </Region>
        </Border>
        <Region
            name="event_catcher_region"
            onPointerDown={onSelect}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 126 }}
        />
    </Region>
);

/**
 * The front page's featured items, the embedded `featuredItemsWidget` of
 * `layout_frontpage_featured.xml` - Flash's `FeaturedItemsCatalogWidget`. The catalogue's front
 * page items (`HabboCatalog.frontPageItems`, which the last `CatalogPageMessage` that had any
 * brought) fill the tall `firstitem` on the left and, from the second to the fourth, the
 * `itemlist_featured` beside it (7px apart). With none, the list is empty and `firstitem` keeps
 * its empty template.
 *
 * Pressing an item (`WME_DOWN` on its `event_catcher_region`) opens what it points at
 * (`eventProc`): a page by name - `room_bundles_mobile` and `mobile_subscriptions` go to the
 * desktop's `room_bundles` and `hc_membership` - or the page of an offer. The third type, an
 * in-app purchase, has no case in Flash and does nothing.
 */
export const CatalogFeaturedItemsWidgetView = () => {
    const frontPageItems = useCatalogStore(x => x.frontPageItems);
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const { openPageByName, openPageByOfferId } = useCatalogNavigation();

    const onSelect = (item: ICatalogFrontPageItem | undefined) => {
        if (!item) return;

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

    const firstItem = frontPageItems[0];
    const listItems = frontPageItems.slice(1, MAX_ITEMS);

    return (
        <>
            <ScrollArea
                orientation="vertical"
                variant="3"
                layout={{ position: 'absolute', left: 192, width: 360, top: 0, height: 392 }}
            >
                <Region
                    name="itemlist_featured"
                    layout={{ flexDirection: 'column', gap: 7, width: '100%' }}
                >
                    {listItems.map((item, index) => (
                        <FeaturedListItem
                            key={index}
                            item={item}
                            imageLibraryUrl={imageLibraryUrl}
                            onSelect={() => onSelect(item)}
                        />
                    ))}
                </Region>
            </ScrollArea>
            <Region
                name="firstitem"
                layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 460 }}
            >
                <ThemeImage
                    name="item_image"
                    src={firstItem?.itemPromoImage ? `${imageLibraryUrl}${firstItem.itemPromoImage}` : undefined}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 460 }}
                />
                <Border
                    variant="3"
                    name="text_container"
                    tintColor="#333333"
                    blend={0.5}
                    layout={{ position: 'absolute', left: 5, width: 174, top: 428, bottom: 3, maxWidth: 174, overflow: 'hidden' }}
                >
                    <Region
                        name="item_title"
                        layout={{ position: 'absolute', left: 5, width: 174, top: 0, maxWidth: 174, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', paddingRight: 5, paddingBottom: 5 }}
                    >
                        <ThemeText
                            text={firstItem?.itemName ?? ''}
                            textStyle="ubuntu_condensed_title"
                            textOptions={{ wordWrap: true, wordWrapWidth: 165 }}
                        />
                    </Region>
                </Border>
                <Region
                    name="event_catcher_region"
                    onPointerDown={() => onSelect(firstItem)}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 422 }}
                />
            </Region>
        </>
    );
};
