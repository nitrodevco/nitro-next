import { BoxLayout, Region } from '#base/theme';

import { NavigatorFrame2LayoutCategoryContent, NavigatorFrame2LayoutCategoryContentProps } from './NavigatorFrame2LayoutCategoryContent';
import { NavigatorFrame2LayoutCategoryHeader, NavigatorFrame2LayoutCategoryHeaderProps } from './NavigatorFrame2LayoutCategoryHeader';

/** Named region `category_content_background` of NavigatorFrame2Layout - configured through the parent's `categoryContentBackground` prop. */
export interface NavigatorFrame2LayoutCategoryContentBackgroundProps {
    categoryContent?: NavigatorFrame2LayoutCategoryContentProps;
    categoryHeader?: NavigatorFrame2LayoutCategoryHeaderProps;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutCategoryContentBackground = ({ categoryContent, categoryHeader, layout }: NavigatorFrame2LayoutCategoryContentBackgroundProps) => {
    return (
        <Region
            name="category_content_background"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 396, top: 0, height: 200, ...layout }}
        >
            <NavigatorFrame2LayoutCategoryHeader {...categoryHeader} />
            <NavigatorFrame2LayoutCategoryContent {...categoryContent} />
        </Region>
    );
};
