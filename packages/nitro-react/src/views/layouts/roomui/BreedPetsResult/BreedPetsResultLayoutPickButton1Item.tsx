import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `pick_button1` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutPickButton1ItemProps {
    layout?: BoxLayout;
    onPickButton1?: () => void;
    visiblePickButton1?: boolean;
}

export const BreedPetsResultLayoutPickButton1Item = ({ layout, onPickButton1, visiblePickButton1 }: BreedPetsResultLayoutPickButton1ItemProps) => {
    const t = useTranslation();

    return (
        (visiblePickButton1 ?? false) && (
            <Button
                variant="3"
                name="pick_button1"
                onPointerTap={onPickButton1}
                layout={{ width: 120, height: 30, flexShrink: 0, minWidth: 120, maxWidth: 120, ...layout }}
            >
                {t('breedpetsresult.widget.seed2.pick')}
            </Button>
        )
    );
};
