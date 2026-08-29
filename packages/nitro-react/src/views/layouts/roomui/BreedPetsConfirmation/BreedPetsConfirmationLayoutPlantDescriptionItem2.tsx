import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `plant_description` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlantDescriptionItem2Props {
    captionPlantDescription?: string;
    layout?: BoxLayout;
}

export const BreedPetsConfirmationLayoutPlantDescriptionItem2 = ({ captionPlantDescription, layout }: BreedPetsConfirmationLayoutPlantDescriptionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_description"
            layout={{ width: 122, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantDescription ?? t('breedpets.widget.plant2.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            />
        </Region>
    );
};
