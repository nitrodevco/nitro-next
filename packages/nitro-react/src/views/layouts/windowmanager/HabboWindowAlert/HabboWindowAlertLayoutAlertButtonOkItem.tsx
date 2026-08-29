import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `_alert_button_ok` of HabboWindowAlertLayout - pass real rows through its `items…` slot. */
export interface HabboWindowAlertLayoutAlertButtonOkItemProps {
    layout?: BoxLayout;
    onAlertButtonOk?: () => void;
}

export const HabboWindowAlertLayoutAlertButtonOkItem = ({ layout, onAlertButtonOk }: HabboWindowAlertLayoutAlertButtonOkItemProps) => {
    return (
        <ButtonThick
            variant="3"
            name="_alert_button_ok"
            onPointerTap={onAlertButtonOk}
            layout={{ width: 50, height: 24, flexShrink: 0, minWidth: 50, ...layout }}
        >
            Ok
        </ButtonThick>
    );
};
