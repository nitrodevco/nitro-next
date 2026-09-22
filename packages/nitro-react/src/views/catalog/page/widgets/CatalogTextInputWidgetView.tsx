import { useState } from 'react';

import { CATALOG_LAYOUT_WIDGETS, CatalogWidgetEnum, CatalogWidgetEventEnum, resolveCatalogLayout } from '#base/context/catalog';
import { useCatalogWidgetEvent } from '#base/hooks';
import { TextInput } from '#base/theme';

import { CatalogWidgetProps } from '../CatalogPageRegistry';

/** `layout_trophies`' `input_text` `max_chars`. */
const INPUT_MAX_CHARS = 300;

/**
 * The page's free text, Flash's `TextInputCatalogWidget` - drawn from the `EMBEDDED` container's
 * own child, the only one in a shipped layout being `layout_trophies`' `input_text` (an `input`
 * filling the 349x70 container: multiline, word-wrapped, bold, 300 characters at most, its
 * selection always shown). Every key the field takes (`WKE_KEY_UP`) tells the page the text as it
 * stands (`TextInputEvent`); the trophy widget turns that into the purchase's extra parameter.
 *
 * `CatalogPage.selectOffer` also focuses and activates `input_text` on a page that has a
 * `trophyWidget`; the page selects its offer right after `WIDGETS_INITIALIZED`, so the field takes
 * the focus then. The widget's own `textInputWidget.xml` is never attached (the class does not
 * call `attachWidgetView`) and is not drawn.
 */
export const CatalogTextInputWidgetView = ({ page }: CatalogWidgetProps) => {
    const [ text, setText ] = useState('');
    const [ focused, setFocused ] = useState(false);
    const layout = resolveCatalogLayout(page.layoutCode);
    const hasTrophyWidget = !!layout && CATALOG_LAYOUT_WIDGETS[layout].some(widget => widget === CatalogWidgetEnum.TROPHY);

    useCatalogWidgetEvent(page, CatalogWidgetEventEnum.WIDGETS_INITIALIZED, () => {
        if (hasTrophyWidget) setFocused(true);
    });

    const onChange = (value: string) => {
        setText(value);

        page.events.dispatchEvent({ type: CatalogWidgetEventEnum.TEXT_INPUT, text: value });
    };

    return (
        <TextInput
            value={text}
            onChange={onChange}
            focused={focused}
            onFocusChange={setFocused}
            maxLength={INPUT_MAX_CHARS}
            multiline
            textStyle="u_regular"
            flashFormat={{ bold: true }}
            flashPlacement
            alwaysShowSelection
            backgroundColor={null}
            focusedBackgroundColor={null}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        />
    );
};
