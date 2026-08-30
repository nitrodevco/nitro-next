import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `ingress` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutIngressItemProps {
    captionIngress?: string;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutIngressItem = ({ captionIngress, layout }: FeedDisplayLayoutIngressItemProps) => {
    return (
        <ThemeText
            text={captionIngress ?? '_info_ingress'}
            textStyle="text-style-u-regular"
            textOptions={{ fill: '#222222', wordWrap: true, wordWrapWidth: 200 }}
            name="ingress"
            verticalAlign="top"
            layout={{ width: 200, flexShrink: 0, minWidth: 220, maxWidth: 200, ...layout }}
        />
    );
};
