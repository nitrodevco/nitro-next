import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `info_sorry` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutInfoSorryItemProps {
    captionInfoSorry?: string;
    layout?: BoxLayout;
    visibleInfoSorry?: boolean;
}

export const BreedPetsResultLayoutInfoSorryItem = ({ captionInfoSorry, layout, visibleInfoSorry }: BreedPetsResultLayoutInfoSorryItemProps) => {
    const t = useTranslation();

    return (
        (visibleInfoSorry ?? false) && (
            <ThemeText
                text={captionInfoSorry ?? t('breedpetsresult.widget.info.sorry')}
                textStyle="text-style-u-italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
                name="info_sorry"
                verticalAlign="top"
                layout={{ width: 254, height: 18, flexShrink: 0, ...layout }}
            />
        )
    );
};
