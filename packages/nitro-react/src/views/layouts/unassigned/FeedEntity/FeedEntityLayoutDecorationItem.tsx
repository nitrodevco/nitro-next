import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `decoration` of FeedEntityLayout - pass real rows through its `items…` slot. */
export interface FeedEntityLayoutDecorationItemProps {
    layout?: BoxLayout;
    srcDecoration?: string;
    tintDecoration?: string;
}

export const FeedEntityLayoutDecorationItem = ({ layout, srcDecoration, tintDecoration }: FeedEntityLayoutDecorationItemProps) => {
    return (
        <ThemeImage
            name="decoration"
            src={srcDecoration}
            tint={tintDecoration}
            layout={{ width: 178, flexShrink: 0, ...layout }}
        />
    );
};
