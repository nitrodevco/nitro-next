import { getCatalogPageText } from '#base/context/catalog';
import { useTranslation } from '#base/context/system';
import { useCatalogPageImage } from '#base/hooks';
import { Region, ThemeImage, ThemeText } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';

/**
 * The `info_duckets` page, `layout_info_duckets.xml` (`ctlg_info_duckets`, 360x460): the page's
 * one text in the html `ctlg_description` (`PageLocalization`'s `info_duckets` list sends it there,
 * and nothing to the header) beside the duckets illustration. No widgets.
 *
 * The illustration is tagged `S`, not `STATIC_IMAGE`, so `LocalizationCatalogWidget.initStaticImages`
 * never finds it and it keeps its `asset_uri`. The html's `link_target` and link style only matter
 * to an `<a>` in the text, whose click Flash only logs (`onClickHtmlLink`).
 */
export const CatalogLayoutInfoDucketsView = ({ page }: CatalogLayoutProps) => {
    const illustrationUrl = useCatalogPageImage(page, undefined, 'catalogue/duckets_info_illustration.gif');
    const t = useTranslation();

    return (
        <Region
            name="ctlg_info_duckets"
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
                layout={{ position: 'absolute', left: 24, width: 226, top: 19, height: 420 }}
            />
            <ThemeImage
                name="duckets_info_illustration"
                src={illustrationUrl}
                bitmap={{ stretchedX: false, stretchedY: false }}
                layout={{ position: 'absolute', left: 236, width: 123, top: 10, height: 360 }}
            />
        </Region>
    );
};
