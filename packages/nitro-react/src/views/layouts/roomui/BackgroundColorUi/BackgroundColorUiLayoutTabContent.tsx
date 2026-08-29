import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { BackgroundColorUiLayoutHeaderContainerItem } from './BackgroundColorUiLayoutHeaderContainerItem';
import { BackgroundColorUiLayoutHueContainerItem } from './BackgroundColorUiLayoutHueContainerItem';
import { BackgroundColorUiLayoutLightnessContainerItem } from './BackgroundColorUiLayoutLightnessContainerItem';
import { BackgroundColorUiLayoutSaturationContainerItem } from './BackgroundColorUiLayoutSaturationContainerItem';
import { BackgroundColorUiLayoutSpacerItem } from './BackgroundColorUiLayoutSpacerItem';

/** Named region `tab_content` of BackgroundColorUiLayout - configured through the parent's `tabContent` prop. */
export interface BackgroundColorUiLayoutTabContentProps {
    itemsTabContent?: ReactNode;
    layout?: BoxLayout;
}

export const BackgroundColorUiLayoutTabContent = ({ itemsTabContent, layout }: BackgroundColorUiLayoutTabContentProps) => {
    return (
        <Region
            name="tab_content"
            layout={{ position: 'absolute', left: 2, right: 3, top: 2, bottom: 3, flexDirection: 'column', ...layout }}
        >
            {itemsTabContent ?? (
                <>
                    <BackgroundColorUiLayoutHeaderContainerItem />
                    <BackgroundColorUiLayoutSpacerItem />
                    <BackgroundColorUiLayoutHueContainerItem />
                    <BackgroundColorUiLayoutSaturationContainerItem />
                    <BackgroundColorUiLayoutLightnessContainerItem />
                </>
            )}
        </Region>
    );
};
