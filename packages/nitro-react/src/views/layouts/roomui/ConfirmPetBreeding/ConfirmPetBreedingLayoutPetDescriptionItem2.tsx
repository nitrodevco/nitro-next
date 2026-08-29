import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `pet_description` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPetDescriptionItem2Props {
    captionPetDescription?: string;
    layout?: BoxLayout;
}

export const ConfirmPetBreedingLayoutPetDescriptionItem2 = ({ captionPetDescription, layout }: ConfirmPetBreedingLayoutPetDescriptionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="pet_description"
            layout={{ width: 140, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPetDescription ?? t('breedpets.widget.pet2.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 140, align: 'center' }}
            />
        </Region>
    );
};
