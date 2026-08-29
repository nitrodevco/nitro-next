import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `userBadgeSelectorWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutBadgeDisplay_1641Layout); each passes its own placement through `layout`.
 */
/** Named region `userBadgeSelectorWidget` of UserBadgeSelectorWidget2 - configured through the parent's `userBadgeSelectorWidget` prop. */
export interface UserBadgeSelectorWidget2Props extends CatalogWidgetFlags {
    itemsBadgeGrid?: ReactNode;
    layout?: BoxLayout;
}

export const UserBadgeSelectorWidget2 = ({ itemsBadgeGrid, layout }: UserBadgeSelectorWidget2Props) => {
    return (
        <Region
            name="userBadgeSelectorWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 195 }}
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
