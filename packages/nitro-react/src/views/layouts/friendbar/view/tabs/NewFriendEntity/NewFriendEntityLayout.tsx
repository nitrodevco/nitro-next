import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, CloseButton, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

import { NewFriendEntityLayoutHeaderItem } from './NewFriendEntityLayoutHeaderItem';

/** Generated from `29_new_friend_entity_xml` (layout "new_friend_entity", 127x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewFriendEntityLayoutProps {
    captionBubbleCaption?: string;
    captionBubbleLinkReject?: string;
    captionBubbleMessage?: string;
    captionBubbleTitle?: string;
    itemsIcons?: ReactNode;
    itemsPieces?: ReactNode;
    layout?: BoxLayout;
    onBubbleButtonAccept?: () => void;
    onBubbleButtonClose?: () => void;
    onBubbleClickRegionReject?: () => void;
    visibleBubble?: boolean;
}

export const NewFriendEntityLayout = ({ captionBubbleCaption, captionBubbleLinkReject, captionBubbleMessage, captionBubbleTitle, itemsIcons, itemsPieces, layout, onBubbleButtonAccept, onBubbleButtonClose, onBubbleClickRegionReject, visibleBubble }: NewFriendEntityLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 127, height: 36, ...layout }}>
            <Border
                variant="6"
                name="frame"
                tintColor="#75b986"
                layout={{ position: 'absolute', left: 0, right: 0, top: 101, height: 36 }}
            >
                <Region
                    name="icons"
                    layout={{ position: 'absolute', right: 10, width: 0, top: -13, height: 25, flexDirection: 'row', gap: 2 }}
                >
                    {itemsIcons}
                </Region>
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
                        <ThemeText
                            text={captionBubbleTitle ?? t('friendbar.game_invite.title')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 93, align: 'center' }}
                            name="bubble_title"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 5, right: 41, top: 4 }}
                        />
                        <ThemeText
                            text={captionBubbleMessage ?? ''}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 110, align: 'center' }}
                            name="bubble_message"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 5, right: 24, top: 32 }}
                        />
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
                            <ThemeText
                                text={captionBubbleCaption ?? t('friendbar.request.accept')}
                                textStyle="text-style-button-shiny-bold"
                                textOptions={{ align: 'center' }}
                                name="bubble_caption"
                                layout={{ position: 'absolute', left: 16, width: 71, top: 4, height: 17 }}
                            />
                        </ContainerButton>
                        <Region
                            name="bubble_click_region_reject"
                            onPointerTap={onBubbleClickRegionReject}
                            cursor="pointer"
                            layout={{ position: 'absolute', marginLeft: -8.5, marginRight: 8.5, width: 118, bottom: 26, height: 15 }}
                        >
                            <ThemeText
                                text={captionBubbleLinkReject ?? t('friendbar.request.decline')}
                                textStyle="text-style-u-small"
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                                name="bubble_link_reject"
                                layout={{ position: 'absolute', left: 0, top: 0, bottom: 0 }}
                            />
                        </Region>
                    </Bubble>
                )}
            </Border>
        </Region>
    );
};
