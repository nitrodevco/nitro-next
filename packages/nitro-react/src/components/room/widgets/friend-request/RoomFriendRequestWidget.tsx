import { RoomObjectCategoryEnum, RoomObjectUserType } from '@nitrodevco/nitro-api';
import { AcceptFriendComposer, DeclineFriendComposer, GetExtendedProfileComposer } from '@nitrodevco/nitro-packets';
import { ReactNode } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomFriendRequestActions, useRoomFriendRequests, useRoomObjectIdByWebId } from '#base/context/room';
import { useUserMessengerActions } from '#base/context/user';
import { RoomFriendRequestView } from '#base/views/room-widgets/friend-request/RoomFriendRequestView';

import { RoomObjectMenuBubble } from '../object-menu/RoomObjectMenuBubble';

/**
 * Friend requests from people in the room, as a bubble over whoever sent one.
 *
 * The request id and the requester's user id are the same number, which is how the bubble finds
 * the avatar to sit over - `RoomUsersHandler.onFriendRequest` passed it as both.
 */
export const RoomFriendRequestWidget = () => {
    const requests = useRoomFriendRequests();
    const { removeRoomFriendRequest } = useRoomFriendRequestActions();
    const { removeFriendRequests } = useUserMessengerActions();
    const { send } = useWebSocketContext();

    if (!requests.length) return null;

    const answer = (requestId: number, accept: boolean) => {
        send(accept
            ? new AcceptFriendComposer({ playerIds: [ requestId ] })
            : new DeclineFriendComposer({ declineAll: false, playerIds: [ requestId ] }));

        removeFriendRequests([ requestId ]);
        removeRoomFriendRequest(requestId);
    };

    return (
        <>
            {requests.map(request => (
                <FriendRequestBubble
                    key={request.requestId}
                    requesterId={request.requestId}
                >
                    <RoomFriendRequestView
                        requesterName={request.requesterName}
                        onAccept={() => answer(request.requestId, true)}
                        onDecline={() => answer(request.requestId, false)}
                        onIgnore={() => removeRoomFriendRequest(request.requestId)}
                        onOpenProfile={() => send(new GetExtendedProfileComposer({ userId: request.requestId }))}
                    />
                </FriendRequestBubble>
            ))}
        </>
    );
};

/** The bubble over the requester, found by user id - nothing while they are not in the room. */
const FriendRequestBubble = ({ requesterId, children }: { requesterId: number; children: ReactNode }) => {
    const objectId = useRoomObjectIdByWebId(requesterId, RoomObjectUserType.User);

    // Someone who has left the room since asking has nothing to put the bubble over.
    if (objectId === undefined) return null;

    return (
        <RoomObjectMenuBubble objectData={{ objectId, category: RoomObjectCategoryEnum.Unit }}>
            {children}
        </RoomObjectMenuBubble>
    );
};
