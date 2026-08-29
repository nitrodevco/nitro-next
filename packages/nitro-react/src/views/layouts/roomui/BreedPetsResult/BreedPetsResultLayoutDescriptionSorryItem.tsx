import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

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
            <Region
                name="description_sorry"
                layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            >
                <ThemeText
                    text={captionDescriptionSorry ?? t('breedpetsresult.widget.text.sorry')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
                />
            </Region>
        )
    );
};
