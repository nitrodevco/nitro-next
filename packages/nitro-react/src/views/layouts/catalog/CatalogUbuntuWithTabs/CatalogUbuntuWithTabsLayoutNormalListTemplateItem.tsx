import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `normal_list_template` of CatalogUbuntuWithTabsLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuWithTabsLayoutNormalListTemplateItemProps {
    itemsNormalListTemplate?: ReactNode;
    layout?: BoxLayout;
}

export const CatalogUbuntuWithTabsLayoutNormalListTemplateItem = ({ itemsNormalListTemplate, layout }: CatalogUbuntuWithTabsLayoutNormalListTemplateItemProps) => {
    return (
        <Region
            name="normal_list_template"
            layout={{ width: 178, height: 19, flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsNormalListTemplate}
        </Region>
    );
};
