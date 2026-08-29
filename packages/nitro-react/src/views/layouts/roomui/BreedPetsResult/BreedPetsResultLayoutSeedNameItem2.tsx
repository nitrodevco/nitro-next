import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `seed_name` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedNameItem2Props {
    captionSeedName?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedNameItem2 = ({ captionSeedName, layout }: BreedPetsResultLayoutSeedNameItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="seed_name"
            layout={{ alignSelf: 'stretch', height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionSeedName ?? t('breedpetsresult.widget.seed2.name')}
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};
