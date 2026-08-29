import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `_alert_button_cancel` of HabboWindowAlertLayout - pass real rows through its `items…` slot. */
export interface HabboWindowAlertLayoutAlertButtonCancelItemProps {
    captionAlertButtonCancel?: string;
    layout?: BoxLayout;
    onAlertButtonCancel?: () => void;
}

export const HabboWindowAlertLayoutAlertButtonCancelItem = ({ captionAlertButtonCancel, layout, onAlertButtonCancel }: HabboWindowAlertLayoutAlertButtonCancelItemProps) => {
    return (
        <Region
            name="_alert_button_cancel"
            layout={{ width: 51, height: 17, flexShrink: 0, minWidth: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
            onPointerTap={onAlertButtonCancel}
            cursor="pointer"
        >
            <ThemeText
                text={captionAlertButtonCancel ?? 'Cancel'}
                textStyle="text-style-u-regular"
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};
