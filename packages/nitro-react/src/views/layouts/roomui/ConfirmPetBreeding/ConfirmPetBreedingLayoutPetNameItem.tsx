import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `pet_name` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPetNameItemProps {
    captionPetName?: string;
    layout?: BoxLayout;
}

export const ConfirmPetBreedingLayoutPetNameItem = ({ captionPetName, layout }: ConfirmPetBreedingLayoutPetNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pet_name"
            layout={{ width: 140, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPetName ?? t('breedpets.widget.pet1.name')}
                textStyle="text-style-il-heading-2"
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};
