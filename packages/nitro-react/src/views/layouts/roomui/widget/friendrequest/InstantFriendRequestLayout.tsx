import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, CloseButton, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `984_instant_friend_request_xml` (layout "instant_friend_request", 197x83) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InstantFriendRequestLayoutProps {
    captionText?: string;
    layout?: BoxLayout;
    onAcceptButton?: () => void;
    onCloseButton?: () => void;
    onDeclineButton?: () => void;
    onProfileRegion?: () => void;
}

export const InstantFriendRequestLayout = ({ captionText, layout, onAcceptButton, onCloseButton, onDeclineButton, onProfileRegion }: InstantFriendRequestLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 197, height: 83, ...layout }}>
            <Region
                name="master_container"
                params={33057}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 197, top: 0, height: 83 }}
            >
                <Bubble
                    variant="0"
                    params={2449}
                    tintColor="#fac919"
                    layout={{ position: 'absolute', left: -6, width: 209, top: -6, height: 89 }}
                >
                    <Icon
                        variant="21"
                        name="profile_icon"
                        params={17}
                        layout={{ position: 'absolute', left: 5, width: 15, top: 10, height: 15 }}
                    />
                    <Region
                        name="profile_region"
                        params={17}
                        onPointerTap={onProfileRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 25, width: 142, top: 5, height: 32 }}
                    >
                        <Region
                            name="text"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 142, top: 0, height: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionText ?? ''}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 142 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="decline_button"
                        params={148497}
                        onPointerTap={onDeclineButton}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 8, width: 152, top: 46, height: 16, minWidth: 1 }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 152, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('widget.friendrequest.decline')}
                                textStyle="text-style-u-regular"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Region>
                    <ContainerButton
                        variant="3"
                        name="accept_button"
                        params={1041}
                        onPointerTap={onAcceptButton}
                        layout={{ position: 'absolute', left: 99, width: 90, top: 42, height: 24, minWidth: 90, maxWidth: 90 }}
                    >
                        <Icon
                            variant="8"
                            params={16}
                            tintColor="#00aa00"
                            layout={{ position: 'absolute', left: 6, width: 16, top: 5, height: 15 }}
                        />
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 23, width: 65, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('widget.friendrequest.accept')}
                                textStyle="text-style-button-shiny-bold"
                            />
                        </Region>
                    </ContainerButton>
                    <CloseButton
                        variant="3"
                        name="close_button"
                        params={17}
                        onPointerTap={onCloseButton}
                        layout={{ position: 'absolute', left: 171, width: 19, top: 3, height: 20 }}
                    />
                </Bubble>
            </Region>
        </Region>
    );
};
