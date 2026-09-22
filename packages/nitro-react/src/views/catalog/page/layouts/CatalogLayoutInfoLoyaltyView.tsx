import { getCatalogPageText } from '#base/context/catalog';
import { useTranslation } from '#base/context/system';
import { useCatalogPageImage } from '#base/hooks';
import { Region, ThemeImage, ThemeText } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';

/**
 * The `info_loyalty` page, `layout_info_loyalty.xml` (`ctlg_info_loyalty`, 360x460): the page's
 * one text in the html `ctlg_description` (`PageLocalization`'s `info_loyalty` list sends it there,
 * and nothing to the header) beside the loyalty (diamonds) illustration. No widgets.
 *
 * The illustration is tagged `S`, not `STATIC_IMAGE`, so `LocalizationCatalogWidget.initStaticImages`
 * never finds it and it keeps its `asset_uri`. The html's `link_target` and link style only matter
 * to an `<a>` in the text, whose click Flash only logs (`onClickHtmlLink`).
 */
export const CatalogLayoutInfoLoyaltyView = ({ page }: CatalogLayoutProps) => {
    const illustrationUrl = useCatalogPageImage(page, undefined, 'catalogue/diamond_info_illustration.gif');
    const t = useTranslation();

    return (
        <Region
            name="ctlg_info_loyalty"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        >
            <ThemeText
                name="ctlg_description"
                text={getCatalogPageText(page, 'ctlg_description') ?? t('loremipsum.html')}
                textStyle="u_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 222 }}
                markup
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 24, width: 226, top: 19, height: 322 }}
            />
            <ThemeImage
                name="loyalty_info_illustration"
                src={illustrationUrl}
                bitmap={{ stretchedX: false, stretchedY: false }}
                layout={{ position: 'absolute', left: 237, width: 123, top: 39, height: 350 }}
            />
        </Region>
    );
};
