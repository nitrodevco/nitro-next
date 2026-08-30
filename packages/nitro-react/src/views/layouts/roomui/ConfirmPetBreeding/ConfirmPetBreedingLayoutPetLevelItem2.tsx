import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `pet_level` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPetLevelItem2Props {
    captionPetLevel?: string;
    layout?: BoxLayout;
}

export const ConfirmPetBreedingLayoutPetLevelItem2 = ({ captionPetLevel, layout }: ConfirmPetBreedingLayoutPetLevelItem2Props) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPetLevel ?? t('breedpets.widget.pet2.level')}
            textStyle="text-style-il-heading-3"
            textOptions={{ wordWrap: true, wordWrapWidth: 140, align: 'center' }}
            name="pet_level"
            verticalAlign="top"
            layout={{ alignSelf: 'stretch', height: 15, flexShrink: 0, ...layout }}
        />
    );
};
