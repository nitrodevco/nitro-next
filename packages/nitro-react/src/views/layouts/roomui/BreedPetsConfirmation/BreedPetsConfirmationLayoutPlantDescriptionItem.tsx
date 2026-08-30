import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plant_description` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlantDescriptionItemProps {
    captionPlantDescription?: string;
    layout?: BoxLayout;
}

export const BreedPetsConfirmationLayoutPlantDescriptionItem = ({ captionPlantDescription, layout }: BreedPetsConfirmationLayoutPlantDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPlantDescription ?? t('breedpets.widget.plant1.description')}
            textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            name="plant_description"
            verticalAlign="top"
            layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0, ...layout }}
        />
    );
};
