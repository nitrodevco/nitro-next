import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { NewExtendedProfileLayoutRelationshipBobbaItem } from './NewExtendedProfileLayoutRelationshipBobbaItem';
import { NewExtendedProfileLayoutRelationshipHeartItem } from './NewExtendedProfileLayoutRelationshipHeartItem';
import { NewExtendedProfileLayoutRelationshipSmileItem } from './NewExtendedProfileLayoutRelationshipSmileItem';

/** Named region `relationships` of NewExtendedProfileLayout - configured through the parent's `relationships` prop. */
export interface NewExtendedProfileLayoutRelationshipsProps {
    itemsRelationships?: ReactNode;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutRelationships = ({ itemsRelationships, layout }: NewExtendedProfileLayoutRelationshipsProps) => {
    return (
        <Region
            name="relationships"
            layout={{ position: 'absolute', left: 0, width: 227, top: 39, height: 156, flexDirection: 'column', ...layout }}
        >
            {itemsRelationships ?? (
                <>
                    <NewExtendedProfileLayoutRelationshipHeartItem />
                    <NewExtendedProfileLayoutRelationshipSmileItem />
                    <NewExtendedProfileLayoutRelationshipBobbaItem />
                </>
            )}
        </Region>
    );
};
