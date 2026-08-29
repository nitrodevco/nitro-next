import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `title` of MessageLayout - pass real rows through its `items…` slot. */
export interface MessageLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const MessageLayoutTitleItem = ({ captionTitle, layout }: MessageLayoutTitleItemProps) => {
    return (
        <Region
            name="title"
            layout={{ width: 120, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTitle ?? 'Title'}
                textStyle="text-style-u-italic"
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 120 }}
            />
        </Region>
    );
};
