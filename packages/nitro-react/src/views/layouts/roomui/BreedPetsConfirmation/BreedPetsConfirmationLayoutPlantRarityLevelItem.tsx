import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `plant_rarity_level` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlantRarityLevelItemProps {
    captionPlantRarityLevel?: string;
    layout?: BoxLayout;
}

export const BreedPetsConfirmationLayoutPlantRarityLevelItem = ({ captionPlantRarityLevel, layout }: BreedPetsConfirmationLayoutPlantRarityLevelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_rarity_level"
            layout={{ width: 134, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantRarityLevel ?? t('breedpets.widget.plant1.raritylevel')}
                textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
            />
        </Region>
    );
};
