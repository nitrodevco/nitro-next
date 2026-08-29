import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { NewExtendedProfileLayoutFriendstatusItem } from './NewExtendedProfileLayoutFriendstatusItem';
import { NewExtendedProfileLayoutOnlineOfflineContainerItem } from './NewExtendedProfileLayoutOnlineOfflineContainerItem';

/** Row template `status` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutStatusItemProps {
    itemsStatus?: ReactNode;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutStatusItem = ({ itemsStatus, layout }: NewExtendedProfileLayoutStatusItemProps) => {
    return (
        <Region
            name="status"
            layout={{ width: 198, height: 27, flexShrink: 0, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsStatus ?? (
                <>
                    <NewExtendedProfileLayoutOnlineOfflineContainerItem />
                    <NewExtendedProfileLayoutFriendstatusItem />
                </>
            )}
        </Region>
    );
};
