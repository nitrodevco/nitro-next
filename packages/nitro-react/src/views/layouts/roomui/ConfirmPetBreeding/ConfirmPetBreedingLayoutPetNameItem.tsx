import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `pet_name` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPetNameItemProps {
    captionPetName?: string;
    layout?: BoxLayout;
}

export const ConfirmPetBreedingLayoutPetNameItem = ({ captionPetName, layout }: ConfirmPetBreedingLayoutPetNameItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPetName ?? t('breedpets.widget.pet1.name')}
            textStyle="text-style-il-heading-2"
            textOptions={{ align: 'center' }}
            name="pet_name"
            layout={{ alignSelf: 'stretch', height: 17, flexShrink: 0, ...layout }}
        />
    );
};
