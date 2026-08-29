import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/**
 * Catalog widget `featuredItemsWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutFrontpageFeaturedLayout); each passes its own placement through `layout`.
 */
/** Named region `event_catcher_region` of FeaturedItemsWidget - configured through the parent's `eventCatcherRegion` prop. */
export interface FeaturedItemsWidgetEventCatcherRegionProps {
    layout?: BoxLayout;
    onEventCatcherRegion?: () => void;
}

export const FeaturedItemsWidgetEventCatcherRegion = ({ layout, onEventCatcherRegion }: FeaturedItemsWidgetEventCatcherRegionProps) => {
    return (
        <Region
            name="event_catcher_region"
            params={17}
            onPointerTap={onEventCatcherRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 126, ...layout }}
        />
    );
};

/** Row template `featured_item_template` of FeaturedItemsWidget - pass real rows through its `items…` slot. */
export interface FeaturedItemsWidgetFeaturedItemTemplateItemProps {
    captionItemTitle?: string;
    eventCatcherRegion?: FeaturedItemsWidgetEventCatcherRegionProps;
    layout?: BoxLayout;
    srcItemImage?: string;
}

export const FeaturedItemsWidgetFeaturedItemTemplateItem = ({ captionItemTitle, eventCatcherRegion, layout, srcItemImage }: FeaturedItemsWidgetFeaturedItemTemplateItemProps) => {
    return (
        <Region
            name="featured_item_template"
            params={16}
            layout={{ width: 360, height: 126, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="item_image"
                params={18}
                src={srcItemImage}
                layout={{ position: 'absolute', left: 0, width: 356, top: 0, height: 126 }}
            />
            <Border
                variant="3"
                name="text_container"
                params={1198099}
                tintColor="#333333"
                blend={0.5}
                layout={{ position: 'absolute', left: 5, width: 346, top: 93, bottom: 3 }}
            >
                <Region
                    name="item_title"
                    params={8388627}
                    layout={{ position: 'absolute', left: 5, width: 340, top: 5, maxWidth: 340, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemTitle ?? ''}
                        textStyle="text-style-ubuntu-condensed-title"
                        textOptions={{ wordWrap: true, wordWrapWidth: 340 }}
                    />
                </Region>
            </Border>
            <FeaturedItemsWidgetEventCatcherRegion {...eventCatcherRegion} />
        </Region>
    );
};

/** Named region `itemlist_featured` of FeaturedItemsWidget - configured through the parent's `itemlistFeatured` prop. */
export interface FeaturedItemsWidgetItemlistFeaturedProps {
    itemsItemlistFeatured?: ReactNode;
    layout?: BoxLayout;
}

export const FeaturedItemsWidgetItemlistFeatured = ({ itemsItemlistFeatured, layout }: FeaturedItemsWidgetItemlistFeaturedProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 192, width: 360, top: 0, height: 392, ...layout }}
        >
            <Region
                name="itemlist_featured"
                params={16}
                layout={{ flexDirection: 'column', gap: 7, width: '100%' }}
            >
                {itemsItemlistFeatured ?? (
                    <FeaturedItemsWidgetFeaturedItemTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `event_catcher_region` of FeaturedItemsWidget - configured through the parent's `eventCatcherRegion` prop. */
export interface FeaturedItemsWidgetEventCatcherRegion2Props {
    layout?: BoxLayout;
    onEventCatcherRegion?: () => void;
}

export const FeaturedItemsWidgetEventCatcherRegion2 = ({ layout, onEventCatcherRegion }: FeaturedItemsWidgetEventCatcherRegion2Props) => {
    return (
        <Region
            name="event_catcher_region"
            params={17}
            onPointerTap={onEventCatcherRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 422, ...layout }}
        />
    );
};

/** Named region `firstitem` of FeaturedItemsWidget - configured through the parent's `firstitem` prop. */
export interface FeaturedItemsWidgetFirstitemProps {
    captionItemTitle?: string;
    eventCatcherRegion?: FeaturedItemsWidgetEventCatcherRegion2Props;
    layout?: BoxLayout;
    onFirstitem?: () => void;
    srcItemImage?: string;
}

export const FeaturedItemsWidgetFirstitem = ({ captionItemTitle, eventCatcherRegion, layout, onFirstitem, srcItemImage }: FeaturedItemsWidgetFirstitemProps) => {
    return (
        <Region
            name="firstitem"
            params={17}
            onPointerTap={onFirstitem}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 460, ...layout }}
        >
            <ThemeImage
                name="item_image"
                params={1073741843}
                src={srcItemImage}
                layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 460, overflow: 'hidden' }}
            />
            <Border
                variant="3"
                name="text_container"
                params={1198099}
                tintColor="#333333"
                blend={0.5}
                layout={{ position: 'absolute', left: 5, width: 174, top: 428, bottom: 3, maxWidth: 174 }}
            >
                <Region
                    name="item_title"
                    params={8388627}
                    layout={{ position: 'absolute', left: 5, width: 174, top: 0, maxWidth: 174, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemTitle ?? ''}
                        textStyle="text-style-ubuntu-condensed-title"
                        textOptions={{ wordWrap: true, wordWrapWidth: 174 }}
                    />
                </Region>
            </Border>
            <FeaturedItemsWidgetEventCatcherRegion2 {...eventCatcherRegion} />
        </Region>
    );
};

/** Named region `featuredItemsWidget` of FeaturedItemsWidget - configured through the parent's `featuredItemsWidget` prop. */
export interface FeaturedItemsWidgetProps {
    firstitem?: FeaturedItemsWidgetFirstitemProps;
    itemlistFeatured?: FeaturedItemsWidgetItemlistFeaturedProps;
    layout?: BoxLayout;
}

export const FeaturedItemsWidget = ({ firstitem, itemlistFeatured, layout }: FeaturedItemsWidgetProps) => {
    return (
        <Region
            name="featuredItemsWidget"
            tags={[ 'EMBEDDED' ]}
            params={16400}
            layout={{ position: 'absolute', ...layout }}
        >
            <FeaturedItemsWidgetItemlistFeatured {...itemlistFeatured} />
            <FeaturedItemsWidgetFirstitem {...firstitem} />
        </Region>
    );
};
