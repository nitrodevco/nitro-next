import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `breeding.title` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutBreedingTitleItemProps {
    captionBreedingTitle?: string;
    layout?: BoxLayout;
}

export const ConfirmPetBreedingLayoutBreedingTitleItem = ({ captionBreedingTitle, layout }: ConfirmPetBreedingLayoutBreedingTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="breeding.title"
            layout={{ width: 78, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionBreedingTitle ?? t('breedpets.confirmation.widget.breeding.info')}
                textStyle="text-style-il-heading-3"
            />
        </Region>
    );
};
