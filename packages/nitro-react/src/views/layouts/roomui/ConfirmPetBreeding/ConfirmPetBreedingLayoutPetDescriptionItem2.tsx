import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `pet_description` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPetDescriptionItem2Props {
    captionPetDescription?: string;
    layout?: BoxLayout;
}

export const ConfirmPetBreedingLayoutPetDescriptionItem2 = ({ captionPetDescription, layout }: ConfirmPetBreedingLayoutPetDescriptionItem2Props) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPetDescription ?? t('breedpets.widget.pet2.description')}
            textOptions={{ wordWrap: true, wordWrapWidth: 140, align: 'center' }}
            name="pet_description"
            verticalAlign="top"
            layout={{ alignSelf: 'stretch', height: 16, flexShrink: 0, ...layout }}
        />
    );
};
