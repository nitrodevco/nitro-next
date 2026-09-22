import { getCatalogPageText } from '#base/context/catalog';
import { useConfigValue, useTranslation } from '#base/context/system';
import { Border, ImageProps, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { CatalogLayoutProps } from '../CatalogPageRegistry';

/** The Flash bitmap vars a `ThemeImage` takes. */
type BitmapVars = NonNullable<ImageProps['bitmap']>;

/** One rule row of the list: its text element, its picture and that picture's bitmap vars and height. */
interface RentablesRule {
    text: string;
    picture: string;
    bitmap: BitmapVars;
    pictureHeight: number;
}

/** The centred, unstretched picture every rule but the second has (that one carries no bitmap vars). */
const CENTRED: BitmapVars = { stretchedX: false, stretchedY: false, pivot: 'center' };

/** The layout's five rows, in order. */
const RULES: readonly RentablesRule[] = [
    { text: 'ctlg_text_1', picture: 'rentables_rulepic1', bitmap: CENTRED, pictureHeight: 40 },
    { text: 'ctlg_text_2', picture: 'rentables_rulepic2', bitmap: {}, pictureHeight: 40 },
    { text: 'ctlg_text_3', picture: 'rentables_rulepic3', bitmap: CENTRED, pictureHeight: 40 },
    { text: 'ctlg_text_4', picture: 'rentables_rulepic4', bitmap: CENTRED, pictureHeight: 46 },
    { text: 'ctlg_text_5', picture: 'rentables_rulepic5', bitmap: CENTRED, pictureHeight: 40 },
];

/**
 * The `info_rentables` page, `layout_info_rentables.xml` (`ctlg_info_rentables`, 360x460): in a
 * light grey style 2 border, a list of five rules - the duckets icon mirrored (`zoom_x` -1), the
 * rule's text and its picture. `PageLocalization`'s `info_rentables` list sends the page's first
 * text to the header and the next five to `ctlg_text_1` .. `ctlg_text_5`. No widgets.
 *
 * The pictures are tagged `S`, not `STATIC_IMAGE`, so `LocalizationCatalogWidget.initStaticImages`
 * never finds them and they keep their `asset_uri`.
 */
export const CatalogLayoutInfoRentablesView = ({ page }: CatalogLayoutProps) => {
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const t = useTranslation();

    return (
        <Region
            name="ctlg_info_rentables"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
        >
            <Border
                variant="2"
                tintColor="#d8d8d8"
                layout={{ position: 'absolute', left: 17, width: 328, top: 20, bottom: 15 }}
            >
                <Region layout={{ position: 'absolute', left: 10, width: 309, top: 9, bottom: 9, flexDirection: 'column', gap: 3 }}>
                    {RULES.map(rule => (
                        <Region
                            key={rule.text}
                            layout={{ height: 47, width: 306, flexShrink: 0 }}
                        >
                            <ThemeImage
                                src={LayoutImage('shared/toolbar_duckat_icon_0.png')}
                                bitmap={{ zoomX: -1 }}
                                layout={{ position: 'absolute', left: 1, width: 23, top: 3, height: 22 }}
                            />
                            <ThemeText
                                name={rule.text}
                                text={getCatalogPageText(page, rule.text) ?? t('lorem.html')}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 228 }}
                                markup
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 31, width: 232, top: 3 }}
                            />
                            <ThemeImage
                                name={rule.picture}
                                src={`${imageLibraryUrl}catalogue/${rule.picture}.gif`}
                                bitmap={rule.bitmap}
                                layout={{ position: 'absolute', left: 266, width: 40, top: 1, height: rule.pictureHeight }}
                            />
                        </Region>
                    ))}
                </Region>
            </Border>
        </Region>
    );
};
