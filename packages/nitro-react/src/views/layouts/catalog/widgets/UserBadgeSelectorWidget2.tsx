import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags, layoutImage } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `userBadgeSelectorWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutBadgeDisplay_1669Layout); each passes its own placement through `layout`.
 */
/** Named region `cancel_search_btn` of UserBadgeSelectorWidget2 - configured through the parent's `cancelSearchBtn` prop. */
export interface UserBadgeSelectorWidget2CancelSearchBtnProps {
    layout?: BoxLayout;
    onCancelSearchBtn?: () => void;
    visibleCancelSearchBtn?: boolean;
}

export const UserBadgeSelectorWidget2CancelSearchBtn = ({ layout, onCancelSearchBtn, visibleCancelSearchBtn }: UserBadgeSelectorWidget2CancelSearchBtnProps) => {
    return (
        <Region
            name="cancel_search_btn"
            visible={visibleCancelSearchBtn ?? false}
            onPointerTap={onCancelSearchBtn}
            cursor="pointer"
            layout={{ position: 'absolute', right: 4, width: 19, top: 3, height: 19, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_close.png')}
                layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 12 }}
            />
        </Region>
    );
};

/** Named region `badgeGrid` of UserBadgeSelectorWidget2 - configured through the parent's `badgeGrid` prop. */
export interface UserBadgeSelectorWidget2BadgeGridProps {
    layout?: BoxLayout;
}

export const UserBadgeSelectorWidget2BadgeGrid = ({ layout }: UserBadgeSelectorWidget2BadgeGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 0, top: 30, bottom: 0, ...layout }}
        >
            <Region
                name="badgeGrid"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `userBadgeSelectorWidget` of UserBadgeSelectorWidget2 - configured through the parent's `userBadgeSelectorWidget` prop. */
export interface UserBadgeSelectorWidget2Props extends CatalogWidgetFlags {
    badgeGrid?: UserBadgeSelectorWidget2BadgeGridProps;
    cancelSearchBtn?: UserBadgeSelectorWidget2CancelSearchBtnProps;
    captionSearchPlaceholder?: string;
    layout?: BoxLayout;
}

export const UserBadgeSelectorWidget2 = ({ badgeGrid, cancelSearchBtn, captionSearchPlaceholder, layout }: UserBadgeSelectorWidget2Props) => {
    const t = useTranslation();
    const [ searchInputValue, setSearchInputValue ] = useState('');

    return (
        <Region
            name="userBadgeSelectorWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <Border
                variant="105"
                name="search_input_border"
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
                    layout={{ position: 'absolute', left: 6, width: 83, top: 3, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSearchPlaceholder ?? t('generic.search')}
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
                <UserBadgeSelectorWidget2CancelSearchBtn {...cancelSearchBtn} />
            </Border>
            <UserBadgeSelectorWidget2BadgeGrid {...badgeGrid} />
        </Region>
    );
};
