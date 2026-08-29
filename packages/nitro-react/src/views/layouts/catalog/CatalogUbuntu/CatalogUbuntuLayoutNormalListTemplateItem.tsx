import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `normal_list_template` of CatalogUbuntuLayout - pass real rows through its `items…` slot. */
export interface CatalogUbuntuLayoutNormalListTemplateItemProps {
    itemsNormalListTemplate?: ReactNode;
    layout?: BoxLayout;
}

export const CatalogUbuntuLayoutNormalListTemplateItem = ({ itemsNormalListTemplate, layout }: CatalogUbuntuLayoutNormalListTemplateItemProps) => {
    return (
        <Region
            name="normal_list_template"
            layout={{ width: 178, height: 19, flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsNormalListTemplate}
        </Region>
    );
};
