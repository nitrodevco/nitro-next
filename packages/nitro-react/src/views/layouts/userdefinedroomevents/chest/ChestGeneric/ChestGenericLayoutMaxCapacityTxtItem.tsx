import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `max_capacity_txt` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutMaxCapacityTxtItemProps {
    captionMaxCapacityTxt?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutMaxCapacityTxtItem = ({ captionMaxCapacityTxt, layout }: ChestGenericLayoutMaxCapacityTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="max_capacity_txt"
            layout={{ width: 172, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionMaxCapacityTxt ?? t('wiredchests.max_capacity')}
        </Region>
    );
};
