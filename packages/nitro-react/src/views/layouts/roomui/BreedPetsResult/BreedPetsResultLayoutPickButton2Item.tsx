import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `pick_button2` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutPickButton2ItemProps {
    layout?: BoxLayout;
    onPickButton2?: () => void;
    visiblePickButton2?: boolean;
}

export const BreedPetsResultLayoutPickButton2Item = ({ layout, onPickButton2, visiblePickButton2 }: BreedPetsResultLayoutPickButton2ItemProps) => {
    const t = useTranslation();

    return (
        (visiblePickButton2 ?? false) && (
            <Button
                variant="3"
                name="pick_button2"
                onPointerTap={onPickButton2}
                layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0, minWidth: 120, maxWidth: 120, ...layout }}
            >
                {t('breedpetsresult.widget.seed2.pick')}
            </Button>
        )
    );
};
