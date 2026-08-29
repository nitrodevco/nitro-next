import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonGroupCenter, ButtonGroupLeft, ButtonGroupRight, Region, ScrollArea } from '#base/theme';

/**
 * Catalog widget `spacesNewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutSpacesNew_1576Layout); each passes its own placement through `layout`.
 */
/** Named region `groups` of SpacesNewWidget - configured through the parent's `groups` prop. */
export interface SpacesNewWidgetGroupsProps {
    layout?: BoxLayout;
    onGroupFloors?: () => void;
    onGroupViews?: () => void;
    onGroupWalls?: () => void;
    tags?: string[];
}

export const SpacesNewWidgetGroups = ({ layout, onGroupFloors, onGroupViews, onGroupWalls, tags }: SpacesNewWidgetGroupsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="groups"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 22, ...layout }}
        >
            <ButtonGroupLeft
                variant="100"
                name="group.walls"
                onPointerTap={onGroupWalls}
                layout={{ position: 'absolute', left: 0, width: 147, top: 0, height: 21, minWidth: 50 }}
            >
                {t('catalog.spaces.tab.walls')}
            </ButtonGroupLeft>
            <ButtonGroupCenter
                variant="100"
                name="group.floors"
                onPointerTap={onGroupFloors}
                layout={{ position: 'absolute', left: 50, width: 152, top: 0, height: 21, minWidth: 50 }}
            >
                {t('catalog.spaces.tab.floors')}
            </ButtonGroupCenter>
            <ButtonGroupRight
                variant="100"
                name="group.views"
                onPointerTap={onGroupViews}
                layout={{ position: 'absolute', left: 100, width: 150, top: 0, height: 21, minWidth: 50 }}
            >
                {t('catalog.spaces.tab.views')}
            </ButtonGroupRight>
        </Region>
    );
};

/** Named region `itemGrid` of SpacesNewWidget - configured through the parent's `itemGrid` prop. */
export interface SpacesNewWidgetItemGridProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const SpacesNewWidgetItemGrid = ({ layout, tags }: SpacesNewWidgetItemGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 2, width: 356, top: 27, bottom: 2, ...layout }}
        >
            <Region
                name="itemGrid"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `spacesNewWidget` of SpacesNewWidget - configured through the parent's `spacesNewWidget` prop. */
export interface SpacesNewWidgetProps {
    groups?: SpacesNewWidgetGroupsProps;
    itemGrid?: SpacesNewWidgetItemGridProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const SpacesNewWidget = ({ groups, itemGrid, layout, tags }: SpacesNewWidgetProps) => {
    return (
        <Region
            name="spacesNewWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <SpacesNewWidgetGroups {...groups} />
            <Border
                variant="6"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, width: 360, top: 25, bottom: 0 }}
            />
            <SpacesNewWidgetItemGrid {...itemGrid} />
        </Region>
    );
};
