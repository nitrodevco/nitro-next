import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `subtitle` of SimpleAlert_2678Layout - pass real rows through its `items…` slot. */
export interface SimpleAlert_2678LayoutSubtitleItemProps {
    captionSubtitle?: string;
    layout?: BoxLayout;
}

export const SimpleAlert_2678LayoutSubtitleItem = ({ captionSubtitle, layout }: SimpleAlert_2678LayoutSubtitleItemProps) => {
    return (
        <ThemeText
            text={captionSubtitle ?? 'subtitle'}
            textStyle="text-style-il-heading-1"
            textOptions={{ fill: '#c30000' }}
            name="subtitle"
            layout={{ width: 54, height: 19, flexShrink: 0, ...layout }}
        />
    );
};
