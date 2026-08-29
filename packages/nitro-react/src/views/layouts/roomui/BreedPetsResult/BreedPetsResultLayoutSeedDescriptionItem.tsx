import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `seed_description` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedDescriptionItemProps {
    captionSeedDescription?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedDescriptionItem = ({ captionSeedDescription, layout }: BreedPetsResultLayoutSeedDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="seed_description"
            layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionSeedDescription ?? t('breedpetsresult.widget.seed1.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            />
        </Region>
    );
};
