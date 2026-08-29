import { useTranslation } from '#base/context';
import { BoxLayout, Button, Icon, Region, ThemeText } from '#base/theme';

/** Row template `friendstatus` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutFriendstatusItemProps {
    captionFriendRequestSentTxt?: string;
    captionStatusTxt?: string;
    layout?: BoxLayout;
    onAddasfriendButton?: () => void;
    visibleAddasfriendButton?: boolean;
    visibleFriendRequestSentTxt?: boolean;
    visibleOkIcon?: boolean;
    visibleStatusTxt?: boolean;
}

export const NewExtendedProfileLayoutFriendstatusItem = ({ captionFriendRequestSentTxt, captionStatusTxt, layout, onAddasfriendButton, visibleAddasfriendButton, visibleFriendRequestSentTxt, visibleOkIcon, visibleStatusTxt }: NewExtendedProfileLayoutFriendstatusItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="friendstatus"
            layout={{ width: 140, height: 23, flexShrink: 0, maxWidth: 140, minHeight: 23, maxHeight: 23, ...layout }}
        >
            {(visibleOkIcon ?? false) && (
                <Icon
                    variant="8"
                    name="ok_icon"
                    tintColor="#3ce600"
                    layout={{ position: 'absolute', left: 0, width: 16, top: 5, height: 16 }}
                />
            )}
            {(visibleStatusTxt ?? false) && (
                <Region
                    name="status_txt"
                    layout={{ position: 'absolute', left: 16, width: 132, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStatusTxt ?? t('extendedprofile.friend')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            )}
            {(visibleFriendRequestSentTxt ?? true) && (
                <Region
                    name="friend_request_sent_txt"
                    layout={{ position: 'absolute', left: 0, width: 189, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionFriendRequestSentTxt ?? t('extendedprofile.friendrequestsent')}
                        textStyle="text-style-u-regular"
                    />
                </Region>
            )}
            {(visibleAddasfriendButton ?? false) && (
                <Button
                    variant="3"
                    name="addasfriend_button"
                    onPointerTap={onAddasfriendButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', left: 12, width: 105, top: 0, height: 23, minWidth: 105, maxWidth: 105 }}
                >
                    {t('extendedprofile.addasafriend')}
                </Button>
            )}
        </Region>
    );
};
