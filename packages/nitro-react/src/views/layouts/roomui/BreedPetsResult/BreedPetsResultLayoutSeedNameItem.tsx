import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `seed_name` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedNameItemProps {
    captionSeedName?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedNameItem = ({ captionSeedName, layout }: BreedPetsResultLayoutSeedNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="seed_name"
            layout={{ width: 122, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionSeedName ?? t('breedpetsresult.widget.seed1.name')}
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};
