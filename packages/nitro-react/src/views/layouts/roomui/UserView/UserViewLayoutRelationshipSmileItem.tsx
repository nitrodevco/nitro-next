import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { UserViewLayoutSmileOthersItem } from './UserViewLayoutSmileOthersItem';
import { UserViewLayoutSmileRandomusernameItem } from './UserViewLayoutSmileRandomusernameItem';

/** Row template `relationship_smile` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutRelationshipSmileItemProps {
    itemsRelationshipSmile?: ReactNode;
    layout?: BoxLayout;
    visibleRelationshipSmile?: boolean;
}

export const UserViewLayoutRelationshipSmileItem = ({ itemsRelationshipSmile, layout, visibleRelationshipSmile }: UserViewLayoutRelationshipSmileItemProps) => {
    return (
        (visibleRelationshipSmile ?? false) && (
            <Region
                name="relationship_smile"
                layout={{ width: 172, height: 16, flexShrink: 0, flexDirection: 'row', ...layout }}
            >
                {itemsRelationshipSmile ?? (
                    <>
                        <UserViewLayoutSmileRandomusernameItem />
                        <UserViewLayoutSmileOthersItem />
                    </>
                )}
                <ThemeImage
                    src={layoutImage('relationship_status_smile.png')}
                    layout={{ width: 17, height: 14, flexShrink: 0 }}
                />
            </Region>
        )
    );
};
