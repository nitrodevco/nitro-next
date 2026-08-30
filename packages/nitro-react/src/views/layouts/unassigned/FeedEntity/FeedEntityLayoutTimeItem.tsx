import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `time` of FeedEntityLayout - pass real rows through its `items…` slot. */
export interface FeedEntityLayoutTimeItemProps {
    captionTime?: string;
    layout?: BoxLayout;
}

export const FeedEntityLayoutTimeItem = ({ captionTime, layout }: FeedEntityLayoutTimeItemProps) => {
    return (
        <ThemeText
            text={captionTime ?? '_time'}
            textStyle="text-style-u-small"
            textOptions={{ fill: '#999999' }}
            name="time"
            layout={{ width: 100, height: 20, flexShrink: 0, ...layout }}
        />
    );
};
