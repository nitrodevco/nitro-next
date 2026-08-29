import { BoxLayout, Region } from '#base/theme';
import { ColourGridWidgetLayout, ColourGridWidgetLayoutProps } from '#base/views/layouts/catalog/ColourGridWidgetLayout';

/**
 * Catalog widget `colourGridWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutDefault_1595Layout); each passes its own placement through `layout`.
 */
export type ColourGridWidget2Props = Omit<ColourGridWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const ColourGridWidget2 = ({ layout, ...widget }: ColourGridWidget2Props) => {
    return (
        <Region
            name="colourGridWidget"
            tags={[ 'E' ]}
            params={1040}
            layout={{ position: 'absolute', ...layout }}
        >
            <ColourGridWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
