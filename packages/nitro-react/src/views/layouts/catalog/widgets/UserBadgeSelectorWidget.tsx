import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags, layoutImage } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `userBadgeSelectorWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutBadgeDisplay_1669Layout); each passes its own placement through `layout`.
 */
/** Named region `userBadgeSelectorWidget` of UserBadgeSelectorWidget - configured through the parent's `userBadgeSelectorWidget` prop. */
export interface UserBadgeSelectorWidgetProps extends CatalogWidgetFlags {
    captionSearchPlaceholder?: string;
    itemsBadgeGrid?: ReactNode;
    layout?: BoxLayout;
    onCancelSearchBtn?: () => void;
    visibleCancelSearchBtn?: boolean;
}

export const UserBadgeSelectorWidget = ({ captionSearchPlaceholder, itemsBadgeGrid, layout, onCancelSearchBtn, visibleCancelSearchBtn }: UserBadgeSelectorWidgetProps) => {
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
                {(visibleCancelSearchBtn ?? false) && (
                    <Region
                        name="cancel_search_btn"
                        onPointerTap={onCancelSearchBtn}
                        cursor="pointer"
                        layout={{ position: 'absolute', right: 4, width: 19, top: 3, height: 19 }}
                    >
                        <ThemeImage
                            src={layoutImage('icons_close.png')}
                            layout={{ position: 'absolute', left: 5, width: 11, top: 4, height: 12 }}
                        />
                    </Region>
                )}
            </Border>
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, right: 0, top: 30, bottom: 0 }}
            >
                <Region
                    name="badgeGrid"
                    layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
                >
                    {itemsBadgeGrid}
                </Region>
            </ScrollArea>
        </Region>
    );
};
