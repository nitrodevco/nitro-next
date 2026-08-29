import { BoxLayout, Button } from '#base/theme';

/** Row template `_alert_button_custom` of HabboWindowAlertLayout - pass real rows through its `items…` slot. */
export interface HabboWindowAlertLayoutAlertButtonCustomItemProps {
    layout?: BoxLayout;
    onAlertButtonCustom?: () => void;
}

export const HabboWindowAlertLayoutAlertButtonCustomItem = ({ layout, onAlertButtonCustom }: HabboWindowAlertLayoutAlertButtonCustomItemProps) => {
    return (
        <Button
            variant="3"
            name="_alert_button_custom"
            onPointerTap={onAlertButtonCustom}
            layout={{ width: 50, height: 24, flexShrink: 0, minWidth: 50, ...layout }}
        >
            Alert
        </Button>
    );
};
