import { BoxLayout, Region, ThemeText } from '#base/theme';

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
