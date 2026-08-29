import { BoxLayout, Region, ScrollArea } from '#base/theme';

/**
 * Catalog widget `userBadgeSelectorWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutBadgeDisplay_1641Layout); each passes its own placement through `layout`.
 */
/** Named region `badgeGrid` of UserBadgeSelectorWidget2 - configured through the parent's `badgeGrid` prop. */
export interface UserBadgeSelectorWidget2BadgeGridProps {
    layout?: BoxLayout;
}

export const UserBadgeSelectorWidget2BadgeGrid = ({ layout }: UserBadgeSelectorWidget2BadgeGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 195, ...layout }}
        >
            <Region
                name="badgeGrid"
                params={16}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `userBadgeSelectorWidget` of UserBadgeSelectorWidget2 - configured through the parent's `userBadgeSelectorWidget` prop. */
export interface UserBadgeSelectorWidget2Props {
    badgeGrid?: UserBadgeSelectorWidget2BadgeGridProps;
    layout?: BoxLayout;
}

export const UserBadgeSelectorWidget2 = ({ badgeGrid, layout }: UserBadgeSelectorWidget2Props) => {
    return (
        <Region
            name="userBadgeSelectorWidget"
            params={16}
            layout={{ position: 'absolute', ...layout }}
        >
            <UserBadgeSelectorWidget2BadgeGrid {...badgeGrid} />
        </Region>
    );
};
