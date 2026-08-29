import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Row template `featured_item_template` of FeaturedItemsWidget - pass real rows through its `items…` slot. */
export interface FeaturedItemsWidgetFeaturedItemTemplateItemProps {
    captionItemTitle?: string;
    eventCatcherRegion?: ReactNode;
    layout?: BoxLayout;
    onEventCatcherRegion?: () => void;
    srcItemImage?: string;
    visibleEventCatcherRegion?: boolean;
    visibleItemImage?: boolean;
    visibleItemTitle?: boolean;
    visibleTextContainer?: boolean;
}

export const FeaturedItemsWidgetFeaturedItemTemplateItem = ({ captionItemTitle, eventCatcherRegion, layout, onEventCatcherRegion, srcItemImage, visibleEventCatcherRegion, visibleItemImage, visibleItemTitle, visibleTextContainer }: FeaturedItemsWidgetFeaturedItemTemplateItemProps) => {
    return (
        <Region
            name="featured_item_template"
            layout={{ width: 360, height: 126, flexShrink: 0, ...layout }}
        >
            {(visibleItemImage ?? true) && (
                <ThemeImage
                    name="item_image"
                    src={srcItemImage}
                    layout={{ position: 'absolute', left: 0, width: 356, top: 0, height: 126 }}
                />
            )}
            {(visibleTextContainer ?? true) && (
                <Border
                    variant="3"
                    name="text_container"
                    tintColor="#333333"
                    blend={0.5}
                    layout={{ position: 'absolute', left: 5, width: 346, top: 93, bottom: 3 }}
                >
                    {(visibleItemTitle ?? true) && (
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
                    )}
                </Border>
            )}
            {(visibleEventCatcherRegion ?? true) && (
                <Region
                    name="event_catcher_region"
                    onPointerTap={onEventCatcherRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {eventCatcherRegion}
                </Region>
            )}
        </Region>
    );
};
