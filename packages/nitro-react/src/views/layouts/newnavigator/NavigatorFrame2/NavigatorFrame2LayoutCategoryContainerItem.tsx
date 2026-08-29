import { BoxLayout, Region } from '#base/theme';

import { NavigatorFrame2LayoutCategoryContentBackground, NavigatorFrame2LayoutCategoryContentBackgroundProps } from './NavigatorFrame2LayoutCategoryContentBackground';

/** Row template `category_container` of NavigatorFrame2Layout - pass real rows through its `items…` slot. */
export interface NavigatorFrame2LayoutCategoryContainerItemProps {
    categoryContentBackground?: NavigatorFrame2LayoutCategoryContentBackgroundProps;
    layout?: BoxLayout;
    visibleCategoryContentBackground?: boolean;
}

export const NavigatorFrame2LayoutCategoryContainerItem = ({ categoryContentBackground, layout, visibleCategoryContentBackground }: NavigatorFrame2LayoutCategoryContainerItemProps) => {
    return (
        <Region
            name="category_container"
            layout={{ width: 396, height: 200, flexShrink: 0, ...layout }}
        >
            {(visibleCategoryContentBackground ?? true) && (
                <NavigatorFrame2LayoutCategoryContentBackground {...categoryContentBackground} />
            )}
        </Region>
    );
};
