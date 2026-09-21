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
 * Somebody in the room asking to be friends, on the `instant_friend_request` layout (197x83):
 * a yellow bubble over their head with the two answers.
 *
 * Closing it is not a refusal - Flash's `ignoreRequest` only dropped the bubble, leaving the
 * request in the friend list to answer later.
 */
export const RoomFriendRequestView = ({ requesterName, onAccept, onDecline, onIgnore, onOpenProfile }: RoomFriendRequestViewProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 197, height: 83 }}>
            <Bubble
                variant="0"
                tintColor="#fac919"
                layout={{ position: 'absolute', left: -6, right: -6, top: -6, bottom: 0 }}
            >
                <Icon
                    variant="21"
                    name="profile_icon"
                    layout={{ position: 'absolute', left: 5, width: 15, top: 10, height: 15 }}
                />
                <Region
                    name="profile_region"
                    onPointerTap={onOpenProfile}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 25, width: 142, top: 5, height: 32 }}
                >
                    <ThemeText
                        text={t('widget.friendrequest.from', '%name% wants to be your friend', { name: requesterName })}
                        textStyle="u_bold"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 142 }}
                        verticalAlign="top"
                    />
                </Region>
                <Region
                    name="decline_button"
                    onPointerTap={onDecline}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 8, width: 152, bottom: 27, height: 16, flexDirection: 'row', alignItems: 'center' }}
                >
                    <ThemeText
                        text={t('widget.friendrequest.decline')}
                        textStyle="u_regular"
                        textOptions={{ fill: '#ffffff', fontSize: 11 }}
                        flashFormat={{ underline: true, thickness: -15, sharpness: 80 }}
                    />
                </Region>
                <ContainerButton
                    variant="3"
                    name="accept_button"
                    onPointerTap={onAccept}
                    layout={{ position: 'absolute', left: 99, width: 90, bottom: 23, height: 24 }}
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
