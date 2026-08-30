import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `chatline` of EvidenceFrameLayout - pass real rows through its `items…` slot. */
export interface EvidenceFrameLayoutChatlineItemProps {
    captionChatterTxt?: string;
    captionMsgTxt?: string;
    captionTimeTxt?: string;
    layout?: BoxLayout;
    visibleChatterTxt?: boolean;
    visibleMsgTxt?: boolean;
    visibleTimeTxt?: boolean;
}

export const EvidenceFrameLayoutChatlineItem = ({ captionChatterTxt, captionMsgTxt, captionTimeTxt, layout, visibleChatterTxt, visibleMsgTxt, visibleTimeTxt }: EvidenceFrameLayoutChatlineItemProps) => {
    return (
        <Region
            name="chatline"
            layout={{ width: 420, height: 41, flexShrink: 0, ...layout }}
        >
            {(visibleTimeTxt ?? true) && (
                <ThemeText
                    text={captionTimeTxt ?? '18:30'}
                    textStyle="text-style-u-bold"
                    name="time_txt"
                    layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 17 }}
                />
            )}
            {(visibleChatterTxt ?? true) && (
                <ThemeText
                    text={captionChatterTxt ?? 'ROBIN_WAN_PERSI'}
                    name="chatter_txt"
                    layout={{ position: 'absolute', left: 40, width: 95, top: 0, height: 15 }}
                />
            )}
            {(visibleMsgTxt ?? true) && (
                <ThemeText
                    text={captionMsgTxt ?? 'Sharing your password or personal details online is dangerous. The moderators might monitor these conversations for your safety.'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                    name="msg_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 140, width: 210, top: 0, height: 65 }}
                />
            )}
        </Region>
    );
};
