import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { NavigatorFrame2LayoutCategoryContainerCollapsedItem } from './NavigatorFrame2LayoutCategoryContainerCollapsedItem';
import { NavigatorFrame2LayoutCategoryContainerItem } from './NavigatorFrame2LayoutCategoryContainerItem';
import { NavigatorFrame2LayoutNoResultsContainerItem } from './NavigatorFrame2LayoutNoResultsContainerItem';

/** Named region `block_results` of NavigatorFrame2Layout - configured through the parent's `blockResults` prop. */
export interface NavigatorFrame2LayoutBlockResultsProps {
    itemsBlockResults?: ReactNode;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutBlockResults = ({ itemsBlockResults, layout }: NavigatorFrame2LayoutBlockResultsProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 1, right: 2, top: 45, bottom: 80, ...layout }}
        >
            <Region
                name="block_results"
                layout={{ flexDirection: 'column', gap: 5, width: '100%' }}
            >
                {itemsBlockResults ?? (
                    <>
                        <NavigatorFrame2LayoutCategoryContainerItem />
                        <NavigatorFrame2LayoutCategoryContainerCollapsedItem />
                        <NavigatorFrame2LayoutNoResultsContainerItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};
