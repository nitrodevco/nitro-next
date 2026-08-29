import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `info_mutate1` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutInfoMutate1ItemProps {
    captionInfoMutate1?: string;
    layout?: BoxLayout;
    visibleInfoMutate1?: boolean;
}

export const BreedPetsResultLayoutInfoMutate1Item = ({ captionInfoMutate1, layout, visibleInfoMutate1 }: BreedPetsResultLayoutInfoMutate1ItemProps) => {
    const t = useTranslation();

    return (
        (visibleInfoMutate1 ?? false) && (
            <Region
                name="info_mutate1"
                layout={{ alignSelf: 'stretch', height: 33, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
            >
                <ThemeText
                    text={captionInfoMutate1 ?? t('breedpetsresult.widget.info.mutation')}
                    textStyle="text-style-u-italic"
                    textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
                />
            </Region>
        )
    );
};
