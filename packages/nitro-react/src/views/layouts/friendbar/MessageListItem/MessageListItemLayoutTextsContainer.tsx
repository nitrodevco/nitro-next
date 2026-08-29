import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `texts_container` of MessageListItemLayout - configured through the parent's `textsContainer` prop. */
export interface MessageListItemLayoutTextsContainerProps {
    captionDate?: string;
    captionReplyNum?: string;
    layout?: BoxLayout;
    onDeleteMessage?: () => void;
    onReplyMessage?: () => void;
    onReportMessage?: () => void;
    srcIcon?: string;
    srcReplyMessageIcon?: string;
    srcReportMessageIcon?: string;
}

export const MessageListItemLayoutTextsContainer = ({ captionDate, captionReplyNum, layout, onDeleteMessage, onReplyMessage, onReportMessage, srcIcon, srcReplyMessageIcon, srcReportMessageIcon }: MessageListItemLayoutTextsContainerProps) => {
    return (
        <Region
            name="texts_container"
            backgroundColor="#227aad"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 26, ...layout }}
        >
            <Region
                name="date"
                layout={{ position: 'absolute', left: 0, right: 0, top: 4, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDate ?? '10 days ago'}
                    textOptions={{ fill: '#eeeeee' }}
                />
            </Region>
            <Region layout={{ position: 'absolute', right: 0, width: 106, top: 0, height: 26, flexDirection: 'row' }}>
                <Region
                    name="reply_num"
                    layout={{ width: 40, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionReplyNum ?? '#5'}
                        textOptions={{ fill: '#eeeeee', align: 'right' }}
                    />
                </Region>
                <Region
                    name="delete_message"
                    backgroundColor="#de4537"
                    onPointerTap={onDeleteMessage}
                    cursor="pointer"
                    layout={{ width: 22, height: 26, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="icon"
                        src={srcIcon ?? layoutImage('forum_forum_hide.png')}
                        layout={{ position: 'absolute', left: 4, width: 16, top: 5, height: 16 }}
                    />
                </Region>
                <Region
                    name="report_message"
                    backgroundColor="#ff9c65"
                    onPointerTap={onReportMessage}
                    cursor="pointer"
                    layout={{ width: 22, height: 26, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="icon"
                        src={srcReportMessageIcon ?? layoutImage('forum_forum_report.png')}
                        layout={{ position: 'absolute', left: 2, width: 17, top: 6, height: 15 }}
                    />
                </Region>
                <Region
                    name="reply_message"
                    backgroundColor="#45a3d9"
                    onPointerTap={onReplyMessage}
                    cursor="pointer"
                    layout={{ width: 22, height: 26, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="icon"
                        src={srcReplyMessageIcon ?? layoutImage('forum_reply.png')}
                        layout={{ position: 'absolute', left: 2, width: 17, top: 6, height: 15 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
