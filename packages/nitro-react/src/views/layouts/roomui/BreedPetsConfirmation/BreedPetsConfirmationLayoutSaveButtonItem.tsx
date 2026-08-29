import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `save_button` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutSaveButtonItemProps {
    layout?: BoxLayout;
    onSaveButton?: () => void;
}

export const BreedPetsConfirmationLayoutSaveButtonItem = ({ layout, onSaveButton }: BreedPetsConfirmationLayoutSaveButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="save_button"
            tintColor="#00aa00"
            onPointerTap={onSaveButton}
            layout={{ width: 122, alignSelf: 'stretch', flexShrink: 0, minWidth: 122, maxWidth: 122, ...layout }}
        >
            {t('breedpets.widget.use')}
        </ButtonThick>
    );
};
