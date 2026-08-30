import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `time_remaining_label` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutTimeRemainingLabelItemProps {
    captionTimeRemainingLabel?: string;
    layout?: BoxLayout;
}

export const RentablespaceLayoutTimeRemainingLabelItem = ({ captionTimeRemainingLabel, layout }: RentablespaceLayoutTimeRemainingLabelItemProps) => {
    return (
        <ThemeText
            text={captionTimeRemainingLabel ?? '5 days and 2 hours'}
            textStyle="text-style-u-italic"
            name="time_remaining_label"
            layout={{ width: 113, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
