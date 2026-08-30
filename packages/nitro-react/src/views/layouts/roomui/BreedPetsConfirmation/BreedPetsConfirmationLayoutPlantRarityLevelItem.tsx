import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `plant_rarity_level` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlantRarityLevelItemProps {
    captionPlantRarityLevel?: string;
    layout?: BoxLayout;
}

export const BreedPetsConfirmationLayoutPlantRarityLevelItem = ({ captionPlantRarityLevel, layout }: BreedPetsConfirmationLayoutPlantRarityLevelItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPlantRarityLevel ?? t('breedpets.widget.plant1.raritylevel')}
            textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
            name="plant_rarity_level"
            verticalAlign="top"
            layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0, ...layout }}
        />
    );
};
