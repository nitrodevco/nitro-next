import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `title` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const ConfirmPetBreedingLayoutTitleItem = ({ captionTitle, layout }: ConfirmPetBreedingLayoutTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="title"
            layout={{ width: 264, height: 28, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTitle ?? t('breedpets.confirmation.widget.request')}
                textOptions={{ wordWrap: true, wordWrapWidth: 264 }}
            />
        </Region>
    );
};
