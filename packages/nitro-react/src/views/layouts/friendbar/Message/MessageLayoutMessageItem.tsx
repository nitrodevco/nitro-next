import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `message` of MessageLayout - pass real rows through its `items…` slot. */
export interface MessageLayoutMessageItemProps {
    captionMessage?: string;
    layout?: BoxLayout;
}

export const MessageLayoutMessageItem = ({ captionMessage, layout }: MessageLayoutMessageItemProps) => {
    return (
        <ThemeText
            text={captionMessage ?? 'Message'}
            textStyle="text-style-u-bold"
            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 121 }}
            name="message"
            verticalAlign="top"
            layout={{ width: 121, flexShrink: 0, ...layout }}
        />
    );
};
