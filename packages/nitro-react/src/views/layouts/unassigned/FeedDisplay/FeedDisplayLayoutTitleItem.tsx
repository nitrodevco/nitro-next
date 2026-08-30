import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `title` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutTitleItem = ({ captionTitle, layout }: FeedDisplayLayoutTitleItemProps) => {
    return (
        <ThemeText
            text={captionTitle ?? '_into_title'}
            textStyle="text-style-u-bold"
            textOptions={{ fill: '#999999', wordWrap: true }}
            name="title"
            verticalAlign="top"
            layout={{ flexShrink: 0, minWidth: 260, maxWidth: 200, ...layout }}
        />
    );
};
