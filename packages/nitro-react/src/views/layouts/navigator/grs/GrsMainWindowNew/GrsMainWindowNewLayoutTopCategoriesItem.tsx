import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Row template `top_categories` of GrsMainWindowNewLayout - pass real rows through its `items…` slot. */
export interface GrsMainWindowNewLayoutTopCategoriesItemProps {
    layout?: BoxLayout;
    topCategories?: ReactNode;
}

export const GrsMainWindowNewLayoutTopCategoriesItem = ({ layout, topCategories }: GrsMainWindowNewLayoutTopCategoriesItemProps) => {
    return (
        <Region
            name="top_categories"
            backgroundColor="#ffffff"
            layout={{ width: 353, height: 1, flexShrink: 0, ...layout }}
        >
            {topCategories}
        </Region>
    );
};
