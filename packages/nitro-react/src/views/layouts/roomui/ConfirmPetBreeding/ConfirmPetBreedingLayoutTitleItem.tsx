import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `title` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const ConfirmPetBreedingLayoutTitleItem = ({ captionTitle, layout }: ConfirmPetBreedingLayoutTitleItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionTitle ?? t('breedpets.confirmation.widget.request')}
            textOptions={{ wordWrap: true, wordWrapWidth: 264 }}
            name="title"
            verticalAlign="top"
            layout={{ width: 264, height: 28, flexShrink: 0, ...layout }}
        />
    );
};
