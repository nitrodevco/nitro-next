import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeText } from '#base/theme';

import { HabbiconselectorMenuLayoutHabbiconItemTemplateItem } from './HabbiconselectorMenuLayoutHabbiconItemTemplateItem';

/** Row template `habbicon_section_template` of HabbiconselectorMenuLayout - pass real rows through its `items…` slot. */
export interface HabbiconselectorMenuLayoutHabbiconSectionTemplateItemProps {
    captionSectionTitle?: string;
    itemsHabbiconGrid?: ReactNode;
    layout?: BoxLayout;
    visibleHabbiconGrid?: boolean;
    visibleSectionTitle?: boolean;
}

export const HabbiconselectorMenuLayoutHabbiconSectionTemplateItem = ({ captionSectionTitle, itemsHabbiconGrid, layout, visibleHabbiconGrid, visibleSectionTitle }: HabbiconselectorMenuLayoutHabbiconSectionTemplateItemProps) => {
    return (
        <Region
            name="habbicon_section_template"
            layout={{ width: 217, height: 62, flexShrink: 0, ...layout }}
        >
            {(visibleSectionTitle ?? true) && (
                <Region
                    name="section_title"
                    layout={{ position: 'absolute', left: 0, width: 217, top: 0, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSectionTitle ?? 'Section'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            )}
            {(visibleHabbiconGrid ?? true) && (
                <Region
                    name="habbicon_grid"
                    layout={{ position: 'absolute', left: 0, width: 217, top: 20, height: 42, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
                >
                    {itemsHabbiconGrid ?? (
                        <HabbiconselectorMenuLayoutHabbiconItemTemplateItem />
                    )}
                </Region>
            )}
        </Region>
    );
};
