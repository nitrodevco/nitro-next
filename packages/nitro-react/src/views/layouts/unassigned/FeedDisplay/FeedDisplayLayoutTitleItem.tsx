import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `title` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutTitleItem = ({ captionTitle, layout }: FeedDisplayLayoutTitleItemProps) => {
    return (
        <Region
            name="title"
            layout={{ flexShrink: 0, minWidth: 260, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTitle ?? '_into_title'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#999999', wordWrap: true }}
            />
        </Region>
    );
};
