import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `place_button2` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutPlaceButton2ItemProps {
    layout?: BoxLayout;
    onPlaceButton2?: () => void;
    visiblePlaceButton2?: boolean;
}

export const BreedPetsResultLayoutPlaceButton2Item = ({ layout, onPlaceButton2, visiblePlaceButton2 }: BreedPetsResultLayoutPlaceButton2ItemProps) => {
    const t = useTranslation();

    return (
        (visiblePlaceButton2 ?? false) && (
            <ButtonThick
                variant="5"
                name="place_button2"
                tintColor="#00aa00"
                onPointerTap={onPlaceButton2}
                layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0, minWidth: 120, maxWidth: 120, ...layout }}
            >
                {t('breedpetsresult.widget.seed2.use')}
            </ButtonThick>
        )
    );
};
