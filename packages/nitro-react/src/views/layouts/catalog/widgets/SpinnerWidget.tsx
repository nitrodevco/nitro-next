import { BoxLayout, Region } from '#base/theme';
import { SpinnerWidgetLayout, SpinnerWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/SpinnerWidgetLayout';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `spinnerWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutDefault_1725Layout); each passes its own placement through `layout`.
 */
export type SpinnerWidgetProps = Omit<SpinnerWidgetLayoutProps, 'layout'> & CatalogWidgetFlags & { layout?: BoxLayout };

export const SpinnerWidget = ({ layout, ...widget }: SpinnerWidgetProps) => {
    return (
        <Region
            name="spinnerWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <SpinnerWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
