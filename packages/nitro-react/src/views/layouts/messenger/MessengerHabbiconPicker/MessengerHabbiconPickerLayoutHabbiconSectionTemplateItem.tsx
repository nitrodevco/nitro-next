import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeText } from '#base/theme';

import { MessengerHabbiconPickerLayoutHabbiconItemTemplateItem } from './MessengerHabbiconPickerLayoutHabbiconItemTemplateItem';

/** Row template `habbicon_section_template` of MessengerHabbiconPickerLayout - pass real rows through its `items…` slot. */
export interface MessengerHabbiconPickerLayoutHabbiconSectionTemplateItemProps {
    captionSectionTitle?: string;
    itemsHabbiconGrid?: ReactNode;
    layout?: BoxLayout;
    visibleHabbiconGrid?: boolean;
    visibleSectionTitle?: boolean;
}

export const MessengerHabbiconPickerLayoutHabbiconSectionTemplateItem = ({ captionSectionTitle, itemsHabbiconGrid, layout, visibleHabbiconGrid, visibleSectionTitle }: MessengerHabbiconPickerLayoutHabbiconSectionTemplateItemProps) => {
    return (
        <Region
            name="habbicon_section_template"
            layout={{ width: 230, height: 65, flexShrink: 0, ...layout }}
        >
            {(visibleSectionTitle ?? true) && (
                <Region
                    name="section_title"
                    layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSectionTitle ?? 'Section'}
                        textStyle="text-style-il-regular"
                    />
                </Region>
            )}
            {(visibleHabbiconGrid ?? true) && (
                <Region
                    name="habbicon_grid"
                    layout={{ position: 'absolute', left: 0, width: 230, top: 20, height: 45, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
                >
                    {itemsHabbiconGrid ?? (
                        <MessengerHabbiconPickerLayoutHabbiconItemTemplateItem />
                    )}
                </Region>
            )}
        </Region>
    );
};
