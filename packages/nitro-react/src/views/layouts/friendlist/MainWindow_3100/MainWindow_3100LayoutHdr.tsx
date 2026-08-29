import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Icon, Region, ThemeImage } from '#base/theme';

/** Named region `hdr` of MainWindow_3100Layout - configured through the parent's `hdr` prop. */
export interface MainWindow_3100LayoutHdrProps {
    layout?: BoxLayout;
    onButtonExtendedProfile?: () => void;
    onButtonFollowFriend?: () => void;
    onButtonMinimail?: () => void;
    srcButtonFollowFriendIcon?: string;
    srcClose?: string;
    srcIcon?: string;
    tintButtonFollowFriendIcon?: string;
    tintClose?: string;
    tintIcon?: string;
}

export const MainWindow_3100LayoutHdr = ({ layout, onButtonExtendedProfile, onButtonFollowFriend, onButtonMinimail, srcButtonFollowFriendIcon, srcClose, srcIcon, tintButtonFollowFriendIcon, tintClose, tintIcon }: MainWindow_3100LayoutHdrProps) => {
    const t = useTranslation();

    return (
        <Region
            name="hdr"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 32, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button_minimail"
                tooltip={t('messenger.minimail.tooltip')}
                onPointerTap={onButtonMinimail}
                layout={{ position: 'absolute', left: 36, width: 32, top: 5, height: 22 }}
            >
                <ThemeImage
                    name="icon"
                    src={srcIcon}
                    tint={tintIcon}
                    layout={{ position: 'absolute', left: 8, width: 19, top: 4, height: 14 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="0"
                name="button_follow_friend"
                tooltip={t('messenger.followfriend.tooltip')}
                onPointerTap={onButtonFollowFriend}
                layout={{ position: 'absolute', left: 0, width: 32, top: 5, height: 22 }}
            >
                <ThemeImage
                    name="icon"
                    src={srcButtonFollowFriendIcon}
                    tint={tintButtonFollowFriendIcon}
                    layout={{ position: 'absolute', left: 7, width: 16, top: 4, height: 14 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="0"
                name="button_extended_profile"
                tooltip={t('infostand.profile.link.tooltip')}
                onPointerTap={onButtonExtendedProfile}
                layout={{ position: 'absolute', left: 72, width: 32, top: 5, height: 22 }}
            >
                <Icon
                    variant="21"
                    name="icon_eye_off"
                    layout={{ position: 'absolute', left: 9, width: 15, top: 6, height: 11 }}
                />
            </ContainerButton>
            <ThemeImage
                name="close"
                src={srcClose}
                tint={tintClose}
                layout={{ position: 'absolute', right: 1, width: 13, top: 6, height: 13 }}
            />
        </Region>
    );
};
