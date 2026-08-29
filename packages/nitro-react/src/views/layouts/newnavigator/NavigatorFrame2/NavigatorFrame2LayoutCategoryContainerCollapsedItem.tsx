import { BoxLayout, Region } from '#base/theme';

import { NavigatorFrame2LayoutCategoryHeader2, NavigatorFrame2LayoutCategoryHeader2Props } from './NavigatorFrame2LayoutCategoryHeader2';

/** Row template `category_container_collapsed` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryContainerCollapsedItemProps {
    categoryHeader?: NavigatorFrame2LayoutCategoryHeader2Props;
    layout?: BoxLayout;
    visibleCategoryHeader?: boolean;
}

export const NavigatorFrame2LayoutCategoryContainerCollapsedItem = ({ categoryHeader, layout, visibleCategoryHeader }: NavigatorFrame2LayoutCategoryContainerCollapsedItemProps) => {
    return (
        <Region
            name="category_container_collapsed"
            layout={{ width: 387, height: 26, flexShrink: 0, ...layout }}
        >
            {(visibleCategoryHeader ?? true) && (
                <NavigatorFrame2LayoutCategoryHeader2 {...categoryHeader} />
            )}
        </Region>
    );
};
