import { useTranslation } from '#base/context';
import { BoxLayout, ButtonGroupCenter, ButtonGroupLeft, ButtonGroupRight, Region, ScrollArea } from '#base/theme';

/**
 * Catalog widget `spacesNewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutSpacesNew_1657Layout); each passes its own placement through `layout`.
 */
/** Named region `groups` of SpacesNewWidget2 - configured through the parent's `groups` prop. */
export interface SpacesNewWidget2GroupsProps {
    layout?: BoxLayout;
    onGroupFloors?: () => void;
    onGroupViews?: () => void;
    onGroupWalls?: () => void;
    tags?: string[];
}

export const SpacesNewWidget2Groups = ({ layout, onGroupFloors, onGroupViews, onGroupWalls, tags }: SpacesNewWidget2GroupsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="groups"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 22, ...layout }}
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

/** Named region `itemGrid` of SpacesNewWidget2 - configured through the parent's `itemGrid` prop. */
export interface SpacesNewWidget2ItemGridProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const SpacesNewWidget2ItemGrid = ({ layout, tags }: SpacesNewWidget2ItemGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 170, top: 28, height: 239, ...layout }}
        >
            <Region
                name="itemGrid"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `spacesNewWidget` of SpacesNewWidget2 - configured through the parent's `spacesNewWidget` prop. */
export interface SpacesNewWidget2Props {
    groups?: SpacesNewWidget2GroupsProps;
    itemGrid?: SpacesNewWidget2ItemGridProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const SpacesNewWidget2 = ({ groups, itemGrid, layout, tags }: SpacesNewWidget2Props) => {
    return (
        <Region
            name="spacesNewWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <SpacesNewWidget2Groups {...groups} />
            <SpacesNewWidget2ItemGrid {...itemGrid} />
        </Region>
    );
};
