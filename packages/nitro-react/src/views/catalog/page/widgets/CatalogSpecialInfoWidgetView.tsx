import { useState } from 'react';

import { CatalogWidgetEventEnum, getCatalogPageImage, getCatalogPageText } from '#base/context/catalog';
import { useConfigValue } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';
import { Region, ThemeImage, ThemeText } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';

/**
 * The page's special offer blurb, `specialInfoWidget.xml` - Flash's `SpecialInfoWidget`: the
 * page's `ctlg_special_img` (bottom centre, unscaled) and over it the `ctlg_special_txt` (11px
 * italic `u_regular` in `#333333`, wrapped and centred), both filled by the page's localization
 * (`LocalizationCatalogWidget`, which runs after the widget's `init` blanked the text). The
 * whole widget hides for good the first time an offer is selected (`onPreviewProduct`).
 */
export const CatalogSpecialInfoWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ visible, setVisible ] = useState(true);
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, () => setVisible(false));

    if (!visible) return null;

    const image = getCatalogPageImage(page, 'ctlg_special_img');

    return (
        <Region
            name="specialInfoWidget"
            layout={{ position: 'absolute', left: 0, width: 142, top: 0, height: 73 }}
        >
            {image && (
                <ThemeImage
                    name="ctlg_special_img"
                    src={catalogImageUrl.replace('%name%', image)}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'bottom center' }}
                    layout={{ position: 'absolute', left: 0, width: 142, top: 0, height: 73 }}
                />
            )}
            <Region layout={{ position: 'absolute', left: 2, width: 139, top: 28, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                <ThemeText
                    name="ctlg_special_txt"
                    text={getCatalogPageText(page, 'ctlg_special_txt') ?? ''}
                    textStyle="u_regular"
                    textOptions={{ fill: '#333333', fontSize: 11, wordWrap: true, wordWrapWidth: 135, align: 'center' }}
                    flashFormat={{ italic: true }}
                    verticalAlign="top"
                />
            </Region>
        </Region>
    );
};
