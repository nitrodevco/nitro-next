import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `seed_rarity_level` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedRarityLevelItemProps {
    captionSeedRarityLevel?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedRarityLevelItem = ({ captionSeedRarityLevel, layout }: BreedPetsResultLayoutSeedRarityLevelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="seed_rarity_level"
            layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionSeedRarityLevel ?? t('breedpetsresult.widget.seed1.raritylevel')}
                textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
            />
        </Region>
    );
};
