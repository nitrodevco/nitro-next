import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

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
            <Region
                name="info_sorry"
                layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            >
                <ThemeText
                    text={captionInfoSorry ?? t('breedpetsresult.widget.info.sorry')}
                    textStyle="text-style-u-italic"
                    textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
                />
            </Region>
        )
    );
};
