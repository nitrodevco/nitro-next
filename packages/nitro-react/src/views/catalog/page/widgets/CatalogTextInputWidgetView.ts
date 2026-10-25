import { useState } from 'react';

import { CatalogWidgetEventEnum } from '#base/context/catalog';

import { CatalogWidgetProps } from '../CatalogPageRegistry';
import { useCatalogWidgetView } from '../catalogWidgetView';

/**
 * The page's free text, Flash's `TextInputCatalogWidget` - it attaches no view (its
 * `textInputWidget` asset is never built) and binds the container's own `input_text`, the only one
 * in a shipped layout being `layout_trophies`'. Every key the field takes (`WKE_KEY_UP`) tells the
 * page the text as it stands (`TextInputEvent`); the trophy widget turns that into the purchase's
 * extra parameter.
 *
 * `CatalogPage.selectOffer` also focuses and activates `input_text` on a page with a
 * `trophyWidget` - every layout with this widget has one. The page selects its offer once its
 * widgets are up (`CatalogViewer.showCatalogPage`), so the field takes the focus as the widget
 * mounts and is the user's once it loses it. A `selectOffer` on the page already on show (the
 * server sending it again) does not focus it again.
 */
export const CatalogTextInputWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ text, setText ] = useState('');
    // `selectOffer`'s `input_text.focus()`: held until the field loses it.
    const [ focused, setFocused ] = useState<boolean | undefined>(true);

    const onChange = (value: string) => {
        setText(value);

        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.TEXT_INPUT, text: value });
    };

    useCatalogWidgetView({ bindings: { input_text: { caption: text, onChange, focused, onBlur: () => setFocused(undefined) } } });

    return null;
};
