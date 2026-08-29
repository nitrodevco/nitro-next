import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `close_button` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutCloseButtonItemProps {
    layout?: BoxLayout;
    onCloseButton?: () => void;
}

export const BreedPetsResultLayoutCloseButtonItem = ({ layout, onCloseButton }: BreedPetsResultLayoutCloseButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="close_button"
            onPointerTap={onCloseButton}
            layout={{ width: 122, alignSelf: 'stretch', flexShrink: 0, minWidth: 122, maxWidth: 122, ...layout }}
        >
            {t('breedpetsresult.widget.close')}
        </Button>
    );
};
