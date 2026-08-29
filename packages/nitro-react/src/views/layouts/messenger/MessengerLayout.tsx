import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, ContainerButton, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `3094_messenger_xml` (layout "messenger", 510x385) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MessengerLayoutProps {
    captionSeparatorLabel?: string;
    conversation?: MessengerLayoutConversationProps;
    itemsButtonStrip?: ReactNode;
    layout?: BoxLayout;
    onAvatarClickRegion?: () => void;
    onAvatarsScrollLeft?: () => void;
    onAvatarsScrollRight?: () => void;
    onCloseConversationButton?: () => void;
    onFrame?: () => void;
    onHabbiconButton?: () => void;
    srcChatIndicator?: string;
    srcHabbiconButtonIcon?: string;
    visibleChatIndicator?: boolean;
    visibleGroupBadgeImage?: boolean;
}

export const MessengerLayout = ({ captionSeparatorLabel, conversation, itemsButtonStrip, layout, onAvatarClickRegion, onAvatarsScrollLeft, onAvatarsScrollRight, onCloseConversationButton, onFrame, onHabbiconButton, srcChatIndicator, srcHabbiconButtonIcon, visibleChatIndicator, visibleGroupBadgeImage }: MessengerLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 510, height: 385, ...layout }}>
            <Region layout={{ position: 'absolute', left: 120, width: 510, top: 120, height: 385, minWidth: 282, minHeight: 275 }}>
                <Frame
                    variant="100"
                    id="frame"
                    name="frame"
                    caption={t('messenger.window.title')}
                    onClose={onFrame}
                    layout={{ position: 'absolute', left: 0, width: 282, top: 0, height: 385, minWidth: 282, minHeight: 275 }}
                >
                    <Region
                        name="avatar_list"
                        layout={{ position: 'absolute', left: 16, right: 18, top: 0, height: 40 }}
                    >
                        <Border
                            variant="102"
                            layout={{ position: 'absolute', left: 0, width: 35, top: 0, height: 35 }}
                        >
                            <WidgetSlot
                                widgetType="avatar_image"
                                name="avatar_image"
                                options={{ 'avatar_image:scale': 'sh', 'avatar_image:only_head': 'true' }}
                                layout={{ position: 'absolute', left: -3, width: 45, top: -14, height: 72 }}
                            />
                            {(visibleGroupBadgeImage ?? false) && (
                                <WidgetSlot
                                    widgetType="badge_image"
                                    name="group_badge_image"
                                    options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '0.5', 'badge_image:zoom_y': '0.5', 'badge_image:fit_size_to_contents': 'true' }}
                                    layout={{ position: 'absolute', left: 8, width: 20, top: 8, height: 20 }}
                                />
                            )}
                            {(visibleChatIndicator ?? false) && (
                                <ThemeImage
                                    name="chat_indicator"
                                    src={srcChatIndicator ?? layoutImage('common_chat_indicator.png')}
                                    layout={{ position: 'absolute', left: 19, width: 13, top: 6, height: 12 }}
                                />
                            )}
                            <Region
                                name="avatar_click_region"
                                onPointerTap={onAvatarClickRegion}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 35, top: 0, height: 35 }}
                            />
                        </Border>
                    </Region>
                    <Region
                        name="avatars_scroll_left"
                        onPointerTap={onAvatarsScrollLeft}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 35 }}
                    >
                        <ThemeImage
                            src={layoutImage('help_habboway_prev.png')}
                            layout={{ position: 'absolute', left: 7, width: 8, top: 0, height: 35 }}
                        />
                    </Region>
                    <Region
                        name="avatars_scroll_right"
                        onPointerTap={onAvatarsScrollRight}
                        cursor="pointer"
                        layout={{ position: 'absolute', right: 2, width: 15, top: 0, height: 35 }}
                    >
                        <ThemeImage
                            src={layoutImage('help_habboway_next.png')}
                            layout={{ position: 'absolute', left: 1, width: 8, top: 0, height: 35 }}
                        />
                    </Region>
                    <WidgetSlot
                        widgetType="separator"
                        layout={{ position: 'absolute', left: 0, right: 1, top: 39, height: 15 }}
                    >
                        <Region
                            name="separator_label"
                            layout={{ position: 'absolute', left: 0, width: 157, alignSelf: 'center', height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionSeparatorLabel ?? t('messenger.window.separator')}
                                textStyle="text-style-il-border"
                                textOptions={{ fill: '#444444' }}
                            />
                        </Region>
                    </WidgetSlot>
                    <Region
                        name="button_strip"
                        layout={{ position: 'absolute', left: 7, right: 9, top: 57, height: 21, flexDirection: 'row', gap: 4 }}
                    >
                        {itemsButtonStrip ?? (
                            <>
                                <MessengerLayoutFollowButtonItem />
                                <MessengerLayoutProfileButtonItem />
                                <MessengerLayoutReportButtonItem />
                            </>
                        )}
                    </Region>
                    <CloseButton
                        variant="100"
                        name="close_conversation_button"
                        onPointerTap={onCloseConversationButton}
                        layout={{ position: 'absolute', right: 9, width: 20, top: 57, height: 20 }}
                    />
                    <MessengerLayoutConversation {...conversation} />
                    <ContainerButton
                        variant="102"
                        name="habbicon_button"
                        tooltip={t('messenger.habbicons.tooltip')}
                        onPointerTap={onHabbiconButton}
                        layout={{ position: 'absolute', right: 9, width: 30, bottom: 52, height: 28 }}
                    >
                        <ThemeImage
                            name="habbicon_button_icon"
                            src={srcHabbiconButtonIcon ?? layoutImage('habbicons_habbicons_dm.png')}
                            layout={{ position: 'absolute', left: 8, width: 14, top: 7, height: 14 }}
                        />
                    </ContainerButton>
                    <WidgetSlot
                        widgetType="illumina_input"
                        name="input_widget"
                        options={{ 'illumina_input:empty_message': '${messenger.window.input.default}', 'illumina_input:max_chars': '120' }}
                        layout={{ position: 'absolute', left: 7, right: 43, bottom: 50, height: 30 }}
                    />
                </Frame>
            </Region>
        </Region>
    );
};

/** Row template `follow_button` of MessengerLayout - pass real rows through its `items…` slot. */
export interface MessengerLayoutFollowButtonItemProps {
    layout?: BoxLayout;
    onFollowButton?: () => void;
}

export const MessengerLayoutFollowButtonItem = ({ layout, onFollowButton }: MessengerLayoutFollowButtonItemProps) => {
    const t = useTranslation();

    return (
        <ContainerButton
            variant="102"
            name="follow_button"
            tooltip={t('messenger.followfriend.tooltip')}
            onPointerTap={onFollowButton}
            layout={{ width: 21, height: 20, flexShrink: 0, maxHeight: 20, ...layout }}
        >
            <ThemeImage
                src={layoutImage('messenger_visit_icon.png')}
                layout={{ position: 'absolute', left: 6, width: 9, top: 5, height: 10 }}
            />
        </ContainerButton>
    );
};

/** Row template `profile_button` of MessengerLayout - pass real rows through its `items…` slot. */
export interface MessengerLayoutProfileButtonItemProps {
    layout?: BoxLayout;
    onProfileButton?: () => void;
}

export const MessengerLayoutProfileButtonItem = ({ layout, onProfileButton }: MessengerLayoutProfileButtonItemProps) => {
    const t = useTranslation();

    return (
        <ContainerButton
            variant="102"
            name="profile_button"
            tooltip={t('infostand.profile.link.tooltip')}
            onPointerTap={onProfileButton}
            layout={{ width: 30, height: 20, flexShrink: 0, maxHeight: 20, ...layout }}
        >
            <ThemeImage
                src={layoutImage('messenger_profile_icon.png')}
                layout={{ position: 'absolute', left: 7, width: 16, top: 4, height: 12 }}
            />
        </ContainerButton>
    );
};

/** Row template `report_button` of MessengerLayout - pass real rows through its `items…` slot. */
export interface MessengerLayoutReportButtonItemProps {
    layout?: BoxLayout;
    onReportButton?: () => void;
}

export const MessengerLayoutReportButtonItem = ({ layout, onReportButton }: MessengerLayoutReportButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="102"
            name="report_button"
            tooltip={t('messenger.window.button.report.tooltip')}
            onPointerTap={onReportButton}
            textStyle="text-style-il-button"
            layout={{ width: 193, height: 20, flexShrink: 0, maxHeight: 20, ...layout }}
        >
            {t('messenger.window.button.report')}
        </Button>
    );
};

/** Row template `msg_normal` of MessengerLayout - pass real rows through its `items…` slot. */
export interface MessengerLayoutMsgNormalItemProps {
    layout?: BoxLayout;
}

export const MessengerLayoutMsgNormalItem = ({ layout }: MessengerLayoutMsgNormalItemProps) => {
    return (
        <WidgetSlot
            widgetType="illumina_chat_bubble"
            name="msg_normal"
            options={{ 'illumina_chat_bubble:figure': 'hd-180-1.ch-210-66.lg-270-82.sh-290-81' }}
            layout={{ width: 259, height: 60, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `msg_notification` of MessengerLayout - pass real rows through its `items…` slot. */
export interface MessengerLayoutMsgNotificationItemProps {
    captionContent?: string;
    layout?: BoxLayout;
}

export const MessengerLayoutMsgNotificationItem = ({ captionContent, layout }: MessengerLayoutMsgNotificationItemProps) => {
    return (
        <Border
            variant="105"
            name="msg_notification"
            layout={{ width: 255, height: 50, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('messenger_caution.png')}
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
            />
            <Region
                name="content"
                layout={{ position: 'absolute', left: 50, width: 205, alignSelf: 'center', height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionContent ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 205 }}
                />
            </Region>
        </Border>
    );
};

/** Row template `msg_invitation` of MessengerLayout - pass real rows through its `items…` slot. */
export interface MessengerLayoutMsgInvitationItemProps {
    captionContent?: string;
    layout?: BoxLayout;
}

export const MessengerLayoutMsgInvitationItem = ({ captionContent, layout }: MessengerLayoutMsgInvitationItemProps) => {
    return (
        <Border
            variant="105"
            name="msg_invitation"
            tintColor="#d1efde"
            layout={{ width: 255, height: 50, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('messenger_notification_icon.png')}
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
            />
            <Region
                name="content"
                layout={{ position: 'absolute', left: 50, width: 205, alignSelf: 'center', height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionContent ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 205 }}
                />
            </Region>
        </Border>
    );
};

/** Row template `msg_info` of MessengerLayout - pass real rows through its `items…` slot. */
export interface MessengerLayoutMsgInfoItemProps {
    captionContent?: string;
    layout?: BoxLayout;
}

export const MessengerLayoutMsgInfoItem = ({ captionContent, layout }: MessengerLayoutMsgInfoItemProps) => {
    return (
        <Region
            name="msg_info"
            layout={{ width: 255, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionContent ?? ''}
                textOptions={{ wordWrap: true, wordWrapWidth: 255, align: 'center' }}
            />
        </Region>
    );
};

/** Named region `conversation` of MessengerLayout - configured through the parent's `conversation` prop. */
export interface MessengerLayoutConversationProps {
    itemsConversation?: ReactNode;
    layout?: BoxLayout;
}

export const MessengerLayoutConversation = ({ itemsConversation, layout }: MessengerLayoutConversationProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 7, right: 9, top: 84, bottom: 89, ...layout }}
        >
            <Region
                name="conversation"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsConversation ?? (
                    <>
                        <MessengerLayoutMsgNormalItem />
                        <MessengerLayoutMsgNotificationItem />
                        <MessengerLayoutMsgInvitationItem />
                        <MessengerLayoutMsgInfoItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};
