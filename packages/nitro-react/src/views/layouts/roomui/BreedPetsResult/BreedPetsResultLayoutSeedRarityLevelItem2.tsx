import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `seed_rarity_level` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedRarityLevelItem2Props {
    captionSeedRarityLevel?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedRarityLevelItem2 = ({ captionSeedRarityLevel, layout }: BreedPetsResultLayoutSeedRarityLevelItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="seed_rarity_level"
            layout={{ width: 134, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionSeedRarityLevel ?? t('breedpetsresult.widget.seed2.raritylevel')}
                textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
            />
        </Region>
    );
};
