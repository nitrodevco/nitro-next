import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `extend_button` of VipDiscountPromotionV2Layout - pass real rows through its `items…` slot. */
export interface VipDiscountPromotionV2LayoutExtendButtonItemProps {
    layout?: BoxLayout;
    onExtendButton?: () => void;
}

export const VipDiscountPromotionV2LayoutExtendButtonItem = ({ layout, onExtendButton }: VipDiscountPromotionV2LayoutExtendButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="100"
            name="extend_button"
            onPointerTap={onExtendButton}
            layout={{ width: 187, height: 50, flexShrink: 0, minWidth: 187, maxWidth: 187, ...layout }}
        >
            {t('citizen.vip.extend.promo.button')}
        </Button>
    );
};
