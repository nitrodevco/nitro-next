import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region } from '#base/theme';

/** Row template `buttons` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutButtonsItemProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
    visibleCancelButton?: boolean;
}

export const PhotoPurchaseConfirmationLayoutButtonsItem = ({ layout, onCancelButton, visibleCancelButton }: PhotoPurchaseConfirmationLayoutButtonsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buttons"
            layout={{ width: 325, height: 27, flexShrink: 0, ...layout }}
        >
            {(visibleCancelButton ?? true) && (
                <Button
                    variant="3"
                    name="cancel_button"
                    onPointerTap={onCancelButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', left: 0, width: 110, bottom: 0, height: 27, minWidth: 110, maxWidth: 110, minHeight: 27, maxHeight: 27 }}
                >
                    {t('catalog.purchase_confirmation.cancel')}
                </Button>
            )}
        </Region>
    );
};
