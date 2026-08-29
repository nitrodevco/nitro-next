import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { NavigatorFrame2LayoutNavigatorEntryRowContainerItem } from './NavigatorFrame2LayoutNavigatorEntryRowContainerItem';
import { NavigatorFrame2LayoutNavigatorEntryTileContainerItem } from './NavigatorFrame2LayoutNavigatorEntryTileContainerItem';

/** Named region `category_content` of NavigatorFrame2Layout - configured through the parent's `categoryContent` prop. */
export interface NavigatorFrame2LayoutCategoryContentProps {
    itemsCategoryContent?: ReactNode;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutCategoryContent = ({ itemsCategoryContent, layout }: NavigatorFrame2LayoutCategoryContentProps) => {
    return (
        <Region
            name="category_content"
            layout={{ position: 'absolute', left: 4, right: 5, top: 29, height: 171, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsCategoryContent ?? (
                <>
                    <NavigatorFrame2LayoutNavigatorEntryTileContainerItem />
                    <NavigatorFrame2LayoutNavigatorEntryRowContainerItem />
                </>
            )}
        </Region>
    );
};
