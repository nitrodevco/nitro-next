import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `cancel_button` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutCancelButtonItemProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
}

export const ConfirmPetBreedingLayoutCancelButtonItem = ({ layout, onCancelButton }: ConfirmPetBreedingLayoutCancelButtonItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cancel_button"
            onPointerTap={onCancelButton}
            cursor="pointer"
            layout={{ alignSelf: 'stretch', height: 21, flexShrink: 0, minWidth: 295, maxWidth: 295, ...layout }}
        >
            <ThemeText
                text={t('breedpets.confirmation.widget.button.cancel')}
                textStyle="text-style-il-link-regular"
                textOptions={{ align: 'center' }}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 5, minWidth: 295, maxWidth: 295 }}
            />
        </Region>
    );
};
