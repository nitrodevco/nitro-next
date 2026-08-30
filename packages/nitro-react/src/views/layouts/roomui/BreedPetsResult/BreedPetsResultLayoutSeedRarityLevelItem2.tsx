import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `seed_rarity_level` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedRarityLevelItem2Props {
    captionSeedRarityLevel?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedRarityLevelItem2 = ({ captionSeedRarityLevel, layout }: BreedPetsResultLayoutSeedRarityLevelItem2Props) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionSeedRarityLevel ?? t('breedpetsresult.widget.seed2.raritylevel')}
            textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
            name="seed_rarity_level"
            verticalAlign="top"
            layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0, ...layout }}
        />
    );
};
