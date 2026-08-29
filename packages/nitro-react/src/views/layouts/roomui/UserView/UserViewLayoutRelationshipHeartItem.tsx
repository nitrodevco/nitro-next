import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { UserViewLayoutHeartOthersItem } from './UserViewLayoutHeartOthersItem';
import { UserViewLayoutHeartRandomusernameItem } from './UserViewLayoutHeartRandomusernameItem';

/** Row template `relationship_heart` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutRelationshipHeartItemProps {
    itemsRelationshipHeart?: ReactNode;
    layout?: BoxLayout;
    visibleRelationshipHeart?: boolean;
}

export const UserViewLayoutRelationshipHeartItem = ({ itemsRelationshipHeart, layout, visibleRelationshipHeart }: UserViewLayoutRelationshipHeartItemProps) => {
    return (
        (visibleRelationshipHeart ?? false) && (
            <Region
                name="relationship_heart"
                layout={{ width: 172, height: 16, flexShrink: 0, flexDirection: 'row', ...layout }}
            >
                {itemsRelationshipHeart ?? (
                    <>
                        <UserViewLayoutHeartRandomusernameItem />
                        <UserViewLayoutHeartOthersItem />
                    </>
                )}
                <ThemeImage
                    src={layoutImage('relationship_status_heart.png')}
                    layout={{ width: 17, height: 14, flexShrink: 0 }}
                />
            </Region>
        )
    );
};
