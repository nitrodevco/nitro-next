import { useState } from 'react';

import { BoxLayout, Region, TextInput } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `textInputWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutTrophies_1610Layout); each passes its own placement through `layout`.
 */
/** Named region `textInputWidget` of TextInputWidget3 - configured through the parent's `textInputWidget` prop. */
export interface TextInputWidget3Props extends CatalogWidgetFlags {
    layout?: BoxLayout;
}

export const TextInputWidget3 = ({ layout }: TextInputWidget3Props) => {
    const [ inputTextValue, setInputTextValue ] = useState('');

    return (
        <Region
            name="textInputWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <TextInput
                value={inputTextValue}
                onChange={setInputTextValue}
                maxLength={300}
                multiline
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
        </Region>
    );
};
