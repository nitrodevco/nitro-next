import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { AvatareditorWardrobeBaseLayoutAnotherColumnItem } from './AvatareditorWardrobeBaseLayoutAnotherColumnItem';
import { AvatareditorWardrobeBaseLayoutSlotsColumnTemplateItem } from './AvatareditorWardrobeBaseLayoutSlotsColumnTemplateItem';

/** Named region `slots_columns_list` of AvatareditorWardrobeBaseLayout - configured through the parent's `slotsColumnsList` prop. */
export interface AvatareditorWardrobeBaseLayoutSlotsColumnsListProps {
    itemsSlotsColumnsList?: ReactNode;
    layout?: BoxLayout;
}

export const AvatareditorWardrobeBaseLayoutSlotsColumnsList = ({ itemsSlotsColumnsList, layout }: AvatareditorWardrobeBaseLayoutSlotsColumnsListProps) => {
    return (
        <Region
            name="slots_columns_list"
            layout={{ position: 'absolute', left: 4, width: 132, top: 0, height: 418, flexDirection: 'row', gap: 4, ...layout }}
        >
            {itemsSlotsColumnsList ?? (
                <>
                    <AvatareditorWardrobeBaseLayoutSlotsColumnTemplateItem />
                    <AvatareditorWardrobeBaseLayoutAnotherColumnItem />
                </>
            )}
        </Region>
    );
};
