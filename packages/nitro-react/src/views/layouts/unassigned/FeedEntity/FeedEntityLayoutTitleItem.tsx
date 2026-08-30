import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `title` of FeedEntityLayout - pass real rows through its `items…` slot. */
export interface FeedEntityLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const FeedEntityLayoutTitleItem = ({ captionTitle, layout }: FeedEntityLayoutTitleItemProps) => {
    return (
        <ThemeText
            text={captionTitle ?? '001_lorem_idflgkjdl%20fkgjdf%20gdf%20gdfd%F6%20lgk%F6lkfggd%20'}
            textStyle="text-style-u-bold"
            textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
            name="title"
            verticalAlign="top"
            layout={{ width: 170, flexShrink: 0, maxWidth: 170, ...layout }}
        />
    );
};
