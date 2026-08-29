import { AvatarGenderType, AvatarScaleType, AvatarSetType } from '@nitrodevco/nitro-api';
import { AcceptFriendComposer, DeclineFriendComposer, IFriendRequest } from '@nitrodevco/nitro-packets';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { useWebSocketContext } from '#base/context';
import { useFriendRequestsSelector, useUserMessengerActions } from '#base/context/user';
import { FriendRequestsTabLayout } from '#base/views/layouts/friendbar/view/tabs/FriendRequestsTab/FriendRequestsTabLayout';
import { FriendRequestsTabLayoutHeaderItem } from '#base/views/layouts/friendbar/view/tabs/FriendRequestsTab/FriendRequestsTabLayoutHeaderItem';
import { FriendRequestsTabLayoutRequestEntityItem } from '#base/views/layouts/friendbar/view/tabs/FriendRequestsTab/FriendRequestsTabLayoutRequestEntityItem';

/** The `VIEW.getAvatarFaceBitmap(figure)` the Flash tab painted into each row's `canvas` bitmap. */
const useAvatarFaceUrl = (figure: string) => {
    const [ url, setUrl ] = useState('');

    useEffect(() => {
        const avatarImage = GetAvatarRenderManager().createAvatarImage(figure, AvatarScaleType.Large, AvatarGenderType.Unisex, { resetFigure: () => {} });

        if (!avatarImage) return;

        let cancelled = false;

        avatarImage.setDirection(AvatarSetType.Head, 2);

        void avatarImage.getCroppedImageAsync(AvatarSetType.Head, false, 1).then((image) => {
            if (image && !cancelled) setUrl(image.src);
        });

        return () => {
            cancelled = true;
        };
    }, [ figure ]);

    return url;
};

const FriendRequestRow = ({ request, onAccept, onDecline }: { request: IFriendRequest; onAccept: () => void; onDecline: () => void }) => {
    const faceUrl = useAvatarFaceUrl(request.figure);

    return (
        <FriendRequestsTabLayoutRequestEntityItem
            srcCanvas={faceUrl || undefined}
            captionName={request.name}
            onButtonAccept={onAccept}
            onClickAreaDiscard={onDecline}
        />
    );
};

/**
 * The friend bar's pending-requests tab, driven by the `friend_requests_tab` layout port exactly
 * the way com/sulake/habbo/friendbar/view/tabs/FriendRequestsTab.as drove the original: the tab
 * shows the request count in `badge_counter`, clicking its header toggles the `bubble`, the
 * bubble lists one cloned `request_entity` row per request (name + avatar face), and
 * `button_accept`/`click_area_discard`/`button_accept_all`/`click_area_discard_all` map to the
 * same accept/decline messenger calls. `region_profile`/`region_profile_name` opened the user's
 * profile in Flash - there's no profile window here yet, so those stay unwired.
 */
export const FriendRequestsBarView = () => {
    const requests = useFriendRequestsSelector();
    const { removeFriendRequests } = useUserMessengerActions();
    const { send } = useWebSocketContext();
    const [ isOpen, setIsOpen ] = useState(false);

    const list = Object.values(requests);

    if (!list.length) return null;

    const accept = (playerIds: number[]) => {
        send(new AcceptFriendComposer({ playerIds }));
        removeFriendRequests(playerIds);
    };

    const decline = (playerIds: number[], declineAll = false) => {
        send(new DeclineFriendComposer({ declineAll, playerIds }));
        removeFriendRequests(playerIds);
    };

    const allIds = list.map(request => request.playerId);

    return (
        <FriendRequestsTabLayout
            // The layout's root is the 127x36 tab, but the XML places its border 292px below the
            // root origin (the friend bar's own coordinate space) - anchor so the tab itself sits
            // just above the toolbar.
            layout={{ position: 'absolute', left: 260, bottom: 346 }}
            captionBadgeCounter={String(list.length)}
            visibleBubble={isOpen}
            itemsTabContent={<FriendRequestsTabLayoutHeaderItem onHeader={() => setIsOpen(open => !open)} />}
            requestEntityList={{
                itemsRequestEntityList: list.map(request => (
                    <FriendRequestRow
                        key={request.playerId}
                        request={request}
                        onAccept={() => accept([ request.playerId ])}
                        onDecline={() => decline([ request.playerId ])}
                    />
                )),
            }}
            onButtonClose={() => setIsOpen(false)}
            onButtonAcceptAll={() => accept(allIds)}
            onClickAreaDiscardAll={() => decline(allIds, true)}
        />
    );
};
