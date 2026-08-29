import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { FriendRequestsTabLayoutRequestEntityItem } from './FriendRequestsTabLayoutRequestEntityItem';

/** Named region `request_entity_list` of FriendRequestsTabLayout - configured through the parent's `requestEntityList` prop. */
export interface FriendRequestsTabLayoutRequestEntityListProps {
    itemsRequestEntityList?: ReactNode;
    layout?: BoxLayout;
}

export const FriendRequestsTabLayoutRequestEntityList = ({ itemsRequestEntityList, layout }: FriendRequestsTabLayoutRequestEntityListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 4, width: 196, top: 27, height: 220, maxHeight: 220, ...layout }}
        >
            <Region
                name="request_entity_list"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsRequestEntityList ?? (
                    <FriendRequestsTabLayoutRequestEntityItem />
                )}
            </Region>
        </ScrollArea>
    );
};
