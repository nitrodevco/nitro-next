import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `description` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutDescriptionItemProps {
    captionDescription?: string;
    layout?: BoxLayout;
}

export const BreedPetsConfirmationLayoutDescriptionItem = ({ captionDescription, layout }: BreedPetsConfirmationLayoutDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionDescription ?? t('breedpets.widget.text')}
            textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
            name="description"
            verticalAlign="top"
            layout={{ width: 254, height: 18, flexShrink: 0, ...layout }}
        />
    );
};
