import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { AvatareditorWardrobeBaseLayoutSlotTemplateItem } from './AvatareditorWardrobeBaseLayoutSlotTemplateItem';

/** Row template `slots_column_template` of AvatareditorWardrobeBaseLayout - pass real rows through its `items…` slot. */
export interface AvatareditorWardrobeBaseLayoutSlotsColumnTemplateItemProps {
    itemsSlotsColumnTemplate?: ReactNode;
    layout?: BoxLayout;
}

export const AvatareditorWardrobeBaseLayoutSlotsColumnTemplateItem = ({ itemsSlotsColumnTemplate, layout }: AvatareditorWardrobeBaseLayoutSlotsColumnTemplateItemProps) => {
    return (
        <Region
            name="slots_column_template"
            layout={{ width: 64, height: 412, flexShrink: 0, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsSlotsColumnTemplate ?? (
                <AvatareditorWardrobeBaseLayoutSlotTemplateItem />
            )}
        </Region>
    );
};
