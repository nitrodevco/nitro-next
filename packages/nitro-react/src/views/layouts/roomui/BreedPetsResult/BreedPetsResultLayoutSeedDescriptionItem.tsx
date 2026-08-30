import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `seed_description` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedDescriptionItemProps {
    captionSeedDescription?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedDescriptionItem = ({ captionSeedDescription, layout }: BreedPetsResultLayoutSeedDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionSeedDescription ?? t('breedpetsresult.widget.seed1.description')}
            textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            name="seed_description"
            verticalAlign="top"
            layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0, ...layout }}
        />
    );
};
