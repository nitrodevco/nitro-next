import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `description` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutDescriptionItemProps {
    captionDescription?: string;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutDescriptionItem = ({ captionDescription, layout }: FeedDisplayLayoutDescriptionItemProps) => {
    return (
        <ThemeText
            text={captionDescription ?? '_info_description'}
            textStyle="text-style-u-regular"
            textOptions={{ fill: '#222222', wordWrap: true, wordWrapWidth: 99 }}
            name="description"
            verticalAlign="top"
            layout={{ width: 99, height: 30, flexShrink: 0, ...layout }}
        />
    );
};
