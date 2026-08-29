import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `accept_button` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutAcceptButtonItemProps {
    layout?: BoxLayout;
    onAcceptButton?: () => void;
}

export const BreedPetsConfirmationLayoutAcceptButtonItem = ({ layout, onAcceptButton }: BreedPetsConfirmationLayoutAcceptButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="accept_button"
            tintColor="#00aa00"
            onPointerTap={onAcceptButton}
            layout={{ width: 122, height: 30, flexShrink: 0, minWidth: 122, maxWidth: 122, ...layout }}
        >
            {t('breedpets.widget.accept')}
        </ButtonThick>
    );
};
