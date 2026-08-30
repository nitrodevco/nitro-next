import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `msg_info` of MessengerLayout - pass real rows through its `items…` slot. */
export interface MessengerLayoutMsgInfoItemProps {
    captionContent?: string;
    layout?: BoxLayout;
}

export const MessengerLayoutMsgInfoItem = ({ captionContent, layout }: MessengerLayoutMsgInfoItemProps) => {
    return (
        <ThemeText
            text={captionContent ?? ''}
            textOptions={{ wordWrap: true, wordWrapWidth: 255, align: 'center' }}
            name="msg_info"
            verticalAlign="top"
            layout={{ width: 255, height: 24, flexShrink: 0, ...layout }}
        />
    );
};
