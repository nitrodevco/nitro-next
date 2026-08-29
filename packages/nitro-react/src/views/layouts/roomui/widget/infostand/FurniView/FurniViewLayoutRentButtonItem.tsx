import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `rent_button` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutRentButtonItemProps {
    layout?: BoxLayout;
    onRentButton?: () => void;
}

export const FurniViewLayoutRentButtonItem = ({ layout, onRentButton }: FurniViewLayoutRentButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="rent_button"
            onPointerTap={onRentButton}
            layout={{ width: 130, height: 23, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.rent')}
        </Button>
    );
};
