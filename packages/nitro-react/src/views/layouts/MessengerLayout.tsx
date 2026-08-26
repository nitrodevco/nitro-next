import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CloseButton, ContainerButton, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `3094_messenger_xml` (layout "messenger", 510x385) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MessengerLayoutProps {
    layout?: BoxLayout;
    onCloseConversationButton?: () => void;
    onFollowButton?: () => void;
    onFrame?: () => void;
    onHabbiconButton?: () => void;
    onProfileButton?: () => void;
    onReportButton?: () => void;
}

export const MessengerLayout = ({ layout, onCloseConversationButton, onFollowButton, onFrame, onHabbiconButton, onProfileButton, onReportButton }: MessengerLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 510, height: 385, ...layout }}>
            <Region
                params={32771}
                layout={{ position: 'absolute', left: 120, width: 510, top: 120, height: 385, minWidth: 282, minHeight: 275 }}
            >
                <Frame
                    variant="100"
                    id="frame"
                    name="frame"
                    params={12648449}
                    caption={t('messenger.window.title')}
                    onClose={onFrame}
                    layout={{ position: 'absolute', left: 0, width: 282, top: 0, height: 385, minWidth: 282, minHeight: 275 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                        <Region
                            name="avatar_list"
                            params={144}
                            layout={{ position: 'absolute', left: 16, width: 248, top: 0, height: 40 }}
                        >
                            <Border
                                variant="102"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 35, top: 0, height: 35 }}
                            >
                                <WidgetSlot
                                    widgetType="avatar_image"
                                    name="avatar_image"
                                    params={16}
                                    options={{ 'avatar_image:scale': 'sh', 'avatar_image:only_head': 'true' }}
                                    layout={{ position: 'absolute', left: -3, width: 45, top: -14, height: 72 }}
                                />
                                <WidgetSlot
                                    widgetType="badge_image"
                                    name="group_badge_image"
                                    params={16}
                                    visible={false}
                                    options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '0.5', 'badge_image:zoom_y': '0.5', 'badge_image:fit_size_to_contents': 'true' }}
                                    layout={{ position: 'absolute', left: 8, width: 20, top: 8, height: 20 }}
                                />
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 19, width: 13, top: 6, height: 12 }}
                                >
                                    <ThemeImage
                                        name="chat_indicator"
                                        params={16}
                                        src={layoutImage('common_chat_indicator.png')}
                                        layout={{ position: 'absolute', left: 19, width: 13, top: 6, height: 12 }}
                                    />
                                </Region>
                                <Region
                                    name="avatar_click_region"
                                    params={17}
                                    layout={{ position: 'absolute', left: 0, width: 35, top: 0, height: 35 }}
                                />
                            </Border>
                        </Region>
                        <Region
                            name="avatars_scroll_left"
                            params={17}
                            layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 35 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('help_habboway_prev.png')}
                                layout={{ position: 'absolute', left: 7, width: 8, top: 0, height: 35 }}
                            />
                        </Region>
                        <Region
                            name="avatars_scroll_right"
                            params={81}
                            layout={{ position: 'absolute', left: 265, width: 15, top: 0, height: 35 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('help_habboway_next.png')}
                                layout={{ position: 'absolute', left: 1, width: 8, top: 0, height: 35 }}
                            />
                        </Region>
                        <WidgetSlot
                            widgetType="separator"
                            params={144}
                            layout={{ position: 'absolute', left: 0, width: 281, top: 39, height: 15 }}
                        >
                            <Region
                                name="separator_label"
                                params={3088}
                                layout={{ position: 'absolute', left: 0, width: 157, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('messenger.window.separator')}
                                    textStyle="text-style-il-border"
                                    textOptions={{ fill: '#444444' }}
                                />
                            </Region>
                        </WidgetSlot>
                        <Region
                            name="button_strip"
                            params={144}
                            layout={{ position: 'absolute', left: 7, width: 266, top: 57, height: 21, flexDirection: 'row', gap: 4 }}
                        >
                            <ContainerButton
                                variant="102"
                                name="follow_button"
                                tooltip={t('messenger.followfriend.tooltip')}
                                params={131089}
                                onPointerTap={onFollowButton}
                                layout={{ width: 21, height: 20, flexShrink: 0, maxHeight: 20 }}
                            >
                                Follow
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('messenger_visit_icon.png')}
                                    layout={{ position: 'absolute', left: 6, width: 9, top: 5, height: 10 }}
                                />
                            </ContainerButton>
                            <ContainerButton
                                variant="102"
                                name="profile_button"
                                tooltip={t('infostand.profile.link.tooltip')}
                                params={131089}
                                onPointerTap={onProfileButton}
                                layout={{ width: 30, height: 20, flexShrink: 0, maxHeight: 20 }}
                            >
                                Profile
                                <ThemeImage
                                    params={16}
                                    src={layoutImage('messenger_profile_icon.png')}
                                    layout={{ position: 'absolute', left: 7, width: 16, top: 4, height: 12 }}
                                />
                            </ContainerButton>
                            <Button
                                variant="102"
                                name="report_button"
                                tooltip={t('messenger.window.button.report.tooltip')}
                                params={131089}
                                onPointerTap={onReportButton}
                                textStyle="text-style-il-button"
                                layout={{ width: 193, height: 20, flexShrink: 0, maxHeight: 20 }}
                            >
                                {t('messenger.window.button.report')}
                            </Button>
                        </Region>
                        <CloseButton
                            variant="100"
                            name="close_conversation_button"
                            params={65}
                            onPointerTap={onCloseConversationButton}
                            layout={{ position: 'absolute', left: 253, width: 20, top: 57, height: 20 }}
                        />
                        <ScrollArea
                            orientation="vertical"
                            layout={{ position: 'absolute', left: 7, width: 266, top: 84, height: 212 }}
                        >
                            <Region
                                name="conversation"
                                params={2192}
                                layout={{ flexDirection: 'column', width: '100%' }}
                            >
                                <WidgetSlot
                                    widgetType="illumina_chat_bubble"
                                    name="msg_normal"
                                    params={147472}
                                    options={{ 'illumina_chat_bubble:figure': 'hd-180-1.ch-210-66.lg-270-82.sh-290-81' }}
                                    layout={{ width: 259, height: 60, flexShrink: 0 }}
                                />
                                <Border
                                    variant="105"
                                    name="msg_notification"
                                    params={147472}
                                    layout={{ width: 255, height: 50, flexShrink: 0 }}
                                >
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('messenger_caution.png')}
                                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                                    />
                                    <Region
                                        name="content"
                                        params={3088}
                                        layout={{ position: 'absolute', left: 50, width: 205, top: 15, height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    />
                                </Border>
                                <Border
                                    variant="105"
                                    name="msg_invitation"
                                    params={147472}
                                    tintColor="#d1efde"
                                    layout={{ width: 255, height: 50, flexShrink: 0 }}
                                >
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('messenger_notification_icon.png')}
                                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                                    />
                                    <Region
                                        name="content"
                                        params={3088}
                                        layout={{ position: 'absolute', left: 50, width: 205, top: 15, height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    />
                                </Border>
                                <Region
                                    name="msg_info"
                                    params={147472}
                                    layout={{ width: 255, height: 24, flexShrink: 0 }}
                                >
                                    <Region
                                        name="content"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 255, top: 0, height: 24, minWidth: 255, maxWidth: 255, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                    />
                                </Region>
                            </Region>
                        </ScrollArea>
                        <ContainerButton
                            variant="102"
                            name="habbicon_button"
                            tooltip={t('messenger.habbicons.tooltip')}
                            params={1105}
                            onPointerTap={onHabbiconButton}
                            layout={{ position: 'absolute', left: 243, width: 30, top: 305, height: 28 }}
                        >
                            <ThemeImage
                                name="habbicon_button_icon"
                                params={16}
                                src={layoutImage('habbicons_habbicons_dm.png')}
                                layout={{ position: 'absolute', left: 8, width: 14, top: 7, height: 14 }}
                            />
                        </ContainerButton>
                        <WidgetSlot
                            widgetType="illumina_input"
                            name="input_widget"
                            params={1168}
                            options={{ 'illumina_input:empty_message': '${messenger.window.input.default}', 'illumina_input:max_chars': '120' }}
                            layout={{ position: 'absolute', left: 7, width: 232, top: 305, height: 30 }}
                        />
                    </Region>
                </Frame>
            </Region>
        </Region>
    );
};
