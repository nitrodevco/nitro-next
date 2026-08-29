import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `save_button` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutSaveButtonItemProps {
    layout?: BoxLayout;
    onSaveButton?: () => void;
}

export const ConfirmPetBreedingLayoutSaveButtonItem = ({ layout, onSaveButton }: ConfirmPetBreedingLayoutSaveButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="102"
            name="save_button"
            onPointerTap={onSaveButton}
            layout={{ width: 122, height: 30, flexShrink: 0, minWidth: 122, maxWidth: 122, ...layout }}
        >
            {t('breedpets.confirmation.widget.button.breed')}
        </Button>
    );
};
