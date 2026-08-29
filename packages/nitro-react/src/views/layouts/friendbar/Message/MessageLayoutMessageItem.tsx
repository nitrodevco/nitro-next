import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `message` of MessageLayout - pass real rows through its `items…` slot. */
export interface MessageLayoutMessageItemProps {
    captionMessage?: string;
    layout?: BoxLayout;
}

export const MessageLayoutMessageItem = ({ captionMessage, layout }: MessageLayoutMessageItemProps) => {
    return (
        <Region
            name="message"
            layout={{ width: 121, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionMessage ?? 'Message'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 121 }}
            />
        </Region>
    );
};
