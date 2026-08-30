import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `seed_description` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedDescriptionItem2Props {
    captionSeedDescription?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedDescriptionItem2 = ({ captionSeedDescription, layout }: BreedPetsResultLayoutSeedDescriptionItem2Props) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionSeedDescription ?? t('breedpetsresult.widget.seed2.description')}
            textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            name="seed_description"
            verticalAlign="top"
            layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0, ...layout }}
        />
    );
};
