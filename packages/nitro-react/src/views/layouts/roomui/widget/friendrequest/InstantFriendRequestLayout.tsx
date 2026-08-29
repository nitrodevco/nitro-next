import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, CloseButton, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `984_instant_friend_request_xml` (layout "instant_friend_request", 197x83) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InstantFriendRequestLayoutProps {
    layout?: BoxLayout;
    masterContainer?: InstantFriendRequestLayoutMasterContainerProps;
}

export const InstantFriendRequestLayout = ({ layout, masterContainer }: InstantFriendRequestLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 197, height: 83, ...layout }}>
            <InstantFriendRequestLayoutMasterContainer {...masterContainer} />
        </Region>
    );
};

/** Named region `master_container` of InstantFriendRequestLayout - configured through the parent's `masterContainer` prop. */
export interface InstantFriendRequestLayoutMasterContainerProps {
    captionText?: string;
    layout?: BoxLayout;
    onAcceptButton?: () => void;
    onCloseButton?: () => void;
    onDeclineButton?: () => void;
    onMasterContainer?: () => void;
    onProfileRegion?: () => void;
}

export const InstantFriendRequestLayoutMasterContainer = ({ captionText, layout, onAcceptButton, onCloseButton, onDeclineButton, onMasterContainer, onProfileRegion }: InstantFriendRequestLayoutMasterContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="master_container"
            backgroundColor="#000000"
            onPointerTap={onMasterContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 197, top: 0, height: 83, ...layout }}
        >
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
                    layout={{ position: 'absolute', left: 25, width: 142, top: 5, height: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    onPointerTap={onProfileRegion}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionText ?? ''}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 142 }}
                    />
                </Region>
                <Region
                    name="decline_button"
                    layout={{ position: 'absolute', left: 8, width: 152, bottom: 27, height: 16, minWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPointerTap={onDeclineButton}
                    cursor="pointer"
                >
                    <ThemeText
                        text={t('widget.friendrequest.decline')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <ContainerButton
                    variant="3"
                    name="accept_button"
                    onPointerTap={onAcceptButton}
                    layout={{ position: 'absolute', left: 99, width: 90, bottom: 23, height: 24, minWidth: 90, maxWidth: 90 }}
                >
                    <Icon
                        variant="8"
                        tintColor="#00aa00"
                        layout={{ position: 'absolute', left: 6, width: 16, top: 5, height: 15 }}
                    />
                    <Region layout={{ position: 'absolute', left: 23, width: 65, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('widget.friendrequest.accept')}
                            textStyle="text-style-button-shiny-bold"
                        />
                    </Region>
                </ContainerButton>
                <CloseButton
                    variant="3"
                    name="close_button"
                    onPointerTap={onCloseButton}
                    layout={{ position: 'absolute', left: 171, width: 19, top: 3, height: 20 }}
                />
            </Bubble>
        </Region>
    );
};
