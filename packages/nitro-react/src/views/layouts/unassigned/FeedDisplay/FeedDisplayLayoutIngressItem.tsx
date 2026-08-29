import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `ingress` of FeedDisplayLayout - pass real rows through its `items…` slot. */
export interface FeedDisplayLayoutIngressItemProps {
    captionIngress?: string;
    layout?: BoxLayout;
}

export const FeedDisplayLayoutIngressItem = ({ captionIngress, layout }: FeedDisplayLayoutIngressItemProps) => {
    return (
        <Region
            name="ingress"
            layout={{ width: 200, flexShrink: 0, minWidth: 220, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionIngress ?? '_info_ingress'}
                textStyle="text-style-u-regular"
                textOptions={{ fill: '#222222', wordWrap: true, wordWrapWidth: 200 }}
            />
        </Region>
    );
};
