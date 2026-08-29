import { BoxLayout, Region } from '#base/theme';
import { ClubGiftWidgetLayout, ClubGiftWidgetLayoutProps } from '#base/views/layouts/catalog/widgets/ClubGiftWidgetLayout';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `clubGiftWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutClubGifts_1538Layout); each passes its own placement through `layout`.
 */
export type ClubGiftWidget2Props = Omit<ClubGiftWidgetLayoutProps, 'layout'> & CatalogWidgetFlags & { layout?: BoxLayout };

export const ClubGiftWidget2 = ({ layout, ...widget }: ClubGiftWidget2Props) => {
    return (
        <Region
            name="clubGiftWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ClubGiftWidgetLayout
                {...widget}
                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
            />
        </Region>
    );
};
