import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `list_template` of CatalogVolterLayout - pass real rows through its `items…` slot. */
export interface CatalogVolterLayoutListTemplateItemProps {
    itemsListTemplate?: ReactNode;
    layout?: BoxLayout;
}

export const CatalogVolterLayoutListTemplateItem = ({ itemsListTemplate, layout }: CatalogVolterLayoutListTemplateItemProps) => {
    return (
        <Region
            name="list_template"
            layout={{ width: 158, height: 21, flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsListTemplate}
        </Region>
    );
};
