import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, CloseButton, ContainerButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `93_friend_request_tab_xml` (layout "friendRequestTab", 127x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendRequestTabLayoutProps {
    captionCaption?: string;
    captionCaption2?: string;
    captionMessage?: string;
    clickRegionReject?: FriendRequestTabLayoutClickRegionRejectProps;
    icons?: FriendRequestTabLayoutIconsProps;
    layout?: BoxLayout;
    onButtonAccept?: () => void;
    onButtonClose?: () => void;
    onButtonProfile?: () => void;
    pieces?: FriendRequestTabLayoutPiecesProps;
    visibleBubble?: boolean;
}

export const FriendRequestTabLayout = ({ captionCaption, captionCaption2, captionMessage, clickRegionReject, icons, layout, onButtonAccept, onButtonClose, onButtonProfile, pieces, visibleBubble }: FriendRequestTabLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 127, height: 36, ...layout }}>
            <Border
                variant="6"
                name="frame"
                params={1}
                tintColor="#fac919"
                layout={{ position: 'absolute', left: 0, width: 127, top: 107, height: 36 }}
            >
                <FriendRequestTabLayoutPieces {...pieces} />
                <Region
                    visible={visibleBubble ?? true}
                    layout={{ position: 'absolute', left: -6, width: 139, top: -133, height: 140 }}
                >
                    <Bubble
                        variant="0"
                        name="bubble"
                        params={1}
                        tintColor="#fac919"
                        layout={{ width: '100%', height: '100%', justifyContent: 'center' }}
                    >
                        <Region
                            name="message"
                            params={8388752}
                            layout={{ position: 'absolute', left: 5, right: 41, top: 4, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionMessage ?? t('friendbar.request.title')}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 93 }}
                            />
                        </Region>
                        <CloseButton
                            variant="3"
                            name="button_close"
                            params={81}
                            onPointerTap={onButtonClose}
                            layout={{ position: 'absolute', right: 19, width: 19, top: 3, height: 20 }}
                        />
                        <ContainerButton
                            variant="3"
                            name="button_accept"
                            params={394449}
                            onPointerTap={onButtonAccept}
                            layout={{ position: 'absolute', marginLeft: -8.5, marginRight: 8.5, width: 96, bottom: 77, height: 27, maxWidth: 110 }}
                        >
                            <Icon
                                variant="8"
                                name="icon"
                                params={16}
                                tintColor="#00a900"
                                layout={{ position: 'absolute', left: 7, width: 17, top: 6, height: 16 }}
                            />
                            <Region
                                name="caption"
                                params={16}
                                layout={{ position: 'absolute', left: 16, width: 71, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={captionCaption ?? t('friendbar.request.accept')}
                                    textStyle="text-style-button-shiny-bold"
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                        </ContainerButton>
                        <ContainerButton
                            variant="3"
                            name="button_profile"
                            params={394449}
                            onPointerTap={onButtonProfile}
                            layout={{ position: 'absolute', marginLeft: -8.5, marginRight: 8.5, width: 96, bottom: 47, height: 27, maxWidth: 110 }}
                        >
                            <Icon
                                variant="21"
                                name="icon"
                                params={16}
                                tintColor="#00a900"
                                layout={{ position: 'absolute', left: 7, width: 17, top: 8, height: 16 }}
                            />
                            <Region
                                name="caption"
                                params={16}
                                layout={{ position: 'absolute', left: 16, width: 71, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={captionCaption2 ?? t('friendbar.request.profile')}
                                    textStyle="text-style-button-shiny-bold"
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                        </ContainerButton>
                        <FriendRequestTabLayoutClickRegionReject {...clickRegionReject} />
                    </Bubble>
                </Region>
                <FriendRequestTabLayoutIcons {...icons} />
            </Border>
        </Region>
    );
};

/** Named region `region_profile` of FriendRequestTabLayout - configured through the parent's `regionProfile` prop. */
export interface FriendRequestTabLayoutRegionProfileProps {
    layout?: BoxLayout;
    onRegionProfile?: () => void;
    srcCanvas?: string;
}

export const FriendRequestTabLayoutRegionProfile = ({ layout, onRegionProfile, srcCanvas }: FriendRequestTabLayoutRegionProfileProps) => {
    return (
        <Region
            name="region_profile"
            params={145}
            onPointerTap={onRegionProfile}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 86, top: 0, height: 24, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: -11, width: 50, top: -25, height: 70, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="canvas"
                    params={3932160}
                    src={srcCanvas}
                    layout={{ position: 'absolute', width: 10, alignSelf: 'center', height: 10 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `header` of FriendRequestTabLayout - pass real rows through its `items…` slot. */
export interface FriendRequestTabLayoutHeaderItemProps {
    captionName?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    regionProfile?: FriendRequestTabLayoutRegionProfileProps;
}

export const FriendRequestTabLayoutHeaderItem = ({ captionName, layout, onHeader, regionProfile }: FriendRequestTabLayoutHeaderItemProps) => {
    return (
        <Region
            name="header"
            params={145}
            onPointerTap={onHeader}
            cursor="pointer"
            layout={{ width: 119, height: 24, flexShrink: 0, ...layout }}
        >
            <Region
                name="name"
                tags={[ 'label' ]}
                params={16}
                layout={{ position: 'absolute', left: 33, width: 86, top: 2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionName ?? ''}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <FriendRequestTabLayoutRegionProfile {...regionProfile} />
        </Region>
    );
};

/** Named region `pieces` of FriendRequestTabLayout - configured through the parent's `pieces` prop. */
export interface FriendRequestTabLayoutPiecesProps {
    itemsPieces?: ReactNode;
    layout?: BoxLayout;
}

export const FriendRequestTabLayoutPieces = ({ itemsPieces, layout }: FriendRequestTabLayoutPiecesProps) => {
    return (
        <Region
            name="pieces"
            params={2192}
            layout={{ position: 'absolute', left: 3, right: 3, top: 7, bottom: -1, minHeight: 30, flexDirection: 'column', ...layout }}
        >
            {itemsPieces ?? (
                <FriendRequestTabLayoutHeaderItem />
            )}
        </Region>
    );
};

/** Named region `click_region_reject` of FriendRequestTabLayout - configured through the parent's `clickRegionReject` prop. */
export interface FriendRequestTabLayoutClickRegionRejectProps {
    captionLinkReject?: string;
    layout?: BoxLayout;
    onClickRegionReject?: () => void;
}

export const FriendRequestTabLayoutClickRegionReject = ({ captionLinkReject, layout, onClickRegionReject }: FriendRequestTabLayoutClickRegionRejectProps) => {
    const t = useTranslation();

    return (
        <Region
            name="click_region_reject"
            params={1233}
            onPointerTap={onClickRegionReject}
            cursor="pointer"
            layout={{ position: 'absolute', marginLeft: -8.5, marginRight: 8.5, width: 118, bottom: 26, height: 15, ...layout }}
        >
            <Region
                name="link_reject"
                params={4194320}
                layout={{ position: 'absolute', left: 0, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionLinkReject ?? t('friendbar.request.decline')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `icons` of FriendRequestTabLayout - configured through the parent's `icons` prop. */
export interface FriendRequestTabLayoutIconsProps {
    layout?: BoxLayout;
}

export const FriendRequestTabLayoutIcons = ({ layout }: FriendRequestTabLayoutIconsProps) => {
    return (
        <Region
            name="icons"
            params={262224}
            layout={{ position: 'absolute', right: 10, width: 0, top: -13, height: 25, flexDirection: 'row', gap: 2, ...layout }}
        />
    );
};
