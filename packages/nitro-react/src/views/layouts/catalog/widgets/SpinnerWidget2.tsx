import { BoxLayout, Region } from '#base/theme';
import { SpinnerWidgetLayout, SpinnerWidgetLayoutProps } from '#base/views/layouts/catalog/SpinnerWidgetLayout';

/**
 * Catalog widget `spinnerWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutDefault_1725Layout); each passes its own placement through `layout`.
 */
export type SpinnerWidget2Props = Omit<SpinnerWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const SpinnerWidget2 = ({ layout, ...widget }: SpinnerWidget2Props) => {
    return (
        <Region
            name="spinnerWidget"
            params={147456}
            layout={{ position: 'absolute', ...layout }}
        >
            <SpinnerWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
