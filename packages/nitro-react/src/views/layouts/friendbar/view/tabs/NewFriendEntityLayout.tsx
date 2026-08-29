import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, CloseButton, ContainerButton, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `29_new_friend_entity_xml` (layout "new_friend_entity", 127x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewFriendEntityLayoutProps {
    captionBubbleCaption?: string;
    captionBubbleLinkReject?: string;
    captionBubbleMessage?: string;
    captionBubbleTitle?: string;
    itemsPieces?: ReactNode;
    layout?: BoxLayout;
    onBubbleButtonAccept?: () => void;
    onBubbleButtonClose?: () => void;
    onBubbleClickRegionReject?: () => void;
    visibleBubble?: boolean;
}

export const NewFriendEntityLayout = ({ captionBubbleCaption, captionBubbleLinkReject, captionBubbleMessage, captionBubbleTitle, itemsPieces, layout, onBubbleButtonAccept, onBubbleButtonClose, onBubbleClickRegionReject, visibleBubble }: NewFriendEntityLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 127, height: 36, ...layout }}>
            <Border
                variant="6"
                name="frame"
                tintColor="#75b986"
                layout={{ position: 'absolute', left: 0, width: 127, top: 101, height: 36 }}
            >
                <Region
                    name="icons"
                    layout={{ position: 'absolute', right: 10, width: 0, top: -13, height: 25, flexDirection: 'row', gap: 2 }}
                />
                <Region
                    name="pieces"
                    layout={{ position: 'absolute', left: 3, right: 3, top: 7, bottom: -6, minHeight: 30, flexDirection: 'column' }}
                >
                    {itemsPieces ?? (
                        <NewFriendEntityLayoutHeaderItem />
                    )}
                </Region>
                {(visibleBubble ?? true) && (
                    <Bubble
                        variant="0"
                        name="bubble"
                        tintColor="#9dbf5a"
                        layout={{ position: 'absolute', left: -6, width: 139, top: -113, height: 120, justifyContent: 'center' }}
                    >
                        <Region
                            name="bubble_title"
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
                            onPointerTap={onBubbleButtonClose}
                            layout={{ position: 'absolute', right: 19, width: 19, top: 3, height: 20 }}
                        />
                        <ContainerButton
                            variant="3"
                            name="bubble_button_accept"
                            onPointerTap={onBubbleButtonAccept}
                            layout={{ position: 'absolute', marginLeft: -8.5, marginRight: 8.5, width: 96, bottom: 47, height: 27, maxWidth: 110 }}
                        >
                            <Icon
                                variant="8"
                                name="bubble_icon"
                                tintColor="#00a900"
                                layout={{ position: 'absolute', left: 7, width: 17, top: 6, height: 16 }}
                            />
                            <Region
                                name="bubble_caption"
                                layout={{ position: 'absolute', left: 16, width: 71, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={captionBubbleCaption ?? t('friendbar.request.accept')}
                                    textStyle="text-style-button-shiny-bold"
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                        </ContainerButton>
                        <Region
                            name="bubble_click_region_reject"
                            onPointerTap={onBubbleClickRegionReject}
                            cursor="pointer"
                            layout={{ position: 'absolute', marginLeft: -8.5, marginRight: 8.5, width: 118, bottom: 26, height: 15 }}
                        >
                            <Region
                                name="bubble_link_reject"
                                layout={{ position: 'absolute', left: 0, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={captionBubbleLinkReject ?? t('friendbar.request.decline')}
                                    textStyle="text-style-u-small"
                                    textOptions={{ fill: '#ffffff', align: 'center' }}
                                />
                            </Region>
                        </Region>
                    </Bubble>
                )}
            </Border>
        </Region>
    );
};

/** Row template `header` of NewFriendEntityLayout - pass real rows through its `items…` slot. */
export interface NewFriendEntityLayoutHeaderItemProps {
    captionName?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    onRegionProfile?: () => void;
    srcCanvas?: string;
}

export const NewFriendEntityLayoutHeaderItem = ({ captionName, layout, onHeader, onRegionProfile, srcCanvas }: NewFriendEntityLayoutHeaderItemProps) => {
    return (
        <Region
            name="header"
            onPointerTap={onHeader}
            cursor="pointer"
            layout={{ width: 119, height: 35, flexShrink: 0, ...layout }}
        >
            <Region
                name="name"
                layout={{ position: 'absolute', left: 33, width: 86, top: 2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionName ?? ''}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="region_profile"
                onPointerTap={onRegionProfile}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 86, top: 0, height: 35 }}
            >
                <Region layout={{ position: 'absolute', left: -11, width: 50, top: -25, height: 70, justifyContent: 'center' }}>
                    <ThemeImage
                        name="canvas"
                        src={srcCanvas}
                        layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 10, alignSelf: 'center', marginTop: -1, marginBottom: 1, height: 10 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
