import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { UserViewLayoutRelationshipBobbaItem } from './UserViewLayoutRelationshipBobbaItem';
import { UserViewLayoutRelationshipHeartItem } from './UserViewLayoutRelationshipHeartItem';
import { UserViewLayoutRelationshipSmileItem } from './UserViewLayoutRelationshipSmileItem';

/** Row template `relationship_status_container` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutRelationshipStatusContainerItemProps {
    itemsRelationshipStatusContainer?: ReactNode;
    layout?: BoxLayout;
}

export const UserViewLayoutRelationshipStatusContainerItem = ({ itemsRelationshipStatusContainer, layout }: UserViewLayoutRelationshipStatusContainerItemProps) => {
    return (
        <Region
            name="relationship_status_container"
            layout={{ width: 170, height: 55, flexShrink: 0, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsRelationshipStatusContainer ?? (
                <>
                    <UserViewLayoutRelationshipHeartItem />
                    <UserViewLayoutRelationshipSmileItem />
                    <UserViewLayoutRelationshipBobbaItem />
                </>
            )}
        </Region>
    );
};
