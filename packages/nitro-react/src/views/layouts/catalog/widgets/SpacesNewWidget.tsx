import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ButtonGroupCenter, ButtonGroupLeft, ButtonGroupRight, Region, ScrollArea } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `spacesNewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutSpacesNew_1657Layout); each passes its own placement through `layout`.
 */
/** Named region `spacesNewWidget` of SpacesNewWidget - configured through the parent's `spacesNewWidget` prop. */
export interface SpacesNewWidgetProps extends CatalogWidgetFlags {
    itemsItemGrid?: ReactNode;
    layout?: BoxLayout;
    onGroupFloors?: () => void;
    onGroupViews?: () => void;
    onGroupWalls?: () => void;
}

export const SpacesNewWidget = ({ itemsItemGrid, layout, onGroupFloors, onGroupViews, onGroupWalls }: SpacesNewWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="spacesNewWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <Region
                name="groups"
                layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 22 }}
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
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, width: 170, top: 28, height: 239 }}
            >
                <Region
                    name="itemGrid"
                    layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                >
                    {itemsItemGrid}
                </Region>
            </ScrollArea>
        </Region>
    );
};
