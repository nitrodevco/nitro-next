import { BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `40_message_list_item_xml` (layout "message_list_item", 670x126) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MessageListItemLayoutProps {
    layout?: BoxLayout;
}

export const MessageListItemLayout = ({ layout }: MessageListItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 670, height: 126, ...layout }}>
            <Region
                name="container_layer"
                params={16400}
                layout={{ position: 'absolute', left: 0, width: 670, top: 0, height: 126, minWidth: 0, minHeight: 0 }}
            >
                <Region
                    name="msg_container"
                    params={18576}
                    layout={{ position: 'absolute', left: 0, width: 670, top: 26, height: 100 }}
                >
                    <Region
                        name="message_text_container"
                        params={144}
                        layout={{ position: 'absolute', left: 130, width: 540, top: 0, height: 100, minHeight: 100 }}
                    >
                        <Region
                            name="message_text"
                            params={16536}
                            layout={{ position: 'absolute', left: 6, width: 534, top: 2, height: 21, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Message text"
                                textOptions={{ wordWrap: true, wordWrapWidth: 534 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="avatar_image"
                        params={18449}
                        backgroundColor="#c7eff8"
                        layout={{ position: 'absolute', left: 0, width: 130, top: 0, height: 100, minHeight: 100 }}
                    >
                        <Region
                            name="author"
                            params={144}
                            layout={{ position: 'absolute', left: 2, width: 126, top: 5, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="AuthorName"
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
                            <ThemeText text="AuthorPosts" />
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="texts_container"
                    params={144}
                    backgroundColor="#227aad"
                    layout={{ position: 'absolute', left: 0, width: 670, top: 0, height: 26 }}
                >
                    <Region
                        name="date"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 670, top: 4, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="10 days ago"
                            textOptions={{ fill: '#eeeeee' }}
                        />
                    </Region>
                    <Region
                        params={80}
                        layout={{ position: 'absolute', left: 564, width: 106, top: 0, height: 26, flexDirection: 'row' }}
                    >
                        <Region
                            name="reply_num"
                            params={16}
                            layout={{ width: 40, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                        >
                            <ThemeText
                                text="#5"
                                textOptions={{ fill: '#eeeeee', align: 'right' }}
                            />
                        </Region>
                        <Region
                            name="delete_message"
                            params={17}
                            backgroundColor="#de4537"
                            layout={{ width: 22, height: 26, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="icon"
                                params={16}
                                src={layoutImage('forum_forum_hide.png')}
                                layout={{ position: 'absolute', left: 4, width: 16, top: 5, height: 16 }}
                            />
                        </Region>
                        <Region
                            name="report_message"
                            params={17}
                            backgroundColor="#ff9c65"
                            layout={{ width: 22, height: 26, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="icon"
                                params={16}
                                src={layoutImage('forum_forum_report.png')}
                                layout={{ position: 'absolute', left: 2, width: 17, top: 6, height: 15 }}
                            />
                        </Region>
                        <Region
                            name="reply_message"
                            params={17}
                            backgroundColor="#45a3d9"
                            layout={{ width: 22, height: 26, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="icon"
                                params={16}
                                src={layoutImage('forum_reply.png')}
                                layout={{ position: 'absolute', left: 2, width: 17, top: 6, height: 15 }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
