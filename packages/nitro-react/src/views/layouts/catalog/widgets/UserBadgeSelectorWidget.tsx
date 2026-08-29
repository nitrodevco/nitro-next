import { BoxLayout, Region, ScrollArea } from '#base/theme';

/**
 * Catalog widget `userBadgeSelectorWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutBadgeDisplay_1641Layout); each passes its own placement through `layout`.
 */
/** Named region `badgeGrid` of UserBadgeSelectorWidget - configured through the parent's `badgeGrid` prop. */
export interface UserBadgeSelectorWidgetBadgeGridProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const UserBadgeSelectorWidgetBadgeGrid = ({ layout, tags }: UserBadgeSelectorWidgetBadgeGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 195, ...layout }}
        >
            <Region
                name="badgeGrid"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `userBadgeSelectorWidget` of UserBadgeSelectorWidget - configured through the parent's `userBadgeSelectorWidget` prop. */
export interface UserBadgeSelectorWidgetProps {
    badgeGrid?: UserBadgeSelectorWidgetBadgeGridProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const UserBadgeSelectorWidget = ({ badgeGrid, layout, tags }: UserBadgeSelectorWidgetProps) => {
    return (
        <Region
            name="userBadgeSelectorWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <UserBadgeSelectorWidgetBadgeGrid {...badgeGrid} />
        </Region>
    );
};
