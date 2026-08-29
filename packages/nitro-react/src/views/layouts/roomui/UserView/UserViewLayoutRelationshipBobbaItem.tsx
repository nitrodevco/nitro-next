import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { UserViewLayoutBobbaOthersItem } from './UserViewLayoutBobbaOthersItem';
import { UserViewLayoutBobbaRandomusernameItem } from './UserViewLayoutBobbaRandomusernameItem';

/** Row template `relationship_bobba` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutRelationshipBobbaItemProps {
    itemsRelationshipBobba?: ReactNode;
    layout?: BoxLayout;
    visibleRelationshipBobba?: boolean;
}

export const UserViewLayoutRelationshipBobbaItem = ({ itemsRelationshipBobba, layout, visibleRelationshipBobba }: UserViewLayoutRelationshipBobbaItemProps) => {
    return (
        (visibleRelationshipBobba ?? false) && (
            <Region
                name="relationship_bobba"
                layout={{ width: 172, height: 16, flexShrink: 0, flexDirection: 'row', ...layout }}
            >
                {itemsRelationshipBobba ?? (
                    <>
                        <UserViewLayoutBobbaRandomusernameItem />
                        <UserViewLayoutBobbaOthersItem />
                    </>
                )}
                <ThemeImage
                    src={layoutImage('relationship_status_bobba.png')}
                    layout={{ width: 17, height: 14, flexShrink: 0 }}
                />
            </Region>
        )
    );
};
