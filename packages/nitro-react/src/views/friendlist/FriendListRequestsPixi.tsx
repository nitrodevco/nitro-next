import { useFriendRequestsSelector } from '#base/context/user';
import { ScrollArea } from '#base/theme-pixi';

import { FriendListRequestsFooterPixi } from './footers/FriendListRequestsFooterPixi';
import { FriendListTabPixi } from './FriendListTabPixi';
import { FriendListRequestItemPixi } from './items/FriendListRequestItemPixi';

export interface FriendListRequestsPixiProps {
    value: string;
}

/** Pixi port of views/friendlist/FriendListRequests.tsx. */
export const FriendListRequestsPixi = ({ value }: FriendListRequestsPixiProps) => {
    const requests = useFriendRequestsSelector();

    if (!Object.keys(requests).length) return null;

    return (
        <FriendListTabPixi
            darkHeader
            value={value}
            caption="friendlist.tab.friendrequests"
            gradientColors={[ '#ff9302', '#ea8000' ]}
            tooltip="friendlist.tip.tab.2"
        >
            <ScrollArea layout={{ flex: 1 }}>
                {Object.values(requests).map((request, i) => (
                    <FriendListRequestItemPixi
                        key={request.playerId}
                        request={request}
                        zebraColor={i % 2 === 0 ? '#eeeeee' : '#ffffff'}
                    />
                ))}
            </ScrollArea>
            <FriendListRequestsFooterPixi />
        </FriendListTabPixi>
    );
};
