import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, CloseButton, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

import { FriendRequestTabLayoutHeaderItem } from './FriendRequestTabLayoutHeaderItem';

/** Generated from `93_friend_request_tab_xml` (layout "friendRequestTab", 127x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendRequestTabLayoutProps {
    captionButtonProfileCaption?: string;
    captionCaption?: string;
    captionLinkReject?: string;
    captionMessage?: string;
    itemsIcons?: ReactNode;
    itemsPieces?: ReactNode;
    layout?: BoxLayout;
    onButtonAccept?: () => void;
    onButtonClose?: () => void;
    onButtonProfile?: () => void;
    onClickRegionReject?: () => void;
    visibleBubble?: boolean;
}

export const FriendRequestTabLayout = ({ captionButtonProfileCaption, captionCaption, captionLinkReject, captionMessage, itemsIcons, itemsPieces, layout, onButtonAccept, onButtonClose, onButtonProfile, onClickRegionReject, visibleBubble }: FriendRequestTabLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 127, height: 36, ...layout }}>
            <Border
                variant="6"
                name="frame"
                tintColor="#fac919"
                layout={{ position: 'absolute', left: 0, right: 0, top: 107, height: 36 }}
            >
                <Region
                    name="pieces"
                    layout={{ position: 'absolute', left: 3, right: 3, top: 7, bottom: -1, minHeight: 30, flexDirection: 'column' }}
                >
                    {itemsPieces ?? (
                        <FriendRequestTabLayoutHeaderItem />
                    )}
                </Region>
                {(visibleBubble ?? true) && (
                    <Bubble
                        variant="0"
                        name="bubble"
                        tintColor="#fac919"
                        layout={{ position: 'absolute', left: -6, width: 139, top: -133, height: 140, justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionMessage ?? t('friendbar.request.title')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 93 }}
                            name="message"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 5, right: 41, top: 4 }}
                        />
                        <CloseButton
                            variant="3"
                            name="button_close"
                            onPointerTap={onButtonClose}
                            layout={{ position: 'absolute', right: 19, width: 19, top: 3, height: 20 }}
                        />
                        <ContainerButton
                            variant="3"
                            name="button_accept"
                            onPointerTap={onButtonAccept}
                            layout={{ position: 'absolute', marginLeft: -8.5, marginRight: 8.5, width: 96, bottom: 77, height: 27, maxWidth: 110 }}
                        >
                            <Icon
                                variant="8"
                                name="icon"
                                tintColor="#00a900"
                                layout={{ position: 'absolute', left: 7, width: 17, top: 6, height: 16 }}
                            />
                            <ThemeText
                                text={captionCaption ?? t('friendbar.request.accept')}
                                textStyle="text-style-button-shiny-bold"
                                textOptions={{ align: 'center' }}
                                name="caption"
                                layout={{ position: 'absolute', left: 16, width: 71, top: 4, height: 17 }}
                            />
                        </ContainerButton>
                        <ContainerButton
                            variant="3"
                            name="button_profile"
                            onPointerTap={onButtonProfile}
                            layout={{ position: 'absolute', marginLeft: -8.5, marginRight: 8.5, width: 96, bottom: 47, height: 27, maxWidth: 110 }}
                        >
                            <Icon
                                variant="21"
                                name="icon"
                                tintColor="#00a900"
                                layout={{ position: 'absolute', left: 7, width: 17, top: 8, height: 16 }}
                            />
                            <ThemeText
                                text={captionButtonProfileCaption ?? t('friendbar.request.profile')}
                                textStyle="text-style-button-shiny-bold"
                                textOptions={{ align: 'center' }}
                                name="caption"
                                layout={{ position: 'absolute', left: 16, width: 71, top: 4, height: 17 }}
                            />
                        </ContainerButton>
                        <Region
                            name="click_region_reject"
                            onPointerTap={onClickRegionReject}
                            cursor="pointer"
                            layout={{ position: 'absolute', marginLeft: -8.5, marginRight: 8.5, width: 118, bottom: 26, height: 15 }}
                        >
                            <ThemeText
                                text={captionLinkReject ?? t('friendbar.request.decline')}
                                textStyle="text-style-u-small"
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                                name="link_reject"
                                layout={{ position: 'absolute', left: 0, top: 0, bottom: 0 }}
                            />
                        </Region>
                    </Bubble>
                )}
                <Region
                    name="icons"
                    layout={{ position: 'absolute', right: 10, width: 0, top: -13, height: 25, flexDirection: 'row', gap: 2 }}
                >
                    {itemsIcons}
                </Region>
            </Border>
        </Region>
    );
};
