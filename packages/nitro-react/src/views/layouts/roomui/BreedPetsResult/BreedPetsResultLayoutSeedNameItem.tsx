import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `seed_name` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedNameItemProps {
    captionSeedName?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedNameItem = ({ captionSeedName, layout }: BreedPetsResultLayoutSeedNameItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionSeedName ?? t('breedpetsresult.widget.seed1.name')}
            textOptions={{ align: 'center' }}
            name="seed_name"
            layout={{ alignSelf: 'stretch', height: 17, flexShrink: 0, ...layout }}
        />
    );
};
