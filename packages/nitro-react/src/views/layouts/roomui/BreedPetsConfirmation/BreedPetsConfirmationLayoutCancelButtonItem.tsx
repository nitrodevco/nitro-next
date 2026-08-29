import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `cancel_button` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutCancelButtonItemProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
}

export const BreedPetsConfirmationLayoutCancelButtonItem = ({ layout, onCancelButton }: BreedPetsConfirmationLayoutCancelButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="cancel_button"
            onPointerTap={onCancelButton}
            layout={{ width: 122, height: 30, flexShrink: 0, minWidth: 122, maxWidth: 122, ...layout }}
        >
            {t('breedpets.widget.cancel')}
        </Button>
    );
};
