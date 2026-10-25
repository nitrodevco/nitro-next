/**
 * Somebody in the room asking to be friends - Flash `FriendRequestDialog`, on `habbo-room-ui-com`'s
 * `instant_friend_request` layout (`createWindow`): a yellow bubble over their head, which the widget
 * places (`targetRect`).
 *
 * - `text`: `widget.friendrequest.from` with the requester's name; `profile_region` opens the profile
 *   with the infostand's profile tooltip, and underlines `text` while hovered (`onProfile`).
 * - `profile_icon` opens the profile too, its style 21 turning 22 under the pointer (`onProfileIcon`).
 * - `accept_button` / `decline_button` answer; `close_button` only drops the bubble (`ignoreRequest`),
 *   leaving the request in the friend list to answer later.
 *
 * Not carried: the region's `toolTipDelay` of 100 (the template binding has no tooltip delay), and
 * `master_container`'s drag flags - `targetRect` puts the bubble back over the avatar on the next frame
 * the pointer is off it, so a drag in Flash only ever held it while pressed.
 */
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { TemplateWindow } from '#base/theme';

export interface RoomFriendRequestViewProps {
    requesterName: string;
    onAccept: () => void;
    onDecline: () => void;
    /** Neither yes nor no: the bubble goes, the request stays in the friend list. */
    onIgnore: () => void;
    onOpenProfile: () => void;
}

const FRIEND_REQUEST_TEMPLATE = 'habbo-room-ui-com/instant_friend_request';

/** `onProfileIcon`: the icon's style off and under the pointer. */
const ICON_STYLE = '21';
const ICON_STYLE_HOVER = '22';

export const RoomFriendRequestView = ({ requesterName, onAccept, onDecline, onIgnore, onOpenProfile }: RoomFriendRequestViewProps) => {
    const t = useTranslation();
    const [ nameHovered, setNameHovered ] = useState(false);
    const [ iconHovered, setIconHovered ] = useState(false);

    return (
        <TemplateWindow
            id={FRIEND_REQUEST_TEMPLATE}
            bindings={{
                profile_region: {
                    tooltip: t('infostand.profile.link.tooltip', ''),
                    onPointerTap: onOpenProfile,
                    onPointerOver: () => setNameHovered(true),
                    onPointerOut: () => setNameHovered(false),
                },
                text: { caption: t('widget.friendrequest.from', '', { username: requesterName }), underline: nameHovered },
                profile_icon: {
                    style: iconHovered ? ICON_STYLE_HOVER : ICON_STYLE,
                    onPointerTap: onOpenProfile,
                    onPointerOver: () => setIconHovered(true),
                    onPointerOut: () => setIconHovered(false),
                },
                accept_button: { onPointerTap: onAccept },
                decline_button: { onPointerTap: onDecline },
                close_button: { onPointerTap: onIgnore },
            }}
        />
    );
};
