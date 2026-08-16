
import { useFriendRequestsSelector } from "#base/context/user";
import { ScrollArea } from "#base/theme";

import { FriendListRequestsFooter } from "./footers/FriendListRequestsFooter";
import { FriendListTab } from "./FriendListTab";
import { FriendListRequestItem } from "./items/FriendListRequestItem";

interface FriendListRequestsProps {
    value: string;
}

export const FriendListRequests = (props: FriendListRequestsProps) => {
    const requests = useFriendRequestsSelector()

    if (!Object.keys(requests).length) return null;

    return (
        <FriendListTab
            darkHeader
            value={props.value}
            caption="friendlist.tab.friendrequests"
            triggerClassName="from-[#ff9302] to-[#ea8000]"
            tooltip="friendlist.tip.tab.2"
        >
            <ScrollArea
                className="flex-1 min-h-0 p-1 gap-1 text-[0.68rem]"
                contentClassName="flex flex-col [&>*:nth-child(odd)]:bg-[#eeeeee] [&>*:nth-child(even)]:bg-white"
            >
                {Object.values(requests).map(request => <FriendListRequestItem key={request.playerId} request={request} />)}
            </ScrollArea>
            <FriendListRequestsFooter />
        </FriendListTab>
    );
}
