import { CatalogWidgetEnum, getCatalogPageText } from '#base/context/catalog';
import { useTranslation } from '#base/context/system';
import { Border, Region, ThemeText } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The front page, `layout_frontpage_featured.xml` (`ctlg_frontpage5`, 552x460) - what the
 * `frontpage4` code builds (`CatalogPage.createWindow`), 552 wide, so the catalogue hides its search
 * and navigation for it (`CatalogView`). The embedded featured items fill the page, and the blue
 * style 2 border at the bottom right holds the voucher box: its title `ctlg_txt2` (the second text of
 * a `frontpage4` page, `PageLocalization`) over the `redeemItemCodeWidget`.
 *
 * `layout_frontpage4.xml`, the older front page with a teaser picture and an html text, is never
 * built - `createWindow` swaps the code before it looks the asset up - so the `frontpage4` code's
 * first text (`ctlg_txt1`) and second image (`ctlg_teaserimg_1`) have nowhere to go, as in Flash.
 */
export const CatalogLayoutFrontpageFeaturedView = ({ page }: CatalogLayoutProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_frontpage5"
            layout={{ position: 'absolute', left: 0, width: 552, top: 0, height: 460 }}
        >
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.FEATURED_ITEMS}
                tags={[ 'EMBEDDED' ]}
                layout={{ position: 'absolute', left: 0, width: 552, top: 0, height: 460 }}
            />
            <Border
                variant="2"
                name="bgBorder"
                tintColor="#51bbee"
                layout={{ position: 'absolute', left: 200, width: 345, bottom: 0, height: 61 }}
            >
                <ThemeText
                    name="ctlg_txt2"
                    text={getCatalogPageText(page, 'ctlg_txt2') ?? t('lorem.title')}
                    textStyle="u_regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 268 }}
                    markup
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, width: 272, top: 6 }}
                />
                <CatalogWidgetSlot
                    page={page}
                    name={CatalogWidgetEnum.REDEEM_ITEM_CODE}
                    layout={{ position: 'absolute', left: 0, width: 345, top: 20, height: 34 }}
                />
            </Border>
        </Region>
    );
};
