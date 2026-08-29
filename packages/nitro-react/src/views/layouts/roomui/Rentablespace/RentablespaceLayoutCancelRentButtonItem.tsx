import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `cancel_rent_button` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutCancelRentButtonItemProps {
    layout?: BoxLayout;
    onCancelRentButton?: () => void;
    visibleCancelRentButton?: boolean;
}

export const RentablespaceLayoutCancelRentButtonItem = ({ layout, onCancelRentButton, visibleCancelRentButton }: RentablespaceLayoutCancelRentButtonItemProps) => {
    const t = useTranslation();

    return (
        (visibleCancelRentButton ?? false) && (
            <Button
                variant="3"
                name="cancel_rent_button"
                onPointerTap={onCancelRentButton}
                layout={{ width: 204, height: 30, flexShrink: 0, ...layout }}
            >
                {t('rentablespace.widget.cancel_rent')}
            </Button>
        )
    );
};
