import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plant_rarity_level` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlantRarityLevelItem2Props {
    captionPlantRarityLevel?: string;
    layout?: BoxLayout;
}

export const BreedPetsConfirmationLayoutPlantRarityLevelItem2 = ({ captionPlantRarityLevel, layout }: BreedPetsConfirmationLayoutPlantRarityLevelItem2Props) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPlantRarityLevel ?? t('breedpets.widget.plant2.raritylevel')}
            textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
            name="plant_rarity_level"
            verticalAlign="top"
            layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0, ...layout }}
        />
    );
};
