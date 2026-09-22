import { getCatalogPageText } from '#base/context/catalog';
import { useTranslation } from '#base/context/system';
import { useCatalogPageImage } from '#base/hooks';
import { Border, Region, ThemeImage, ThemeText } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';

/**
 * The `recycler_info` page, `layout_recycler_info.xml` (`ctlg_recycler_info`, 360x460): an orange
 * (`0xfbc362`) style 2 border 10px in from every edge, holding the page's teaser image
 * (`ctlg_teaserimg_1`, 57x57, centred and unstretched - the layout's own
 * `catalogue/ctlg_ecotron_box.gif` until the page names another), the white `u_headline_medium`
 * html `ctlg_description` beside it and the white html `ctlg_special_txt` under both, wrapped at
 * their widths. No widgets; `PageLocalization`'s default lists send the page's texts and images
 * to those elements.
 */
export const CatalogLayoutRecyclerInfoView = ({ page }: CatalogLayoutProps) => {
    const teaserUrl = useCatalogPageImage(page, 'ctlg_teaserimg_1', 'catalogue/ctlg_ecotron_box.gif');
    const t = useTranslation();

    return (
        <Region
            name="ctlg_recycler_info"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        >
            <Border
                variant="2"
                tintColor="#fbc362"
                layout={{ position: 'absolute', left: 10, width: 340, top: 10, bottom: 10 }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    src={teaserUrl}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 20, width: 57, top: 10, height: 57 }}
                />
                <ThemeText
                    name="ctlg_description"
                    text={getCatalogPageText(page, 'ctlg_description') ?? t('lorem.title')}
                    textStyle="u_headline_medium"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 238 }}
                    markup
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 83, width: 242, top: 26 }}
                />
                <ThemeText
                    name="ctlg_special_txt"
                    text={getCatalogPageText(page, 'ctlg_special_txt') ?? t('lorem.newline')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 303 }}
                    markup
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 15, width: 307, top: 72 }}
                />
            </Border>
        </Region>
    );
};
