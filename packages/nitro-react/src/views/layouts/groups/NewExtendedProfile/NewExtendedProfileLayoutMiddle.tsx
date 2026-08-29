import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { NewExtendedProfileLayoutBadgeCountRegionItem } from './NewExtendedProfileLayoutBadgeCountRegionItem';
import { NewExtendedProfileLayoutLevelRegionItem } from './NewExtendedProfileLayoutLevelRegionItem';
import { NewExtendedProfileLayoutRoomsButtonItem } from './NewExtendedProfileLayoutRoomsButtonItem';
import { NewExtendedProfileLayoutSpacerItem2 } from './NewExtendedProfileLayoutSpacerItem2';

/** Named region `middle` of NewExtendedProfileLayout - configured through the parent's `middle` prop. */
export interface NewExtendedProfileLayoutMiddleProps {
    itemsMiddle?: ReactNode;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutMiddle = ({ itemsMiddle, layout }: NewExtendedProfileLayoutMiddleProps) => {
    return (
        <Region
            name="middle"
            layout={{ width: 500, height: 27, flexShrink: 0, minWidth: 495, flexDirection: 'row', ...layout }}
        >
            {itemsMiddle ?? (
                <>
                    <NewExtendedProfileLayoutSpacerItem2 />
                    <NewExtendedProfileLayoutRoomsButtonItem />
                    <NewExtendedProfileLayoutBadgeCountRegionItem />
                    <NewExtendedProfileLayoutLevelRegionItem />
                </>
            )}
        </Region>
    );
};
