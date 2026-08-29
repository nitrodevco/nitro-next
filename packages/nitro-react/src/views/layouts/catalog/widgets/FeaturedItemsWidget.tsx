import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `featuredItemsWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutFrontpageFeaturedLayout); each passes its own placement through `layout`.
 */
/** Row template `featured_item_template` of FeaturedItemsWidget - pass real rows through its `items…` slot. */
export interface FeaturedItemsWidgetFeaturedItemTemplateItemProps {
    captionItemTitle?: string;
    layout?: BoxLayout;
    onEventCatcherRegion?: () => void;
    srcItemImage?: string;
}

export const FeaturedItemsWidgetFeaturedItemTemplateItem = ({ captionItemTitle, layout, onEventCatcherRegion, srcItemImage }: FeaturedItemsWidgetFeaturedItemTemplateItemProps) => {
    return (
        <Region
            name="featured_item_template"
            layout={{ width: 360, height: 126, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="item_image"
                src={srcItemImage}
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
                    layout={{ position: 'absolute', left: 5, width: 340, top: 5, maxWidth: 340, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemTitle ?? ''}
                        textStyle="text-style-ubuntu-condensed-title"
                        textOptions={{ wordWrap: true, wordWrapWidth: 340 }}
                    />
                </Region>
            </Border>
            <Region
                name="event_catcher_region"
                onPointerTap={onEventCatcherRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 126 }}
            />
        </Region>
    );
};

/** Named region `featuredItemsWidget` of FeaturedItemsWidget - configured through the parent's `featuredItemsWidget` prop. */
export interface FeaturedItemsWidgetProps extends CatalogWidgetFlags {
    captionItemTitle?: string;
    itemsItemlistFeatured?: ReactNode;
    layout?: BoxLayout;
    onEventCatcherRegion?: () => void;
    onFirstitem?: () => void;
    srcItemImage?: string;
}

export const FeaturedItemsWidget = ({ captionItemTitle, itemsItemlistFeatured, layout, onEventCatcherRegion, onFirstitem, srcItemImage }: FeaturedItemsWidgetProps) => {
    return (
        <Region
            name="featuredItemsWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 192, width: 360, top: 0, height: 392 }}
            >
                <Region
                    name="itemlist_featured"
                    layout={{ flexDirection: 'column', gap: 7, width: '100%' }}
                >
                    {itemsItemlistFeatured ?? (
                        <FeaturedItemsWidgetFeaturedItemTemplateItem />
                    )}
                </Region>
            </ScrollArea>
            <Region
                name="firstitem"
                onPointerTap={onFirstitem}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 460 }}
            >
                <ThemeImage
                    name="item_image"
                    src={srcItemImage}
                    layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 460, overflow: 'hidden' }}
                />
                <Border
                    variant="3"
                    name="text_container"
                    tintColor="#333333"
                    blend={0.5}
                    layout={{ position: 'absolute', left: 5, width: 174, top: 428, bottom: 3, maxWidth: 174 }}
                >
                    <Region
                        name="item_title"
                        layout={{ position: 'absolute', left: 5, width: 174, top: 0, maxWidth: 174, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionItemTitle ?? ''}
                            textStyle="text-style-ubuntu-condensed-title"
                            textOptions={{ wordWrap: true, wordWrapWidth: 174 }}
                        />
                    </Region>
                </Border>
                <Region
                    name="event_catcher_region"
                    onPointerTap={onEventCatcherRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 422 }}
                />
            </Region>
        </Region>
    );
};
