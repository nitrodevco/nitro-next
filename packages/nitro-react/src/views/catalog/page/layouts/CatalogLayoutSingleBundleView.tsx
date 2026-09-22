import { CatalogWidgetEnum, getCatalogPageImage, getCatalogPageText } from '#base/context/catalog';
import { useConfigValue, useTranslation } from '#base/context/system';
import { Border, Region, ThemeImage, ThemeText } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';
import { CatalogWidgetSlot } from '../CatalogWidgetSlot';

/**
 * The `single_bundle` page, `layout_single_bundle.xml` (`ctlg_single_bundle`, 360x460): one bundle
 * offer shown whole. The page's texts fill the `ctlg_description` blurb at the top, the
 * `ctlg_special_txt` over the bundle grid and the bold `ctlg_text_1` in the grey footer border,
 * and its images the `ctlg_teaserimg_1` picture on the left (the room teaser movie still until
 * the page names one) and the footer's `ctlg_special_img` - all through `PageLocalization`, as
 * `LocalizationCatalogWidget` fills them; the three texts are html fields, cut at their boxes, and
 * one the page sends nothing for keeps its layout caption, `${lorem.html}`.
 *
 * The widgets, in the layout's order: the embedded `bundleGridScrollWidget` (a style 6 border,
 * anchored to the bottom so it grows with the window), which selects the page's offer, the
 * `addOnBadgeViewWidget`, the `simplePriceWidget` (its `fake_productimage` places the price) and
 * the `purchaseWidget` at the bottom.
 */
export const CatalogLayoutSingleBundleView = ({ page }: CatalogLayoutProps) => {
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const teaserImage = getCatalogPageImage(page, 'ctlg_teaserimg_1');
    const specialImage = getCatalogPageImage(page, 'ctlg_special_img');
    const t = useTranslation();

    return (
        <Region
            name="ctlg_single_bundle"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        >
            <ThemeText
                name="ctlg_description"
                text={getCatalogPageText(page, 'ctlg_description') ?? t('lorem.html')}
                textStyle="u_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 325 }}
                markup
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 15, width: 329, top: 13, height: 62 }}
            />
            <ThemeText
                name="ctlg_special_txt"
                text={getCatalogPageText(page, 'ctlg_special_txt') ?? t('lorem.html')}
                textStyle="u_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 169 }}
                markup
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 159, width: 173, top: 92, height: 25 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.BUNDLE_GRID_SCROLL}
                tags={[ 'EMBEDDED' ]}
                layout={{ position: 'absolute', left: 164, width: 186, top: 117, bottom: 96 }}
            />
            <ThemeImage
                name="ctlg_teaserimg_1"
                src={teaserImage ? catalogImageUrl.replace('%name%', teaserImage) : `${imageLibraryUrl}catalogue/small_movie_roomteaser.gif`}
                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                layout={{ position: 'absolute', left: 6, width: 157, top: 119, height: 238 }}
            />
            <Border
                variant="3"
                tintColor="#e0e0e0"
                layout={{ position: 'absolute', left: 17, width: 324, bottom: 35, height: 40 }}
            >
                {specialImage && (
                    <ThemeImage
                        name="ctlg_special_img"
                        src={catalogImageUrl.replace('%name%', specialImage)}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 10, width: 32, top: 5, height: 30 }}
                    />
                )}
                <ThemeText
                    name="ctlg_text_1"
                    text={getCatalogPageText(page, 'ctlg_text_1') ?? t('lorem.html')}
                    textStyle="u_regular"
                    flashFormat={{ bold: true }}
                    markup
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 51, width: 256, top: 10, height: 22 }}
                />
            </Border>
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.ADDON_BADGE_VIEW}
                layout={{ position: 'absolute', left: 12, width: 40, top: 125, height: 40 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.SIMPLE_PRICE}
                layout={{ position: 'absolute', left: 74, width: 83, top: 125, height: 30 }}
            />
            <CatalogWidgetSlot
                page={page}
                name={CatalogWidgetEnum.PURCHASE}
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 30 }}
            />
        </Region>
    );
};
