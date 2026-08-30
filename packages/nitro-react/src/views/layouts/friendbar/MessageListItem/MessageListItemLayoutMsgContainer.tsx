import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Named region `msg_container` of MessageListItemLayout - configured through the parent's `msgContainer` prop. */
export interface MessageListItemLayoutMsgContainerProps {
    avatarWidget?: ReactNode;
    badgeWidget?: ReactNode;
    captionAuthor?: string;
    captionAuthorPostCount?: string;
    captionMessageText?: string;
    layout?: BoxLayout;
    onAvatarImage?: () => void;
}

export const MessageListItemLayoutMsgContainer = ({ avatarWidget, badgeWidget, captionAuthor, captionAuthorPostCount, captionMessageText, layout, onAvatarImage }: MessageListItemLayoutMsgContainerProps) => {
    return (
        <Region
            name="msg_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 26, bottom: 0, ...layout }}
        >
            <Region
                name="message_text_container"
                layout={{ position: 'absolute', left: 130, right: 0, top: 0, bottom: 0, minHeight: 100 }}
            >
                <ThemeText
                    text={captionMessageText ?? 'Message text'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 534 }}
                    name="message_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 6, right: 0, top: 2, height: 21 }}
                />
            </Region>
            <Region
                name="avatar_image"
                backgroundColor="#c7eff8"
                onPointerTap={onAvatarImage}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 130, top: 0, bottom: 0, minHeight: 100 }}
            >
                <ThemeText
                    text={captionAuthor ?? 'AuthorName'}
                    textStyle="text-style-u-bold"
                    name="author"
                    layout={{ position: 'absolute', left: 2, right: 2, top: 5, height: 20 }}
                />
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_widget"
                    layout={{ position: 'absolute', left: -20, width: 90, top: 10, height: 130 }}
                >
                    {avatarWidget}
                </WidgetSlot>
                <WidgetSlot
                    widgetType="badge_image"
                    name="badge_widget"
                    options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 75, width: 40, top: 60, height: 40 }}
                >
                    {badgeWidget}
                </WidgetSlot>
                <ThemeText
                    text={captionAuthorPostCount ?? 'AuthorPosts'}
                    name="author_post_count"
                    layout={{ position: 'absolute', left: 2, width: 126, top: 23, height: 20 }}
                />
            </Region>
        </Region>
    );
};
