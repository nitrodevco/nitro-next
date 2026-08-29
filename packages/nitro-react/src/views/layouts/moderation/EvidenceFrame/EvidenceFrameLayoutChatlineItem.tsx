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
                <Region
                    name="time_txt"
                    layout={{ position: 'absolute', left: 0, width: 33, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTimeTxt ?? '18:30'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            )}
            {(visibleChatterTxt ?? true) && (
                <Region
                    name="chatter_txt"
                    layout={{ position: 'absolute', left: 40, width: 95, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionChatterTxt ?? 'ROBIN_WAN_PERSI'}
                </Region>
            )}
            {(visibleMsgTxt ?? true) && (
                <Region
                    name="msg_txt"
                    layout={{ position: 'absolute', left: 140, width: 210, top: 0, height: 65, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMsgTxt ?? 'Sharing your password or personal details online is dangerous. The moderators might monitor these conversations for your safety.'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                    />
                </Region>
            )}
        </Region>
    );
};
