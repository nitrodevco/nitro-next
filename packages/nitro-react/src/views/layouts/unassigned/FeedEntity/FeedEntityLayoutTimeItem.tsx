import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `time` of FeedEntityLayout - pass real rows through its `items…` slot. */
export interface FeedEntityLayoutTimeItemProps {
    captionTime?: string;
    layout?: BoxLayout;
}

export const FeedEntityLayoutTimeItem = ({ captionTime, layout }: FeedEntityLayoutTimeItemProps) => {
    return (
        <Region
            name="time"
            layout={{ width: 100, height: 20, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTime ?? '_time'}
                textStyle="text-style-u-small"
                textOptions={{ fill: '#999999' }}
            />
        </Region>
    );
};
