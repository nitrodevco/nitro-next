import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { AreaHideUiLayoutAreaContainerItem } from './AreaHideUiLayoutAreaContainerItem';
import { AreaHideUiLayoutHeaderContainerItem } from './AreaHideUiLayoutHeaderContainerItem';
import { AreaHideUiLayoutSaturationContainerItem } from './AreaHideUiLayoutSaturationContainerItem';
import { AreaHideUiLayoutSpacerItem } from './AreaHideUiLayoutSpacerItem';

/** Named region `tab_content` of AreaHideUiLayout - configured through the parent's `tabContent` prop. */
export interface AreaHideUiLayoutTabContentProps {
    itemsTabContent?: ReactNode;
    layout?: BoxLayout;
}

export const AreaHideUiLayoutTabContent = ({ itemsTabContent, layout }: AreaHideUiLayoutTabContentProps) => {
    return (
        <Region
            name="tab_content"
            layout={{ position: 'absolute', left: 2, width: 270, top: 2, height: 250, flexDirection: 'column', ...layout }}
        >
            {itemsTabContent ?? (
                <>
                    <AreaHideUiLayoutHeaderContainerItem />
                    <AreaHideUiLayoutSpacerItem />
                    <AreaHideUiLayoutAreaContainerItem />
                    <AreaHideUiLayoutSaturationContainerItem />
                </>
            )}
        </Region>
    );
};
