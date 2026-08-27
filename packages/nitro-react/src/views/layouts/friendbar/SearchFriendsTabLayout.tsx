import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `4_search_friends_tab_xml` (layout "search_friends_tab", 127x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SearchFriendsTabLayoutProps {
    itemsTabContent?: ReactNode;
    layout?: BoxLayout;
}

export const SearchFriendsTabLayout = ({ itemsTabContent, layout }: SearchFriendsTabLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 127, height: 36, ...layout }}>
            <Border
                variant="6"
                name="frame"
                params={1}
                tintColor="#74dbfa"
                layout={{ position: 'absolute', left: 0, width: 127, top: 0, height: 36 }}
            >
                <Region
                    name="tab_content"
                    params={8388752}
                    layout={{ position: 'absolute', left: 7, width: 116, top: 3, height: 31, minHeight: 30, flexDirection: 'column' }}
                >
                    {itemsTabContent ?? (
                        <SearchFriendsTabLayoutHeaderItem />
                    )}
                </Region>
            </Border>
        </Region>
    );
};

/** Row template `header` of SearchFriendsTabLayout - pass real rows through its `items…` slot. */
export interface SearchFriendsTabLayoutHeaderItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    srcIcon?: string;
}

export const SearchFriendsTabLayoutHeaderItem = ({ captionTitle, layout, onHeader, srcIcon }: SearchFriendsTabLayoutHeaderItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            params={145}
            onPointerTap={onHeader}
            cursor="pointer"
            layout={{ width: 112, height: 31, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="icon"
                params={1310720}
                src={srcIcon ?? layoutImage('search_friends_icon.png')}
                layout={{ position: 'absolute', left: 2, width: 29, top: -4, height: 33 }}
            />
            <Region
                name="title"
                tags={[ 'label' ]}
                params={3148816}
                layout={{ position: 'absolute', left: 33, width: 77, top: 0, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTitle ?? t('friend.bar.search.title')}
                    textStyle="text-style-headline-medium"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 77 }}
                />
            </Region>
        </Region>
    );
};
