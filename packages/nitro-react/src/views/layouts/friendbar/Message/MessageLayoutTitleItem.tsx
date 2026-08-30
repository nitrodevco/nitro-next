import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `title` of MessageLayout - pass real rows through its `items…` slot. */
export interface MessageLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const MessageLayoutTitleItem = ({ captionTitle, layout }: MessageLayoutTitleItemProps) => {
    return (
        <ThemeText
            text={captionTitle ?? 'Title'}
            textStyle="text-style-u-italic"
            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 120 }}
            name="title"
            verticalAlign="top"
            layout={{ width: 120, height: 16, flexShrink: 0, ...layout }}
        />
    );
};
