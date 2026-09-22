import { CatalogWidgetEnum, getCatalogPageText } from '#base/context/catalog';
import { Region, ThemeText } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The Builders Club front page, `layout_builders_club_frontpage.xml`
 * (`ctlg_builders_club_frontpage`, 360x508, the Builders Club catalogue's taller page): the
 * page's text in the html `ctlg_description` (`PageLocalization`'s `builders_club_frontpage` list
 * sends it there, and nothing to the header), and the join / try buttons of the
 * `builderSubscriptionWidget` anchored to the bottom.
 */
export const CatalogLayoutBuildersClubFrontpageView = ({ page }: CatalogLayoutProps) => (
    <Region
        name="ctlg_builders_club_frontpage"
        layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
    >
        <ThemeText
            name="ctlg_description"
            text={getCatalogPageText(page, 'ctlg_description') ?? 'Formatted text'}
            textStyle="u_regular"
            textOptions={{ wordWrap: true, wordWrapWidth: 326 }}
            markup
            clip
            verticalAlign="top"
            layout={{ position: 'absolute', left: 15, width: 330, top: 10, height: 380 }}
        />
        <CatalogWidgetSlot
            page={page}
            name={CatalogWidgetEnum.BUILDER_SUBSCRIPTION}
            layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 100 }}
        />
    </Region>
);
