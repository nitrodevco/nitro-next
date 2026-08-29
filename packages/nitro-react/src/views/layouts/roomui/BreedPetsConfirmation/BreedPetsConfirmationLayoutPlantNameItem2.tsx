import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `plant_name` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlantNameItem2Props {
    captionPlantName?: string;
    layout?: BoxLayout;
}

export const BreedPetsConfirmationLayoutPlantNameItem2 = ({ captionPlantName, layout }: BreedPetsConfirmationLayoutPlantNameItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_name"
            layout={{ width: 122, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantName ?? t('breedpets.widget.plant2.name')}
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};
