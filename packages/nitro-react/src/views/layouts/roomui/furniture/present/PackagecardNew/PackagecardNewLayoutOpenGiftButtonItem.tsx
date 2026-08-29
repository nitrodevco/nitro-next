import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `open_gift_button` of PackagecardNewLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewLayoutOpenGiftButtonItemProps {
    layout?: BoxLayout;
    onOpenGiftButton?: () => void;
}

export const PackagecardNewLayoutOpenGiftButtonItem = ({ layout, onOpenGiftButton }: PackagecardNewLayoutOpenGiftButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="open_gift_button"
            tintColor="#00aa00"
            onPointerTap={onOpenGiftButton}
            layout={{ width: 206, height: 28, flexShrink: 0, minWidth: 206, maxWidth: 328, minHeight: 28, ...layout }}
        >
            {t('widget.furni.present.open_gift')}
        </ButtonThick>
    );
};
