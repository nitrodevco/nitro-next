import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `rented_to_label` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutRentedToLabelItemProps {
    captionRentedToLabel?: string;
    layout?: BoxLayout;
}

export const RentablespaceLayoutRentedToLabelItem = ({ captionRentedToLabel, layout }: RentablespaceLayoutRentedToLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rented_to_label"
            layout={{ width: 268, height: 29, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRentedToLabel ?? t('rentablespace.widget.rented_to_label')}
                textStyle="text-style-u-headline-small"
            />
        </Region>
    );
};
