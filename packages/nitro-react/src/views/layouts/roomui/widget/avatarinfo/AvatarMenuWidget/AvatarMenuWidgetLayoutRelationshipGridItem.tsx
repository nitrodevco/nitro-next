import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { AvatarMenuWidgetLayoutRelationshipBobbaItem } from './AvatarMenuWidgetLayoutRelationshipBobbaItem';
import { AvatarMenuWidgetLayoutRelationshipHeartItem } from './AvatarMenuWidgetLayoutRelationshipHeartItem';
import { AvatarMenuWidgetLayoutRelationshipSmileItem } from './AvatarMenuWidgetLayoutRelationshipSmileItem';

/** Row template `relationship_grid` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutRelationshipGridItemProps {
    itemsRelationshipGrid?: ReactNode;
    layout?: BoxLayout;
}

export const AvatarMenuWidgetLayoutRelationshipGridItem = ({ itemsRelationshipGrid, layout }: AvatarMenuWidgetLayoutRelationshipGridItemProps) => {
    return (
        <Region
            name="relationship_grid"
            layout={{ width: 137, height: 25, flexShrink: 0, flexDirection: 'row', flexWrap: 'wrap', gap: 1, ...layout }}
        >
            {itemsRelationshipGrid ?? (
                <>
                    <AvatarMenuWidgetLayoutRelationshipHeartItem />
                    <AvatarMenuWidgetLayoutRelationshipSmileItem />
                    <AvatarMenuWidgetLayoutRelationshipBobbaItem />
                </>
            )}
        </Region>
    );
};
