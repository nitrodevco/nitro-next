import { BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `40_message_list_item_xml` (layout "message_list_item", 670x126) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MessageListItemLayoutProps {
    containerLayer?: MessageListItemLayoutContainerLayerProps;
    layout?: BoxLayout;
}

export const MessageListItemLayout = ({ containerLayer, layout }: MessageListItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 670, height: 126, ...layout }}>
            <MessageListItemLayoutContainerLayer {...containerLayer} />
        </Region>
    );
};

/** Named region `message_text_container` of MessageListItemLayout - configured through the parent's `messageTextContainer` prop. */
export interface MessageListItemLayoutMessageTextContainerProps {
    captionMessageText?: string;
    layout?: BoxLayout;
}

export const MessageListItemLayoutMessageTextContainer = ({ captionMessageText, layout }: MessageListItemLayoutMessageTextContainerProps) => {
    return (
        <Region
            name="message_text_container"
            params={144}
            layout={{ position: 'absolute', left: 130, right: 0, top: 0, height: 100, minHeight: 100, ...layout }}
        >
            <Region
                name="message_text"
                params={16536}
                layout={{ position: 'absolute', left: 6, right: 0, top: 2, height: 21, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMessageText ?? 'Message text'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 534 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `avatar_image` of MessageListItemLayout - configured through the parent's `avatarImage` prop. */
export interface MessageListItemLayoutAvatarImageProps {
    captionAuthor?: string;
    captionAuthorPostCount?: string;
    layout?: BoxLayout;
    onAvatarImage?: () => void;
}

export const MessageListItemLayoutAvatarImage = ({ captionAuthor, captionAuthorPostCount, layout, onAvatarImage }: MessageListItemLayoutAvatarImageProps) => {
    return (
        <Region
            name="avatar_image"
            params={18449}
            backgroundColor="#c7eff8"
            onPointerTap={onAvatarImage}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 130, top: 0, bottom: 0, minHeight: 100, ...layout }}
        >
            <Region
                name="author"
                params={144}
                layout={{ position: 'absolute', left: 2, right: 2, top: 5, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionAuthor ?? 'AuthorName'}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <WidgetSlot
                widgetType="avatar_image"
                name="avatar_widget"
                params={16}
                layout={{ position: 'absolute', left: -20, width: 90, top: 10, height: 130 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_widget"
                params={16}
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 75, width: 40, top: 60, height: 40 }}
            />
            <Region
                name="author_post_count"
                params={16}
                layout={{ position: 'absolute', left: 2, width: 126, top: 23, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionAuthorPostCount ?? 'AuthorPosts'} />
            </Region>
        </Region>
    );
};

/** Named region `msg_container` of MessageListItemLayout - configured through the parent's `msgContainer` prop. */
export interface MessageListItemLayoutMsgContainerProps {
    avatarImage?: MessageListItemLayoutAvatarImageProps;
    layout?: BoxLayout;
    messageTextContainer?: MessageListItemLayoutMessageTextContainerProps;
}

export const MessageListItemLayoutMsgContainer = ({ avatarImage, layout, messageTextContainer }: MessageListItemLayoutMsgContainerProps) => {
    return (
        <Region
            name="msg_container"
            params={18576}
            layout={{ position: 'absolute', left: 0, right: 0, top: 26, bottom: 0, ...layout }}
        >
            <MessageListItemLayoutMessageTextContainer {...messageTextContainer} />
            <MessageListItemLayoutAvatarImage {...avatarImage} />
        </Region>
    );
};

/** Named region `delete_message` of MessageListItemLayout - configured through the parent's `deleteMessage` prop. */
export interface MessageListItemLayoutDeleteMessageProps {
    layout?: BoxLayout;
    onDeleteMessage?: () => void;
    srcIcon?: string;
}

export const MessageListItemLayoutDeleteMessage = ({ layout, onDeleteMessage, srcIcon }: MessageListItemLayoutDeleteMessageProps) => {
    return (
        <Region
            name="delete_message"
            params={17}
            backgroundColor="#de4537"
            onPointerTap={onDeleteMessage}
            cursor="pointer"
            layout={{ width: 22, height: 26, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="icon"
                params={16}
                src={srcIcon ?? layoutImage('forum_forum_hide.png')}
                layout={{ position: 'absolute', left: 4, width: 16, top: 5, height: 16 }}
            />
        </Region>
    );
};

/** Named region `report_message` of MessageListItemLayout - configured through the parent's `reportMessage` prop. */
export interface MessageListItemLayoutReportMessageProps {
    layout?: BoxLayout;
    onReportMessage?: () => void;
    srcIcon?: string;
}

export const MessageListItemLayoutReportMessage = ({ layout, onReportMessage, srcIcon }: MessageListItemLayoutReportMessageProps) => {
    return (
        <Region
            name="report_message"
            params={17}
            backgroundColor="#ff9c65"
            onPointerTap={onReportMessage}
            cursor="pointer"
            layout={{ width: 22, height: 26, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="icon"
                params={16}
                src={srcIcon ?? layoutImage('forum_forum_report.png')}
                layout={{ position: 'absolute', left: 2, width: 17, top: 6, height: 15 }}
            />
        </Region>
    );
};

/** Named region `reply_message` of MessageListItemLayout - configured through the parent's `replyMessage` prop. */
export interface MessageListItemLayoutReplyMessageProps {
    layout?: BoxLayout;
    onReplyMessage?: () => void;
    srcIcon?: string;
}

export const MessageListItemLayoutReplyMessage = ({ layout, onReplyMessage, srcIcon }: MessageListItemLayoutReplyMessageProps) => {
    return (
        <Region
            name="reply_message"
            params={17}
            backgroundColor="#45a3d9"
            onPointerTap={onReplyMessage}
            cursor="pointer"
            layout={{ width: 22, height: 26, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="icon"
                params={16}
                src={srcIcon ?? layoutImage('forum_reply.png')}
                layout={{ position: 'absolute', left: 2, width: 17, top: 6, height: 15 }}
            />
        </Region>
    );
};

/** Named region `texts_container` of MessageListItemLayout - configured through the parent's `textsContainer` prop. */
export interface MessageListItemLayoutTextsContainerProps {
    captionDate?: string;
    captionReplyNum?: string;
    deleteMessage?: MessageListItemLayoutDeleteMessageProps;
    layout?: BoxLayout;
    replyMessage?: MessageListItemLayoutReplyMessageProps;
    reportMessage?: MessageListItemLayoutReportMessageProps;
}

export const MessageListItemLayoutTextsContainer = ({ captionDate, captionReplyNum, deleteMessage, layout, replyMessage, reportMessage }: MessageListItemLayoutTextsContainerProps) => {
    return (
        <Region
            name="texts_container"
            params={144}
            backgroundColor="#227aad"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 26, ...layout }}
        >
            <Region
                name="date"
                params={144}
                layout={{ position: 'absolute', left: 0, right: 0, top: 4, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDate ?? '10 days ago'}
                    textOptions={{ fill: '#eeeeee' }}
                />
            </Region>
            <Region
                params={80}
                layout={{ position: 'absolute', right: 0, width: 106, top: 0, height: 26, flexDirection: 'row' }}
            >
                <Region
                    name="reply_num"
                    params={16}
                    layout={{ width: 40, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionReplyNum ?? '#5'}
                        textOptions={{ fill: '#eeeeee', align: 'right' }}
                    />
                </Region>
                <MessageListItemLayoutDeleteMessage {...deleteMessage} />
                <MessageListItemLayoutReportMessage {...reportMessage} />
                <MessageListItemLayoutReplyMessage {...replyMessage} />
            </Region>
        </Region>
    );
};

/** Named region `container_layer` of MessageListItemLayout - configured through the parent's `containerLayer` prop. */
export interface MessageListItemLayoutContainerLayerProps {
    layout?: BoxLayout;
    msgContainer?: MessageListItemLayoutMsgContainerProps;
    textsContainer?: MessageListItemLayoutTextsContainerProps;
}

export const MessageListItemLayoutContainerLayer = ({ layout, msgContainer, textsContainer }: MessageListItemLayoutContainerLayerProps) => {
    return (
        <Region
            name="container_layer"
            params={16400}
            layout={{ position: 'absolute', left: 0, width: 670, top: 0, height: 126, minWidth: 0, minHeight: 0, ...layout }}
        >
            <MessageListItemLayoutMsgContainer {...msgContainer} />
            <MessageListItemLayoutTextsContainer {...textsContainer} />
        </Region>
    );
};
