import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `pet_level` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPetLevelItemProps {
    captionPetLevel?: string;
    layout?: BoxLayout;
}

export const ConfirmPetBreedingLayoutPetLevelItem = ({ captionPetLevel, layout }: ConfirmPetBreedingLayoutPetLevelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pet_level"
            layout={{ width: 140, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPetLevel ?? t('breedpets.widget.pet1.level')}
                textStyle="text-style-il-heading-3"
                textOptions={{ wordWrap: true, wordWrapWidth: 140, align: 'center' }}
            />
        </Region>
    );
};
