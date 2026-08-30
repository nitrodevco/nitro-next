import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `seed_name` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedNameItem2Props {
    captionSeedName?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedNameItem2 = ({ captionSeedName, layout }: BreedPetsResultLayoutSeedNameItem2Props) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionSeedName ?? t('breedpetsresult.widget.seed2.name')}
            textOptions={{ align: 'center' }}
            name="seed_name"
            layout={{ alignSelf: 'stretch', height: 17, flexShrink: 0, ...layout }}
        />
    );
};
