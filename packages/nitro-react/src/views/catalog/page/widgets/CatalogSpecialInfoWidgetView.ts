import { useState } from 'react';

import { CatalogWidgetEventEnum, getCatalogPageImage, getCatalogPageText } from '#base/context/catalog';
import { useConfigValue } from '#base/context/system';
import { useCatalogWidgetEvent } from '#base/hooks';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { useCatalogWidgetView } from '../catalogWidgetView';

/**
 * The page's special offer blurb, `specialInfoWidget.xml` - Flash's `SpecialInfoWidget`: the
 * page's `ctlg_special_img` and over it the `ctlg_special_txt`, both filled by the page's localization
 * (`LocalizationCatalogWidget`, which runs after the widget's `init` blanked the text). The
 * whole widget hides for good the first time an offer is selected (`onPreviewProduct`).
 */
export const CatalogSpecialInfoWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ visible, setVisible ] = useState(true);
    const catalogImageUrl = useConfigValue<string>('asset.urls.catalog') ?? '';

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.SELECT_PRODUCT, () => setVisible(false));

    const image = getCatalogPageImage(page, 'ctlg_special_img');

    // `init()` blanks the text, which `LocalizationCatalogWidget` then fills.
    useCatalogWidgetView({
        template: 'specialInfoWidget',
        bindings: {
            '': { visible },
            ctlg_special_img: { asset: image ? catalogImageUrl.replace('%name%', image) : '' },
            ctlg_special_txt: { caption: getCatalogPageText(page, 'ctlg_special_txt') ?? '' },
        },
    });

    return null;
};
