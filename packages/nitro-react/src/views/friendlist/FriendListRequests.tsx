import { useFriendRequests } from '#base/context/user';
import { ScrollArea } from '#base/theme';

import { FriendListRequestsFooter } from './footers/FriendListRequestsFooter';
import { FriendListTab } from './FriendListTab';
import { FriendListRequestItem } from './items/FriendListRequestItem';

export interface FriendListRequestsPixiProps {
    value: string;
}

/** Pixi port of views/friendlist/FriendListRequests.tsx. */
export const FriendListRequests = ({ value }: FriendListRequestsPixiProps) => {
    const requests = useFriendRequests();

    if (!Object.keys(requests).length) return null;

    return (
        <FriendListTab
            darkHeader
            value={value}
            caption="friendlist.tab.friendrequests"
            gradientColors={[ '#ff9302', '#ea8000' ]}
            tooltip="friendlist.tip.tab.2"
        >
            <ScrollArea layout={{ flex: 1 }}>
                {Object.values(requests).map((request, i) => (
                    <FriendListRequestItem
                        key={request.playerId}
                        request={request}
                        zebraColor={i % 2 === 0 ? '#eeeeee' : '#ffffff'}
                    />
                ))}
            </ScrollArea>
            <FriendListRequestsFooter />
        </FriendListTab>
    );
};
