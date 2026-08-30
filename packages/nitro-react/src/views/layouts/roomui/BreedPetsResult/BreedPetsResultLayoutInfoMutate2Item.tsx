import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

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
            <ThemeText
                text={captionInfoMutate2 ?? t('breedpetsresult.widget.info.mutation')}
                textStyle="text-style-u-italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
                name="info_mutate2"
                verticalAlign="top"
                layout={{ alignSelf: 'stretch', height: 33, flexShrink: 0, minWidth: 122, maxWidth: 122, ...layout }}
            />
        )
    );
};
