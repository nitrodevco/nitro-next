import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `time_label` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutTimeLabelItemProps {
    captionTimeLabel?: string;
    layout?: BoxLayout;
}

export const RentablespaceLayoutTimeLabelItem = ({ captionTimeLabel, layout }: RentablespaceLayoutTimeLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="time_label"
            layout={{ width: 249, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTimeLabel ?? t('rentablespace.widget.expires_label')}
                textStyle="text-style-u-headline-small"
            />
        </Region>
    );
};
