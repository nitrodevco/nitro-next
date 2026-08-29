import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `place_button1` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutPlaceButton1ItemProps {
    layout?: BoxLayout;
    onPlaceButton1?: () => void;
    visiblePlaceButton1?: boolean;
}

export const BreedPetsResultLayoutPlaceButton1Item = ({ layout, onPlaceButton1, visiblePlaceButton1 }: BreedPetsResultLayoutPlaceButton1ItemProps) => {
    const t = useTranslation();

    return (
        (visiblePlaceButton1 ?? false) && (
            <ButtonThick
                variant="5"
                name="place_button1"
                tintColor="#00aa00"
                onPointerTap={onPlaceButton1}
                layout={{ width: 120, height: 30, flexShrink: 0, minWidth: 120, maxWidth: 120, ...layout }}
            >
                {t('breedpetsresult.widget.seed2.use')}
            </ButtonThick>
        )
    );
};
