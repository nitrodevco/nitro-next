import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, CloseButton, ContainerButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `29_new_friend_entity_xml` (layout "new_friend_entity", 127x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewFriendEntityLayoutProps {
    bubbleClickRegionReject?: NewFriendEntityLayoutBubbleClickRegionRejectProps;
    captionBubbleCaption?: string;
    captionBubbleMessage?: string;
    captionBubbleTitle?: string;
    icons?: NewFriendEntityLayoutIconsProps;
    layout?: BoxLayout;
    onBubbleButtonAccept?: () => void;
    onBubbleButtonClose?: () => void;
    pieces?: NewFriendEntityLayoutPiecesProps;
    visibleBubble?: boolean;
}

export const NewFriendEntityLayout = ({ bubbleClickRegionReject, captionBubbleCaption, captionBubbleMessage, captionBubbleTitle, icons, layout, onBubbleButtonAccept, onBubbleButtonClose, pieces, visibleBubble }: NewFriendEntityLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 127, height: 36, ...layout }}>
            <Border
                variant="6"
                name="frame"
                params={1}
                tintColor="#75b986"
                layout={{ position: 'absolute', left: 0, width: 127, top: 101, height: 36 }}
            >
                <NewFriendEntityLayoutIcons {...icons} />
                <NewFriendEntityLayoutPieces {...pieces} />
                <Region
                    visible={visibleBubble ?? true}
                    layout={{ position: 'absolute', left: -6, width: 139, top: -113, height: 120 }}
                >
                    <Bubble
                        variant="0"
                        name="bubble"
                        params={1}
                        tintColor="#9dbf5a"
                        layout={{ width: '100%', height: '100%', justifyContent: 'center' }}
                    >
                        <Region
                            name="bubble_title"
                            params={8388752}
                            layout={{ position: 'absolute', left: 5, right: 41, top: 4, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionBubbleTitle ?? t('friendbar.game_invite.title')}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 93, align: 'center' }}
                            />
                        </Region>
                        <Region
                            name="bubble_message"
                            params={8388752}
                            layout={{ position: 'absolute', left: 5, right: 24, top: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionBubbleMessage ?? ''}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 110, align: 'center' }}
                            />
                        </Region>
                        <CloseButton
                            variant="3"
                            name="bubble_button_close"
                            params={81}
                            onPointerTap={onBubbleButtonClose}
                            layout={{ position: 'absolute', right: 19, width: 19, top: 3, height: 20 }}
                        />
                        <ContainerButton
                            variant="3"
                            name="bubble_button_accept"
                            params={394449}
                            onPointerTap={onBubbleButtonAccept}
                            layout={{ position: 'absolute', marginLeft: -8.5, marginRight: 8.5, width: 96, bottom: 47, height: 27, maxWidth: 110 }}
                        >
                            <Icon
                                variant="8"
                                name="bubble_icon"
                                params={16}
                                tintColor="#00a900"
                                layout={{ position: 'absolute', left: 7, width: 17, top: 6, height: 16 }}
                            />
                            <Region
                                name="bubble_caption"
                                params={16}
                                layout={{ position: 'absolute', left: 16, width: 71, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={captionBubbleCaption ?? t('friendbar.request.accept')}
                                    textStyle="text-style-button-shiny-bold"
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                        </ContainerButton>
                        <NewFriendEntityLayoutBubbleClickRegionReject {...bubbleClickRegionReject} />
                    </Bubble>
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `icons` of NewFriendEntityLayout - configured through the parent's `icons` prop. */
export interface NewFriendEntityLayoutIconsProps {
    layout?: BoxLayout;
}

export const NewFriendEntityLayoutIcons = ({ layout }: NewFriendEntityLayoutIconsProps) => {
    return (
        <Region
            name="icons"
            params={262224}
            layout={{ position: 'absolute', right: 10, width: 0, top: -13, height: 25, flexDirection: 'row', gap: 2, ...layout }}
        />
    );
};

/** Named region `region_profile` of NewFriendEntityLayout - configured through the parent's `regionProfile` prop. */
export interface NewFriendEntityLayoutRegionProfileProps {
    layout?: BoxLayout;
    onRegionProfile?: () => void;
    srcCanvas?: string;
}

export const NewFriendEntityLayoutRegionProfile = ({ layout, onRegionProfile, srcCanvas }: NewFriendEntityLayoutRegionProfileProps) => {
    return (
        <Region
            name="region_profile"
            params={145}
            onPointerTap={onRegionProfile}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 86, top: 0, height: 35, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: -11, width: 50, top: -25, height: 70, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="canvas"
                    params={3932160}
                    src={srcCanvas}
                    layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 10, alignSelf: 'center', marginTop: -1, marginBottom: 1, height: 10 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `header` of NewFriendEntityLayout - pass real rows through its `items…` slot. */
export interface NewFriendEntityLayoutHeaderItemProps {
    captionName?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    regionProfile?: NewFriendEntityLayoutRegionProfileProps;
}

export const NewFriendEntityLayoutHeaderItem = ({ captionName, layout, onHeader, regionProfile }: NewFriendEntityLayoutHeaderItemProps) => {
    return (
        <Region
            name="header"
            params={145}
            onPointerTap={onHeader}
            cursor="pointer"
            layout={{ width: 119, height: 35, flexShrink: 0, ...layout }}
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
            <NewFriendEntityLayoutRegionProfile {...regionProfile} />
        </Region>
    );
};

/** Named region `pieces` of NewFriendEntityLayout - configured through the parent's `pieces` prop. */
export interface NewFriendEntityLayoutPiecesProps {
    itemsPieces?: ReactNode;
    layout?: BoxLayout;
}

export const NewFriendEntityLayoutPieces = ({ itemsPieces, layout }: NewFriendEntityLayoutPiecesProps) => {
    return (
        <Region
            name="pieces"
            params={2192}
            layout={{ position: 'absolute', left: 3, right: 3, top: 7, bottom: -6, minHeight: 30, flexDirection: 'column', ...layout }}
        >
            {itemsPieces ?? (
                <NewFriendEntityLayoutHeaderItem />
            )}
        </Region>
    );
};

/** Named region `bubble_click_region_reject` of NewFriendEntityLayout - configured through the parent's `bubbleClickRegionReject` prop. */
export interface NewFriendEntityLayoutBubbleClickRegionRejectProps {
    captionBubbleLinkReject?: string;
    layout?: BoxLayout;
    onBubbleClickRegionReject?: () => void;
}

export const NewFriendEntityLayoutBubbleClickRegionReject = ({ captionBubbleLinkReject, layout, onBubbleClickRegionReject }: NewFriendEntityLayoutBubbleClickRegionRejectProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bubble_click_region_reject"
            params={1233}
            onPointerTap={onBubbleClickRegionReject}
            cursor="pointer"
            layout={{ position: 'absolute', marginLeft: -8.5, marginRight: 8.5, width: 118, bottom: 26, height: 15, ...layout }}
        >
            <Region
                name="bubble_link_reject"
                params={4194320}
                layout={{ position: 'absolute', left: 0, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionBubbleLinkReject ?? t('friendbar.request.decline')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};
