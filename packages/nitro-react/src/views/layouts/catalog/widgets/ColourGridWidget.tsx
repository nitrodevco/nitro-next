import { BoxLayout, Region } from '#base/theme';
import { ColourGridWidgetLayout, ColourGridWidgetLayoutProps } from '#base/views/layouts/catalog/ColourGridWidgetLayout';

/**
 * Catalog widget `colourGridWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 4 pages
 * (LayoutTrophies_1610Layout, LayoutTrophies_1695Layout, NewPetsWidget, PetsWidget); each passes its own placement through `layout`.
 */
export type ColourGridWidgetProps = Omit<ColourGridWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const ColourGridWidget = ({ layout, ...widget }: ColourGridWidgetProps) => {
    return (
        <Region
            name="colourGridWidget"
            params={16}
            layout={{ position: 'absolute', ...layout }}
        >
            <ColourGridWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
