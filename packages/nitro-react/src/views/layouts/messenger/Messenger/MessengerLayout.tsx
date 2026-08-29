import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CloseButton, ContainerButton, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { MessengerLayoutConversation, MessengerLayoutConversationProps } from './MessengerLayoutConversation';
import { MessengerLayoutFollowButtonItem } from './MessengerLayoutFollowButtonItem';
import { MessengerLayoutProfileButtonItem } from './MessengerLayoutProfileButtonItem';
import { MessengerLayoutReportButtonItem } from './MessengerLayoutReportButtonItem';

/** Generated from `3094_messenger_xml` (layout "messenger", 510x385) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MessengerLayoutProps {
    avatarClickRegion?: ReactNode;
    avatarImage?: ReactNode;
    captionSeparatorLabel?: string;
    conversation?: MessengerLayoutConversationProps;
    groupBadgeImage?: ReactNode;
    inputWidget?: ReactNode;
    itemsButtonStrip?: ReactNode;
    layout?: BoxLayout;
    onAvatarClickRegion?: () => void;
    onAvatarsScrollLeft?: () => void;
    onAvatarsScrollRight?: () => void;
    onCloseConversationButton?: () => void;
    onFrame?: () => void;
    onHabbiconButton?: () => void;
    separatorWidget?: ReactNode;
    srcChatIndicator?: string;
    srcHabbiconButtonIcon?: string;
    visibleChatIndicator?: boolean;
    visibleGroupBadgeImage?: boolean;
}

export const MessengerLayout = ({ avatarClickRegion, avatarImage, captionSeparatorLabel, conversation, groupBadgeImage, inputWidget, itemsButtonStrip, layout, onAvatarClickRegion, onAvatarsScrollLeft, onAvatarsScrollRight, onCloseConversationButton, onFrame, onHabbiconButton, separatorWidget, srcChatIndicator, srcHabbiconButtonIcon, visibleChatIndicator, visibleGroupBadgeImage }: MessengerLayoutProps) => {
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
                    layout={{ position: 'absolute', left: 0, width: 282, top: 0, bottom: 0, minWidth: 282, minHeight: 275 }}
                >
                    <Region
                        name="avatar_list"
                        layout={{ position: 'absolute', left: 16, right: 6, top: 0, height: 40 }}
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
                            >
                                {avatarImage}
                            </WidgetSlot>
                            {(visibleGroupBadgeImage ?? false) && (
                                <WidgetSlot
                                    widgetType="badge_image"
                                    name="group_badge_image"
                                    options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '0.5', 'badge_image:zoom_y': '0.5', 'badge_image:fit_size_to_contents': 'true' }}
                                    layout={{ position: 'absolute', left: 8, width: 20, top: 8, height: 20 }}
                                >
                                    {groupBadgeImage}
                                </WidgetSlot>
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
                                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                            >
                                {avatarClickRegion}
                            </Region>
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
                        layout={{ position: 'absolute', right: -10, width: 15, top: 0, height: 35 }}
                    >
                        <ThemeImage
                            src={layoutImage('help_habboway_next.png')}
                            layout={{ position: 'absolute', left: 1, width: 8, top: 0, height: 35 }}
                        />
                    </Region>
                    <WidgetSlot
                        widgetType="separator"
                        layout={{ position: 'absolute', left: 0, right: -11, top: 39, height: 15 }}
                    >
                        {separatorWidget}
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
                        layout={{ position: 'absolute', left: 7, right: -3, top: 57, height: 21, flexDirection: 'row', gap: 4 }}
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
                        layout={{ position: 'absolute', right: -3, width: 20, top: 57, height: 20 }}
                    />
                    <MessengerLayoutConversation {...conversation} />
                    <ContainerButton
                        variant="102"
                        name="habbicon_button"
                        tooltip={t('messenger.habbicons.tooltip')}
                        onPointerTap={onHabbiconButton}
                        layout={{ position: 'absolute', right: -3, width: 30, bottom: 11, height: 28 }}
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
                        layout={{ position: 'absolute', left: 7, right: 31, bottom: 9, height: 30 }}
                    >
                        {inputWidget}
                    </WidgetSlot>
                </Frame>
            </Region>
        </Region>
    );
};
