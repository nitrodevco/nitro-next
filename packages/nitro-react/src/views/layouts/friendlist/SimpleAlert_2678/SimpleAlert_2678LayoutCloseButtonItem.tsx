import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `close_button` of SimpleAlert_2678Layout - pass real rows through its `items…` slot. */
export interface SimpleAlert_2678LayoutCloseButtonItemProps {
    layout?: BoxLayout;
    onCloseButton?: () => void;
}

export const SimpleAlert_2678LayoutCloseButtonItem = ({ layout, onCloseButton }: SimpleAlert_2678LayoutCloseButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="3"
            name="close_button"
            tintColor="#efefef"
            onPointerTap={onCloseButton}
            layout={{ width: 126, height: 28, flexShrink: 0, ...layout }}
        >
            {t('alert.close.button')}
        </ButtonThick>
    );
};
