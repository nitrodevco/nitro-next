import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonGroupCenter, ButtonGroupLeft, ButtonGroupRight, Region, ScrollArea } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `spacesNewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutSpacesNew_1576Layout); each passes its own placement through `layout`.
 */
/** Named region `spacesNewWidget` of SpacesNewWidget2 - configured through the parent's `spacesNewWidget` prop. */
export interface SpacesNewWidget2Props extends CatalogWidgetFlags {
    layout?: BoxLayout;
    onGroupFloors?: () => void;
    onGroupViews?: () => void;
    onGroupWalls?: () => void;
}

export const SpacesNewWidget2 = ({ layout, onGroupFloors, onGroupViews, onGroupWalls }: SpacesNewWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="spacesNewWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <Region
                name="groups"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 22 }}
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
            <Border
                variant="6"
                blend={0.5}
                layout={{ position: 'absolute', left: 0, width: 360, top: 25, bottom: 0 }}
            />
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 2, width: 356, top: 27, bottom: 2 }}
            >
                <Region
                    name="itemGrid"
                    layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                />
            </ScrollArea>
        </Region>
    );
};
