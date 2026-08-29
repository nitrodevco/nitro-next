import { BoxLayout, Region } from '#base/theme';
import { BuilderWidgetLayout, BuilderWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/BuilderWidgetLayout';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `builderWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutDefault_1595Layout); each passes its own placement through `layout`.
 */
export type BuilderWidgetProps = Omit<BuilderWidgetLayoutProps, 'layout'> & CatalogWidgetFlags & { layout?: BoxLayout };

export const BuilderWidget = ({ layout, ...widget }: BuilderWidgetProps) => {
    return (
        <Region
            name="builderWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <BuilderWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
