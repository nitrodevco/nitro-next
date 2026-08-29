import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `userBadgeSelectorWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutBadgeDisplay_1669Layout); each passes its own placement through `layout`.
 */
/** Named region `cancel_search_btn` of UserBadgeSelectorWidget - configured through the parent's `cancelSearchBtn` prop. */
export interface UserBadgeSelectorWidgetCancelSearchBtnProps {
    layout?: BoxLayout;
    onCancelSearchBtn?: () => void;
    visibleCancelSearchBtn?: boolean;
}

export const UserBadgeSelectorWidgetCancelSearchBtn = ({ layout, onCancelSearchBtn, visibleCancelSearchBtn }: UserBadgeSelectorWidgetCancelSearchBtnProps) => {
    return (
        <Region
            name="cancel_search_btn"
            params={81}
            visible={visibleCancelSearchBtn ?? false}
            onPointerTap={onCancelSearchBtn}
            cursor="pointer"
            layout={{ position: 'absolute', right: 4, width: 19, top: 3, height: 19, ...layout }}
        >
            <ThemeImage
                params={16}
                src={layoutImage('icons_close.png')}
                layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 12 }}
            />
        </Region>
    );
};

/** Named region `badgeGrid` of UserBadgeSelectorWidget - configured through the parent's `badgeGrid` prop. */
export interface UserBadgeSelectorWidgetBadgeGridProps {
    layout?: BoxLayout;
}

export const UserBadgeSelectorWidgetBadgeGrid = ({ layout }: UserBadgeSelectorWidgetBadgeGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 0, top: 30, bottom: 0, ...layout }}
        >
            <Region
                name="badgeGrid"
                params={2192}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `userBadgeSelectorWidget` of UserBadgeSelectorWidget - configured through the parent's `userBadgeSelectorWidget` prop. */
export interface UserBadgeSelectorWidgetProps {
    badgeGrid?: UserBadgeSelectorWidgetBadgeGridProps;
    cancelSearchBtn?: UserBadgeSelectorWidgetCancelSearchBtnProps;
    captionSearchPlaceholder?: string;
    layout?: BoxLayout;
}

export const UserBadgeSelectorWidget = ({ badgeGrid, cancelSearchBtn, captionSearchPlaceholder, layout }: UserBadgeSelectorWidgetProps) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Region
            name="userBadgeSelectorWidget"
            params={2064}
            layout={{ position: 'absolute', ...layout }}
        >
            <Border
                variant="105"
                name="search_input_border"
                params={144}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 26 }}
            >
                <TextInput
                    value={searchInputValue}
                    onChange={setSearchInputValue}
                    maxLength={40}
                    layout={{ position: 'absolute', left: 6, right: 78, top: 3, height: 19, minWidth: 171, maxWidth: 171 }}
                />
                <Region
                    name="search_placeholder"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 83, top: 3, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSearchPlaceholder ?? t('generic.search')}
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
                <UserBadgeSelectorWidgetCancelSearchBtn {...cancelSearchBtn} />
            </Border>
            <UserBadgeSelectorWidgetBadgeGrid {...badgeGrid} />
        </Region>
    );
};
