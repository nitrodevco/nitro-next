import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `description_sorry` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutDescriptionSorryItemProps {
    captionDescriptionSorry?: string;
    layout?: BoxLayout;
    visibleDescriptionSorry?: boolean;
}

export const BreedPetsResultLayoutDescriptionSorryItem = ({ captionDescriptionSorry, layout, visibleDescriptionSorry }: BreedPetsResultLayoutDescriptionSorryItemProps) => {
    const t = useTranslation();

    return (
        (visibleDescriptionSorry ?? false) && (
            <ThemeText
                text={captionDescriptionSorry ?? t('breedpetsresult.widget.text.sorry')}
                textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
                name="description_sorry"
                verticalAlign="top"
                layout={{ width: 254, height: 18, flexShrink: 0, ...layout }}
            />
        )
    );
};
