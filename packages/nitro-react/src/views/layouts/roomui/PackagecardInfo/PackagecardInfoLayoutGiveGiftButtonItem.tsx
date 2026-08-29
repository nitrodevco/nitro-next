import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `give_gift_button` of PackagecardInfoLayout - pass real rows through its `items…` slot. */
export interface PackagecardInfoLayoutGiveGiftButtonItemProps {
    layout?: BoxLayout;
    onGiveGiftButton?: () => void;
}

export const PackagecardInfoLayoutGiveGiftButtonItem = ({ layout, onGiveGiftButton }: PackagecardInfoLayoutGiveGiftButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="give_gift_button"
            onPointerTap={onGiveGiftButton}
            layout={{ width: 206, height: 28, flexShrink: 0, minWidth: 206, maxWidth: 330, minHeight: 28, ...layout }}
        >
            {t('widget.furni.present.give_gift')}
        </Button>
    );
};
