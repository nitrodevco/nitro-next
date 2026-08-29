import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `info_mutate2` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutInfoMutate2ItemProps {
    captionInfoMutate2?: string;
    layout?: BoxLayout;
    visibleInfoMutate2?: boolean;
}

export const BreedPetsResultLayoutInfoMutate2Item = ({ captionInfoMutate2, layout, visibleInfoMutate2 }: BreedPetsResultLayoutInfoMutate2ItemProps) => {
    const t = useTranslation();

    return (
        (visibleInfoMutate2 ?? false) && (
            <Region
                name="info_mutate2"
                layout={{ width: 122, height: 33, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
            >
                <ThemeText
                    text={captionInfoMutate2 ?? t('breedpetsresult.widget.info.mutation')}
                    textStyle="text-style-u-italic"
                    textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
                />
            </Region>
        )
    );
};
