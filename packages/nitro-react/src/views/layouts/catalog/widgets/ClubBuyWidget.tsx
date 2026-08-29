import { BoxLayout, Region } from '#base/theme';
import { ClubBuyWidgetLayout, ClubBuyWidgetLayoutProps } from '#base/views/layouts/catalog/ClubBuyWidgetLayout';

/**
 * Catalog widget `clubBuyWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutClubBuy_1551Layout); each passes its own placement through `layout`.
 */
export type ClubBuyWidgetProps = Omit<ClubBuyWidgetLayoutProps, 'layout'> & { layout?: BoxLayout };

export const ClubBuyWidget = ({ layout, ...widget }: ClubBuyWidgetProps) => {
    return (
        <Region
            name="clubBuyWidget"
            params={16}
            layout={{ position: 'absolute', ...layout }}
        >
            <ClubBuyWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
