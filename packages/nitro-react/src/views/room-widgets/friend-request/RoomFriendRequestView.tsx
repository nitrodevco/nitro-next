import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Bubble, CloseButton, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

export interface RoomFriendRequestViewProps {
    requesterName: string;
    onAccept: () => void;
    onDecline: () => void;
    /** Neither yes nor no: the bubble goes, the request stays in the friend list. */
    onIgnore: () => void;
    onOpenProfile: () => void;
}

/**
 * Somebody in the room asking to be friends, on the `instant_friend_request` layout (197x83)
 * that `FriendRequestDialog.createWindow` builds: a yellow bubble over their head with the two
 * answers.
 *
 * As in `FriendRequestDialog`, the name opens the profile (with the infostand's profile tooltip,
 * underlined while hovered) and so does the icon, which turns from style 21 to 22 under the
 * pointer. Closing it is not a refusal - Flash's `ignoreRequest` only dropped the bubble, leaving
 * the request in the friend list to answer later.
 *
 * `master_container`'s drag flags are left out: `targetRect` puts the bubble back over the avatar
 * on the next frame the pointer is off it, so a drag in Flash only ever held it while pressed.
 */
export const RoomFriendRequestView = ({ requesterName, onAccept, onDecline, onIgnore, onOpenProfile }: RoomFriendRequestViewProps) => {
    const t = useTranslation();
    const [ nameHovered, setNameHovered ] = useState(false);
    const [ iconHovered, setIconHovered ] = useState(false);

    return (
        <Region
            name="master_container"
            layout={{ position: 'relative', width: 197, height: 83 }}
        >
            <Bubble
                variant="0"
                tintColor="#fac919"
                margins={[ 8, 8, 8, 8 ]}
                layout={{ position: 'absolute', left: -6, right: -6, top: -6, bottom: 0 }}
            >
                <Region
                    name="profile_icon"
                    onPointerTap={onOpenProfile}
                    onPointerOver={() => setIconHovered(true)}
                    onPointerOut={() => setIconHovered(false)}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 5, width: 15, top: 10, height: 15 }}
                >
                    <Icon
                        variant={iconHovered ? '22' : '21'}
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                    />
                </Region>
                <Region
                    name="profile_region"
                    tooltip={t('infostand.profile.link.tooltip', '')}
                    tooltipDelay={100}
                    onPointerTap={onOpenProfile}
                    onPointerOver={() => setNameHovered(true)}
                    onPointerOut={() => setNameHovered(false)}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 25, width: 142, top: 5, height: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('widget.friendrequest.from', '', { username: requesterName })}
                        textStyle="u_bold"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 138 }}
                        flashFormat={{ thickness: -15, sharpness: 80, underline: nameHovered }}
                        clip
                        name="text"
                        verticalAlign="top"
                        layout={{ width: 142, height: 32 }}
                    />
                </Region>
                <Region
                    name="decline_button"
                    onPointerTap={onDecline}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 8, width: 152, bottom: 27, height: 16, minWidth: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('widget.friendrequest.decline')}
                        textStyle="u_regular"
                        textOptions={{ fill: '#ffffff', fontSize: 11 }}
                        flashFormat={{ underline: true, thickness: -15, sharpness: 80 }}
                        verticalAlign="top"
                    />
                </Region>
                <ContainerButton
                    variant="3"
                    name="accept_button"
                    onPointerTap={onAccept}
                    layout={{ position: 'absolute', left: 99, width: 90, bottom: 23, height: 24, minWidth: 90, maxWidth: 90 }}
                >
                    <Icon
                        variant="8"
                        tintColor="#00aa00"
                        layout={{ position: 'absolute', left: 6, width: 16, top: 5, height: 15 }}
                    />
                    <ThemeText
                        text={t('widget.friendrequest.accept')}
                        textStyle="button_shiny_bold"
                        textOptions={{ fontSize: 11 }}
                        flashFormat={{ thickness: -15, sharpness: 80 }}
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 23, width: 65, top: 3, height: 16 }}
                    />
                </ContainerButton>
                <CloseButton
                    variant="3"
                    name="close_button"
                    onPointerTap={onIgnore}
                    layout={{ position: 'absolute', left: 171, width: 19, top: 3, height: 20 }}
                />
            </Bubble>
        </Region>
    );
};
